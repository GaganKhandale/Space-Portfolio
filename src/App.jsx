import React, { useState, useEffect, Suspense, lazy } from 'react';
import StarryBackground from './components/StarryBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

const ResumePage = lazy(() => import('./components/ResumePage'));
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentView, setView] = useState('main');

  // Synchronize browser hash changes with React view state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#resume') {
        setView('resume');
      } else {
        setView('main');
        if (hash) {
          const sectionId = hash.substring(1);
          if (['home', 'about', 'skills', 'projects', 'contact'].includes(sectionId)) {
            setTimeout(() => {
              const element = document.getElementById(sectionId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          }
        }
      }
    };

    // Handle initial hash on page load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash when view state changes
  useEffect(() => {
    if (currentView === 'resume') {
      if (window.location.hash !== '#resume') {
        window.location.hash = 'resume';
      }
    } else {
      if (window.location.hash === '#resume') {
        window.location.hash = '';
      }
    }
  }, [currentView]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => {
      if (currentView !== 'main') return;
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      let currentSection = 'home';
      const midpoint = window.innerHeight / 2; // Midpoint of the screen

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the midpoint of the screen is within the vertical boundaries of this section
          if (rect.top <= midpoint && rect.bottom >= midpoint) {
            currentSection = id;
            break;
          }
        }
      }

      // Map the 'skills' section to highlight 'about' in the navbar
      if (currentSection === 'skills') {
        setActiveSection('about');
      } else {
        setActiveSection(currentSection);
      }
    };

    // Use capture phase (true) to intercept scrolls on any scrollable container on the page
    document.addEventListener('scroll', handleScroll, true);
    handleScroll(); // Trigger initially

    return () => document.removeEventListener('scroll', handleScroll, true);
  }, [currentView]);

  return (
    <div className="app-container">
      {/* Canvas space background */}
      <StarryBackground />

      {/* Nav navigation */}
      <Navbar activeSection={activeSection} currentView={currentView} setView={setView} />

      {/* Right side fixed socials */}
      <div className="social-sidebar">
        <a href="https://linkedin.com/in/gagan-khandale" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href="https://github.com/gagankhandale" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
        <a href="https://instagram.com/gagan.khandale" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="https://wa.me/917219495242" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" fill="currentColor" />
          </svg>
        </a>
      </div>

      {currentView === 'resume' ? (
        <Suspense fallback={<div className="loading-fallback">LOADING SECURE PROTOCOLS...</div>}>
          <ResumePage setView={setView} />
        </Suspense>
      ) : (
        <>
          {/* Core sections */}
          <Hero onConnectClick={() => setIsContactModalOpen(true)} />
          <About />
          <Skills activeSection={activeSection} />
          <Projects />
          <Contact isModalOpen={isContactModalOpen} setIsModalOpen={setIsContactModalOpen} />
        </>
      )}
      <Analytics />
      <SpeedInsights />
    </div>

  );

}

export default App;
