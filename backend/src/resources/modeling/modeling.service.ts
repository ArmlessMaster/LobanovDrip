import ModelingModel from '@/resources/modeling/modeling.model';
import Modeling from '@/resources/modeling/modeling.interface';
import { Schema} from "mongoose";
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
        images: Array<Image>,
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
}

export default ModelingService;