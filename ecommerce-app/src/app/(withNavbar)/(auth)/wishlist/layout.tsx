import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cartify | Wishlist',
    description: 'Cartify wishlist page'
}

export default function WishlistLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}