"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAddBlog } from "../hooks/useBlogs";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function AddBlog() {
  const router = useRouter();
  const addBlog = useAddBlog();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    if (image) formData.append("image", image);

    addBlog.mutate(formData, {
      onSuccess: () => {
        alert("✅ Blog added successfully!");
        router.push("/dashboard/view");
      },
      onError: () => alert("❌ Failed to add blog"),
    });
  };

  return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">📝 Add New Blog</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <div data-color-mode="dark">
          <label className="block text-sm text-gray-400 mb-1">Content</label>
          {MDEditor && (
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || "")}
              height={300}
              preview="live"
            />
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Insert Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border-2 border-gray-500 w-full p-2 hover:bg-blue-300"
          />

          {previewImage && (
            <div className="relative w-40 h-32 mt-2">
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setImage(null);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold hover:bg-red-700 transition"
              >
                -
              </button>
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={addBlog.isPending}
          className="bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg transition disabled:opacity-50"
        >
          {addBlog.isPending ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
}
