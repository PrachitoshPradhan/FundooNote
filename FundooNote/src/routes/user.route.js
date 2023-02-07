import express from 'express';
import * as userController from '../controllers/user.controller';
import { registerUserValidator , loginUserValidator, forgotPasswordValidator} from '../validators/user.validator';
import { userAuth , userForgotAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to create a new user
router.post('', registerUserValidator, userController.registerUser);

//route to login for users
router.post('/login', loginUserValidator, userController.loginUser);

//route for forgot password
router.post('/forgotpassword', forgotPasswordValidator , userController.forgotPassword);

//route for user reset password
router.post('/:token/resetpassword', userForgotAuth,  userController.resetPassword);

export default router;
