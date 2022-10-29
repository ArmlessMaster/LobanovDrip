import { Document } from 'mongoose';
import { Schema } from 'mongoose';

export default interface OrderClothes extends Document {
    clothes_id: Schema.Types.ObjectId;
    order_id: Schema.Types.ObjectId;
    count: number;
    size: string;
    color: string;
}
