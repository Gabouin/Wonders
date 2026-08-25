/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const SENTENCES = [
  "Every project tells a story, they shouldn't be judged by hours.",
  "Introducing Wonders!!!",
  "Where every project is a wonder and not a way to farm hours!!",
];

function Sentence({
  text,
  segStart,
  segEnd,
  scrollYProgress,
}: {
  text: string;
  segStart: number;
  segEnd: number;
  scrollYProgress: MotionValue<number>;
}) {
  const words = text.split(" ");
  const duration = segEnd - segStart;

  const buildEnd = segStart + duration * 0.7;

  const holdEnd = segStart + duration * 0.9;

  const lineX = useTransform(scrollYProgress, [holdEnd, segEnd], [0, -150]);
  const lineOpacity = useTransform(
    scrollYProgress,
    [segStart, buildEnd, holdEnd, segEnd],
    [1, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ x: lineX, opacity: lineOpacity }}
      className="absolute flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 max-w-4xl"
    >
      {words.map((word, i) => {
        const wStart = segStart + (buildEnd - segStart) * (i / words.length);
        const wEnd =
          segStart + (buildEnd - segStart) * ((i + 1) / words.length);

        const opacity = useTransform(scrollYProgress, [wStart, wEnd], [0, 1]);
        const x = useTransform(scrollYProgress, [wStart, wEnd], [40, 0]);

        return (
          <motion.span
            key={i}
            style={{ opacity, x }}
            className="text-2xl md:text-4xl font-poppins text-[#80BF8D] font-medium whitespace-nowrap"
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const segments = SENTENCES.length;

  return (
    <div ref={containerRef} className="relative w-full h-[700vh]">
      <div className="sticky top-0 w-full min-h-[100svh] bg-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/bg-effect-2.png')" }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center z-10"
          style={{ backgroundImage: "url('/bg-part-2.png')" }}
        />
        {/* <div
          className="absolute inset-0 bg-cover bg-center z-10"
          style={{ backgroundImage: "url('/bg-part-3.png')" }}
        /> */}

        <div className="relative z-20 flex items-center justify-center min-h-[115vh] overflow-hidden">
          {SENTENCES.map((text, i) => (
            <Sentence
              key={i}
              text={text}
              segStart={i / segments}
              segEnd={(i + 1) / segments}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
