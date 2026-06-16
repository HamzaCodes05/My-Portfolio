import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Blog {
  id: number;
  title: string;
  author: string;
  content?: string;
  image?: string;
  createdAt: string;
}

export const useBlogs = () =>
  useQuery<Blog[], Error>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("/api/blogs");
      return res.data;
    },
  });

export const useBlog = (id?: string) =>
  useQuery<Blog, Error>({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!id) throw new Error("No blog ID");
      const res = await axios.get(`/api/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      await axios.post("/api/blogs", formData);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export const useEditBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      await axios.put(`/api/blogs/${id}`, formData);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/blogs/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};
