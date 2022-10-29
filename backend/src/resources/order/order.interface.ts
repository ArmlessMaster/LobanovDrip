import { Document } from 'mongoose';
import { Schema } from 'mongoose';

export default interface Order extends Document {
    user_id: Schema.Types.ObjectId;
    moderator_id: Schema.Types.ObjectId;
    status: string;
    adress: string;
    phone: string;
    name: string;
    email: string;
}
