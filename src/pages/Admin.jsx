import React, { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';
import blogsData from '../data/blogs.json';
import FadeIn from '../components/FadeIn';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  
  // State for data
  const [projects, setProjects] = useState(projectsData);
  const [blogs, setBlogs] = useState(blogsData);
  
  // State for form
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Reset message when switching tabs
  useEffect(() => {
    setMessage({ text: '', type: '' });
    setEditingItem(null);
  }, [activeTab]);

  const handleSaveData = async (type, data) => {
    setIsSaving(true);
    setMessage({ text: 'Saving...', type: 'info' });
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save. If you are in production, changes cannot be saved to the local file system.');
      }
      
      setMessage({ text: 'Saved successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error(error);
      setMessage({ text: error.message || 'Error saving data. Remember: in production this requires a backend!', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNew = () => {
    const newItem = activeTab === 'projects'
      ? { id: Date.now(), title: '', category: '', description: '', imageUrl: '', liveUrl: '', githubUrl: '', blogUrl: '' }
      : { id: Date.now(), title: '', author: '', date: new Date().toISOString().split('T')[0], excerpt: '', imageUrl: '' };
    
    setEditingItem(newItem);
    setIsNew(true);
    setMessage({ text: '', type: '' });
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setMessage({ text: '', type: '' });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    if (activeTab === 'projects') {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      handleSaveData('projects', updated);
    } else {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      handleSaveData('blogs', updated);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'projects') {
      const updated = isNew 
        ? [...projects, editingItem]
        : projects.map(p => p.id === editingItem.id ? editingItem : p);
      
      setProjects(updated);
      handleSaveData('projects', updated);
    } else {
      const updated = isNew
        ? [...blogs, editingItem]
        : blogs.map(b => b.id === editingItem.id ? editingItem : b);
        
      setBlogs(updated);
      handleSaveData('blogs', updated);
    }
    setEditingItem(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex flex-col gap-4">
        <h2 className="text-xl font-black text-white mb-4 uppercase tracking-wider">Admin Panel</h2>
        
        <button 
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm tracking-wider uppercase transition-all ${
            activeTab === 'projects' 
              ? 'bg-primary text-black shadow-[0_0_15px_rgba(6,245,249,0.3)]' 
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-xl">folder</span>
          Projects
        </button>
        
        <button 
          onClick={() => setActiveTab('blogs')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm tracking-wider uppercase transition-all ${
            activeTab === 'blogs' 
              ? 'bg-primary text-black shadow-[0_0_15px_rgba(6,245,249,0.3)]' 
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-xl">article</span>
          Blogs
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-10 shadow-[0_0_20px_rgba(6,245,249,0.05)] backdrop-blur-md">
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg font-bold ${
            message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
            message.type === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          }`}>
            {message.text}
          </div>
        )}

        {editingItem ? (
          <FadeIn>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h3 className="text-2xl font-black text-white">
                {isNew ? 'New' : 'Edit'} <span className="text-primary">{activeTab === 'projects' ? 'Project' : 'Blog'}</span>
              </h3>
              <button 
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold tracking-wider text-xs uppercase transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {activeTab === 'projects' ? (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title *</label>
                    <input required name="title" value={editingItem.title} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="E.g. SyntaX API" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Category *</label>
                    <input required name="category" value={editingItem.category} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="E.g. Web App" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description *</label>
                    <textarea required name="description" value={editingItem.description} onChange={handleChange} rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Project details..." />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Image URL *</label>
                    <input required name="imageUrl" value={editingItem.imageUrl} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="https://..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Live URL (optional)</label>
                      <input name="liveUrl" value={editingItem.liveUrl || ''} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">GitHub URL (optional)</label>
                      <input name="githubUrl" value={editingItem.githubUrl || ''} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Blog URL (optional)</label>
                    <input name="blogUrl" value={editingItem.blogUrl || ''} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" placeholder="Used as Read More link" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Title *</label>
                    <input required name="title" value={editingItem.title} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Author *</label>
                      <input required name="author" value={editingItem.author} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Date *</label>
                      <input required type="date" name="date" value={editingItem.date} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors [color-scheme:dark]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Excerpt *</label>
                    <textarea required name="excerpt" value={editingItem.excerpt} onChange={handleChange} rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Image URL *</label>
                    <input required name="imageUrl" value={editingItem.imageUrl} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                </>
              )}
              
              <div className="pt-4 mt-2 border-t border-white/5">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full md:w-auto px-8 py-3 bg-primary text-black font-black uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">save</span>
                      Save {activeTab === 'projects' ? 'Project' : 'Blog'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </FadeIn>
        ) : (
          <FadeIn>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h3 className="text-2xl font-black text-white capitalize flex items-center gap-2">
                Manage {activeTab}
                <span className="px-2.5 py-1 bg-white/10 rounded-full text-xs font-bold text-slate-300 ml-2">
                  {(activeTab === 'projects' ? projects : blogs).length}
                </span>
              </h3>
              <button 
                onClick={handleAddNew}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-black rounded-lg font-bold tracking-wider text-xs uppercase hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(6,245,249,0.2)] hover:shadow-[0_0_20px_rgba(6,245,249,0.4)]"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Add New {activeTab === 'projects' ? 'Project' : 'Blog'}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {(activeTab === 'projects' ? projects : blogs).map(item => (
                <div key={item.id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full sm:w-24 h-32 sm:h-16 object-cover rounded-lg border border-white/5" />
                    ) : (
                      <div className="w-full sm:w-24 h-32 sm:h-16 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 border border-white/5">
                        <span className="material-symbols-outlined">image</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-slate-400 text-sm mt-1 line-clamp-1">
                        {activeTab === 'projects' ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-white/5 rounded text-xs">{item.category}</span>
                            {item.description}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-white/5 rounded text-xs">{new Date(item.date).toLocaleDateString()}</span>
                            {item.author}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-white/5 sm:border-0">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      <span className="sm:hidden">Edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      <span className="sm:hidden">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
              
              {(activeTab === 'projects' ? projects : blogs).length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 px-4 bg-black/10 rounded-xl border border-white/5 border-dashed">
                  <span className="material-symbols-outlined text-5xl text-slate-500 mb-4 opacity-50">search_off</span>
                  <p className="text-slate-400 font-medium">No items found.</p>
                  <button 
                    onClick={handleAddNew}
                    className="mt-4 text-primary text-sm font-bold uppercase tracking-wider hover:underline"
                  >
                    Create the first {activeTab === 'projects' ? 'Project' : 'Blog'}
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default Admin;
