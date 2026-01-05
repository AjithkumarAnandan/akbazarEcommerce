'use client'; // Make this a client-side component if using Next.js 13+

import { LoginSchema } from '@/utils/zod.schema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { getLoginUser } from '@/component/Login_Logout';

export type LoginData = z.infer<typeof LoginSchema>;

export default function LoginLink() {
    const [loading, setLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(LoginSchema)
    })

    const handleLogin = async (loginData: LoginData) => {
        setLoading(true);
        try {
            const encodedPassword = btoa(loginData.password);
            const payload = { ...loginData, password: encodedPassword };
            await getLoginUser({ payload });       
        } catch (err) {
            toast.error("An unexpected error occurred");
            console.error(err);
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
