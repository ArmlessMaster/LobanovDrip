import Joi, { string } from 'joi';

const register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const googleLogin = Joi.object({
    email: Joi.string().email().required(),
    passwordGoogle: Joi.string().min(6).required(),
    name: Joi.string().required(),
});

const update = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    name: Joi.string(),
    surname: Joi.string(),
    patronymic: Joi.string(),
    region: Joi.string(),
    city: Joi.string(),
    novaposhta: Joi.string(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    role: Joi.string(),
});

const updatePassword = Joi.object({
    password: Joi.string().min(6).required(),
    new_password: Joi.string().min(6).required(),
});

export default { register, login, googleLogin, update, updatePassword };
