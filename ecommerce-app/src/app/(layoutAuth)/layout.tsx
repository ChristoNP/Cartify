import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Cartify',
  description: 'Welcome to Cartify',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
