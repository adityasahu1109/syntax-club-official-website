import React from 'react';
import FadeIn from '../components/FadeIn';

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/syntax_vnit/',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/syntaxvnit/posts/?feedView=all',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: '#',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  }
];

const Contact = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-12 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl w-full">
        {/* Page Header */}
        <FadeIn direction="down">
          <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Get In Touch</span>
              <h1 className="text-white text-4xl sm:text-5xl leading-tight font-black tracking-tighter">
                Let's <span className="gradient-text">Connect</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-xl mt-1">Have questions about our upcoming hackathons or partnerships? Our team is ready to help.</p>
            </div>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
          {/* Card 1: Outreach Lead */}
          <FadeIn direction="up" delay={100} className="md:col-span-7 lg:col-span-8 h-full flex w-full">
            <div className="w-full bg-black/20 bg-white/5 rounded-xl border border-white/10 p-8 flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors backdrop-blur-sm relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="space-y-3">
                  <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] block">Leadership</span>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Mail us on </h3>
                  <div className="space-y-1 pt-2">
                    <p className="text-xl font-medium text-slate-400">SyntaX Outreach Team</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  <a className="flex items-center gap-3 bg-primary/10 text-primary border border-primary/20 px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-[0_0_20px_rgba(6,245,249,0.1)] group-hover:shadow-[0_0_30px_rgba(6,245,249,0.2)]" href="mailto:syntaxvnit@gmail.com">
                    <span className="material-symbols-outlined text-xl">mail</span>
                    <span>syntaxvnit@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Socials 2×2 Grid — real icons */}
          <FadeIn direction="up" delay={200} className="md:col-span-5 lg:col-span-4 h-full flex w-full">
            <div className="w-full bg-black/20 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 grid grid-cols-2 grid-rows-2 gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/50 dark:bg-background-dark rounded-lg flex flex-col items-center justify-center gap-2 border border-white/10 group hover:border-primary transition-all backdrop-blur-sm"
                >
                  <span className="text-slate-400 group-hover:text-primary transition-colors">
                    {social.icon}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-600 font-bold">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </FadeIn>

          {/* Card 3: Headquarters */}
          <FadeIn direction="up" delay={300} className="md:col-span-12 h-full flex w-full">
            <div className="w-full bg-black/20 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden flex flex-col lg:flex-row min-h-[400px]">
              <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Base</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">Headquarters</h3>
                <div className="space-y-2 mb-8">
                  <p className="text-xl text-slate-200">Room 34, New Academic Building</p>
                  <p className="text-xl text-slate-200">Visvesvaraya National Institute of Technology</p>
                  <p className="text-xl text-slate-200">Nagpur, Maharashtra 440010</p>
                  <p className="text-slate-600 dark:text-slate-500">India</p>
                </div>
                <a href="https://maps.app.goo.gl/ioVxJzYHScptdgdC7?g_st=aw" target="_blank" rel="noopener noreferrer" className="w-fit flex items-center gap-2 bg-black/40 border-white/5 border text-slate-300 border border-slate-300 border-white/10 px-8 py-4 rounded-lg font-bold hover:bg-slate-300 dark:hover:bg-slate-800 transition-all">
                  Get Directions
                  <span className="material-symbols-outlined">north_east</span>
                </a>
              </div>
              <div className="w-full lg:w-1/2 min-h-[300px] border-white/5 border relative overflow-hidden backdrop-blur-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.723151776958!2d79.049936!3d21.1236008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1003637eff7%3A0xef447096b8b8c27c!2sSyntaX%20Vnit%20Workspace!5e0!3m2!1sen!2sin!4v1775238918520!5m2!1sen!2sin" 
                  className="absolute inset-0 w-full h-full border-0" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ filter: "invert(90%) hue-rotate(180deg) contrast(100%)", opacity: 0.8 }}
                ></iframe>
                {/* Custom Overlay to ensure the map respects the glassmorphism aesthetic */}
                <div className="absolute inset-0 pointer-events-none mix-blend-overlay bg-primary/10"></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Contact;
