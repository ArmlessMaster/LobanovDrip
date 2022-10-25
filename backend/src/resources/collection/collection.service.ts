import CollectionModel from '@/resources/collection/collection.model';
import Collection from '@/resources/collection/collection.interface';
import { Schema} from "mongoose";

class CollectionService {
    private collection = CollectionModel;

    /**
     * Create a new collection
     */
    public async create(
        name: string,
        image: string,
        description: string,
        ): Promise<Collection> {
        try {
            const collection = await this.collection.create({
                name,
                image,
                description,
            });

            return collection;
        } catch (error) {
            throw new Error('Unable to create collection');
        }
    }
}

export default CollectionService;