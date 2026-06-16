"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddProject } from "../hooks/useProjects";
import { isCloudinaryUrl } from "@/lib/cloudinary";

export default function AddProject() {
  const router = useRouter();
  const addProject = useAddProject();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  // Two image input modes: file upload OR Cloudinary URL
  const [imageMode, setImageMode] = useState<"file" | "url">("url");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setImageUrl(val);
    setPreviewImage(val.startsWith("http") ? val : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);

    if (imageMode === "url" && imageUrl) {
      formData.append("imageUrl", imageUrl);
    } else if (imageMode === "file" && imageFile) {
      formData.append("image", imageFile);
    }

    addProject.mutate(formData, {
      onSuccess: () => {
        alert("Project added successfully!");
        router.push("/dashboard/projects/view");
      },
      onError: () => alert("Failed to add project"),
    });
  };

  const cloudinaryValid = imageMode === "url" && imageUrl && isCloudinaryUrl(imageUrl);

  return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold mb-2">Add New Project</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-violet-500 outline-none"
        />

        <input
          type="text"
          placeholder="Project URL / Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-violet-500 outline-none"
        />

        {/* Image mode toggle */}
        <div>
          <p className="text-sm text-gray-400 mb-2 font-medium">Image Source</p>
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => { setImageMode("url"); setPreviewImage(null); setImageFile(null); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                imageMode === "url"
                  ? "bg-violet-600 border-violet-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              Cloudinary URL
            </button>
            <button
              type="button"
              onClick={() => { setImageMode("file"); setPreviewImage(null); setImageUrl(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                imageMode === "file"
                  ? "bg-violet-600 border-violet-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              Upload File
            </button>
          </div>

          {imageMode === "url" ? (
            <div>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
                  value={imageUrl}
                  onChange={handleUrlChange}
                  className="w-full p-3 pr-24 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-violet-500 outline-none text-sm"
                />
                {cloudinaryValid && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                    Cloudinary ✓
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1.5">
                Paste any Cloudinary image URL — optimizations (f_auto, q_auto) are applied automatically.
              </p>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm"
            />
          )}

          {/* Preview */}
          {previewImage && (
            <div className="relative mt-4 w-full aspect-video rounded-xl overflow-hidden border border-gray-700">
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setImageFile(null);
                  setImageUrl("");
                }}
                className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold transition"
              >
                ×
              </button>
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={addProject.isPending}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {addProject.isPending ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
