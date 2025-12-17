import { lazy } from "react"

const MainComponent = lazy(() => import("./_internal/MainComponent"))
const Sidebar = lazy(() => import("./_internal/Sidebar"))
const AdComponent = lazy(() => import("./_internal/AdComponent"))

export default function Home() {
  return <div className="grid grid-cols-[1fr_2fr] grid-rows-[auto] min-h-[100vh] mx-[4rem] ">
    {/* Sidebar  */}
    <aside className="col-span-1 border-r border-r-gray-300 mb-0 ">
      <Sidebar />
    </aside>
    {/* Advertisement  */}
    <div className="col-start-2 row-start-1 col-span-2 m-6 mr-0 mb-0 pb-0">
      <AdComponent />
    </div>
    <div className="w-full min-w-screen">
    <MainComponent />
    </div>
  </div>
}



