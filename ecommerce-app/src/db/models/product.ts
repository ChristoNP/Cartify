import { ObjectId, WithId } from 'mongodb'
import { db } from '../config'
import { z } from 'zod'


const productSchema = z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    excerpt: z.string(),
    price: z.number(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    images: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type ProductType = WithId<z.infer<typeof productSchema>>

export class Product {
    static col() {
        return db.collection<ProductType>('Products')
    }

    static async findAll(page: number = 1, limit: number = 9, query?: string) {
        try {
            let filter = {};
            if (query) {
                filter = {
                    $or: [
                        { name: { $regex: query, $options: 'i' } },
                    ]
                };
            }
            const result = await this.col().find(filter).skip((page - 1) * limit).limit(limit).toArray();
            return result;
        } catch (error) {
            console.log(error, '<<<<< Error model findAll products');
            throw new Error('Failed to fetch or search products');
        }
    }

    static async findByPk(id: string) {
        try {
            const result = await this.col().findOne({ _id: new ObjectId(id) })
            if (!result) {
                throw new Error('Product not found')
            }
            return result
        } catch (error) {
            console.log(error, '<<<<< Error model findByPk products');
            throw new Error('Failed to fetch product')
        }
    }

    static async findOne(filter: Partial<ProductType>) {
        try {
            const result = await this.col().findOne(filter)
            return result
        } catch (error) {
            console.log(error, '<<<<< Error model findOne products');
            throw new Error('Failed to fetch product')
        }
    }

    static async search(query: string) {
        try {
            const result = await this.col().find({
                $or: [
                    {
                        name: { $regex: query, $options: 'i' }
                    },
                    {
                        description: { $regex: query, $options: 'i' }
                    },
                    {
                        slug: { $regex: query, $options: 'i' }
                    }
                ]
            }).toArray()
            return result
        } catch (error) {
            console.log(error, 'error model search products');
            throw new Error('Failed to search products')
        }
    }
}