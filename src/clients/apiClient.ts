import { logApiError } from "../utils/logger";
import Environment from "../utils/environment";

const parseHtml = (data: any) => data.text();

const sjekkForFeil = (
  url: string,
  response: Response,
  reject: (reason?: any) => void
) =>
  response.ok
    ? response
    : (logApiError(url, response),
      reject({
        code: response.status,
        text: response.statusText
      }));

const hentJsonOgSjekkAuth = (url: string) =>
  new Promise((resolve, reject) =>
    fetch(url)
      .then(response => sjekkForFeil(url, response, reject))
      .then(parseHtml)
      .then(resolve)
      .catch(reject)
  );

export const hentDecorator = () =>
  hentJsonOgSjekkAuth(Environment.decoratorURl);
