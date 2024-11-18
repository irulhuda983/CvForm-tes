import { Request, Response } from "express";
import {
  getSkillByCode,
  addSkillByProfileCode,
  deleteSkillByProfileCode,
} from "./SkillService";
import HandleError from "../../libs/responses/handleError";
import { logger } from "../../libs/logger/logger";
import { configApp } from "../../config/app";

const showSkill = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const result = await getSkillByCode(String(code));

    return res.status(200).json(result);
  } catch (error) {
    if (configApp.env != "test") logger.error(error);
    return HandleError(error, res);
  }
};

const createSkill = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const body = req.body;
    const result = await addSkillByProfileCode(String(code), body);

    return res.status(200).json(result);
  } catch (error) {
    if (configApp.env != "test") logger.error(error);
    return HandleError(error, res);
  }
};

const deleteSkill = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.query;
    const { code } = req.params;
    const result = await deleteSkillByProfileCode(String(code), Number(id));

    return res.status(200).json(result);
  } catch (error) {
    if (configApp.env != "test") logger.error(error);
    return HandleError(error, res);
  }
};

export { showSkill, createSkill, deleteSkill };
