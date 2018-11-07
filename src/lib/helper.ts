export const clamp = (min: number, max: number) => (num: number) => {
  return Math.max(min, Math.min(max, num));
}

export const normalization = (minOut: number, maxOut) => (minIn: number, maxIn: number) => (num: number) => {
  return ( num - minIn ) * ( maxOut - minOut ) / ( maxIn - minIn ) + minOut;
}

export const isFloat = (num: number) => num === +num && num !== (num|0);
