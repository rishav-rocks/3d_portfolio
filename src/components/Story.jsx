import "./Story.css";
import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const applyTilt = (x, y) => {
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = x - rect.left;
    const yPos = y - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove = (e) => applyTilt(e.clientX, e.clientY);

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touch) applyTilt(touch.clientX, touch.clientY);
  };

  const resetTilt = () => {
    const element = frameRef.current;
    if (!element) return;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  return (
    <section
      id="story"
      className="min-h-dvh w-full overflow-hidden bg-black text-blue-50"
    >
      <div className="flex flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </p>

        <div className="relative w-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={resetTilt}
                  onMouseUp={resetTilt}
                  onMouseEnter={resetTilt}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={resetTilt}
                  src="/assets/img/entrance.webp"
                  alt="entrance"
                  className="story-img"
                />
              </div>
            </div>

            {/* SVG filter for organic rounded edges */}
            <svg className="absolute w-0 h-0">
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="relative z-20 -mt-32 flex w-full justify-center px-4 md:-mt-64 md:me-44 md:justify-end">
          <div className="flex flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web md:text-start text-violet-300">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            <Button
              id="realm-btn"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloatingImage;
