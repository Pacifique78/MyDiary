import Joi from 'joi';
export const checkLoginUser = (req, res, next) => {
    const loginSchema = Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required()
    });
    const  schemasValidation = Joi.validate(req.body, loginSchema);
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