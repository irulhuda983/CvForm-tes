import { db } from "../libs/prisma";
import { generateId } from "../libs/generateId";
import { IProfile, IProfileCreateData } from "../types/Profile";

const getProfileByProfileCode = async (
  profileCode: string,
): Promise<IProfile | null> => {
  const result = await db.profile.findFirst({
    include: {
      employments: true,
      educations: true,
      skills: true,
    },
    where: { profileCode },
  });

  return result;
};

const createProfile = async (
  data: IProfileCreateData,
): Promise<IProfile | null> => {
  const profileCode: string = generateId();
  const result = await db.profile.create({
    data: {
      profileCode,
      ...data,
    },
  });

  return result;
};

const updateProfile = async (
  profileCode: string,
  data: any,
): Promise<IProfile | null> => {
  const result = await db.profile.update({
    where: { profileCode },
    data,
  });

  return result;
};

const updatePhotoProfile = async (
  profileCode: string,
  photo: string,
): Promise<IProfile | null> => {
  const result = await db.profile.update({
    where: { profileCode },
    data: {
      photo: photo,
    },
  });

  return result;
};

const deleteProfile = async (profileCode: string): Promise<IProfile | null> => {
  const result = await db.profile.delete({
    where: { profileCode },
  });

  return result;
};

export {
  getProfileByProfileCode,
  createProfile,
  updateProfile,
  updatePhotoProfile,
  deleteProfile,
};
