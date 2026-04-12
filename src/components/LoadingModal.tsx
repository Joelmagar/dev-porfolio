import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

export default function LoadingModal({ onComplete }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(
      textRef.current,
      {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3",
    )
      .to(barRef.current, {
        width: "100%",
        duration: 2,
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 1,
        onComplete,
      });
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] backdrop-blur-md flex flex-col items-center text-primary justify-center bg-black "
    >
      <div className="mb-8 flex items-center gap-3">
        <span ref={textRef} className="font-heading  text-4xl font-bold">
          Loading...
        </span>
      </div>

      <div className="bg-muted/20 h-1 w-48 overflow-hidden rounded-full">
        <div
          ref={barRef}
          className="h-full rounded-full bg-primary"
          style={{ width: 0 }}
        />
      </div>
      <span className="mt-3 font-mono text-sm font-bold text-primary">
        {progress}%
      </span>
    </div>
  );
}
