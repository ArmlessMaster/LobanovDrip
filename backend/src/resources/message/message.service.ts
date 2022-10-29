import MessageModel from '@/resources/message/message.model';
import Message from '@/resources/message/message.interface';
import { Schema } from 'mongoose';

class MessageService {
    private message = MessageModel;

    /**
     * Create a new Message
     */
    public async create(
        text: string,
        readed: boolean,
        dialog: Schema.Types.ObjectId,
        author: Schema.Types.ObjectId
    ): Promise<Message> {
        try {
            const message = await this.message.create({
                text,
                readed,
                dialog,
                author,
            });

            return message;
        } catch (error) {
            throw new Error('Unable to create message');
        }
    }
}

export default MessageService;
