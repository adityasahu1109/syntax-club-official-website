import React from 'react';
import teamData from '../data/team.json';

const Team = () => {
  return (
    <div className="flex-1 flex flex-col items-center py-12 px-6">
      <div className="max-w-6xl w-full">
        <div className="mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">Core Members</span>
            <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tighter">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Architects</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mt-1">
              Building the digital infrastructure of tomorrow. Meet the minds behind the SyntaX ecosystem.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamData.map((member) => (
            <div key={member.id} className="flex flex-col items-center p-8 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary transition-all group">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-primary p-1 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center" style={{ backgroundImage: `url('${member.imageUrl}')` }}></div>
                </div>
              </div>
              <h3 className="text-slate-900 dark:text-slate-100 text-xl font-black tracking-tight uppercase group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 uppercase tracking-widest">
                {member.role}
              </p>
              <div className="flex gap-4 mt-6">
                <a className="text-slate-400 hover:text-primary transition-colors" href="#">
                  <span className="material-symbols-outlined">code</span>
                </a>
                <a className="text-slate-400 hover:text-primary transition-colors" href="#">
                  <span className="material-symbols-outlined">link</span>
                </a>
                <a className="text-slate-400 hover:text-primary transition-colors" href="#">
                  <span className="material-symbols-outlined">mail</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
