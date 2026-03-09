import React from 'react';
import alumniData from '../data/alumni.json';

const Alumni = () => {
  return (
    <div className="flex-1 flex flex-col items-center px-6 py-12 lg:px-20">
      <div className="w-full max-w-5xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">Community Hub</span>
            <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tighter">
              Alumni <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Plaques</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl">
              Honoring the pioneers and builders of the Syntax ecosystem. Our community spans across continents and disciplines.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="px-4 py-2 bg-primary text-slate-900 font-bold rounded-lg hover:brightness-110 transition-all text-sm">Join Directory</button>
            <button className="px-4 py-2 bg-slate-200 dark:bg-primary/10 text-slate-700 dark:text-primary font-bold rounded-lg hover:bg-primary/20 transition-all text-sm border border-transparent dark:border-primary/20">Class of 2024</button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-slate-900 px-6 text-sm font-bold shadow-lg shadow-primary/20">All Classes</button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-primary/20 px-6 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary transition-colors">Engineering</button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-primary/20 px-6 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary transition-colors">Design</button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-primary/20 px-6 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary transition-colors">Product</button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-primary/20 px-6 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary transition-colors">Data Science</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alumniData.map((alumnus) => (
            <div key={alumnus.id} className="flex items-center justify-between bg-white dark:bg-slate-900/40 p-5 rounded-xl border border-slate-200 dark:border-primary/10 shadow-sm hover:border-primary/40 transition-all group">
              <div className="flex items-center gap-5">
                <div className="relative size-16 rounded-lg overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                  <img className="w-full h-full object-cover" alt={`Portrait of ${alumnus.name}`} src={alumnus.imageUrl} />
                </div>
                <div className="flex flex-col">
                  <p className="text-slate-900 dark:text-slate-100 text-lg font-bold group-hover:text-primary transition-colors">{alumnus.name}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Class of {alumnus.graduationYear || '2023'} | {alumnus.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a className="size-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-primary/5 text-slate-600 dark:text-primary/70 hover:bg-primary hover:text-slate-900 transition-all" href={alumnus.linkedinUrl || '#'}>
                  <span className="material-symbols-outlined text-xl">link</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-primary/10">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-primary/10 dark:to-primary/5 p-8 md:p-12 rounded-3xl relative overflow-hidden text-center border border-primary/20">
            <h3 className="text-3xl font-black text-slate-900 dark:text-primary mb-4 relative z-10">Stay Connected</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto relative z-10">Get the latest news on Syntax alumni events, job boards, and networking opportunities delivered directly to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
              <input className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white dark:placeholder:text-white/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none backdrop-blur-sm" placeholder="Email address" type="email" />
              <button className="bg-primary text-background-dark font-black py-3 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform" type="button">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumni;
