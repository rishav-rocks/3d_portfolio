import "./Hero.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => setLoadedVideos((prev) => prev + 1);

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) setLoading(false);
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
  };

  // CLICK TRANSITION — zoom the next video from mini to full screen
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });

        gsap.from("#current-video", {
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true },
  );

  // SCROLL ANIMATION — clip path shrinks as user scrolls
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
    });

    gsap.to("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `/assets/videos/hero-${index}.mp4`;

  return (
    <section
      id="hero"
      className="relative h-dvh w-full overflow-hidden bg-blue-50"
    >
      {/* Loader */}
      {loading && (
        <div className="loader">
          <div className="three-body">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {/* Video Frame */}
      <div
        id="video-frame"
        className="relative h-full w-full overflow-hidden rounded-lg"
      >
        {/* Background Video */}
        <video
          src={getVideoSrc(currentIndex)}
          autoPlay
          loop
          muted
          className="absolute inset-0 size-full object-cover"
          onLoadedData={handleVideoLoad}
        />

        {/* Expanding Next Video — loads the NEXT video index */}
        <video
          ref={nextVdRef}
          src={getVideoSrc((currentIndex % totalVideos) + 1)}
          loop
          muted
          id="next-video"
          className="absolute-center z-10 invisible"
          style={{ width: "260px", height: "260px", objectFit: "cover" }}
          onLoadedData={handleVideoLoad}
        />

        {/* Mini Preview — invisible by default, shows on hover */}
        <div
          className="mini-preview-wrapper"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <VideoPreview>
            <div onClick={handleMiniVdClick} className="size-full">
              <video
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                id="current-video"
                className={`size-full scale-150 object-cover transition-opacity duration-500 ${
                  isHovering ? "opacity-100" : "opacity-0"
                }`}
                onLoadedData={handleVideoLoad}
              />
            </div>
          </VideoPreview>
        </div>

        {/* Text Content */}
        <div className="absolute left-[5%] top-[20%] z-40 text-blue-75">
          <h1 className="hero-heading hero-gradient-text">
            I cr<b>e</b>ate
          </h1>
          <p className="mt-4 mb-6 max-w-md font-robert-regular leading-relaxed">
            Full Stack Developer & Creative Coder <br />
            Building digital experiences that inspire
          </p>
          <Button
            id="view-projects"
            title="View Projects"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-yellow-300 flex-center gap-1"
          />
        </div>
      </div>

      {/* Bottom heading — outside video-frame so it's visible behind the clip-path on scroll */}
      <h1 className="hero-heading hero-gradient-text absolute bottom-5 right-5">
        RISH<b>A</b>V
      </h1>
    </section>
  );
};

export default Hero;
