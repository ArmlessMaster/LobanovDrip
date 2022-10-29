import Joi from 'joi';

const create = Joi.object({
    text: Joi.string().required(),
    readed: Joi.boolean().required(),
    dialog: Joi.string().hex().length(24).required(),
    author: Joi.string().hex().length(24).required(),
});

export default { create };
