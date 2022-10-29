import Joi from 'joi';

const create = Joi.object({
    user_id: Joi.string().hex().length(24).required(),
    moderator_id: Joi.string().hex().length(24).required(),
    status: Joi.string().required(),
    adress: Joi.string().required(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
});

export default { create };
