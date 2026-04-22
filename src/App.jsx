import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './components/Home'
import Footer from './components/Footer'
import ScrollCTA from './components/ScrollCTA'
import SoundControl from './components/SoundControl'
import SplashScreen from './components/SplashScreen'
import SmoothFollower from './components/SmoothFollower'
import Aurora from './components/Aurora'
import './App.css'

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="global-aurora-bg">
        <Aurora
          colorStops={["#DCD6CC","#6F6860","#A99F96"]}
          blend={0.63}
          amplitude={1.0}
          speed={1}
        />
      </div>
      <div className="global-overlay"></div>
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
