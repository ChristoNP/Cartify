import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cartify | Products',
    description: 'Cartify products page'
}

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}