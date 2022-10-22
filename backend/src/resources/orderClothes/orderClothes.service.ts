import OrderClothesModel from '@/resources/orderClothes/orderClothes.model';
import OrderClothes from '@/resources/orderClothes/orderClothes.interface';
import { Schema} from "mongoose";

class OrderClothesService {
    private orderClothes = OrderClothesModel;

    /**
     * Create a new order clothes
     */
    public async create(
        user_id: Schema.Types.ObjectId,
        moderator_id: Schema.Types.ObjectId,
        count: number,
        size: string,
        color: string,
        ): Promise<OrderClothes> {
        try {
            const orderClothes = await this.orderClothes.create({
                user_id,
                moderator_id,
                count,
                size,
                color,
            });

            return orderClothes;
        } catch (error) {
            throw new Error('Unable to create order clothes ');
        }
    }
}

export default OrderClothesService;