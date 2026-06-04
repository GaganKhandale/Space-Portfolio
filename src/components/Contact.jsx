import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, MessageSquare, X, Send } from 'lucide-react';

const Contact = ({ isModalOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const targetScrollProgressRef = useRef(0);
  const lerpedScrollProgressRef = useRef(0);

  const moonGroupRef = useRef(null);
  const mountainsGroupRef = useRef(null);
  const detailsRef = useRef(null);
  const farMountainsRef = useRef(null);
  const midMountainsRef = useRef(null);
  const foreMountainsRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

      const contactEl = document.getElementById('contact');
      if (!contactEl) return;
      const rect = contactEl.getBoundingClientRect();
      const contactTop = rect.top + scrollTop;

      const startScroll = contactTop - windowHeight;
      const endScroll = docHeight - windowHeight;

      let progress = 0;
      if (endScroll > startScroll) {
        progress = (scrollTop - startScroll) / (endScroll - startScroll);
        progress = Math.min(1, Math.max(0, progress));
      } else {
        progress = scrollTop > 0 ? 1 : 0;
      }

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

      // Update section container opacity - fade in between 0.40 and 0.50
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const sectionOpacity = p < 0.40 ? 0 : Math.min(1, (p - 0.40) / 0.10);
        contactEl.style.opacity = sectionOpacity;
        contactEl.style.pointerEvents = sectionOpacity < 0.05 ? 'none' : 'auto';
      }

      // Calculations for internal layers
      const mappedProgress = p < 0.5 ? 0 : (p - 0.5) / 0.5;
      const easeInOutCubic = (x) => {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      };
      const easeProgress = easeInOutCubic(mappedProgress);

      // Moon transform and opacity updates
      const isMobile = window.innerWidth <= 768;
      const moonScale = 3.8 - 3.3 * easeProgress;
      const moonTx = isMobile 
        ? 410 + 160 * (1 - easeProgress) 
        : 570 * (1 - easeProgress);
      const moonTy = 100 * (1 - easeProgress);
      if (moonGroupRef.current) {
        moonGroupRef.current.style.transform = `translate(${moonTx}px, ${moonTy}px) scale(${moonScale})`;
        // Hide the Contact moon until Projects moon reaches the center (p = 0.50), then fade it in as the other fades out
        const moonOpacity = p < 0.50 ? 0 : Math.min(1, (p - 0.50) / 0.10);
        moonGroupRef.current.style.opacity = moonOpacity;
      }

      // Mountains transform updates
      if (mountainsGroupRef.current) {
        mountainsGroupRef.current.style.opacity = mappedProgress;
        if (isMobile) {
          mountainsGroupRef.current.style.transform = 'scaleX(0.42) translateY(20px)';
        } else {
          mountainsGroupRef.current.style.transform = 'none';
        }
      }
      if (farMountainsRef.current) {
        farMountainsRef.current.style.transform = `translateY(${(1 - easeProgress) * 20}px)`;
      }
      if (midMountainsRef.current) {
        midMountainsRef.current.style.transform = `translateY(${(1 - easeProgress) * 60}px)`;
      }
      if (foreMountainsRef.current) {
        foreMountainsRef.current.style.transform = `translateY(${(1 - easeProgress) * 85}px)`;
      }

      // Details transform updates
      if (detailsRef.current) {
        const detailsOpacity = Math.max(0, (mappedProgress - 0.2) / 0.8);
        detailsRef.current.style.opacity = detailsOpacity;
        detailsRef.current.style.transform = `translateY(${(1 - easeProgress) * 40}px)`;
        detailsRef.current.style.pointerEvents = detailsOpacity < 0.05 ? 'none' : 'auto';
      }

      animationFrameId = requestAnimationFrame(updateDOM);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    updateDOM(performance.now());

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCardClick = (type) => {
    if (type === 'email') {
      window.location.href = 'mailto:gagankhandale1224@gmail.com';
    } else if (type === 'phone') {
      window.location.href = 'tel:+917219495242';
    } else if (type === 'location') {
      window.open('https://www.google.com/maps/search/?api=1&query=Nagpur,+India', '_blank');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate sending message to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Close modal after showing success
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <section
        id="contact"
        className="section"
      style={{
        minHeight: '100vh',
        opacity: 0,
        transition: 'none'
      }}
    >

      {/* Low-Poly Night Mountain Landscape Background */}
      <div className="contact-bg-wrapper">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" className="contact-bg-svg">
          <defs>
            {/* Gradients */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#01040d" stopOpacity="0" />
              <stop offset="30%" stopColor="#03081a" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#040e24" stopOpacity="1" />
              <stop offset="100%" stopColor="#071b40" stopOpacity="1" />
            </linearGradient>

            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e2f1ff" stopOpacity="0.5" />
              <stop offset="20%" stopColor="#b9dcff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#4377a6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#040e24" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="footerMoonGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#cbd5e1" />
              <stop offset="75%" stopColor="#64748b" />
              <stop offset="90%" stopColor="#334155" />
              <stop offset="100%" stopColor="#111827" />
            </radialGradient>

            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="50%" stopColor="#00dfc0" />
              <stop offset="100%" stopColor="#0052d4" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="15" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Mountains Gradients */}
            <linearGradient id="mntDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0b172a" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>
            <linearGradient id="mntLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a365d" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="mntTeal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0d3c45" />
              <stop offset="100%" stopColor="#020d14" />
            </linearGradient>

            <linearGradient id="farMntLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#061022" />
              <stop offset="60%" stopColor="#08152e" />
              <stop offset="100%" stopColor="#0a1b38" />
            </linearGradient>
            <linearGradient id="farMntDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#040a17" />
              <stop offset="100%" stopColor="#02050b" />
            </linearGradient>

            <linearGradient id="midMntLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#061124" />
              <stop offset="60%" stopColor="#040a18" />
              <stop offset="100%" stopColor="#020610" />
            </linearGradient>
            <linearGradient id="midMntDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#030712" />
              <stop offset="100%" stopColor="#010307" />
            </linearGradient>

            <linearGradient id="foreMntLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#08162f" />
              <stop offset="60%" stopColor="#050e1f" />
              <stop offset="100%" stopColor="#020610" />
            </linearGradient>
            <linearGradient id="foreMntDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#02050c" />
              <stop offset="100%" stopColor="#000103" />
            </linearGradient>

            <filter id="glow-window" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="glow-house" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur3" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="blur2" />
                <feMergeNode in="blur3" />
                <feMergeNode in="blur3" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="shootingStar" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="40%" stopColor="#00dfc0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
            </linearGradient>

            <g id="pineTreeDark">
              <rect x="-2" y="80" width="4" height="40" fill="#010307" />
              <polygon points="0,0 -12,20 12,20" fill="#02050b" />
              <polygon points="0,15 -18,40 18,40" fill="#010408" />
              <polygon points="0,32 -25,65 25,65" fill="#010306" />
              <polygon points="0,50 -32,90 32,90" fill="#000204" />
            </g>

            <g id="pineTreeBlue">
              <rect x="-2" y="80" width="4" height="40" fill="#061226" />
              <polygon points="0,0 -12,20 12,20" fill="#081833" />
              <polygon points="0,15 -18,40 18,40" fill="#07152c" />
              <polygon points="0,32 -25,65 25,65" fill="#051022" />
              <polygon points="0,50 -32,90 32,90" fill="#040b18" />
            </g>
          </defs>

          {/* Sky background gradient covering the mountain bottom area only, transparent at top moon area */}
          <rect width="1440" height="900" fill="url(#skyGrad)" />

          {/* Full Moon */}
          <g ref={moonGroupRef} style={{ transformOrigin: '150px 350px' }}>
            <circle cx="150" cy="350" r="280" fill="url(#moonGlow)" opacity="0.6" />
            {/* Main Moon Body */}
            <circle cx="150" cy="350" r="110" fill="url(#footerMoonGrad)" />
            {/* Craters */}
            <circle cx="117" cy="306" r="11" fill="#334155" opacity="0.22" />
            <circle cx="172" cy="339" r="8" fill="#334155" opacity="0.25" />
            <circle cx="139" cy="394" r="14" fill="#334155" opacity="0.28" />
            <circle cx="194" cy="383" r="10" fill="#334155" opacity="0.22" />
          </g>

          {/* Mountains & Landscape group that slides and fades in */}
          <g ref={mountainsGroupRef} style={{ transformOrigin: 'bottom center' }}>
            {/* 3rd Layer (Farthest Background Silhouettes) */}
            <g ref={farMountainsRef} style={{ transformOrigin: 'bottom center' }}>
              {/* Peak 1 */}
              <path d="M 0,900 Q 80,780 180,680 C 200,660 210,630 220,620 C 225,650 228,760 230,900 Z" fill="url(#farMntLight)" />
              <path d="M 230,900 C 228,760 225,650 220,620 C 235,635 245,645 250,650 C 270,640 280,635 290,630 Q 385,765 480,900 Z" fill="url(#farMntDark)" />
              {/* Peak 2 */}
              <path d="M 350,900 Q 430,780 510,650 C 530,620 540,600 550,590 C 555,620 558,740 560,900 Z" fill="url(#farMntLight)" />
              <path d="M 560,900 C 558,740 555,620 550,590 C 570,610 580,630 590,640 C 615,620 625,615 640,610 Q 745,765 850,900 Z" fill="url(#farMntDark)" />
              {/* Peak 3 */}
              <path d="M 700,900 Q 790,780 850,690 C 865,650 875,610 880,600 C 885,630 888,750 890,900 Z" fill="url(#farMntLight)" />
              <path d="M 890,900 C 888,750 885,630 880,600 C 895,620 915,650 930,660 C 955,645 965,642 980,640 Q 1065,770 1150,900 Z" fill="url(#farMntDark)" />
              {/* Peak 4 */}
              <path d="M 950,900 Q 1080,760 1160,680 C 1180,650 1190,642 1200,640 C 1205,660 1208,760 1210,900 Z" fill="url(#farMntLight)" />
              <path d="M 1210,900 C 1208,760 1205,660 1200,640 C 1225,660 1235,675 1250,680 C 1275,665 1285,662 1300,660 Q 1370,780 1440,900 Z" fill="url(#farMntDark)" />
            </g>

            {/* 2nd Layer (Midground Background Silhouettes) */}
            <g ref={midMountainsRef} style={{ transformOrigin: 'bottom center' }}>
              {/* Peak 1 */}
              <path d="M 50,900 Q 160,800 240,730 C 265,710 285,695 300,690 C 305,715 308,790 310,900 Z" fill="url(#midMntLight)" />
              <path d="M 310,900 C 308,790 305,715 300,690 C 325,710 335,725 350,730 C 380,715 395,712 410,710 Q 480,805 550,900 Z" fill="url(#midMntDark)" />
              {/* Peak 2 */}
              <path d="M 450,900 Q 560,780 660,700 C 690,680 705,672 720,670 C 725,695 728,780 730,900 Z" fill="url(#midMntLight)" />
              <path d="M 730,900 C 728,780 725,695 720,670 C 745,690 755,705 770,710 C 795,695 810,692 820,690 Q 900,795 980,900 Z" fill="url(#midMntDark)" />
              {/* Peak 3 */}
              <path d="M 850,900 Q 950,780 1000,750 C 1035,715 1060,700 1080,695 C 1085,715 1088,780 1090,900 Z" fill="url(#midMntLight)" />
              <path d="M 1090,900 C 1088,780 1085,715 1080,695 C 1105,715 1115,730 1130,735 C 1160,720 1175,718 1190,715 Q 1270,805 1350,900 Z" fill="url(#midMntDark)" />
              {/* Peak 4 */}
              <path d="M 1150,900 Q 1240,800 1290,760 C 1320,730 1345,712 1360,710 C 1365,720 1368,790 1370,900 Z" fill="url(#midMntLight)" />
              <path d="M 1370,900 C 1368,790 1365,720 1360,710 C 1380,725 1390,735 1400,740 Q 1420,730 1440,725 L 1440,900 Z" fill="url(#midMntDark)" />
            </g>

            {/* 1st Layer (Foreground Faceted Low-Poly) */}
            <g ref={foreMountainsRef} style={{ transformOrigin: 'bottom center' }}>
              {/* Foreground Mountain Ridges behind Trees */}
              {/* Left Peak */}
              <path d="M 0,900 Q 40,820 90,780 C 115,760 140,745 160,740 C 165,760 168,820 170,900 Z" fill="url(#foreMntLight)" />
              <path d="M 170,900 C 168,820 165,760 160,740 C 190,760 205,775 220,780 Q 280,840 360,900 Z" fill="url(#foreMntDark)" />
              {/* Right Peak */}
              <path d="M 1050,900 Q 1150,810 1200,790 C 1235,760 1260,735 1280,730 C 1285,750 1288,815 1290,900 Z" fill="url(#foreMntLight)" />
              <path d="M 1290,900 C 1288,815 1285,750 1280,730 C 1310,750 1325,765 1340,770 Q 1390,835 1440,900 Z" fill="url(#foreMntDark)" />

              {/* Observatory Building Structural Parts (Behind Hill to merge foundation) */}
              {/* Cylindrical Base */}
              <rect x="402" y="642" width="56" height="40" fill="#1c202a" stroke="#0b172a" strokeWidth="1" />
              {/* Dome Roof */}
              <path d="M 402,642 A 28,28 0 0,1 458,642 Z" fill="#252936" stroke="#0b172a" strokeWidth="1" />
              {/* Telescope Tube */}
              <rect x="424" y="617" width="8" height="30" transform="rotate(40 428 632)" fill="#151922" stroke="#090d16" strokeWidth="0.5" />
              {/* Dome Slit */}
              <line x1="428" y1="614" x2="428" y2="642" stroke="#0d111b" strokeWidth="2" />

              {/* Central Hill */}
              <path d="M 80,900 C 180,880 280,720 430,670 C 560,650 680,820 850,900 Z" fill="#0b172a" />

              {/* Winding Path to Observatory */}
              <path d="M 426,670 Q 420,720 380,780 T 360,900 L 385,900 Q 405,790 434,720 T 434,670 Z" fill="#050a14" opacity="0.8" />

              {/* Glowing Path Lights (Left Side) */}
              <circle cx="422" cy="690" r="1.5" fill="#ffd54f" opacity="0.8" filter="url(#glow-window)" className="pathway-light" />
              <circle cx="415" cy="715" r="1.5" fill="#ffd54f" opacity="0.8" filter="url(#glow-window)" className="pathway-light" />
              <circle cx="401" cy="745" r="2.0" fill="#ffd54f" opacity="0.9" filter="url(#glow-window)" className="pathway-light" />
              <circle cx="383" cy="775" r="1.5" fill="#ffd54f" opacity="0.8" filter="url(#glow-window)" className="pathway-light" />
              <circle cx="362" cy="815" r="2.0" fill="#ffd54f" opacity="0.9" filter="url(#glow-window)" className="pathway-light" />
              <circle cx="353" cy="855" r="1.5" fill="#ffd54f" opacity="0.8" filter="url(#glow-window)" className="pathway-light" />

              {/* Glowing Path Lights (Right Side) */}
              <circle cx="445" cy="690" r="1.5" fill="#ffd54f" opacity="0.8" filter="url(#glow-window)" className="pathway-light" />
              <circle cx="436" cy="715" r="1.5" fill="#ffd54f" opacity="0.8" filter="url(#glow-window)" className="pathway-light" />
              <circle cx="424" cy="745" r="2.0" fill="#ffd54f" opacity="0.9" filter="url(#glow-window)" className="pathway-light" />
              <circle cx="414" cy="775" r="1.5" fill="#ffd54f" opacity="0.8" filter="url(#glow-window)" className="pathway-light" />
              <circle cx="403" cy="815" r="2.0" fill="#ffd54f" opacity="0.9" filter="url(#glow-window)" className="pathway-light" />
              <circle cx="394" cy="855" r="1.5" fill="#ffd54f" opacity="0.8" filter="url(#glow-window)" className="pathway-light" />

              {/* Observatory Building Details (On top of Hill for visibility) */}
              {/* Door */}
              <path d="M 426,670 L 426,652 A 4,4 0 0,1 434,652 L 434,670 Z" fill="#ffb300" filter="url(#glow-house)" />
              {/* Dome glowing windows */}
              <rect x="410" y="650" width="6" height="10" rx="3" fill="#ffb300" filter="url(#glow-house)" />
              <rect x="444" y="650" width="6" height="10" rx="3" fill="#ffb300" filter="url(#glow-house)" />

              {/* Reusable Pine Tree Silhouettes - Left Side */}
              {/* Background Blue-Gray Trees */}
              <use href="#pineTreeBlue" transform="translate(60, 708) scale(1.6)" />
              <use href="#pineTreeBlue" transform="translate(110, 732) scale(1.4)" />
              <use href="#pineTreeBlue" transform="translate(160, 756) scale(1.2)" />
              <use href="#pineTreeBlue" transform="translate(210, 780) scale(1.0)" />

              {/* Foreground Dark Black Trees */}
              <use href="#pineTreeDark" transform="translate(30, 660) scale(2.0)" />
              <use href="#pineTreeDark" transform="translate(85, 696) scale(1.7)" />
              <use href="#pineTreeDark" transform="translate(135, 732) scale(1.5)" />
              <use href="#pineTreeDark" transform="translate(180, 768) scale(1.3)" />
              <use href="#pineTreeDark" transform="translate(225, 804) scale(1.0)" />
              <use href="#pineTreeDark" transform="translate(270, 828) scale(0.8)" />

              {/* Reusable Pine Tree Silhouettes - Right Side */}
              {/* Background Blue-Gray Trees */}
              <use href="#pineTreeBlue" transform="translate(1380, 696) scale(1.7)" />
              <use href="#pineTreeBlue" transform="translate(1320, 720) scale(1.5)" />
              <use href="#pineTreeBlue" transform="translate(1260, 744) scale(1.3)" />
              <use href="#pineTreeBlue" transform="translate(1200, 768) scale(1.1)" />
              <use href="#pineTreeBlue" transform="translate(1140, 792) scale(0.9)" />

              {/* Foreground Dark Black Trees */}
              <use href="#pineTreeDark" transform="translate(1410, 648) scale(2.1)" />
              <use href="#pineTreeDark" transform="translate(1350, 684) scale(1.8)" />
              <use href="#pineTreeDark" transform="translate(1295, 720) scale(1.6)" />
              <use href="#pineTreeDark" transform="translate(1240, 756) scale(1.4)" />
              <use href="#pineTreeDark" transform="translate(1185, 792) scale(1.2)" />
              <use href="#pineTreeDark" transform="translate(1130, 816) scale(1.0)" />
              <use href="#pineTreeDark" transform="translate(1075, 840) scale(0.8)" />

              {/* Framing Hills */}
              <path d="M -50,900 Q 150,830 350,900 Z" fill="#01040a" />
              <path d="M 1050,900 Q 1280,820 1490,900 Z" fill="#010205" />

              {/* Flat Ground Plain */}
              <rect x="0" y="900" width="1440" height="150" fill="#020617" />
            </g>
          </g>
        </svg>
      </div>

      <div ref={detailsRef} className="contact-container">
        <h2 className="contact-header">Contact Me</h2>

        {/* Contact Info Cards */}
        <div className="contact-cards-grid">
          <div className="contact-card" onClick={() => handleCardClick('email')}>
            <div className="card-icon-wrapper">
              <Mail size={22} />
            </div>
            <span className="card-info">gagankhandale1224@gmail.com</span>
          </div>

          <div className="contact-card" onClick={() => handleCardClick('phone')}>
            <div className="card-icon-wrapper">
              <Phone size={22} />
            </div>
            <span className="card-info">+91 7219495242</span>
          </div>

          <div className="contact-card" onClick={() => handleCardClick('location')}>
            <div className="card-icon-wrapper">
              <MapPin size={22} />
            </div>
            <span className="card-info">Nagpur, India</span>
          </div>
        </div>

        {/* Got something in mind text button */}
        <button className="contact-talk-btn" onClick={() => setIsModalOpen(true)}>
          Got something in mind? <span>Let's talk ↗</span>
        </button>

        <div className="contact-divider" />

        {/* Social Links Centered */}
        <div className="contact-socials-horizontal">
          <a href="https://linkedin.com/in/gagan-khandale" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://github.com/gagankhandale" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://instagram.com/gagan.khandale" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://wa.me/917219495242" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </section>

      {/* Message Modal Overlay */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(2, 6, 19, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{
            background: 'rgba(3, 13, 34, 0.95)',
            border: '1px solid rgba(0, 223, 192, 0.2)',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            padding: '2.5rem',
            boxShadow: '0 10px 40px rgba(0, 223, 192, 0.08)',
            position: 'relative',
            color: '#fff'
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-slate)',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-teal)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-slate)'}
            >
              <X size={24} />
            </button>

            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(0, 223, 192, 0.1)',
                  color: 'var(--accent-teal)',
                  borderRadius: '50%',
                  marginBottom: '1.5rem',
                  fontSize: '2rem'
                }}>
                  ✓
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. I'll get back to you shortly!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--accent-teal)', paddingLeft: '10px' }}>
                  Let's Connect
                </h3>

                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-slate)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      background: 'rgba(2, 7, 18, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-teal)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                  />
                </div>

                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-slate)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      background: 'rgba(2, 7, 18, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-teal)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                  />
                </div>

                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-slate)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Type your message here..."
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      background: 'rgba(2, 7, 18, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-teal)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: 'var(--accent-teal)',
                    color: 'var(--bg-deep)',
                    fontWeight: '700',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.filter = 'brightness(1.1)';
                    e.target.style.boxShadow = '0 0 15px rgba(0, 223, 192, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.filter = 'none';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
