import Container from "../common/container";
import ScrollReveal from "../common/scrollReveal";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    num: "01",
    title: "Branding",
    description: "Distinctive identities that resonate — logos, color systems, and brand guidelines that make you memorable.",
    accent: "from-violet-600 to-purple-600",
    border: "hover:border-violet-500/30",
  },
  {
    id: 2,
    num: "02",
    title: "Web Design & Dev",
    description: "Modern, responsive interfaces built with React and Next.js. Pixel-perfect design with flawless performance.",
    accent: "from-indigo-600 to-blue-500",
    border: "hover:border-indigo-500/30",
  },
  {
    id: 3,
    num: "03",
    title: "Digital Marketing",
    description: "Strategic digital campaigns that drive growth — social, SEO, and content that converts visitors into clients.",
    accent: "from-cyan-600 to-teal-500",
    border: "hover:border-cyan-500/30",
  },
  {
    id: 4,
    num: "04",
    title: "Illustration",
    description: "Creative artwork and visual storytelling. From digital illustration to graphic design that stands out.",
    accent: "from-pink-600 to-rose-500",
    border: "hover:border-pink-500/30",
  },
];

const Services = () => {
  return (
    <section id="services" style={{ background: "#06060f" }} className="min-h-screen flex items-center">
      <Container className="py-20 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <ScrollReveal>
              <p className="text-violet-400 tracking-[0.3em] uppercase text-xs font-semibold mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-violet-500" />
                What I Do
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                My <span className="gradient-text">Services</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200} direction="right">
            <button
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium group"
            >
              See All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>
        </div>

        {/* Service list — horizontal dividers style */}
        <div className="flex flex-col">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 80}>
              <div
                className={`group flex items-start justify-between gap-6 py-8 border-b border-white/5 hover:border-white/10 transition-all duration-300 cursor-default ${service.border}`}
              >
                <div className="flex items-start gap-6 flex-1">
                  <span className={`text-xs font-bold bg-gradient-to-r ${service.accent} bg-clip-text text-transparent pt-1 w-8 shrink-0`}>
                    {service.num}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 group-hover:text-violet-200 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-200 mt-1 shrink-0" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={400}>
          <div
            className="mt-16 relative rounded-3xl p-px overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/40 via-indigo-500/20 to-cyan-500/40" />
            <div
              className="relative rounded-3xl p-10 lg:p-14 flex flex-col sm:flex-row items-center justify-between gap-6"
              style={{ background: "#0a0a18" }}
            >
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Ready to build something?</p>
                <h3 className="text-2xl lg:text-3xl font-black text-white">
                  Have a project in mind?{" "}
                  <span className="gradient-text">Let's bring it to life.</span>
                </h3>
              </div>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="shrink-0 flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:opacity-90 transition-all duration-300"
              >
                Get a Proposal
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </Container>
    </section>
  );
};

export default Services;
