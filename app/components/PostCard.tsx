import Link from "next/link";
import React from "react";

interface PostCardProps {
  post: {
    title: string;
    description: string;
    authorUsername: string;
    programmingLanguages: string[];
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="flex flex-col bg-white my-4 rounded-sm p-4 gap-2">
      <p>
        <span className="font-bold">{post.title}</span>
      </p>
      <p>
        posted by <span className="font-bold">{post.authorUsername}</span>
      </p>
      <hr />
      <p>{post.description}</p>
      <hr />
      <div className="flex flex-col md:flex-row gap-4">
        <p>Languages:</p>
        {post.programmingLanguages?.map((language, index) => {
          return (
            <li className="list-none" key={index}>
              {language}
            </li>
          );
        })}
      </div>
    </div>
  );
}
