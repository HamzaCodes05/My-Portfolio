"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useProjects, useUpdateProject } from "../hooks/useProjects";
import { isCloudinaryUrl } from "@/lib/cloudinary";

export default function EditProject() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const { data: projects } = useProjects();
  const updateProject = useUpdateProject();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [imageMode, setImageMode] = useState<"file" | "url">("url");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Pre-fill from existing project data
  useEffect(() => {
    if (!projects || loaded) return;
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    setTitle(project.title);
    setLink(project.link);
    if (project.image) {
      setImageUrl(project.image);
      setPreviewImage(project.image);
      setImageMode("url");
    }
    setLoaded(true);
  }, [projects, id, loaded]);

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

    updateProject.mutate(
      { id, formData },
      {
        onSuccess: () => {
          alert("Project updated!");
          router.push("/dashboard/projects/view");
        },
        onError: () => alert("Failed to update project"),
      }
    );
  };

  const cloudinaryValid = imageMode === "url" && imageUrl && isCloudinaryUrl(imageUrl);

  if (!loaded && projects) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-red-400">
        Project not found.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold mb-2">Edit Project</h2>

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
              onClick={() => { setImageMode("url"); setImageFile(null); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                imageMode === "url"
                  ? "bg-violet-600 border-violet-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              URL / Cloudinary
            </button>
            <button
              type="button"
              onClick={() => { setImageMode("file"); setImageUrl(""); setPreviewImage(null); }}
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
            <div className="relative">
              <input
                type="text"
                placeholder="https://res.cloudinary.com/..."
                value={imageUrl}
                onChange={handleUrlChange}
                className="w-full p-3 pr-28 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-violet-500 outline-none text-sm"
              />
              {cloudinaryValid && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  Cloudinary ✓
                </span>
              )}
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
                onClick={() => { setPreviewImage(null); setImageFile(null); setImageUrl(""); }}
                className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold transition"
              >
                ×
              </button>
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateProject.isPending}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {updateProject.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
