import { uploadPhotoSchema } from "./PhotoValidator";
import {
  getProfileByProfileCode,
  updateProfile,
} from "../../repositories/ProfileRepo";
import {
  fileToDataURL,
  saveImageFromBase64,
  deleteFile,
} from "../../libs/storage";
import ApiError from "../../libs/responses/apiError";

const getProfileByCode = async (profileCode: string) => {
  const code = profileCode
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/['";-]/g, "");

  const profile = await getProfileByProfileCode(code);

  if (!profile) {
    throw new ApiError(404, "Profile Code not found");
  }

  return profile;
};

const downloadPhotoByCode = async (profileCode: string) => {
  const profile = await getProfileByCode(profileCode);

  if (!profile.photo) {
    throw new ApiError(404, "Photo is not found.");
  }

  const dataURL = fileToDataURL(`./public/uploads/${profile.photo}`);

  return dataURL;
};

const uploadPhotoByCode = async (profileCode: string, data: any) => {
  const profile = await getProfileByCode(profileCode);

  const { error } = uploadPhotoSchema(data);

  if (error != null) {
    throw new ApiError(400, error.details[0].message, error.details);
  }

  if (profile.photo) {
    deleteFile(`./public/uploads/${profile.photo}`);
  }

  const base64Image = data.base64img;
  const outputFolder = "./public/uploads";

  const { errorUpload, fileName } = saveImageFromBase64(
    base64Image,
    outputFolder,
  );

  if (errorUpload) {
    throw new ApiError(400, errorUpload);
  }

  const updated = await updateProfile(profile.profileCode, {
    photo: fileName,
  });

  if (!updated) {
    throw new ApiError(500, "Internal Server Error");
  }

  return {
    profileCode: profile.profileCode,
    photoUrl: `/api/uploads/${updated.photo}`,
  };
};

const deletePhotoByCode = async (profileCode: string) => {
  const profile = await getProfileByCode(profileCode);

  if (!profile.photo) {
    throw new ApiError(404, "Photo is not found.");
  }

  deleteFile(`./public/uploads/${profile.photo}`);

  const updated = await updateProfile(profile.profileCode, {
    photo: null,
  });

  if (!updated) {
    throw new ApiError(500, "Internal Server Error");
  }

  return {
    profileCode: profile.profileCode,
  };
};

export { downloadPhotoByCode, uploadPhotoByCode, deletePhotoByCode };
