import React, { useState, useMemo } from 'react';
import eventsData from '../data/events.json';
import FadeIn from '../components/FadeIn';

const CATEGORIES = ['All', 'Workshop', 'Seminar', 'Competition'];

const Events = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const today = new Date();

  // Split into upcoming / past based on today's date
  const { upcoming, past } = useMemo(() => {
    const filtered = activeCategory === 'All'
      ? eventsData
      : eventsData.filter(e => e.category === activeCategory);

    return {
      upcoming: filtered.filter(e => new Date(e.date) >= today).sort((a, b) => new Date(a.date) - new Date(b.date)),
      past: filtered.filter(e => new Date(e.date) < today).sort((a, b) => new Date(b.date) - new Date(a.date)),
    };
  }, [activeCategory]);

  const categoryColors = {
    Workshop: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Seminar: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Competition: 'bg-primary/20 text-primary border-primary/30',
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8 overflow-hidden">
      {/* Page Header */}
      <FadeIn direction="down">
        <div className="flex flex-col gap-6 mb-10 text-center md:text-left items-center md:items-start">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">Community</span>
            <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tighter">
              Developer <span className="gradient-text">Events</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Connect, learn, and grow with the SyntaX community. From workshops to large-scale competitions.
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                  activeCategory === cat
                    ? 'bg-primary text-black border-primary shadow-[0_0_12px_rgba(6,245,249,0.4)]'
                    : 'bg-primary/5 dark:bg-primary/10 text-slate-600 dark:text-slate-300 border-primary/20 hover:border-primary/60 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Upcoming Events */}
      <section className="mb-16">
        <FadeIn direction="left">
          <div className="flex items-center mb-8 border-b border-slate-200 dark:border-primary/10 pb-4">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
          </div>
        </FadeIn>

        {upcoming.length === 0 ? (
          <FadeIn>
            <div className="text-center py-16 text-slate-400">
              <span className="material-symbols-outlined text-5xl mb-3 block text-primary/40">event_busy</span>
              No upcoming events in this category. Check back soon!
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcoming.map((event, index) => (
              <FadeIn key={event.id} direction="up" delay={index * 150} className="h-full">
                <div className="flex flex-col h-full bg-white/5 backdrop-blur-md rounded-xl border border-primary/10 overflow-hidden hover:border-primary transition-all group">
                  <div className="h-48 bg-cover bg-center overflow-hidden relative" style={{ backgroundImage: `url('${event.imageUrl}')` }}>
                    <div className="absolute top-0 left-0 m-4 flex gap-2">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest border ${categoryColors[event.category] || 'bg-primary/20 text-primary border-primary/30'}`}>
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex flex-col grow">
                    <p className="text-primary font-bold text-[10px] md:text-xs mb-2 tracking-widest uppercase">
                      {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-slate-400 text-xs md:text-sm mb-3 md:mb-4 flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-primary/60">location_on</span>
                      {event.location}
                    </p>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-3">{event.description}</p>
                    <div className="mt-auto">
                      <button className="w-full bg-primary hover:bg-primary/80 text-black font-extrabold py-3 rounded-lg transition-all active:scale-95">
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      {past.length > 0 && (
        <section>
          <FadeIn direction="left">
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 dark:border-primary/10 pb-4">
              <h2 className="text-2xl font-bold">Past Events</h2>
              <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Archive</span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {past.map((event, index) => (
              <FadeIn key={event.id} direction="up" delay={index * 100} className="h-full">
                <div className="flex flex-col h-full bg-white/5 backdrop-blur-md rounded-lg border border-primary/10 overflow-hidden opacity-80">
                  <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url('${event.imageUrl}')` }}>
                    <div className="absolute top-0 left-0 m-2">
                      <span className="bg-slate-700/80 text-white px-2 py-1 inline-block rounded text-[10px] font-bold uppercase">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 flex flex-col grow">
                    <p className="text-slate-500 font-bold text-[10px] mb-1 uppercase">
                      {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                    <h4 className="text-sm md:text-base font-bold mb-2">{event.title}</h4>
                    <p className="text-slate-400 text-[10px] md:text-xs mb-3 md:mb-4 line-clamp-2">{event.description}</p>
                    <div className="mt-auto">
                      <button className="w-full bg-white/5 border-white/10 border text-white text-slate-500 font-bold py-2 rounded-md text-sm cursor-not-allowed" disabled>
                        Closed
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </section>
      )}
    </div>
  );
};

export default Events;
