import mongoose, { Schema, model } from "mongoose";

export interface CommentDocument {
  _id: string;
  authorId: string;
  authorUsername: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<CommentDocument>(
  {
    authorId: {
      type: String,
      required: true,
    },
    authorUsername: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment =
  mongoose.models.Comment || model<CommentDocument>("Comment", CommentSchema);
export default Comment;
