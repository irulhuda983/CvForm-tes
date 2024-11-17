import { db } from "../libs/prisma";

const findEducationWhere = async (where: any) => {
  const result = await db.education.findFirst({
    where,
  });

  return result;
};

const getEducationByProfileCode = async (profileCode: string) => {
  const result = await db.education.findMany({
    where: { profileCode },
  });

  return result;
};

const createEducation = async (data: any) => {
  const result = await db.education.create({
    data,
  });

  return result;
};

const deleteEducationById = async (id: number) => {
  const result = await db.education.delete({
    where: { id },
  });

  return result;
};

export {
  getEducationByProfileCode,
  findEducationWhere,
  createEducation,
  deleteEducationById,
};
