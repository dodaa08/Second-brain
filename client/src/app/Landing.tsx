import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Post from "../components/Post";
import ContentModel from "../components/ContentModel";
import { useCallback, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Plus, Share2 } from "lucide-react";

interface Post {
  heading: string;
  address: string; // `_id` from API
  tags: string[];
  type_link: "yt" | "" | "tweet"; // Matches API
}

const Landing = () => {
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState("");
  const [address, setAddress] = useState("");
  const [type_link, setTypeLink] = useState<"" | "tweet" | "yt">("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  
  const gapSize = posts.some((post) => post.type_link === "yt") ? "gap-10" : "gap-4";

  const [showX, setShowX] = useState(false);
  const [showYT, setShowYT] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const handleX = useCallback(() => {
    setShowX(true);
    setShowYT(false);
    setTypeLink("tweet");
    setShowAll(false);
  }, []);

  const handleYT = useCallback(() => {
    setShowYT(true);
    setShowX(false);
    setTypeLink("yt");
    setShowAll(false);
  }, []);


  const createPost = async () => {
    const api = "http://localhost:3000/api/v1/content/create";
    const data = { heading, link: address, type_link, tags: [] };
    const token = localStorage.getItem("token");

    try {
      const result = await axios.post(api, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(result.data.message);
     
      setPosts((prev) => [...prev, data]); 
      setOpen(false); 
    } catch (error) {
      console.error("Error while creating post:", error);
      setError("Error while creating post");
    }
  };

  const getAllPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/content/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        const formattedPosts = response.data.map((post) => ({
          heading: post.heading,
          address: post.link,
          tags: post.tags || [],
          type_link: (["yt", "tweet", ""].includes(post.type_link) ? post.type_link : "") as "yt" | "tweet" | "",
        }));

        setPosts(formattedPosts);
      } else {
        console.error("Invalid API response, expected array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts");
    }
  };


  const deletePost = async (id : string)=>{
     try{
      
      const response = await axios.delete(`http://localhost:3000/api/v1/content/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}`,   mode: 'cors', }
      });

      setPosts((post)=>post.filter((posts)=>posts.address!== id));
      console.log(response.data.message);
      alert("Post deleted...");
     }
     catch(error){
      console.log("Error While deleting..", error);
     }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    getAllPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        showAll || (showX && post.type_link === "tweet") || (showYT && post.type_link === "yt")
    );
  }, [posts, showAll, showX, showYT]);

  return (
    <div className="flex justify-between bg-gray-100">
      <Sidebar showx={handleX} showyt={handleYT} />

      <div className="flex flex-col w-max">
        <h1 className="text-2xl font-medium py-10 underline flex justify-center">All posts</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${gapSize} ml-40 py-20`}>
          {filteredPosts.map((post) => (
            <div key={post.address}>
              <Post deleteP={()=>deletePost(post.address)}  heading={post.heading} id={post.address} tags={post.tags} type={post.type_link} />
            </div>
          ))}
        </div>
      </div>

      {open && (
        <ContentModel
          createpost={createPost}
          open={open}
          onClose={() => setOpen(false)}
          heading={heading}
          address={address}
          setaddress={setAddress}
          setheading={setHeading}
          type_link={type_link}
          settype_link={setTypeLink}
        />
      )}

      <div className="flex gap-10 py-10 px-5">
        <Button text="Add content" varient="primary" startIcon={<Plus />} onClick={() => setOpen((prev) => !prev)} />
        <Button text="Share Link" varient="secondary" startIcon={<Share2 />} />
      </div>
    </div>
  );
};

export default Landing;
