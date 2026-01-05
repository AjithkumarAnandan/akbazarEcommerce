"use server"
import  AdComponent  from "./_internal/AdComponent";
import dynamic from "next/dynamic";

const MainComponent = dynamic(() => import("./_internal/MainComponent"))
const Sidebar = dynamic(() => import("./_internal/Sidebar"))

export default async function Home() {
  return <div className="grid grid-cols-3 grid-rows-[auto_1fr] min-h-[100vh] mx-[4rem] ">
    {/* Sidebar  */}
    <aside className="col-span-1 border-r border-r-gray-300 mb-0 ">
      <Sidebar />
    </aside>
    {/* Advertisement  */}
    <div className="col-span-2 m-6 mr-0 mb-0 pb-0">
      <AdComponent />
    </div>
    <div className="col-span-3">
      <MainComponent />
    </div>
  </div>
}



