import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import SEO from '../components/SEO';

const Hackathon = () => {
  const [days, setDays] = useState(14);
  const [hours, setHours] = useState(23);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        setMinutes((m) => {
          if (m > 0) return m - 1;
          setHours((h) => {
            if (h > 0) return h - 1;
            setDays((d) => (d > 0 ? d - 1 : 0));
            return 23;
          });
          return 59;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white overflow-x-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <SEO 
        title="Synhack 2026 | The Ultimate 40-Hour Web3 Hackathon" 
        description="Join SyntaX Club's flagship 40-hour hacking marathon. Decentralized ideation, massive bounties, and relentless building. Register your node now."
        keywords="hackathon, synhack, vnit, web3, coding marathon, syntax club event"
        path="/synhack"
      />
      {/* Import Web3 Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          
          .web3-gradient-text {
            background: linear-gradient(90deg, #22D3EE 0%, #3B82F6 50%, #8B5CF6 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .holographic-border {
            position: relative;
          }
          .holographic-border::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 1px;
            background: linear-gradient(135deg, rgba(34,211,238,0.8), rgba(139,92,246,0.3), rgba(59,130,246,0.8));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            border-radius: inherit;
          }

          .orbit-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.05);
          }
        `}
      </style>

      {/* Standalone Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 border-b border-white/5 bg-[#050505]/70 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-cyan-400 rounded-sm"></span>
            <span className="text-xl font-bold tracking-widest uppercase">Synhack</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest text-white/50 uppercase">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#prizes" className="hover:text-white transition-colors">Prizes</a>
            <a href="#rules" className="hover:text-white transition-colors">Rules</a>
          </nav>
          <a href="/" className="px-5 py-2 text-xs font-bold uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-colors rounded-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            SyntaX
          </a>
        </div>
      </header>

      {/* HERO SECTION with Perpetual Web3 Animation */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        
        {/* Abstract Perpetual Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-60 mix-blend-screen">
          {/* Orbital Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="orbit-ring w-[600px] h-[600px] border-cyan-500/20 shadow-[0_0_80px_rgba(34,211,238,0.1)]"
          >
             <div className="absolute top-0 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 rounded-full shadow-[0_0_20px_#22D3EE]" />
          </motion.div>
          
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            className="orbit-ring w-[800px] h-[800px] border-purple-500/20"
          >
             <div className="absolute top-1/2 right-0 w-3 h-3 translate-x-1/2 -translate-y-1/2 bg-purple-400 rounded-full shadow-[0_0_20px_#A855F7]" />
          </motion.div>
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
            className="orbit-ring w-[1000px] h-[1000px] border-blue-500/10"
          >
             <div className="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 translate-y-1/2 bg-blue-500 rounded-full" />
          </motion.div>

          {/* Central Core Glow */}
          <div className="absolute w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="border-l-4 border-cyan-400 pl-4 text-left mb-10 w-full max-w-[280px]"
          >
            <p className="font-mono text-cyan-400 text-sm uppercase tracking-widest mb-1">Status: Operational</p>
            <p className="text-white/60 text-xs uppercase tracking-widest font-mono">Protocol Initialization: [200 OK]</p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-7xl sm:text-8xl md:text-[140px] font-black uppercase leading-[0.85] tracking-tighter"
          >
            Syn<span className="web3-gradient-text">hack</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl font-light text-white/50 mt-8 mb-16 max-w-2xl mx-auto"
          >
            Decentralized ideation. <span className="text-white">40 hours</span> of relentless building. Join the leading developer convergence.
          </motion.p>

          {/* Web3 Countdown */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-16"
          >
            {[
              { label: 'D', value: days },
              { label: 'H', value: hours },
              { label: 'M', value: minutes },
              { label: 'S', value: seconds },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-24 md:w-28 md:h-32 holographic-border bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-center rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <span className="text-5xl md:text-7xl font-light tracking-tighter web3-gradient-text">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-white/40 text-xs font-bold tracking-[0.3em] font-mono mt-4 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center"
          >
            <a href="#" className="relative inline-flex items-center justify-center w-full sm:w-[240px] px-8 py-5 text-sm font-bold tracking-widest text-[#050505] uppercase bg-cyan-400 hover:bg-cyan-300 transition-all rounded-sm overflow-hidden group">
               <span className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
               <span className="relative z-10 flex items-center gap-3">Register Node <span className="material-symbols-outlined text-[16px]">arrow_forward</span></span>
            </a>
            <a href="#rules" className="inline-flex items-center justify-center w-full sm:w-[240px] px-8 py-5 text-sm font-bold tracking-widest text-white uppercase border border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-colors rounded-sm">
               Read Docs
            </a>
          </motion.div>

        </div>
      </section>

      {/* Stats Divider in Web3 Style */}
      <section className="border-y border-white/10 bg-[#0a0a0a]/50 py-12 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {[
            { tag: 'Duration', val: '40H' },
            { tag: 'Bounty', val: '10K+' },
            { tag: 'Nodes', val: '200+' },
            { tag: 'Networks', val: '03' },
          ].map((stat, i) => (
             <div key={i} className="flex flex-col border-l border-white/10 pl-6 text-left">
                <span className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">{stat.tag} //</span>
                <span className="text-4xl font-black tracking-tighter web3-gradient-text">{stat.val}</span>
             </div>
          ))}
        </div>
      </section>

      {/* Rules Architecture */}
      <section id="rules" className="relative py-32 z-10 px-6 max-w-[1400px] mx-auto">
        <div className="mb-20">
          <h2 className="text-white/20 text-sm font-mono uppercase tracking-widest mb-4">Architecture</h2>
          <div className="h-px w-20 bg-cyan-400 mb-8" />
          <h3 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Event <br/> Protocols</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Team Sync', desc: 'Squads strictly range between 2-4 nodes. Solo isolation is deprecated.' },
            { num: '02', title: 'Offline Loop', desc: '40 hours of uninterrupted execution. Physical presence perfectly synchronized.' },
            { num: '03', title: 'Zero Cache', desc: 'All deployments must be initiated from zero. Repositories compiled on-site only.' },
            { num: '04', title: 'Access Control', desc: 'Undergraduate entities with valid identification keys strictly authenticated.' },
            { num: '05', title: 'Consensus', desc: 'Evaluations optimized for Technical Depth, Design Geometry, and Real-world Viability.' },
            { num: '06', title: 'Handshake', desc: 'Physical check-in requested precisely T-minus 2 hours before mainnet launch.' },
          ].map((rule, i) => (
            <div key={i} className="holographic-border bg-[#080808] p-8 rounded-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all group">
              <div className="flex justify-between items-start mb-12">
                 <span className="text-cyan-400 font-mono text-sm">[{rule.num}]</span>
                 <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-cyan-400 transition-colors">
                    <span className="material-symbols-outlined text-sm">terminal</span>
                 </span>
              </div>
              <h4 className="text-2xl font-bold uppercase tracking-tight mb-3">{rule.title}</h4>
              <p className="text-white/50 text-sm font-light leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bounties / Prize Pool */}
      <section id="prizes" className="relative py-32 z-10 bg-[#0a0a0a] border-y border-white/5 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-white/20 text-sm font-mono uppercase tracking-widest mb-4">Liquidity</h2>
              <div className="h-px w-20 bg-purple-500 mb-8" />
              <h3 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Bounties</h3>
            </div>
            <p className="max-w-md text-white/40 text-sm font-light leading-relaxed">
              Substantial cryptographic and fiat rewards allocated for the most optimal architectures successfully deployed during the 40-hour window.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-6">
            {/* Rank 2 */}
            <div className="flex-1 bg-[#111] border border-white/5 p-10 flex flex-col relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 text-8xl font-black text-white/[0.02] -translate-y-4 group-hover:text-white/[0.05] transition-colors font-mono">2</div>
               <span className="text-purple-400 font-mono text-xs uppercase tracking-widest mb-8">Block // 02</span>
               <div className="mt-auto">
                  <h4 className="text-white/60 text-sm uppercase tracking-widest mb-2">Runner Up</h4>
                  <p className="text-5xl font-black tracking-tighter mb-8">₹3,000</p>
                  <ul className="space-y-4 text-sm text-white/50 font-light border-t border-white/10 pt-8">
                     <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> Verified Swag Drop</li>
                     <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> Certificate NFT</li>
                  </ul>
               </div>
            </div>

            {/* Rank 1 */}
            <div className="flex-1 bg-gradient-to-b from-[#1a1c29] to-[#0a0a0a] holographic-border p-10 flex flex-col relative overflow-hidden group transform lg:-translate-y-4 shadow-[0_30px_60px_rgba(34,211,238,0.1)]">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
               <div className="absolute top-0 right-0 p-6 text-[120px] leading-none font-black text-cyan-400/[0.05] group-hover:text-cyan-400/[0.1] transition-colors font-mono">1</div>
               <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-8">Block // 01</span>
               <div className="mt-auto relative z-10">
                  <h4 className="text-white text-md font-bold uppercase tracking-widest mb-2">Alpha Node</h4>
                  <p className="text-7xl font-black tracking-tighter mb-8 web3-gradient-text">₹5,000</p>
                  <ul className="space-y-4 text-sm text-white/70 font-light border-t border-cyan-500/20 pt-8">
                     <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22D3EE]" /> Genesis SyntaX Merch Allocation</li>
                     <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22D3EE]" /> Pro Network Memberships</li>
                     <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22D3EE]" /> Supreme Certification</li>
                  </ul>
               </div>
            </div>

            {/* Rank 3 */}
            <div className="flex-1 bg-[#111] border border-white/5 p-10 flex flex-col relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 text-8xl font-black text-white/[0.02] -translate-y-4 group-hover:text-white/[0.05] transition-colors font-mono">3</div>
               <span className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-8">Block // 03</span>
               <div className="mt-auto">
                  <h4 className="text-white/60 text-sm uppercase tracking-widest mb-2">Tertiary</h4>
                  <p className="text-5xl font-black tracking-tighter mb-8">₹2,000</p>
                  <ul className="space-y-4 text-sm text-white/50 font-light border-t border-white/10 pt-8">
                     <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Sticker Collectibles</li>
                     <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Certificate of Merit</li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Track */}
      <section className="relative py-12 z-10 border-b border-white/10 overflow-hidden bg-[#080808]">
        <div className="flex gap-20 animate-marquee whitespace-nowrap min-w-max items-center opacity-30 invert">
             {[1, 2, 3, 4, 5, 6, 7].map((i) => (
               <img key={i} src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Sponsor" className="h-8 grayscale brightness-0" />
             ))}
             {[1, 2, 3, 4, 5, 6, 7].map((i) => (
               <img key={`d-${i}`} src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Sponsor" className="h-8 grayscale brightness-0" />
             ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 z-10 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Initialize Sequence</h2>
        <p className="text-white/40 max-w-lg mx-auto mb-10 font-light">Capacity is restricted. Secure your protocol access and prepare for the 40 hour build cycle.</p>
        <a href="#" className="relative inline-flex items-center justify-center px-12 py-6 text-sm font-bold tracking-widest text-[#050505] uppercase bg-white hover:bg-cyan-400 transition-colors rounded-sm group">
           Transmit Registration
        </a>
      </section>
      
      {/* Footer minimal */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/20 text-xs font-mono uppercase tracking-widest">
         Synhack Protocol © 2026 // By SyntaX Club VNIT
      </footer>

    </div>
  );
};

export default Hackathon;
