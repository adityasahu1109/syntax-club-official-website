import React from 'react';
import alumniData from '../data/alumni.json';
import FadeIn from '../components/FadeIn';

const Alumni = () => {
  return (
    <div className="flex-1 flex flex-col items-center px-6 py-12 lg:px-20 overflow-hidden">
      <div className="w-full max-w-5xl">
        {/* Page Header */}
        <FadeIn direction="down">
          <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Community Hub</span>
              <h1 className="text-white text-4xl sm:text-5xl leading-tight font-black tracking-tighter">
                The <span className="gradient-text">Legacy Network</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg max-w-xl mt-2">
                Honoring the pioneers and builders of the SyntaX ecosystem. Our community spans across continents and disciplines.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {alumniData.map((alumnus, index) => (
            <FadeIn key={alumnus.id} direction="up" delay={index * 100} className="w-full">
              <div
                className="flex items-center gap-6 bg-white/5 backdrop-blur-md p-6 rounded-xl border border-primary/10 shadow-sm hover:border-primary/40 transition-all group w-full"
              >
                {/* Avatar */}
                <div className="relative shrink-0 size-20 rounded-xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                  <img
                    className="w-full h-full object-cover"
                    alt={`Portrait of ${alumnus.name}`}
                    src={alumnus.imageUrl}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-white text-xl font-bold group-hover:text-primary transition-colors truncate">
                    {alumnus.name}
                  </p>
                  <p className="text-slate-400 text-sm font-medium mt-0.5">
                    Class of {alumnus.graduationYear || '2023'}
                  </p>
                </div>

                {/* LinkedIn link */}
                <a
                  href={alumnus.linkedinUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 size-10 flex items-center justify-center rounded-lg bg-black/20 dark:bg-primary/5 text-slate-500 dark:text-primary/60 hover:bg-primary hover:text-black transition-all"
                  title={`${alumnus.name} on LinkedIn`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alumni;
