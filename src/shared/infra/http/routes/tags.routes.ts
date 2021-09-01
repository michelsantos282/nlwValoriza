import { Router } from "express";
import { CreateTagController } from "@modules/tags/useCases/createTag/CreateTagController";
import { ListTagsController } from "@modules/tags/useCases/listTags/ListTagsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";



const createTagController = new CreateTagController();
const listTagsController = new ListTagsController()

const tagsRoutes = Router();

tagsRoutes.post("/",ensureAuthenticated, ensureAdmin, createTagController.handle);
tagsRoutes.get("/", ensureAuthenticated, listTagsController.handle);



export { tagsRoutes }
