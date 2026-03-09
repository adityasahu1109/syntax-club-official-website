import React from 'react';

const Milestones = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Legacy of Excellence
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Tracking our journey from early prototypes to international recognition. Every milestone represents thousands of hours of dedication.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 timeline-line opacity-50 rounded-full"></div>
        <div className="space-y-24">
          
          {/* Timeline Item 1 - Left */}
          <div className="relative flex items-center justify-between w-full">
            <div className="hidden md:block w-5/12 pr-12 text-right">
              <div className="glass-card p-6 rounded-xl hover:border-primary/40 transition-all group">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">December 2023</span>
                <h3 className="text-2xl font-bold mb-2">Global FinTech Challenge</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 font-bold mb-4">
                  $15,000 Seed Funding &amp; 1st Place
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our decentralized payment gateway prototype won against 400 competing startups, recognized for its innovative zero-knowledge proof implementation.
                </p>
              </div>
            </div>
            {/* Icon in center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-background-dark border-4 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(6,245,249,0.4)]">
                <span className="material-symbols-outlined text-primary">emoji_events</span>
              </div>
            </div>
            <div className="w-full md:w-5/12 pl-12 md:block hidden"></div>
          </div>

          {/* Timeline Item 2 - Right */}
          <div className="relative flex items-center justify-between w-full">
            <div className="w-full md:w-5/12 pr-12 md:block hidden"></div>
            {/* Icon in center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-background-dark border-4 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <span className="material-symbols-outlined text-blue-400">code</span>
              </div>
            </div>
            <div className="w-full md:w-5/12 pl-12">
              <div className="glass-card p-6 rounded-xl hover:border-blue-400/40 transition-all">
                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-2 block">October 2023</span>
                <h3 className="text-2xl font-bold mb-2">Open Source Excellence</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary font-bold mb-4">
                  GitHub Top Contributor Badge
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Recognized for our significant contributions to the React and Next.js ecosystems, merging over 50 major pull requests in a single quarter.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Item 3 - Left */}
          <div className="relative flex items-center justify-between w-full">
            <div className="w-full md:w-5/12 pr-12 text-right">
              <div className="glass-card p-6 rounded-xl hover:border-primary/40 transition-all">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">August 2023</span>
                <h3 className="text-2xl font-bold mb-2">AI Innovation Summit</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 font-bold mb-4">
                  Runner Up - $5,000 Prize
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Developed an edge-computing model for real-time sign language translation, achieving 98.4% accuracy on mobile devices.
                </p>
              </div>
            </div>
            {/* Icon in center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-background-dark border-4 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(6,245,249,0.4)]">
                <span className="material-symbols-outlined text-primary">psychology</span>
              </div>
            </div>
            <div className="w-full md:w-5/12 pl-12 md:block hidden"></div>
          </div>

          {/* Timeline Item 4 - Right */}
          <div className="relative flex items-center justify-between w-full">
            <div className="w-full md:w-5/12 pr-12 md:block hidden"></div>
            {/* Icon in center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-background-dark border-4 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <span className="material-symbols-outlined text-blue-400">workspace_premium</span>
              </div>
            </div>
            <div className="w-full md:w-5/12 pl-12">
              <div className="glass-card p-6 rounded-xl hover:border-blue-400/40 transition-all">
                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-2 block">June 2023</span>
                <h3 className="text-2xl font-bold mb-2">Regional Hackathon</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary font-bold mb-4">
                  Best UI/UX Design Award
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our submission "EcoPath" was lauded for its accessibility features and stunning dark-mode interface, setting a new standard for club projects.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Featured Project Card */}
      <div className="mt-32">
        <div className="flex flex-col md:flex-row items-stretch justify-start rounded-xl overflow-hidden glass-card shadow-2xl">
          <div className="w-full md:w-2/5 relative">
            <img alt="Cybersecurity lab with glowing screens" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMuD5xZtiJUQNpiwwEQ2RCLy7_azAdCJlkoQrGWxpqCcfcBL15lm5GnHNWNPmOPvyDhA31zJBSjGx8kOW3pnvN-djLMfo_C_z_7g71JVRYrBhWGHsjChpM3-enOgQY9-od0miT6JZvzVFyLqjh1Lgl5MUwh4Dvgg3Q8QD3GbMzCEuXqCtvJ54pM0D5QOrHsGqbZR4HuDfjPe_pUavuClHEo2d4IAM6DtLzBFc_NpBXuD00n_oDQ73iuD_9p5j2EIbETyR_RnGDLA" />
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark/20 to-transparent"></div>
          </div>
          <div className="flex w-full grow flex-col items-stretch justify-center gap-4 p-8">
            <div>
              <p className="text-primary text-sm font-semibold mb-1">Latest Achievement Spotlight</p>
              <p className="text-slate-400 text-xs font-normal">October 15, 2023</p>
            </div>
            <h3 className="text-white text-3xl font-bold leading-tight tracking-tight">National Security Hackathon</h3>
            <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-primary text-xl font-bold">$5,000 Grand Prize &amp; Platinum Medal</p>
                <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                  Our team successfully defended a virtual infrastructure against coordinated simulated attacks, while developing an automated incident response script that outperformed all other teams.
                </p>
              </div>
              <button className="flex shrink-0 min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-background-dark text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(6,245,249,0.3)]">
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-primary/10 text-center">
        <div>
          <p className="text-3xl font-black text-primary mb-1">12</p>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Major Wins</p>
        </div>
        <div>
          <p className="text-3xl font-black text-primary mb-1">$45k+</p>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Prize Money</p>
        </div>
        <div>
          <p className="text-3xl font-black text-primary mb-1">200+</p>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Active Coders</p>
        </div>
        <div>
          <p className="text-3xl font-black text-primary mb-1">5</p>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Tech Summits</p>
        </div>
      </div>
    </div>
  );
};

export default Milestones;
