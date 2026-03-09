import React from 'react';
import projectsData from '../data/projects.json';

const Projects = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 w-full">
      <section className="mb-16">
        <div className="flex flex-col gap-2">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">Open Source</span>
          <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tighter">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Projects</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mt-1">
            Explore cutting-edge prototypes and community-driven innovations built by our members.
          </p>
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <div key={project.id} className="group flex flex-col glass-card rounded-xl overflow-hidden transition-all hover:border-primary/40">
            <div className="relative aspect-video overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
              <img alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={project.imageUrl} />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="px-3 py-1 bg-primary text-background-dark text-xs font-bold rounded-full uppercase tracking-widest">Active</span>
                <span className="px-3 py-1 bg-slate-900/80 text-primary text-xs font-bold rounded-full uppercase tracking-widest">{project.category}</span>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <h3 className="font-orbitron text-3xl font-bold mb-4 text-slate-100 group-hover:text-primary transition-colors uppercase">
                {project.title}
              </h3>
              <p className="text-slate-400 mb-8 flex-1 text-lg">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-auto">
                <a href={project.link} className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-cyan-500 text-background-dark font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">rocket_launch</span>
                  View Live
                </a>
                <a href={project.link} className="px-6 py-3 rounded-lg border border-white/20 text-slate-100 font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">code</span>
                  Source Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
