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
import supportRepliedUrl from '../assets/sounds/support-replied.mp3';
import callEndedUrl from '../assets/sounds/call-ended.mp3';
import serviceHoverUrl from '../assets/sounds/service-hover.mp3';
import typingUrl from '../assets/sounds/typing.mp3';
import buttonHoverUrl from '../assets/sounds/button-hover.mp3';

// Helper to play sounds safely
const playSound = (url, volume = 1) => {
    try {
        const audio = new Audio(url);
        audio.volume = volume;
        audio.play().catch(err => console.warn("Audio playback failed:", err));
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
    selectAudio.currentTime = 0;
    selectAudio.play().catch(err => console.warn("Select playback failed:", err));
};
export const playStartSound = () => playSound(startSoundUrl);

// Pre-instantiate signature sounds to reduce latency
const swooshAudio = new Audio(swooshUrl);
swooshAudio.volume = 0.6;

const swooshMapAudio = new Audio(swooshMapUrl);
swooshMapAudio.volume = 0.6;

const pulseAudio = new Audio(pulseUrl);
pulseAudio.volume = 0.5;

const hoverAudio = new Audio(hoverUrl);
hoverAudio.volume = 0.4;

const selectAudio = new Audio(selectUrl);
selectAudio.volume = 0.6;

const serviceHoverAudio = new Audio(serviceHoverUrl);
serviceHoverAudio.volume = 0.4;

const typingAudio = new Audio(typingUrl);
typingAudio.volume = 0.5;
typingAudio.loop = true;

const callEndedAudio = new Audio(callEndedUrl);
callEndedAudio.volume = 0.7;

const buttonHoverAudio = new Audio(buttonHoverUrl);
buttonHoverAudio.volume = 0.5;

// Nav SFX
export const playNavHoverAbout = () => playHoverSound();
export const playNavHoverProjects = () => playHoverSound();
export const playNavHoverServices = () => playHoverSound();
export const playNavClickSwoosh = () => {
    // Play select sound alongside swoosh for tactile feedback
    playSelectSound();
    // Attempt to skip potential tiny silence at start of compressed audio
    swooshAudio.currentTime = 0.03;
    swooshAudio.play().catch(err => console.warn("Swoosh playback failed:", err));
};

// Map SFX
export const playMapSwoosh = () => {
    swooshMapAudio.currentTime = 0;
    swooshMapAudio.play().catch(err => console.warn("Map swoosh failed:", err));
};

// Process SFX
export const playProcessChat = () => playSound(processUrl, 0.7);
export const playProcessDesign = () => playSound(processUrl, 0.7);
export const playProcessBuild = () => playSound(processUrl, 0.7);
export const playProcessLaunch = () => playSound(processUrl, 0.7);

// Support SFX
export const playSupportRepliedSfx = () => playSound(supportRepliedUrl, 0.8);
export const playCallEndedSfx = () => {
    callEndedAudio.currentTime = 0;
    callEndedAudio.play().catch(err => console.warn("Call ended playback failed:", err));
};
export const playTypingSfx = () => {
    typingAudio.currentTime = 0;
    typingAudio.play().catch(err => console.warn("Typing playback failed:", err));
};
export const stopTypingSfx = () => {
    typingAudio.pause();
    typingAudio.currentTime = 0;
};

// Service SFX
export const playServiceHoverSfx = () => {
    serviceHoverAudio.currentTime = 0.02; // skip tiny compression silence
    serviceHoverAudio.play().catch(err => console.warn("Service hover playback failed:", err));
};

// General SFX
export const playHoverSound = () => {
    hoverAudio.currentTime = 0;
    hoverAudio.play().catch(err => console.warn("Hover playback failed:", err));
};
export const playButtonHoverSfx = () => {
    buttonHoverAudio.currentTime = 0;
    buttonHoverAudio.play().catch(err => console.warn("Button hover playback failed:", err));
};
export const playUnhoverSound = () => { };
export const playPulseSfx = () => {
    // Adjusted to 0.05s as a middle ground for perfect sync
    pulseAudio.currentTime = 0.11;
    pulseAudio.play().catch(err => console.warn("Pulse playback failed:", err));
};

export const playIntroSound = (onEnded) => {
    const audio = new Audio(introSoundUrl);
    audio.volume = 0;
    audio.play().catch(err => console.warn("Audio playback failed:", err));

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
