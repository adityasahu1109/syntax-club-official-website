import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Alumni from './pages/Alumni';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Milestones from './pages/Milestones';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Blogs from './pages/Blogs';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div className="w-full pt-24"><Team /></div>} />
            <Route path="/events" element={<div className="w-full pt-24"><Events /></div>} />
            <Route path="/projects" element={<div className="w-full pt-24"><Projects /></div>} />
            <Route path="/alumni" element={<div className="w-full pt-24"><Alumni /></div>} />
            <Route path="/milestones" element={<div className="w-full pt-24"><Milestones /></div>} />
            <Route path="/blogs" element={<div className="w-full pt-24"><Blogs /></div>} />
            <Route path="/contact" element={<div className="w-full pt-24"><Contact /></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
