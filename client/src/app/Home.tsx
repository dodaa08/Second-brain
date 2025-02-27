import Header from "../components/Header";
import MainHome from "../components/MainHome";


const Home = ()=>{

    return(
        <>
        <div className="flex justify-center">
            <div className="flex flex-col w-full md:w-4/5">
             <div className="">
              <Header />
            </div>    

            <div>
                <MainHome />
            </div>

                </div>
        </div>        
        </>
    )
}

export default Home;