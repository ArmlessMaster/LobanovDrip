import OrderModel from '@/resources/order/order.model';
import Order from '@/resources/order/order.interface';
import { Schema } from 'mongoose';

class OrderService {
    private order = OrderModel;

    /**
     * Create a new order
     */
    public async create(
        user_id: Schema.Types.ObjectId,
        moderator_id: Schema.Types.ObjectId,
        status: string,
        adress: string,
        phone: string,
        name: string,
        email: string
    ): Promise<Order> {
        try {
            const order = await this.order.create({
                user_id,
                moderator_id,
                status,
                adress,
                phone,
                name,
                email,
            });

            return order;
        } catch (error) {
            throw new Error('Unable to create order');
        }
    }

    /**
     * Attempt to delete order by id
     */
    public async delete(id: Schema.Types.ObjectId): Promise<Order> {
        try {
            const order = await this.order
                .findOneAndDelete({ _id: id })
                .populate({
                    path: 'user_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'moderator_id',
                    populate: { path: '_id' },
                });

            if (!order) {
                throw new Error('Unable to delete order with that id');
            }

            return order;
        } catch (error) {
            throw new Error('Unable to delete order');
        }
    }

    /**
     * Attempt to update order by id
     */
    public async update(
        id: Schema.Types.ObjectId,
        user_id: Schema.Types.ObjectId,
        moderator_id: Schema.Types.ObjectId,
        status: string,
        adress: string,
        phone: string,
        name: string,
        email: string
    ): Promise<Order> {
        try {
            const order = await this.order
                .findByIdAndUpdate(
                    { _id: id },
                    {
                        user_id: user_id,
                        moderator_id: moderator_id,
                        status: status,
                        adress: adress,
                        phone: phone,
                        name: name,
                        email: email,
                    },
                    { new: true }
                )
                .populate({
                    path: 'user_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'moderator_id',
                    populate: { path: '_id' },
                });

            if (!order) {
                throw new Error('Unable to update order with thad id');
            }

            return order;
        } catch (error) {
            throw new Error('Unable to change order');
        }
    }

    /**
     * Attempt to find order by id
     */
    public async findById(id: Schema.Types.ObjectId): Promise<Order> {
        try {
            const order = await this.order
                .findById(id)
                .populate({
                    path: 'user_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'moderator_id',
                    populate: { path: '_id' },
                });

            if (!order) {
                throw new Error('Unable to find order with that id');
            }

            return order;
        } catch (error) {
            throw new Error('Unable to find order');
        }
    }
}

export default OrderService;
