import Joi from "joi";

export const validateRegisterAccount = async(req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string().min(5).max(20).required(),
    })

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    next();
}