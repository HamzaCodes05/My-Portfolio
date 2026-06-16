import MyWork from "@/Components/home/projects";
import Navbar from "@/Components/common/navBar";

export default function WorkPage() {
  return (
    <>
      <Navbar classes={{ root: "bg-black" }} />
      <MyWork />
    </>
  );
}
