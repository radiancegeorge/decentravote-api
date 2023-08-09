import { Router } from "express";
import {
  DeleteCommunityValidation,
  GetProjectValidation,
  UpdateCommunitiesValidation,
} from "../../middlewares/validations";
import {
  deleteProjectCommunity,
  getProject,
  updateProjectCommunities,
} from "../../controllers/projects";
import { userProtect } from "../../middlewares/protect";

const project = Router();

project.route("/:id").get(GetProjectValidation, getProject);
project
  .route("/:projectId/community")
  .put(userProtect, UpdateCommunitiesValidation, updateProjectCommunities);

//leave at bottom
project
  .route("/:projectId/:type")
  .delete(userProtect, DeleteCommunityValidation, deleteProjectCommunity);

export default project;
