import { db } from "../libs/prisma";

const findEmploymentWhere = async (where: any) => {
  const result = await db.employment.findFirst({
    where,
  });

  return result;
};

const getEmploymentByProfileCode = async (profileCode: string) => {
  const result = await db.employment.findMany({
    where: { profileCode },
  });

  return result;
};

const createEmployment = async (data: any) => {
  const result = await db.employment.create({
    data,
  });

  return result;
};

const deleteEmploymentById = async (id: number) => {
  const result = await db.employment.delete({
    where: { id },
  });

  return result;
};

export {
  getEmploymentByProfileCode,
  findEmploymentWhere,
  createEmployment,
  deleteEmploymentById,
};
