import Joi from "joi";

const nameSchema = Joi.string().required();

export default nameSchema;