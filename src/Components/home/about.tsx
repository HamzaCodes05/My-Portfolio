import Avatar from "../../assets/avatar.png";
import Container from "../common/container";
import ScrollReveal from "../common/scrollReveal";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "JavaScript",
  "Figma",
  "HTML & CSS",
  "Bootstrap",
  "React Native",
];

const About = () => {
  return (
    <section
      id="about"
      style={{ background: "#06060f" }}
      className="min-h-screen flex items-center"
    >
      <Container className="py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div>
            <ScrollReveal delay={0}>
              <p className="text-violet-400 tracking-[0.3em] uppercase text-xs font-semibold mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-violet-500" />
                Who I Am
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
                About <span className="gradient-text">Me</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                I'm a passionate web developer focused on building modern,
                responsive, and user-friendly websites. I turn complex problems
                into clean, scalable solutions using React, TypeScript, and
                Tailwind CSS.
              </p>
              <p className="text-gray-500 leading-relaxed mb-10">
                Beyond coding, I love graphic design and visual storytelling —
                combining technical skill with creative vision to deliver
                digital experiences that truly stand out.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mb-10">
                <p className="text-gray-600 text-xs uppercase tracking-widest mb-4 font-medium">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-1.5 text-xs font-medium rounded-full border border-violet-500/20 bg-violet-500/6 text-violet-300 hover:border-violet-400/40 hover:bg-violet-500/12 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("work")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_25px_rgba(124,58,237,0.3)]"
                >
                  See My Work
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Image */}
          <ScrollReveal delay={200} direction="right">
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-6 bg-gradient-to-r from-violet-600/15 to-cyan-500/15 rounded-3xl blur-3xl group-hover:blur-[50px] transition-all duration-700" />
                <div className="relative gradient-border">
                  <img
                    src={Avatar.src}
                    alt="Portrait of Hamza Latif"
                    className="relative max-w-xs lg:max-w-sm w-full rounded-2xl object-cover"
                    style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.6)" }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};

export default About;
