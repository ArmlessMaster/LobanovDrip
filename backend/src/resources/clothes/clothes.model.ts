import { Schema, model } from 'mongoose';
import Clothes from '@/resources/clothes/clothes.interface';
import ClothesCount from '@/utils/interfaces/clothesCount.interface';

const ClothesSchema = new Schema(
    {
        name: {
            type: String,
        },
        imagesUrls: {
            type: Array<string>,
        },
        gifUrl: {
            type: String,
        },
        size: {
            type: Array<string>,
        },
        color: {
            type: Array<string>,
        },
        type: {
            type: String,
        },
        price: {
            type: Number,
        },
        sale: {
            type: Number,
            default: 0,
        },
        material: {
            type: String,
        },
        care: {
            type: String,
        },
        company: {
            type: String,
        },
        clothesCount: {
            type: Array<ClothesCount>,
        },
        sex: {
            type: String,
        },
        collection_id: {
            type: Schema.Types.ObjectId,
            ref: 'Collections',
        },
    },
    { timestamps: true }
);

export default model<Clothes>('Clothes', ClothesSchema);
