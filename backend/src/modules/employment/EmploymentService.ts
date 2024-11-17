import { toRequest, toResponse } from "./EmploymentDto";
import { createEmploymentSchema } from "./EmploymentValidator";
import { getProfileByProfileCode } from "../../repositories/ProfileRepo";
import {
  getEmploymentByProfileCode,
  findEmploymentWhere,
  createEmployment,
  deleteEmploymentById,
} from "../../repositories/EmploymentRepo";
import ApiError from "../../libs/responses/apiError";

const getProfileByCode = async (profileCode: string) => {
  const code = profileCode
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/['";-]/g, "");

  const result = await getProfileByProfileCode(code);

  if (!result) {
    throw new ApiError(404, "Profile Code not found");
  }

  return result;
};

const getEmploymentByCode = async (profileCode: string) => {
  const profile = await getProfileByCode(profileCode);

  const employments = await getEmploymentByProfileCode(profile.profileCode);

  const data = employments.map((employment) => toResponse(employment));
  return { data };
};

const addEmploymentByProfileCode = async (profileCode: string, data: any) => {
  const profile = await getProfileByCode(profileCode);

  const EmploymentData = toRequest(data);

  const { error } = createEmploymentSchema(data);

  if (error != null) {
    throw new ApiError(400, error.details[0].message, error.details);
  }

  const insertData = await createEmployment({
    profileCode: profile.profileCode,
    ...EmploymentData,
  });

  if (!insertData) {
    throw new ApiError(500, "Internal Server Error");
  }

  return {
    id: insertData.id,
    profileCode: insertData.profileCode,
  };
};

const deleteEmploymentByProfileCode = async (
  profileCode: string,
  id: number,
) => {
  const code = profileCode
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/['";-]/g, "");

  let where = {
    AND: [{ profileCode: code }, { id }],
  };

  const employment = await findEmploymentWhere(where);

  if (!employment) {
    throw new ApiError(404, "Employment not found");
  }

  const deleted = await deleteEmploymentById(employment.id);

  if (!deleted) {
    throw new ApiError(500, "Internal server error");
  }

  return {
    profileCode: employment.profileCode,
  };
};

export {
  getEmploymentByCode,
  addEmploymentByProfileCode,
  deleteEmploymentByProfileCode,
};
