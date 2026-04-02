'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { sendContactEmail } from './actions';

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface Project {
  name: string;
  date: string;
  stack: string;
  desc: string;
  tags: string[];
  github: string;
  youtube?: string;
  link: string;
  thumbnail?: string;
}

const PROJECTS: Project[] = [
  {
    name: 'Java Code Refactoring Engine',
    date: 'Jan 2026 – Apr 2026',
    stack: 'Java · JavaParser · JUnit 5 · Maven',
    desc: 'AST-based analysis engine detecting 5+ code smell categories across 1,000+ LOC codebases. Rule-based transformation engine applies SOLID principles to autonomously refactor code, achieving 90%+ refactor-rate while preserving semantics. Validated with a 20-case JUnit 5 suite and 75% PIT mutation score.',
    tags: ['Java', 'JavaParser', 'JUnit 5'],
    github: '#',
    youtube: '#',
    link: '#',
  },
  {
    name: 'Heal I/O — Chronic Illness Health Tracker',
    date: 'Feb 2026 – Mar 2026',
    stack: 'React · Node.js · Express.js · MongoDB · Passport.js · Socket.io',
    desc: 'Full-stack chronic illness tracker with Passport.js session auth, 5 MongoDB collections, and full CRUD — validated by 20+ real users. Client-side analytics engine computes sleep-pain correlations across 7/30/90-day trends with 7 interactive visualizations and exportable PDF health reports.',
    tags: ['React', 'MongoDB', 'Socket.io'],
    github: '#',
    youtube: '#',
    link: '#',
  },
  {
    name: 'AlgoLearn — Algorithm Learning Platform',
    date: 'Dec 2025 – Feb 2026',
    stack: 'Node.js · Express.js · MongoDB · JavaScript · HTML5 Canvas API · RESTful APIs',
    desc: 'Full-stack algorithm learning platform deployed on Render with Canvas-based visualizations for 4 sorting algorithms, real-time playback controls, and complexity analysis. REST API with Express.js and MongoDB handling quiz submission and progress tracking.',
    tags: ['Node.js', 'MongoDB', 'Canvas'],
    github: '#',
    youtube: '#',
    link: '#',
  },
  {
    name: 'Personal Portfolio Website',
    date: 'Jan 2026 – Mar 2026',
    stack: 'Next.js · TypeScript · CSS · Vercel',
    desc: 'Fully custom portfolio website built from scratch with Next.js and TypeScript. Features an animated hero section, interactive solar system tech stack visualization, a timeline-based journey section, project modals, a contact form with server actions, and a dark/light mode toggle — all with smooth animations and a cohesive design system.',
    tags: ['Next.js', 'TypeScript', 'CSS'],
    github: '#',
    link: '#',
  },
  {
    name: 'Cervical Cancer Risk Classifier',
    date: 'Oct 2022',
    stack: 'Python · Jupyter · scikit-learn · IBM zSystems LinuxONE',
    desc: 'First-place IBM datathon project (Team Byte Me, PES University). ML model that classifies cervical cancer risk level using non-invasive questionnaire responses — no medical testing required. Trained on the Kaggle cervical cancer risk factors dataset with the goal of making early screening accessible.',
    tags: ['Python', 'ML', 'IBM'],
    github: 'https://github.com/shriyays/Cervical_Cancer-Byte_Me-128',
    link: '#',
  },
  {
    name: 'PriceScout — Used Car Price Recommender',
    date: 'May 2023 – Jan 2024',
    stack: 'Python · Flask · BeautifulSoup · scikit-learn · Jupyter · HTML/CSS/JS',
    desc: 'Web app that recommends optimal resale prices for used cars by combining live web scraping of marketplace listings with ML-based price modeling. Users input a car description; the system scrapes similar listings, preprocesses the data, and returns a data-driven price estimate.',
    tags: ['Python', 'Flask', 'scikit-learn'],
    github: 'https://github.com/shriyays/Price_Scout',
    link: '#',
  },
  {
    name: "Conway's Game of Life",
    date: 'Feb 2026',
    stack: 'React · TypeScript · Vite · CSS',
    desc: 'Interactive browser-based simulation of Conway\'s Game of Life built with React and TypeScript. Features play/pause/step controls, adjustable simulation speed, a resizable grid, and quick-load classic patterns (gliders, oscillators, still lifes). Clean UI with live cell-count stats.',
    tags: ['React', 'TypeScript', 'Vite'],
    github: 'https://github.com/shriyays/Conways_Game_of_Life',
    link: '#',
  },
  {
    name: 'Road Traffic Sign Detector',
    date: 'Aug 2023',
    stack: 'Python · TensorFlow · Keras · CNN · Tkinter',
    desc: 'Deep learning classifier that identifies German road traffic signs from the GTSRB dataset using a custom CNN trained with TensorFlow/Keras. Includes a Tkinter GUI for real-time image upload and prediction. Achieves high accuracy across 43 sign categories.',
    tags: ['Python', 'TensorFlow', 'CNN'],
    github: 'https://github.com/shriyays/Road-Traffic-Sign-Detector',
    link: '#',
  },
];

interface SolarRing { r: number; speed: number; tx: number; ty: number; tz: number; planets: string[]; }
interface SolarSystem { label: string; sunClass: string; rings: SolarRing[]; }

const SOLAR_SYSTEMS: SolarSystem[] = [
  {
    label: 'Languages', sunClass: 'sun-yellow',
    rings: [
      { r: 78,  speed: 16, tx: 65,  ty: 0,  tz: 15,  planets: ['Python', 'Java', 'Rust'] },
      { r: 122, speed: 27, tx: 20,  ty: 55, tz: -10, planets: ['JavaScript', 'TypeScript', 'C/C++'] },
      { r: 160, speed: 40, tx: 78,  ty: 25, tz: 5,   planets: ['SQL', 'C#'] },
    ],
  },
  {
    label: 'Backend', sunClass: 'sun-orange',
    rings: [
      { r: 88,  speed: 18, tx: 30,  ty: 70, tz: 20,  planets: ['Node.js', 'FastAPI', 'Docker'] },
      { r: 136, speed: 31, tx: 60,  ty: 10, tz: -25, planets: ['Spring Boot', 'Redis', 'AWS'] },
      { r: 155, speed: 48, tx: 15,  ty: 45, tz: 35,  planets: ['CI/CD', 'Linux'] },
    ],
  },
  {
    label: 'Frontend & DB', sunClass: 'sun-blue',
    rings: [
      { r: 82,  speed: 15, tx: 72,  ty: 20, tz: -15, planets: ['React', 'Next.js', 'Tailwind'] },
      { r: 128, speed: 26, tx: 35,  ty: 60, tz: 10,  planets: ['PostgreSQL', 'MongoDB', 'MySQL'] },
      { r: 168, speed: 39, tx: 50,  ty: 40, tz: -30, planets: ['HTML/CSS', 'Streamlit'] },
    ],
  },
  {
    label: 'AI / ML', sunClass: 'sun-purple',
    rings: [
      { r: 72,  speed: 14, tx: 45,  ty: 15, tz: 25,  planets: ['LangGraph', 'PyTorch', 'TensorFlow'] },
      { r: 112, speed: 23, tx: 70,  ty: 50, tz: -5,  planets: ['OpenAI API', 'scikit-learn', 'Agentic AI'] },
      { r: 148, speed: 35, tx: 20,  ty: 30, tz: -20, planets: ['Selenium', 'JavaParser'] },
    ],
  },
];

export default function Portfolio() {
  const [avatarSrc, setAvatarSrc] = useState<string | null>('/photo.jpg');
  const [photoOpen, setPhotoOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [formMsg, setFormMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const gcRefs = useRef<(HTMLElement | null)[]>([]);
  const scatterWrapRef  = useRef<HTMLDivElement>(null);
  const scatterItemRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const scatterTitleRef = useRef<HTMLDivElement>(null);

  // Generate circular stars (night sky)
  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    const starColors = ['#9b7fd4', '#b09ae0', '#7c5cbf', '#c4aef5', '#ffd43b', '#f5d76e', '#ffe08a'];
    for (let i = 0; i < 50; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const z = Math.random() * 2.5 + 1;
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      s.style.cssText = `width:${z}px;height:${z}px;background:${color};top:${Math.random() * 100}%;left:${Math.random() * 100}%;--d:${2 + Math.random() * 4}s;animation-delay:${-Math.random() * 4}s`;
      container.appendChild(s);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  // Generate diamond sparkles (day background)
  useEffect(() => {
    const container = sparklesRef.current;
    if (!container) return;
    const colors = ['#9b7fd4', '#7c5cbf', '#b09ae0', '#c4aef5', '#ffd43b', '#f5d76e', '#ffe08a'];
    // Small sparkles
    for (let i = 0; i < 40; i++) {
      const el = document.createElement('div');
      el.className = 'sparkle';
      const size = Math.random() * 12 + 14;
      const color = colors[Math.floor(Math.random() * colors.length)];
      el.textContent = '✦';
      el.style.cssText = `font-size:${size}px;color:${color};top:${Math.random() * 100}%;left:${Math.random() * 100}%;--sd:${2.5 + Math.random() * 5}s;animation-delay:${-Math.random() * 6}s;opacity:${0.3 + Math.random() * 0.45}`;
      container.appendChild(el);
    }
    // Larger sparkles
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('div');
      el.className = 'sparkle';
      const size = Math.random() * 20 + 32;
      const color = colors[Math.floor(Math.random() * colors.length)];
      el.textContent = '✦';
      el.style.cssText = `font-size:${size}px;color:${color};top:${Math.random() * 100}%;left:${Math.random() * 100}%;--sd:${3 + Math.random() * 4}s;animation-delay:${-Math.random() * 5}s;opacity:${0.35 + Math.random() * 0.35}`;
      container.appendChild(el);
    }
    return () => { container.innerHTML = ''; };
  }, []);


  // Day → night body background transition (stays dark permanently)
  useEffect(() => {
    const stops = [
      { t: 0,    r: 243, g: 238, b: 255 }, // #f3eeff  — light lavender (day)
      { t: 0.3,  r: 196, g: 182, b: 228 }, // #c4b6e4  — muted soft lavender (late afternoon)
      { t: 0.55, r: 120, g: 92,  b: 168 }, // #785ca8  — muted dusk purple
      { t: 0.78, r: 48,  g: 24,  b: 82  }, // #301852  — deep muted twilight
      { t: 1,    r: 11,  g: 6,   b: 26  }, // #0b061a  — near-black night
    ];
    const lerp = (a: number, b: number, f: number) => Math.round(a + (b - a) * f);
    const getColor = (t: number) => {
      let lo = stops[0], hi = stops[stops.length - 1];
      for (let i = 0; i < stops.length - 1; i++) {
        if (t <= stops[i + 1].t) { lo = stops[i]; hi = stops[i + 1]; break; }
      }
      const f = lo.t === hi.t ? 0 : (t - lo.t) / (hi.t - lo.t);
      return `rgb(${lerp(lo.r,hi.r,f)},${lerp(lo.g,hi.g,f)},${lerp(lo.b,hi.b,f)})`;
    };
    const update = () => {
      const journey = document.getElementById('journey');
      const skills  = document.getElementById('skills');
      if (!journey || !skills) return;
      const scrollY   = window.scrollY;
      const fadeStart = journey.offsetTop + journey.offsetHeight * 0.2;
      const fadePeak  = skills.offsetTop  - window.innerHeight  * 0.1;
      const t = Math.max(0, Math.min(1, (scrollY - fadeStart) / (fadePeak - fadeStart)));
      document.body.style.backgroundColor = getColor(t);
      document.body.classList.toggle('is-dark', t > 0.5);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', update); document.body.style.backgroundColor = ''; document.body.classList.remove('is-dark'); };
  }, []);


  // Tech stack scatter animation
  useEffect(() => {
    const wrap = scatterWrapRef.current;
    if (!wrap) return;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.5);
    const onScroll = () => {
      const rect       = wrap.getBoundingClientRect();
      const scrollable = wrap.offsetHeight - window.innerHeight;
      const raw   = Math.max(0, Math.min(1, -rect.top / scrollable));
      const flyP  = easeOut(Math.min(1, raw * 1.75));
      const pillP = Math.max(0, (raw - 0.55) / 0.45);
      const hw = window.innerWidth  * 0.23;
      const hh = window.innerHeight * 0.22;
      const corners: [number, number][] = [[-hw,-hh],[hw,-hh],[-hw,hh],[hw,hh]];
      scatterItemRefs.current.forEach((el, i) => {
        if (!el) return;
        const [cx, cy] = corners[i];
        el.style.setProperty('--tx', `${cx * flyP}px`);
        el.style.setProperty('--ty', `${cy * flyP}px`);
        const pills = el.querySelector<HTMLElement>('.scatter-pills');
        if (pills) pills.style.opacity = String(pillP);
      });
      if (scatterTitleRef.current) {
        scatterTitleRef.current.style.opacity = String(Math.min(1, raw * 4));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Glass card fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      }),
      { threshold: 0.07 }
    );
    gcRefs.current.forEach((el) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity .6s ease, transform .6s ease';
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);



  const toggleJ = useCallback((id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const result = await sendContactEmail(data);
    setFormMsg(result.message);
    setSending(false);
    if (result.ok) form.reset();
  };

  // Collect gc refs
  const addGcRef = (el: HTMLElement | null) => {
    if (el && !gcRefs.current.includes(el)) gcRefs.current.push(el);
  };

  return (
    <>
      <div className="sparkles" ref={sparklesRef} />
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />
      <div className="stars" ref={starsRef} />

      {/* NAV */}
      <nav style={{ background: '#ffffff' }}>
        <div className="logo">shriya ✦</div>
        <ul className="nav-links">
          <li><a href="#about">about</a></li>
          <li><a href="#journey">journey</a></li>
          <li><a href="#skills">skills</a></li>
          <li><a href="#projects">projects</a></li>
          <li><a href="#contact">contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-inner">
          <div className="hero-photo-col">
            <div className="avatar-wrap" onClick={() => setPhotoOpen(true)} style={{ cursor: 'zoom-in' }}>
              <div className="avatar-circle">
                <img src={avatarSrc!} alt="Shriya" />
              </div>
              <div className="avatar-ring" />
            </div>
          </div>
          <div className="hero-text-col">
            <h1 className="hero-name">Shriya Yarrapureddy Sarath</h1>
            <div className="hero-title">Software Developer · Full Stack Engineer · AI/ML Engineer · Security Enthusiast</div>
            <p className="hero-desc">
              From architecting high-throughput backends to building intelligent AI pipelines — I bring curiosity, precision, and a security-first mindset to everything I build. I am passionate about creating software that makes a real difference.
            </p>
            <div className="hero-location">
              <svg className="location-pin" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Boston, USA
            </div>
            <div className="hero-btns">
              <a className="btn btn-primary" href="#projects">see my work ✦</a>
              <a className="btn btn-outline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">⬇ download résumé</a>
              <div className="scroll-hint">
                <div className="scroll-pill"><div className="scroll-dot" /></div>
                <span>scroll</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {photoOpen && (
        <div className="photo-lightbox" onClick={() => setPhotoOpen(false)}>
          <img src={avatarSrc!} alt="Shriya" />
        </div>
      )}

      {/* ABOUT */}
      <div className="sec" id="about">
        <div className="sec-hd">
          <div className="eyebrow">a little about me</div>
          <h2 className="sec-title">who I am ✨</h2>
        </div>
        <div className="about-grid">
          <div className="gc about-card" ref={addGcRef}>
            <h3>Hi, I&apos;m Shriya 🌸</h3>
            <p>I&apos;m a CS grad student at <em>Northeastern University (Khoury College)</em>, passionate about backend engineering, distributed systems, cloud infrastructure, AI-driven developer tooling, and <em>security</em>.</p>
            <p>From building <em>concurrent log analysis engines in Rust</em> processing 90k+ events with sub-250ms latency, to designing <em>multi-agent AI systems</em> that automate legacy code refactoring — I thrive on hard problems.</p>
            <p>I bring a <em>systems-thinking mindset</em> to every project, whether it&apos;s architecting APIs, optimizing databases, building intelligent pipelines, or designing <em>secure, resilient systems</em>.</p>
          </div>
          <div className="right-col">
            <div className="stat-grid">
              <div className="gc stat-card" ref={addGcRef}><div className="stat-num" style={{fontSize:'1.5rem'}}>B.Tech · MS</div><div className="stat-label">CS @ PES + Northeastern</div></div>
              <div className="gc stat-card" ref={addGcRef}><div className="stat-num">1+</div><div className="stat-label">year industry exp</div></div>
              <div className="gc stat-card" ref={addGcRef}><div className="stat-num">5+</div><div className="stat-label">languages</div></div>
              <div className="gc stat-card" ref={addGcRef}><div className="stat-num" style={{fontSize:'1.5rem'}}>IEEE</div><div className="stat-label">1 research paper published</div></div>
            </div>
            <div className="gc hobbies-card" ref={addGcRef}>
              <div className="hobbies-title">when I&apos;m not coding, I am —</div>
              <div className="hobbies-list">
                <span>🎨 painting</span>
                <span>📚 reading</span>
                <span>🏋️ gym</span>
                <span>🚶‍♀️ walks</span>
                <span>🎵 singing</span>
                <span>🎮 gaming</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JOURNEY */}
      <div className="sec" id="journey" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="sec-hd">
          <div className="eyebrow">my journey</div>
          <h2 className="sec-title">education &amp; experience 🌿</h2>
        </div>
        <div className="journey-strip">

          {/* B.Tech — above line */}
          <div className={`jitem${openItems['j0'] ? ' open' : ''}`}>
            <div className="jabove">
              <div className="jtype jtype-edu">✦ Education</div>
              <div className="jrole">B.Tech in CS &amp; Engineering</div>
              <div className="jplace">PES University · Bengaluru, India</div>
              <div className="jspec">Specialisation in Networks &amp; Security</div>
              <div className="jdate">Oct 2020 – May 2024</div>
              <button className="jtoggle" onClick={() => toggleJ('j0')}>{openItems['j0'] ? 'collapse ↑' : 'expand ↓'}</button>
            </div>
            <div className="jnode"><div className="jyear">2020</div><div className="jdot jdot-edu" /></div>
            <div className="jbelow">
              <div className="jbullets">
                <div className="jbullet">Bachelor of Technology in Computer Science and Engineering</div>
                <div className="jbullet">Specialisation in Networks &amp; Security</div>
                <div className="jbullet">Foundation in algorithms, systems, and software development</div>
              </div>
            </div>
          </div>

          {/* ActiveBytes — below line */}
          <div className={`jitem${openItems['j1'] ? ' open' : ''}`}>
            <div className="jabove" />
            <div className="jnode"><div className="jyear">2024</div><div className="jdot jdot-exp" /></div>
            <div className="jbelow">
              <div className="jtype jtype-exp">✦ Experience</div>
              <div className="jrole">Product Development Intern</div>
              <div className="jplace">ActiveBytes Technologies · Bengaluru</div>
              <div className="jdate">Jan – June 2024</div>
              <div className="jbullets">
                <div className="jbullet">Rule-based threat detection for SQL injection, XSS &amp; path traversal using Python &amp; Rust</div>
                <div className="jbullet">Multi-threaded rule-matching engine across heterogeneous log sources</div>
                <div className="jbullet">Rust/Tokio engine: 90,000+ events at sub-250ms latency</div>
              </div>
              <button className="jtoggle" onClick={() => toggleJ('j1')}>{openItems['j1'] ? 'collapse ↑' : 'expand ↓'}</button>
            </div>
          </div>

          {/* William O'Neil — above line */}
          <div className={`jitem${openItems['j2'] ? ' open' : ''}`}>
            <div className="jabove">
              <div className="jtype jtype-exp">✦ Experience</div>
              <div className="jrole">Software Development Intern</div>
              <div className="jplace">William O&apos; Neil India · Bengaluru</div>
              <div className="jdate">Dec 2024 – July 2025</div>
              <button className="jtoggle" onClick={() => toggleJ('j2')}>{openItems['j2'] ? 'collapse ↑' : 'expand ↓'}</button>
            </div>
            <div className="jnode"><div className="jyear">2024</div><div className="jdot jdot-exp" /></div>
            <div className="jbelow">
              <div className="jbullets">
                <div className="jbullet">Built shift management web app (JS, HTML, CSS, MSSQL) saving 10+ hrs/month</div>
                <div className="jbullet">Optimized SQL pipelines for U.S. equity market data analytics</div>
                <div className="jbullet">Assessed cloud migration feasibility for legacy SQL databases</div>
              </div>
            </div>
          </div>

          {/* MS — below line */}
          <div className={`jitem${openItems['j3'] ? ' open' : ''}`}>
            <div className="jabove" />
            <div className="jnode"><div className="jyear">2025</div><div className="jdot jdot-edu" /></div>
            <div className="jbelow">
              <div className="jtype jtype-edu">✦ Education</div>
              <div className="jrole">MS in Computer Science</div>
              <div className="jplace">Northeastern University, Khoury College · Boston, MA</div>
              <div className="jdate">Sept 2025 – May 2027 (expected)</div>
              <div className="jbullets">
                <div className="jbullet">Khoury College of Computer Sciences — top-ranked CS program</div>
                <div className="jbullet">Focus on systems, AI/ML, and software engineering</div>
              </div>
              <button className="jtoggle" onClick={() => toggleJ('j3')}>{openItems['j3'] ? 'collapse ↑' : 'expand ↓'}</button>
            </div>
          </div>

        </div>
      </div>

      {/* TECH STACK — solar systems */}
      <div className="scatter-wrap" id="skills" ref={scatterWrapRef}>
        <div className="scatter-sticky">
          <div className="scatter-title" ref={scatterTitleRef}>
            <div className="stack-eyebrow">tools &amp; languages</div>
            <h2 className="stack-title">my tech stack 🛠️</h2>
          </div>
          {SOLAR_SYSTEMS.map((sys, idx) => (
            <div key={sys.label} className="scatter-item" ref={el => { scatterItemRefs.current[idx] = el; }}>
              <div className="solar-sys">
                <div className={`sol-sun ${sys.sunClass}`}>{sys.label}</div>
                {sys.rings.map(ring => (
                  <div key={ring.r} className="sol-tilt" style={{
                    '--tx': `${ring.tx}deg`, '--ty': `${ring.ty}deg`, '--tz': `${ring.tz}deg`,
                  } as React.CSSProperties}>
                    <div className="sol-ring" style={{ '--r': `${ring.r}px` } as React.CSSProperties} />
                    {ring.planets.map((planet, pi) => (
                      <div key={planet} className="sol-orbit" style={{
                        '--r': `${ring.r}px`,
                        '--speed': `${ring.speed}s`,
                        '--delay': `${-(ring.speed / ring.planets.length) * pi}s`,
                      } as React.CSSProperties}>
                        <div className="sol-planet-wrap">
                          <div className="sol-planet">{planet}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <div id="projects" className="proj-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {([
          [0,1,2,3,4,5,6,7],
          [4,6,1,7,2,5,0,3],
        ] as number[][]).map((order, ri) => {
          const CARD_STYLES: { background: string; borderLeftColor: string }[] = [
            { background: 'linear-gradient(145deg, #0a3050, #0f3a5e, #082840)', borderLeftColor: '#00c8cc' },
            { background: 'linear-gradient(145deg, #4a3600, #5a4200, #382800)', borderLeftColor: '#c8a020' },
            { background: 'linear-gradient(145deg, #18183a, #20204e, #101028)', borderLeftColor: '#b8c4e8' },
            { background: 'linear-gradient(145deg, #0d1a42, #102056, #091430)', borderLeftColor: '#4488dd' },
            { background: 'linear-gradient(145deg, #2a1050, #35145e, #200b40)', borderLeftColor: '#9b60f0' },
            { background: 'linear-gradient(145deg, #3a0a2e, #4a0e3a, #2c0822)', borderLeftColor: '#e040a0' },
            { background: 'linear-gradient(145deg, #0a3028, #0f4a36, #082820)', borderLeftColor: '#20d890' },
            { background: 'linear-gradient(145deg, #2a1a00, #3a2500, #1c1000)', borderLeftColor: '#f08030' },
          ];
          const rowEl = (
            <div key={ri} className="proj-row-wrap">
              <div className={`proj-row proj-row-${ri + 1}`}>
                {[...order, ...order, ...order].map((idx, ci) => {
                  const p = PROJECTS[idx];
                  const cs = CARD_STYLES[idx];
                  return (
                    <div key={`${p.name}-${ri}-${ci}`} className="proj-card" style={{ background: cs.background, borderLeftColor: cs.borderLeftColor }} onClick={() => setSelectedProject(p)}>
                      <div className="proj-inner">
                        <div className="proj-top">
                          <span className="proj-date">{p.date}</span>
                          <span className="visit-hint">explore ↗</span>
                        </div>
                        <div className="proj-name">{p.name}</div>
                        <div className="proj-foot">
                          <div className="proj-tags">{p.tags.map((t) => <span key={t} className="ptag">{t}</span>)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
          if (ri === 0) return (
            <React.Fragment key="row0-with-heading">
              {rowEl}
              <div className="proj-heading" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '3.5rem 3rem', gap: '1.5rem' }}>
                <span style={{ fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--lilac)', fontWeight: 600, opacity: 0.7, flex: 1, textAlign: 'left' }}>things I&apos;ve built</span>
                <h2 className="sec-title" style={{ flexShrink: 0, textAlign: 'center' }}>featured projects 🌷</h2>
                <span style={{ fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--lilac)', fontWeight: 600, opacity: 0.7, flex: 1, textAlign: 'right' }}>click a card to explore</span>
              </div>
            </React.Fragment>
          );
          return rowEl;
        })}
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
            <div className="modal-top">
              <div>
                <div className="modal-date">{selectedProject.date}</div>
                <div className="modal-name">{selectedProject.name}</div>
                <div className="modal-stack">{selectedProject.stack}</div>
              </div>
            </div>
            <p className="modal-desc">{selectedProject.desc}</p>
            <div className="modal-thumb">
              {selectedProject.thumbnail
                ? <img src={selectedProject.thumbnail} alt={`${selectedProject.name} preview`} />
                : <div className="modal-thumb-placeholder"><span>▶ demo preview</span></div>
              }
            </div>
            <div className="modal-foot">
              <div className="proj-tags">{selectedProject.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
              <div className="modal-links">
                <a className="modal-link" href={selectedProject.github} target="_blank" rel="noopener noreferrer"><GithubIcon /><span>GitHub</span></a>
                {selectedProject.youtube && selectedProject.youtube !== '#' && (
                  <a className="modal-link yt" href={selectedProject.youtube} target="_blank" rel="noopener noreferrer"><YoutubeIcon /><span>Demo</span></a>
                )}
                {selectedProject.link !== '#' && (
                  <a className="modal-link visit" href={selectedProject.link} target="_blank" rel="noopener noreferrer"><span>Visit ↗</span></a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT */}
      <div className="contact-bg" id="contact">
        <div className="sec" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="sec-hd">
            <div className="eyebrow">say hello</div>
            <h2 className="sec-title">let&apos;s connect 💌</h2>
          </div>
          <div className="connect-btns">
            <a className="connect-btn" href="mailto:yarrapureddysarath.s@northeastern.edu">
              <span className="connect-icon">✉️</span>
              <span className="connect-label">
                <span className="connect-title">Email</span>
                <span className="connect-sub">yarrapureddysarath.s@northeastern.edu</span>
              </span>
            </a>
            <a className="connect-btn" href="https://www.linkedin.com/in/shriyays/" target="_blank" rel="noopener noreferrer">
              <span className="connect-icon">💼</span>
              <span className="connect-label">
                <span className="connect-title">LinkedIn</span>
                <span className="connect-sub">linkedin.com/in/shriyays</span>
              </span>
            </a>
            <a className="connect-btn" href="https://github.com/shriyays" target="_blank" rel="noopener noreferrer">
              <span className="connect-icon">🐙</span>
              <span className="connect-label">
                <span className="connect-title">GitHub</span>
                <span className="connect-sub">github.com/shriyays</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <footer>
        <p>designed &amp; built with <span className="heart">♥</span> by Shriya Yarrapureddy Sarath · 2025</p>
      </footer>
    </>
  );
}
