import Joi from 'joi';

export const checkNewEntry = (req, res, next) => {
    const createEntrySchema = Joi.object().keys({
        title: Joi.string().min(3).max(20).required(),
        description: Joi.string().min(3).max(20).required(),
    });
    const schemasValidation = Joi.validate(req.body, createEntrySchema);
    if (schemasValidation.error) {
        const validationErrors = [];
        for (let i = 0; i < schemasValidation.error.details.length; i += 1) {
            // eslint-disable-next-line quotes
            validationErrors.push(schemasValidation.error.details[i].message.split('"').join(" "));
        }
        return res.status(400).json({
            status: 400,
            error: validationErrors[0],
        });
    }
    next();
};
export default checkNewEntry;
