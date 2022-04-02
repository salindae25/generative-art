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
