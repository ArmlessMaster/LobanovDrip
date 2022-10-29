import OrderClothesModel from '@/resources/orderClothes/orderClothes.model';
import OrderClothes from '@/resources/orderClothes/orderClothes.interface';
import { Schema } from 'mongoose';

class OrderClothesService {
    private orderClothes = OrderClothesModel;

    /**
     * Create a new order clothes
     */
    public async create(
        clothes_id: Schema.Types.ObjectId,
        order_id: Schema.Types.ObjectId,
        count: number,
        size: string,
        color: string
    ): Promise<OrderClothes> {
        try {
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
    public async delete(id: string): Promise<OrderClothes> {
        try {
            const orderClothes = await this.orderClothes
                .findByIdAndDelete(id)
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
        id: string,
        clothes_id: Schema.Types.ObjectId,
        order_id: Schema.Types.ObjectId,
        count: number,
        size: string,
        color: string
    ): Promise<OrderClothes> {
        try {
            const orderClothes = await this.orderClothes
                .findByIdAndUpdate(
                    { id },
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
     * Attempt to find orderClothes by id
     */
    public async findById(id: Schema.Types.ObjectId): Promise<OrderClothes> {
        try {
            const orderClothes = await this.orderClothes
                .findById(id)
                .populate({
                    path: 'clothes_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'order_id',
                    populate: { path: '_id' },
                });

            if (!orderClothes) {
                throw new Error('Unable to find order clothes with that id');
            }

            return orderClothes;
        } catch (error) {
            throw new Error('Unable to find order clothes');
        }
    }
}

export default OrderClothesService;
