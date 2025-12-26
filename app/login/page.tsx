'use client'; // Make this a client-side component if using Next.js 13+

import { LoginSchema } from '@/utils/zod.schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

type LoginData = z.infer<typeof LoginSchema>;

export default function LoginLink() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(LoginSchema)
    })

    const handleLogin = async (data: LoginData) => {
        setLoading(true);
        const encodedpassword = btoa(data.password);
        const payload = { ...data, password: encodedpassword };
        try {
            const res = await axios.post('/api/login', payload);
            toast.success(res.data.message);
            router.replace('/dashboard');
        } catch (err) {
            toast.error(
                (err && (err as AxiosError).isAxiosError)
                    ? ((err as AxiosError)?.response?.data as Error)?.message
                    || (err as Error)?.message
                    || 'Login failed' : 'Login failed'
            );
        } finally {
            setLoading(false);
        };
    }

    return (
        <div className='min-h-screen flex items-center justify-center '>
            <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-6 w-96'>
                <h1 className='text-4xl'>Log in to AKBAZAR</h1>
                <p>Enter your details below</p>
                <input type="text" {...register('username')} className=' border-b-2 border-b-[#D9D9D9] outline-none focus:border-b-blue-700' placeholder='Email or Phone Number' />
                {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
                <input type="text" {...register('password')} className=' border-b-2 border-b-[#D9D9D9] outline-none focus:border-b-blue-700' placeholder='Password' />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                <span className='flex flex-row gap-4 justify-between items-center'>
                    <button disabled={loading} className={` ${loading ? 'w-32 ' : 'w-24'} h-10 px-4 mt-1 bg-blue-700 text-white rounded-lg text-center`} >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <button>Forget Password?</button>
                </span>
            </form>
        </div>
    );
}
