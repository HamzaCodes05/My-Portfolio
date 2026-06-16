"use client";

import { useEffect, useRef } from "react";

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }

      rafId = requestAnimationFrame(animateRing);
    };

    const onMouseEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "52px";
        ringRef.current.style.height = "52px";
        ringRef.current.style.borderColor = "rgba(124,58,237,0.8)";
        ringRef.current.style.transform = `translate(${ringX - 26}px, ${ringY - 26}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = "0";
      }
    };

    const onMouseLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "40px";
        ringRef.current.style.height = "40px";
        ringRef.current.style.borderColor = "rgba(124,58,237,0.5)";
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = "1";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animateRing);

    const addLinkListeners = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    addLinkListeners();
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-violet-400 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-violet-500/50 pointer-events-none z-[9999] transition-[width,height,border-color] duration-300"
        style={{ willChange: "transform" }}
      />
    </>
  );
};

export default Cursor;
