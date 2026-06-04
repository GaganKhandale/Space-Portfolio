import React, { useRef } from 'react';
import { ArrowDown, ArrowLeft, RefreshCw, Radio, FileText, ExternalLink } from 'lucide-react';

const ResumePage = ({ setView }) => {
  const scrollContainerRef = useRef(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Gagan_Khandale_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resume-page-wrapper">
      {/* HUD: Top Center back button logo */}
      <div className="hud-top-center">
        <button className="hud-logo-btn" onClick={() => setView('main')} title="Return to Home">
          <span>G</span>
        </button>
      </div>

      {/* Volumetric Shaded Planet (Top Left) */}
      <div className="lunar-planet-container">
        <svg viewBox="0 0 200 200" className="lunar-planet-svg">
          <defs>
            {/* Clip path to force continents/clouds to stay inside the sphere */}
            <clipPath id="earthClip">
              <circle cx="100" cy="100" r="75" />
            </clipPath>

            {/* Ocean base color radial gradient */}
            <radialGradient id="oceanGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1e7ad6" />
              <stop offset="50%" stopColor="#0f4fa3" />
              <stop offset="85%" stopColor="#052857" />
              <stop offset="100%" stopColor="#010e21" />
            </radialGradient>

            {/* Volumetric spherical shadow overlay */}
            <radialGradient id="sphereShade" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#000000" stopOpacity="0" />
              <stop offset="80%" stopColor="#020a17" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#01040a" stopOpacity="0.95" />
            </radialGradient>

            {/* Atmosphere glow */}
            <filter id="atmosphereGlow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer atmosphere halo */}
          <circle cx="100" cy="100" r="76" fill="rgba(30, 144, 255, 0.35)" filter="url(#atmosphereGlow)" />

          {/* Earth body inside clip path */}
          <g clipPath="url(#earthClip)">
            {/* Ocean base */}
            <circle cx="100" cy="100" r="75" fill="url(#oceanGrad)" />

            {/* Rotating Continents Group */}
            <g className="rotating-earth-continents">
              {/* Continental Landmasses (Emerald Greens) */}
              <path d="M40,55 Q55,40 75,50 Q85,55 80,75 Q72,92 57,107 Q42,122 47,137 Q52,152 42,162 Q32,172 27,152 Q27,132 37,117 Q47,102 42,87 Q37,72 40,55 Z" fill="#10b981" opacity="0.8" />
              <path d="M120,40 Q142,32 158,47 Q170,62 160,82 Q150,92 140,87 Q130,82 120,97 Q110,112 125,127 Q140,142 130,162 Q120,172 105,167 Q90,162 95,142 Q100,122 90,102 Q80,82 95,67 Q105,52 120,40 Z" fill="#059669" opacity="0.85" />
              <path d="M140,130 Q155,125 165,135 Q170,145 160,155 Q145,160 135,150 Q130,140 140,130 Z" fill="#34d399" opacity="0.8" />
              <path d="M75,30 Q90,25 95,35 Q90,45 80,45 Q70,40 75,30 Z" fill="#047857" opacity="0.9" />
            </g>



            {/* Shading overlay to give it a 3D spherical form */}
            <circle cx="100" cy="100" r="75" fill="url(#sphereShade)" />
          </g>
        </svg>
      </div>

      {/* HUD overlays in the 4 corners of screen */}


      <div className="hud-overlay hud-top-right">
        <div className="hud-header">TRANSMISSION</div>
        <div className="hud-row"><Radio size={12} className="hud-icon-spin" /> SIGNAL STRENGTH</div>
        <div className="hud-row">LATENCY: 12MS</div>
        <div className="hud-row">N 8°14'52" S 21°24'</div>
      </div>

      <div className="hud-overlay hud-bottom-left">
        <div className="hud-header">SURFACE ANALYSIS</div>
        <div className="hud-row">TERRAIN: STABLE</div>
        <div className="hud-row">DEFENSE: SECURE</div>
        <div className="hud-row">GRAVITY: 1.62 M/S²</div>
      </div>

      <div className="hud-overlay hud-bottom-right">
        <div className="hud-header">MODULE STATUS</div>
        <div className="hud-row"><span className="hud-indicator active"></span> ALL SYSTEMS GO</div>
        <div className="hud-row">POWER: 99%</div>
        <div className="hud-row">TEMP: 21°C</div>
      </div>

      {/* Moon Surface / Terrain at the bottom */}
      <div className="lunar-horizon">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="lunar-horizon-svg">
          <defs>
            {/* Crater Cavity Gradients */}
            <radialGradient id="craterDeep" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#0d0f14" />
              <stop offset="80%" stopColor="#161922" />
              <stop offset="100%" stopColor="#222633" />
            </radialGradient>

            <linearGradient id="craterRim1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="craterRim2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#64748b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
            </linearGradient>

            {/* Spherical Moon Body Gradient */}
            <radialGradient id="lunarBodyGrad" cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor="#b8bfc9" />
              <stop offset="35%" stopColor="#5c626f" />
              <stop offset="70%" stopColor="#242831" />
              <stop offset="100%" stopColor="#0b0c10" />
            </radialGradient>

            {/* Subtle glow filter */}
            <filter id="lunarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Main Spherical Moon Body */}
          <path
            d="M-200,320 Q720,120 1640,320 Z"
            fill="url(#lunarBodyGrad)"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />

          {/* Stylized Glowing Crater Left */}
          <g transform="translate(280, 260)" className="lunar-crater-group">
            {/* Crater outer rim glow */}
            <ellipse cx="0" cy="0" rx="75" ry="18" fill="none" stroke="url(#craterRim1)" strokeWidth="3" filter="url(#lunarGlow)" />
            {/* Crater inner shaded cavity */}
            <ellipse cx="-2" cy="2" rx="70" ry="15" fill="url(#craterDeep)" />
            {/* Inner bottom shadow */}
            <ellipse cx="3" cy="-1" rx="55" ry="10" fill="rgba(0,0,0,0.4)" />
          </g>

          {/* Stylized Glowing Crater Right */}
          <g transform="translate(1140, 260)" className="lunar-crater-group">
            <ellipse cx="0" cy="0" rx="95" ry="22" fill="none" stroke="url(#craterRim2)" strokeWidth="3" filter="url(#lunarGlow)" />
            <ellipse cx="-3" cy="2" rx="90" ry="18" fill="url(#craterDeep)" />
            <ellipse cx="4" cy="-2" rx="70" ry="12" fill="rgba(0,0,0,0.4)" />
          </g>

          {/* Center Glowing Crater under the Module */}
          <g transform="translate(720, 240)">
            <ellipse cx="0" cy="0" rx="140" ry="25" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" filter="url(#lunarGlow)" />
            <ellipse cx="0" cy="0" rx="120" ry="20" fill="url(#craterDeep)" />
            <ellipse cx="0" cy="0" rx="90" ry="14" fill="rgba(0,0,0,0.5)" />
          </g>

          {/* Floating animated particles (Space Dust) */}
          <circle cx="250" cy="240" r="1.5" className="lunar-dust-particle p1" />
          <circle cx="290" cy="220" r="2.5" className="lunar-dust-particle p2" />
          <circle cx="330" cy="250" r="1" className="lunar-dust-particle p3" />

          <circle cx="1080" cy="230" r="2" className="lunar-dust-particle p4" />
          <circle cx="1140" cy="210" r="1.5" className="lunar-dust-particle p5" />
          <circle cx="1200" cy="240" r="3" className="lunar-dust-particle p6" />

          <circle cx="680" cy="250" r="2" className="lunar-dust-particle p7" />
          <circle cx="760" cy="230" r="1" className="lunar-dust-particle p8" />
        </svg>
      </div>

      {/* Main futuristic Resume Module Container */}
      <div className="resume-module-anchor">
        {/* Antennas */}
        <div className="antenna antenna-left">
          <div className="antenna-line"></div>
          <div className="antenna-dot"></div>
        </div>
        <div className="antenna antenna-right">
          <div className="antenna-line"></div>
          <div className="antenna-dot"></div>
        </div>

        {/* Struts/Legs supporting the container on the moon surface */}
        <svg viewBox="0 0 400 200" className="struts-svg">
          <line x1="50" y1="50" x2="20" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <circle cx="20" cy="170" r="10" fill="#1b1e25" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

          <line x1="150" y1="50" x2="130" y2="185" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <circle cx="130" cy="185" r="10" fill="#1b1e25" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

          <line x1="250" y1="50" x2="270" y2="185" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <circle cx="270" cy="185" r="10" fill="#1b1e25" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

          <line x1="350" y1="50" x2="380" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <circle cx="380" cy="170" r="10" fill="#1b1e25" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        </svg>

        {/* Container Body */}
        <div className="resume-module-container">
          {/* Header section with futuristic details */}
          <div className="resume-module-header">
            <div className="header-status">
              <span className="terminal-dots">
                <span></span><span></span><span></span>
              </span>
              <span className="header-title">RESUME • GAGAN</span>
            </div>

            <div className="header-actions">
              <button className="action-btn back-btn" onClick={() => setView('main')} title="Return to Home">
                <ArrowLeft size={16} /> BACK
              </button>
              <button className="action-btn download-btn" onClick={handleDownload} title="Download PDF Resume">
                <ArrowDown size={16} /> DOWNLOAD
              </button>
            </div>
          </div>

          {/* Resume content viewport */}
          <div className="resume-viewport">
            <iframe
              src="/resume.pdf#toolbar=0&navpanes=0&view=FitH"
              className="resume-pdf-iframe"
              title="Gagan Khandale Resume PDF"
            />
            <div className="resume-mobile-fallback">
              <div className="fallback-card">
                <div className="fallback-glow"></div>
                <div className="scanner-line"></div>
                <div className="document-icon-wrapper">
                  <FileText className="fallback-icon" size={48} />
                </div>
                <h3 className="fallback-title">RESUME_TRANSMISSION.pdf</h3>
                <p className="fallback-subtitle">Futuristic Core Protocol v4.0</p>
                <div className="fallback-details">
                  <div className="detail-row">
                    <span>FILE TYPE</span>
                    <span className="detail-value">PDF DOCUMENT</span>
                  </div>
                  <div className="detail-row">
                    <span>SIZE</span>
                    <span className="detail-value">350 KB</span>
                  </div>
                  <div className="detail-row">
                    <span>STATUS</span>
                    <span className="detail-value text-green">ONLINE / READY</span>
                  </div>
                </div>
                <div className="fallback-actions">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="fallback-btn view-btn">
                    <ExternalLink size={16} /> VIEW PDF
                  </a>
                  <button onClick={handleDownload} className="fallback-btn download-btn-mobile">
                    <ArrowDown size={16} /> DOWNLOAD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
