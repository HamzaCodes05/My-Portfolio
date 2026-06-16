"use client";

import Img from "../../assets/image.png";
import { ArrowDown } from "lucide-react";
import TypingText from "../common/typingText";
import ScrollReveal from "../common/scrollReveal";

const roles = ["Software Engineer", "Bussiness Developer", "React Engineer"];

const Landing = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="landing"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #06060f 0%, #0a0a18 60%, #06060f 100%)",
        cursor: "none",
      }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-violet-700/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Profile image — right side, prominent */}
      <div className="absolute right-0 top-0 h-full w-[45%] pointer-events-none select-none hidden lg:block">
        <img
          src={Img.src}
          alt="Hamza Latif"
          className="w-full h-full object-cover object-top"
          style={{
            maskImage:
              "linear-gradient(to left, rgba(0,0,0,0.85) 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, rgba(0,0,0,0.85) 40%, transparent 100%)",
            opacity: 0.75,
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #06060f 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 max-w-4xl w-full pt-20 lg:pt-0">
        <ScrollReveal delay={100}>
          <h1 className="font-black leading-[0.9] tracking-tighter mb-6">
            <span
              className="block text-white"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              Hamza
            </span>
            <span
              className="block gradient-text"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              Latif
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-gray-400 text-xl md:text-2xl font-light mb-10 h-9">
            <TypingText words={roles} />
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="text-gray-500 text-base leading-relaxed max-w-md mb-12">
            I craft modern web experiences and stunning visuals that help
            businesses stand out and grow online.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:shadow-[0_0_60px_rgba(124,58,237,0.55)] transition-all duration-300"
            >
              View My Work
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/12 text-gray-300 font-semibold text-sm hover:border-white/25 hover:text-white hover:bg-white/4 transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>
        </ScrollReveal>

        {/* Scroll indicator */}
        <ScrollReveal delay={600}>
          <button
            onClick={scrollToAbout}
            className="mt-20 flex items-center gap-3 text-gray-600 hover:text-gray-300 transition-colors group"
          >
            <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-violet-400" />
            <span className="text-xs tracking-[0.2em] uppercase">
              Scroll down
            </span>
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Landing;
