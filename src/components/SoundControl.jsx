import React, { useState, useEffect, useRef } from 'react';
import bgMusic from '../assets/sounds/background-music.mp3';
import '../styles/SoundControl.css';
import { playHoverSound, playSelectSound } from '../utils/sound';

function SoundControl({ isVisible }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showSlider, setShowSlider] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isVisible && audioRef.current) {
      
      audioRef.current.volume = 0;
      audioRef.current.play().catch((error) => {
        console.log('Autoplay blocked or already playing.', error);
      });
      
      let currentVol = 0;
      const fadeInterval = setInterval(() => {
        if (currentVol < volume) {
          currentVol = Math.min(volume, currentVol + 0.05);
          if (audioRef.current) audioRef.current.volume = currentVol;
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    }
  }, [isVisible]);

  useEffect(() => {
    function handleScrollEvent() {
      setIsScrolled(window.scrollY > 300);
    }
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0) {
        setIsMuted(false);
        audioRef.current.muted = false;
      } else {
        setIsMuted(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      audioRef.current.muted = newMuteState;
      if (!newMuteState && volume === 0) {
        setVolume(0.5);
        audioRef.current.volume = 0.5;
      }
    }
  };

  const containerClass = `sound-control-container ${isVisible ? 'visible' : ''}`;
  const soundButtonClass = isScrolled ? 'sound-btn scrolled' : 'sound-btn';

  return (
    <div 
      className={containerClass}
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <div className={`volume-slider-wrapper ${showSlider ? 'show' : ''}`}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="volume-slider"
        />
      </div>
      
      <button
        className={soundButtonClass}
        onClick={toggleMute}
        onMouseEnter={playHoverSound}
        onMouseDown={playSelectSound}
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        aria-pressed={isMuted}
      >
        {isMuted || volume === 0 ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
            <path fill="currentColor" fillRule="evenodd" d="m403.375 257.27l59.584 59.584l-30.167 30.166l-59.583-59.583l-59.584 59.583l-30.166-30.166l59.583-59.584l-59.583-59.583l30.166-30.166l59.584 59.583l59.583-59.583l30.167 30.166zM234.417 85.333l-110.854 87.23H42.667v170.666h81.02l110.73 85.458z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
            <path fill="currentColor" fillRule="evenodd" d="m403.966 426.944l-33.285-26.63c74.193-81.075 74.193-205.015-.001-286.09l33.285-26.628c86.612 96.712 86.61 242.635.001 339.348M319.58 155.105l-33.324 26.659c39.795 42.568 39.794 108.444.001 151.012l33.324 26.658c52.205-58.22 52.205-146.109-.001-204.329m-85.163-69.772l-110.854 87.23H42.667v170.666h81.02l110.73 85.458z"/>
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        src={bgMusic}
        loop
      />
    </div>
  );
}

export default SoundControl;

