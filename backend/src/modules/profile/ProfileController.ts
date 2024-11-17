import { Request, Response } from "express";
import {
  getProfileByCode,
  addProfile,
  editProfileByCode,
  getWorkingExperienceByCode,
  editWorkingExperienceByCode,
} from "./ProfileService";
import HandleError from "../../libs/responses/handleError";
import { logger } from "../../libs/logger/logger";

const showProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const result = await getProfileByCode(String(code));

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return HandleError(error, res);
  }
};

const createProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const profileData = req.body;
    const result = await addProfile(profileData);

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return HandleError(error, res);
  }
};

const editProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;
    const profileData = req.body;
    const result = await editProfileByCode(String(code), profileData);

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return HandleError(error, res);
  }
};

const getWorkingExperience = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { code } = req.params;
    const result = await getWorkingExperienceByCode(String(code));

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return HandleError(error, res);
  }
};

const editWorkingExperience = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { code } = req.params;
    const profileData = req.body;
    const result = await editWorkingExperienceByCode(String(code), profileData);

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return HandleError(error, res);
  }
};

export {
  showProfile,
  createProfile,
  editProfile,
  getWorkingExperience,
  editWorkingExperience,
};
