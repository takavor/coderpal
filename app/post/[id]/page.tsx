// import React from "react";

// import dbConnect from "@/lib/mongodb";
// import Post from "@/models/Post";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// export default async function PostPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   async function getPost(id: string) {
//     "use server";

//     await dbConnect();

//     let post = Post.findById(id);
//     return post;
//   }
//   const id = (await params).id;

//   // get post
//   let post = null;
//   try {
//     post = await getPost(id);
//   } catch (err) {}

//   if (!post) {
//     notFound();
//   }

//   return (
//     <main className="">
//       <div className="flex flex-col gap-4 ">
//         <div className="gap-4">
//           <div className="flex items-center gap-2">
//             <h2>
//               posted by <span className="font-bold">{post.authorUsername}</span>
//             </h2>
//             <Link
//               href={post.githubLink}
//               passHref
//               rel="noopener noreferrer"
//               target="_blank"
//             >
//               <Image
//                 src={post.authorImage}
//                 width={32}
//                 height={32}
//                 alt="profile picture"
//                 className="rounded-full"
//               />
//             </Link>
//           </div>
//         </div>

//         <div className="gap-4">
//           <h1 className="header">project title</h1>
//           <h2>{post.title}</h2>
//         </div>

//         <div>
//           <h1 className="header">project description</h1>
//           <h2>{post.description}</h2>
//         </div>
//       </div>
//     </main>
//   );
// }
