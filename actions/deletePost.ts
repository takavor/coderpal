"use server";

import mongoose from "mongoose";

import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export async function deletePost(id: string) {
  await dbConnect();
  await Post.findByIdAndDelete({
    _id: id,
  });
  console.log("deleted post with id", id);
}
