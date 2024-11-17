import { parse, formatISO, format } from "date-fns";

const stringToIsoDate = (dateString: any, format: string) => {
  const parsedDate = parse(dateString, format, new Date());
  return formatISO(parsedDate);
};

const dateToString = (date: any, patern: string) => {
  return format(new Date(date), patern);
};

export { stringToIsoDate, dateToString };
