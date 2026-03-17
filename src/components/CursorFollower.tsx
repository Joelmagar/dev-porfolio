import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const followerRef = useRef(null);
  const mouseDotRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const speed = 0.15;

  const animate = () => {
    pos.current.x += (mouse.current.x - pos.current.x) * speed;
    pos.current.y += (mouse.current.y - pos.current.y) * speed;

    if (followerRef.current) {
      followerRef.current.style.left = pos.current.x - 20 + "px";
      followerRef.current.style.top = pos.current.y - 20 + "px";
      mouseDotRef.current.style.left = mouse.current.x - 3 + "px";
      mouseDotRef.current.style.top = mouse.current.y - 3 + "px";
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();
    const hoverElements = document.querySelectorAll(
      "a, button, .project-card, .filter-btn",
    );
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        followerRef.current.classList.add(
          "h-20",
          "w-20",
          "duration-150",
          "-translate-x-[20px]",
          "-translate-y-[20px]",
        );
      });
      el.addEventListener("mouseleave", () =>
        followerRef.current.classList.remove(
          "h-20",
          "w-20",
          "duration-150",
          "-translate-x-[20px]",
          "-translate-y-[20px]",
        ),
      );
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={followerRef}
        className="fixed h-10 w-10 z-50  rounded-full border-2  shadow-primary/30 shadow-[0px_0px_15px_5px]   border-primary  pointer-events-none"
      ></div>
      {/* <div className="  h-10 w-10 flex justify-center items-center rounded-full    translate   "></div> */}
      <div
        ref={mouseDotRef}
        className="bg-primary fixed z-50 pointer-events-none h-2 w-2 rounded-full  "
      ></div>
    </>
  );
}
