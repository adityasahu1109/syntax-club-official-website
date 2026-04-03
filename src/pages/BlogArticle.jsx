import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogArticle = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      
      // Try fetching by slug first, fallback to ID if it's a UUID
      let query = supabase.from('blogs').select('*').eq('slug', slug).single();
      let { data, error: fetchError } = await query;
      
      if (fetchError && slug.length === 36) {
        // Fallback to fetch by ID if slug parse failed and param looks like UUID
        const fallbackQuery = await supabase.from('blogs').select('*').eq('id', slug).single();
        data = fallbackQuery.data;
        fetchError = fallbackQuery.error;
      }

      if (fetchError) {
        console.error(fetchError);
        setError('Article not found.');
      } else {
        setBlog(data);
      }
      setLoading(false);
    }
    
    if (slug) fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center p-6">
        <div className="text-center text-primary font-bold tracking-widest uppercase animate-pulse">
          Loading Article...
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 gap-4">
        <span className="material-symbols-outlined text-6xl text-red-500 opacity-80">error</span>
        <h2 className="text-2xl font-black text-white">{error || "Article not found"}</h2>
        <Link to="/blogs" className="text-primary hover:underline uppercase text-xs font-bold tracking-widest mt-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full">
      <Link to="/blogs" className="text-primary hover:text-white transition-colors uppercase text-xs font-bold tracking-widest mb-8 inline-flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Blogs
      </Link>
      
      <article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-[0_0_30px_rgba(6,245,249,0.05)]">
        {/* Header Image */}
        {blog.imageUrl && (
          <div className="w-full aspect-[21/9] md:aspect-[3/1] relative">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
          </div>
        )}
        
        {/* Content Box */}
        <div className="p-8 md:p-12 relative -mt-20 md:-mt-32 z-10">
          
          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-widest uppercase mb-6">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/30">
              {new Date(blog.date).toLocaleDateString()}
            </span>
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">person</span>
              {blog.author}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
            {blog.title}
          </h1>

          <div className="w-20 h-1 bg-primary mb-10 rounded-full"></div>

          {/* Markdown Content */}
          <div className="markdown-body">
            {blog.content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <div className="my-6 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                        <SyntaxHighlighter
                          {...props}
                          children={String(children).replace(/\n$/, '')}
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{ margin: 0, padding: '1.5rem', background: '#0d1117' }}
                        />
                      </div>
                    ) : (
                      <code {...props} className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono border border-primary/20">
                        {children}
                      </code>
                    )
                  },
                  h1: ({node, ...props}) => <h2 className="text-3xl font-bold text-white mt-12 mb-6" {...props} />,
                  h2: ({node, ...props}) => <h3 className="text-2xl font-bold text-white mt-10 mb-5" {...props} />,
                  h3: ({node, ...props}) => <h4 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2 before:content-[''] before:block before:w-2 before:h-2 before:bg-primary before:rounded-full" {...props} />,
                  p: ({node, ...props}) => <p className="text-slate-300 text-lg leading-relaxed mb-6" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside text-slate-300 text-lg leading-relaxed mb-6 marker:text-primary space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside text-slate-300 text-lg leading-relaxed mb-6 marker:text-primary font-bold space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="pl-2" {...props} />,
                  a: ({node, ...props}) => <a className="text-primary hover:text-white underline underline-offset-4 decoration-primary/50 hover:decoration-white transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic bg-primary/5 rounded-r-lg text-slate-400" {...props} />,
                  table: ({node, ...props}) => <div className="overflow-x-auto my-8 border border-white/10 rounded-lg"><table className="w-full text-left border-collapse" {...props} /></div>,
                  th: ({node, ...props}) => <th className="p-4 bg-white/5 font-bold text-white uppercase tracking-wider text-xs border-b border-white/10" {...props} />,
                  td: ({node, ...props}) => <td className="p-4 border-b border-white/5 text-slate-300" {...props} />,
                  img: ({node, ...props}) => <img className="w-full rounded-xl my-8 border border-white/10 object-cover" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-12 border-white/10" {...props} />,
                }}
              >
                {blog.content}
              </ReactMarkdown>
            ) : (
              <p className="text-slate-500 italic">No content available for this post.</p>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogArticle;
