'use client'

import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'

interface DeleteModalProps {
    isOpen: boolean
    onClose: () => void
    id: number  // Changed from url to blogId
    title?: string
    message?: string
    onSuccess?: () => void
}

const DeleteModal = ({
    isOpen,
    onClose,
    id,  // Changed from url: string
    title = 'Confirm Deletion',
    message = 'Are you sure you want to delete this item?',
    onSuccess
}: DeleteModalProps) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState('')

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            setError('')
            await axios.delete(`http://localhost:8000/blogs/${id}`)
            onSuccess?.()
            onClose()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Delete failed')
            } else {
                setError('An unexpected error occurred')
            }
        } finally {
            setIsDeleting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">{title}</h2>
                <p className="mb-6 text-gray-600">{message}</p>

                {error && (
                    <p className="mb-4 text-red-500">{error}</p>
                )}

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => {
                            onClose();
                            toast.info('Action cancelled');
                        }}
                        disabled={isDeleting}
                        className="rounded-md border-2 border-black bg-black px-6 py-2.5 text-sm font-medium text-white 
                        transition-all hover:bg-gray-900 hover:shadow-md disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                await handleDelete();
                                toast.success('Item deleted successfully');
                            } catch (error) {
                                toast.error('Failed to delete item');
                            }
                        }}
                        disabled={isDeleting}
                        className="rounded-md border-2 border-red bg-red px-6 py-2.5 text-sm font-medium text-black 
                        transition-all hover:bg-red-700 hover:shadow-md disabled:bg-red-300 disabled:border-red-300"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                    <ToastContainer
                        position={'top-right' as const}
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </div>
        </div>
    )
}

export default DeleteModal