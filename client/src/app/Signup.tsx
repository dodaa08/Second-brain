import { FC, useRef } from "react";
import { X } from 'lucide-react';
import axios from "axios";


interface SignupProps {
    open: boolean;
    onClose: () => void;
}


const Signup: FC<SignupProps> = ({ open, onClose }) => {

    const Name : any = useRef(null);
    const Password : any = useRef(null);


    const CreateUser = async () => {
        const url = "http://localhost:3000/api/v1/auth/signup";
        
        const data = JSON.stringify({
            name: Name.current?.value,  // Use .current.value to get the actual input value
            password: Password.current?.value
        });
       
        try {
            let result = await axios.post(url, data, { headers: { "Content-Type": "application/json" } });
        
            if(result.data.token){
                localStorage.setItem("token", result.data.token);
            }
            

            console.log("User Created:", result.data);  // Use result.data instead of result.respose.data
            alert("User Created!");
        } catch (error: any) {
            console.error("Error:", error);
            alert("Error: " + (error.response?.data?.message || error.message));
        }
    };
    

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
                                <h1 className="text-xl">Create An Account</h1>
                            </div>
                            <div className="flex flex-col gap-5 py-10 px-10">
                                <input
                                    type="text"
                                    className="border border-gray-300 py-3 px-5 rounded-l focus:outline-none "
                                    placeholder="Enter Name : "
                                    ref={Name}
                                />
                               <input
    type="password" 
    className="border border-gray-300 py-3 px-5 rounded-l focus:outline-none"
    placeholder="Enter Password"
    ref={Password}
/>

                            </div>
                            <div className="flex justify-center">
                                <button className="bg-black py-2 px-8 rounded text-white cursor-pointer hover:bg-fuchsia-600 transition duration-200" onClick={CreateUser}>Create</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Signup;
