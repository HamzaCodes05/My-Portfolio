"use client";

import { useState } from "react";
import Landing from "./landing";
import Experience from "./experience";
import About from "./about";
import Services from "./services";
import MyWork from "./projects";
import Contact from "./contact";
import Footer from "../common/footer";
import Sidebar from "../common/sidebar";
import Cursor from "../common/cursor";

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Cursor />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <main
        className="transition-all duration-300"
        style={{ paddingLeft: collapsed ? "72px" : "256px" }}
      >
        {/* On mobile no padding — sidebar becomes a top bar */}
        <style>{`@media (max-width: 1023px) { main { padding-left: 0 !important; } }`}</style>
        <Landing />
        <Experience />
        <About />
        <Services />
        <MyWork />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Home;
