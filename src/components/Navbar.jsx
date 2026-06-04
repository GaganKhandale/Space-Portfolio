import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Navbar = ({ activeSection, style, currentView, setView }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      const target = e.target;
      let scrollTop = 0;
      if (target === document) {
        scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      } else if (target) {
        scrollTop = target.scrollTop || 0;
      }
      setIsScrolled(scrollTop > 50);
    };

    document.addEventListener('scroll', handleScroll, true);
    return () => document.removeEventListener('scroll', handleScroll, true);
  }, []);

  const handleNavClick = (sectionId) => {
    if (setView && currentView !== 'main') {
      setView('main');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' }
  ];

  return (
    <nav className={`navbar ${isScrolled || currentView === 'resume' ? 'scrolled' : ''}`} style={style}>
      <div 
        className="logo-container" 
        onClick={() => handleNavClick('home')}
        style={currentView === 'resume' ? { visibility: 'hidden' } : {}}
      >
        <span className="logo-text">G</span>
      </div>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <span
              className={`nav-link ${activeSection === item.id && currentView !== 'resume' ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <button 
        className={`resume-btn ${currentView === 'resume' ? 'active' : ''}`} 
        onClick={() => setView && setView('resume')}
      >
        Resume <ArrowDown size={14} strokeWidth={2.5} />
      </button>
    </nav>
  );
};

export default Navbar;
