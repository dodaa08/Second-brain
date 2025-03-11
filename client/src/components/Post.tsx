import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { Share2, Trash2 } from "lucide-react";

declare global {
  interface Window {
    twttr?: any;
  }
}

interface CardProps {
  id: string;
  tags: string[];
  heading: string;
  type: string;
  deleteP : ()=>void
}

const Post: FC<CardProps> = ({ id, tags, heading, type, deleteP }) => {
  useEffect(() => {
    if (type === "tweet") {
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      } else {
        window.twttr.widgets.load();
      }
    }
  }, [type, id]);

  return (
    <div className="bg-white border-2 w-max h-max rounded-xl border-gray-200 py-2 px-5">
      {/* Share & Delete Icons */}
      <div className="flex justify-between gap-10 items-center py-2 px-5">
        <button className="cursor-pointer">
          <Share2 />
        </button>
        <button onClick={deleteP} className="cursor-pointer">
          <Trash2 />
        </button>
      </div>

      {/* Heading and Link */}
      <div className="flex justify-between gap-10 items-center py-2 px-5">
        <span className="font-semibold">{heading}</span>
        <Link
          to={type === "tweet" ? `https://twitter.com/i/status/${id}` : `https://www.youtube.com/embed/${id}`}
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit
        </Link>
      </div>

      {/* Embed YouTube Video */}
      {type === "yt" && (
        <div className="overflow-hidden rounded-lg">
          <iframe
            className="w-full h-[200px]"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Embed Tweet */}
      {type === "tweet" && (
        <blockquote className="twitter-tweet">
          <a href={`https://twitter.com/user/status/${id}`}></a>
        </blockquote>
      )}

      {/* Tags */}
      <div className="mt-10 py-2">
        {tags.map((tag, index) => (
          <span key={index} className="mr-2 bg-gray-200 text-gray-700 text-l px-5 py-2 rounded-xl text-sm">
            # {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Post;
