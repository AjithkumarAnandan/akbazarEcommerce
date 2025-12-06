import React, { lazy } from "react";
const Header = lazy(() => import("./_internal/Header"))
const Sidebar = lazy(() => import("./_internal/Sidebar"))
const Footer = lazy(() => import("./_internal/Footer"))
const AdComponent = lazy(() => import("./_internal/AdComponent"))

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
    <div className="grid grid-cols-[12rem_1fr_1fr] grid-rows-[5rem_auto_auto_12rem] min-h-[100vh] mx-[4rem] ">
      {/* Header component */}
      <header className="col-span-3 grid items-center h-[5rem]  ">
        <Header />
        <hr className="text-gray-300 -mx-[5rem]" />
      </header>
      {/* Sidebar  */}
      <aside className="col-span-1 border-r border-r-gray-300 mb-0 ">
        <Sidebar />
      </aside>
      {/* Advertisement  */}
      <div className="col-span-2 m-6 mr-0 mb-0 pb-0">
        <AdComponent />
      </div>
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
