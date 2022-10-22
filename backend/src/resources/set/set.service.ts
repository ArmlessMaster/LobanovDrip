import SetModel from '@/resources/set/set.model';
import Set from '@/resources/set/set.interface';
import { Schema} from "mongoose";

class SetService {
    private set = SetModel;

    /**
     * Create a new set
     */
    public async create(
        name: string,
        user_id: Schema.Types.ObjectId,
        clothes_id: Array<Schema.Types.ObjectId>,
        ): Promise<Set> {
        try {
            const set = await this.set.create({
                name,
                user_id,
                clothes_id,
            });

            return set;
        } catch (error) {
            throw new Error('Unable to create set');
        }
    }
}

export default SetService;