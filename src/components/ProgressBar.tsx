import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function ProgressBar() {
  const containerRef = useRef(null);
  useGSAP(() => {
    gsap.to(".progressbar", {
      scrollTrigger: {
        // trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        // markers: true,
        scrub: true,
      },
      width: "100%",
      borderRadius: "0",
      // duration: 0.1,
    });
  });

  return (
    <div ref={containerRef} className="fixed bottom-0 z-50 w-full h-2 ">
      <div className="bg-primary h-full w-0 progressbar rounded-r-md"></div>
    </div>
  );
}
