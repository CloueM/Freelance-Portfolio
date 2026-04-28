import React, { useState, useEffect, Suspense } from 'react'
import { useDynamicTitle } from './hooks/useDynamicTitle';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './features/Home'
import Footer from './layout/Footer'
import ScrollCTA from './layout/ScrollCTA'
import SoundControl from './layout/SoundControl'
import SplashScreen from './layout/SplashScreen'
import SmoothFollower from './layout/SmoothFollower'
import Aurora from './components/Aurora'
import SmoothScroll from './layout/SmoothScroll'
import './App.css'

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [bgMusicStarted, setBgMusicStarted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (hasStarted) {
      setIsLocked(true);
      const timer = setTimeout(() => {
        setIsLocked(false);
      }, 10500); // 7.8s delay + 2.5s slow reveal = ~10.3s
      return () => clearTimeout(timer);
    }
  }, [hasStarted]);

  useDynamicTitle("Kurowii | Creative Developer", "Come back! 👋");

  const handleIntroEnd = () => {
    setBgMusicStarted(true);
  };

  const handleAudioInit = (audio) => {
    if (!audio) return;
    
    const checkTime = () => {
      if (audio.currentTime >= 12.87) {
        setBgMusicStarted(true);
        audio.removeEventListener('timeupdate', checkTime);
      }
    };
    
    audio.addEventListener('timeupdate', checkTime);
  };

  return (
    <>
      <div className="global-aurora-bg">
        <Aurora
          colorStops={["#DCD6CC","#A99F96","#6F6860"]}
          blend={1}
          amplitude={1.0}
          speed={0.8}
        />
      </div>
      <div className="global-overlay"></div>
      <SmoothFollower />
      <SmoothScroll isLocked={isLocked}>
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.div
              key="splash"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <SplashScreen 
                onStart={() => setHasStarted(true)} 
                onIntroEnd={handleIntroEnd}
                onAudioInit={handleAudioInit}
              />
            </motion.div>
          ) : (
            <>
              <motion.div
                key="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ width: '100%', position: 'relative' }}
              >
                <AnimatePresence mode="wait">
                  <Suspense fallback={null}>
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<Home />} />
                    </Routes>
                  </Suspense>
                </AnimatePresence>
                <Footer />
                <SoundControl isVisible={bgMusicStarted} />
              </motion.div>
              <ScrollCTA />
            </>
          )}
        </AnimatePresence>
      </SmoothScroll>
    </>
  );
}

export default App
