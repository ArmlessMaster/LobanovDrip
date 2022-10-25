import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    imagesUrls: Joi.array().items(Joi.string().required()).required(),
    gifUrl: Joi.string().required(),
    size: Joi.array().items(Joi.string().required()).required(),
    color: Joi.array().items(Joi.string().required()).required(),
    type: Joi.string().required(),
    price: Joi.number().required(),
    company: Joi.string().required(),
    sale: Joi.number().required(),
    assemblage: Joi.string().required(),
    material: Joi.string().required(),
    care: Joi.string().required(),
    clothesCount: Joi.array().items({
        size: Joi.string().required(),
        count: Joi.number().required(),
    }).required(),
    sex: Joi.string().required(),
    collection_id: Joi.string().hex().length(24).required(),
});
export default {create};
