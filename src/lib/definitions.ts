export interface IRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface IHSLA {
  h: number;
  s: number;
  l: number;
  a: number;
}

export enum E_COLOR_TYPE {
  COLOR,
  RGBA,
  STRING
}

export interface IColor {
  rgba: IRGBA;
  hsla: IHSLA;

  toRGBAString(): string;
  toHSLAString(): string;

  alpha(num?: number): number;

  hue(num?: number): number;
  saturation(num?: number): number;
  light(num?: number): number;

  red(num?: number): number;
  green(num?: number): number;
  blue(num?: number): number;

  saturate(num: number): this;
  desaturate(num: number): this;
  lighten(num: number): this;
  darken(num: number): this;
  opacify(num: number): this;
  hueRotate(num: number): this;

  redish(num: number): this;
  greenish(num: number): this;
  blueish(num: number): this;

  multiply(color: IColor): this;
  screen(color: IColor): this;
  overlay(color: IColor): this;
  mix(color: IColor, weight?: number): this;
  difference(color: IColor): this;

  getDistance(color: IColor): number;
}

export type IColorOptions = IColor | IRGBA | IHSLA | string;
