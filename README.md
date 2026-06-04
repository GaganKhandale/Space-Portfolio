# Space-Themed Interactive Developer Portfolio 🚀✨

An immersive, futuristic, and highly interactive space-themed developer portfolio built with React, Vite, and custom CSS/SVG animation systems. The site combines modern engineering with cosmic aesthetics—featuring orbital skill systems, responsive coordinates-aligned lighting paths, customized SVG filter glow systems, and smooth hardware-accelerated layouts.

---

## 🌌 Key Features

### 1. **Cosmic Solar System Skill Orbitals**
*   An interactive solar system represents key skill disciplines (Frontend, Backend, Databases, Cloud) orbiting a high-intensity glowing Sun.
*   Each planet revolves at customized speeds and displays a sleek interactive popup grid of specific technologies on hover.
*   Hover states scale the planets and highlight their orbital tracks dynamically.

### 2. **Interactive Mountain Observatory Contact Page**
*   A responsive, vector-based observatory landscape that dynamically fades in and animates based on scroll progression.
*   Features a winding path to the observatory framed by low-poly pine tree silhouettes.
*   **Dual-Zone Custom Lighting**:
    *   **Border-Aligned Path Lights**: 12 glowing path markers mathematically positioned directly along the Bezier curve boundaries of the path, pulsing in sync on an infinite loop.
    *   **High-Intensity House Lights**: The observatory dome windows and door project an intense, warm glow powered by a custom multi-stage layered SVG Gaussian blur filter (`#glow-house`) designed to simulate a volumetric light source.

### 3. **Immersive Resume Interface (`#resume` route)**
*   A dedicated viewport overlay containing a realistic vector-designed rotating Earth (with oceans, continent shapes, and 3D spherical shading) spinning clockwise under a volumetric highlight.
*   Equipped with a custom sci-fi Diagnostic HUD that frames the layout with real-time status diagnostics, system clock counters, and active indicators.
*   Hides native browser PDF chrome for a clean integration and utilizes flex-shrink overrides to enable smooth page scrollbars.

### 4. **Responsive Navigation & Hash-Based Routing**
*   A custom navigation bar with absolute horizontal centering of main links (`Home`, `About`, `Projects`).
*   Built-in listener synchronizing `window.location.hash` (`#resume`) to React state—enabling direct linking, reloading preservation, and standard browser back/forward history tracking.

---

## 🛠️ Tech Stack

*   **Frontend Library**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite 8](https://vite.dev/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Animations**: Custom CSS Keyframes, SVG Filter Effects (`feGaussianBlur`, `feMerge`), and HTML Canvas systems.
*   **Styling**: Responsive Vanilla CSS using modern Variables, HSL color space palettes, and hardware-accelerated GPU layer promotions (`transform: translate3d`).

---

## 📂 Project Structure

```bash
space/
├── public/                 # Static assets (Resume PDF, icons)
├── src/
│   ├── assets/             # Images, local graphics
│   ├── components/         # Reusable structural components
│   │   ├── About.jsx       # About Section & Interactive Galaxy Canvas
│   │   ├── Contact.jsx     # Contact Section with Observatory Landscape & Form
│   │   ├── Hero.jsx        # Landing Hero with bobbing planet animations
│   │   ├── Navbar.jsx      # Navigation bar & links
│   │   ├── Projects.jsx    # Projects display and grids
│   │   ├── ResumePage.jsx  # Diagnostic HUD, rotating vector Earth, & PDF Viewer
│   │   ├── Skills.jsx      # Solar skill system orbital tracks
│   │   └── StarryBackground.jsx # Dynamic canvas particle stars background
│   ├── App.jsx             # Hash-routing system and view state orchestrator
│   ├── App.css             # Main utility styles
│   ├── index.css           # Core styling system, HUD overlays, animations
│   └── main.jsx            # Application entrypoint
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite configuration
```

---

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have Node.js installed on your system.

### 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GaganKhandale/space-portfolio.git
   cd space-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser to view the portfolio.

### 📦 Production Build

To build the static assets for production deployment:
```bash
npm run build
```
This generates optimized JS, CSS, and HTML assets in the `/dist` directory, ready to be hosted on platforms like Vercel, Netlify, or GitHub Pages.

---

## 📜 SVG Filter Math Details

To prevent visual clipping, all glowing components leverage an expanded bounding filter box:
```xml
<filter id="glow-window" x="-200%" y="-200%" width="500%" height="500%">
  <!-- Expanded bounds ensure wide blurs do not truncate at element edges -->
</filter>
```
The path lights use standard dual-stage blurs to generate a soft halo. The observatory lights use a high-energy stacked filter (`glow-house`) merging multiple blurred copies of the source graphics at `6px`, `3px`, and `1px` deviations to create a warm glowing depth.
