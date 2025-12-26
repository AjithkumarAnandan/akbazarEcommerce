import React from 'react'

async function page() {
  return (
    <div className=" grid grid-cols-[1fr_1fr] grid-rows-2 gap-8 m-[10rem] ">
      <div className='col-span-1 row-span-2  shadow-lg p-8'>
        {/* Call section */}
      <div className=" flex flex-col space-y-4">
        <div className="flex gap-4 w-40 items-center">
          <img src="/icons-phone.svg" alt="No call" />
          <span>Call To Us</span>
        </div>
        <p>We are available 24/7, 7 days a week.</p>
        <p>Phone: +91 77081 92049</p>
        <hr className='my-4' />
      </div>
      {/* Write section */}
      <div className="flex flex-col space-y-4">
        <div className="flex gap-4 w-40 items-center">
          <img src="/icons-mail.svg" alt="No write" />
          <span>Write To Us</span>
        </div>
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <p>Email: ajithkumaranandandev@gmail.com</p>
      </div>
      </div>
      {/* Message / Form section */}
      <div className="grid grid-cols-3 grid-rows-[1fr_3fr_1fr] col-start-2 row-span-2 items-center gap-4 shadow-lg p-8">
        <input type="text" className='bg-[#F5F5F5] col-span-1 row-span-1 h-12 p-4' placeholder='Your Name' />
        <input type="text" className='bg-[#F5F5F5] col-span-1 row-span-1 h-12 p-4' placeholder='Your Email' />
        <input type="text" className='bg-[#F5F5F5] col-span-1 row-span-1 h-12 p-4' placeholder='Your Phone' />
        <textarea  className='bg-[#F5F5F5] col-span-3 row-span-1 p-4 h-36 ' placeholder='Your Message' />
         {/* <button className='col-start-[-2] col-span-1 row-start-[-2] row-span-1  whitespace-nowrap bg-[#DB4444] text-white w-fit p-3 rounded-sm'>Send Message</button> */}
        <span className='col-end-[-1] col-span-1 row-end-[-1] row-span-1 flex justify-end'>
         <button className='whitespace-nowrap bg-[#DB4444] text-white p-3 space-x-4 rounded-sm max-w-40 '>Send Message</button>
        </span>
      </div>     
    </div>


  )
}

export default page