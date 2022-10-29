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

const changePassword = Joi.object({
    id: Joi.string().hex().length(24).required(),
    password: Joi.string().required(),
});

const update = Joi.object({
    id: Joi.string().hex().length(24).required(),
    email: Joi.string().email(),
    password: Joi.string(),
    name: Joi.string(),
    phone: Joi.string(),
    role: Joi.string(),
    adress: Joi.string(),
});

const deleteAccount = Joi.object({
    id: Joi.string().hex().length(24).required(),
});

export default { register, login, changePassword, update, deleteAccount };
