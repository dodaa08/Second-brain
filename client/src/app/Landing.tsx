import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Post from "../components/Post";
import ContentModel from "../components/ContentModel";
import { useCallback, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Plus, Share2 } from "lucide-react";

// https://second-brain-1-ng79.onrender.com  the backend has been deployed !!!!
// delete and share

interface Post {
  heading: string;
  address: string; 
  tags: string[];
  type_link: "yt" | "" | "tweet"; // Matches API,
  _id : string
}

const Landing = () => {
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState("");
  const [address, setAddress] = useState("");
  const [type_link, setTypeLink] = useState<"" | "tweet" | "yt">("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  
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
    const api = "https://second-brain-1-ng79.onrender.com/api/v1/content/create";
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
      const datanew = { heading, address, type_link, tags: [], _id : result.data._id };
     
      setPosts((posts)=>[...posts, datanew]); 
     
      setOpen(false); 
    } catch (error) {
      console.error("Error while creating post:", error);
      setError("Error while creating post");
    }
  };

  const getAllPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://second-brain-1-ng79.onrender.com/api/v1/content/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        const formattedPosts = response.data.map((post) => ({
          heading: post.heading,
          address: post.link,
          tags: post.tags || [],
          type_link: (["yt", "tweet", ""].includes(post.type_link) ? post.type_link : "") as "yt" | "tweet" | "",
          _id : post._id
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


  const deletePost = async (id : string) => {
    const token = localStorage.getItem("token"); // Ensure token is fetched inside function
    if (!token) {
      alert("Unauthorized: No token found");
      return;
    }
  
    try {
      const response = await axios.delete(`https://second-brain-1-ng79.onrender.com/api/v1/content/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts((posts) => posts.filter((post) => post._id !== id));
      console.log(response.data.message);
      alert("Post deleted...");
    } catch (error) {
      console.error("Error While deleting:", error);
      alert("Error deleting post. Check console for details.");
    }
  };
  

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
          {filteredPosts.map((post, index) => (
            <div key={index}>
              <Post deleteP={()=>deletePost(post._id)}  heading={post.heading} id={post.address} tags={post.tags} type={post.type_link} />
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
