import Experience from "@/Components/home/experience";
import Navbar from "@/Components/common/navBar";

export default function ExperiencePage() {
  return (
    <>
      <Navbar classes={{ root: "bg-black" }} />
      <Experience />
    </>
  );
}
