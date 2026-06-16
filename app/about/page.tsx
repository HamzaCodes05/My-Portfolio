import About from "@/Components/home/about";
import Navbar from "@/Components/common/navBar";

export default function AboutPage() {
  return (
    <>
      <Navbar classes={{ root: "bg-black" }} />
      <About />
    </>
  );
}
