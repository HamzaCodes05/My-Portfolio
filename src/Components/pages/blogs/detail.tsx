"use client";

import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useBlog } from "../hooks/useBlogs";

const MDPreview = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  { ssr: false }
);

export default function BlogDetail() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();

  const { data: blog, isLoading, isError } = useBlog(id);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  if (isError || !blog)
    return <p className="text-center mt-10 text-red-500">Blog not found.</p>;

  const markdownContent = blog.content || "";

  const getImageUrl = (image?: string) => image || null;

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto p-6">
        {getImageUrl(blog.image) && (
          <img
            src={getImageUrl(blog.image)!}
            alt={blog.title}
            className="w-full h-auto object-cover rounded-3xl mb-5 hover:scale-105 transition-transform duration-300"
          />
        )}

        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-400 mb-6">
          By {blog.author} •{" "}
          {new Date(blog.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div data-color-mode="dark" className="p-6 rounded-2xl shadow-lg mb-10">
          <MDPreview
            source={markdownContent}
            style={{
              backgroundColor: "transparent",
              color: "white",
              lineHeight: "1.8",
              fontSize: "1.05rem",
              fontFamily: "system-ui, sans-serif",
            }}
          />
        </div>

        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          ← Back to Blogs
        </button>
      </div>
    </div>
  );
}
