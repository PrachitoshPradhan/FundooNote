import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import User from '../models/user.model';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const registerUser = async (req, res, next) => {
  try {
      const data = await UserService.registerUser(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
      });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginUser = async (req, res, next) => {
  try {
    const data = await UserService.loginUser(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};


export const forgotPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgotPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code : HttpStatus.ACCEPTED,
      data: data,
      message: "Token successfully sent to email"
    });
  }
  catch(error){
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try{
      const data = await UserService.resetPassword(req.body, req.params.token);
      res.status(HttpStatus.ACCEPTED).json({
          code : HttpStatus.ACCEPTED,
          data : data,
          message : "Password reset successfully"
      })
  }
  catch(error){
      next(error);

  }
};