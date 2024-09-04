import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Cartify | Forgot Password',
    description: 'Forgot your password? No problem. Reset it here.',
}

export default function ForgotPassword() {
    return (
        <section className="bg-gray-300 min-h-screen flex items-center justify-center p-6 font-outfit">
            <div className="bg-gray-100 rounded-3xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] overflow-hidden max-w-5xl w-full">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-8 md:p-12">
                        <h1 className="text-4xl font-bold text-[#4AC419] mb-6">Oops! Memory Glitch?</h1>
                        <p className="text-gray-600 mb-8 text-lg">
                            Looks like your brain pulled a sneaky one on you! Don&apos;t worry, it happens to the best of us.
                        </p>
                        <div className="space-y-4">
                            <p className="text-gray-800 font-semibold">Pro Tips for Next Time:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Write it on a sticky note (and lose the sticky note)</li>
                                <li>Use your pet&apos;s name + your birth year (so original!)</li>
                                <li>Just use &quot;password123&quot; or &quot;12345&quot; like everyone else</li>
                            </ul>
                        </div>
                        <div className="mt-10 flex justify-center">
                            <Link href="/login" className="inline-block bg-gray-100 text-[#4AC419] font-bold py-3 px-6 rounded-full shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition duration-300 text-lg">
                                Back to Login (Good Luck!)
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 relative overflow-hidden">
                        <Image
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                            src="https://media.giphy.com/media/3oKHWtXlzTHeuVewtq/giphy.gif"
                            alt="Forgetful Homer Simpson"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <p className="text-white text-3xl font-bold text-center px-4">Oh Boy! Forgot Again?</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}