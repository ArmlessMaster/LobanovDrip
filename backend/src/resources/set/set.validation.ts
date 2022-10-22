import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    user_id: Joi.string().hex().length(24).required(),
    clothes_id: Joi.array().items(Joi.string().hex().length(24).required()).required(),
});


export default {create};
