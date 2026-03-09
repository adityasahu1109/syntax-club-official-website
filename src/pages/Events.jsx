import React from 'react';
import eventsData from '../data/events.json';

const Events = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8">
      {/* Page Header */}
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">Community</span>
          <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tighter">
            Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Events</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            Connect, learn, and grow with the global SyntaX community. From workshops to large-scale conferences.
          </p>
        </div>
      </div>

      {/* Events Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 dark:border-primary/10 pb-4">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Stay Ahead</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <div key={event.id} className="flex flex-col bg-slate-50 dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden hover:border-primary transition-all group">
              <div className="h-48 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('${event.imageUrl}')` }}>
                <div className="bg-primary/90 text-black px-3 py-1 m-4 inline-block rounded font-bold text-xs uppercase tracking-tighter">
                  Event
                </div>
              </div>
              <div className="p-6 flex flex-col grow">
                <p className="text-primary font-bold text-xs mb-2 tracking-widest uppercase">{new Date(event.date).toLocaleDateString()}</p>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
                  {event.description}
                </p>
                <div className="mt-auto">
                  <button className="w-full bg-primary hover:bg-primary/80 text-black font-extrabold py-3 rounded-lg transition-all active:scale-95">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
