import Joi from 'joi';
import validationHelper from '../helpers/validationHelper';

export const validateEntryParams = (req, res, next) => {
    const entryValidationParams = {
        entryId: Joi.number().positive().required(),
    };
    const schemasValidation = Joi.validate(req.params, entryValidationParams);
    validationHelper(res, schemasValidation, next);
};
export default validateEntryParams;
