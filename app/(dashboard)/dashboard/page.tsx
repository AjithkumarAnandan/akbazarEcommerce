
import { Suspense } from "react";
// import AdComponent from "./_internal/AdComponent";
// import MainComponent from "./_internal/MainComponent";
import Sidebar from "./_internal/Sidebar";
import Spinner from "@/utils/spinner";
import dynamic from "next/dynamic";
const AdComponent = dynamic(() => import("./_internal/AdComponent"), {
  suspense: true
} as any);

const MainComponent = dynamic(() => import("./_internal/MainComponent"), {
  loading: () => <Spinner />,
});


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
      {/* <Suspense fallback={<Spinner/>}> */}
        <MainComponent />
      {/* </Suspense> */}
    </div>
  </div>
}



