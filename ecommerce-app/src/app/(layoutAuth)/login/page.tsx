import Link from "next/link";
import { cookies } from "next/headers";
import SweetAlert from "../../../components/SweetAlert";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Cartify | Sign In',
    description: 'Welcome to Cartify. Sign in to your account to continue.',
}

function LoginForm() {
    const handleLogin = async (formData: FormData) => {
        'use server';

        const form = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();
            redirect(`/login?error=${errorBody.error || errorBody.errors.join(', ')}`);
            return;
        }

        const responseBody = await response.json() as { access_token: string };
        cookies().set('Authorization', `Bearer ${responseBody.access_token}`);
        redirect('/')
    }

    return (
        <form className="font-outfit" action={handleLogin}>
            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4AC419]"
                    placeholder="you@example.com"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4AC419]"
                    placeholder="••••••••"
                />
            </div>
            <div className="flex items-center justify-between mb-6">

                <Link href="/forgotPassword" className="text-sm text-[#4AC419] hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" className="w-full bg-[#4AC419] text-white font-bold py-2 px-4 rounded-md hover:bg-[#3DA114] transition duration-300">Sign In</button>
        </form>
    );
}

export default function Login() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#4AC419] to-[#2A7A0E] flex items-center justify-center p-6">
            <Suspense fallback={<div>Loading...</div>}>
                <SweetAlert />
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex max-w-4xl w-full">
                    <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483619373149-740b4ce76d2e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                    </div>
                    <div className="w-full md:w-1/2 py-16 px-8">
                        <h1 className="text-5xl italic font-extrabold text-[#4AC419] mb-4 font-montserrat-alternates tracking-normal animate-pulse drop-shadow-[0_0_5px_rgba(74,196,25,0.5)] [text-shadow:_0_0_5px_rgba(74,196,25,0.5)]">Cartify</h1>
                        <p className="text-gray-600 mb-8 font-outfit">Sign in to your account</p>
                        <LoginForm />
                        <p className="mt-8 text-sm text-center text-gray-600 font-outfit">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-[#4AC419] hover:underline font-semibold font-outfit">
                                Create one here
                            </Link>
                        </p>
                    </div>
                </div>
            </Suspense>
        </div>
    )
}
