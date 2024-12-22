"use client"
import Image from "next/image";
import SlideText from "../slide-text/slide-text";
import "./welcome.scss";
import { useEffect } from "react";

const Welcome = ({ onMount }: { onMount: () => void }) => {

  useEffect(() => {
    const welcomeIcon = document.getElementById("welcomeContainer");
    if (welcomeIcon) {
      welcomeIcon.addEventListener("animationend", (event) => {
        if (event.animationName === 'hide') { 
          onMount();
        }
      });
    }
  }, [onMount]);

  return (
    <div className="welcome-container" id="welcomeContainer">
      <span className="splash"></span>
      <Image
        id="welcomeIcon"
        className="z-depth-4 welcome-icon"
        src="/images/logo.png"
        objectFit="contain"
        alt="logo"
        width={600}
        height={600}
      />
      <div className="flex justify-center items-center h-full translate-y-64">
        <SlideText
          style={{
            fontSize: "2.3rem",
            fontWeight: "600",
          }}
        />
      </div>
    </div>
  );
};

export default Welcome;
