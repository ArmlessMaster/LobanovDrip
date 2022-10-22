import ClothesModel from '@/resources/clothes/clothes.model';
import Clothes from '@/resources/clothes/clothes.interface';
import { Schema} from "mongoose";
import ClothesCount from '@/utils/interfaces/clothesCount.interface';

class ClothesService {
    private clothes = ClothesModel;

    /**
     * Create a new Clothes
     */
    public async create(
        name: string,
        imagesUrls: Array<string>,
        gifUrl: string,
        size: Array<string>,
        color: Array<string>,
        type: string,
        price: number,
        company: string,
        clothesCount: Array<ClothesCount>,
        ): Promise<Clothes> {
        try {
            const clothes = await this.clothes.create({
                name,
                imagesUrls,
                gifUrl,
                size,
                color,
                type,
                price,
                company,
                clothesCount,
            });

            return clothes;
        } catch (error) {
            throw new Error('Unable to create clothes');
        }
    }
}

export default ClothesService;