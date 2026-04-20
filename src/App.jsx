import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'
import ScrollCTA from './components/ScrollCTA'
import SoundControl from './components/SoundControl'
import SplashScreen from './components/SplashScreen'
import SmoothFollower from './components/SmoothFollower'
import './App.css'

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <>
      <SmoothFollower />
      {!hasStarted ? (
        <SplashScreen onStart={() => setHasStarted(true)} />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
          <SoundControl />
          <ScrollCTA />
        </>
      )}
    </>
  )
}

export default App
