import "@babel/polyfill";
import "core-js";
import React, { useEffect, useState } from "react";
import Error, { HTTPError } from "../components/error/Error";
import { hentDecorator } from "../clients/apiClient";
import Spinner from "../components/spinner/Spinner";
import Environment from "../utils/environment";
import Miljo from "../types/miljo";
import { JSDOM } from "jsdom";

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; decorator: any }
  | { status: "ERROR"; error: HTTPError };

export interface Props {
  miljo: "LOCAL" | "DEV" | "PROD";
  children: JSX.Element | JSX.Element[];
}

const Decorator = (props: Props) => {
  const [state, setState] = useState({ status: "LOADING" } as State);
  Environment.settEnv(props.miljo as Miljo);

  let Header: Function = () => null;
  let SkipLinks: Function = () => null;
  let Footer: Function = () => null;
  let Scripts: Function = () => null;
  let MegaMenuResources: Function = () => null;
  let Styles: Function = () => null;

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
            NAV_HEADING: { __html: NAV_HEADING ? NAV_HEADING[prop] : "" },
            NAV_SKIPLINKS: { __html: NAV_SKIPLINKS ? NAV_SKIPLINKS[prop] : "" },
            NAV_FOOTER: { __html: NAV_FOOTER ? NAV_FOOTER[prop] : "" },
            NAV_SCRIPTS: { __html: NAV_SCRIPTS ? NAV_SCRIPTS[prop] : "" },
            MEGAMENU_RESOURCES: { __html: MEGAMENU ? MEGAMENU[prop] : "" },
            NAV_STYLES: { __html: NAV_STYLES ? NAV_STYLES[prop] : "" }
          };

          Header = () => <div dangerouslySetInnerHTML={data.NAV_HEADING} />;
          SkipLinks = () => (
            <div dangerouslySetInnerHTML={data.NAV_SKIPLINKS} />
          );
          Footer = () => <div dangerouslySetInnerHTML={data.NAV_FOOTER} />;
          Scripts = () => <div dangerouslySetInnerHTML={data.NAV_SCRIPTS} />;
          MegaMenuResources = () => (
            <div dangerouslySetInnerHTML={data.MEGAMENU_RESOURCES} />
          );
          Styles = () => <div dangerouslySetInnerHTML={data.NAV_STYLES} />;

          setState({
            status: "RESULT",
            decorator: data
          });
        })
        .catch((error: HTTPError) =>
          setState({
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
      return (
        <div>
          <Header />
          <SkipLinks />
          {props.children}
          <Footer />
          <Scripts />
          <MegaMenuResources />
          <Styles />
        </div>
      );
    case "ERROR":
      return <Error error={state.error} />;
  }
};

export default Decorator;
