"use client";

import { ChevronUp, Mail, Phone, Send } from "lucide-react";
import Container from "../common/container";
import ScrollReveal from "../common/scrollReveal";
import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 2 * window.innerHeight);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setSending(true);

    emailjs
      .sendForm("service_p92es8s", "template_zirlhfi", form.current, "MZOTysJN7EkXt-w54")
      .then(
        () => { setStatus("success"); form.current?.reset(); setSending(false); },
        (err) => { console.error(err); setStatus("error"); setSending(false); }
      );
  };

  return (
    <section id="contact" style={{ background: "#06060f" }} className="min-h-screen flex items-center">
      <Container className="py-20 w-full">
        {/* Header */}
        <ScrollReveal>
          <p className="text-violet-400 tracking-[0.3em] uppercase text-xs font-semibold mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-violet-500" />
            Let's Talk
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-16">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <ScrollReveal delay={200} direction="left">
            <div>
              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                Have a question or want to work together? Drop me a message
                and I'll get back to you as soon as possible.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="tel:+923330683570"
                  className="group flex items-center gap-5 p-5 rounded-2xl glass-card hover:border-violet-500/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-shadow shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-white font-medium">0333-0683570</p>
                  </div>
                </a>

                <a
                  href="mailto:hamza.slysol@gmail.com"
                  className="group flex items-center gap-5 p-5 rounded-2xl glass-card hover:border-cyan-500/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-shadow shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-white font-medium">hamza.slysol@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={300} direction="right">
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              {[
                { label: "Name", name: "user_name", type: "text", placeholder: "Your full name" },
                { label: "Email", name: "user_email", type: "email", placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-600 text-xs uppercase tracking-widest mb-2 font-medium">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    className="input-glow w-full px-5 py-3.5 rounded-xl border border-white/6 text-white placeholder-gray-700 text-sm transition-all duration-200 focus:border-violet-500/50"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  />
                </div>
              ))}

              <div>
                <label className="block text-gray-600 text-xs uppercase tracking-widest mb-2 font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  className="input-glow w-full px-5 py-3.5 rounded-xl border border-white/6 text-white placeholder-gray-700 text-sm resize-none transition-all duration-200 focus:border-violet-500/50"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                />
              </div>

              <p className="text-gray-700 text-xs">
                All fields are required. By submitting you agree to our{" "}
                <span className="underline cursor-pointer hover:text-gray-500 transition-colors">Terms</span>{" "}
                and{" "}
                <span className="underline cursor-pointer hover:text-gray-500 transition-colors">Privacy Policy</span>.
              </p>

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="text-emerald-400 text-center text-sm font-medium">
                  Message sent! I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-center text-sm font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>

      </Container>

      {/* Scroll to top */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] hover:scale-110 transition-all duration-300"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </section>
  );
};

export default Contact;
