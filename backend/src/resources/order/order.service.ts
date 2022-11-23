import OrderModel from '@/resources/order/order.model';
import Order from '@/resources/order/order.interface';
import { Schema } from 'mongoose';
import ClothesService from '@/resources/clothes/clothes.service';
import OrderClothesService from '@/resources/orderClothes/orderClothes.service';
import Clothes from '@/resources/clothes/clothes.interface';
import OrderClothes from '@/resources/orderClothes/orderClothes.interface';
import OrderClothesModel from '@/resources/orderClothes/orderClothes.model';

class OrderService {
    private order = OrderModel;
    private ClothesService = new ClothesService();
    private OrderClothesService = new OrderClothesService();
    private orderClothes = OrderClothesModel;
    /**
     * Create a new order
     */
    public async create(
        user_id: Schema.Types.ObjectId,
        moderator_id: Schema.Types.ObjectId,
        status: string,
        region: string,
        city: string,
        novaposhta: string,
        phone: string,
        name: string,
        surname: string,
        patronymic: string,
        email: string,
        invoice: string,
        status_update: Date,
        payment_type: string
    ): Promise<Order> {
        try {
            const order = await this.order.create({
                user_id,
                moderator_id,
                status,
                region,
                city,
                novaposhta,
                phone,
                name,
                email,
                invoice,
                status_update,
                payment_type,
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
        region: string,
        city: string,
        novaposhta: string,
        phone: string,
        name: string,
        surname: string,
        patronymic: string,
        email: string,
        invoice: string,
        status_update: Date,
        payment_type: string,
        account_id: Schema.Types.ObjectId
    ): Promise<Order> {
        try {
            const order = await this.order
                .findOneAndUpdate(
                    { _id: _id },
                    {
                        user_id: user_id,
                        moderator_id: moderator_id,
                        status: status,
                        region: region,
                        city: city,
                        novaposhta: novaposhta,
                        phone: phone,
                        name: name,
                        surname: surname,
                        patronymic: patronymic,
                        email: email,
                        invoice: invoice,
                        status_update: status_update,
                        payment_type: payment_type,
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

            if (status === 'processing') {
                const clothes = (await this.OrderClothesService.find({
                    order_id: _id,
                })) as Array<OrderClothes>;
                const clothes_id = clothes.map((item) => [
                    item.clothes_id as Schema.Types.ObjectId,
                    item.size,
                    item.count,
                ]);
                await Promise.all(
                    clothes_id.map(async (item) => {
                        const objectid = item[0] as Schema.Types.ObjectId;
                        const size = item[1] as string;
                        const number = item[2] as number;
                        await this.ClothesService.incrementClothesCount(
                            objectid,
                            size,
                            number * -1
                        );
                    })
                );
                const clothesInOrder = (await this.OrderClothesService.find({
                    order_id: _id,
                })) as Array<OrderClothes>;
                const clothesInOrderId = clothesInOrder.map((item) => [
                    item.clothes_id as Schema.Types.ObjectId,
                ]);
                await Promise.all(
                    clothesInOrderId.map(async (item) => {
                        const objectid = item[0] as Schema.Types.ObjectId;
                        const clothesInOrderObject =
                            (await this.ClothesService.find({
                                _id: objectid,
                            })) as Array<Clothes>;
                        await this.orderClothes.findOneAndUpdate(
                            { order_id: _id, clothes_id: objectid },
                            {
                                clothesPrice: clothesInOrderObject[0].price,
                                clothesSale: clothesInOrderObject[0].sale,
                            }
                        );
                    })
                );
                await this.order.create({ user_id: account_id });
            }

            if (status === 'cancellation') {
                const clothes = (await this.OrderClothesService.find({
                    order_id: _id,
                })) as Array<OrderClothes>;
                const clothes_id = clothes.map((item) => [
                    item.clothes_id as Schema.Types.ObjectId,
                    item.size,
                    item.count,
                ]);
                await Promise.all(
                    clothes_id.map(async (item) => {
                        const objectid = item[0] as Schema.Types.ObjectId;
                        const size = item[1] as string;
                        const number = item[2] as number;
                        await this.ClothesService.incrementClothesCount(
                            objectid,
                            size,
                            number
                        );
                    })
                );
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
