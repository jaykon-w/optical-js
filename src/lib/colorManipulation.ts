import { IColorOptions } from "./definitions";
import { Color } from "./main";

export const getDistanceColor = (
  color1: IColorOptions,
  color2: IColorOptions
): number => {
  const _color1 = new Color(color1);
  const _color2 = new Color(color2);

  return _color1.getDistance(_color2);
};

export const mix = (
  color1: IColorOptions,
  color2: IColorOptions,
  weight: number
): Color => {
  return new Color(color1).mix(new Color(color2), weight);
};

export const ligthen = (color: IColorOptions, percent: number): Color => {
  return new Color(color).lighten(percent);
};

export const darken = (color: IColorOptions, percent: number): Color => {
  return new Color(color).darken(percent);
};

export const saturate = (color: IColorOptions, percent: number): Color => {
  return new Color(color).saturate(percent);
};

export const desaturate = (color: IColorOptions, percent: number): Color => {
  return new Color(color).desaturate(percent);
};

export const multiply = (
  color1: IColorOptions,
  color2: IColorOptions
): Color => {
  return new Color(color1).multiply(new Color(color2));
};

export const screen = (color1: IColorOptions, color2: IColorOptions): Color => {
  return new Color(color1).screen(new Color(color2));
};

export const overlay = (
  color1: IColorOptions,
  color2: IColorOptions
): Color => {
  return new Color(color1).overlay(new Color(color2));
};

export const difference = (
  color1: IColorOptions,
  color2: IColorOptions
): Color => {
  return new Color(color1).difference(new Color(color2));
};
