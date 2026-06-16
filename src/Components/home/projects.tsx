"use client";

import { useProjects } from "../pages/hooks/useProjects";
import Container from "../common/container";
import ScrollReveal from "../common/scrollReveal";
import { ExternalLink, ArrowRight } from "lucide-react";
import CloudinaryImage from "../common/CloudinaryImage";

const MyWork = () => {
  const { data: projects, isLoading, isError } = useProjects();

  return (
    <section id="work" style={{ background: "#06060f" }} className="min-h-screen flex items-center">
      <Container className="py-20 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
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
          <ScrollReveal delay={200} direction="right">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium group"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl glass-card animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-400 py-20">Failed to load projects.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 80}>
                <a
                  href={project.link}
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl overflow-hidden glass-card hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-2 block"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <CloudinaryImage
                      src={project.image || ""}
                      alt={project.title}
                      width={800}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
                      <span className="text-white font-semibold">{project.title}</span>
                      <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <p className="font-medium text-gray-300 text-sm group-hover:text-white transition-colors">
                      {project.title}
                    </p>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-violet-400 transition-colors" />
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
