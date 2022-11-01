import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    user_id: Joi.string().hex().length(24).required(),
    clothes_id: Joi.array()
        .items(Joi.string().hex().length(24).required())
        .required(),
});

const update = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    name: Joi.string(),
    user_id: Joi.string().hex().length(24),
    clothes_id: Joi.array().items(Joi.string().hex().length(24)),
});

const delete0 = Joi.object({
    _id: Joi.string().hex().length(24).required(),
});

const find = Joi.object({
    _id: Joi.string().hex().length(24),
    name: Joi.string(),
    user_id: Joi.string().hex().length(24),
});

export default { create, update, delete0, find };
