import "@babel/polyfill";
import "core-js";
import "./index.less";

import { setUpMock } from "./clients/apiMock";
import Environment from "./utils/environment";

import Decorator from "./modules/Decorator";

if (process.env.NODE_ENV === "development") {
  Environment.settEnv("LOCAL");
  setUpMock();
}

export default Decorator;