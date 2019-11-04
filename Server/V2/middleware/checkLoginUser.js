import Joi from 'joi';
import validationHelper from '../helpers/validationHelper';

export const checkLoginUser = (req, res, next) => {
    const loginSchema = Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required(),
    });
    const schemasValidation = Joi.validate(req.body, loginSchema);
    validationHelper(res, schemasValidation, next);
};
export default checkLoginUser;
