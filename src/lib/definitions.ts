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
  STRING,
}

export interface IColor {
  rgba: IRGBA;
  hsla: IHSLA;

  toRGBAString(): string;
  toHSLAString(): string;

  alpha(num: number): IColor;

  hue(num: number): IColor;
  saturation(num: number): IColor;
  light(num: number): IColor;

  red(num: number): IColor;
  green(num: number): IColor;
  blue(num: number): IColor;

  saturate(num: number): IColor;
  desaturate(num: number): IColor;
  lighten(num: number): IColor;
  darken(num: number): IColor;
  opacify(num: number): IColor;
  hueRotate(num: number): IColor;

  redish(num: number): IColor;
  greenish(num: number): IColor;
  blueish(num: number): IColor;

  multiply(color: IColorOptions): IColor;
  screen(color: IColorOptions): IColor;
  overlay(color: IColorOptions): IColor;
  mix(color: IColorOptions, weight?: number): IColor;
  difference(color: IColorOptions): IColor;
  divide(color: IColorOptions): IColor;
  addition(color: IColorOptions): IColor;
  subtract(color: IColorOptions): IColor;
  darkenOnly(color: IColorOptions): IColor;
  lightenOnly(color: IColorOptions): IColor;

  getDistance(color: IColorOptions): number;
}

export type IColorOptions = IColor | IRGBA | IHSLA | string;
