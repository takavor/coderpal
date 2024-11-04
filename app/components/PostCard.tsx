import Image from "next/image";
import React from "react";
import moment from "moment";

interface PostCardProps {
  post: {
    title: string;
    description: string;
    authorUsername: string;
    programmingLanguages: string[];
    authorImage: string;
    createdAt: Date;
    commentIds: string[];
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="transition hover:shadow-xl flex flex-col bg-white my-4 rounded-sm p-4 gap-2">
      <div className="flex flex-col justify-start sm:flex-row  sm:justify-between">
        <p>
          <span className="font-bold">{post.title}</span>
        </p>
        <p>
          {post.commentIds.length === 0 ? "No" : post.commentIds.length}{" "}
          {post.commentIds.length === 1 ? "comment" : "comments"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <p>
            posted by <span className="font-bold">{post.authorUsername}</span>
          </p>

          <Image
            src={post.authorImage}
            alt="profile picture"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <div>
          <p>{moment(post.createdAt).startOf("hour").fromNow()}</p>
        </div>
      </div>
      <hr />
      <p>
        {post.description.length >= 500
          ? post.description.slice(0, 500) + "..."
          : post.description}
      </p>
      <hr />
      <div className="flex flex-col lg:flex-row gap-4">
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
