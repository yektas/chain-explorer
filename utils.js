export function shortenAddress(str, n = 4) {
  if (str) {
    return `${str.slice(0, n + 2)}...${str.slice(
      str.length - n
    )}`.toLowerCase();
  }
  return "";
}

export function shortenHash(str, n = 35) {
  if (str) {
    return `${str.slice(0, n)}...`.toLowerCase();
  }
  return "";
}
