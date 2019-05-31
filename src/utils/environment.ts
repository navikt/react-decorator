import Miljo from "../types/miljo";

class Environment {
  static decoratorURl: string;

  static settEnv = (miljo: Miljo) => {
    switch (miljo) {
      default:
      case "LOCAL":
        Environment.decoratorURl = `http://localhost:8080/decorator`;
        break;
      case "DEV":
        Environment.decoratorURl = `https://appres-q0.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true`;
        break;
      case "PROD":
        Environment.decoratorURl = `https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true`;
        break;
    }
  };
}

export default Environment;
