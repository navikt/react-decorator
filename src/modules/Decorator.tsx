import "@babel/polyfill";
import "core-js";
import React, { useEffect, useState } from "react";
import Error, { HTTPError } from "../components/error/Error";
import { hentDecorator } from "../clients/apiClient";
import Spinner from "../components/spinner/Spinner";
import Environment from "../utils/environment";
import Miljo from "../types/miljo";
import { JSDOM } from "jsdom";

type State = {
  fragments: {
    Header: Function;
    SkipLinks: Function;
    Footer: Function;
    Scripts: Function;
    MegaMenu: Function;
    Styles: Function;
  };
} & (
  | { status: "LOADING" }
  | { status: "RESULT" }
  | { status: "ERROR"; error: HTTPError });

export interface Props {
  miljo: "LOCAL" | "DEV" | "PROD";
  children: JSX.Element | JSX.Element[];
}

const Decorator = (props: Props) => {
  Environment.settEnv(props.miljo as Miljo);
  const [state, setState] = useState({
    status: "LOADING",
    fragments: {
      Header: () => null,
      SkipLinks: () => null,
      Footer: () => null,
      Scripts: () => null,
      MegaMenu: () => null,
      Styles: () => null
    }
  } as State);

  useEffect(() => {
    if (state.status === "LOADING") {
      hentDecorator()
        .then(decorator => {
          const { document } = new JSDOM(decorator as string).window;
          const prop = "innerHTML";

          const NAV_HEADING = document.getElementById("header-withmenu");
          const NAV_SKIPLINKS = document.getElementById("skiplinks");
          const NAV_FOOTER = document.getElementById("footer-withmenu");
          const NAV_SCRIPTS = document.getElementById("scripts");
          const NAV_STYLES = document.getElementById("styles");
          const MEGAMENU = document.getElementById("megamenu-resources");

          const data = {
            HEADING: { __html: NAV_HEADING ? NAV_HEADING[prop] : "" },
            SKIPLINKS: { __html: NAV_SKIPLINKS ? NAV_SKIPLINKS[prop] : "" },
            FOOTER: { __html: NAV_FOOTER ? NAV_FOOTER[prop] : "" },
            SCRIPTS: { __html: NAV_SCRIPTS ? NAV_SCRIPTS[prop] : "" },
            MEGAMENU: { __html: MEGAMENU ? MEGAMENU[prop] : "" },
            STYLES: { __html: NAV_STYLES ? NAV_STYLES[prop] : "" }
          };

          setState({
            status: "RESULT",
            fragments: {
              Header: () => <div dangerouslySetInnerHTML={data.HEADING} />,
              SkipLinks: () => <div dangerouslySetInnerHTML={data.SKIPLINKS} />,
              Footer: () => <div dangerouslySetInnerHTML={data.FOOTER} />,
              Scripts: () => <div dangerouslySetInnerHTML={data.SCRIPTS} />,
              MegaMenu: () => <div dangerouslySetInnerHTML={data.MEGAMENU} />,
              Styles: () => <div dangerouslySetInnerHTML={data.STYLES} />
            }
          });
        })
        .catch((error: HTTPError) =>
          setState({
            ...state,
            status: "ERROR",
            error
          })
        );
    }
  });

  switch (state.status) {
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      const {
        Header,
        SkipLinks,
        Footer,
        Scripts,
        MegaMenu,
        Styles
      } = state.fragments;

      return (
        <div>
          <Header />
          <SkipLinks />
          {props.children}
          <Footer />
          <Scripts />
          <MegaMenu />
          <Styles />
        </div>
      );
    case "ERROR":
      return <Error error={state.error} />;
  }
};

export default Decorator;
