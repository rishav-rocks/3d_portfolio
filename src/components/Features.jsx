import "./Features.css";
import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

/* ================= BENTO TILT ================= */

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const applyTilt = (clientX, clientY) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (clientX - left) / width;
    const relativeY = (clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95,.95,.95)`,
    );
  };

  const handleMouseMove = (e) => applyTilt(e.clientX, e.clientY);

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touch) applyTilt(touch.clientX, touch.clientY);
  };

  const resetTilt = () => {
    setTransformStyle(
      "perspective(700px) rotateX(0) rotateY(0) scale3d(1,1,1)",
    );
  };

  return (
    <div
      ref={itemRef}
      className={`bento-tilt ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTilt}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

/* ================= BENTO CARD ================= */

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div className="relative size-full overflow-hidden rounded-md">
      <video
        src={src}
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-6 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base opacity-80">
              {description}
            </p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHoverOpacity(1)}
            onMouseLeave={() => setHoverOpacity(0)}
            className="coming-soon-btn"
          >
            <div
              className="hover-gradient"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(120px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, transparent 60%)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">View Live</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= FEATURES SECTION ================= */

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll(".bento-tilt");
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        rotateX: 8,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="features-section">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="section-subtitle">Featured Projects</p>
          <p className="section-description">
            A curated collection of projects that showcase my passion for
            interactive design, creative coding, and meaningful user
            experiences.
          </p>
        </div>

        <BentoTilt className="border-hsla mb-7 h-96 w-full md:h-[65vh]">
          <BentoCard
            src="/assets/videos/feature-1.mp4"
            title={
              <>
                portf<b>o</b>lio
              </>
            }
            description="This stunning 3D portfolio built with React, GSAP, and Tailwind — featuring scroll-driven animations and interactive effects."
            isComingSoon
          />
        </BentoTilt>

        <div className="grid w-full grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-7 md:h-[135vh]">
          <BentoTilt className="bento-tilt_1 h-96 md:h-auto row-span-1 md:row-span-2">
            <BentoCard
              src="/assets/videos/apps.webm"
              title={
                <>
                  ap<b>p</b>s
                </>
              }
              description="Modern full-stack web applications with seamless user experiences and real-time features."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 h-96 md:h-auto row-span-1">
            <BentoCard
              src="/assets/videos/design.webm"
              title={
                <>
                  d<b>e</b>sign
                </>
              }
              description="UI/UX designs that blend aesthetics with functionality for memorable experiences."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 h-96 md:h-auto">
            <BentoCard
              src="/assets/videos/tools.webm"
              title={
                <>
                  t<b>o</b>ols
                </>
              }
              description="Developer tools and open-source contributions that solve real problems."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 h-60 md:h-auto">
            <div className="more-coming">
              <h1 className="bento-title special-font text-black">
                M<b>o</b>re pr<b>o</b>jects s<b>o</b>on.
              </h1>
              <TiLocationArrow className="big-arrow" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 h-60 md:h-auto">
            <video
              src="/assets/videos/feature-5.mp4"
              loop
              muted
              autoPlay
              playsInline
              preload="metadata"
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
