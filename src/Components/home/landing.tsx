"use client";

import { ArrowDown } from "lucide-react";
import TypingText from "../common/typingText";
import ScrollReveal from "../common/scrollReveal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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

      {/* Lottie — full page background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="w-full h-full opacity-25">
          <DotLottieReact
            src="https://lottie.host/87bc7022-8694-4253-8a32-65e15ab6bb41/AbAYef4B9F.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 md:px-16 pt-20 lg:pt-0">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <ScrollReveal delay={100}>
            <h1 className="font-black leading-[0.9] tracking-tighter mb-6">
              <span
                className="block text-white"
                style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
              >
                Hamza
              </span>
              <span
                className="block gradient-text"
                style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
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
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/12 text-gray-300 font-semibold text-sm hover:border-violet-500/50 hover:text-white hover:bg-violet-500/8 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                Resume
              </a>
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

      </div>
    </section>
  );
};

export default Landing;
