import { Router } from "express";

import { CreateComplimentController } from "@modules/compliments/useCases/createCompliment/CreateComplimentController";
import { ListUserSendComplimentsController } from "@modules/compliments/useCases/listUserSendCompliments/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "@modules/compliments/useCases/listUserReceiveCompliments/ListUserReceiveComplimentsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";



const createComplimentController = new CreateComplimentController();
const listSendCompliments = new ListUserSendComplimentsController();
const listReceiveCompliments = new ListUserReceiveComplimentsController()

const complimentsRoutes = Router();

complimentsRoutes.post("/", ensureAuthenticated, createComplimentController.handle);
complimentsRoutes.get("/send", ensureAuthenticated,  listSendCompliments.handle);
complimentsRoutes.get("/receive", ensureAuthenticated, listReceiveCompliments.handle);



export { complimentsRoutes }
