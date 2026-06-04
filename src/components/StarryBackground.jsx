import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star configuration
    const numStars = Math.floor((width * height) / 1800); // increased density
    const stars = [];
    
    // Nebula configuration
    const nebulae = [
      { x: width * 0.2, y: height * 0.3, r: Math.min(width, height) * 0.4, color: 'rgba(104, 34, 139, 0.08)' },
      { x: width * 0.8, y: height * 0.7, r: Math.min(width, height) * 0.5, color: 'rgba(30, 144, 255, 0.06)' }
    ];

    // Shooting star configuration
    const shootingStars = [];

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8, // slightly larger max size
        twinkleSpeed: 0.035 + Math.random() * 0.075, // faster twinkling speed
        phase: Math.random() * Math.PI * 2
      });
    }

    const drawStars = (dt) => {
      ctx.fillStyle = '#020613';
      ctx.fillRect(0, 0, width, height);

      // Draw Nebulae
      nebulae.forEach(neb => {
        const grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.r);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // Draw normal stars
      ctx.fillStyle = '#ffffff';
      stars.forEach(star => {
        star.phase += star.twinkleSpeed * dt;
        const alpha = 0.3 + (Math.sin(star.phase) + 1) * 0.35; // twinkle between 0.3 and 1.0
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      // Handle shooting stars with rate-independent probability
      const spawnProbability = 0.03 * dt;
      if (Math.random() < spawnProbability && shootingStars.length < 15) {
        const slope = 0.35; // diagonal slope y/x
        const speed = 7 + Math.random() * 8;
        shootingStars.push({
          x: Math.random() * (width + 400) - 200,
          y: Math.random() * (height * 0.5) - 200,
          len: 50 + Math.random() * 80,
          dx: speed,
          dy: speed * slope,
          alpha: 1.0,
          fade: 0.012 + Math.random() * 0.015
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const sStar = shootingStars[i];

        // Draw the glowing tail (gradient from cyan-teal to transparent)
        const grad = ctx.createLinearGradient(
          sStar.x, sStar.y, 
          sStar.x - sStar.len, sStar.y - sStar.len * 0.35
        );
        grad.addColorStop(0, `rgba(0, 223, 192, ${sStar.alpha})`);
        grad.addColorStop(1, 'rgba(0, 223, 192, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(sStar.x, sStar.y);
        ctx.lineTo(sStar.x - sStar.len, sStar.y - sStar.len * 0.35);
        ctx.stroke();

        // Draw a glowing outer circle instead of slow CPU-based shadowBlur
        ctx.beginPath();
        ctx.arc(sStar.x, sStar.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 223, 192, ${sStar.alpha * 0.4})`;
        ctx.fill();

        // Draw the bright white head dot
        ctx.beginPath();
        ctx.arc(sStar.x, sStar.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        sStar.x += sStar.dx * dt;
        sStar.y += sStar.dy * dt;
        sStar.alpha -= sStar.fade * dt;

        if (sStar.alpha <= 0) {
          shootingStars.splice(i, 1);
        }
      }
    };

    let lastTime = performance.now();
    const animate = (now) => {
      const dt = Math.min(4, (now - lastTime) / 16.666);
      lastTime = now;
      drawStars(dt);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(performance.now());

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Update nebulae on resize
      nebulae[0].x = width * 0.2;
      nebulae[0].y = height * 0.3;
      nebulae[0].r = Math.min(width, height) * 0.4;
      nebulae[1].x = width * 0.8;
      nebulae[1].y = height * 0.7;
      nebulae[1].r = Math.min(width, height) * 0.5;

      // Re-populate stars for new dimensions
      stars.length = 0;
      const newNumStars = Math.floor((width * height) / 1800); // increased density
      for (let i = 0; i < newNumStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8, // slightly larger max size
          twinkleSpeed: 0.035 + Math.random() * 0.075, // faster twinkling speed
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default StarryBackground;
