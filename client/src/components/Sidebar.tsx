

const Sidebar = ()=>{
    return (
        <>
        <div className="h-screen w-64 bg-gray-100 text-black/95">
            <div className="flex py-5 px-5">
                <h1 className="text-3xl">Brainly</h1>
            </div>
            <div className="flex flex-col justify-center items-center py-20  gap-5">
                <div className="text-2xl cursor-pointer  hover:text-gray-700 transition duration-200">Twitter</div>
                <div className="text-2xl cursor-pointer hover:text-gray-700 transition duration-200">Youtube</div>
            </div>
        </div>        
        </>
    )
}

export default Sidebar;