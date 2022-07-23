import BaseJoi from 'joi';
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate);

const customerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().pattern(/^([0-9]{10}|[0-9]{11})$/),
    cpf: Joi.string().pattern(/^[0-9]{11}$/),
    birthDay: Joi.date().format('YYYY-MM-DD')

})