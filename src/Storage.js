export function setStorage (key, value) {
  if (value === undefined) window.localStorage.removeItem(key)
  else window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeStorage (key) {
  window.localStorage.removeItem(key)
}

export function getStorage (key) {
  const str = window.localStorage.getItem(key)
  return str ? JSON.parse(str) : undefined
}
