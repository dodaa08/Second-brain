import {  Twitter } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { FC } from 'react';

import {Brain} from "../icons/Brain";

interface SidebarI{
    showx : ()=>void,
    showyt : ()=>void   
}



const Sidebar : FC<SidebarI> = ({showx, showyt})=>{
    const handle = ()=>{
        location.reload();
    }
    return (
        <>
        <div className="min-h-screen w-72 text-black/95 bg-white">
            <div className="flex py-10 px-5">
                <div onClick={handle}>
                <h1 className="text-3xl flex gap-2 cursor-pointer font-medium"> <div className='py-2'></div>  <div className=''> <Brain /></div> Think. </h1>
                </div>
           
            </div>
            <div className="flex flex-col  px-5 py-20  gap-2">
                
                <div onClick={showx} className="text-2xl cursor-pointer  hover:bg-gray-200 py-2 px-5 transition duration-500 flex gap-5"> <div className='py-1'><Twitter /> </div>  Twitter  </div>
               
                <div onClick={showyt} className="text-2xl cursor-pointer  hover:bg-gray-200 py-2 px-5 transition duration-500 flex gap-5"> <div className='py-1'> <Youtube /> </div>  Youtube  </div>
            </div>
        </div>        
        </>
    )
}

export default Sidebar;