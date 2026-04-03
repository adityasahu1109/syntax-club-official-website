import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/ui/CustomCursor';
import GlobalBackground from './components/ui/GlobalBackground';

// Pages
import Home from './pages/Home';
import Alumni from './pages/Alumni';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Milestones from './pages/Milestones';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Blogs from './pages/Blogs';
import BlogArticle from './pages/BlogArticle';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <GlobalBackground />
      <div className="relative z-10 flex flex-col min-h-screen text-white w-full">
        <Navbar />
        <main className="flex-1 w-full flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div className="w-full pt-20"><Team /></div>} />
            <Route path="/events" element={<div className="w-full pt-20"><Events /></div>} />
            <Route path="/projects" element={<div className="w-full pt-20"><Projects /></div>} />
            <Route path="/alumni" element={<div className="w-full pt-20"><Alumni /></div>} />
            <Route path="/milestones" element={<div className="w-full pt-20"><Milestones /></div>} />
            <Route path="/blogs" element={<div className="w-full pt-20"><Blogs /></div>} />
            <Route path="/blogs/:slug" element={<div className="w-full pt-20"><BlogArticle /></div>} />
            <Route path="/contact" element={<div className="w-full pt-20"><Contact /></div>} />
            <Route path="/admin" element={<div className="w-full pt-20"><Admin /></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
