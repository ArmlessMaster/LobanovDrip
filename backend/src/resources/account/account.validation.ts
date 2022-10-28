import Joi from 'joi';

const register = Joi.object({

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required(),

    name: Joi.string(),
});

const login = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().required(),

});

const changePassword = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const update = Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
    name: Joi.string(),
    phone: Joi.string(),
    role: Joi.string(),
    adress: Joi.string(),
});

export default {register, login, changePassword, update};