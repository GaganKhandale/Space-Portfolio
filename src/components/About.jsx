import React, { useEffect, useRef } from 'react';
import { Smartphone, Monitor, Cloud } from 'lucide-react';

const About = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId;
    const parent = canvas.parentElement;
    let width = (canvas.width = (parent ? parent.clientWidth : 500) || 500);
    let height = (canvas.height = (parent ? parent.clientHeight : 500) || 500);

    // Particle system configuration
    const numParticles = 400;
    const particles = [];
    const arms = 3;
    const tilt = 0.35; // Tilt factor (vertical squishing)
    const rotationAngle = -0.5; // Galaxy tilt in the 2D plane (radians)

    // Generate galaxy particles
    for (let i = 0; i < numParticles; i++) {
      const arm = i % arms;
      const progress = Math.random(); // Distance from center
      const r = progress * (Math.min(width, height) * 0.45) + 10;
      
      // Spiral math: theta = r * spiralFactor + armOffset
      const theta = r * 0.05 + (arm * (Math.PI * 2)) / arms + (Math.random() - 0.5) * 0.35;
      
      // Speed inversely proportional to radius (keplerian-like rotation)
      const speed = 0.005 + (0.015 / (r * 0.01 + 0.5));
      
      // Select color based on distance
      let color;
      if (progress < 0.28) {
        // Yellow core
        color = `rgba(255, 220, 100, ${0.4 + Math.random() * 0.5})`;
      } else if (progress < 0.6) {
        // Teal middle
        color = `rgba(0, 223, 192, ${0.3 + Math.random() * 0.4})`;
      } else {
        // Purple outer
        color = `rgba(168, 85, 247, ${0.2 + Math.random() * 0.3})`;
      }

      particles.push({
        r,
        theta,
        speed,
        size: 0.8 + Math.random() * 1.5,
        color
      });
    }

    const drawGalaxy = (dt) => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width < 768 ? width / 2 : width / 2 + 60; // Centered on mobile, shifted right on desktop
      const cy = height / 2;

      // Draw dashed orbit rings (tilted)
      ctx.strokeStyle = 'rgba(0, 223, 192, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      
      const orbitRadii = [80, 130, 180];
      orbitRadii.forEach(or => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, or, or * tilt, rotationAngle, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]); // Reset line dash

      // Draw particles
      particles.forEach(p => {
        p.theta += p.speed * dt; // rotate
        
        // Coordinates relative to center
        let x = p.r * Math.cos(p.theta);
        let y = p.r * Math.sin(p.theta) * tilt;

        // Rotate coordinates by rotationAngle
        const rx = x * Math.cos(rotationAngle) - y * Math.sin(rotationAngle);
        const ry = x * Math.sin(rotationAngle) + y * Math.cos(rotationAngle);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(cx + rx, cy + ry, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw core glow (optimized to run once outside the loop and made larger)
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55);
      grad.addColorStop(0, 'rgba(255, 230, 150, 0.9)');
      grad.addColorStop(0.2, 'rgba(255, 210, 120, 0.7)');
      grad.addColorStop(0.5, 'rgba(255, 180, 80, 0.35)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fill();
    };

    let lastTime = performance.now();
    const animate = (now) => {
      const dt = Math.min(4, (now - lastTime) / 16.666);
      lastTime = now;
      drawGalaxy(dt);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(performance.now());

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = canvas.width = (parent ? parent.clientWidth : 500) || 500;
      height = canvas.height = (parent ? parent.clientHeight : 500) || 500;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="about" className="section">
      <div className="about-container">
        <div className="about-text-content">
          <h2 className="section-title">About me</h2>
          <p className="about-para">
            I love exploring new technologies, improving user experiences, and
            building projects that solve meaningful problems. Whether it's
            developing intelligent systems, crafting smooth interfaces, or
            optimizing performance, I'm always focused on creating products that
            people genuinely enjoy using.
          </p>

          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Completed Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">90%</span>
              <span className="stat-label">Client satisfaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years of experience</span>
            </div>
          </div>
        </div>

        <div className="about-graphic-container">
          <canvas ref={canvasRef} className="galaxy-canvas" />

          {/* Interactive Galaxy Nodes */}
          <div className="galaxy-node node-frontend">
            <div className="node-icon-wrapper">
              <Smartphone size={18} />
            </div>
            <div className="node-text">
              <span className="node-title">Frontend Development</span>
              <span className="node-desc">Crafting clean, interactive and accessible interfaces.</span>
            </div>
          </div>

          <div className="galaxy-node node-website">
            <div className="node-icon-wrapper">
              <Monitor size={18} />
            </div>
            <div className="node-text">
              <span className="node-title">Website Development</span>
              <span className="node-desc">Building responsive and high-performance websites.</span>
            </div>
          </div>

          <div className="galaxy-node node-hosting">
            <div className="node-icon-wrapper">
              <Cloud size={18} />
            </div>
            <div className="node-text">
              <span className="node-title">Website Hosting</span>
              <span className="node-desc">Fast, secure and reliable hosting solutions.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
