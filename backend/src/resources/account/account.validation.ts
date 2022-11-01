import Joi from 'joi';

const register = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().min(6).required(),

    name: Joi.string().required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().required(),
});

const update = Joi.object({
    _id: Joi.string().hex().length(24).required(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    name: Joi.string(),
    phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
    role: Joi.string(),
    adress: Joi.string(),
});

const delete0 = Joi.object({
    _id: Joi.string().hex().length(24).required(),
});

export default { register, login, update, delete0 };
