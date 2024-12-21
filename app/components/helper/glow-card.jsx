"use client"
import dynamic from 'next/dynamic';

const GlowEffect = dynamic(() => import('./glow-effect'), {
  ssr: false
});

const GlowCard = ({ children, identifier }) => {
  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}>
        <div className="glows"></div>
        {children}
      </article>
      <GlowEffect identifier={identifier} />
    </div>
  );
};

export default GlowCard;
