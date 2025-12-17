import Link from 'next/link';

function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-8'>
      <h1 className='text-[6.875rem] font-bold'>404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
      <Link href="/" className='text-white bg-[#DB4444] p-4 rounded-sm'>Back to home page
      </Link>
    </div>
  );
}

export default NotFound;
