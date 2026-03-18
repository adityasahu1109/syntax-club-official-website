import React from 'react';
import projectsData from '../data/projects.json';
import FadeIn from '../components/FadeIn';

const Projects = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 w-full overflow-hidden">
      {/* Header */}
      <FadeIn direction="down">
        <section className="mb-12 md:mb-16 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">Open Source</span>
            <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tighter">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Projects</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mt-1">
              Explore cutting-edge prototypes and community-driven innovations built by our members.
            </p>
          </div>
        </section>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <FadeIn key={project.id} direction="up" delay={index * 150} className="flex">
            <div className="group flex flex-col w-full bg-white/5 dark:bg-primary/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(6,245,249,0.08)]">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-900">
                <img
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={project.imageUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badges top-left */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-sm text-primary text-[10px] font-bold rounded-full uppercase tracking-widest border border-primary/20">
                    {project.category}
                  </span>
                  {project.liveUrl ? (
                    <span className="px-2.5 py-1 bg-primary/90 text-black text-[10px] font-bold rounded-full uppercase tracking-widest">
                      Live
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-700/80 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-widest">
                      No Demo
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Clickable title → redirects to blog/detail page */}
                <a
                  href={project.blogUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-3 group/title"
                  title="Read more about this project"
                >
                  <h3 className="text-slate-900 dark:text-slate-100 text-xl font-black tracking-tight leading-snug group-hover/title:text-primary transition-colors">
                    {project.title}
                    <span className="inline-block ml-2 opacity-0 group-hover/title:opacity-100 transition-opacity align-middle">
                      <span className="material-symbols-outlined text-base text-primary">open_in_new</span>
                    </span>
                  </h3>
                </a>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Action buttons — consistent sizing */}
                <div className="flex gap-3 mt-auto pt-4 border-t border-slate-200 dark:border-white/5">
                  {/* GitHub — always shown */}
                  <a
                    href={project.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider hover:border-primary hover:text-primary transition-all"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    Source
                  </a>

                  {/* Live — only if liveUrl exists */}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-primary/80 transition-all"
                    >
                      <span className="material-symbols-outlined text-base leading-none">rocket_launch</span>
                      View Live
                    </a>
                  ) : (
                    <span className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-400 font-bold text-xs uppercase tracking-wider cursor-not-allowed select-none">
                      <span className="material-symbols-outlined text-base leading-none">block</span>
                      No Deploy
                    </span>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default Projects;
