import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Articles from './pages/Articles';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import YouTube from './pages/YouTube';
import UniversalSearch from './components/UniversalSearch';
import UniversalSearchTooltip from './components/UniversalSearchTooltip';


function App() {
  // Initialize theme on app load
  useEffect(() => {
    // Get theme from localStorage or use dark theme as default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the theme class to the document
    document.documentElement.classList.toggle('light', savedTheme === 'light');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    
    // Also set a data attribute for additional CSS targeting
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/youtube" element={<YouTube />} />
          {/* Redirect any other routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <UniversalSearch />
      <UniversalSearchTooltip />
    </Router>
  );
}

export default App;