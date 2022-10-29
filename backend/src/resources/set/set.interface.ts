import { Document } from 'mongoose';
import { Schema } from 'mongoose';

export default interface Set extends Document {
    name: string;
    user_id: Schema.Types.ObjectId;
    clothes_id: Array<Schema.Types.ObjectId>;
}
