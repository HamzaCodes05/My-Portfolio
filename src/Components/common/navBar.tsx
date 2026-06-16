"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Container from "./container";

const links = [
  { ref: "/", text: "Home" },
  { ref: "/experience", text: "Experience" },
  { ref: "/about", text: "About" },
  { ref: "/services", text: "Services" },
  { ref: "/work", text: "Work" },
  { ref: "/contact", text: "Contact" },
];

interface NavbarProps {
  classes?: { root?: string };
}

const Navbar = ({ classes = {} }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`w-full transition-all duration-500 z-50 ${
        scrolled
          ? "bg-[#06060f]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      } ${classes.root || ""}`}
    >
      <Container>
        <div className="flex justify-between items-center py-5 px-6 text-white">
          {/* Gradient Logo */}
          <a href="/" className="group relative">
            <span className="text-4xl font-black gradient-text select-none">H</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
          </a>

          {/* Mobile menu button */}
          <button
            className="lg:hidden block p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex gap-8 items-center font-medium text-sm tracking-wide">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.ref}
                className="relative text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                {link.text}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-violet-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="/contact"
              className="ml-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 transition-opacity text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              Hire Me
            </a>
          </div>
        </div>
      </Container>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="lg:hidden flex flex-col gap-4 px-6 pb-6 pt-2 bg-[#0d0d1a]/95 backdrop-blur-xl border-t border-white/5">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.ref}
              className="text-gray-300 hover:text-white transition-colors py-1 border-b border-white/5 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {link.text}
            </a>
          ))}
          <a
            href="/contact"
            className="mt-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-center"
            onClick={() => setIsOpen(false)}
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
