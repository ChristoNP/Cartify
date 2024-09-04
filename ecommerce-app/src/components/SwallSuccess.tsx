"use client"
import Swal from "sweetalert2"
import { useSearchParams} from "next/navigation"
import { useEffect } from "react"

export default function SweetAlertSuccess() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    useEffect(() => {
        if (error) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration successful",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }, [error])

    return null
}
