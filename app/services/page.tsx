import Services from "@/Components/home/services";
import Navbar from "@/Components/common/navBar";

export default function ServicesPage() {
  return (
    <>
      <Navbar classes={{ root: "bg-black" }} />
      <Services />
    </>
  );
}
