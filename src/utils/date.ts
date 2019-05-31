import moment from "moment";

export const sortDateString = (a?: string, b?: string) =>
  a && b ? moment(a).diff(moment(b)) : !a && b ? 1 : !b && a ? -1 : 0;
