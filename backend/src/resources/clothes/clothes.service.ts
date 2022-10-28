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


    /**
     * Attempt to delete clothes
     */

    public async delete(
        id: string
        ): Promise<Clothes> {
        try {
            const clothes = await this.clothes.findOneAndDelete({ _id: id });

            if (!clothes) {
                throw new Error('Unable to delete clothes with that id'); 
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to delete clothes');
        }
    }

    /**
     * Attempt to find clothes by id
     */

    public async findById(
        id: string
        ): Promise<Clothes> {
        try {
            const clothes = await this.clothes.findById(id).populate({
                path: 'collection_id',
                populate: { path: '_id' }
              });

            if (!clothes) {
                throw new Error('Unable to find clothes with that id'); 
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to find clothes');
        }
    }
    
    /**
     * Attempt to update clothes
     */

    public async update(
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
                throw new Error('Unable to update clothes with thad id'); 
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to change clothes');
        }
    }

    /**
     * Attempt to find clothes by name
     */

    public async findByName(
        name: string
        ): Promise<Clothes | any> {
        try {
            const clothes = await this.clothes.find({ name: name }).populate({
                path: 'collection_id',
                populate: { path: '_id' }
              });
            
            if (!clothes) {
                throw new Error('Unable to find clothes with that name'); 
            }
            
            return clothes;
        } catch (error) {
            throw new Error('Unable to find clothes');
        }
    }
}

export default ClothesService;

