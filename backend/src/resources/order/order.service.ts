import OrderModel from '@/resources/order/order.model';
import Order from '@/resources/order/order.interface';
import { Schema} from "mongoose";
import OrderClothes from '@/utils/interfaces/clothesCount.interface';

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
                email
            });

            return order;
        } catch (error) {
            throw new Error('Unable to create order');
        }
    }
}

export default OrderService;