import { ReactElement, FC } from "react";



interface ButtonProps {
    text : string,
    startIcon ?: ReactElement,
    varient : "primary" | "secondary"
    onClick?: () => void; // ✅ Correct  
}

const Varient = {
    "primary" : "bg-purple-400 text-white",
    "secondary" : "bg-purple-100 text-purple-600"
}


const Button : FC<ButtonProps> = ({text, varient, startIcon, onClick})=>{
    return(
        <>
        <button className={`flex h-12 text-xl text-black font-light py-2 px-5 hover:text-black cursor-pointer hover:text-l ease-in-out transition duration-200 rounded justify-between ${Varient[varient]}`} onClick={onClick || (() => {})}>
            {startIcon && <span className="px-2 py-0.5">{startIcon}</span>}
            {text}
        </button>       
        </>
    )
}

export default Button;