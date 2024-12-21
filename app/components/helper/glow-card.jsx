"use client"

import { useRef } from 'react';
const GlowEffect = dynamic(() => import('./glow-effect'), {
  ssr: false
});

const GlowCard = ({ children, identifier }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  return (
    <div ref={containerRef} className={`glow-container-${identifier} glow-container`}>
      <article ref={cardRef} className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}>
        <div className="glows"></div>
        {children}
      </article>
      <GlowEffect 
        containerRef={containerRef}
        cardRef={cardRef}
        identifier={identifier}
      />
    </div>
  );
};

export default GlowCard;
