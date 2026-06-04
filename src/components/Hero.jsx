import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const Hero = ({ onConnectClick }) => {
  const targetScrollProgressRef = useRef(0);
  const lerpedScrollProgressRef = useRef(0);

  const greyPlanetRef = useRef(null);
  const saturnPlanetRef = useRef(null);
  const galaxyPurpleRef = useRef(null);
  const galaxyTealRef = useRef(null);
  const galaxyVioletRef = useRef(null);
  const nebulaTealRef = useRef(null);
  const nebulaPurpleRef = useRef(null);
  const domeOuterRef = useRef(null);
  const domeInnerRef = useRef(null);
  const contentContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = (e) => {
      const target = e.target;
      let scrollTop = 0;
      if (target === document) {
        scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      } else if (target) {
        scrollTop = target.scrollTop || 0;
      }
      
      const heroHeight = window.innerHeight || 800;
      const progress = Math.min(1, Math.max(0, scrollTop / heroHeight));
      targetScrollProgressRef.current = progress;
    };

    let lastTime = performance.now();
    const updateDOM = (now) => {
      const dt = Math.min(4, (now - lastTime) / 16.666);
      lastTime = now;

      // Lerp progress and update DOM elements directly with rate-independent factor for smooth 120fps+ animation
      const lerpFactor = 1 - Math.pow(1 - 0.15, dt);
      lerpedScrollProgressRef.current = lerpedScrollProgressRef.current + (targetScrollProgressRef.current - lerpedScrollProgressRef.current) * lerpFactor;
      if (Math.abs(targetScrollProgressRef.current - lerpedScrollProgressRef.current) < 0.0001) {
        lerpedScrollProgressRef.current = targetScrollProgressRef.current;
      }

      const p = lerpedScrollProgressRef.current;

      const easeInOutCubic = (x) => {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      };

      // 1. Grey Planet
      if (greyPlanetRef.current) {
        const greyOpacity = Math.max(0, 1 - p * 2);
        const greyTy = p * -80;
        greyPlanetRef.current.style.opacity = greyOpacity;
        greyPlanetRef.current.style.transform = `translateY(${greyTy}px)`;
        greyPlanetRef.current.style.pointerEvents = greyOpacity < 0.05 ? 'none' : 'auto';
      }

      // 2. Saturn Planet
      if (saturnPlanetRef.current) {
        const easeP = easeInOutCubic(p);
        const tx = -6 * easeP;
        const ty = -14 * easeP;
        const scale = 1 + easeP * 4;
        const saturnOpacity = p > 0.75 ? Math.max(0, 1 - (p - 0.75) / 0.25) : 1;
        saturnPlanetRef.current.style.transform = `translate(${tx}vw, ${ty}vh) scale(${scale})`;
        saturnPlanetRef.current.style.opacity = saturnOpacity;
        saturnPlanetRef.current.style.pointerEvents = saturnOpacity < 0.05 ? 'none' : 'auto';
      }

      // 3. Galaxies
      const galaxyOpacity = Math.max(0, 1 - p * 2);
      if (galaxyPurpleRef.current) galaxyPurpleRef.current.style.opacity = galaxyOpacity;
      if (galaxyTealRef.current) galaxyTealRef.current.style.opacity = galaxyOpacity;
      if (galaxyVioletRef.current) galaxyVioletRef.current.style.opacity = galaxyOpacity;

      // 4. Nebulas
      const nebulaOpacity = Math.max(0, 1 - p * 1.5);
      if (nebulaTealRef.current) nebulaTealRef.current.style.opacity = nebulaOpacity;
      if (nebulaPurpleRef.current) nebulaPurpleRef.current.style.opacity = nebulaOpacity;

      // 5. Domes
      const domeOpacity = Math.max(0, 1 - p * 1.5);
      if (domeOuterRef.current) {
        domeOuterRef.current.style.transform = `translateY(${p * 250}px)`;
        domeOuterRef.current.style.opacity = domeOpacity;
      }
      if (domeInnerRef.current) {
        domeInnerRef.current.style.transform = `translateY(${p * 350}px)`;
        domeInnerRef.current.style.opacity = domeOpacity;
      }

      // 6. Content Container
      if (contentContainerRef.current) {
        const containerOpacity = Math.max(0, 1 - p * 1.8);
        const containerTy = p * -80;
        contentContainerRef.current.style.opacity = containerOpacity;
        contentContainerRef.current.style.transform = `translateY(${containerTy}px)`;
        contentContainerRef.current.style.pointerEvents = containerOpacity < 0.05 ? 'none' : 'auto';
      }

      // 7. Scroll Indicator
      if (scrollIndicatorRef.current) {
        const indicatorOpacity = Math.max(0, 1 - p * 3);
        scrollIndicatorRef.current.style.opacity = indicatorOpacity;
        scrollIndicatorRef.current.style.animation = p > 0.01 ? 'none' : 'pulse 2s infinite';
        scrollIndicatorRef.current.style.pointerEvents = indicatorOpacity < 0.05 ? 'none' : 'auto';
      }

      animationFrameId = requestAnimationFrame(updateDOM);
    };

    document.addEventListener('scroll', handleScroll, true);
    // Initial calculation
    handleScroll({ target: document });
    updateDOM(performance.now());

    return () => {
      document.removeEventListener('scroll', handleScroll, true);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleConnectClick = () => {
    if (onConnectClick) {
      onConnectClick();
    }
  };

  return (
    <section id="home" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background Planets & Dome Overlay */}
      <div className="hero-decorations">
        {/* Grey Planet Wrapper (scroll translation) */}
        <div 
          ref={greyPlanetRef}
          className="hero-planet-grey-wrapper"
          style={{ 
            position: 'absolute',
            top: '18%',
            right: '28%',
            width: '32px',
            height: '32px',
            zIndex: 2,
            opacity: 1, 
            transform: 'translateY(0px)',
            transition: 'none'
          }}
        >
          <div 
            className="hero-planet-grey"
            style={{
              position: 'relative',
              top: 'auto',
              right: 'auto',
              left: 0
            }}
          >
            <div className="ring ring-1" />
            <div className="ring ring-2" />
          </div>
        </div>

        {/* Saturn-like Planet Wrapper (scroll zoom) */}
        <div 
          ref={saturnPlanetRef}
          className="hero-planet-saturn-wrapper" 
          style={{
            position: 'absolute',
            bottom: '22%',
            right: '38%',
            width: '80px',
            height: '80px',
            zIndex: 2,
            transform: 'translate(0vw, 0vh) scale(1)',
            opacity: 1,
            transition: 'none'
          }}
        >
          <div 
            className="hero-planet-saturn"
            style={{
              position: 'relative',
              bottom: 'auto',
              right: 'auto',
              top: 0,
              left: 0
            }}
          >
            <div className="saturn-ring" />
          </div>
        </div>

        {/* Top-Right Purple Galaxy */}
        <div 
          ref={galaxyPurpleRef}
          className="hero-galaxy galaxy-purple-top"
          style={{ opacity: 1, transition: 'opacity 0.2s ease-out' }}
        >
          <div className="galaxy-rings-spin" style={{ animationDuration: '24s' }}>
            <div className="galaxy-core" />
            <div className="galaxy-ring ring-a" />
            <div className="galaxy-ring ring-b" />
          </div>
        </div>

        {/* Middle-Right Teal Galaxy */}
        <div 
          ref={galaxyTealRef}
          className="hero-galaxy galaxy-teal-mid"
          style={{ opacity: 1, transition: 'opacity 0.2s ease-out' }}
        >
          <div className="galaxy-rings-spin" style={{ animationDuration: '32s', animationDirection: 'reverse' }}>
            <div className="galaxy-core" />
            <div className="galaxy-ring ring-a" />
            <div className="galaxy-ring ring-b" />
          </div>
        </div>

        {/* Bottom-Right Violet Galaxy */}
        <div 
          ref={galaxyVioletRef}
          className="hero-galaxy galaxy-violet-bottom"
          style={{ opacity: 1, transition: 'opacity 0.2s ease-out' }}
        >
          <div className="galaxy-rings-spin" style={{ animationDuration: '28s' }}>
            <div className="galaxy-core" />
            <div className="galaxy-ring ring-a" />
            <div className="galaxy-ring ring-b" />
          </div>
        </div>

        {/* Nebula gradients */}
        <div ref={nebulaTealRef} className="hero-nebula-teal" style={{ opacity: 1, transition: 'opacity 0.2s ease-out' }} />
        <div ref={nebulaPurpleRef} className="hero-nebula-purple" style={{ opacity: 1, transition: 'opacity 0.2s ease-out' }} />

        {/* Bottom Celestial Planet Dome - Layer 1 (Outer/Behind) */}
        <div 
          ref={domeOuterRef}
          className="hero-bottom-dome-outer" 
          style={{ 
            transform: 'translateY(0px)',
            opacity: 1,
            transition: 'none'
          }} 
        />

        {/* Bottom Celestial Planet Dome - Layer 2 (Inner/Front) */}
        <div 
          ref={domeInnerRef}
          className="hero-bottom-dome-inner" 
          style={{ 
            transform: 'translateY(0px)',
            opacity: 1,
            transition: 'none'
          }} 
        />
      </div>

      <div 
        ref={contentContainerRef}
        className="hero-container" 
        style={{ 
          zIndex: 10,
          opacity: 1,
          transform: 'translateY(0px)',
          transition: 'none'
        }}
      >
        <span className="hero-sub">Hi, my name is</span>
        <h1 className="hero-title-name">Gagan Khandale<span>.</span></h1>
        <h2 className="hero-title-desc">
          I build things for the <span>web.</span>
        </h2>
        <p className="hero-para">
          I'm a software engineer specializing in building (and occasionally
          designing) exceptional digital experiences. Building modern,
          user-focused web applications with clean design and efficient
          engineering.
        </p>
        <button className="hero-btn" onClick={handleConnectClick}>
          Let's Connect <ArrowUpRight size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div 
        ref={scrollIndicatorRef}
        className="scroll-indicator" 
        style={{ 
          zIndex: 10,
          opacity: 1
        }} 
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
