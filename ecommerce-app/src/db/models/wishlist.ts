import { ObjectId, WithId } from 'mongodb'
import { db } from '../config'
import { z } from 'zod'
import { ProductType } from './product'

const wishlistSchema = z.object({
    userId: z.instanceof(ObjectId),
    productId: z.instanceof(ObjectId),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
  })
  
export type WishlistType = z.infer<typeof wishlistSchema>
export type WishlistId = WithId<WishlistType> & {
    product: ProductType
}
export class Wishlist {
    static col() {
        return db.collection<WishlistType>('Wishlists')
    }

    static async findByUserId(userId: string) {
        try {
            const pipeline = [
                {
                    $match: {
                        userId: new ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: 'Products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $unwind: '$product'
                },
            ];
            const result = await this.col().aggregate(pipeline).toArray();
            return result;
        } catch (error) {
            console.log(error, '<<<<< Error/models/wishlist findByUserId');
            throw new Error('Failed to find wishlist')

        }
    }

    static async createWishlist(payload: WishlistType) {
        try {
            const newData = {
                userId: new ObjectId(payload.userId),
                productId: new ObjectId(payload.productId),
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const existingWishlistItem = await this.col().findOne({
                userId: new ObjectId(payload.userId),
                productId: new ObjectId(payload.productId)
            });

            if (existingWishlistItem) {
                return "Item already in wishlist";
            }
            await this.col().insertOne(newData);
            return "Success create wishlist";
        } catch (error) {
            console.log(error, '<<<<< Error/models/wishlist createWishlist');
            throw new Error('Failed to create wishlist')
        }
    }

    static async deleteWishlist(wishlistId: string) {
        try {
            return await this.col().deleteOne({ _id: new ObjectId(wishlistId) })
        } catch (error) {
            console.log(error, '<<<<< Error/models/wishlist deleteWishlist');
            throw new Error('Failed to delete wishlist')
        }
    }
}