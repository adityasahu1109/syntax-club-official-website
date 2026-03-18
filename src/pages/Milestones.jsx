import React, { useMemo } from 'react';
import milestonesData from '../data/milestones.json';
import useCountUp from '../hooks/useCountUp';

const colorMap = {
  primary: {
    border: 'border-primary',
    shadow: 'shadow-[0_0_20px_rgba(6,245,249,0.4)]',
    text: 'text-primary',
    badge: 'text-primary',
    gradient: 'from-primary to-blue-400',
    hoverBorder: 'hover:border-primary/40',
  },
  blue: {
    border: 'border-blue-500',
    shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]',
    text: 'text-blue-400',
    badge: 'text-blue-400',
    gradient: 'from-blue-400 to-primary',
    hoverBorder: 'hover:border-blue-400/40',
  },
};

const MileStat = ({ value, prefix = '', suffix = '', label }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="glass-card rounded-xl p-6 text-center">
      <p className="text-3xl font-black text-primary mb-1">{prefix}{count}{suffix}</p>
      <p className="text-slate-400 text-xs uppercase tracking-widest">{label}</p>
    </div>
  );
};

const Milestones = () => {
  // Find the latest milestone by date dynamically
  const latestMilestone = useMemo(() => {
    return [...milestonesData].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }, []);

  // Sort all milestones newest first for the timeline
  const sortedMilestones = useMemo(() => {
    return [...milestonesData].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-primary font-bold tracking-widest text-xs uppercase">Track Record</span>
        <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tighter mt-2">
          Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Excellence</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg mt-4">
          Tracking our journey from early prototypes to international recognition. Every milestone represents thousands of hours of dedication.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pt-8 border-t border-primary/10">
        <MileStat value={12}  suffix="+"  label="Major Wins" />
        <MileStat value={45}  prefix="$" suffix="k+" label="Prize Money" />
        <MileStat value={200} suffix="+" label="Active Coders" />
        <MileStat value={5}               label="Tech Summits" />
      </div>

      {/* Latest Achievement Spotlight — dynamically resolved */}
      <div className="mb-20">
        <p className="text-primary font-bold tracking-widest text-xs uppercase mb-4">Latest Achievement</p>
        <div className="flex flex-col md:flex-row items-stretch rounded-xl overflow-hidden glass-card shadow-2xl">
          {latestMilestone.imageUrl && (
            <div className="w-full md:w-2/5 relative min-h-[200px]">
              <img
                alt={latestMilestone.title}
                className="w-full h-full object-cover"
                src={latestMilestone.imageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background-dark/20 to-transparent" />
            </div>
          )}
          <div className="flex grow flex-col justify-center gap-3 p-8">
            <div>
              <p className="text-primary text-sm font-semibold mb-1">Achievement Spotlight</p>
              <p className="text-slate-400 text-xs">{latestMilestone.label}</p>
            </div>
            <h3 className="text-white text-3xl font-bold leading-tight tracking-tight">
              {latestMilestone.title}
            </h3>
            <p className="text-primary text-xl font-bold">{latestMilestone.subtitle}</p>
            <p className="text-slate-300 text-base leading-relaxed max-w-xl">
              {latestMilestone.description}
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative mt-8">
        {/* Central Line (hidden on mobile, uses alternative styling below) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 timeline-line opacity-50 rounded-full" />
        {/* Mobile Line */}
        <div className="md:hidden absolute left-6 h-full w-1 timeline-line opacity-50 rounded-full" />

        <div className="space-y-16 md:space-y-24">
          {sortedMilestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            const c = colorMap[milestone.color] || colorMap.primary;

            return (
              <div key={milestone.id} className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full pl-16 md:pl-0">
                {/* Left side desktop */}
                <div className={`hidden md:flex w-5/12 pr-12 justify-end ${!isLeft && 'invisible'}`}>
                  <div className={`glass-card p-6 rounded-xl ${c.hoverBorder} transition-all group w-full text-right`}>
                    <span className={`${c.badge} text-xs font-bold tracking-widest uppercase mb-2 block`}>
                      {milestone.label}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                    <p className={`text-transparent bg-clip-text bg-gradient-to-r ${c.gradient} font-bold mb-4`}>
                      {milestone.subtitle}
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10 top-0 md:top-auto ml-2 md:ml-0">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-background-dark ${c.border} border-4 flex items-center justify-center ${c.shadow} mt-1 md:mt-0`}>
                    <span className={`material-symbols-outlined text-lg md:text-xl ${c.text}`}>{milestone.icon}</span>
                  </div>
                </div>

                {/* Right side desktop AND Mobile default content */}
                <div className={`w-full md:w-5/12 md:pl-12 ${isLeft ? 'md:hidden md:invisible' : ''}`}>
                  <div className={`glass-card p-5 md:p-6 rounded-xl ${c.hoverBorder} transition-all group w-full`}>
                    <span className={`${c.badge} text-xs font-bold tracking-widest uppercase mb-2 block`}>
                      {milestone.label}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{milestone.title}</h3>
                    <p className={`text-transparent bg-clip-text bg-gradient-to-r ${c.gradient} font-bold mb-3 md:mb-4`}>
                      {milestone.subtitle}
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Milestones;
