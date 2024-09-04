import { User, UserType } from "@/db/models/user"
import { ZodError } from "zod"

export async function POST(request: Request) {
    try {
        const body = await request.json() as UserType
        await User.create(body)
        return Response.json({ message: 'User created successfully' }, { status: 201 })
    } catch (error) {
        if (error instanceof ZodError) {
            const formatted = error.issues.map((issue) => {
                return issue.message
            })
            return Response.json({ errors: formatted }, { status: 400 })
        }
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}