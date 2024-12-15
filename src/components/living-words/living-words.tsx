"use client";
import { useEffect, useCallback, useRef } from "react";
import "./living-words.scss";

const kiplingPoem = `<p>If you can <span>embrace</span> the decentralized world when all about you    
Are <span>skeptical</span> and <span>questioning</span> its value; 
If you can <span>trust</span> in blockchain when others <span>doubt</span> its security,    
But make <span>allowance</span> for their concerns too; 
If you can <span>wait</span> for the network to confirm,    
Or, being <span>misled</span> by FUD, don't spread <span>fears</span>, 
Or, being <span>criticized</span>, don't give way to <span>negativity</span>,    
And yet don't look too arrogant, nor talk too wise;
If you can <span>dream</span> of a decentralized future—and not make dreams your <span>master</span>; 
If you can <span>think</span> of smart contracts—and not make them your <span>aim</span>; 
If you can meet with <span>success</span> and <span>failure</span>    
And treat those two <span>impostors</span> just the same; 
If you can bear to hear the <span>truth</span> about crypto    
<span>Twisted</span> by skeptics to make a <span>trap</span> for fools, 
Or watch the projects you invested in <span>broken</span>,    
And <span>rebuild</span> them with new tools;
If you can make one <span>portfolio</span> of all your <span>assets</span>    
And <span>risk</span> it on one turn of market trends, 
And <span>lose</span>, and start again at your beginnings    
And never breathe a word about your <span>loss</span>; 
If you can <span>force</span> your mind and spirit and <span>energy</span>    
To <span>serve</span> your vision long after others have gone, 
And so <span>hold on</span> when there is nothing in you    
Except the <span>Will</span> which says to them: "Hold on";
If you can <span>engage</span> with communities and keep your <span>integrity</span>,    
Or <span>collaborate</span> with leaders—nor lose the common <span>touch</span>; 
If neither <span>critics</span> nor supporters can sway you;    
If all people <span>count</span> with you, but none too much; 
If you can fill the unforgiving <span>block</span> 
With sixty seconds' worth of decentralized <span>transactions</span>—    
Yours is the <span>Blockchain</span> and everything that's in it, 
And—which is more—you'll be a <span>Pioneer</span>, my friend!</p>`;


const LivingWords = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const adjustContentSize = useCallback(() => {
    if (contentRef.current) {
      const viewportWidth = window.innerWidth;
      const baseWidth = 1000;
      const scaleFactor =
        viewportWidth < baseWidth ? (viewportWidth / baseWidth) * 0.8 : 1;
      contentRef.current.style.transform = `scale(${scaleFactor})`;
      contentRef.current.style.transformOrigin = 'top left';
    }
  }, []);

  useEffect(() => {
    const textDivs = document.querySelectorAll<HTMLDivElement>(".text");
    textDivs.forEach((div) => {
      div.innerHTML = kiplingPoem;
    });

    window.addEventListener("load", adjustContentSize);
    window.addEventListener("resize", adjustContentSize);

    return () => {
      window.removeEventListener("load", adjustContentSize);
      window.removeEventListener("resize", adjustContentSize);
    };
  }, [adjustContentSize]);

  return (
    <div className="living-words-container">
      <div
        ref={contentRef}
        className="content w-full h-full"
      >
        <div className="container-full">
          <div className="animated hue"></div>
          <img
            className="backgroundImage"
            src="/images/empty-room.jpg"
            alt="Background"
            onLoad={adjustContentSize}
          />
          <img
            className="boyImage"
            src="/images/boy.png"
            alt="Boy"
            onLoad={adjustContentSize}
          />
          <Cube />
          <div className="container-reflect">
            <Cube />
          </div>
        </div>
      </div>
    </div>
  );
};

const Cube = () => (
  <div className="container">
    <div className="cube">
      <div className="face top"></div>
      <div className="face bottom"></div>
      <div className="face left text"></div>
      <div className="face right text"></div>
      <div className="face front"></div>
      <div className="face back text"></div>
    </div>
  </div>
);

export default LivingWords;
