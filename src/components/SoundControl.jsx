// Sound Control: Mute/Unmute toggle
// Reference: https://egghead.io/lessons/a11y-creating-a-toggle-button-for-muting-and-unmuting-an-audio-element-in-react
import React, { useState, useEffect, useRef } from 'react';
import bgMusic from '../assets/sounds/background-music.mp3';
import '../styles/SoundControl.css';
import { playHoverSound, playSelectSound } from '../utils/sound';

function SoundControl() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Start playing once the component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch((error) => {
        console.log('Autoplay blocked. Sound will start upon user interaction.', error);
      });
    }
  }, []);

  // Scroll detection for button positioning: This is for the changing for the button style color
  useEffect(() => {
    function handleScrollEvent() {
      setIsScrolled(window.scrollY > 300);
    }
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  // Toggle mute
  function toggleMute() {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }

  // Keep isMuted state in sync with the native audio element
  function onVolumeChange() {
    const audio = audioRef.current;
    if (audio) {
      if (audio.muted) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  }

  const soundButtonClass = isScrolled ? 'sound-btn scrolled' : 'sound-btn';

  return (
    <div className="sound-control-container">
      <button
        className={soundButtonClass}
        onClick={toggleMute}
        onMouseEnter={playHoverSound}
        onMouseDown={playSelectSound}
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        aria-pressed={isMuted}
      >
        {isMuted ? (
          /* Muted icon */
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
            <path fill="currentColor" fillRule="evenodd" d="m403.375 257.27l59.584 59.584l-30.167 30.166l-59.583-59.583l-59.584 59.583l-30.166-30.166l59.583-59.584l-59.583-59.583l30.166-30.166l59.584 59.583l59.583-59.583l30.167 30.166zM234.417 85.333l-110.854 87.23H42.667v170.666h81.02l110.73 85.458z"/>
          </svg>
        ) : (
          /* Unmuted icon */
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
            <path fill="currentColor" fillRule="evenodd" d="m403.966 426.944l-33.285-26.63c74.193-81.075 74.193-205.015-.001-286.09l33.285-26.628c86.612 96.712 86.61 242.635.001 339.348M319.58 155.105l-33.324 26.659c39.795 42.568 39.794 108.444.001 151.012l33.324 26.658c52.205-58.22 52.205-146.109-.001-204.329m-85.163-69.772l-110.854 87.23H42.667v170.666h81.02l110.73 85.458z"/>
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        src={bgMusic}
        loop
        onVolumeChange={onVolumeChange}
      />
    </div>
  );
}

export default SoundControl;
