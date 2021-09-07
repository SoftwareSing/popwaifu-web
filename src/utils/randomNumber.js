export function randomNumber ({ min = 0, max = 1000 } = {}) {
  const random = Math.random() * (max - min)
  return Math.floor(random + min)
}
