import Joi from 'joi';

const gameSchema = Joi.object({
    name: Joi.string().required(),
    stockTotal: Joi.number().required().min(1),
    categoryId: Joi.number().required().min(1),
})

export default gameSchema;