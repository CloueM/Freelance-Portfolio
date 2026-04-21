import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './components/Home'
import About from './components/About'
import Footer from './components/Footer'
import ScrollCTA from './components/ScrollCTA'
import SoundControl from './components/SoundControl'
import SplashScreen from './components/SplashScreen'
import SmoothFollower from './components/SmoothFollower'
import BackgroundVideo from './components/BackgroundVideo'
import './App.css'

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const location = useLocation();

  return (
    <>
      <BackgroundVideo overlayClassName="global-overlay" />
      <SmoothFollower />
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <SplashScreen onStart={() => setHasStarted(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ width: '100%' }}
          >
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </AnimatePresence>
            <Footer />
            <SoundControl />
            <ScrollCTA />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App
