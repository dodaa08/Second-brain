import { useState } from "react";
import Login from "../app/Login";
import { FC } from "react";
import Signup from "../app/Signup";

interface HeaderI{
    check : boolean;
}

const Header : FC<HeaderI> = ({check})=>{
    const [isOpen, setisOpen] = useState(false);   
    const [isOpenSignup, setIsSignup]  = useState(false);

    return(
        <>
         <div className="flex justify-center">
              <div className="bg-gray-100/80 shadow-md border border-gray-300 py-4 mt-6 w-11/12 md:w-4/5 flex justify-between px-10 rounded-lg items-center">
                  <div className="py-2">
                    <h1 className="text-3xl font-semibold">Think.</h1>
                  </div>
                  {
                    !check && 
                  <div className=" flex gap-5">
                     <button className="text-xl shadow-md py-2 px-5 bg-gray-200  border cursor-pointer hover:bg-gray-300 transition duration-200  border-gray-200 rounded" onClick={()=>setisOpen((e)=>!e)}> Login</button>
                     <button className="text-xl shadow-md py-2 px-5 bg-gray-200  border cursor-pointer hover:bg-gray-300 transition duration-200 rounded" onClick={()=>setIsSignup((e)=>!e)}>Sign Up</button>
                  </div>
                }
              </div>
              <Login  open={isOpen} onClose={()=>setisOpen(false)}/> 
              <Signup open={isOpenSignup} onClose={()=>setIsSignup(false)}/>
         </div>
        </>
    )
}

export default Header;