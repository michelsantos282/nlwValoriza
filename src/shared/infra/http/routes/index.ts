import {Router} from 'express';

import { usersRoutes } from './users.routes';
import { tagsRoutes } from './tags.routes';
import { complimentsRoutes } from './compliments.routes';

const router = Router();

router.use("/users", usersRoutes); // Rotas de Usuario
router.use("/tags", tagsRoutes);
router.use("/compliments", complimentsRoutes);

export {router}