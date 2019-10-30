import Joi from 'joi';

export const validateEntryParams = (req, res, next) => {
    const entryValidationParams = {
        entryId: Joi.number().positive().required(),
    };
    const schemaValidation = Joi.validate(req.params, entryValidationParams);
    if (schemaValidation.error) {
        const validationErrors = [];
        for (let i = 0; i < schemaValidation.error.details.length; i += 1) {
            validationErrors.push(schemaValidation.error.details[i].message.split('"').join(' '));
        }
        return res.status(400).json({
            status: 400,
            error: validationErrors[0],
        });
    }
    next();
};
export default validateEntryParams;
