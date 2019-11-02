import Joi from 'joi';
import validationHelper from '../helpers/validationHelper';

export const checkNewEntry = (req, res, next) => {
    const createEntrySchema = Joi.object().keys({
        title: Joi.string().min(3).max(20).required(),
        description: Joi.string().min(3).required(),
    });
    const schemasValidation = Joi.validate(req.body, createEntrySchema);
    validationHelper(res, schemasValidation, next);
};
export default checkNewEntry;
