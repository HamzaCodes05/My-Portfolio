import BlogDetail from "@/Components/pages/blogs/detail";
import Navbar from "@/Components/common/navBar";

export default function BlogDetailPage() {
  return (
    <>
      <Navbar classes={{ root: "bg-black" }} />
      <BlogDetail />
    </>
  );
}
