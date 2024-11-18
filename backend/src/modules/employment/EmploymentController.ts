import { Request, Response } from "express";
import {
  getEmploymentByCode,
  addEmploymentByProfileCode,
  deleteEmploymentByProfileCode,
} from "./EmploymentService";
import HandleError from "../../libs/responses/handleError";
import { logger } from "../../libs/logger/logger";
import { configApp } from "../../config/app";

const showEmployment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const result = await getEmploymentByCode(String(code));

    return res.status(200).json(result);
  } catch (error) {
    if (configApp.env != "test") logger.error(error);
    return HandleError(error, res);
  }
};

const createEmployment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const body = req.body;
    const result = await addEmploymentByProfileCode(String(code), body);

    return res.status(200).json(result);
  } catch (error) {
    if (configApp.env != "test") logger.error(error);
    return HandleError(error, res);
  }
};

const deleteEmployment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.query;
    const { code } = req.params;
    const result = await deleteEmploymentByProfileCode(
      String(code),
      Number(id),
    );

    return res.status(200).json(result);
  } catch (error) {
    if (configApp.env != "test") logger.error(error);
    return HandleError(error, res);
  }
};

export { showEmployment, createEmployment, deleteEmployment };
