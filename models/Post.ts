import mongoose, { Schema, model } from "mongoose";

export interface PostDocument {
  _id: string;
  authorId: string;
  authorUsername: string;
  authorImage: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  programmingLanguages: String[];
  githubLink: string;
  commentIds: String[];
}

const PostSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    authorUsername: {
      type: String,
      required: true,
    },
    programmingLanguages: {
      type: [String],
    },
    authorImage: {
      type: String,
    },
    githubLink: {
      type: String,
    },
    commentIds: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || model<PostDocument>("Post", PostSchema);
export default Post;
