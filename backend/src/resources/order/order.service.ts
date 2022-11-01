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
    public async delete(_id: Schema.Types.ObjectId): Promise<Order> {
        try {
            const order = await this.order
                .findOneAndDelete({ _id })
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
        _id: Schema.Types.ObjectId,
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
                    { _id },
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
     * Attempt to find all orders
     */
     public async get(): Promise<Order | Array<Order> | Error> {
        try {
            const orders = await this.order.find({}, null, {
                sort: { createdAt: -1 },
            });

            if (!orders) {
                throw new Error('Unable to find orders');
            }

            return orders;
        } catch (error) {
            throw new Error('Unable to find orders');
        }
    }

    /**
     * Attempt to find order 
     */
    public async find(props: Object): Promise<Order | Array<Order> | Order> {
        try {
            const orders = await this.order
                .find(props)
                .populate({
                    path: 'user_id',
                    populate: { path: '_id' },
                })
                .populate({
                    path: 'moderator_id',
                    populate: { path: '_id' },
                });

            if (!orders) {
                throw new Error('Unable to find orders');
            }

            return orders;
        } catch (error) {
            throw new Error('Unable to find order');
        }
    }
}

export default OrderService;
