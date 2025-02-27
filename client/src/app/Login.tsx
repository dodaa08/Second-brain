import { FC } from "react";
import { X } from 'lucide-react';

interface LoginProps {
    open: boolean;
    onClose: () => void;
}

const Login: FC<LoginProps> = ({ open, onClose }) => {
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
                                <h1 className="text-xl">LogIn to your Account</h1>
                            </div>
                            <div className="flex flex-col gap-5 py-10 px-10">
                                <input
                                    type="text"
                                    className="border border-gray-300 py-3 px-5 rounded-l focus:outline-none "
                                    placeholder="Enter Name : "
                                />
                                <input
                                    type="text"
                                    className="border border-gray-300 py-3 px-5 rounded-l focus:outline-none"
                                    placeholder="Enter Password"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button className="bg-black py-2 px-8 rounded text-white cursor-pointer hover:bg-fuchsia-600 transition duration-200">SignIn</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Login;
