import Fb from "../../assets/facebook.png";
import Ins from "../../assets/instagram.png";
import Link from "../../assets/linkedin.png";
import X from "../../assets/twitter.png";
import Logo from "../../assets/logo.png";
import Container from "./container";

const social = [
  {
    id: 1,
    imgSrc1: Fb,
    alt: "Facebook",
    href: "https://www.facebook.com/share/1CTevC5Tcw/?mibextid=wwXIfr",
    label: "Facebook",
  },
  {
    id: 2,
    imgSrc1: Ins,
    alt: "Instagram",
    href: "https://www.instagram.com/hamza_latif01",
    label: "Instagram",
  },
  {
    id: 3,
    imgSrc1: Link,
    alt: "LinkedIn",
    href: "https://www.linkedin.com/in/hamza-latif-692107223",
    label: "LinkedIn",
  },
  {
    id: 4,
    imgSrc1: X,
    alt: "Twitter / X",
    href: "https://x.com/humza2211?s=21",
    label: "Twitter",
  },
];

const Footer = () => {
  return (
    <footer
      style={{ background: "#06060f" }}
      className="border-t border-white/5"
    >
      <Container>
        <div className="py-12 flex flex-col items-center gap-8">
          {/* Logo */}
          <a href="/" className="block hover:opacity-80 transition-opacity">
            <img
              src={Logo.src}
              alt="Hamza Latif"
              className="h-14 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>

          {/* Social links */}
          <div className="flex items-center gap-6">
            {social.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.alt}
                className="group w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:border-violet-500/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <img
                  src={
                    typeof item.imgSrc1 === "string"
                      ? item.imgSrc1
                      : item.imgSrc1.src
                  }
                  alt={item.alt}
                  className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
            ))}
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            {["Home", "About", "Work", "Services", "Contact"].map((page) => (
              <a
                key={page}
                href={`/${page.toLowerCase() === "home" ? "" : page.toLowerCase()}`}
                className="hover:text-gray-300 transition-colors"
              >
                {page}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

          {/* Copyright */}
          <p className="text-gray-600 text-xs text-center">
            © {new Date().getFullYear()} Hamza Latif. All Rights Reserved. Built
            with Next.js & Tailwind CSS.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
