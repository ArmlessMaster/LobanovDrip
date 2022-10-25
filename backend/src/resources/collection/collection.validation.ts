import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
});
export default {create};
