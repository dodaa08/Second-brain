import Sidebar from "../components/Sidebar";
const Landing = ()=>{
    return(
        <>
        <div className="flex justify-between">
            <div>
                <Sidebar />
            </div>

            <div className="flex h-full gap-5 p-10">
                <button className="text-xl bg-purple-400 py-2 px-5  rounded-l text-white">Add Content</button>
                <button className="text-xl bg-white py-2 px-5 rounded-l border-2 text-blue-300">Share Brain</button>
            </div>
        </div>
        </>
    )
}

export default Landing;