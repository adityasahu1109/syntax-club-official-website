import React, { useState, useEffect, useRef } from 'react';
import useCountUp from '../hooks/useCountUp';
import FadeIn from '../components/FadeIn';
import HeroScene from '../components/ui/HeroScene';
import GridBackground from '../components/ui/GridBackground';
import syntaxLogo from '../assets/syntax_logo.png';

/* ——————————————— Taglines ——————————————— */
const TAGLINES = [
  'Ship code. Break limits.',
  'Where ideas compile into reality.',
  'Debug the ordinary. Deploy the extraordinary.',
  'Built by coders. Driven by passion.',
  'Think it. Code it. Ship it.',
];

const TypingTagline = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TAGLINES[lineIndex];
    const speed = isDeleting ? 30 : 55;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % TAGLINES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, lineIndex]);

  return (
    <span className="font-mono text-lg md:text-xl">
      <span className="text-slate-300">&gt;_ </span>
      {displayed}
      <span className="inline-block w-[2px] h-[1.1em] ml-0.5 bg-neon-cyan align-middle animate-[blink_0.7s_step-end_infinite]" />
    </span>
  );
};

/* ——————————————— Stat Card ——————————————— */
const StatCard = ({ icon, label, value, suffix }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div
      ref={ref}
      className="group relative flex flex-1 flex-col gap-3 p-6 md:p-8 items-center text-center glass-card rounded-2xl glass-card-hover min-w-[160px]"
    >
      {/* Glow dot */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px] text-primary">{icon}</span>
      </div>
      <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">{label}</p>
      <p className="text-white tracking-tight text-4xl md:text-5xl font-black">
        {count}
        <span className="text-primary">{suffix}</span>
      </p>
    </div>
  );
};

/* ——————————————— Feature Card ——————————————— */
const FeatureCard = ({ icon, title, description, delay = 0, gradient }) => {
  return (
    <FadeIn delay={delay} direction="up" className="h-full">
      <div className="group relative h-full glass-card rounded-2xl p-8 glass-card-hover overflow-hidden">
        {/* Background glow on hover */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 ${gradient}`} />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-[24px] text-primary">{icon}</span>
          </div>
          <h3 className="text-white text-xl font-bold">{title}</h3>
          <p className="text-slate-400 text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </FadeIn>
  );
};

/* ——————————————— Tech Stack Marquee ——————————————— */
const techStack = [
  'Python', 'React', 'JavaScript', 'Node.js', 'TensorFlow',
  'Flutter', 'Rust', 'Go', 'Docker', 'Kubernetes',
  'TypeScript', 'Next.js', 'MongoDB', 'PostgreSQL', 'AWS',
  'C++', 'Java', 'GraphQL', 'Firebase', 'Figma',
];

const TechMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background-dark to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background-dark to-transparent z-10" />

      <div className="flex gap-6 animate-marquee whitespace-nowrap">
        {[...techStack, ...techStack].map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium text-slate-400 hover:text-primary hover:border-primary/30 transition-colors duration-300 backdrop-blur-sm bg-white/[0.02]"
          >
            {tech}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

/* ——————————————— Glimpses Gallery ——————————————— */
const GlimpseCard = ({ title, subtitle, image, className = '', delay = 0 }) => (
  <FadeIn delay={delay} direction="up" className={`${className} h-full`}>
    <div className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
        style={{ backgroundImage: `url("${image}")` }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      {/* Blue/purple tint on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 via-transparent to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="text-white font-bold text-lg md:text-xl mb-1">{title}</p>
        {subtitle && (
          <p className="text-primary-light text-sm font-medium">{subtitle}</p>
        )}
      </div>

      {/* Top-right indicator */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
        <span className="material-symbols-outlined text-white text-lg">arrow_outward</span>
      </div>
    </div>
  </FadeIn>
);

/* ——————————————— CTA Section ——————————————— */
const CTASection = () => (
  <FadeIn direction="up">
    <div className="relative w-full max-w-[1200px] mx-auto">
      <div className="relative glass-card rounded-3xl p-10 md:p-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10" />
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/20 blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-accent/20 blur-[80px]" />

        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Open for Recruitment
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl">
            Ready to write the next <span className="gradient-text">chapter</span>?
          </h2>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Join SyntaX and become part of a community that ships real products, wins hackathons, and pushes the boundaries of what&apos;s possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-glow-blue"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Join SyntaX</span>
              <span className="relative z-10 material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            <a
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white border border-white/10 hover:border-primary/40 hover:bg-white/5 transition-all duration-300"
            >
              Explore Events
              <span className="material-symbols-outlined text-lg">event</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </FadeIn>
);

/* ——————————————————————————————————————————————————
   HOME PAGE
   —————————————————————————————————————————————————— */
const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* ========== HERO SECTION ========== */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <HeroScene />

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-transparent to-background-dark z-[1]" />
        <div className="absolute inset-0 mesh-gradient z-[1]" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col gap-8 text-center max-w-4xl items-center px-6">
          <FadeIn direction="down" delay={100}>
            <div className="relative">
              <img
                src={syntaxLogo}
                alt="SyntaX Logo"
                className="h-28 md:h-40 w-auto object-contain drop-shadow-[0_0_60px_rgba(59,130,246,0.4)] animate-float-slow"
              />
              {/* Logo glow effect */}
              <div className="absolute inset-0 blur-[40px] opacity-30">
                <img src={syntaxLogo} alt="" className="h-28 md:h-40 w-auto object-contain" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <h1 className="text-6xl md:text-8xl font-black tracking-[-0.04em] leading-[0.9]">
              <span className="gradient-text-logo">SyntaX</span>
            </h1>
          </FadeIn>

          <FadeIn delay={500}>
            <p className="text-slate-400 text-base md:text-lg font-medium max-w-lg leading-relaxed">
              The premier coding club of <span className="text-white font-semibold">VNIT Nagpur</span>.
              Building the future, one commit at a time.
            </p>
          </FadeIn>

          <FadeIn delay={700}>
            <div className="flex items-center gap-2 px-5 py-3 rounded-xl glass-card">
              <TypingTagline />
            </div>
          </FadeIn>

          <FadeIn delay={900}>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-glow-blue"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Join the Club</span>
                <span className="relative z-10 material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-300 border border-white/10 hover:border-primary/40 hover:bg-white/5 hover:text-white transition-all duration-300"
              >
                View Projects
                <span className="material-symbols-outlined text-lg">code</span>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <span className="text-slate-500 text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-600 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>

      {/* ========== METRICS ========== */}
      <div className="relative w-full py-20">
        <GridBackground />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <FadeIn direction="up">
            <div className="flex flex-wrap gap-6 justify-center">
              <StatCard icon="groups"        label="Active Members"  value={250} suffix="+" />
              <StatCard icon="event"         label="Events Hosted"   value={50}  suffix="+" />
              <StatCard icon="rocket_launch" label="Projects Built"  value={120} suffix="+" />
              <StatCard icon="emoji_events"  label="Hackathon Wins"  value={30}  suffix="+" />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ========== TECH MARQUEE ========== */}
      <div className="relative w-full max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="flex flex-col items-center gap-4">
            <span className="text-slate-500 text-sm font-medium uppercase tracking-widest">Technologies We Work With</span>
            <TechMarquee />
          </div>
        </FadeIn>
      </div>

      {/* ========== WHO WE ARE ========== */}
      <div className="relative w-full py-24">
        <GridBackground />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <FadeIn direction="up">
            <div className="flex flex-col gap-3 text-center items-center mb-16">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Us</span>
              <h2 className="text-white tracking-tight text-4xl md:text-5xl font-black leading-tight">
                What makes <span className="gradient-text">SyntaX</span> different
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mt-2">
                We&apos;re not just a club — we&apos;re a launchpad for ideas, a forge for skills, and a community that codes together.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="terminal"
              title="Hands-on Workshops"
              description="Weekly sessions on cutting-edge tech — from web dev to machine learning, systems programming to cloud architecture."
              delay={100}
              gradient="bg-primary"
            />
            <FeatureCard
              icon="trophy"
              title="Competitive Edge"
              description="Regular hackathons, coding contests, and mock interviews to sharpen your problem-solving and teamwork skills."
              delay={200}
              gradient="bg-accent"
            />
            <FeatureCard
              icon="diversity_3"
              title="Vibrant Community"
              description="A welcoming space for all skill levels. Collaborate on open-source, find mentors, and build lifelong connections."
              delay={300}
              gradient="bg-neon-cyan"
            />
          </div>
        </div>
      </div>

      {/* ========== GLIMPSES GALLERY ========== */}
      <div className="relative w-full py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn direction="up">
            <div className="flex flex-col gap-3 text-center items-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">Gallery</span>
              <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight">
                Life at <span className="gradient-text">SyntaX</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            <GlimpseCard
              className="md:col-span-2 md:row-span-2 min-h-[300px]"
              title="Annual Hackathon 2023"
              subtitle="200+ Participants"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuCb0r-NK3oxPjwpZOiADSFPJ8izBLjRTdzuve5IQA9fnGb84gfGEFMMKm7bpUz-xeW2U6i9Kd2Vt9LoLtEct8H4oJthA2vqn_EdUckEIAzIMwWbw8A5VzykE8ANqkAQWmjqjSGxigMkMndzG5MqawcXcQcKyNctWFpYr1BSgskQh63UNC3id37mQXzp8_6kNNGG6W2syA-K0dtbD1NULJFOgikC39DtrPA3QoFRZC9Jyj8o2fDuwg3dN78vRE1finztPc-XrldUig"
              delay={0}
            />
            <GlimpseCard
              className="min-h-[200px]"
              title="Web Dev Workshop"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuA2uxHJn_7aAkXWpDeD6Kerf783pRF4gem18PI6GU4CbX3Hdn3fXhj8qozaJrsDIYwxQq1dvJTg6gaBSlAfd3hKQfBU4o3ujNs6l_ERMwvuknuMfN9Smf5HoSzjyMNdqSMtcam_nPEzsyKJdEc7POHnxGV9ErcoyPs8xsvbG1N5rbQ8-dtxBiJGSqgUADSLRjaRbEZx2FOwfrvOzj948amxpKpNXArVj3EBkn1bKfsCU2FlhMcLJ-qcR2-PiuS5y-lw9rierYmHEQ"
              delay={100}
            />
            <GlimpseCard
              className="min-h-[200px]"
              title="Algorithm Nights"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuAFuHhHYCDFnjPB0yVW9oxwFNWLW_3IvIvdLEmZ5OTrCj6Lo2dOkUQE3JDKi6rMb9vJ80hIpvKJRuSZiSY91sB6Nsjk4n1Yw-FIfi6eiVf_jlT342wf35PGZEaqr1aI4x0LWFe7yeyFcPupMMBuUVs_xA_t7SYZ8jchrG7y0rHMqsxEZLXv_LK-lfsA0akNKOLc_Q4T4PPfSWDj6XoO59PAEAvwmRCzRufFLSKDI_BBKho2zja1Y5aCaiJXBqCFBGP0iJtXebT48A"
              delay={200}
            />
            <GlimpseCard
              className="md:col-span-2 min-h-[200px]"
              title="Project Showcases"
              subtitle="Monthly Demos"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDHTW5ZVJ805jBHXo8Igtm2hOta5iCGQRHsv1qgORZo1CIOGZ7RNLEA8H_Jx2wE4bsu2N6liAmtmXiJOXDdZjGMMRtzNtoynvVXtwYn8wNZYJi2HNsgx3DPGDHbWoMzxPpkNDGCcDoPsaNmuXfwTRChW0HxGDFhvyIvlhWxDWyt7zxKl0gmSMVuMEQC6hnMRod_84diuDNzxKE6E8Z-hGrxrlyXQH377sjVCKWJnnv16UlFBl2KD7l_4v-wPvJXYBvGpLY_1a7xHA"
              delay={300}
            />
          </div>
        </div>
      </div>

      {/* ========== CTA SECTION ========== */}
      <div className="w-full py-24 px-6">
        <CTASection />
      </div>
    </div>
  );
};

export default Home;
