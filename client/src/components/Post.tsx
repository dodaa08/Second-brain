import { FC, ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    twttr?: any;
  }
}

interface CardProps {
  id: string;
  tags: string[];
  heading: string;
  delete_icon: ReactElement;
  Share_icon: ReactElement;
  type: "tweet" | "yt";
}

const Post: FC<CardProps> = ({ id, tags, heading, Share_icon, delete_icon, type }) => {
    useEffect(() => {
        if (type === "tweet" && window.twttr?.widgets) {
          window.twttr.widgets.load();
        }
      }, [type, id]); 

  return (
    <div className="bg-white border-2 w-full rounded-xl border-gray-200 py-2 px-5">
      {/* Share & Delete Icons */}
      <div className="flex justify-between gap-10 items-center py-2 px-5">
        <button className="cursor-pointer">{Share_icon}</button>
        <button className="cursor-pointer">{delete_icon}</button>
      </div>

      {/* Heading and Link */}
      <div className="flex justify-between gap-10 items-center py-2 px-5">
        <span className="font-semibold">{heading}</span>
        <Link to={type == "tweet" ? `https://twitter.com/i/status/${id}` : `https://www.youtube.com/embed/${id}`} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer"  >
          Visit
        </Link>
      </div>

      {/* Embed YouTube Video */}
      {type === "yt" && (
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${id}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
)}


{type === "tweet" && (
  <blockquote className="twitter-tweet">
    <a href={`https://twitter.com/i/status/${id}`}>View Tweet</a>
  </blockquote>
)}

      {/* Tags */}
      <div className="mt-10">
        {tags.map((tag, index) => (
          <span key={index} className="mr-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Post;
