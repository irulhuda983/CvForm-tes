import { dateToString, stringToIsoDate } from "../../libs/formatDate";

export const toRequest = (payload: any) => {
  const { school, degree, startDate, endDate, city, description } = payload;

  return {
    school,
    degree,
    startDate: startDate ? stringToIsoDate(startDate, "dd-MM-yyyy") : null,
    endDate: endDate ? stringToIsoDate(endDate, "dd-MM-yyyy") : null,
    city,
    description,
  };
};

export const toResponse = (payload: any) => {
  const { id, school, degree, startDate, endDate, city, description } = payload;

  return {
    id,
    school,
    degree,
    startDate: startDate ? dateToString(startDate, "dd-MM-yyyy") : null,
    endDate: endDate ? dateToString(endDate, "dd-MM-yyyy") : null,
    city,
    description,
  };
};
