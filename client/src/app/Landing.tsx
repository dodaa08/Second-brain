import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import { Plus, Share2, Trash2 } from "lucide-react";
import Post from "../components/Post";
import ContentModel from "../components/ContentModel";
import { useState } from "react";


const Landing = () => {
    const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-between">
        
      <Sidebar />

      <div className="flex flex-col">
        <h1 className="text-2xl py-5">All posts</h1>
        <div className="flex justify-between gap-10">

        {/* Pass only Tweet ID instead of full URL */}
        <Post
          heading="Songs i like"
          id="zaCbuB3w0kg" // Only pass the Tweet ID
          tags={["YT", "Recent"]}
          Share_icon={<Share2 />}
          delete_icon={<Trash2 />}
          type="yt"
          />
        <Post
          heading="Tweet    "
          id="1894040350194311170" // Only pass the Tweet ID
          tags={["Tweet", "Recent"]}
          Share_icon={<Share2 />}
          delete_icon={<Trash2 />}
          type="tweet"
          />
      </div>
          </div>

          <div className="">
          <ContentModel open={open} onClose={() => setOpen(false)} />
          </div>

      <div className="flex gap-10 py-5 px-5">
      <Button text="Add content" varient="primary" startIcon={<Plus />} onClick={() => setOpen(prev => !prev)} />
        <Button text="Share Link" varient="secondary" startIcon={<Share2 />} />
      </div>
    </div>
  );
};

export default Landing;
