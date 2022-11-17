import OrderClothesModel from '@/resources/orderClothes/orderClothes.model';
import OrderClothes from '@/resources/orderClothes/orderClothes.interface';
import { Schema } from 'mongoose';
import ClothesService from '@/resources/clothes/clothes.service';
import Clothes from '@/resources/clothes/clothes.interface';

class OrderClothesService {
    private orderClothes = OrderClothesModel;
    private ClothesService = new ClothesService();

    /**
     * Create a new order clothes
     */
    public async create(
        clothes_id: Schema.Types.ObjectId,
        order_id: Schema.Types.ObjectId,
        count: number,
        size: string,
        color: string
    ): Promise<OrderClothes | Error> {
        try {
            const clothes = (await this.ClothesService.find({
                _id: clothes_id,
            })) as Array<Clothes>;

            if (!clothes) {
                throw new Error('Unable to add clothes with that id');
            }

            const clothesCount = clothes[0].clothesCount.find(
                (item) => item.size === size
            );

            if (clothesCount && clothesCount.count < count) {
                throw new Error(
                    'The number of clothes specified in the order exceeds the allowable'
                );
            }

            const orderClothes = await this.orderClothes.create({
                clothes_id,
                order_id,
                count,
                size,
                color,
            });

            return orderClothes;
        } catch (error) {
            throw new Error('Unable to create order clothes');
        }
    }

    /**
     * Attempt to delete orderClothes by id
     */
    public async delete(
        _id: Schema.Types.ObjectId
    ): Promise<OrderClothes | Error> {
        try {
            const orderClothes = await this.orderClothes
                .findByIdAndDelete(_id)
                .populate({
                    path: 'clothes_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'order_id',
                    populate: { path: '_id' },
                });

            if (!orderClothes) {
                throw new Error('Unable to delete order clothes with that id');
            }

            return orderClothes;
        } catch (error) {
            throw new Error('Unable to delete order clothes');
        }
    }

    /**
     * Attempt to update orderClothes by id
     */
    public async update(
        _id: string,
        clothes_id: Schema.Types.ObjectId,
        order_id: Schema.Types.ObjectId,
        count: number,
        size: string,
        color: string
    ): Promise<OrderClothes | Error> {
        try {
            const currOrderClothes = (await this.orderClothes.findOne({
                _id: _id,
            })) as OrderClothes;

            if (!currOrderClothes) {
                throw new Error('Unable to add clothes with that id');
            }

            const clothes = (await this.ClothesService.find({
                _id: currOrderClothes.clothes_id,
            })) as Array<Clothes>;

            if (!clothes) {
                throw new Error('Unable to add clothes with that id');
            }

            const clothesCount = clothes[0].clothesCount.find(
                (item) => item.size === currOrderClothes.size
            );

            if (clothesCount && clothesCount.count < count) {
                throw new Error(
                    'The number of clothes specified in the order exceeds the allowable'
                );
            }

            const orderClothes = await this.orderClothes
                .findByIdAndUpdate(
                    { _id },
                    {
                        clothes_id: clothes_id,
                        order_id: order_id,
                        count: count,
                        size: size,
                        color: color,
                    },
                    { new: true }
                )
                .populate({
                    path: 'clothes_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'order_id',
                    populate: { path: '_id' },
                });

            if (!orderClothes) {
                throw new Error('Unable to update order lothes with thad id');
            }

            return orderClothes;
        } catch (error) {
            throw new Error('Unable to change order Clothes');
        }
    }

    /**
     * Attempt to find all sets
     */
    public async get(): Promise<OrderClothes | Array<OrderClothes> | Error> {
        try {
            const orderClothes = await this.orderClothes.find({}, null, {
                sort: { createdAt: -1 },
            });

            if (!orderClothes) {
                throw new Error('Unable to find order clothes');
            }

            return orderClothes;
        } catch (error) {
            throw new Error('Unable to order clothes');
        }
    }

    /**
     * Attempt to find orderClothes by id
     */
    public async find(
        props: Object
    ): Promise<OrderClothes | Array<OrderClothes> | Error> {
        try {
            const orderClothes = await this.orderClothes.find(props);

            if (!orderClothes) {
                throw new Error('Unable to find order clothes');
            }

            return orderClothes;
        } catch (error) {
            throw new Error('Unable to find order clothes');
        }
    }
}

export default OrderClothesService;
