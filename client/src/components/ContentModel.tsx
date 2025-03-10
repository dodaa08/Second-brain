import { FC, useEffect, useState } from "react";
import { X } from 'lucide-react';

interface SignupProps {
    open: boolean;
    onClose: () => void;
    heading : string,
    address : string,
    type_link : string,
    setheading : (value : string)=>void,
    setaddress : (value : string)=>void,
    settype_link : (value : string)=>void,
    createpost : ()=>void,
}

const ContentModel: FC<SignupProps> = ({ open, onClose, heading, setheading, address, setaddress, type_link, settype_link, createpost}) => {

    const [error, seterror] = useState(false);
    const [errormessage, setmessage] = useState("");
    
    const handle = ()=>{
         if(type_link == "" || address == "" || heading == ""){
            setmessage("Fill the details");
            seterror(true);
         }
         else if (type_link == "yt" || type_link == "tweet"){
            setmessage("");
            seterror(false);
         }
         else{
            setmessage("invalid type_link");
            seterror(true);
         }
         
    }

    useEffect(()=>{
        handle();
    }, [type_link])

    return (
        <>
            {
                open && (
                    <div className="bg-gray-100/80 fixed top-0 left-0 w-full h-full flex justify-center items-center">
                        <div className="fixed top-5 right-10 cursor-pointer" onClick={onClose}>
                            <X />
                        </div>
                        <div className="bg-white shadow-lg w-max h-max py-10 flex flex-col">
                            <div className="flex justify-center"> 
                                <h1 className="text-xl">Create a Post</h1>
                            </div>
                            <div className="flex flex-col gap-5 py-10 px-10">
                                <input
                                    type="text"
                                    className="border border-gray-300 py-3 px-5 rounded-l focus:outline-none "
                                    placeholder="Post Heading : "
                                    value={heading}
                                    
                                    onChange={(e)=>setheading(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="border border-gray-300 py-3 px-5 rounded-l focus:outline-none"
                                    placeholder="Post Address: "
                                    value={address}
                                    onChange={(e)=>setaddress(e.target.value)}
                                />
                                 <input
                                    type="text"
                                    className="border border-gray-300 py-3 px-5 rounded-l focus:outline-none"
                                    placeholder="yt or tweet: "
                                    value={type_link}
                                    onChange={(e)=>settype_link(e.target.value)}
                                />
                               <div className="flex justify-center text-xl">{errormessage}</div>
                            </div>
                            <div className="flex justify-center">
                                { 
                                   error == false &&
                                    <button onClick={createpost} className="bg-black py-2 px-8 rounded text-white cursor-pointer hover:bg-fuchsia-600 transition duration-200">Create</button>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ContentModel;
