////// Utitlity////////////////////////
export function GetRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function GetRandomInt(min: number, max: number): number {
  return Math.floor(GetRandomFloat(min, max));
}
export function FromPolar(v: number, theta: number): [number, number] {
  return [v * Math.cos(theta), v * Math.sin(theta)];
}

export function ToLuma(r: number, g: number, b: number) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function Clamp(min: number, max: number, value: number) {
  return value > max ? max : value < min ? min : value;
}
