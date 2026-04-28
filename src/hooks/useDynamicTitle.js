import { useEffect } from 'react';

export const useDynamicTitle = (originalTitle = "Kurowii | Creative Developer", inactiveTitle = "Come back! 👋") => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = inactiveTitle;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [originalTitle, inactiveTitle]);
};
