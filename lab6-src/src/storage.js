// localStorage keys from Lab 4. Storage can be blocked (private mode), so every call is guarded.
export const STORAGE_KEYS = {
  bestScore: 'ai-agent-lab-best-score',
  level: 'ai-agent-lab-level',
  hideWelcome: 'ai-agent-lab-hide-welcome',
}

export function readNumber(key, fallback) {
  try {
    return Number(localStorage.getItem(key)) || fallback
  } catch {
    return fallback
  }
}

export function readFlag(key) {
  try {
    return localStorage.getItem(key) === '1'
  } catch {
    return false
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(key, String(value))
  } catch {
    // Storage can be blocked; the value just is not remembered next time.
  }
}
