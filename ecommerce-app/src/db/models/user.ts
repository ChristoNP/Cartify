import { ObjectId, WithId } from "mongodb"
import { db } from "../config"
import { z } from "zod"
import { hash } from 'bcryptjs'

const userSchema = z.object({
    name: z.string().optional(),
    username: z.string().refine(async (username) => {
        const existingUser = await db.collection('Users').findOne({ username });
        return !existingUser;
    }, { message: "Username must be unique" }),
    email: z.string().email().refine(async (email) => {
        const existingUser = await db.collection('Users').findOne({ email });
        return !existingUser;
    }, { message: "Email must be unique" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})

export type UserType = WithId<z.infer<typeof userSchema>>

export class User {
    static col() {
        return db.collection<UserType>('Users')
    }
    static async findAll() {
        const result = await this.col().find().toArray()
        return result
    }
    static async findByPk(id: string) {
        const result = await this.col().findOne({ _id: new ObjectId(id) })
        return result
    }
    static async findOne(filter: Partial<UserType>) {
        const result = await this.col().findOne(filter)
        return result
    }
    static async create(newUser: UserType) {
        await userSchema.parseAsync(newUser)
        newUser.password = await hash(newUser.password, 12)
        newUser.createdAt = newUser.updatedAt = new Date()
        const result = await this.col().insertOne(newUser)
        const { password, ...userWithoutPassword } = newUser
        return {
            ...userWithoutPassword,
            id: result.insertedId
        }
    }
}
