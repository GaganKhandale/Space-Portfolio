import React, { useState, useRef } from 'react';
import { Atom, Terminal, Database, Cloud, Rocket, Wrench, Brain, Globe, Server, Layers, Paintbrush } from 'lucide-react';

const Skills = ({ activeSection }) => {
  const visualContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const skillsData = [
    {
      id: 'languages',
      label: 'LANGUAGES',
      icon: <Terminal size={18} strokeWidth={2.5} />,
      class: 'planet-frontend',
      orbitClass: 'solar-orbit-1',
      speedClass: 'orbit-speed-1',
      skills: [
        {
          name: 'JavaScript',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <rect width="24" height="24" fill="#f7df1e" rx="3" />
              <text x="12" y="17" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="#000" textAnchor="middle">JS</text>
            </svg>
          )
        },
        {
          name: 'Java',
          icon: (
            <svg viewBox="0 0 128 128" width="20" height="20">
              <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z" />
              <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z" />
              <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z" />
              <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z" />
              <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z" />
            </svg>
          )
        },
        {
          name: 'Python',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm-1 2.05c1.47-.13 3-.05 4.3.5 1.15.5 1.8 1.5 1.8 2.75v1.2c0 .85-.65 1.5-1.5 1.5H12c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h1.5V4.05zm1 15.9c-1.47.13-3 .05-4.3-.5-1.15-.5-1.8-1.5-1.8-2.75v-1.2c0-.85.65-1.5 1.5-1.5H12c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1H10.5v.95z" fill="#3776ab" />
            </svg>
          )
        },
        {
          name: 'C',
          icon: (
            <svg viewBox="0 0 128 128" width="20" height="20">
              <path fill="#03599C" d="M125 50c-4-32-24-50-62-50C29 0 3 24 3 64c0 39 24 64 64 64 32 0 55-19 58-50H87c-2 11-8 20-20 20-21 0-24-16-24-33 0-23 8-35 22-35 13 0 20 7 22 20z" />
            </svg>
          )
        },
        {
          name: 'CSS',
          icon: (
            <svg viewBox="0 0 128 128" width="20" height="20">
              <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z" />
              <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z" />
              <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z" />
              <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z" />
              <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z" />
              <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z" />
            </svg>
          )
        },
        {
          name: 'Tailwind CSS',
          icon: (
            <svg viewBox="0 0 128 128" width="20" height="20">
              <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8" />
            </svg>
          )
        },
        {
          name: 'HTML',
          icon: (
            <svg viewBox="0 0 128 128" width="20" height="20">
              <path fill="#E44D26" d="M19.037 113.876L9.032 1.627h109.936l-10.016 112.249-45.019 12.48z" />
              <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z" />
              <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.063.017-15.443-4.164-.991-11.007H33.926l1.947 21.999 28.082 7.794.045-.013z" />
              <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.164v14.319l28.101-7.791.207-2.306 3.234-36.148.335-3.851zm0-27.856v13.762h33.244l.276-3.092.628-6.978.331-3.692z" />
            </svg>
          )
        },
        {
          name: 'Vanilla CSS',
          icon: <Paintbrush size={20} color="#1572B6" />
        }
      ]
    },
    {
      id: 'frameworks',
      label: 'FRAMEWORKS & LIBRARIES',
      icon: <Atom size={18} strokeWidth={2.5} />,
      class: 'planet-cloud',
      orbitClass: 'solar-orbit-2',
      speedClass: 'orbit-speed-2',
      skills: [
        {
          name: 'Flutter',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#02569B">
              <path d="M14 2L2 14l3.5 3.5L17.5 7zm4.5 4.5L12 13l3.5 3.5L22 10z" />
            </svg>
          )
        },
        {
          name: 'Flask Microweb',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#4b4b4b">
              <path d="M19 19c-1.3 0-2.4-.8-2.8-2l-2.4-7.2V4c0-1.1.9-2 2-2h-7.6c1.1 0 2 .9 2 2v5.8l-2.4 7.2c-.4 1.2-1.5 2-2.8 2H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
          )
        },
        {
          name: '.Net',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#512bd4">
              <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6a6 6 0 0 1-6 6z" />
            </svg>
          )
        },
        {
          name: 'React',
          icon: <Atom size={20} color="#61DAFB" />
        },
        {
          name: 'Next.js',
          icon: <Layers size={20} color="#FFFFFF" />
        },
        {
          name: 'Vue.js',
          icon: <Globe size={20} color="#42B883" />
        },
        {
          name: 'Node.js',
          icon: <Server size={20} color="#68A063" />
        },
        {
          name: 'NumPy',
          icon: <Brain size={20} color="#4D77CF" />
        },
        {
          name: 'Pandas',
          icon: <Database size={20} color="#150458" />
        },
        {
          name: 'Lucide',
          icon: <Wrench size={20} color="#FF6B6B" />
        }
      ]
    },
    {
      id: 'databases',
      label: 'DATABASES',
      icon: <Database size={18} strokeWidth={2.5} />,
      class: 'planet-backend',
      orbitClass: 'solar-orbit-3',
      speedClass: 'orbit-speed-3',
      skills: [
        {
          name: 'Mongodb',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#13aa52">
              <path d="M12 2C8 6 8 11 8 13c0 2.2 1.8 4 4 4s4-1.8 4-4c0-2-0-7-4-11zm0 18c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" />
            </svg>
          )
        },
        {
          name: 'MySql',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#00758f">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-2h2v-2.5C10 8.01 11.99 6 14.5 6H16v2h-1.5C13.67 8 13 8.67 13 9.5V13h2.5l-.5 2H13v6.8c4.56-.93 8-4.96 8-9.8 0-5.52-4.48-10-10-10z" />
            </svg>
          )
        },
        {
          name: 'NoSQL',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <rect width="24" height="24" fill="#4DB33D" rx="4" />
              <text x="12" y="16" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="8" fill="#ffffff" textAnchor="middle">NoSQL</text>
            </svg>
          )
        }
      ]
    },
    {
      id: 'devops',
      label: 'CLOUD',
      icon: <Rocket size={18} strokeWidth={2.5} />,
      class: 'planet-deployment',
      orbitClass: 'solar-orbit-4',
      speedClass: 'orbit-speed-4',
      skills: [
        {
          name: 'AWS Server',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#ff9900">
              <path d="M12 2a10 10 0 0 0-7.8 16.2L12 11.8l7.8 6.4A10 10 0 0 0 12 2zm6 17H6a1 1 0 0 1-.8-1.6l6-7.4a1 1 0 0 1 1.6 0l6 7.4A1 1 0 0 1 18 19z" />
            </svg>
          )
        },
        {
          name: 'Ubuntu',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#e95420">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="7" cy="14" r="2" />
              <circle cx="17" cy="14" r="2" />
            </svg>
          )
        },
        {
          name: 'Git Source Control',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#f05032">
              <path d="M21.9 11.3l-9.2-9.2c-.4-.4-1-.4-1.4 0l-9.2 9.2c-.4.4-.4 1 0 1.4l9.2 9.2c.4.4 1 .4 1.4 0l9.2-9.2c.4-.4.4-1 0-1.4zM10.9 17.2c-.4-.1-.7-.4-.8-.8-.2-.4-.2-.9 0-1.3.1-.3.4-.6.8-.7V11.2c-.4-.1-.7-.4-.8-.8-.3-.5-.2-1.1.2-1.4.4-.3.9-.3 1.3 0 .4.3.5.9.2 1.4-.1.3-.4.6-.8.7v3.2c.4.1.7.4.8.8.3.5.2 1.1-.2 1.4-.4.2-.8.3-1.1.3zm1.9-3c-.4-.1-.7-.4-.8-.8s.1-1 .5-1.2.9-.1 1.2.3.1.9-.3 1.2c-.2.2-.4.3-.6.3z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'deployment_skills',
      label: 'DEPLOYMENT',
      icon: <Cloud size={18} strokeWidth={2.5} />,
      class: 'planet-database',
      orbitClass: 'solar-orbit-5',
      speedClass: 'orbit-speed-5',
      skills: [
        {
          name: 'Vercel',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff">
              <polygon points="12,2 22,20 2,20" />
            </svg>
          )
        },
        {
          name: 'Docker',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#2496ed">
              <path d="M13.9 11.2h-2.1v2.1h2.1v-2.1zm2.7 0H14.5v2.1h2.1v-2.1zm-8.1 0H6.4v2.1H8.5v-2.1zm2.7 0H9.1v2.1h2.1v-2.1zM6.4 8.5H8.5V10.6H6.4V8.5zm2.7 0h2.1V10.6H9.1V8.5zm2.7 0h2.1V10.6h-2.1V8.5zm2.7 0h2.1V10.6h-2.1V8.5zM23 13.9c-.3 0-.6.1-.9.2-.6-.9-1.5-1.5-2.6-1.5-.2 0-.4 0-.6.1-.4-.6-1-1-1.8-1h-.2c-.3-.9-1.1-1.6-2.1-1.6V9.3h-1v4.8H5.9c-.8 0-1.4.6-1.4 1.4 0 1 .8 1.8 1.8 1.8h12.5c2.4 0 4.4-2 4.4-4.4.1-.4 0-.8-.2-1.1z" />
            </svg>
          )
        },
        {
          name: 'Netlify',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#00C7B7">
              <path d="M12 2L2 12l2.5 2.5L12 7l7.5 7.5L22 12z" />
              <path d="M12 9.5L5.5 16l2.5 2.5L12 14.5l4 4 2.5-2.5z" />
            </svg>
          )
        },
        {
          name: 'GitHub Actions',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#2088ff">
              <path d="M22 11h-3.17c-.41-1.16-1.52-2-2.83-2s-2.42.84-2.83 2H9.83c-.41-1.16-1.52-2-2.83-2s-2.42.84-2.83 2H2v2h3.17c.41 1.16 1.52 2 2.83 2s2.42-.84 2.83-2h3.34c.41 1.16 1.52 2 2.83 2s2.42-.84 2.83-2H22v-2zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm9 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
          )
        },
        {
          name: 'Octopus Deploy',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#0b7a8a">
              <circle cx="12" cy="8" r="4" />
              <path d="M6 14c0 3.3 2.7 6 6 6s6-2.7 6-6h-2c0 2.2-1.8 4-4 4s-4-1.8-4-4H6z" />
              <path d="M4 12a8 8 0 0 1 16 0h-2A6 6 0 0 0 6 12H4z" />
            </svg>
          )
        },
        {
          name: 'Streamlit',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 2L2 19.5h20L12 2z" fill="#FF4B4B" />
              <path d="M7 14l5-9 5 9H7z" fill="#FF8C8C" opacity="0.6" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'tools',
      label: 'TOOLS & UTILITIES',
      icon: <Wrench size={18} strokeWidth={2.5} />,
      class: 'planet-tools',
      orbitClass: 'solar-orbit-6',
      speedClass: 'orbit-speed-6',
      skills: [
        {
          name: 'Jupyter Notebook',
          icon: (
            <svg viewBox="0 0 128 128" width="20" height="20">
              <path d="M109.766 7.281a7.691 7.691 0 01-1.09 4.282 7.583 7.583 0 01-3.262 2.949 7.49 7.49 0 01-4.34.62 7.525 7.525 0 01-3.953-1.913A7.642 7.642 0 0195.137 5a7.606 7.606 0 012.629-3.531 7.509 7.509 0 014.136-1.461 7.51 7.51 0 015.422 1.996 7.627 7.627 0 012.438 5.273zm0 0" fill="#767677" />
              <path d="M65.758 96.79c-20.098 0-37.649-7.364-46.766-18.267a49.95 49.95 0 0018.102 24.254 49.251 49.251 0 0028.676 9.215 49.279 49.279 0 0028.675-9.215 49.917 49.917 0 0018.094-24.254C103.406 89.426 85.855 96.79 65.758 96.79zm0 0M65.75 25.883c20.098 0 37.652 7.367 46.766 18.265a49.95 49.95 0 00-18.102-24.253 49.27 49.27 0 00-28.672-9.22 49.27 49.27 0 00-28.672 9.22A49.909 49.909 0 0018.97 44.148C28.102 33.27 45.652 25.883 65.75 25.883zm0 0" fill="#f37726" />
              <path d="M38.164 117.984a9.671 9.671 0 01-1.371 5.399 9.5 9.5 0 01-9.59 4.504 9.405 9.405 0 01-4.98-2.418 9.671 9.671 0 01-2.809-4.797 9.73 9.73 0 01.313-5.567 9.624 9.624 0 013.328-4.453 9.466 9.466 0 0112.043.688 9.63 9.63 0 013.066 6.648zm0 0" fill="#989798" />
              <path d="M21.285 23.418a5.53 5.53 0 01-3.14-.816 5.627 5.627 0 01-2.618-5.672 5.612 5.612 0 011.407-2.95 5.593 5.593 0 012.789-1.664 5.46 5.46 0 013.238.184 5.539 5.539 0 012.586 1.969 5.66 5.66 0 01-.399 7.129 5.557 5.557 0 01-3.867 1.82zm0 0" fill="#6f7070" />
            </svg>
          )
        },
        {
          name: 'VS Code',
          icon: (
            <svg viewBox="0 0 128 128" width="20" height="20">
              <mask id="vscode-mask" width="128" height="128" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}><path fill="#fff" fillRule="evenodd" d="M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z" clipRule="evenodd" /></mask><g mask="url(#vscode-mask)"><path fill="#0065A9" d="M123.471 13.82 97.097 1.12A7.973 7.973 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.333 5.333 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8.001 8.001 0 0 0-4.529-7.208Z" /><g filter="url(#vscode-filter-b)"><path fill="#007ACC" d="m123.471 114.181-26.374 12.698A7.973 7.973 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.333 5.333 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8.001 8.001 0 0 1-4.529 7.208Z" /></g><g filter="url(#vscode-filter-c)"><path fill="#1F9CF0" d="M97.098 126.882A7.977 7.977 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.977 7.977 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21l-26.369 12.681Z" /></g><path fill="url(#vscode-grad-d)" fillRule="evenodd" d="M90.69 127.126a7.968 7.968 0 0 0 6.349-.244l26.353-12.681a8 8 0 0 0 4.53-7.21V21.009a8 8 0 0 0-4.53-7.21L97.039 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026-21.974-16.68a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.336 5.336 0 0 0-.006 7.888L20.718 64 1.662 81.386a5.335 5.335 0 0 0 .006 7.888l7.048 6.411a5.328 5.328 0 0 0 6.807.303l21.975-16.681 50.45 46.026a7.959 7.959 0 0 0 2.742 1.793Zm5.252-92.184L57.662 64l38.28 29.057V34.943Z" clipRule="evenodd" opacity="0.25" style={{ mixBlendMode: 'overlay' }} /></g><defs><filter id="vscode-filter-b" width="144.744" height="113.408" x="-8.41115" y="22.5944" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4.16667" /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /><feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_36" /><feBlend in="SourceGraphic" in2="effect1_dropShadow_1_36" result="shape" /></filter><filter id="vscode-filter-c" width="56.6667" height="144.007" x="79.6667" y="-8.0035" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4.16667" /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /><feBlend in2="BackgroundImageFix" mode="overlay" result="effect1_dropShadow_1_36" /><feBlend in="SourceGraphic" in2="effect1_dropShadow_1_36" result="shape" /></filter><linearGradient id="vscode-grad-d" x1="63.9222" x2="63.9222" y1="0.329902" y2="127.67" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient></defs>
            </svg>
          )
        },
        {
          name: 'GitHub',
          icon: (
            <svg viewBox="0 0 128 128" width="20" height="20">
              <g fill="#ffffff"><path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" /><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" /></g>
            </svg>
          )
        },
        {
          name: 'Google Colab',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M8 8a4 4 0 1 0 0 8c1.5 0 2.5-1 3.5-2S13 10 14.5 9s2-.5 3.5-.5a4 4 0 1 1 0 8c-1.5 0-2.5-1-3.5-2S13 14 11.5 15s-2 .5-3.5 .5z" fill="none" stroke="url(#colab-grad)" strokeWidth="3.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="colab-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
              </defs>
            </svg>
          )
        },
        {
          name: 'Tableau',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <rect x="11" y="2" width="2" height="20" fill="#e15759" rx="1" />
              <rect x="2" y="11" width="20" height="2" fill="#e15759" rx="1" />
              <g opacity="0.85">
                <rect x="7" y="5" width="2" height="6" fill="#4e79a7" rx="0.5" />
                <rect x="5" y="7" width="6" height="2" fill="#4e79a7" rx="0.5" />
                <rect x="15" y="5" width="2" height="6" fill="#f28e2b" rx="0.5" />
                <rect x="13" y="7" width="6" height="2" fill="#f28e2b" rx="0.5" />
                <rect x="7" y="13" width="2" height="6" fill="#59a14f" rx="0.5" />
                <rect x="5" y="15" width="6" height="2" fill="#59a14f" rx="0.5" />
                <rect x="15" y="13" width="2" height="6" fill="#b07aa1" rx="0.5" />
                <rect x="13" y="15" width="6" height="2" fill="#b07aa1" rx="0.5" />
              </g>
            </svg>
          )
        },
        {
          name: 'PowerBI',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <rect x="4" y="13" width="4" height="7" rx="1" fill="#f2c811" />
              <rect x="10" y="8" width="4" height="12" rx="1" fill="#f2a104" />
              <rect x="16" y="3" width="4" height="17" rx="1" fill="#e27c02" />
            </svg>
          )
        },
        {
          name: 'Postman',
          icon: (
            <svg viewBox="0 0 128 128" width="20" height="20">
              <path fill="#f37036" d="M113.117 26.066C92.168-1.062 53.191-6.07 26.062 14.883c-27.125 20.953-32.128 59.93-11.175 87.055 20.957 27.124 59.937 32.124 87.058 11.167 27.114-20.953 32.118-59.918 11.172-87.039Zm0 0" />
              <path fill="#fff" d="M91.078 24.164a10.038 10.038 0 0 0-5.781 2.426 10.028 10.028 0 0 0-1.54 13.465 10.028 10.028 0 0 0 13.276 2.715h.002v.001l.156.155a10.63 10.63 0 0 0 1.965-1.45A10.341 10.341 0 0 0 99 27.107v-.002l-8.844 8.789-.156-.155 8.844-8.793a10.038 10.038 0 0 0-7.766-2.78zM79.434 38.551c-4.24-.007-11.163 4.799-28.067 21.703l.084.086c-.092-.032-.185-.035-.185-.035l-6.364 6.308a1.035 1.035 0 0 0 .93 1.762l10.914-2.328a.307.307 0 0 0 .092-.17l.242.25-3.72 3.69h-.18l-22.086 22.26 7.086 6.824a1.254 1.254 0 0 0 1.476.149 1.327 1.327 0 0 0 .645-1.356l-1.035-4.5a.534.534 0 0 1 0-.62 117.285 117.285 0 0 0 26.738-17.583l-4.535-4.537.086-.014-2.69-2.689.172-.174.182.186-.094.091 7.137 7.293v-.003c13.68-12.954 23.39-23.367 20.865-30.375a3.83 3.83 0 0 0-1.107-2.208v.004a3.778 3.778 0 0 0-.483-.306c-.083-.088-.156-.178-.244-.264l-.066.066a3.778 3.778 0 0 0-.582-.29l.289-.292c-1.796-1.6-3.28-2.924-5.5-2.93zM30.94 92.21l-5.171 5.172v.004a1.03 1.03 0 0 0-.457 1.125 1.035 1.035 0 0 0 .921.789l12.672.875-7.965-7.965z" />
              <path fill="#f37036" d="M91.95 23.31a11.047 11.047 0 0 0-7.759 3.17 10.988 10.988 0 0 0-2.39 11.641c-4.741-2.03-11.155 1.51-31.106 21.457a.932.932 0 0 0-.037.094 1.242 1.242 0 0 0-.119.062l-6.309 6.364a1.97 1.97 0 0 0-.363 2.324 2.012 2.012 0 0 0 1.707.984l.313-.203 8.424-1.797-4.03 4.067a.873.873 0 0 0-.054.166l-19.75 19.799a.798.798 0 0 0-.192.238l-5.086 5.09a1.967 1.967 0 0 0-.414 2.043 1.995 1.995 0 0 0 1.656 1.265l12.618.88a1.01 1.01 0 0 0 .52-.415.886.886 0 0 0 0-1.035l-.026-.025a2.243 2.243 0 0 0 .705-.58 2.237 2.237 0 0 0 .406-1.876l-.984-4.187a126.725 126.725 0 0 0 26.334-16.861 1.091 1.091 0 0 0 .248.103c.254-.019.492-.128.672-.308 13.55-12.83 21.515-21.622 21.515-28.602a8.03 8.03 0 0 0-.431-2.85 10.957 10.957 0 0 0 3.845.83l-.015.004a11.219 11.219 0 0 0 5.183-1.45.775.775 0 0 0 .004.001.835.835 0 0 0 .617-.055 9.398 9.398 0 0 0 2.07-1.652 10.873 10.873 0 0 0 3.258-7.758 10.873 10.873 0 0 0-3.257-7.758.93.93 0 0 0-.118-.091 11.045 11.045 0 0 0-7.656-3.078zm-.087 1.772a9.27 9.27 0 0 1 5.586 1.914l-8.068 8.117a.84.84 0 0 0-.076.098.83.83 0 0 0-.239.55.832.832 0 0 0 .313.65h.002l6.1 6.1a9.044 9.044 0 0 1-10.028-1.913c-2.586-2.6-3.336-6.504-1.953-9.891 1.383-3.39 4.68-5.605 8.363-5.625zm7.12 3.432a8.87 8.87 0 0 1 2.033 5.674 9.15 9.15 0 0 1-2.688 6.464 9.989 9.989 0 0 1-1.098.895L92.307 36.7l-.963-.963.265-.265 7.373-6.96zm-.366 4.193a.777.777 0 0 0-.55.031.731.731 0 0 0-.36.426.73.73 0 0 0 .05.559 2.226 2.226 0 0 1-.257 2.328.64.64 0 0 0-.195.488c.004.184.07.36.195.492a.58.58 0 0 0 .414 0 .68.68 0 0 0 .672-.207 3.573 3.573 0 0 0 .465-3.777v.004a.777.777 0 0 0-.434-.344zM79.34 39.43a5.584 5.584 0 0 1 3.31 1.226 4.756 4.756 0 0 0-2.681 1.34L57.162 64.701l-4.476-4.476c11.828-11.772 19.06-17.921 23.556-19.936a5.584 5.584 0 0 1 3.098-.86zm3.965 2.96a2.895 2.895 0 0 1 2.043.844 2.786 2.786 0 0 1 .879 2.121 2.869 2.869 0 0 1-.985 2.07l-24.25 21.106-2.617-2.617 22.887-22.68a2.895 2.895 0 0 1 2.043-.843zm2.994 6.698c-1.69 6.702-10.647 15.783-19.987 24.607l-3.777-3.773L86.3 49.088zM51.367 61.547l.274.27 3.513 3.513-9.63 2.06 5.843-5.843zm5.793 5.84.004.004 1.168 1.195a1.086 1.086 0 0 0 .018.084l.078.012.248.254.82.84-5.385.66 3.05-3.05zm3.867 4.076 3.578 3.576A126.992 126.992 0 0 1 38.75 91.695a1.44 1.44 0 0 0-.777 1.653l1.035 4.5a.31.31 0 0 1 0 .363.31.31 0 0 1-.414 0l-6.102-6.152L51.3 72.975l9.728-1.512zm-29.933 21.94.869.814 4.492 4.492-10.016-.648 4.655-4.659z" />
            </svg>
          )
        },
        {
          name: 'REST API',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <rect width="24" height="24" fill="#10b981" rx="5" />
              <text x="12" y="16" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="10" fill="#ffffff" textAnchor="middle">API</text>
            </svg>
          )
        },
        {
          name: 'AWS',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#ff9900">
              <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4.5 10.2c-1.2 1.3-2.8 2-4.5 2s-3.3-.7-4.5-2c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0c.9.9 2.1 1.4 3.4 1.4s2.5-.5 3.4-1.4c.3-.3.8-.3 1.1 0s.3.8 0 1.1z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'ml_ai',
      label: 'ML & AI',
      icon: <Brain size={18} strokeWidth={2.5} />,
      class: 'planet-ml',
      orbitClass: 'solar-orbit-7',
      speedClass: 'orbit-speed-7',
      skills: [
        {
          name: 'Python',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm-1 2.05c1.47-.13 3-.05 4.3.5 1.15.5 1.8 1.5 1.8 2.75v1.2c0 .85-.65 1.5-1.5 1.5H12c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h1.5V4.05zm1 15.9c-1.47.13-3 .05-4.3-.5-1.15-.5-1.8-1.5-1.8-2.75v-1.2c0-.85.65-1.5 1.5-1.5H12c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1H10.5v.95z" fill="#3776ab" />
            </svg>
          )
        },
        {
          name: 'OpenCV',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <circle cx="12" cy="12" r="10" fill="none" stroke="#5C3EE8" strokeWidth="2" />
              <circle cx="7" cy="10" r="2.5" fill="#5C3EE8" />
              <circle cx="17" cy="10" r="2.5" fill="#5C3EE8" />
              <path d="M7 15c1.5 2.5 8.5 2.5 10 0" fill="none" stroke="#E8533E" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )
        },
        {
          name: 'CNN',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <rect width="24" height="24" fill="#7c3aed" rx="4" />
              <text x="12" y="16" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="9" fill="#ffffff" textAnchor="middle">CNN</text>
            </svg>
          )
        },
        {
          name: 'Deep Learning',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <circle cx="5" cy="6" r="1.5" fill="#a78bfa" />
              <circle cx="5" cy="12" r="1.5" fill="#a78bfa" />
              <circle cx="5" cy="18" r="1.5" fill="#a78bfa" />
              <circle cx="12" cy="4" r="1.5" fill="#7c3aed" />
              <circle cx="12" cy="9" r="1.5" fill="#7c3aed" />
              <circle cx="12" cy="14" r="1.5" fill="#7c3aed" />
              <circle cx="12" cy="19" r="1.5" fill="#7c3aed" />
              <circle cx="19" cy="8" r="1.5" fill="#4c1d95" />
              <circle cx="19" cy="16" r="1.5" fill="#4c1d95" />
              <line x1="5" y1="6" x2="12" y2="4" stroke="#a78bfa" strokeWidth="0.8" opacity="0.7" />
              <line x1="5" y1="6" x2="12" y2="9" stroke="#a78bfa" strokeWidth="0.8" opacity="0.7" />
              <line x1="5" y1="12" x2="12" y2="9" stroke="#a78bfa" strokeWidth="0.8" opacity="0.7" />
              <line x1="5" y1="12" x2="12" y2="14" stroke="#a78bfa" strokeWidth="0.8" opacity="0.7" />
              <line x1="5" y1="18" x2="12" y2="14" stroke="#a78bfa" strokeWidth="0.8" opacity="0.7" />
              <line x1="5" y1="18" x2="12" y2="19" stroke="#a78bfa" strokeWidth="0.8" opacity="0.7" />
              <line x1="12" y1="4" x2="19" y2="8" stroke="#7c3aed" strokeWidth="0.8" opacity="0.7" />
              <line x1="12" y1="9" x2="19" y2="8" stroke="#7c3aed" strokeWidth="0.8" opacity="0.7" />
              <line x1="12" y1="14" x2="19" y2="16" stroke="#7c3aed" strokeWidth="0.8" opacity="0.7" />
              <line x1="12" y1="19" x2="19" y2="16" stroke="#7c3aed" strokeWidth="0.8" opacity="0.7" />
            </svg>
          )
        },
        {
          name: 'Computer Vision',
          icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="#06b6d4" strokeWidth="2" fill="none" />
              <circle cx="12" cy="12" r="3" fill="#06b6d4" />
              <circle cx="12" cy="12" r="1.2" fill="#0e7490" />
            </svg>
          )
        }
      ]
    }
  ];

  const handlePlanetMouseEnter = (e, planet) => {
    setIsPaused(true);
    if (visualContainerRef.current) {
      const parentRect = visualContainerRef.current.getBoundingClientRect();
      const planetRect = e.currentTarget.getBoundingClientRect();

      const skillsCount = planet.skills.length;
      let popupWidth = 160;
      let popupHeight = 160;

      if (skillsCount <= 2) {
        popupWidth = 140;
        popupHeight = 45;
      } else if (skillsCount === 3) {
        popupWidth = 200;
        popupHeight = 45;
      } else if (skillsCount <= 6) {
        popupWidth = 230;
        popupHeight = 82;
      } else {
        popupWidth = 240;
        popupHeight = 120;
      }
      const halfWidth = popupWidth / 2;

      // Center horizontally above the planet
      let x = planetRect.left - parentRect.left + planetRect.width / 2;
      let y = planetRect.top - parentRect.top - 8;

      // Clamp x to prevent left/right overflow
      x = Math.max(halfWidth, Math.min(parentRect.width - halfWidth, x));

      // Flip to bottom if it overflows the top of the container
      if (y - popupHeight < 10) {
        y = planetRect.bottom - parentRect.top + 8 + popupHeight;
      }

      setPopupData({
        label: planet.label,
        skills: planet.skills,
        x,
        y
      });
    }
  };

  const handlePlanetMouseLeave = () => {
    setIsPaused(false);
    setPopupData(null);
  };

  const sections = ['home', 'about', 'skills', 'projects', 'contact'];

  return (
    <section id="skills" className="section" style={{ overflow: 'hidden' }}>
      <div className="skills-container">

        {/* Left Visual: Solar System */}
        <div ref={visualContainerRef} className="skills-left-visual">
          <div className={`solar-system ${isPaused ? 'paused' : ''}`}>

            {/* The Sun */}
            <div className="solar-sun" />

            {/* Planet Orbits and Planet Nodes */}
            {skillsData.map((planet) => (
              <div key={planet.id}>
                {/* Orbit Line */}
                <div className={`solar-orbit ${planet.orbitClass}`} />

                {/* Planet Rotation Wrapper */}
                <div className={`solar-planet-wrapper ${planet.orbitClass} ${planet.speedClass}`}>
                  <div
                    className={`solar-planet`}
                    onMouseEnter={(e) => handlePlanetMouseEnter(e, planet)}
                    onMouseLeave={handlePlanetMouseLeave}
                  >
                    {/* Planet Circle */}
                    <div className={`planet-sphere ${planet.class}`}>
                      {planet.icon}
                    </div>
                    {/* Planet Text Label */}
                    <span className="planet-label">{planet.label}</span>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* Hover Skills Tooltip Popup Card */}
          {popupData && (
            <div
              className="skills-popup"
              style={{
                left: `${popupData.x}px`,
                top: `${popupData.y}px`,
              }}
            >
              <div className="skills-popup-content">
                <div className="skills-popup-grid">
                  {popupData.skills.map((skill, index) => (
                    <div key={index} className="skills-popup-item">
                      <span className="skills-popup-logo">{skill.icon}</span>
                      <span className="skills-popup-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Text Content */}
        <div className="skills-text-content">
          <h2 className="skills-heading">
            I turn ideas into reality using <span>code.</span>
          </h2>
          <p className="skills-subhead">Welcome to my skills solar system..</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Hover over the orbiting planets to explore my technical skills. Each orbit represents a core domain of my engineering expertise, from interactive frontend interfaces to data analytics and AI.
          </p>
        </div>

      </div>

      {/* Slide Navigation Indicator at Bottom */}
      <div className="slider-dots">
        {sections.map((sec, idx) => (
          <div
            key={sec}
            className={`slider-dot ${activeSection === sec ? 'active' : ''}`}
            onClick={() => {
              const element = document.getElementById(sec);
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
