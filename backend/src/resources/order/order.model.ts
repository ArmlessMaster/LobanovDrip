import { Schema, model } from "mongoose";
import Order from '@/resources/order/order.interface'

const OrderSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'Accounts'
        },
        moderator_id: {
            type: Schema.Types.ObjectId,
            ref: 'Accounts'
        },
        status: {
            type: String,
        },
        adress: {
            type: String,
        },
    },
    { timestamps: true}
);

export default model<Order>('Orders', OrderSchema);
