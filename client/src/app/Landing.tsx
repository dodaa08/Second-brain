import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Post from "../components/Post";
import ContentModel from "../components/ContentModel";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";
import {Plus, Share2} from "lucide-react";


interface Post {
  heading: string;
  address : string,  // Should use `_id` from API
  tags: string[];
  type_link: string; // Matches API
}


const Landing = () => {
    const [open, setOpen] = useState(false);
     const [heading , setheading] = useState("");
     const [address, setaddress] = useState("");
     const [type_link, settype_link] = useState(""); 
     const [posts, setposts] = useState<Post[]>([]);
     const gapSize = posts.some((post)=> post.type_link == "yt") ? "gap-10" : "gap-4";

     const [showx, setshowx] = useState(false);
     const [showyt, setshowyt] = useState(false);
     const [showall, setshowall] = useState(true);

     const handleX = ()=>{
        setshowx(true);
        setshowyt(false)
        settype_link("tweet");
        setshowall(false)
     }
     
     const handleyt = ()=>{
      setshowyt(true);
      setshowx(false)
      settype_link("yt");
      setshowall(false);
     }

    const   CreatePost = async ()=>{
      const api = "http://localhost:3000/api/v1/content/create";
        
      const data = {
            heading : heading,
            link : address,
            type_link : type_link,
            tags : []
      }
      
      const token = localStorage.getItem("token");
      try{
          console.log("Jwt from createpost: ", token);
          const result = await axios.post(api, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          console.log(result.data.message);
          
          location.reload();
      }
        catch(error){
          console.log("Error while Creating Post : ",error);
          alert("Error while Creating Post");
        }

    }


    const getAllPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/content/getAll",{ headers: { Authorization: `Bearer ${token}`}});

        console.log("Raw API Response:", response.data);

        if (Array.isArray(response.data)) {
          const formattedPosts = response.data.map((post) => ({
            heading: post.heading,
            address: post.link, // ✅ Fix ID mapping
            tags: post.tags || [], // ✅ Ensure tags are always an array
            type_link: post.type_link, // ✅ Match API response
          }));

          console.log("Formatted Posts:", formattedPosts);
          setposts(formattedPosts);
        } else {
          console.error("Invalid API response, expected array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    useEffect(() => {
      getAllPosts();
    }, []);

    console.log("Post array len: ", posts.length);
    

  return (
    <div className="flex justify-between bg-gray-100 ">
        
      <Sidebar  showx={handleX} showyt={handleyt}/>

        
      <div className="flex flex-col w-max">

        <h1 className="text-2xl font-medium py-10 underline flex justify-center">All posts</h1>
    

        
          
        
            
          <div className={`grid grid-cols-3 ${gapSize} ml-40 py-20`}> 
          {posts
    .filter((post : Post)=> 
      showall || 
      (showx && post.type_link === "tweet") || 
      (showyt && post.type_link === "yt")
    )
    .map((post : Post, index : number) => (
      <div key={index}>
        <Post heading={post.heading} id={post.address} tags={post.tags} type={post.type_link} />
      </div>
    ))
  }
</div>
        

   
          </div>

          <div className="">
           {
              open && 
             <ContentModel createpost={CreatePost}  open={open} onClose={() => setOpen(false)}    heading={heading}  address={address} setaddress={setaddress} setheading={setheading} type_link={type_link} settype_link={settype_link} />
          } 
          </div>

      <div className="flex gap-10 py-10 px-5">
      <Button text="Add content" varient="primary" startIcon={<Plus />} onClick={() => setOpen(prev => !prev)} />
        <Button text="Share Link" varient="secondary" startIcon={<Share2 />} />
      </div>
    </div>
  );
};

export default Landing;
