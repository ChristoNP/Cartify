import ProtectedRoute from "@/components/ProtectedRoute";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </div>
    )
}