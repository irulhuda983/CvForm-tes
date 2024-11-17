import { Request, Response } from "express";
import {
  getEducationByCode,
  addEducationByProfileCode,
  deleteEducationByProfileCode,
} from "./EducationService";
import HandleError from "../../libs/responses/handleError";
import { logger } from "../../libs/logger/logger";

const showEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const result = await getEducationByCode(String(code));

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return HandleError(error, res);
  }
};

const createEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const body = req.body;
    const result = await addEducationByProfileCode(String(code), body);

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return HandleError(error, res);
  }
};

const deleteEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.query;
    const { code } = req.params;
    const result = await deleteEducationByProfileCode(String(code), Number(id));

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return HandleError(error, res);
  }
};

export { showEducation, createEducation, deleteEducation };
