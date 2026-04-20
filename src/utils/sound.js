import hoverSoundUrl from '../assets/sounds/hover-sfx.mp3';
import selectSoundUrl from '../assets/sounds/select-sfx.mp3';
import startSoundUrl from '../assets/sounds/start-sfx.mp3';
import projectsHoverSoundUrl from '../assets/sounds/projects-hover-sfx.mp3';

export const playHoverSound = () => {
    const audio = new Audio(hoverSoundUrl);
    audio.play().catch(err => console.warn("Audio playback failed:", err));
};

export const playSelectSound = () => {
    const audio = new Audio(selectSoundUrl);
    audio.play().catch(err => console.warn("Audio playback failed:", err));
};

export const playProjectsHoverSound = () => {
    const audio = new Audio(projectsHoverSoundUrl);
    audio.play().catch(err => console.warn("Audio playback failed:", err));
};

export const playStartSound = () => {
    const audio = new Audio(startSoundUrl);
    audio.play().catch(err => console.warn("Audio playback failed:", err));
};
