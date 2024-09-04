import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import NavbarLogin from "../../components/NavbarLogin";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cartify",
  description: "Your one stop shop for all your needs",
};

export default function WithNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authCookie = cookies().get('Authorization')
  return (
    <>
      {authCookie ? <NavbarLogin /> : <Navbar />}
      {children}
      <Footer/>
    </>
  );
}
