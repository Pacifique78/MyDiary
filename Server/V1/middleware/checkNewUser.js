import Joi from 'joi';
import validationHelper from '../helpers/validationHelper';

export const checkNewUser = (req, res, next) => {
    const createUserSchema = Joi.object().keys({
        firstName: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        lastName: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
    });
    const schemasValidation = Joi.validate(req.body, createUserSchema);
    validationHelper(res, schemasValidation, next);
};
export default checkNewUser;
