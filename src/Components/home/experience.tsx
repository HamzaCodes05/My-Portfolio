import Container from "../common/container";
import ScrollReveal from "../common/scrollReveal";

const exp = [
  { id: 1, heading: "1+", detail: "Years of Experience", icon: "⚡" },
  // { id: 2, heading: "75+", detail: "Satisfied Customers", icon: "🤝" },
  { id: 3, heading: "5+", detail: "Projects Completed", icon: "🚀" },
  { id: 4, heading: "4+", detail: "Years of Teaching", icon: "🎓" },
];

const Experience = () => {
  return (
    <section
      id="experience"
      style={{ background: "#06060f" }}
      className="min-h-screen flex items-center border-y border-white/4"
    >
      <Container className="py-20 w-full">
        <ScrollReveal>
          <p className="text-center text-gray-600 tracking-[0.3em] uppercase text-xs font-medium mb-20">
            my work isn't just about creating — it's about making a difference
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {exp.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 100} direction="up">
              <div className="group text-center p-8 rounded-2xl glass-card hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-2 cursor-default">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h2 className="font-black text-5xl lg:text-6xl gradient-text mb-3">
                  {item.heading}
                </h2>
                <p className="text-gray-500 tracking-wider uppercase text-xs font-medium leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Experience;
