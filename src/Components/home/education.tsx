import Container from "../common/container";
import ScrollReveal from "../common/scrollReveal";

const education = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    short: "BSCS",
    institution: "University of Central Punjab",
    period: "2020 – 2024",
    icon: "🎓",
  },
  {
    id: 2,
    degree: "Intermediate",
    short: "FSC ",
    institution: "Punjab Group of Colleges",
    period: "2017 – 2019",
    icon: "📚",
  },
  {
    id: 3,
    degree: "Matriculation",
    short: "SSC",
    institution: "Allied School System",
    period: "2014 – 2016",
    icon: "🏫",
  },
];

const Education = () => {
  return (
    <section
      id="education"
      style={{ background: "#06060f" }}
      className="min-h-screen flex items-center border-y border-white/4"
    >
      <Container className="py-20 w-full">
        <ScrollReveal>
          <p className="text-violet-400 tracking-[0.3em] uppercase text-xs font-semibold mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-violet-500" />
            Academic Background
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-16">
            My <span className="gradient-text">Education</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-cyan-500/20 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-8">
            {education.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 120} direction="up">
                <div className="group relative sm:pl-20">
                  {/* timeline dot */}
                  <div className="absolute left-[18px] top-8 w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-[0_0_10px_rgba(124,58,237,0.6)] hidden sm:block" />

                  <div className="glass-card p-8 rounded-2xl hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 cursor-default">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <span className="text-3xl">{item.icon}</span>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="text-white font-bold text-xl leading-tight">
                            {item.degree}
                          </h3>
                          <span className="px-3 py-0.5 text-xs font-medium rounded-full border border-violet-500/20 bg-violet-500/6 text-violet-300">
                            {item.short}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm font-medium mb-1">
                          {item.institution}
                        </p>
                        <p className="text-gray-600 text-xs tracking-widest uppercase font-medium">
                          {item.period}
                        </p>
                      </div>

                      <span className="text-gray-700 text-sm font-mono hidden sm:block">
                        {item.period}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Education;
