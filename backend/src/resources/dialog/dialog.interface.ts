import {Document} from 'mongoose';
import {Schema} from 'mongoose';

export default interface Dialog extends Document {
    user_id: Schema.Types.ObjectId;
    moderator_id: Schema.Types.ObjectId;
    lastMessage_id: Schema.Types.ObjectId;
}