import DialogModel from '@/resources/dialog/dialog.model';
import Dialog from '@/resources/dialog/dialog.interface';
import { Schema } from 'mongoose';

class DialogService {
    private dialog = DialogModel;

    /**
     * Create a new Dialog
     */
    public async create(
        user_id: Schema.Types.ObjectId,
        moderator_id: Schema.Types.ObjectId,
        lastMessage_id: Schema.Types.ObjectId
    ): Promise<Dialog> {
        try {
            const dialog = await this.dialog.create({
                user_id,
                moderator_id,
                lastMessage_id,
            });

            return dialog;
        } catch (error) {
            throw new Error('Unable to create dialog');
        }
    }
}

export default DialogService;
