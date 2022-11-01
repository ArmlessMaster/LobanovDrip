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
    ): Promise<Set | Error> {
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
     * Attempt to update set by id
     */
    public async update(
        _id: Schema.Types.ObjectId,
        name: string,
        user_id: Schema.Types.ObjectId,
        clothes_id: Array<Schema.Types.ObjectId>
    ): Promise<Set | Error> {
        try {
            const set = await this.set
                .findByIdAndUpdate(
                    _id,
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
     * Attempt to delete set by id
     */
    public async delete(_id: Schema.Types.ObjectId): Promise<Set | Error> {
        try {
            const set = await this.set
                .findByIdAndDelete(_id)
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
     * Attempt to find all sets
     */
    public async get(): Promise<Set | Array<Set> | Error> {
        try {
            const sets = await this.set.find({}, null, {
                sort: { createdAt: -1 },
            });

            if (!sets) {
                throw new Error('Unable to find sets');
            }

            return sets;
        } catch (error) {
            throw new Error('Unable to find sets');
        }
    }

    /**
     * Attempt to find set
     */
    public async find(props: Object): Promise<Array<Set> | Set | Error> {
        try {
            const sets = await this.set
                .find(props, null, { sort: { createdAt: -1 } })
                .populate({
                    path: 'user_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'clothes_id',
                    populate: { path: '_id' },
                });

            if (!sets) {
                throw new Error('Unable to find sets');
            }

            return sets;
        } catch (error) {
            throw new Error('Unable to find sets');
        }
    }
}

export default SetService;
