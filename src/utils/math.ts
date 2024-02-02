export function lerp(start: number, end: number, value: number){
  return (1 - value) * start + value * end
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
