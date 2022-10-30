import ClothesModel from '@/resources/clothes/clothes.model';
import Clothes from '@/resources/clothes/clothes.interface';
import ClothesCount from '@/utils/interfaces/clothesCount.interface';
import { Schema } from 'mongoose';
const {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} = require('firebase/storage');
const storage = require('../../firebase');

class ClothesService {
    private clothes = ClothesModel;

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
     * Create a new Clothes
     */
    public async create(
        name: string,
        images: Express.Multer.File[],
        size: Array<string>,
        color: Array<string>,
        type: string,
        price: number,
        company: string,
        sale: number,
        material: string,
        care: string,
        clothesCount: Array<ClothesCount>,
        sex: string,
        collection_id: Schema.Types.ObjectId
    ): Promise<Clothes> {
        try {
            const imagesUrls: Array<string> = [];
            let gifUrls: Array<string> = [];

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
            const gifUrl = gifUrls.join();

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
     * Attempt to update clothes
     */

    public async update(
        id: Schema.Types.ObjectId,
        name: string,
        imagesUrls: Array<string>,
        gifUrl: string,
        images: Express.Multer.File[],
        size: Array<string>,
        color: Array<string>,
        type: string,
        price: number,
        company: string,
        sale: number,
        material: string,
        care: string,
        clothesCount: Array<ClothesCount>,
        sex: string,
        collection_id: Schema.Types.ObjectId
    ): Promise<Clothes> {
        try {
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
                                gifUrl = url;
                            } else {
                                imagesUrls.push(url);
                            }
                        }
                    );
                })
            );
            const clothes = await this.clothes
                .findByIdAndUpdate(
                    id,
                    {
                        name: name,
                        imagesUrls: imagesUrls,
                        gifUrl: gifUrl,
                        size: size,
                        color: color,
                        type: type,
                        price: price,
                        company: company,
                        sale: sale,
                        material: material,
                        care: care,
                        clothesCount: clothesCount,
                        sex: sex,
                        collection_id: collection_id,
                    },
                    { new: true }
                )
                .populate({
                    path: 'collection_id',
                    populate: { path: '_id' },
                });

            if (!clothes) {
                throw new Error('Unable to update clothes with thad id');
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to change clothes');
        }
    }

    /**
     * Attempt to delete clothes
     */

    public async delete(id: Schema.Types.ObjectId): Promise<Clothes> {
        try {
            const clothes = await this.clothes.findByIdAndDelete(id).populate({
                path: 'collection_id',
                populate: { path: '_id' },
            });

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

    public async findById(id: Schema.Types.ObjectId): Promise<Clothes> {
        try {
            const clothes = await this.clothes.findById(id).populate({
                path: 'collection_id',
                populate: { path: '_id' },
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
     * Attempt to find clothes by name
     */

    public async findByName(name: string): Promise<Clothes | any> {
        try {
            const clothes = await this.clothes.find({ name: name }).populate({
                path: 'collection_id',
                populate: { path: '_id' },
            });

            if (!clothes) {
                throw new Error('Unable to find clothes with that name');
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to find clothes');
        }
    }

    /**
     * Attempt to delete image by url
     */

    public async deleteImage(id: string, url: string): Promise<Clothes> {
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

            let clothes = (await this.clothes.findById(id)) as Clothes;
            if (clothes.imagesUrls.includes(url)) {
                clothes = (await this.clothes.findByIdAndUpdate(
                    id,
                    { $pullAll: { imagesUrls: [url] } },
                    { new: true }
                )) as Clothes;
            } else {
                clothes = (await this.clothes.findByIdAndUpdate(
                    id,
                    { gifUrl: '' },
                    { new: true }
                )) as Clothes;
            }
            return clothes;
        } catch (error) {
            throw new Error('Unable to find image');
        }
    }

    /**
     * Attempt to find all clothes
     */
    public async getAll(): Promise<Clothes | any> {
        try {
            const clothes = await this.clothes.find({}).populate({
                path: 'collection_id',
                populate: { path: '_id' },
            });

            if (!clothes) {
                throw new Error('Unable to find clothes');
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to find clothes');
        }
    }

    /**
     * Attempt to find clothes with sales
     */
    public async findBySales(): Promise<Clothes | any> {
        try {
            const clothes = await this.clothes
                .find({ sale: { $gte: 1 } }, null, { sort: { createdAt: -1 } })
                .populate({
                    path: 'collection_id',
                    populate: { path: '_id' },
                });

            if (!clothes) {
                throw new Error('Unable to find clothes with sales');
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to find clothes with sales');
        }
    }

    /**
     * Attempt to find clothes by type
     */
    public async findByType(type: string): Promise<Clothes | any> {
        try {
            const clothes = await this.clothes
                .find({ type: type }, null, { sort: { createdAt: -1 } })
                .populate({
                    path: 'collection_id',
                    populate: { path: '_id' },
                });

            if (!clothes) {
                throw new Error('Unable to find clothes by type');
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to find clothes by type');
        }
    }

    /**
     * Attempt to find clothes by sex
     */
    public async findBySex(sex: string): Promise<Clothes | any> {
        try {
            const clothes = await this.clothes
                .find({ sex: sex }, null, { sort: { createdAt: -1 } })
                .populate({
                    path: 'collection_id',
                    populate: { path: '_id' },
                });

            if (!clothes) {
                throw new Error('Unable to find clothes by sex');
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to find clothes by sex');
        }
    }

    /**
     * Attempt to find clothes by filter
     */

    public async filter(
        type: string,
        from_price: number,
        to_price: number,
        size: Array<String>
    ): Promise<Clothes | any> {
        try {
            let clothes = null;

            if (size && from_price && to_price) {
                clothes = await this.clothes
                    .find(
                        {
                            type: type,
                            $and: [
                                { price: { $gte: from_price, $lt: to_price } },
                                { size: { $in: size } },
                            ],
                        },
                        null,
                        { sort: { createdAt: -1 } }
                    )
                    .populate({
                        path: 'collection_id',
                        populate: { path: '_id' },
                    });
            } else if (size) {
                clothes = await this.clothes
                    .find(
                        { type: type, $and: [{ size: { $in: size } }] },
                        null,
                        { sort: { createdAt: -1 } }
                    )
                    .populate({
                        path: 'collection_id',
                        populate: { path: '_id' },
                    });
            } else {
                clothes = await this.clothes
                    .find(
                        {
                            type: type,
                            $and: [
                                { price: { $gte: from_price, $lt: to_price } },
                            ],
                        },
                        null,
                        { sort: { createdAt: -1 } }
                    )
                    .populate({
                        path: 'collection_id',
                        populate: { path: '_id' },
                    });
            }

            if (!clothes) {
                throw new Error('Unable to find clothes by sample');
            }

            return clothes;
        } catch (error) {
            throw new Error('Unable to find clothes by sample');
        }
    }
}

export default ClothesService;
