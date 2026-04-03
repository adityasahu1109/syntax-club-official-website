import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import FadeIn from '../components/FadeIn';

const SCHEMAS = {
  projects: [
    { name: 'title', label: 'Title *', required: true },
    { name: 'category', label: 'Category *', required: true },
    { name: 'description', label: 'Description *', required: true, type: 'textarea' },
    { name: 'imageUrl', label: 'Image URL *', required: true },
    { name: 'liveUrl', label: 'Live URL (optional)' },
    { name: 'githubUrl', label: 'GitHub URL (optional)' },
    { name: 'content', label: 'Content (Markdown)', type: 'markdown' },
  ],
  team: [
    { name: 'name', label: 'Name *', required: true },
    { name: 'role', label: 'Role *', required: true },
    { name: 'imageUrl', label: 'Image URL *', required: true },
    { name: 'mailUrl', label: 'Mail URL (optional)' },
    { name: 'linkedinUrl', label: 'LinkedIn URL (optional)' },
    { name: 'githubUrl', label: 'GitHub URL (optional)' },
  ],
  events: [
    { name: 'title', label: 'Title *', required: true },
    { name: 'date', label: 'Date *', required: true, type: 'date' },
    { name: 'category', label: 'Category *', required: true },
    { name: 'location', label: 'Location *', required: true },
    { name: 'description', label: 'Description *', required: true, type: 'textarea' },
    { name: 'imageUrl', label: 'Image URL *', required: true },
  ],
  blogs: [
    { name: 'title', label: 'Title *', required: true },
    { name: 'author', label: 'Author *', required: true },
    { name: 'date', label: 'Date *', required: true, type: 'date' },
    { name: 'excerpt', label: 'Excerpt *', required: true, type: 'textarea' },
    { name: 'imageUrl', label: 'Image URL *', required: true },
    { name: 'content', label: 'Content (Markdown) *', type: 'markdown', required: true },
  ],
  alumni: [
    { name: 'name', label: 'Name *', required: true },
    { name: 'graduationYear', label: 'Graduation Year *', required: true, type: 'number' },
    { name: 'imageUrl', label: 'Image URL *', required: true },
    { name: 'linkedinUrl', label: 'LinkedIn URL (optional)' },
  ],
  milestones: [
    { name: 'date', label: 'Date *', required: true, type: 'date' },
    { name: 'label', label: 'Label (e.g. June 2023) *', required: true },
    { name: 'title', label: 'Title *', required: true },
    { name: 'subtitle', label: 'Subtitle *', required: true },
    { name: 'icon', label: 'Material Icon String *', required: true },
    { name: 'description', label: 'Description *', required: true, type: 'textarea' },
    { name: 'imageUrl', label: 'Image URL (optional)' },
  ]
};

const TABS = Object.keys(SCHEMAS);

const Admin = () => {
  const [session, setSession] = useState(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('projects');
  
  // Data State
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // ————————————————— AUTH logic
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setMessage({ text: '', type: '' });
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    if (error) setMessage({ text: error.message, type: 'error' });
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // ————————————————— DATA logic
  const fetchData = async () => {
    setLoading(true);
    const { data: fetched, error } = await supabase.from(activeTab).select('*');
    if (error) {
      console.error(error);
      setMessage({ text: 'Failed to fetch data.', type: 'error' });
    } else {
      setData(fetched);
    }
    setLoading(false);
  };

  // Refetch when tab changes or session becomes available
  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [activeTab, session]);

  // ————————————————— CRUD logic
  const handleAddNew = () => {
    // Generate default object with empty strings for all schema keys
    const newObj = {};
    SCHEMAS[activeTab].forEach(field => {
      newObj[field.name] = field.type === 'number' ? 0 : '';
    });
    setEditingItem(newObj);
    setIsNew(true);
    setMessage({ text: '', type: '' });
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setMessage({ text: '', type: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${activeTab} item?`)) return;
    setIsSaving(true);
    
    // Deleting from Supabase
    const { error } = await supabase.from(activeTab).delete().eq('id', id);
    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setData(prev => prev.filter(p => p.id !== id));
      setMessage({ text: 'Deleted successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
    setIsSaving(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseInt(value) || 0 : value;
    setEditingItem(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: 'Saving...', type: 'info' });

    // Ensure we don't pass empty strings for UUIDs or random fields
    let payload = { ...editingItem };
    
    try {
      if (isNew) {
        // Insert (let DB handle ID)
        delete payload.id; 
        
        if ((activeTab === 'blogs' || activeTab === 'projects') && payload.title) {
          payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Date.now() / 1000);
        }

        const { data: inserted, error } = await supabase.from(activeTab).insert([payload]).select();
        if (error) throw error;
        setData(prev => [...prev, inserted[0]]);
      } else {
        // Update
        const targetId = payload.id;
        delete payload.id; // rarely needed for update payload body
        const { data: updated, error } = await supabase.from(activeTab).update(payload).eq('id', targetId).select();
        if (error) throw error;
        setData(prev => prev.map(p => p.id === targetId ? updated[0] : p));
      }
      
      setMessage({ text: 'Saved successfully!', type: 'success' });
      setEditingItem(null);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  // ————————————————— RENDER LOGIC

  if (!session) {
    return (
      <div className="flex-1 min-h-[70vh] flex items-center justify-center p-6">
        <FadeIn className="w-full max-w-md">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">admin_panel_settings</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-widest">Admin Access</h2>
            </div>
            
            {message.text && (
              <div className="mb-4 p-3 rounded-lg text-sm font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                {message.text}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input 
                required type="email" placeholder="Email"
                value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
              />
              <input 
                required type="password" placeholder="Password"
                value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
              />
              <button 
                type="submit" disabled={authLoading}
                className="w-full mt-4 bg-primary text-black font-black uppercase tracking-widest py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {authLoading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-white uppercase tracking-wider">Dashboard</h2>
        </div>
        
        {TABS.map(tab => (
          <button 
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setEditingItem(null);
              setMessage({ text: '', type: '' });
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm tracking-widest uppercase transition-all ${
              activeTab === tab 
                ? 'bg-primary text-black shadow-[0_0_15px_rgba(6,245,249,0.3)]' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {tab === 'projects' ? 'folder' : tab === 'blogs' ? 'article' : tab === 'team' ? 'group' : tab === 'events' ? 'event' : tab === 'milestones' ? 'flag' : 'school'}
            </span>
            {tab}
          </button>
        ))}

        <button 
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-xs tracking-widest uppercase border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Sign Out
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-10 shadow-2xl backdrop-blur-md">
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
                {isNew ? 'New' : 'Edit'} <span className="text-primary capitalize">{activeTab}</span>
              </h3>
              <button 
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold tracking-wider text-xs uppercase"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {SCHEMAS[activeTab].map(field => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      required={field.required} name={field.name} value={editingItem[field.name] || ''} onChange={handleChange} rows={4} 
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" 
                    />
                  ) : field.type === 'markdown' ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-colors px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">upload_file</span>
                          Upload .md File
                          <input 
                            type="file" 
                            accept=".md" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setEditingItem(prev => ({ ...prev, [field.name]: event.target.result }));
                              };
                              reader.readAsText(file);
                            }} 
                          />
                        </label>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">or paste below</span>
                      </div>
                      <textarea 
                        required={field.required} 
                        name={field.name} 
                        value={editingItem[field.name] || ''} 
                        onChange={handleChange} 
                        rows={12} 
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 min-h-[300px] text-white focus:border-primary focus:outline-none transition-colors font-mono text-sm leading-relaxed" 
                        placeholder="# Write your markdown here..."
                      />
                    </div>
                  ) : (
                    <input 
                      required={field.required} type={field.type || 'text'} name={field.name} value={editingItem[field.name] || ''} onChange={handleChange} 
                      className={`w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors ${field.type === 'date' ? '[color-scheme:dark]' : ''}`} 
                    />
                  )}
                </div>
              ))}
              
              <div className="pt-4 mt-2 border-t border-white/5">
                <button 
                  type="submit" disabled={isSaving}
                  className="w-full md:w-auto px-8 py-3 bg-primary text-black font-black uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isSaving ? 'Saving...' : 'Save Database'}
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
                  {loading ? '...' : data.length}
                </span>
              </h3>
              <button 
                onClick={handleAddNew}
                className="px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black rounded-lg font-bold tracking-widest text-xs uppercase transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Add New
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20 text-slate-400 animate-pulse font-bold tracking-widest uppercase text-sm">Loading Data...</div>
            ) : data.length === 0 ? (
              <div className="text-center py-16 text-slate-500 bg-black/20 rounded-xl border border-white/5">
                <span className="material-symbols-outlined text-5xl mb-3 block opacity-50">data_object</span>
                No items found for {activeTab}.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {data.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-colors group">
                    
                    {item.imageUrl && (
                      <div className="shrink-0 w-12 h-12 bg-black/50 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center text-[10px] text-slate-600">
                        {item.imageUrl.startsWith('http') ? (
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : 'IMG'}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-white font-bold truncate">
                        {item.title || item.name || item.label || 'Untitled Entity'}
                      </p>
                      <p className="text-slate-500 text-xs truncate uppercase tracking-wider font-bold mt-0.5">
                        {item.category || item.role || item.author || (item.date && new Date(item.date).toLocaleDateString()) || 'Item Record'}
                      </p>
                    </div>

                    <div className="flex gap-2 shrink-0 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors tooltip"
                        title="Edit Item"
                      >
                        <span className="material-symbols-outlined text-lg block">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors tooltip"
                        title="Delete Item"
                      >
                        <span className="material-symbols-outlined text-lg block">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default Admin;
