"use client";

import { useProjects } from "../pages/hooks/useProjects";
import Container from "../common/container";
import ScrollReveal from "../common/scrollReveal";
import { ArrowUpRight } from "lucide-react";
import CloudinaryImage from "../common/CloudinaryImage";

const ensureUrl = (url: string) => {
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const MyWork = () => {
  const { data: projects, isLoading, isError } = useProjects();

  return (
    <section id="work" style={{ background: "#06060f" }} className="min-h-screen flex items-center">
      <Container className="py-24 w-full">

        {/* Header */}
        <div className="mb-20">
          <ScrollReveal>
            <p className="text-violet-400 tracking-[0.3em] uppercase text-xs font-semibold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-violet-500" />
              Portfolio
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              My <span className="gradient-text">Projects</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Loading skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.03)", height: "260px" }} />
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-400 py-20">Failed to load projects.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 80}>
                <a
                  href={ensureUrl(project.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 20px 60px rgba(124,58,237,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <CloudinaryImage
                      src={project.image || ""}
                      alt={project.title}
                      width={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(6,6,15,0.4)" }} />
                    {/* Arrow badge */}
                    <div
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                      style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)", boxShadow: "0 0 16px rgba(124,58,237,0.6)" }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="px-4 py-3 flex items-center justify-between gap-2">
                    <p className="text-gray-300 font-semibold text-sm group-hover:text-white transition-colors duration-200 truncate">
                      {project.title}
                    </p>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-gray-600 group-hover:text-violet-400 transition-colors duration-200" />
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default MyWork;
