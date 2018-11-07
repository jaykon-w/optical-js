import { IColorOptions } from "./definitions";
import { Color } from "./main";

export const getDistanceColor = (
  color1: IColorOptions,
  color2: IColorOptions
): number => {
  return new Color(color1).getDistance(new Color(color2));
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

export const divide = (color1: IColorOptions, color2: IColorOptions): Color => {
  return new Color(color1).divide(new Color(color2));
};

export const addition = (
  color1: IColorOptions,
  color2: IColorOptions
): Color => {
  return new Color(color1).addition(new Color(color2));
};

export const subtract = (
  color1: IColorOptions,
  color2: IColorOptions
): Color => {
  return new Color(color1).subtract(new Color(color2));
};

export const darkenOnly = (
  color1: IColorOptions,
  color2: IColorOptions
): Color => {
  return new Color(color1).darkenOnly(new Color(color2));
};

export const lightenOnly = (
  color1: IColorOptions,
  color2: IColorOptions
): Color => {
  return new Color(color1).lightenOnly(new Color(color2));
};
