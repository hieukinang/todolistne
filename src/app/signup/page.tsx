'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

const Signup = () => {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            })
            if (res.ok) {
                router.push('/login')
            } else {
                setError('Đăng ký không thành công')
            }
        } catch (error) {
            setError('Có lỗi xảy ra')
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
                <h2 className="text-center text-3xl font-bold">Đăng ký</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Tên
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
                    >
                        Đăng ký
                    </button>
                </form>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 w-full rounded-md border p-2 hover:bg-gray-100"
                >
                    Quay lại
                </button>
            </div>
        </div>
    )
}

export default Signup