import React from 'react';

const Contact = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-12 px-6 lg:px-10">
      <div className="max-w-7xl w-full">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">Get In Touch</span>
            <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tighter">
              Connect<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mt-1">Have questions about our upcoming hackathons or partnerships? Our team is ready to help.</p>
          </div>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
          {/* Card 1: Outreach Lead */}
          <div className="md:col-span-7 lg:col-span-8 bg-black/20 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-8 flex flex-col justify-between group hover:border-primary/50 transition-colors backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Leadership</span>
                <h3 className="text-3xl font-bold">Outreach Lead</h3>
                <div className="space-y-1">
                  <p className="text-2xl font-medium text-slate-900 dark:text-slate-200">Alex Rivers</p>
                  <p className="text-slate-600 dark:text-slate-500">Global Strategy &amp; Partnerships</p>
                </div>
              </div>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-800">
                <img alt="Alex Rivers" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKa7Oek5MRwrHTI2xdvUbQmn565Ftt83mrHNqsmBGQOCIw18oZSRqZCybqAx_BOUszdgpQ4vT1IhP4cCn4bCHDoAKkVsk-W4fxfWy_tt2fHUStMOdPGMK0P-LnsHm2Zc8oKs9LsaHaD-ttTzOaZNU2epYPVzMpOzHSfChjPMwdxS26cwN6mlwISG9-vcOJtoi_QP0EwvY2LqngoNvh9mEAK8n0I4vd1p5lt15tQdxaga2VXUi2DVGaaNM6e-xlJ09aDUQ_4VOK9DM" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <a className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-6 py-3 rounded-lg font-bold hover:bg-primary hover:text-white dark:hover:text-background-dark transition-all" href="mailto:alex.rivers@codingclub.com">
                <span className="material-symbols-outlined text-xl">mail</span>
                alex.rivers@codingclub.com
              </a>
              <a className="flex items-center gap-2 bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 px-6 py-3 rounded-lg font-bold hover:bg-slate-300 dark:hover:bg-slate-800 transition-all" href="tel:+15550123456">
                <span className="material-symbols-outlined text-xl">call</span>
                +1 (555) 012-3456
              </a>
            </div>
          </div>
          
          {/* Card 2: Socials 2x2 Grid */}
          <div className="md:col-span-5 lg:col-span-4 bg-black/20 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10 p-4 grid grid-cols-2 grid-rows-2 gap-4">
            <a className="bg-white/50 dark:bg-background-dark rounded-lg flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-white/10 group hover:border-primary transition-all backdrop-blur-sm" href="#">
              <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors text-3xl font-bold">IG</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Instagram</span>
            </a>
            <a className="bg-white/50 dark:bg-background-dark rounded-lg flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-white/10 group hover:border-primary transition-all backdrop-blur-sm" href="#">
              <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors text-3xl font-bold">LI</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">LinkedIn</span>
            </a>
            <a className="bg-white/50 dark:bg-background-dark rounded-lg flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-white/10 group hover:border-primary transition-all backdrop-blur-sm" href="#">
              <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors text-3xl font-bold">GH</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">GitHub</span>
            </a>
            <a className="bg-white/50 dark:bg-background-dark rounded-lg flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-white/10 group hover:border-primary transition-all backdrop-blur-sm" href="#">
              <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors text-3xl font-bold">ML</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Newsletter</span>
            </a>
          </div>
          
          {/* Card 3: Headquarters */}
          <div className="md:col-span-12 bg-black/20 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col lg:flex-row min-h-[400px]">
            <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Base</span>
              </div>
              <h3 className="text-4xl font-bold mb-6">Headquarters</h3>
              <div className="space-y-2 mb-8">
                <p className="text-xl text-slate-900 dark:text-slate-200">123 Tech Plaza</p>
                <p className="text-xl text-slate-900 dark:text-slate-200">Silicon Valley, CA 94025</p>
                <p className="text-slate-600 dark:text-slate-500">United States of America</p>
              </div>
              <button className="w-fit flex items-center gap-2 bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 px-8 py-4 rounded-lg font-bold hover:bg-slate-300 dark:hover:bg-slate-800 transition-all">
                Get Directions
                <span className="material-symbols-outlined">north_east</span>
              </button>
            </div>
            <div className="lg:w-1/2 min-h-[300px] bg-slate-200 dark:bg-slate-900 relative">
              <div className="absolute inset-0 grayscale opacity-40 hover:opacity-60 transition-opacity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC8f_FW78EukLAkn5pZMJw-H7U44TieL9nI4_HxEzQoXTSLr18QRXrbckt-DJmPeJpjFiAz6Xs_mzdEWTkDLF9aoDGsWJB1w3E6Xi8_avngw8aAG4YGY8kMIjX-0wGV2wNwgh-FIOwa5rdqlMhUpBR0m4RFdfehMuX98Y6hgLIbEHzt-C4NHm_X5M_MoKAUlxPXfAlnbKTBsySSghXY2TkX15RHUEFb4K95PBbmsH4anctcvoqdGIzVkp4usIA4iEQJhmYeN7cbHcE")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_#06f5f9]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
