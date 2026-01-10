import { cartImage, contactPath, defaultPath, logoutPath, signupPath, svgSearchImage, wishlistImage } from '@/utils/api.path'
import Image from 'next/image'
import Link from 'next/link'

export default function Header({isLogout=false}: {isLogout?: boolean}) {
    return (
        <div className='flex justify-between items-center items-evenly  space-x-8 h-[5rem] '>
            <Link href={defaultPath}>
                <h1 className='text-xl font-[800]'><span className='text-red-500 '>AK</span><span className='text-blue-500 '>BAZAR</span></h1>
            </Link>
            <ul className='flex gap-4 text-base space-x-2'>
                <li><Link href={defaultPath}>Home</Link></li>
                <li><Link href={contactPath}>Contact</Link></li>
                <li>About</li>
                <li className='flex whitespace-nowrap'>
                    <Link href={signupPath}>Sign Up</Link>
                </li>
            </ul>
            <ul className='flex gap-4 space-x-4'>
                <li className='flex relative'>
                    <input name='search' type="text" className='border-0 bg-[#F5F5F5]  p-[0.21875rem_2rem_0.21875rem_0.625rem]' placeholder='What are you looking for?' />
                    <Image className='absolute right-1 top-1' src={`https://ajithkumaranandanecommerce.vercel.app/${svgSearchImage}`} alt="No image" width={20} height={20} />
                </li>
                <li><Image className='max-w-10' src={`https://ajithkumaranandanecommerce.vercel.app/${wishlistImage}`} alt="No image" width={25} height={25} /></li>
                <li><Image className='max-w-10' src={`https://ajithkumaranandanecommerce.vercel.app/${cartImage}`} alt="No image" width={25} height={25} /></li>
                <li>{!isLogout && <Link href={logoutPath}>Logout</Link>}</li>
            </ul>
        </div>
    )
}
