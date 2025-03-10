import Header from "../components/Header";
import MainHome from "../components/MainHome";
import { useState, useEffect } from "react";

const Home = ()=>{
    
    const [Auth, Setauth] = useState(false);
    
    const checkAuth = async ()=>{
        const check = await localStorage.getItem("token");
        if(check){
            Setauth(true);
        }
    }

    useEffect(()=>{
        checkAuth();
    },[Auth]);
    return(
        <>
        <div className="flex justify-center">
            <div className="flex flex-col w-full md:w-4/5">
             <div className="">
              <Header check={Auth}/>
            </div>    

            <div>
                <MainHome check={Auth}/>
            </div>

                </div>
        </div>        
        </>
    )
}

export default Home;