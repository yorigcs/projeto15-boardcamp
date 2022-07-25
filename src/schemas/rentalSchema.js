import Joi from 'joi';

const rentalSchema = Joi.object({
    customerId: Joi.number().required().min(1),
    gameId: Joi.number().required().min(1),
    daysRented: Joi.number().required().min(1)
})

export default rentalSchema;