import fetchMock from "fetch-mock";
import decorator from "./decorator.html";
import Environment from "../../utils/environment";

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

export const setUpMock = async () => {
  fetchMock.get(
    Environment.decoratorURl,
    delay(250, 1250).then(() => decorator)
  );
};
