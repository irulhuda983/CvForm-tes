import { toRequest, toResponse } from "./ProfileDto";
import {
  createProfileSchema,
  updateProfileSchema,
  updateWorkingExperienceSchema,
} from "./ProfilValidator";
import {
  getProfileByProfileCode,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../../repositories/ProfileRepo";
import ApiError from "../../libs/responses/apiError";

const getProfileByCode = async (profileCode: string) => {
  const code = profileCode
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/['";-]/g, "");

  const result = await getProfileByProfileCode(code);

  if (!result) {
    throw new ApiError(404, "Profile Code not found");
  }

  return toResponse(result);
};

const addProfile = async (data: any) => {
  const profileData = toRequest(data);

  const { error } = createProfileSchema(data);

  if (error != null) {
    throw new ApiError(400, error.details[0].message, error.details);
  }

  const storeData = await createProfile(profileData);

  return {
    profileCode: storeData.profileCode,
  };
};

const editProfileByCode = async (profileCode: string, data: any) => {
  const code = profileCode
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/['";-]/g, "");

  const profileData = toRequest(data);
  const profile = await getProfileByProfileCode(code);

  if (!profile) {
    throw new ApiError(404, "Profile Code not found");
  }

  const { error } = updateProfileSchema(data);

  if (error != null) {
    throw new ApiError(400, error.details[0].message, error.details);
  }

  const updated = await updateProfile(code, profileData);

  if (!updated) {
    throw new ApiError(500, "Internal Server Error");
  }

  return { profileCode: updated.profileCode };
};

const deleteProfileByCode = async (profileCode: string) => {
  const code = profileCode
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/['";-]/g, "");

  const profile = await getProfileByProfileCode(code);

  if (!profile) {
    throw new ApiError(404, "Profile Code not found");
  }

  const deleted = await deleteProfile(code);

  if (!deleted) {
    throw new ApiError(500, "Internal Server Error");
  }

  return { profileCode: deleted.profileCode };
};

const getWorkingExperienceByCode = async (profileCode: string) => {
  const code = profileCode
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/['";-]/g, "");

  const result = await getProfileByProfileCode(code);

  if (!result) {
    throw new ApiError(404, "Profile Code not found");
  }

  return {
    workingExperience: result.workingExperience,
  };
};

const editWorkingExperienceByCode = async (profileCode: string, data: any) => {
  const code = profileCode
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/['";-]/g, "");

  const profile = await getProfileByProfileCode(code);

  if (!profile) {
    throw new ApiError(404, "Profile Code not found");
  }

  const { error } = updateWorkingExperienceSchema(data);

  if (error != null) {
    throw new ApiError(400, error.details[0].message, error.details);
  }

  const updated = await updateProfile(code, {
    workingExperience: data.workingExperience,
  });

  if (!updated) {
    throw new ApiError(500, "Internal Server Error");
  }

  return {
    profileCode: updated.profileCode,
    workingExperience: updated.workingExperience,
  };
};

export {
  getProfileByCode,
  addProfile,
  editProfileByCode,
  deleteProfileByCode,
  getWorkingExperienceByCode,
  editWorkingExperienceByCode,
};
