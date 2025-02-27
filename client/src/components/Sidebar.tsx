import { Twitter } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';


const Sidebar = ()=>{
    return (
        <>
        <div className="h-screen w-64 bg-gray-100 text-black/95">
            <div className="flex py-5 px-5">
                <Link to="/">
                <h1 className="text-3xl flex gap-2 cursor-pointer"> <div className='py-2'>{<Brain></Brain>}</div>Brainly  </h1>
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center py-20  gap-5">
                
                <div className="text-2xl cursor-pointer  hover:text-gray-700 transition duration-200 flex gap-5">  Twitter  <div className='py-1'><Twitter /> </div> </div>
               
                <div className="text-2xl cursor-pointer  hover:text-gray-700 transition duration-200 flex gap-5">  Youtube  <div className='py-1'> <Youtube /> </div> </div>
            </div>
        </div>        
        </>
    )
}

export default Sidebar;