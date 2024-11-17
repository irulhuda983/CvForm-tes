import { dateToString, stringToIsoDate } from "../../libs/formatDate";

export const toRequest = (payload: any) => {
  const { jobTitle, employer, startDate, endDate, city, description } = payload;

  return {
    jobTitle,
    employer,
    startDate: startDate ? stringToIsoDate(startDate, "dd-MM-yyyy") : null,
    endDate: endDate ? stringToIsoDate(endDate, "dd-MM-yyyy") : null,
    city,
    description,
  };
};

export const toResponse = (payload: any) => {
  const { id, jobTitle, employer, startDate, endDate, city, description } =
    payload;

  return {
    id,
    jobTitle,
    employer,
    startDate: startDate ? dateToString(startDate, "dd-MM-yyyy") : null,
    endDate: endDate ? dateToString(endDate, "dd-MM-yyyy") : null,
    city,
    description,
  };
};
