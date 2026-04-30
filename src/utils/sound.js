// Signature SFX
import startSoundUrl from '../assets/sounds/start-sfx.mp3';
import introSoundUrl from '../assets/sounds/intro.mp3';

import swooshUrl from '../assets/sounds/swoosh-nav-link.mp3';
import swooshMapUrl from '../assets/sounds/swoosh-map.mp3';

// General SFX
import pulseUrl from '../assets/sounds/pulse-sfx.mp3';
import selectUrl from '../assets/sounds/select.mp3';
import hoverUrl from '../assets/sounds/hover.mp3';
import processUrl from '../assets/sounds/process-sfx.mp3';
import serviceHoverUrl from '../assets/sounds/service-hover.mp3';
import buttonHoverUrl from '../assets/sounds/button-hover.mp3';

// Helper to play sounds safely
const playSound = (url, volume = 1) => {
    try {
        const audio = new Audio(url);
        audio.volume = volume;
        audio.play().catch(err => {
        if (err.name !== 'NotAllowedError') console.warn("Audio playback failed:", err);
    });
        return audio;
    } catch (err) {
        console.error("Audio creation failed:", err);
        return {
            play: () => Promise.resolve(),
            pause: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            volume: 1,
            currentTime: 0
        };
    }
};

export const playSelectSound = () => {
    const audio = getSelectAudio();
    audio.currentTime = 0;
    audio.play().catch(err => {
        if (err.name !== 'NotAllowedError') console.warn("Select playback failed:", err);
    });
};
export const playStartSound = () => playSound(startSoundUrl);

// Pre-instantiate signature sounds lazily to reduce latency
let _swooshAudio, _swooshMapAudio, _pulseAudio, _hoverAudio, _selectAudio, _serviceHoverAudio, _buttonHoverAudio;

const getSwooshAudio = () => { if (!_swooshAudio) { _swooshAudio = new Audio(swooshUrl); _swooshAudio.volume = 0.6; } return _swooshAudio; };
const getSwooshMapAudio = () => { if (!_swooshMapAudio) { _swooshMapAudio = new Audio(swooshMapUrl); _swooshMapAudio.volume = 0.6; } return _swooshMapAudio; };
const getPulseAudio = () => { if (!_pulseAudio) { _pulseAudio = new Audio(pulseUrl); _pulseAudio.volume = 0.5; } return _pulseAudio; };
const getHoverAudio = () => { if (!_hoverAudio) { _hoverAudio = new Audio(hoverUrl); _hoverAudio.volume = 0.4; } return _hoverAudio; };
const getSelectAudio = () => { if (!_selectAudio) { _selectAudio = new Audio(selectUrl); _selectAudio.volume = 0.6; } return _selectAudio; };
const getServiceHoverAudio = () => { if (!_serviceHoverAudio) { _serviceHoverAudio = new Audio(serviceHoverUrl); _serviceHoverAudio.volume = 0.4; } return _serviceHoverAudio; };
const getButtonHoverAudio = () => { if (!_buttonHoverAudio) { _buttonHoverAudio = new Audio(buttonHoverUrl); _buttonHoverAudio.volume = 0.5; } return _buttonHoverAudio; };

export const initSounds = () => {
    getSwooshAudio(); getSwooshMapAudio(); getPulseAudio(); getHoverAudio(); getSelectAudio();
    getServiceHoverAudio(); getButtonHoverAudio();
};

if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(initSounds, 1000);
    });
}

// Nav SFX
export const playNavHoverAbout = () => playHoverSound();
export const playNavHoverProjects = () => playHoverSound();
export const playNavHoverServices = () => playHoverSound();
export const playNavClickSwoosh = () => {
    playSelectSound();
    const audio = getSwooshAudio();
    audio.currentTime = 0.03;
    audio.play().catch(err => {
        if (err.name !== 'NotAllowedError') console.warn("Swoosh playback failed:", err);
    });
};

// Map SFX
export const playMapSwoosh = () => {
    const audio = getSwooshMapAudio();
    audio.currentTime = 0;
    audio.play().catch(err => {
        if (err.name !== 'NotAllowedError') console.warn("Map swoosh failed:", err);
    });
};

// Process SFX
export const playProcessChat = () => playSound(processUrl, 0.7);
export const playProcessDesign = () => playSound(processUrl, 0.7);
export const playProcessBuild = () => playSound(processUrl, 0.7);
export const playProcessLaunch = () => playSound(processUrl, 0.7);



// Service SFX
export const playServiceHoverSfx = () => {
    const audio = getServiceHoverAudio();
    audio.currentTime = 0.02; // skip tiny compression silence
    audio.play().catch(err => {
        if (err.name !== 'NotAllowedError') console.warn("Service hover playback failed:", err);
    });
};

// General SFX
export const playHoverSound = () => {
    const audio = getHoverAudio();
    audio.currentTime = 0;
    audio.play().catch(err => {
        if (err.name !== 'NotAllowedError') console.warn("Hover playback failed:", err);
    });
};
export const playButtonHoverSfx = () => {
    const audio = getButtonHoverAudio();
    audio.currentTime = 0;
    audio.play().catch(err => {
        if (err.name !== 'NotAllowedError') console.warn("Button hover playback failed:", err);
    });
};
export const playUnhoverSound = () => { };
export const playPulseSfx = () => {
    // Adjusted to 0.05s as a middle ground for perfect sync
    const audio = getPulseAudio();
    audio.currentTime = 0.11;
    audio.play().catch(err => {
        if (err.name !== 'NotAllowedError') console.warn("Pulse playback failed:", err);
    });
};

export const playIntroSound = (onEnded) => {
    const audio = new Audio(introSoundUrl);
    audio.volume = 0;
    audio.play().catch(err => {
        if (err.name !== 'NotAllowedError') console.warn("Audio playback failed:", err);
    });

    if (onEnded) {
        audio.onended = onEnded;
    }

    const fadeDuration = 6000;
    const targetVolume = 0.8;
    const intervalTime = 50;
    const step = targetVolume / (fadeDuration / intervalTime);

    const fadeInterval = setInterval(() => {
        if (audio.volume < targetVolume) {
            audio.volume = Math.min(targetVolume, audio.volume + step);
        } else {
            clearInterval(fadeInterval);
        }
    }, intervalTime);

    return audio;
};

export const playLoadingSound = () => { };
export const stopLoadingSound = () => { };
