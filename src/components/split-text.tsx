"use client";

import { motion } from "motion/react";

interface SplitTextProps {
  text: string;
  isArabic?: boolean;
  className?: string;
  delay?: number;
  charDelay?: number;
  wordDelay?: number;
}

export function SplitText({
  text,
  isArabic = false,
  className = "",
  delay = 0,
  charDelay = 0.035,
  wordDelay = 0.12,
}: SplitTextProps) {
  // Arabic: Split by WORD to keep cursive glyph ligatures completely connected
  if (isArabic) {
    const words = text.split(" ");
    return (
      <span className={`inline-block ${className}`} aria-label={text}>
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className="inline-block overflow-hidden py-1.5 me-2.5 last:me-0 align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + wordIndex * wordDelay,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  // English: Split by CHARACTER for the staggered wave reveal
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wordIndex) => {
        const chars = word.split("");
        return (
          <span
            key={wordIndex}
            className="inline-block whitespace-nowrap me-3 sm:me-4 last:me-0 align-bottom"
          >
            {chars.map((char) => {
              const charIdx = globalCharIndex++;
              return (
                <span
                  key={charIdx}
                  className="inline-block overflow-hidden py-1 align-bottom"
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: "115%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                      delay: delay + charIdx * charDelay,
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
