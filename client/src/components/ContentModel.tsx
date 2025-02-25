import { useState, FC } from "react";
import { X } from 'lucide-react';


interface ContentModelProps {
    open : boolean;
    onClose : ()=>void;
}


const ContentModel : FC<ContentModelProps> = ({open, onClose})=>{
    
    return(
        <>
         {
            open&& (
                <>
                <div className="fixed top-0 left-0 w-full h-full bg-slate-400 opacity-90  " >
                    <div className="fixed top-5 right-10 cursor-pointer" onClick={onClose}>
                        <X />
                    </div>
                    <div className="flex justify-center items-center h-full w-full">

                    <div className="flex flex-col gap-5 py-10 px-10 bg-white h-max w-max shadow-lg">  
                        <div className="flex justify-center">
                            <h1 className="text-xl">Create a Post</h1>
                        </div>
                        <input type="text" placeholder="Enter Heading for post"  className="border-gray-300 py-2 px-5 rounded-md border-2  focus:outline-none"/>
                        <input type="text" placeholder="Enter Post Id"  className="border-gray-300 py-2 px-5 rounded-md border-2  focus:outline-none"/>
                        <div className="flex justify-center gap-5">
                        <button className="bg-black text-white py-2 px-8 rounded-xl cursor-pointer hover:scale-96 transition duration-200">Create</button>
                        </div>
                    </div>
                    </div>
                </div>
                </>
            )

         }
        </>
    )
}

export default ContentModel