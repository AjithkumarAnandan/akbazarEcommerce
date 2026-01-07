'use client'; // Make this a client-side component if using Next.js 13+
import { signupSchema } from '@/utils/zod.schema';
// import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { signUpApiProps } from '@/component/addProductsComponent';

type SignUpData = z.infer<typeof signupSchema>;

export default function LoginLink() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(signupSchema)
    })

    const handleSignUp = async (data: SignUpData) => {
        setLoading(true);
        const encodedpassword = btoa(data.password);
        const payload = { ...data, password: encodedpassword };
        try {
            const res = await signUpApiProps({payload})
            // console.log(res.data.message);
            toast.success(res.data.message);
            router.push('/dashboard');
        } catch (err) {           
            toast.error(
                (err as Error)?.message ||
                'Login failed'
            );
        } finally {
            setLoading(false);
        };
    }

    return (
        <div className='min-h-screen flex items-center justify-center '>
            <form onSubmit={handleSubmit(handleSignUp)} className='flex flex-col gap-6 w-96'>
                <h1 className='text-4xl'>Create an account </h1>
                <p>Enter your details below</p>
                <input type="text" {...register('username')} className=' border-b-2 border-b-[#D9D9D9]' placeholder='Username' />
                {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
                <input type="text" {...register('email')} className=' border-b-2 border-b-[#D9D9D9]' placeholder='Email' />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                 <input type="text" {...register('phone')} className=' border-b-2 border-b-[#D9D9D9]' placeholder='Phone Number' />
                {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                <select id="role" {...register('role')} className=' border-b-2 border-b-[#D9D9D9] ' defaultValue={"user"}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                {errors.role && <p className='text-red-500'>{errors.role.message}</p>}
                 <input type="text" {...register('password')} className=' border-b-2 border-b-[#D9D9D9]' placeholder='Password' />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                <span className='flex flex-row gap-4 justify-between items-center'>
                    <button disabled={loading} className={` ${loading ? 'w-32 ' : 'w-24'} h-10 px-4 mt-1 bg-blue-700 text-white rounded-lg text-center`} >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                    <Link href="/login">Login</Link>
                </span>
            </form>
        </div>
    );
}
