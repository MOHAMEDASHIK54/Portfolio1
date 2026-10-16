import React from 'react';
import HeroAvatar from './HeroAvatar';

export default function HeroSectionExample() {
  return (
    <section className="relative min-h-screen bg-[#070b16] text-white flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background Cyber Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left: Hero Headline & Description */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 backdrop-blur-md text-cyan-300 text-xs font-mono tracking-wide">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            FULL STACK CRAFTSMAN · JAVA &amp; REACT 19
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Mohamed Ashik</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed">
            I architect high-performance, enterprise-grade distributed systems and immersive 3D web interfaces. Specialized in React 19, Spring Boot, and cloud scalability.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 font-semibold text-slate-950 text-sm hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-0.5"
            >
              Explore Projects 🚀
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 backdrop-blur-md font-semibold text-white text-sm hover:border-cyan-400/60 hover:text-cyan-300 transition-all"
            >
              Contact Me ✉️
            </a>
          </div>
        </div>

        {/* Right: 3D Holographic Hero Avatar */}
        <div className="flex justify-center items-center">
          <HeroAvatar
            src="ashik-3d.jpg"
            alt="Mohamed Ashik - 3D Cyber Developer"
          />
        </div>

      </div>
    </section>
  );
}
