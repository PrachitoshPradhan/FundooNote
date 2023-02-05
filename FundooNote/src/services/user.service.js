import User from '../models/user.model';
import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
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

//forget password
export const forgotPassword = async (email) => {
	console.log("INPUT - user.service -> forgetPassword ----->", email);
	const user = await User.findOne({email: email});
	if(!user){
		return {error: 1, status: HttpStatus.NOT_FOUND, message: "User Not found."};
	}
	const token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY+user.password, {expiresIn: '15m'});
	const resetPasswordUrl = process.env.BASE_URL + `/users/reset-password/${user.email}/${token}`;
	sendMail({
		to: user.email,
		subject: "Please reset your password.",
		text: "your password reset link :- " + resetPasswordUrl,
		html: "<h1>your password reset link</h1><br><p>"+resetPasswordUrl+"</p>"
	});
	return {error: 0, status: HttpStatus.OK, ok: 'ok', message: "Password reset link is send to your email."};	
}

