import ClothesModel from '@/resources/clothes/clothes.model';
import Clothes from '@/resources/clothes/clothes.interface';
import ClothesCount from '@/utils/interfaces/clothesCount.interface';
import {Schema} from 'mongoose';

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
        sale: number,
        assemblage: string,
        material: string,
        care: string,
        clothesCount: Array<ClothesCount>,
        sex: string,
        collection_id: Schema.Types.ObjectId,
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
                sale,
                assemblage,
                material,
                care,
                clothesCount,
                sex,
                collection_id,
            });

            return clothes;
        } catch (error) {
            throw new Error('Unable to create clothes');
        }
    }

    public async delete(
        id: string
        ): Promise<Clothes> {
        try {
            const clothes = await this.clothes.findOneAndRemove({ _id: id });

            if (!clothes) {
                throw new Error('Unable to find clothes'); 
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to delete clothes');
        }
    }

    public async index(
        id: string
        ): Promise<Clothes> {
        try {
            const clothes = await this.clothes.findById(id).populate({
                path: 'collection_id',
                populate: { path: '_id' }
              });

            if (!clothes) {
                throw new Error('Unable to find clothes'); 
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to find clothes');
        }
    }
    
    public async change(
        id: string,
        name: string,
        imagesUrls: Array<string>,
        gifUrl: string,
        size: Array<string>,
        color: Array<string>,
        type: string,
        price: number,
        company: string,
        sale: number,
        assemblage: string,
        material: string,
        care: string,
        clothesCount: Array<ClothesCount>,
        sex: string,
        collection_id: Schema.Types.ObjectId,
        ): Promise<Clothes> {
        try {
            const clothes = await this.clothes.findByIdAndUpdate({ _id: id }, {
                name: name,
                imagesUrls: imagesUrls, 
                gifUrl: gifUrl, 
                size: size, 
                color: color,
                type: type, 
                price: price, 
                company: company, 
                sale: sale, 
                assemblage: assemblage, 
                material: material, 
                care: care, 
                clothesCount: clothesCount, 
                sex: sex,
                collection_id: collection_id,
            }, {new: true});

            if (!clothes) {
                throw new Error('Unable to change clothe'); 
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to change clothe');
        }
    }

    public async findClothes(
        name: string
        ): Promise<Clothes | any> {
        try {
            const clothes = await this.clothes.find({ name: name }).populate({
                path: 'collection_id',
                populate: { path: '_id' }
              });
            
            if (!clothes) {
                throw new Error('Unable to change clothes'); 
            }
            
            return clothes;
        } catch (error) {
            throw new Error('Unable to find clothes');
        }
    }
}

export default ClothesService;

