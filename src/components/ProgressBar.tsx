import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function ProgressBar() {
  const containerRef = useRef(null);
  const bar = useRef(null);
  useGSAP(() => {
    ScrollTrigger.create({
      start: -1,
      end: "max",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(bar.current, {
          scaleX: self.progress,
          transformOrigin: "left",
        });
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-0 z-50 w-full h-2 ">
      <div
        ref={bar}
        className="bg-primary h-full  progressbar rounded-r-md"
      ></div>
    </div>
  );
}
