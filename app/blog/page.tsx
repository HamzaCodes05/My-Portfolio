import Blog from "@/Components/pages/blogs/blog";
import Navbar from "@/Components/common/navBar";

export default function BlogPage() {
  return (
    <>
      <Navbar classes={{ root: "bg-black" }} />
      <Blog />
    </>
  );
}
