export function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function random20bit() {
  return randomInt(2 ** 20);
}

export function random32bit() {
  return randomInt(2 ** 32);
}

export function random6digit() {
  return randomInt(10 ** 6);
}

export function random9digit() {
  return randomInt(10 ** 9);
}
