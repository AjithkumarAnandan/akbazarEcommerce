import Image from 'next/image'

export default function Header() {
    return (
            <div className='flex justify-between items-center items-evenly  space-x-8 h-[5rem] '>
                <h1 className='text-xl font-[800]'><span className='text-red-500 '>AK</span><span className='text-blue-500 '>BAZAR</span></h1>
                <ul className='flex gap-4 text-base space-x-2'>
                    <li>Home</li>
                    <li>Contact</li>
                    <li>About</li>
                    <li className='flex whitespace-nowrap'>Sign Up</li>
                </ul>
                <ul className='flex gap-4 space-x-4'>
                    <li className='flex relative'>
                        <input type="text" className='border-0 bg-[#F5F5F5]  p-[0.21875rem_2rem_0.21875rem_0.625rem]' placeholder='What are you looking for?' />
                        <Image className='absolute right-1 top-1' src="/Search.svg" alt="No image" width={20} height={20} />
                    </li>
                    <li><Image className='max-w-10' src="/Wishlist.svg" alt="No image" width={25} height={25} /></li>
                    <li><Image className='max-w-10' src="/Cart.svg" alt="No image" width={25} height={25} /></li>
                </ul>
            </div>
    )
}
