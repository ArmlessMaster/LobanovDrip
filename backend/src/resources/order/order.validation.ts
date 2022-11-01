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

const update = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    user_id: Joi.string().hex().length(24),
    moderator_id: Joi.string().hex().length(24),
    status: Joi.string(),
    adress: Joi.string(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    name: Joi.string(),
    email: Joi.string().email(),
});

const delete0 = Joi.object({
    _id: Joi.string().hex().length(24).required(),
});

const find = Joi.object({
    _id: Joi.string().hex().length(24),
    user_id: Joi.string().hex().length(24),
    moderator_id: Joi.string().hex().length(24),
    status: Joi.string(),
    adress: Joi.string(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    name: Joi.string(),
    email: Joi.string().email(),
});


export default { create, update, delete0, find };
