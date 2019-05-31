import React from "react";
import AlertStripe from "nav-frontend-alertstriper";

export interface HTTPError {
  code: string;
  text: string;
}

interface Props {
  error: HTTPError;
}

const Error = (props: Props) => {
  const { error } = props;
  return (
    <div className="error__container">
      <AlertStripe type="feil">
        Oisann, noe gikk galt ved henting av data!
        <br />
        {error && <span>{` ${error.code}: ${error.text}`}</span>}
      </AlertStripe>
    </div>
  );
};

export default Error;
