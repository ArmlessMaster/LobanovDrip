import ModelingModel from '@/resources/modeling/modeling.model';
import Modeling from '@/resources/modeling/modeling.interface';
import { Schema } from 'mongoose';
import Image from '@/utils/interfaces/image.interface';

class ModelingService {
    private modeling = ModelingModel;

    /**
     * Create a new modeling
     */
    public async create(
        name: string,
        size: string,
        color: string,
        user_id: Schema.Types.ObjectId,
        images: Array<Image>
    ): Promise<Modeling> {
        try {
            const modeling = await this.modeling.create({
                name,
                size,
                color,
                user_id,
                images,
            });

            return modeling;
        } catch (error) {
            throw new Error('Unable to create modeling');
        }
    }

    /**
     * Attempt to delete modeling by id
     */
    public async delete(_id: Schema.Types.ObjectId): Promise<Modeling> {
        try {
            const modeling = await this.modeling
                .findOneAndDelete({ _id })
                .populate({
                    path: 'user_id',
                    populate: { path: '_id' },
                });

            if (!modeling) {
                throw new Error('Unable to delete modeling with that id');
            }

            return modeling;
        } catch (error) {
            throw new Error('Unable to delete modeling');
        }
    }

    /**
     * Attempt to update modeling by id
     */
    public async update(
        _id: Schema.Types.ObjectId,
        name: string,
        size: string,
        color: string,
        user_id: Schema.Types.ObjectId,
        images: Array<Image>
    ): Promise<Modeling> {
        try {
            const modeling = await this.modeling
                .findByIdAndUpdate(
                    { _id },
                    {
                        name: name,
                        size: size,
                        color: color,
                        user_id: user_id,
                        images: images,
                    },
                    { new: true }
                )
                .populate({
                    path: 'user_id',
                    populate: { path: '_id' },
                });

            if (!modeling) {
                throw new Error('Unable to update modeling with thad id');
            }

            return modeling;
        } catch (error) {
            throw new Error('Unable to change modeling');
        }
    }

    
    /**
     * Attempt to find all sets
     */
     public async get(): Promise<Modeling | Array<Modeling> | Modeling> {
        try {
            const modeling = await this.modeling.find({}, null, {
                sort: { createdAt: -1 },
            });

            if (!modeling) {
                throw new Error('Unable to find modeling');
            }

            return modeling;
        } catch (error) {
            throw new Error('Unable to find modeling');
        }
    }

    /**
     * Attempt to find modeling by id
     */
    public async find(props: Object): Promise<Modeling | Array<Modeling> | Modeling> {
        try {
            const modeling = await this.modeling.find(props).populate({
                path: 'user_id',
                populate: { path: '_id' },
            });

            if (!modeling) {
                throw new Error('Unable to find modeling');
            }

            return modeling;
        } catch (error) {
            throw new Error('Unable to find modeling');
        }
    }
}

export default ModelingService;
