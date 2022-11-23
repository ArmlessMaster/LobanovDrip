import { Document } from 'mongoose';
import { Schema } from 'mongoose';

interface ClothesItem extends Document {
    clothes_id: Schema.Types.ObjectId;
    image: string;
    size: string;
    price: number;
    totalPrice: number;
    sale: number;
    salePrice: number;
    count: number;
    color: string;
}

interface OrderInfo extends Document {
    order_id: Schema.Types.ObjectId;
    clothes: Array<ClothesItem>;
    total: number;
    status: string;
}

interface ClothesImage extends Document {
    clothes_id: Schema.Types.ObjectId;
    image: string;
}

interface OrderItem extends Document {
    order_id: Schema.Types.ObjectId;
    order_number: string;
    total: number;
    images: Array<ClothesImage>;
    status: string;
    status_update: Date;
}

export { ClothesItem, OrderInfo, OrderItem, ClothesImage };
