export const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        if (window.lenis) {
            window.lenis.scrollTo(element, {
                duration: 1.5,
                easing: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
            });
        } else {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
