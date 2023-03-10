import express from 'express';
import * as userController from '../controllers/user.controller';
import { registerUserValidator , loginUserValidator, forgotPasswordValidator} from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to create a new user
router.post('/register', registerUserValidator, userController.registerUser);

//route to login for users
router.post('/login', loginUserValidator, userController.loginUser);

//route for forgot password
router.post('/forgotpassword', forgotPasswordValidator , userController.forgotPassword);

//route for user reset password
router.put('/:token/resetpassword',  userController.resetPassword);

export default router;
