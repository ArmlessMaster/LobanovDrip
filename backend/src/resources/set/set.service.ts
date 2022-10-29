import SetModel from '@/resources/set/set.model';
import Set from '@/resources/set/set.interface';
import { Schema } from 'mongoose';

class SetService {
    private set = SetModel;

    /**
     * Create a new set
     */
    public async create(
        name: string,
        user_id: Schema.Types.ObjectId,
        clothes_id: Array<Schema.Types.ObjectId>
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
    /**
     * Attempt to delete set by id
     */
    public async delete(id: Schema.Types.ObjectId): Promise<Set> {
        try {
            const set = await this.set
                .findByIdAndDelete(id)
                .populate({
                    path: 'user_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'clothes_id',
                    populate: { path: '_id' },
                });

            if (!set) {
                throw new Error('Unable to delete set with that id');
            }

            return set;
        } catch (error) {
            throw new Error('Unable to delete set');
        }
    }

    /**
     * Attempt to update set by id
     */
    public async update(
        id: Schema.Types.ObjectId,
        name: string,
        user_id: Schema.Types.ObjectId,
        clothes_id: Array<Schema.Types.ObjectId>
    ): Promise<Set> {
        try {
            const set = await this.set
                .findByIdAndUpdate(
                    id,
                    {
                        name: name,
                        user_id: user_id,
                        clothes_id: clothes_id,
                    },
                    { new: true }
                )
                .populate({
                    path: 'user_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'clothes_id',
                    populate: { path: '_id' },
                });

            if (!set) {
                throw new Error('Unable to update set with thad id');
            }

            return set;
        } catch (error) {
            throw new Error('Unable to change set');
        }
    }

    /**
     * Attempt to find set by id
     */
    public async findById(id: Schema.Types.ObjectId): Promise<Set> {
        try {
            const set = await this.set
                .findById(id)
                .populate({
                    path: 'user_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'clothes_id',
                    populate: { path: '_id' },
                });

            if (!set) {
                throw new Error('Unable to find set with that id');
            }

            return set;
        } catch (error) {
            throw new Error('Unable to find set');
        }
    }
}

export default SetService;
