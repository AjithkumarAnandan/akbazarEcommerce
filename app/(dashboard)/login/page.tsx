'use client'; // Make this a client-side component if using Next.js 13+

import api from '@/utils/apiInterceptors.client';
// import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginLink() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await api.post('/api/login', { withCredentials: false })
            console.log(res.data.message);
            router.push('/dashboard');
        } catch (err) {
            console.error('Login failed', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center '>
            <button onClick={handleLogin} disabled={loading} className={` ${loading ? 'w-32 ' : 'w-24'} h-8 px-4 bg-blue-700 text-white rounded-lg`} >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
}
