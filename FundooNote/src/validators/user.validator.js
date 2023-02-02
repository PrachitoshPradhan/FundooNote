import Joi from '@hapi/joi';

export const registerUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    email: Joi.string().regex(/^[a-zA-Z0-9_.-]{3,}@[a-zA-Z0-9.-]{3,}$/).email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const loginUserValidator = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().regex(/^[a-zA-Z0-9_.-]{3,}@[a-zA-Z0-9.-]{3,}$/).email({ tlds: { allow: false } }).required(),
		password: Joi.string().min(6).required()
	});
	const { error, value } = schema.validate(req.body);
	if (error) {
		next(error);
	} else {
		req.validatedBody = value;
		next();
	}
};
