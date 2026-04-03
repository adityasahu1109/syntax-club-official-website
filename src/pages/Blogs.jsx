import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      const { data, error } = await supabase.from('blogs').select('*').order('date', { ascending: false });
      if (error) console.error(error);
      else setBlogsData(data);
    }
    getBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 w-full">
      <section className="mb-16">
        <div className="flex flex-col gap-2">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">Knowledge Hub</span>
          <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tighter">
            Latest <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mt-1">
            Deep dives, technical tutorials, and insights from the SyntaX community.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsData.map((blog) => (
          <div key={blog.id} className="group flex flex-col bg-white/5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(6,245,249,0.05)] hover:border-primary/50 transition-colors">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={blog.imageUrl} 
                alt={blog.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-background-dark text-xs font-bold rounded-full uppercase tracking-widest">
                  Blog
                </span>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                <span>{new Date(blog.date).toLocaleDateString()}</span>
                <span className="text-slate-600 dark:text-slate-500">•</span>
                <span>{blog.author}</span>
              </div>
              
              <h3 className="text-white text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                {blog.title}
              </h3>
              
              <p className="text-slate-400 text-sm mb-8 flex-1 line-clamp-3">
                {blog.excerpt}
              </p>
              
              <div className="mt-auto">
                <Link to={`/blogs/${blog.slug || blog.id}`} className="w-full px-6 py-3 rounded-lg bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase border border-primary/20 hover:bg-primary hover:text-background-dark transition-all flex items-center justify-center gap-2">
                  Read Full Article
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
