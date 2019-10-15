import Joi from 'joi';

export const validateEntryParams = (req, res, next) =>{
    const entryValidationParams = {
        entryId: Joi.number().required()
    };
    const schemaValidation = Joi.validate(req.params, entryValidationParams);
    if(schemaValidation.error){
        const validationErrors=[];
        for(let i=0; i<schemaValidation.error.details.length;i++){
            //eslint-disable-next-line quotes
            validationErrors.push(schemaValidation.error.details[i].message.split('"').join(" "));
        }
        return res.status(400).json({
            status: 400,
            error: validationErrors[0]
        });
    }
    next();
};
