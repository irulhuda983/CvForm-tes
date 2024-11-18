import { toRequest, toResponse } from "./EducationDto";
import { createEducationSchema } from "./EducationValidator";
import { getProfileByProfileCode } from "../../repositories/ProfileRepo";
import {
  getEducationByProfileCode,
  findEducationWhere,
  createEducation,
  deleteEducationById,
} from "../../repositories/EducationRepo";
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

const getEducationByCode = async (profileCode: string) => {
  const profile = await getProfileByCode(profileCode);

  const educations = await getEducationByProfileCode(profile.profileCode);

  const data = educations.map((education) => toResponse(education));

  return { data };
};

const addEducationByProfileCode = async (profileCode: string, data: any) => {
  const profile = await getProfileByCode(profileCode);

  const educationData = toRequest(data);

  const { error } = createEducationSchema(data);

  if (error != null) {
    throw new ApiError(400, error.details[0].message, error.details);
  }

  const insertData = await createEducation({
    profileCode: profile.profileCode,
    ...educationData,
  });

  if (!insertData) {
    throw new ApiError(500, "Internal Server Error");
  }

  return {
    id: insertData.id,
    profileCode: insertData.profileCode,
  };
};

const deleteEducationByProfileCode = async (
  profileCode: string,
  id: number,
) => {
  const code = profileCode
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/['";-]/g, "");

  if (isNaN(id)) throw new ApiError(404, "Education not found");

  let where = {
    AND: [{ profileCode: code }, { id }],
  };

  const education = await findEducationWhere(where);

  if (!education) {
    throw new ApiError(404, "Education not found");
  }

  const deleted = await deleteEducationById(education.id);

  if (!deleted) {
    throw new ApiError(500, "Internal server error");
  }

  return {
    profileCode: education.profileCode,
  };
};

export {
  getEducationByCode,
  addEducationByProfileCode,
  deleteEducationByProfileCode,
};
