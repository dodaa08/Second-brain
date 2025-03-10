import { Link } from "react-router-dom";
import { FC} from "react";

interface MainHomeI{
    check : boolean
}


const MainHome : FC<MainHomeI> = ({check})=>{
   

    return (
        <div className="flex justify-center py-20">
            <div className="flex justify-between w-full md:w-4/5">
       
            <div className="py-20 flex flex-col gap-5">
                <h1 className="text-4xl font-bold">
                    More than just a Second Brain, <br />  <div>it's a Second Home.</div>
                </h1>
                <h1 className="text-2xl font-bold">
                      Throw Any sort of link <br />  <div> We'll take care of it securely.</div>
                </h1>
                <div className="">

                    {
                        check &&
                        <Link to="/Landing">
                <button className="text-xl shadow-md bg-black py-2 px-5 rounded-l w-max text-white transition duration-200 hover:bg-gray-900/80 cursor-pointer">Get Brain</button>
                    </Link>
            }
                </div>
            </div>
            

            <div className="bg-gray-100/80 shadow-md border border-gray-300 py-5 px-10">
                <img src="https://lumenor.ai/cdn-cgi/imagedelivery/F5KOmplEz0rStV2qDKhYag/c14bc025-1667-488a-3b0a-dce9b235f300/source" alt=""  className="h-110 rounded-l"/>
            </div>
            </div>
        </div>
    )
}

export default MainHome;