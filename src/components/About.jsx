import "./About.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });
  });

  return (
    <section id="about" className="w-full min-h-screen bg-blue-50 text-black">
      {/* Top Content */}
      <div className="relative mt-36 mb-8 flex flex-col items-center gap-5 px-4 text-center">
        <p className="font-general text-xs uppercase tracking-widest">
          About Me
        </p>

        <AnimatedTitle
          title="Passi<b>o</b>nate about <br /> crafting digital <br /> exp<b>e</b>riences"
          containerClass="mt-5 text-black"
        />

        <div className="about-subtext text-center">
          <p className="mb-2">
            I'm a Full Stack Developer who loves building immersive web
            experiences
          </p>
          <p className="text-gray-500">
            With a passion for modern frameworks, interactive animations, and
            clean code — I bring creative ideas to life through technology
          </p>
        </div>
      </div>

      {/* Clip Animation Section */}
      <div id="clip" className="clip-section">
        <div className="mask-clip-path about-image">
          <img
            src="/assets/img/mine.png"
            alt="About background"
            className="absolute left-0 top-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
