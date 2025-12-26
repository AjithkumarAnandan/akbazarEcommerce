import React from "react";
import { lazy } from "react";
const Header = lazy(() => import("../(dashboard)/_internal/Header"))
const Footer = lazy(() => import("../(dashboard)/_internal/Footer"))

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    <div className='grid grid-cols-[5rem_1fr_10rem] place-items-center grid-rows-[auto] bg-black text-white h-[3rem]'>
      <span></span>
      <p className='flex justify-center items-center h-[2rem] text-[0.75rem]'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span>ShopNow</span></p>
      <select name="lang" id="lang" className='flex justify-end w-32'>
        <option value="en">English</option>
      </select>
    </div>
    <div className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[auto_auto_12rem] min-h-[100vh] mx-[4rem] ">
      {/* Header component */}
      <header className="col-span-3 grid items-center h-[5rem]  ">
        <Header isLogout={true} />
        <hr className="text-gray-300 -mx-[5rem]" />
      </header>     
      {/* Content component  */}
      <main className="col-span-3 ">
        {children}
      </main>
      {/* Footer */}
      <footer className="col-span-3 -mx-[5rem] bg-black text-white">
        <Footer />
      </footer>
    </div>
  </>
  );
}
