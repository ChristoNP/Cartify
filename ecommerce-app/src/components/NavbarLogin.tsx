"use client"
import Link from "next/link";
import handleLogout from '@/app/action/logout';
import { usePathname } from "next/navigation";


export default function NavbarLogin() {
    const pathname = usePathname();
    return (
        <>
            {/* ========== HEADER ========== */}
            <header className="bg-[#4AC419] text-white py-4 sm:py-6 shadow-[inset_5px_5px_10px_#3fa316,inset_-5px_-5px_10px_#55e51c]">
                <nav className="container mx-auto px-4 flex flex-wrap items-center justify-between">
                    <div className="flex items-center font-montserrat-alternates">
                        {/* Logo */}
                        <Link href="/" className="text-2xl sm:text-3xl md:text-4xl font-bold italic hover:text-[#e6f7e0] transition-colors duration-300">
                            Cartify
                        </Link>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="font-outfit hidden md:flex space-x-4 lg:space-x-6 items-center">
                        <Link href="/" className={`text-base lg:text-lg hover:text-[#e6f7e0] transition-colors duration-300 ${pathname === '/' ? 'border-b-2 border-white' : ''}`}>
                            Home
                        </Link>
                        <Link href="/products" className={`text-base lg:text-lg hover:text-[#e6f7e0] transition-colors duration-300 ${pathname === '/products' ? 'border-b-2 border-white' : ''}`}>
                            Products
                        </Link>
                    </div>
                    
                    {/* Button Group */}
                    <div className="font-outfit flex items-center space-x-2 sm:space-x-4">
                        <Link href="/wishlist" className="text-white hover:text-[#e6f7e0] transition-colors duration-300 p-1 sm:p-2 rounded-full shadow-[3px_3px_6px_#3fa316,-3px_-3px_6px_#55e51c] hover:shadow-[inset_3px_3px_6px_#3fa316,inset_-3px_-3px_6px_#55e51c]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </Link>
                        <button
                            onClick={() => {
                                handleLogout()
                            }}
                            className="bg-[#4AC419] text-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full shadow-[3px_3px_6px_#3fa316,-3px_-3px_6px_#55e51c] hover:shadow-[inset_3px_3px_6px_#3fa316,inset_-3px_-3px_6px_#55e51c] transition-all duration-300"
                        >
                            Logout
                        </button>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="font-outfit md:hidden">
                        <button
                            className="text-white focus:outline-none p-1 sm:p-2 rounded-full shadow-[3px_3px_6px_#3fa316,-3px_-3px_6px_#55e51c] hover:shadow-[inset_3px_3px_6px_#3fa316,inset_-3px_-3px_6px_#55e51c]"
                            onClick={() => {
                                const menu = document.getElementById('mobile-menu');
                                menu?.classList.toggle('hidden');
                            }}
                        >
                            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </nav>
                
                {/* Mobile Menu */}
                <div id="mobile-menu" className="font-outfit hidden md:hidden mt-4 px-4">
                    <Link href="/" className="block py-2 text-base sm:text-lg hover:text-[#e6f7e0] transition-colors duration-300">
                        Home
                    </Link>
                    <Link href="/products" className="block py-2 text-base sm:text-lg hover:text-[#e6f7e0] transition-colors duration-300">
                        Products
                    </Link>
                </div>
            </header>
        </>
    )
}