

const STORAGE_KEY = "kurowii_assistant_usage";
const HOURLY_LIMIT = 30;
const DAILY_LIMIT = 150;
const ONE_HOUR_MS = 60 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const getUsage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { timestamps: [] };
    if (!Array.isArray(data.timestamps)) data.timestamps = [];
    return data;
  } catch {
    return { timestamps: [] };
  }
};

const saveUsage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
  }
};

const cleanTimestamps = (timestamps) => {
  const cutoff = Date.now() - ONE_DAY_MS;
  return timestamps.filter((ts) => ts > cutoff);
};


export const checkRateLimit = () => {
  const now = Date.now();
  const usage = getUsage();
  usage.timestamps = cleanTimestamps(usage.timestamps);

  const recentHour = usage.timestamps.filter((ts) => now - ts < ONE_HOUR_MS);

  if (recentHour.length >= HOURLY_LIMIT) {
    throw new Error(
      `You've sent ${HOURLY_LIMIT} messages this hour. Please wait a bit before sending more.`
    );
  }

  if (usage.timestamps.length >= DAILY_LIMIT) {
    throw new Error(
      `You've reached the ${DAILY_LIMIT} message daily limit. Please come back tomorrow!`
    );
  }
};


export const recordMessage = () => {
  const usage = getUsage();
  usage.timestamps = cleanTimestamps(usage.timestamps);
  usage.timestamps.push(Date.now());
  saveUsage(usage);
};


export const getRateLimitStatus = () => {
  const now = Date.now();
  const usage = getUsage();
  usage.timestamps = cleanTimestamps(usage.timestamps);

  const hourlyUsed = usage.timestamps.filter((ts) => now - ts < ONE_HOUR_MS).length;
  const dailyUsed = usage.timestamps.length;

  return {
    hourlyUsed,
    hourlyLimit: HOURLY_LIMIT,
    dailyUsed,
    dailyLimit: DAILY_LIMIT,
    hourlyRemaining: Math.max(0, HOURLY_LIMIT - hourlyUsed),
    dailyRemaining: Math.max(0, DAILY_LIMIT - dailyUsed),
  };
};
