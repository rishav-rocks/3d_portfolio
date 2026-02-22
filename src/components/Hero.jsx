import "./Hero.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState, useCallback } from "react";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState("");

  const totalVideos = 4;
  const bgVideoRef = useRef(null);

  const videoOrder = [1, 3, 2, 4];

  const getVideoSrc = (index) => `/assets/videos/vid${index}.webm`;

  const getStoryText = (index) => {
    switch (index) {
      case 1:
        return {
          heading: "Self-Taught",
          subtext:
            "Started from zero, fueled by curiosity and late-night coffee.",
        };
      case 3:
        return {
          heading: "Creative Logic",
          subtext:
            "Turning complex problems into elegant, interactive solutions.",
        };
      case 2:
        return {
          heading: "Full Stack",
          subtext: "Building the engine and the exterior with equal passion.",
        };
      case 4:
        return {
          heading: "Endless Drive",
          subtext: "Always learning, always building, always pushing limits.",
        };
      default:
        return {
          heading: "I Create",
          subtext:
            "Self-Taught Developer & Creative Coder Building digital experiences that inspire",
        };
    }
  };

  const currentStory = getStoryText(videoOrder[currentIndex - 1]);

  // Advance to next story (lightweight — just swap src, no GSAP zoom)
  const advanceStory = useCallback(() => {
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
  }, []);

  // Handle initial load — hide loader once first video can play
  const handleCanPlay = useCallback(() => {
    setLoading(false);
  }, []);

  // SWAP VIDEO SRC when currentIndex changes (instead of 3 video elements)
  useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;

    const newSrc = getVideoSrc(videoOrder[currentIndex - 1]);

    // Only swap if src actually changed
    if (video.src && video.src.endsWith(newSrc)) return;

    // Fade out, swap, fade in
    gsap.to(video, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        video.src = newSrc;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silently handle — autoplay policy or load race
          });
        }
        gsap.to(video, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      },
    });
  }, [currentIndex]);

  // CINEMATIC ENTRANCE — elements fly in from outside
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(".hero-intro-label", {
      x: -150,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
    })
      .from(
        ".terminal-card",
        {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        ".hero-cta-btn",
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2",
      );
  });

  // TEXT TRANSITION — animate terminal content when story changes
  useGSAP(
    () => {
      gsap.from(".terminal-heading", {
        opacity: 0,
        x: -15,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [currentIndex] },
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

  // TYPING EFFECT
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const fullText = currentStory.subtext;

    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [currentIndex, currentStory.subtext]);

  // AUTOPLAY STORY — advances every 8 seconds
  useEffect(() => {
    const autoplayInterval = setInterval(advanceStory, 8000);
    return () => clearInterval(autoplayInterval);
  }, [advanceStory]);

  // Story progress indicators
  const storyLabels = ["01", "02", "03", "04"];

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
      <div id="video-frame" className="relative h-full w-full overflow-hidden">
        {/* SINGLE Background Video — swap src instead of multiple elements */}
        <video
          ref={bgVideoRef}
          src={getVideoSrc(videoOrder[0])}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 size-full object-cover"
          onCanPlayThrough={handleCanPlay}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* ===== HERO CONTENT ===== */}
        <div className="absolute inset-0 z-40 flex flex-col justify-center px-6 sm:px-12 md:px-20">
          {/* Intro Label */}
          <p className="hero-intro-label hero-heading hero-gradient-text !text-3xl sm:!text-4xl md:!text-5xl !font-black uppercase tracking-[0.2em] mb-6">
            Hii I'm
          </p>

          {/* Terminal/Code Editor Card */}
          <div className="terminal-card">
            {/* Terminal Title Bar */}
            <div className="terminal-titlebar">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="terminal-title">rishav_journey.sh</span>
              <div className="terminal-dots" style={{ visibility: "hidden" }}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body">
              {/* Story Progress */}
              <div className="story-progress">
                {storyLabels.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i + 1)}
                    className={`story-progress-dot ${
                      currentIndex === i + 1 ? "active" : ""
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Current Story */}
              <div className="terminal-content">
                <span className="terminal-prompt">$</span>
                <span className="terminal-heading">{currentStory.heading}</span>
              </div>
              <div className="terminal-content terminal-output">
                <span className="terminal-prompt output-arrow">→</span>
                <span className="terminal-typed-text">
                  {displayedText}
                  <span className="typing-cursor">|</span>
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hero-cta-btn mt-8">
            <Button
              id="view-projects"
              title="View Journey"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Bottom name — visible behind clip-path on scroll */}
      <h1 className="hero-heading hero-gradient-text absolute bottom-5 right-5">
        RISH<b>A</b>V
      </h1>
    </section>
  );
};

export default Hero;
