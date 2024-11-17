import { Router, Request, Response, NextFunction } from "express";
import {
  showProfile,
  createProfile,
  editProfile,
  getWorkingExperience,
  editWorkingExperience,
} from "../modules/profile/ProfileController";
import {
  downloadPhoto,
  uploadPhoto,
  deletePhoto,
} from "../modules/photo/PhotoController";
import {
  showEmployment,
  createEmployment,
  deleteEmployment,
} from "../modules/employment/EmploymentController";
import {
  showEducation,
  createEducation,
  deleteEducation,
} from "../modules/education/EducationController";
import {
  showSkill,
  createSkill,
  deleteSkill,
} from "../modules/skill/SkillController";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is ready" });
});

routes.get("/profile/:code", showProfile);
routes.post("/profile", createProfile);
routes.put("/profile/:code", editProfile);

routes.get("/photo/:code", downloadPhoto);
routes.put("/photo/:code", uploadPhoto);
routes.delete("/photo/:code", deletePhoto);

routes.get("/working-experience/:code", getWorkingExperience);
routes.put("/working-experience/:code", editWorkingExperience);

routes.get("/employment/:code", showEmployment);
routes.post("/employment/:code", createEmployment);
routes.delete("/employment/:code", deleteEmployment);

routes.get("/education/:code", showEducation);
routes.post("/education/:code", createEducation);
routes.delete("/education/:code", deleteEducation);

routes.get("/skill/:code", showSkill);
routes.post("/skill/:code", createSkill);
routes.delete("/skill/:code", deleteSkill);

export default routes;
