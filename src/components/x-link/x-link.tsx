"use client"
import Widget from "@/components/widget/widget";
import Image from "next/image";

const XLink = () => {
  const xLinks = [
    "https://x.com/elonmusk",
    "https://x.com/VitalikButerin",
    "https://x.com/solana",
  ];

  const onWidgetClick = () => {
    const randomIndex = Math.floor(Math.random() * xLinks.length);
    window.open(xLinks[randomIndex], "_blank");
  };

  return <Widget right={100} top={60} className="floating cursor-pointer">
        <Image className="x-icon" src="/images/X.png" alt="logo" width={100} height={100} onClick={onWidgetClick} priority />
      </Widget>
};
export default XLink;
