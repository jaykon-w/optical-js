import { IColorOptions } from "./definitions";
import { Color } from "./main";

type ArgumentsTypes<T> = T extends (...args: infer A) => any ? A : never;

const generateFactoryFunction = <
  T extends keyof Color,
  K extends ArgumentsTypes<Color[T]>
>(
  methodName: T
) => (color1: IColorOptions, ...args: K): Color => {
  return (new Color(color1)[methodName] as (...args: K) => Color)(...args);
};

export const alpha = generateFactoryFunction('alpha');
export const hue = generateFactoryFunction('hue');
export const saturation = generateFactoryFunction('saturation');
export const light = generateFactoryFunction('light');
export const red = generateFactoryFunction('red');
export const green = generateFactoryFunction('green');
export const blue = generateFactoryFunction('blue');
export const saturate = generateFactoryFunction('saturate');
export const desaturate = generateFactoryFunction('desaturate');
export const lighten = generateFactoryFunction('lighten');
export const darken = generateFactoryFunction('darken');
export const opacify = generateFactoryFunction('opacify');
export const hueRotate = generateFactoryFunction('hueRotate');
export const redish = generateFactoryFunction('redish');
export const greenish = generateFactoryFunction('greenish');
export const blueish = generateFactoryFunction('blueish');

export const multiply = generateFactoryFunction('multiply');
export const screen = generateFactoryFunction('screen');
export const overlay = generateFactoryFunction('overlay');
export const mix = generateFactoryFunction('mix');
export const difference = generateFactoryFunction('difference');
export const divide = generateFactoryFunction('divide');
export const addition = generateFactoryFunction('addition');
export const subtract = generateFactoryFunction('subtract');
export const darkenOnly = generateFactoryFunction('darkenOnly');
export const lightenOnly = generateFactoryFunction('lightenOnly');

export const getDistanceColor = (
  color1: IColorOptions,
  color2: IColorOptions
): number => new Color(color1).getDistance(new Color(color2));
