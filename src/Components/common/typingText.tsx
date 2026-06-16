"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  className?: string;
}

const TypingText = ({ words, speed = 80, deleteSpeed = 50, pause = 2000, className = "" }: TypingTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
        return () => clearTimeout(t);
      } else {
        setWordIndex((i) => i + 1);
        setTyping(true);
      }
    }
  }, [displayed, typing, wordIndex, words, speed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {displayed}
      <span
        className="inline-block w-0.5 h-[1em] align-middle ml-1 bg-violet-400"
        style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}
      />
    </span>
  );
};

export default TypingText;
