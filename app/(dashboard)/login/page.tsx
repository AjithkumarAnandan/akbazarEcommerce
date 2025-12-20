'use client'; // Make this a client-side component if using Next.js 13+

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginLink() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/api/login', { withCredentials: false })
            console.log(res.data.message);
            router.push('/dashboard');
        } catch (err) {
            console.error('Login failed', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <button onClick={handleLogin} disabled={loading} className='w-16 h-8 bg-blue-700 text-white  rounded-lg' >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
}
