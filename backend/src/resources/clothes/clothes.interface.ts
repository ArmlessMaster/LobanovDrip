import {Document} from 'mongoose';
import ClothesCount from '@/utils/interfaces/clothesCount.interface';
import {Schema} from 'mongoose';

export default interface Clothes extends Document {
    name: string;
    imagesUrls: Array<string>;
    gifUrl: string;
    size: Array<string>;
    color: Array<string>;
    type: string;
    price: number;
    sale: number;
    assemblage: string;
    material: string;
    care: string;
    company: string;
    sex: string,
    collection_id: Schema.Types.ObjectId,
    clothesCount: Array<ClothesCount>;
}