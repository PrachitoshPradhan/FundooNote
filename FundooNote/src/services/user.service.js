import User from '../models/user.model';
import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import { sendMail } from '../utils/mail.util';
import { sender } from '../utils/rabbitMQ';

import jwt from 'jsonwebtoken';


//salting and hashing the password for unique ones
const getHashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
}

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//register new user 
export const registerUser = async (body) => {
  //hashing password before pushing it into database
  const user = await User.findOne({email: body.email});
    if(user){
      return {error: 1, status: HttpStatus.CONFLICT, message: "Email ID already exists."};
    }
      body.password = await getHashPassword(body.password);
      const data = await User.create(body);
      sender('userData', JSON.stringify(data));
      return {data, message: "User registered successfully"};
    
    
};

//login user
export const loginUser = async (body) => {
  try {
    const user = await User.findOne({email: body.email});
    if(!user){
      return {error: 1, status: HttpStatus.NOT_FOUND, message: "Email id doesn't exists."};
    }
    const isMatchedPassword = await bcrypt.compare(body.password, user.password);
    if (!isMatchedPassword) {
      return {error: 1, status: HttpStatus.UNAUTHORIZED, message: "Invalid Password!"};
    }
    else{
      const token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY);
      return {token};
    }
    return {user};
  }
  catch (error) {
    throw new error(error)
  }
};

//forgot password
export const forgotPassword = async (body) => {
  try {
  const user = await User.findOne({email: body.email});
  if(!user){
    throw new Error("No user with entered email found.");
  }else
  var token = jwt.sign({id: user.id, email: user.email}, process.env.SENDEMAIL_SECRET_KEY);
  const data = await sendMail(token, user.email)
  return {
    message: "token is sent to email",
  data
}
  }
  catch(error){
    throw new Error(error)
  }
};


//reset password
export const resetPassword = async (body) => {
  try{
    const user = await User.findOne({email: body.email});

    if(user) {
      body.password = await getHashPassword(body.password);
      const data = await User.findOneAndUpdate({
        email: body.email
      },
      {
        password : body.password
      },
      {
        new : true
      })
    }
  }catch(error){
    throw new Error(error);
  }
};

