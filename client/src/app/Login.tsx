import { FC, useRef} from "react";
import { X } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router";

interface LoginProps {
    open: boolean;
    onClose: () => void;
}

const Login: FC<LoginProps> = ({ open, onClose }) => {
    const Name : any = useRef(null);
    const Password : any = useRef(null);
    const navigate = useNavigate();


    const LogUser = async () => {
        const url = "https://second-brain-1-ng79.onrender.com/api/v1/auth/signin";
        
        const data = JSON.stringify({
            name: Name.current?.value,  // Use .current.value to get the actual input value
            password: Password.current?.value
        });
       
        try {
            let result = await axios.post(url, data, { headers: { "Content-Type": "application/json" } });
        
            if(result.data.token){
                localStorage.setItem("token", result.data.token);
            }
            

            console.log("User Found:", result.data);  // Use result.data instead of result.respose.data
            alert("User Created!");
            navigate("/Landing");
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
                                <h1 className="text-xl">LogIn to your Account</h1>
                            </div>
                            <div className="flex flex-col gap-5 py-10 px-10">
                                <input
                                    type="text"
                                    className="border border-gray-300 py-3 px-5 rounded-l focus:outline-none "
                                    placeholder="Enter Name : "
                                    ref={Name}
                                />
                                <input
                                    type="text"
                                    className="border border-gray-300 py-3 px-5 rounded-l focus:outline-none"
                                    placeholder="Enter Password"
                                    ref={Password}
                                />
                            </div>
                            <div className="flex justify-center">
                                <button className="bg-black py-2 px-8 rounded text-white cursor-pointer hover:bg-fuchsia-600 transition duration-200"  onClick={LogUser} >SignIn</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Login;
