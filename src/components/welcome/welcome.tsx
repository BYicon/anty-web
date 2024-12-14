import Image from "next/image";
import SlideText from "@/components/slide-text/slide-text";
import "./welcome.scss";

const Welcome = () => {
  return (
    <div className="welcome">
      <span id="splash-overlay" className="splash">
        <div className="flex justify-center items-center h-full translate-y-64">   
            <SlideText style={{ fontSize: "2.8rem", fontWeight: "600", background: "var(--colors-background)" }} />
        </div>
      </span>
      <Image
        id="welcome"
        className="z-depth-4"
        src="/images/logo.png"
        objectFit="contain"
        alt="logo"
        width={600}
        height={600}
      />
    </div>
  );
};

export default Welcome;
