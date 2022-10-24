import Joi from 'joi';

const register = Joi.object({

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required(),

    isGoogle: Joi.boolean().required()
});

const login = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().required(),
});

export default {register, login};