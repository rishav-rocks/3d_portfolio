import "./AnimatedTitle.css";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current.querySelectorAll(".animated-word");

      gsap.to(words, {
        opacity: 1,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        ease: "power2.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "animated-title relative flex flex-col items-center",
        containerClass
      )}
    >
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex flex-wrap justify-center gap-2 px-6 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word inline-block"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;