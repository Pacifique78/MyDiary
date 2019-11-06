import Joi from 'joi';
import validationHelper from '../helpers/validationHelper';

export const checkNewUser = (req, res, next) => {
    const createUserSchema = Joi.object().keys({
        firstName: Joi.string()
            .trim()
            .min(3)
            .max(30)
            .required(),
        lastName: Joi.string()
            .trim()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*]{3,30}$/).min(8).required(),
    });
    const schemasValidation = Joi.validate(req.body, createUserSchema);
    validationHelper(res, schemasValidation, next);
};
export default checkNewUser;
