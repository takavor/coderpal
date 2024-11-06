"use client";

import React from "react";
import moment from "moment";

interface PostDateProps {
  post: {
    createdAt: Date;
  };
}

export default function PostDate({ post }: PostDateProps) {
  return (
    <div>
      <p>{moment(post.createdAt).format("LLL")}</p>
    </div>
  );
}
