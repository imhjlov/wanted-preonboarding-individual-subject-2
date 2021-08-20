import moment from "moment";

export const DATE_FORMAT = "L";
export const TODAY = moment(moment().startOf("day"), DATE_FORMAT);
