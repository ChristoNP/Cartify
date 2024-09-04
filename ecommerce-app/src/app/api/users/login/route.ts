import { User, UserType } from '@/db/models/user';
import { compare } from 'bcryptjs';
import { z, ZodError } from 'zod';
import { sign } from 'jsonwebtoken';

const LoginSchema = z.object({
  email: z.string().email({ message: "format is invalid" }),
  password: z.string().min(5, { message: "must be at least 5 characters long" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json() as UserType;
    LoginSchema.parse(body);

    const user = await User.findOne({ email: body.email });
    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await compare(body.password, user.password);
    if (!isValid) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const { password, ...safeUser } = user;
    const access_token = sign(safeUser, process.env.JWT_SECRET!);
    return Response.json({ access_token: access_token }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = error.issues.map((issue) => {
        return issue.path[0] + ' ' + issue.message;
      });
      return Response.json({ errors: formatted }, { status: 400 });
    }

    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
