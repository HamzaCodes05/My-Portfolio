"use client";

import { useState, useEffect } from "react";
import { X, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import Fb from "../../assets/facebook.png";
import Ins from "../../assets/instagram.png";
import Li from "../../assets/linkedin.png";
import Tw from "../../assets/twitter.png";
import Logo from "../../assets/logo.png";

const navLinks = [
  { label: "Home", href: "#landing", id: "landing" },
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const social = [
  {
    icon: Fb,
    href: "https://www.facebook.com/share/1CTevC5Tcw/?mibextid=wwXIfr",
    title: "Facebook",
  },
  {
    icon: Ins,
    href: "https://www.instagram.com/hamza_latif01",
    title: "Instagram",
  },
  {
    icon: Li,
    href: "https://www.linkedin.com/in/hamza-latif-692107223",
    title: "LinkedIn",
  },
  { icon: Tw, href: "https://x.com/humza2211?s=21", title: "Twitter" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const [active, setActive] = useState("landing");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ─── Desktop sidebar ─── */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-full flex-col justify-between py-12 z-50 transition-all duration-300"
        style={{
          width: collapsed ? "72px" : "180px",
          background: "rgba(6,6,15,0.88)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Toggle collapse button */}
        <button
          onClick={onToggle}
          className="absolute -right-3.5 top-10 w-7 h-7 rounded-full flex items-center justify-center bg-[#12121f] border border-white/10 text-gray-400 hover:text-white hover:border-violet-500/40 transition-all duration-200 z-10"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Logo */}
        <div className={collapsed ? "px-4" : "px-8"}>
          <button
            onClick={() => scrollTo("landing")}
            className="block mb-12 group text-left"
          >
            <img
              src={Logo.src}
              alt="Hamza Latif"
              className={`object-contain transition-all duration-300 ${collapsed ? "h-8 w-8" : "h-12 w-auto"}`}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </button>

          {/* Nav links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                title={collapsed ? link.label : undefined}
                className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left group ${
                  collapsed ? "px-3 justify-center" : "px-3"
                } ${
                  active === link.id
                    ? "text-white bg-white/6"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/4"
                }`}
              >
                <span
                  className={`rounded-full shrink-0 transition-all duration-300 ${
                    active === link.id
                      ? "bg-violet-400 w-4 h-1"
                      : "bg-gray-600 w-1 h-1 group-hover:bg-gray-400"
                  }`}
                />
                {!collapsed && (
                  <>
                    {link.label}
                    {active === link.id && (
                      <span className="ml-auto text-violet-400 text-xs">◆</span>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div
          className={`flex flex-col gap-4 ${collapsed ? "px-3 items-center" : "px-8"}`}
        >
          {!collapsed && (
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="w-full py-2.5 rounded-full text-center text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:opacity-90 transition-opacity"
            >
              Hire Me
            </a>
          )}
          <div
            className={`flex gap-2 ${collapsed ? "flex-col" : "justify-center"}`}
          >
            {social.map((s) => (
              <a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.title}
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center hover:border-violet-500/30 transition-all duration-200 group"
              >
                <img
                  src={s.icon.src}
                  alt={s.title}
                  className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
            ))}
          </div>
          {!collapsed && (
            <p className="text-gray-700 text-xs text-center">
              © {new Date().getFullYear()} Hamza Latif
            </p>
          )}
        </div>
      </aside>

      {/* ─── Offset pusher so main content shifts with sidebar ─── */}
      {/* handled via lg:pl-64 / lg:pl-[72px] in home.tsx — see note */}

      {/* ─── Mobile top bar ─── */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(6,6,15,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <button onClick={() => scrollTo("landing")}>
          <img
            src={Logo.src}
            alt="Hamza Latif"
            className="h-9 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ─── Mobile drawer ─── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 pt-16"
          style={{
            background: "rgba(6,6,15,0.98)",
            backdropFilter: "blur(30px)",
          }}
        >
          <nav className="flex flex-col gap-2 px-8 pt-10">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-3xl font-bold text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-200 py-3 border-b border-white/5"
              >
                <span className="text-violet-500 text-sm font-normal mr-3">
                  0{i + 1}.
                </span>
                {link.label}
              </button>
            ))}
          </nav>
          <div className="flex gap-4 px-8 mt-10">
            {social.map((s) => (
              <a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.title}
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center group"
              >
                <img
                  src={s.icon.src}
                  alt={s.title}
                  className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
