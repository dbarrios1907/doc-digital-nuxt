export const id = function () {
  return Math.floor(Math.random() * 10000)
}

export const hash = function (value) {
  let hash = 0,
    i,
    chr
  for (i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}
