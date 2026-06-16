import Contact from "@/Components/home/contact";
import Navbar from "@/Components/common/navBar";

export default function ContactPage() {
  return (
    <>
      <Navbar classes={{ root: "bg-black" }} />
      <Contact />
    </>
  );
}
