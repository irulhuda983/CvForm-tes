import { dateToString, stringToIsoDate } from "../../libs/formatDate";

export const toRequest = (payload: any) => {
  const data = {
    wantedJobTitle: payload.wantedJobTitle,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone ? String(payload.phone) : null,
    country: payload.country,
    city: payload.city,
    address: payload.address,
    postalCode: payload.postalCode ? Number(payload.postalCode) : null,
    drivingLicense: payload.drivingLicense,
    nationality: payload.nationality,
    placeOfBirth: payload.placeOfBirth,
    dateOfBirth: payload.dateOfBirth
      ? stringToIsoDate(payload.dateOfBirth, "dd-MM-yyyy")
      : null,
  };

  return data;
};

export const toResponse = (payload: any) => {
  const {
    profileCode,
    wantedJobTitle,
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    address,
    postalCode,
    drivingLicense,
    nationality,
    placeOfBirth,
    dateOfBirth,
  } = payload;

  return {
    profileCode,
    wantedJobTitle,
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    address,
    postalCode: Number(postalCode),
    drivingLicense,
    nationality,
    placeOfBirth,
    dateOfBirth: dateOfBirth ? dateToString(dateOfBirth, "dd-MM-yyyy") : null,
  };
};
