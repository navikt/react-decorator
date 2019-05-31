import { logApiError } from "../utils/logger";
import Environment from "../utils/environment";
import request from "request-promise";

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
    request(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      credentials: "include"
    })
      .then((response: any) => sjekkForFeil(url, response, reject))
      .then(parseHtml)
      .then(resolve)
      .catch(reject)
  );

export const hentDecorator = () =>
  hentJsonOgSjekkAuth(Environment.decoratorURl);
