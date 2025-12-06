import React from 'react'

function Footer() {
  return (
    <div className='m-[3rem] flex space-x-4 justify-around'>
      <h1 className='text-xl font-[800]'><span className='text-red-500 '>AK</span><span className='text-blue-500 '>BAZAR</span></h1>
      <ul className='space-y-2'>
        <li>Subscribe</li>
        <li className='whitespace-nowrap'>
          <p className='text-[0.75rem] font-[200] whitespace-nowrap'> My Account</p>
        </li>
        <li>  <p className='text-[0.75rem] font-[200] whitespace-nowrap '>  Login/Register</p>
        </li>
        <li><p className='text-[0.75rem] font-[200] whitespace-nowrap '>  Cart</p>
        </li>
      </ul>
      <ul>
        <li className='whitespace-nowrap'>
          <p className='text-[0.75rem] font-[200] whitespace-nowrap '>  Contact US</p>
        </li>
      </ul>

    </div>
  )
}

export default Footer