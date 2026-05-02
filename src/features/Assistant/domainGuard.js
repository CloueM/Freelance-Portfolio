

const ALLOWED_DOMAIN = import.meta.env.VITE_ALLOWED_DOMAIN;

const ALWAYS_ALLOWED = ["localhost", "127.0.0.1"];


export const checkDomain = () => {
  if (import.meta.env.DEV) return;

  if (!ALLOWED_DOMAIN) return;

  const hostname = window.location.hostname;

  if (ALWAYS_ALLOWED.includes(hostname)) return;

  if (hostname !== ALLOWED_DOMAIN) {
    throw new Error(
      "This assistant is not available on this domain."
    );
  }
};
