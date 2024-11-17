import { db } from "../libs/prisma";

const findSkillWhere = async (where: any) => {
  const result = await db.skill.findFirst({
    where,
  });

  return result;
};

const getSkillByProfileCode = async (profileCode: string) => {
  const result = await db.skill.findMany({
    where: { profileCode },
  });

  return result;
};

const createSkill = async (data: any) => {
  const result = await db.skill.create({
    data,
  });

  return result;
};

const deleteSkillById = async (id: number) => {
  const result = await db.skill.delete({
    where: { id },
  });

  return result;
};

export { getSkillByProfileCode, findSkillWhere, createSkill, deleteSkillById };
