import { cookies } from "next/headers"
import Link from "next/link"

type Props = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
    const authCookie = cookies().get('Authorization')
    if (!authCookie) {
        return (
            <section className="font-outfit min-h-screen flex items-center justify-center bg-[#e0e0e0]">
                <div className="bg-[#e0e0e0] p-8 rounded-xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] transition-all duration-300 max-w-md w-full">
                    <h1 className="text-4xl font-extrabold mb-4 text-[#4AC419]">
                        Access Required
                    </h1>
                    <p className="text-gray-600 text-xl mb-6">
                        It appears you&apos;re attempting to access a restricted area without proper authentication. Please log in to continue with your shopping experience.
                    </p>
                    <Link href="/login" className="block w-full text-center py-3 px-6 text-lg font-semibold text-[#4AC419] bg-[#e0e0e0] rounded-full shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-200">
                        Proceed to Login
                    </Link>
                    <p className="mt-4 text-sm text-gray-500 italic">
                        Don&apos;t miss out on our latest offers. Log in now to explore our product range.
                    </p>
                </div>
            </section>
        )
    }
    return children
}