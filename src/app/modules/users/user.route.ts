import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.zod.validation';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidation.userZodSchema),
  userController.createUser
);

export default router;
