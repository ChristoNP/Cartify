"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SweetAlert from "../../../components/SweetAlert";
// import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

// export const metadata: Metadata = {
//     title: 'Cartify | Sign Up',
//     description: 'Welcome to Cartify. Sign up to your account to continue.',
// }

export default function Register() {
    const router = useRouter();

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const form = {
            name: formData.get('name') as string,
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) {
            console.error("NEXT_PUBLIC_BASE_URL is not defined");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/api/users/register`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorBody = await response.json() as { errors: string[] };
                const formattedErrors = errorBody.errors.join('\n');
                router.push(`/register?error=${encodeURIComponent(formattedErrors)}`);
                return;
            }

            router.push('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            router.push(`/register?error=${encodeURIComponent('An unexpected error occurred.')}`);
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="min-h-screen bg-gradient-to-br from-[#4AC419] to-[#2A7A0E] flex items-center justify-center p-6">
                <SweetAlert />
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex max-w-5xl w-full">
                    <div className="hidden md:block w-2/5 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1714330925314-cfca2fa6bb4a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                    </div>
                    <div className="w-full md:w-3/5 py-16 px-12">
                        <h1 className="text-5xl italic font-extrabold text-[#4AC419] mb-4 font-montserrat-alternates tracking-normal animate-pulse drop-shadow-[0_0_5px_rgba(74,196,25,0.5)] [text-shadow:_0_0_5px_rgba(74,196,25,0.5)]">Cartify</h1>
                        <p className="text-gray-600 mb-8 font-outfit">Create your account</p>
                        <form onSubmit={handleRegister} className="space-y-6 font-outfit">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4AC419]"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4AC419]"
                                        placeholder="johndoe"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4AC419]"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4AC419]"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-[#4AC419] text-white font-bold py-3 px-4 rounded-md hover:bg-[#3DA114] transition duration-300 text-lg">Create Account</button>
                        </form>
                        <p className="mt-8 text-sm text-center text-gray-600 font-outfit">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#4AC419] hover:underline font-semibold font-outfit">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
