import React from "react";
import Miljo from "../../src/types/miljo";
import Decorator from "@navikt/react-decorator";

const App = () => {
  const { hostname } = window.location;
  const miljo = (hostname.indexOf("localhost") > -1 ? "LOCAL" : "DEV") as Miljo;

  return (
    <Decorator miljo={miljo}>
      <div className="example__app">
        <div className="example__content">
          <div className="example__section">Testapplikasjonen kommer her</div>
        </div>
      </div>
    </Decorator>
  );
};

export default App;
