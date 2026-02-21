import "./Features.css";
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

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
            <p className="relative z-20">Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= FEATURES SECTION ================= */

const Features = () => (
  <section className="features-section">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="section-subtitle">Into the Metagame Layer</p>
        <p className="section-description">
          Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of products converge into an interconnected overlay experience.
        </p>
      </div>

      <BentoTilt className="border-hsla mb-7 h-96 w-full md:h-[65vh]">
        <BentoCard
          src="/assets/videos/feature-1.mp4"
          title={
            <>
              radia<b>n</b>t
            </>
          }
          description="A cross-platform metagame app turning activities into a rewarding adventure."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-7 md:h-[135vh]">
        <BentoTilt className="bento-tilt_1 h-96 md:h-auto row-span-1 md:row-span-2">
          <BentoCard
            src="/assets/videos/feature-2.mp4"
            title={
              <>
                zig<b>m</b>a
              </>
            }
            description="An anime-inspired NFT collection primed for expansion."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 h-96 md:h-auto row-span-1">
          <BentoCard
            src="/assets/videos/feature-3.mp4"
            title={
              <>
                n<b>e</b>xus
              </>
            }
            description="A gamified social hub for Web3 communities."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 h-96 md:h-auto">
          <BentoCard
            src="/assets/videos/feature-4.mp4"
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="A cross-world AI agent enhancing gameplay."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 h-60 md:h-auto">
          <div className="more-coming">
            <h1 className="bento-title special-font text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
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
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
