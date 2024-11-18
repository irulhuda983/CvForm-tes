import { toRequest, toResponse } from "./SkillDto";
import { createSkillSchema } from "./SkillValidator";
import { getProfileByProfileCode } from "../../repositories/ProfileRepo";
import {
  getSkillByProfileCode,
  findSkillWhere,
  createSkill,
  deleteSkillById,
} from "../../repositories/SkillRepo";
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

const getSkillByCode = async (profileCode: string) => {
  const profile = await getProfileByCode(profileCode);

  const skills = await getSkillByProfileCode(profile.profileCode);

  const data = skills.map((skill) => toResponse(skill));

  return { data };
};

const addSkillByProfileCode = async (profileCode: string, data: any) => {
  const profile = await getProfileByCode(profileCode);

  const skillData = toRequest(data);

  const { error } = createSkillSchema(data);

  if (error != null) {
    throw new ApiError(400, error.details[0].message, error.details);
  }

  const insertData = await createSkill({
    profileCode: profile.profileCode,
    ...skillData,
  });

  if (!insertData) {
    throw new ApiError(500, "Internal Server Error");
  }

  return {
    id: insertData.id,
    profileCode: insertData.profileCode,
  };
};

const deleteSkillByProfileCode = async (profileCode: string, id: number) => {
  const code = profileCode
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/['";-]/g, "");

  if (isNaN(id)) throw new ApiError(404, "Skill not found");

  let where = {
    AND: [{ profileCode: code }, { id }],
  };

  const skill = await findSkillWhere(where);

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  const deleted = await deleteSkillById(skill.id);

  if (!deleted) {
    throw new ApiError(500, "Internal server error");
  }

  return {
    profileCode: skill.profileCode,
  };
};

export { getSkillByCode, addSkillByProfileCode, deleteSkillByProfileCode };
