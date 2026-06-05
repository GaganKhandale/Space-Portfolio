import React, { useEffect, useRef, useState } from 'react';
import { X, Globe } from 'lucide-react';

// Six projects defined by their center coordinates on the globe
const projectsData = [
  {
    id: 'fashion',
    name: 'Fashion Exchange',
    desc: 'An AI-powered fashion recommendation and trading web application with smart size matching.',
    color: '#00dfc0', // Teal/Green
    lat: 0.5,      // Latitude (radians)
    lon: -1.0,     // Longitude (radians)
    shape: [
      { dlat: -0.15, dlon: -0.15 },
      { dlat: 0.15, dlon: -0.1 },
      { dlat: 0.2, dlon: 0.2 },
      { dlat: -0.05, dlon: 0.25 },
      { dlat: -0.2, dlon: 0.05 }
    ],
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
    features: [
      'Smart Wardrobe Matching',
      'AI Size Prediction Engine',
      'Personalized Recommendations',
      'Fluid Glassmorphic UI/UX'
    ],
    liveUrl: 'https://fashion-exchange.demo',
    codeUrl: 'https://github.com/GaganKhandale/Fashion-Exchange'
  },
  {
    id: 'portfolio',
    name: 'Space Portfolio',
    desc: 'An immersive space-themed developer portfolio using React and interactive HTML5 Canvas graphics.',
    color: '#ec4899', // Pink
    lat: 0.9,
    lon: 0.2,
    shape: [
      { dlat: -0.1, dlon: -0.1 },
      { dlat: 0.1, dlon: -0.1 },
      { dlat: 0.1, dlon: 0.1 },
      { dlat: -0.1, dlon: 0.1 }
    ],
    techStack: ['React', 'Vite', 'CSS3', 'HTML5'],
    features: [
      '3D Canvas Rotating Globe',
      'Interactive Spiral Galaxy',
      'Solar System Skills Orbit',
      'Highly Responsive Layout'
    ],
    liveUrl: 'https://space-portfolio.demo',
    codeUrl: 'https://github.com/GaganKhandale/Space-Portfolio'
  },
  {
    id: 'traffic',
    name: 'Traffic Close Call',
    desc: 'Real-time vehicle close-call detection utilizing YOLO computer vision and vector projections.',
    color: '#a855f7', // Purple/Violet
    lat: 0.4,
    lon: 1.2,
    shape: [
      { dlat: -0.12, dlon: -0.15 },
      { dlat: 0.08, dlon: -0.15 },
      { dlat: 0.15, dlon: 0.1 },
      { dlat: -0.05, dlon: 0.18 }
    ],
    techStack: ['Python', 'PyTorch', 'OpenCV', 'Docker'],
    features: [
      'Real-time Object Detection',
      'Proximity Vector Mapping',
      'Automatic Notification Dispatch',
      'Incident Logs Dashboard'
    ],
    liveUrl: 'https://traffic-yolo.demo',
    codeUrl: 'https://github.com/GaganKhandale/Traffic-Close-Call'
  },
  {
    id: 'expense',
    name: 'Expense Tracker',
    desc: 'A smart personal finance dashboard featuring interactive charts, automated tagging, and budgets.',
    color: '#eab308', // Yellow
    lat: -0.2,
    lon: -1.8,
    shape: [
      { dlat: -0.2, dlon: -0.2 },
      { dlat: 0.2, dlon: -0.1 },
      { dlat: 0.3, dlon: 0.15 },
      { dlat: -0.1, dlon: 0.2 }
    ],
    techStack: ['React', 'Node.js', 'Chart.js', 'CSS3'],
    features: [
      'Interactive Expense Charts',
      'Transaction Categorization',
      'Monthly Budget Limits',
      'Multi-currency Conversion'
    ],
    liveUrl: 'https://expense-tracker.demo',
    codeUrl: 'https://github.com/GaganKhandale/Personal-Expense-Tracker'
  },
  {
    id: 'netflix',
    name: 'Netflix UI Clone',
    desc: 'A pixel-perfect UI clone of Netflix featuring dynamic media trailers and listing integrations.',
    color: '#f97316', // Orange
    lat: -0.5,
    lon: 0.6,
    shape: [
      { dlat: -0.15, dlon: -0.1 },
      { dlat: 0.1, dlon: -0.15 },
      { dlat: 0.15, dlon: 0.1 },
      { dlat: -0.1, dlon: 0.15 }
    ],
    techStack: ['React', 'Tailwind', 'Firebase', 'HTML5'],
    features: [
      'Live Video Trailer Previews',
      'User Profiles & Auth',
      'Dynamic Media Sliders',
      'Watchlist Operations'
    ],
    liveUrl: 'https://netflix-clone.demo',
    codeUrl: 'https://github.com/GaganKhandale/Netflix-HomePage'
  },
  {
    id: 'facial',
    name: 'Facial Emotion Recognition',
    desc: 'Real-time human facial expression classification utilizing deep convolutional neural networks.',
    color: '#ef4444', // Orange/Red
    lat: -0.7,
    lon: 1.5,
    shape: [
      { dlat: -0.1, dlon: -0.1 },
      { dlat: 0.1, dlon: -0.1 },
      { dlat: 0.05, dlon: 0.05 }
    ],
    techStack: ['Python', 'TensorFlow', 'Streamlit', 'Docker'],
    features: [
      'Live Webcam Parsing',
      'Multi-face Tracking',
      'Probability Distribution Maps',
      'Lightweight Streamlit UI'
    ],
    liveUrl: 'https://facial-emotion.demo',
    codeUrl: 'https://github.com/GaganKhandale/Facial-Emotion-Recognition'
  }
];

// Helper to render premium inline SVG logos for tech stacks
const getTechIcon = (techName) => {
  switch (techName.toLowerCase()) {
    case 'next.js':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <circle cx="64" cy="64" r="64" fill="black" />
          <path d="M101.3 103L49.1 36.3H38v55.4h9.2V48.1l45.1 57.5c3.2-2.3 6.2-4.8 9-7.6z" fill="white" />
          <rect x="91" y="36.3" width="9.2" height="55.4" fill="white" />
        </svg>
      );
    case 'node.js':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M64 8L16 35.7v56.6L64 120l48-27.7V35.7L64 8zm38.8 78.9L64 108.3 25.2 86.9V41.1L64 19.7l38.8 21.4v45.8z" fill="#339933" />
          <path d="M64 35.7L36.8 51.4v31.4L64 98.6l27.2-15.7V51.4L64 35.7zm0 13.9l15.2 8.8v17.6L64 84.8l-15.2-8.8V58.4L64 49.6z" fill="#66cc33" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M64 4C64 4 45.4 34.6 45.4 64c0 19.6 12.4 32.8 18.6 36V116h4V100c6.2-3.2 18.6-16.4 18.6-36C86.6 34.6 68 4 68 4h-4z" fill="#13aa52" />
          <path d="M64 4v96c6.2-3.2 18.6-16.4 18.6-36C82.6 34.6 64 4 64 4z" fill="#10aa50" opacity="0.8" />
          <path d="M64 4C64 4 61.2 26 61.2 46.2c0 23.4 2.8 32.2 2.8 32.2V4z" fill="#499768" />
        </svg>
      );
    case 'aws':
      return (
        <svg viewBox="0 0 128 128" fill="none">
          <path d="M57.6 65.6c0-11 8.8-13.8 21.8-13.8v-1.6c0-5-3.2-7.8-10.4-7.8-6 0-12.4 2-17 5.4l-4.4-7.2c6.4-4.8 15.6-7 24-7 16.4 0 24.8 8.8 24.8 23.8V80h-16v-6.6c-4.4 5.2-11.4 8.2-18.4 8.2-11 0-24.4-6.4-24.4-16zm21.8 1.4v-4.4c-9.2 0-13.8 1.6-13.8 6.4 0 3.8 3.4 5.6 7.6 5.6 6.2 0 11-2.8 11.2-7.6z" fill="#ff9900" />
          <path d="M30 96c16 11 40.4 16 68 16 11 0 22.4-1 30-3l-3.4-10c-7.6 1.8-18.2 2.8-28.2 2.8-23.6 0-46.8-5-60.8-14.8L30 96z" fill="#ff9900" />
          <path d="M22 84l12 12-2-18-10 6z" fill="#ff9900" />
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <circle cx="64" cy="64" r="8" fill="#00d8ff" />
          <ellipse cx="64" cy="64" rx="56" ry="18" fill="none" stroke="#00d8ff" strokeWidth="4.5" transform="rotate(30,64,64)" />
          <ellipse cx="64" cy="64" rx="56" ry="18" fill="none" stroke="#00d8ff" strokeWidth="4.5" transform="rotate(90,64,64)" />
          <ellipse cx="64" cy="64" rx="56" ry="18" fill="none" stroke="#00d8ff" strokeWidth="4.5" transform="rotate(150,64,64)" />
        </svg>
      );
    case 'vite':
      return (
        <svg viewBox="0 0 128 128">
          <path d="M116.4 16.4L64 116.4 11.6 16.4h104.8z" fill="url(#viteGrad)" />
          <path d="M64 16.4L116.4 16.4 64 116.4V16.4z" fill="#41B883" opacity="0.2" />
          <path d="M78 8L64 36 50 8H8l56 112 56-112H78z" fill="#BD34FE" />
          <path d="M64 42L76 18H52l12 24z" fill="#FFD600" />
          <defs>
            <linearGradient id="viteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#41B883" />
              <stop offset="100%" stopColor="#35495E" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'css3':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M18 14l10 90 36 10 36-10 10-90H18z" fill="#1572B6" />
          <path d="M64 104.8l27-7.5 7.8-70.3H64v77.8z" fill="#33A9DC" />
          <path d="M64 48H44.6l-1.3-15h41.4l-1-11H31.2l3.8 42H64V48z" fill="white" />
          <path d="M64 74.8l-15.5-4.2-.8-10.6H37.3l1.8 21.6L64 87.2V74.8z" fill="white" />
          <path d="M64 48h22l-2 22.8-20 5.4V87.2l25-6.8 3.5-38.4H64V48z" fill="#EBEBEB" />
          <path d="M83.8 33H64v11h30.8l-1-11z" fill="#EBEBEB" />
        </svg>
      );
    case 'html5':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M18 14l10 90 36 10 36-10 10-90H18z" fill="#E34F26" />
          <path d="M64 104.8l27-7.5 7.8-70.3H64v77.8z" fill="#F06529" />
          <path d="M64 48H44.6l-1.3-15h41.4l-1-11H31.2l3.8 42H64V48z" fill="white" />
          <path d="M64 74.8l-15.5-4.2-.8-10.6H37.3l1.8 21.6L64 87.2V74.8z" fill="white" />
          <path d="M64 48h22l-2 22.8-20 5.4V87.2l25-6.8 3.5-38.4H64V48z" fill="#EBEBEB" />
          <path d="M83.8 33H64v11h30.8l-1-11z" fill="#EBEBEB" />
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M62.6 6.3c-23.7 0-22.1 10.3-22.1 10.3l.1 10.6h22.4v3.1H30.8C19 30.3 19.3 40.6 19.3 40.6l0 12.8c0 11.8 10.3 11.2 10.3 11.2h6.1v-8.3c0-9.9 8.2-18.3 18.2-18.3H78c9.9 0 10.6-8.8 10.6-8.8l-.1-12.6C88.5 12.4 87 6.3 62.6 6.3z" fill="#3776AB" />
          <path d="M65.4 121.7c23.7 0 22.1-10.3 22.1-10.3l-.1-10.6H65v-3.1h32.2c11.8 0 11.5-10.3 11.5-10.3l0-12.8c0-11.8-10.3-11.2-10.3-11.2h-6.1v8.3c0 9.9-8.2 18.3-18.2 18.3H50c-9.9 0-10.6 8.8-10.6 8.8l.1 12.6c0 12.3 1.5 18.4 25.9 18.4z" fill="#FFE015" />
          <circle cx="49" cy="18" r="3" fill="#fff" />
          <circle cx="79" cy="110" r="3" fill="#000" />
        </svg>
      );
    case 'pytorch':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M64 12C35.3 12 12 35.3 12 64c0 28.7 23.3 52 52 52 28.7 0 52-23.3 52-52 0-28.7-23.3-52-52-52zm14.1 63.9L64 88.5l-14.1-12.6 4.3-16.7L64 45.3l9.8 13.9 4.3 16.7z" fill="#EE4C2C" />
        </svg>
      );
    case 'opencv':
      return (
        <svg viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="36" r="24" stroke="#E73827" strokeWidth="12" />
          <circle cx="36" cy="84" r="24" stroke="#009A44" strokeWidth="12" />
          <circle cx="92" cy="84" r="24" stroke="#005CA9" strokeWidth="12" />
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M124 57.5c-.8-3.4-3.6-6-7.3-6h-7.8c-.5 0-1-.2-1.3-.6l-4.7-6.5c-1-1.4-2.8-2.3-4.6-2.3h-7.8v9h7.8l3 4.2c.4.6.8.8 1.4.8h11.3l.8.2.2.8c0 7.8-6.3 14.1-14.1 14.1H26.3c-2.4 0-4.3-2-4.3-4.3V38.6c0-2.4 2-4.3 4.3-4.3H32v-9h-5.7C11.8 25.3 1 36 1 49.3v17.1C1 79.8 11.8 90.6 25.1 90.6H103c11.6 0 21-9.4 21-21v-12.1z" fill="#2496ED" />
          <rect x="38" y="14" width="8" height="8" rx="1" fill="#2496ED" />
          <rect x="48" y="14" width="8" height="8" rx="1" fill="#2496ED" />
          <rect x="58" y="14" width="8" height="8" rx="1" fill="#2496ED" />
          <rect x="38" y="24" width="8" height="8" rx="1" fill="#2496ED" />
          <rect x="48" y="24" width="8" height="8" rx="1" fill="#2496ED" />
          <rect x="58" y="24" width="8" height="8" rx="1" fill="#2496ED" />
          <rect x="68" y="24" width="8" height="8" rx="1" fill="#2496ED" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M37.3 32c-9 16.5-4.5 28.5 13.5 36-18 6-22.5 18-13.5 36 21-3 31.5-15 31.5-36C68.8 45.5 58.3 35 37.3 32zm45 18c-7.5 13.8-3.8 23.8 11.2 30-15 5-18.7 15-11.2 30 17.5-2.5 26.2-12.5 26.2-30C108.5 61.2 99.8 52.5 82.3 50z" fill="#38BDF8" />
        </svg>
      );
    case 'firebase':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M19.7 93.3L32.2 13l9.4 6L19.7 93.3z" fill="#FFC400" />
          <path d="M64 43.1l-18-34.2L19.7 93.3 64 120 108.3 93.3l-13-80.4L64 43.1z" fill="#FFA000" />
          <path d="M64 120L19.7 93.3l44.3-43.1L64 120z" fill="#F57C00" opacity="0.15" />
          <path d="M64 43.1l18-34.2c0 0-14.8-1-24.8 6.4L64 43.1z" fill="#FFC400" />
          <path d="M64 120l44.3-26.7-13-80.4-31.3 30.2L64 120z" fill="#FF7043" />
        </svg>
      );
    case 'tensorflow':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M64 12l45 26v52L64 116 19 90V38l45-26z" fill="#FF6F00" />
          <path d="M64 12v104l45-26V38L64 12z" fill="#FF9100" />
          <path d="M64 46v44l26-15V38L64 46z" fill="#FFE082" />
        </svg>
      );
    case 'streamlit':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <path d="M64 12L12 102h104L64 12zm0 28L92 88H36l28-48z" fill="#FF4B4B" />
        </svg>
      );
    case 'chart.js':
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <rect x="20" y="70" width="20" height="40" rx="2" fill="#FF6384" />
          <rect x="54" y="40" width="20" height="70" rx="2" fill="#36A2EB" />
          <rect x="88" y="15" width="20" height="95" rx="2" fill="#FFCE56" />
        </svg>
      );
    case 'express':
    default:
      return (
        <svg viewBox="0 0 128 128" fill="currentColor">
          <rect x="10" y="10" width="108" height="108" rx="16" fill="#1e293b" />
          <text x="64" y="76" fill="#ffffff" fontSize="40" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">EX</text>
        </svg>
      );
  }
};

const Projects = () => {
  const canvasRef = useRef(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const selectedProjectRef = useRef(null);
  const projectCoordsRef = useRef([]);

  const scrollProgressRef = useRef(0);
  const targetScrollProgressRef = useRef(0);
  const lerpedScrollProgressRef = useRef(0);
  const leftTextRef = useRef(null);
  const rightVisualRef = useRef(null);
  const visualOffsetRef = useRef({ x: 0, y: 0 });

  // Mirror state to a ref to avoid stale closures in the render/event loop
  useEffect(() => {
    selectedProjectRef.current = selectedProjectId;
  }, [selectedProjectId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const parent = canvas.parentElement;
    let width = (canvas.width = (parent ? parent.clientWidth : 500) || 500);
    let height = (canvas.height = (parent ? parent.clientHeight : 500) || 500);

    let rotation = 0; // Current longitude rotation offset (radians)
    const rotationSpeed = 0.003;

    const updateOffsets = () => {
      const containerEl = document.querySelector('.projects-container');
      if (rightVisualRef.current && containerEl) {
        const originalTransform = rightVisualRef.current.style.transform;
        rightVisualRef.current.style.transform = 'none'; // reset to measure untransformed

        const cRect = containerEl.getBoundingClientRect();
        const rRect = rightVisualRef.current.getBoundingClientRect();

        visualOffsetRef.current = {
          x: (rRect.left + rRect.width / 2) - cRect.left,
          y: (rRect.top + rRect.height / 2) - cRect.top
        };

        rightVisualRef.current.style.transform = originalTransform;
      }
    };

    const handleScroll = () => {
      const projectsEl = document.getElementById('projects');
      const contactEl = document.getElementById('contact');
      const containerEl = document.querySelector('.projects-container');
      if (!projectsEl || !contactEl || !containerEl) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight;

      const contactTop = contactEl.getBoundingClientRect().top + scrollTop;
      const startScroll = contactTop - windowHeight;
      const endScroll = document.documentElement.scrollHeight - windowHeight;

      let progress = 0;
      if (endScroll > startScroll) {
        progress = (scrollTop - startScroll) / (endScroll - startScroll);
        progress = Math.min(1, Math.max(0, progress));
      }

      targetScrollProgressRef.current = progress;
      scrollProgressRef.current = progress;

      const isMobile = window.innerWidth <= 768;
      const disableThreshold = isMobile ? 0.35 : 0.05;
      if (progress > disableThreshold) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        if (selectedProjectRef.current !== null) {
          setSelectedProjectId(null);
        }
      }
    };

    updateOffsets();

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const latLines = 6;
    const lonLines = 8;

    const drawGlobe = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const isMobile = window.innerWidth <= 768;
      const globeRadius = Math.min(width, height) * (isMobile ? 0.46 : 0.35);

      const baseGrad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, globeRadius);
      baseGrad.addColorStop(0, '#0a234f');
      baseGrad.addColorStop(0.7, '#030c1d');
      baseGrad.addColorStop(1, '#01050e');
      ctx.fillStyle = baseGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 35;
      ctx.shadowColor = 'rgba(30, 144, 255, 0.4)';
      ctx.strokeStyle = 'rgba(30, 144, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;

      for (let i = 1; i < latLines; i++) {
        const lat = -Math.PI / 2 + (Math.PI * i) / latLines;
        const r = globeRadius * Math.cos(lat);
        const y = cy - globeRadius * Math.sin(lat);

        ctx.beginPath();
        ctx.ellipse(cx, y, r, r * 0.1, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < lonLines; i++) {
        const baseLon = (Math.PI * 2 * i) / lonLines;
        const currentLon = baseLon + rotation;

        ctx.beginPath();
        let first = true;
        for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += 0.1) {
          const z = globeRadius * Math.cos(lat) * Math.cos(currentLon);
          if (z >= 0) {
            const x = cx + globeRadius * Math.cos(lat) * Math.sin(currentLon);
            const y = cy - globeRadius * Math.sin(lat);
            if (first) {
              ctx.moveTo(x, y);
              first = false;
            } else {
              ctx.lineTo(x, y);
            }
          }
        }
        ctx.stroke();
      }

      const visibleCoords = [];

      projectsData.forEach(proj => {
        const currentLon = proj.lon + rotation;
        const cx3D = globeRadius * Math.cos(proj.lat) * Math.sin(currentLon);
        const cy3D = -globeRadius * Math.sin(proj.lat);
        const cz3D = globeRadius * Math.cos(proj.lat) * Math.cos(currentLon);

        if (cz3D > 0) {
          const projX = cx + cx3D;
          const projY = cy + cy3D;

          visibleCoords.push({
            id: proj.id,
            x: projX,
            y: projY,
            project: proj
          });

          ctx.beginPath();
          proj.shape.forEach((v, idx) => {
            const vlat = proj.lat + v.dlat;
            const vlon = proj.lon + v.dlon + rotation;

            const vx = cx + globeRadius * Math.cos(vlat) * Math.sin(vlon);
            const vy = cy - globeRadius * Math.sin(vlat);

            if (idx === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
          });
          ctx.closePath();

          const isSelected = selectedProjectRef.current === proj.id;

          if (isSelected) {
            ctx.fillStyle = proj.color + '66';
            ctx.strokeStyle = proj.color;
            ctx.lineWidth = 2.5;
          } else {
            ctx.fillStyle = proj.color + '26';
            ctx.strokeStyle = proj.color + '88';
            ctx.lineWidth = 1.5;
          }
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(projX, projY, isSelected ? 7 : 4.5, 0, Math.PI * 2);
          ctx.shadowBlur = isSelected ? 20 : 12;
          ctx.shadowColor = proj.color;
          ctx.fillStyle = proj.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.font = isSelected ? '600 16px Inter, sans-serif' : '500 13px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';

          if (isSelected) {
            ctx.fillStyle = proj.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = proj.color;
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
          }

          ctx.fillText(proj.name, projX, projY + 18);
          ctx.shadowBlur = 0;
        }
      });

      projectCoordsRef.current = visibleCoords;
    };

    let lastTime = performance.now();
    const animate = (now) => {
      const dt = Math.min(4, (now - lastTime) / 16.666);
      lastTime = now;

      if (!selectedProjectRef.current) {
        rotation += rotationSpeed * dt;
      }
      drawGlobe();

      const lerpFactor = 1 - Math.pow(1 - 0.15, dt);
      lerpedScrollProgressRef.current = lerpedScrollProgressRef.current + (targetScrollProgressRef.current - lerpedScrollProgressRef.current) * lerpFactor;
      if (Math.abs(targetScrollProgressRef.current - lerpedScrollProgressRef.current) < 0.0001) {
        lerpedScrollProgressRef.current = targetScrollProgressRef.current;
      }

      const lerpedProgress = lerpedScrollProgressRef.current;

      const leftOpacity = Math.max(0, 1 - lerpedProgress / 0.4);
      const leftTranslateY = -lerpedProgress * 120;
      if (leftTextRef.current) {
        leftTextRef.current.style.opacity = leftOpacity;
        leftTextRef.current.style.transform = `translateY(${leftTranslateY}px)`;
        leftTextRef.current.style.pointerEvents = leftOpacity < 0.05 ? 'none' : 'auto';
      }

      if (rightVisualRef.current) {
        rightVisualRef.current.style.transform = 'none';
        rightVisualRef.current.style.opacity = 1;
        rightVisualRef.current.style.pointerEvents = lerpedProgress > 0.50 ? 'none' : 'auto';

        const moonEl = rightVisualRef.current.querySelector('.globe-moon');
        const canvasEl = rightVisualRef.current.querySelector('.globe-canvas');

        const zoomProgress = Math.min(1, lerpedProgress / 0.50);
        const easeInOutCubic = (x) => {
          return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        };
        const easeZoom = easeInOutCubic(zoomProgress);

        if (canvasEl) {
          canvasEl.style.opacity = Math.max(0, 1 - lerpedProgress / 0.40);
        }

        const containerEl = document.querySelector('.projects-container');
        if (moonEl && containerEl) {
          const cRect = containerEl.getBoundingClientRect();
          const canvasCenterX = cRect.left + visualOffsetRef.current.x;
          const canvasCenterY = cRect.top + visualOffsetRef.current.y + 60;

          const moonOffsetX = -192;
          const moonOffsetY = -192;

          const moonCenterX = canvasCenterX + moonOffsetX;
          const moonCenterY = canvasCenterY + moonOffsetY;

          const targetX = window.innerWidth / 2 - moonCenterX;
          const targetY = window.innerHeight / 2 - moonCenterY;

          const W = window.innerWidth;
          const H = window.innerHeight;
          const svgAspect = 1440 / 900;
          const windowAspect = W / H;

          let svgScale = 1;
          if (windowAspect > svgAspect) {
            svgScale = W / 1440;
          } else {
            svgScale = H / 900;
          }

          const footerMoonPx = 220 * 3.8 * svgScale;
          const projectsMoonPx = 76;
          const maxScale = footerMoonPx / projectsMoonPx;
          const moonScale = 1.0 + easeZoom * (maxScale - 1.0);
          const moonOpacity = lerpedProgress > 0.50 ? Math.max(0, 1 - (lerpedProgress - 0.50) / 0.10) : 1;

          moonEl.style.opacity = moonOpacity;

          if (lerpedProgress > 0.01) {
            moonEl.style.animation = 'none';
            moonEl.style.transform = `translate(${targetX * easeZoom}px, ${targetY * easeZoom}px) scale(${moonScale})`;
          } else {
            moonEl.style.animation = '';
            moonEl.style.transform = '';
            moonEl.style.opacity = '';
          }
        }
      }

      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (lerpedProgress > 0.05 && lerpedProgress < 0.95) {
          navbar.style.background = '#020712';
          navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
        } else {
          navbar.style.background = '';
          navbar.style.borderBottom = '';
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(performance.now());

    canvas.addEventListener('mousemove', (e) => {
      const isMobile = window.innerWidth <= 768;
      const disableThreshold = isMobile ? 0.35 : 0.05;
      if (scrollProgressRef.current > disableThreshold) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        if (selectedProjectRef.current !== null) {
          setSelectedProjectId(null);
        }
        canvas.style.cursor = 'default';
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cx = width / 2;
      const cy = height / 2;
      const globeRadius = Math.min(width, height) * (isMobile ? 0.46 : 0.35);

      let closest = null;
      projectsData.forEach(p => {
        const currentLon = p.lon + rotation;
        const cz3D = globeRadius * Math.cos(p.lat) * Math.cos(currentLon);
        if (cz3D > 0) {
          const projX = cx + globeRadius * Math.cos(p.lat) * Math.sin(currentLon);
          const projY = cy - globeRadius * Math.sin(p.lat);

          const vertices = p.shape.map(v => {
            const vlat = p.lat + v.dlat;
            const vlon = p.lon + v.dlon + rotation;
            return {
              x: cx + globeRadius * Math.cos(vlat) * Math.sin(vlon),
              y: cy - globeRadius * Math.sin(vlat)
            };
          });

          let inside = false;
          for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            const xi = vertices[i].x, yi = vertices[i].y;
            const xj = vertices[j].x, yj = vertices[j].y;
            const intersect = ((yi > my) !== (yj > my))
              && (mx < (xj - xi) * (my - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
          }

          const distToCenter = Math.hypot(mx - projX, my - projY);
          if (inside || distToCenter < 15) {
            closest = p;
          }
        }
      });

      if (closest) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        canvas.style.cursor = 'pointer';
        setSelectedProjectId(closest.id);
      } else {
        canvas.style.cursor = 'default';
        if (!hoverTimeoutRef.current) {
          hoverTimeoutRef.current = setTimeout(() => {
            setSelectedProjectId(null);
            hoverTimeoutRef.current = null;
          }, 5000);
        }
      }
    });

    const handleMouseLeave = () => {
      canvas.style.cursor = 'default';
      if (!hoverTimeoutRef.current) {
        hoverTimeoutRef.current = setTimeout(() => {
          setSelectedProjectId(null);
          hoverTimeoutRef.current = null;
        }, 5000);
      }
    };

    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = canvas.width = (parent ? parent.clientWidth : 500) || 500;
      height = canvas.height = (parent ? parent.clientHeight : 500) || 500;
      updateOffsets();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const selectedProject = projectsData.find(p => p.id === selectedProjectId);

  return (
    <section id="projects" className="section">
      <div className="projects-container">

        <div ref={leftTextRef} className="projects-left-text" style={{ transition: 'opacity 0.1s ease-out, transform 0.1s ease-out' }}>
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>
            Earth of My Projects
          </h2>


          {selectedProjectId !== null ? (
            <div
              className="project-detail-card"
              style={{
                '--card-hover-color': (projectsData.find(p => p.id === selectedProjectId) || {}).color,
                '--card-hover-glow': ((projectsData.find(p => p.id === selectedProjectId) || {}).color || '') + '44',
                '--btn-hover-color': selectedProject?.color,
                '--btn-hover-glow': (selectedProject?.color || '') + '44',
              }}
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                  hoverTimeoutRef.current = null;
                }
              }}
              onMouseLeave={() => {
                if (!hoverTimeoutRef.current) {
                  hoverTimeoutRef.current = setTimeout(() => {
                    setSelectedProjectId(null);
                    hoverTimeoutRef.current = null;
                  }, 5000);
                }
              }}
            >
              <div className="project-card-header">
                <h3 className="project-card-title" style={{ color: selectedProject.color }}>
                  {selectedProject.name}
                </h3>
                <button
                  className="project-card-close"
                  onClick={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                      hoverTimeoutRef.current = null;
                    }
                    setSelectedProjectId(null);
                  }}
                  aria-label="Close details"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="project-card-desc">
                {selectedProject.desc}
              </p>

              <div className="project-card-section-title">Tech Stack</div>
              <div className="tech-stack-row">
                {selectedProject.techStack.map((tech) => (
                  <div key={tech} className="tech-stack-card">
                    <div className="tech-icon-wrapper">
                      {getTechIcon(tech)}
                    </div>
                    <span className="tech-name">{tech}</span>
                  </div>
                ))}
              </div>

              <div className="project-actions-row">
                <a
                  href={selectedProject.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-action"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: '2px' }}
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <span>View Code</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="project-placeholder-card">
              <div className="placeholder-icon">
                <Globe size={36} strokeWidth={1.5} />
              </div>
              <h3 className="placeholder-title">Explore My Work</h3>
              <p className="placeholder-text">
                Click on any landmass on the rotating Earth to reveal detailed project files, tech stacks, and source links.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Globe */}
        <div className="projects-right-visual">
          <div ref={rightVisualRef} className="globe-canvas-wrapper" style={{ transition: 'opacity 0.1s ease-out' }}>
            <canvas ref={canvasRef} className="globe-canvas" />
            <div className="globe-moon" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
