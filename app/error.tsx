"use client"
import { defaultPath } from '@/utils/api.path';
import Link from 'next/link';

function ErrorPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-8'>
      <h1 className='text-[6.875rem] font-bold'>Error</h1>
      <p>Your visited page show error. You may go home page.</p>
      <Link href={defaultPath} className='text-white bg-[#DB4444] p-4 rounded-sm'>Back to home page
      </Link>
    </div>
  );
}

export default ErrorPage;
