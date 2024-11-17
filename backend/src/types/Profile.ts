export interface IProfile {
  profileCode: string;
  wantedJobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  postalCode?: number | null;
  drivingLicense?: string | null;
  nationality?: string | null;
  placeOfBirth?: string | null;
  dateOfBirth?: Date | string | null;
  photo?: string | null;
  workingExperience?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  employments?: Array<any>;
  educations?: Array<any>;
  skills?: Array<any>;
}

export interface IProfileCreateData {
  wantedJobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  postalCode: number | null;
  drivingLicense: string | null;
  nationality: string | null;
  placeOfBirth: string | null;
  dateOfBirth: Date | string | null;
}
