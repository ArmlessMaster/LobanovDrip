import { Schema } from 'mongoose';
import OrderModel from '@/resources/order/order.model';
import OrderClothesModel from '@/resources/orderClothes/orderClothes.model';
import {
    ClothesItem,
    OrderInfo,
    OrderItem,
} from '@/resources/clothesToOrder/clothesToOrder.interface';
import Clothes from '@/resources/clothes/clothes.interface';
import OrderClothes from '@/resources/orderClothes/orderClothes.interface';
import { ClothesImage } from '@/resources/clothesToOrder/clothesToOrder.interface';
import ClothesService from '@/resources/clothes/clothes.service';
import OrderClothesService from '@/resources/orderClothes/orderClothes.service';

class ClothesToOrderService {
    private order = OrderModel;
    private orderClothes = OrderClothesModel;
    private ClothesService = new ClothesService();
    private OrderClothesService = new OrderClothesService();

    /**
     * Attempt to get order info
     */
    public async orderInfo(
        order_id: Schema.Types.ObjectId
    ): Promise<OrderInfo | Error> {
        try {
            this.orderClear(order_id);

            const order = await this.order
                .findOne({ _id: order_id })
                .select(['_id', 'status'])
                .exec();

            const orderClothes = await this.orderClothes
                .find({ order_id: order_id })
                .populate({
                    path: 'clothes_id',
                    populate: { path: '_id' },
                    select: {
                        _id: 1,
                        name: 1,
                        imagesUrls: 1,
                        price: 1,
                        sale: 1,
                    },
                })
                .select([
                    '_id',
                    'clothes_id',
                    'count',
                    'size',
                    'color',
                    'clothesPrice',
                    'clothesSale',
                ])
                .exec();

            if (!order) {
                throw new Error('Unable to find order');
            }

            if (!orderClothes) {
                throw new Error('Unable to find order clothes');
            }

            const orderInfo = {} as OrderInfo;
            if (orderClothes.length === 0) {
                return orderInfo;
            }
            orderInfo.clothes = [] as Array<ClothesItem>;

            orderClothes.map((item) => {
                const clothesItem = {} as ClothesItem;
                const clothes = item.clothes_id as Clothes;

                clothesItem.clothes_id = clothes._id;
                if (
                    clothes &&
                    clothes.imagesUrls &&
                    clothes.imagesUrls.length >= 1
                ) {
                    clothesItem.image = clothes.imagesUrls[0];
                }
                clothesItem.size = item.size;
                if (order.status === 'cart') {
                    clothesItem.price = clothes.price;
                    clothesItem.sale = clothes.sale;
                    clothesItem.salePrice =
                        clothes.price - clothes.price * (clothes.sale / 100);
                    clothesItem.totalPrice = clothesItem.salePrice * item.count;
                } else {
                    clothesItem.price = item.clothesPrice;
                    clothesItem.sale = item.clothesSale;
                    clothesItem.salePrice =
                        item.clothesPrice -
                        item.clothesPrice * (item.clothesSale / 100);
                    clothesItem.totalPrice = clothesItem.salePrice * item.count;
                }

                clothesItem.count = item.count;
                clothesItem.color = item.color;

                orderInfo.clothes.push(clothesItem);
            });

            orderInfo.order_id = order._id;
            orderInfo.total = orderInfo.clothes
                .map((item) => item.totalPrice)
                .reduce((prev, next) => prev + next);
            orderInfo.status = order.status;

            return orderInfo;
        } catch (error) {
            throw new Error('Unable to get order info');
        }
    }

    /**
     * Attempt to get user orders
     */
    public async orders(
        account_id: Schema.Types.ObjectId
    ): Promise<Array<OrderItem> | Error> {
        try {
            const orders = await this.order
                .find({ user_id: account_id })
                .select(['_id', 'status', 'status_update'])
                .exec();

            if (!orders) {
                throw new Error('Unable to find orders');
            }

            let orderClothes = [] as Array<Array<OrderClothes>>;

            await Promise.all(
                orders.map(async (item) => {
                    this.orderClear(item._id);
                    const orderClothesItem = (await this.orderClothes
                        .find({ order_id: item._id })
                        .populate({
                            path: 'clothes_id',
                            populate: { path: '_id' },
                            select: {
                                _id: 1,
                                name: 1,
                                imagesUrls: 1,
                                price: 1,
                                sale: 1,
                            },
                        })
                        .select([
                            '_id',
                            'clothes_id',
                            'count',
                            'size',
                            'color',
                            'clothesPrice',
                            'clothesSale',
                        ])
                        .exec()) as Array<OrderClothes>;
                    orderClothes.push(orderClothesItem);
                })
            );

            if (!orderClothes) {
                throw new Error('Unable to find order clothes');
            }
            orderClothes = orderClothes.filter((item) => item.length > 0);
            const orderItems = [] as Array<OrderItem>;

            for (let i = 0; i < orderClothes.length; i++) {
                const orderItem = {} as OrderItem;
                const clothesItems = [] as Array<ClothesItem>;
                orderItem.images = [] as Array<ClothesImage>;
                const clothesImage = {} as ClothesImage;

                orderItem._id = orders[i]._id;

                const date = new Date(
                    parseInt(orders[i]._id.toString().substring(0, 8), 16) *
                        1000
                );

                orderItem.order_number = date.getTime().toString();
                orderItem.status = orders[i].status;
                orderItem.status_update = orders[i].status_update;

                for (let j = 0; j < orderClothes[i].length; j++) {
                    const clothes = orderClothes[i][j].clothes_id as Clothes;
                    const clothesItem = {} as ClothesItem;
                    clothesItem.clothes_id = clothes._id;

                    if (
                        clothes &&
                        clothes.imagesUrls &&
                        clothes.imagesUrls.length >= 1
                    ) {
                        clothesItem.image = clothes.imagesUrls[0];
                        clothesImage.clothes_id = clothes._id;
                        clothesImage.image = clothes.imagesUrls[0];
                        orderItem.images.push(clothesImage);
                    }
                    clothesItem.size = orderClothes[i][j].size;
                    if (orderItem.status === 'cart') {
                        clothesItem.price = clothes.price;
                        clothesItem.sale = clothes.sale;
                        clothesItem.salePrice =
                            clothes.price -
                            clothes.price * (clothes.sale / 100);
                        clothesItem.totalPrice =
                            clothesItem.salePrice * orderClothes[i][j].count;
                    } else {
                        clothesItem.price = orderClothes[i][j].clothesPrice;
                        clothesItem.sale = orderClothes[i][j].clothesSale;
                        clothesItem.salePrice =
                            clothesItem.price -
                            clothesItem.price * (clothesItem.sale / 100);
                        clothesItem.totalPrice =
                            clothesItem.salePrice * orderClothes[i][j].count;
                    }

                    clothesItem.count = orderClothes[i][j].count;
                    clothesItem.color = orderClothes[i][j].color;
                    clothesItems.push(clothesItem);
                }
                orderItem.total = clothesItems
                    .map((item) => item.totalPrice)
                    .reduce((prev, next) => prev + next);

                orderItems.push(orderItem);
            }

            return orderItems;
        } catch (error) {
            throw new Error('Error');
        }
    }

    /**
     * Attempt to get order cler
     */
    public async orderClear(
        order_id: Schema.Types.ObjectId
    ): Promise<void | Error> {
        try {
            const clothes = (await this.OrderClothesService.find({
                order_id: order_id,
            })) as Array<OrderClothes>;
            const clothes_id = clothes.map((item) => [
                item.clothes_id as Schema.Types.ObjectId,
            ]);
            await Promise.all(
                clothes_id.map(async (item) => {
                    const objectid = item[0] as Schema.Types.ObjectId;
                    const exist = await this.ClothesService.exist(objectid);
                    if (!exist) {
                        await this.orderClothes.deleteMany({
                            clothes_id: objectid,
                        });
                    }
                })
            );
        } catch (error) {
            throw new Error('Unable to clear order');
        }
    }
}

export default ClothesToOrderService;
