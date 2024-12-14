import Image from "next/image";
import "./welcome.scss";
const Welcome = () => {
  return (
    <div className="welcome">
      <span id="splash-overlay" className="splash"></span>
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
