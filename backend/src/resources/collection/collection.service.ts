import CollectionModel from '@/resources/collection/collection.model';
import Collection from '@/resources/collection/collection.interface';
import { Schema } from 'mongoose';
const {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} = require('firebase/storage');
const storage = require('../../firebase');

class CollectionService {
    private collection = CollectionModel;

    private randGen() {
        const abc: string =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let name: string = '';
        while (name.length < 50) {
            name += abc[Math.floor(Math.random() * abc.length)];
        }
        return name;
    }
    /**
     * Create a new collection
     */
    public async create(
        name: string,
        images: Express.Multer.File[],
        description: string
    ): Promise<Collection | Error> {
        try {
            const imagesUrls: Array<string> = [];
            const gifUrls: Array<string> = [];

            await Promise.all(
                images.map(async (file: Express.Multer.File) => {
                    const randomName: string = '☂' + this.randGen() + '☁';
                    const imageRef = ref(storage, randomName);
                    const metatype = {
                        contentType: file?.mimetype,
                        name: randomName,
                    };
                    await uploadBytes(imageRef, file?.buffer, metatype)
                        .then((snapshot: object) => {
                            //console.log('uploaded!');
                        })
                        .catch((error: Error) => console.log(error.message));
                    await getDownloadURL(ref(storage, randomName)).then(
                        (url: string) => {
                            if (file?.mimetype === 'image/gif') {
                                gifUrls.push(url);
                            } else {
                                imagesUrls.push(url);
                            }
                        }
                    );
                })
            );

            const imageUrl = imagesUrls.join();
            const gifUrl = gifUrls.join();

            const collection = await this.collection.create({
                name,
                imageUrl,
                gifUrl,
                description,
            });

            return collection;
        } catch (error) {
            throw new Error('Unable to create collection');
        }
    }

    /**
     *Attempt to update a collection by id
     */
    public async update(
        _id: Schema.Types.ObjectId,
        name: string,
        images: Express.Multer.File[],
        description: string
    ): Promise<Collection | Error> {
        try {
            const imagesUrls: Array<string> = [];
            const gifUrls: Array<string> = [];

            await Promise.all(
                images.map(async (file: Express.Multer.File) => {
                    const randomName: string = '☂' + this.randGen() + '☁';
                    const imageRef = ref(storage, randomName);
                    const metatype = {
                        contentType: file?.mimetype,
                        name: randomName,
                    };
                    await uploadBytes(imageRef, file?.buffer, metatype)
                        .then((snapshot: object) => {
                            //console.log('uploaded!');
                        })
                        .catch((error: Error) => console.log(error.message));
                    await getDownloadURL(ref(storage, randomName)).then(
                        (url: string) => {
                            if (file?.mimetype === 'image/gif') {
                                gifUrls.push(url);
                            } else {
                                imagesUrls.push(url);
                            }
                        }
                    );
                })
            );

            const update = {
                name: name,
                description: description,
            } as Collection;

            if (imagesUrls.length === 1) {
                update['imageUrl'] = imagesUrls.join();
            }
            if (gifUrls.length === 1) {
                update['gifUrl'] = gifUrls.join();
            }

            const collection = await this.collection.findByIdAndUpdate(
                _id,
                update,
                { new: true }
            );

            if (!collection) {
                throw new Error('Unable to update collection with thad id');
            }

            return collection;
        } catch (error) {
            throw new Error('Unable to create collection');
        }
    }

    /**
     * Attempt to delete collection
     */

    public async delete(_id: Schema.Types.ObjectId): Promise<Collection | Error> {
        try {
            const collection = await this.collection.findByIdAndDelete(_id);

            if (!collection) {
                throw new Error('Unable to delete clothes with that id');
            }

            return collection;
        } catch (error) {
            throw new Error('Unable to delete clothes');
        }
    }

    /**
     * Attempt to delete image by url
     */

    public async deleteImage(
        _id: Schema.Types.ObjectId,
        url: string
    ): Promise<Collection | Error> {
        try {
            const deletePic =
                '☂' + url.split('%E2%98%82')[1].split('%E2%98%81')[0] + '☁';
            const deleteRef = ref(storage, deletePic);
            const result = await deleteObject(deleteRef)
                .then(() => {
                    return 'deleted';
                })
                .catch((error: Error) => {
                    throw new Error(error.message);
                });
            let collection = (await this.collection.findById(_id)) as Collection;
            if (collection.imageUrl === url) {
                collection = (await this.collection.findByIdAndUpdate(
                    _id,
                    { imageUrl: '' },
                    { new: true }
                )) as Collection;
            } else {
                collection = (await this.collection.findByIdAndUpdate(
                    _id,
                    { gifUrl: '' },
                    { new: true }
                )) as Collection;
            }

            return collection;
        } catch (error) {
            throw new Error('Unable to find image');
        }
    }

    /**
     * Attempt to find all collections
     */
    public async get(): Promise<Collection | Array<Collection> | Error> {
        try {
            const collections = await this.collection.find({},  null, { sort: { createdAt: -1 }});

            if (!collections) {
                throw new Error('Unable to find clothes');
            }

            return collections;
        } catch (error) {
            throw new Error('Unable to find clothes');
        }
    }

    /**
     * Attempt to find collections by params
     */

    public async find(props: Object): Promise<Collection | Array<Collection> | Error> {
        try {
            const collections = await this.collection.find(props,  null, { sort: { createdAt: -1 }});

            if (!collections) {
                throw new Error(`Unable to find collections`);
            }

            return collections;
        } catch (error) {
            throw new Error(`Unable to find collections`);
        }
    }
}

export default CollectionService;
