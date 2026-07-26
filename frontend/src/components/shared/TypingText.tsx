"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
  words: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export default function TypingText({
  words,
  className = "",
  speed = 100,
  deleteSpeed = 60,
  pauseDuration = 2000,
}: TypingTextProps) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setText(currentWord.substring(0, text.length - 1));
        } else {
          setText(currentWord.substring(0, text.length + 1));
        }

        if (!isDeleting && text === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        } else if (isDeleting && text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timer);
  }, [text, wordIndex, isDeleting, words, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {text}
      <span className="typing-cursor" />
    </span>
  );
}
