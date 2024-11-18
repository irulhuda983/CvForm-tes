import { Request, Response } from "express";
import {
  downloadPhotoByCode,
  uploadPhotoByCode,
  deletePhotoByCode,
} from "./PhotoService";
import HandleError from "../../libs/responses/handleError";
import { logger } from "../../libs/logger/logger";
import { configApp } from "../../config/app";

const downloadPhoto = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const result = await downloadPhotoByCode(String(code));

    return res.status(200).send(result);
  } catch (error) {
    if (configApp.env != "test") logger.error(error);
    return HandleError(error, res);
  }
};

const uploadPhoto = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const body = req.body;
    const result = await uploadPhotoByCode(String(code), body);

    return res.status(200).json(result);
  } catch (error) {
    if (configApp.env != "test") logger.error(error);
    return HandleError(error, res);
  }
};

const deletePhoto = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const result = await deletePhotoByCode(String(code));

    return res.status(200).json(result);
  } catch (error) {
    if (configApp.env != "test") logger.error(error);
    return HandleError(error, res);
  }
};

export { downloadPhoto, uploadPhoto, deletePhoto };
