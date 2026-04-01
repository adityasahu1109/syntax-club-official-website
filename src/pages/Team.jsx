import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import FadeIn from '../components/FadeIn';

const Team = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTeam() {
      // By default order by id or fetch everything. 
      // If we want hierarchy without order_id, we just fetch them as is. They were ordered randomly anyway.
      const { data, error } = await supabase.from('team').select('*');
      if (error) console.error(error);
      else setTeamData(data);
      setLoading(false);
    }
    getTeam();
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center py-12 px-6 overflow-hidden">
      <div className="max-w-6xl w-full">
        <FadeIn direction="down">
          <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Core Members</span>
              <h1 className="text-white text-4xl sm:text-5xl leading-tight font-black tracking-tighter">
                The <span className="gradient-text">Architects</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg max-w-2xl mt-1">
                Building the digital infrastructure of tomorrow. Meet the minds behind the SyntaX ecosystem.
              </p>
            </div>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamData.map((member, index) => (
            <FadeIn key={member.id} delay={index * 100} direction="up" className="h-full">
              <div className="flex flex-col h-full items-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:border-primary transition-all group">
                <div className="relative mb-5">
                  <div className="w-28 h-28 rounded-full border-4 border-primary p-1 overflow-hidden">
                    <div className="w-full h-full rounded-full bg-white/5 border-white/10 border text-white bg-cover bg-center" style={{ backgroundImage: `url('${member.imageUrl}')` }}></div>
                  </div>
                </div>
                <h3 className="text-white text-xl font-black tracking-tight uppercase group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-widest text-center">
                  {member.role}
                </p>
                <div className="flex gap-4 mt-6">
                  <a className="text-slate-400 hover:text-primary transition-colors" href={member.mailUrl || '#'} title="Email">
                    <span className="material-symbols-outlined">mail</span>
                  </a>
                  <a className="text-slate-400 hover:text-primary transition-colors" href={member.linkedinUrl || '#'} title="LinkedIn" target="_blank" rel="noopener noreferrer">
                    {/* LinkedIn SVG */}
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a className="text-slate-400 hover:text-primary transition-colors" href={member.githubUrl || '#'} title="GitHub" target="_blank" rel="noopener noreferrer">
                    {/* GitHub SVG */}
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
