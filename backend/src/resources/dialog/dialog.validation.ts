import Joi from 'joi';

const create = Joi.object({
    user_id: Joi.string().hex().length(24).required(),
    moderator_id: Joi.string().hex().length(24).required(),
    lastMessage_id: Joi.string().hex().length(24).required(),
});


export default {create};
