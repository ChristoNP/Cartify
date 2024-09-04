"use client"
import Swal from "sweetalert2"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function SweetAlert() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.replace(/\\n/g, '\n'),
                confirmButtonColor: '#4AC419',
                background: '#f8f8f8',
                iconColor: '#ff6b6b',
                customClass: {
                    popup: 'font-outfit',
                    title: 'text-xl font-bold text-gray-800',
                    htmlContainer: 'text-gray-600',
                    confirmButton: 'bg-[#4AC419] hover:bg-[#3DA114] text-white font-bold py-2 px-4 rounded'
                }
            })
        }
    }, [error])

    return null
}
