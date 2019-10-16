import Joi from 'joi';
export const checkNewUser = (req, res, next) => {
    const createUserSchema = Joi.object().keys({
        firstName: Joi.string().alphanum().min(3).max(20).required(),
        lastName: Joi.string().alphanum().min(3).max(20).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required()
    });
    const  schemasValidation = Joi.validate(req.body, createUserSchema);
    if(schemasValidation.error){
        const validationErrors=[];
        for(let i=0; i<schemasValidation.error.details.length;i++){
            //eslint-disable-next-line quotes
            validationErrors.push(schemasValidation.error.details[i].message.split('"').join(" "));
        }
        return res.status(400).json({
            status: 400,
            error: validationErrors[0]
        });
    }
    next();
};