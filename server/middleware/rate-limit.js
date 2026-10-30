// server/middleware/rate-limit.js

const MAX_REQUESTS = 100; // Maximum number of requests per window
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

let requestCounts = new Map();

export default defineEventHandler((event) => {
  const ip = event.node.req.ip;
  const now = Date.now();

  // Remove expired requests
  for (const [key, value] of requestCounts.entries()) {
    if (value < now - WINDOW_MS) {
      requestCounts.delete(key);
    }
  }

  let count = requestCounts.get(ip) || 0;

  if (count >= MAX_REQUESTS) {
    throw createError({ statusCode: 429, statusMessage: 'Too Many Requests' });
  }

  requestCounts.set(ip, count + 1);
});
