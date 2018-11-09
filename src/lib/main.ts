import ColorConvert from "./colorStringConvert";
import { IColor, IColorOptions, IHSLA, IRGBA } from "./definitions";
import { ColorError } from "./errors";
import { clamp } from "./helper";
import colorsTable from "./colorsTable";

const rgbClamp = clamp(0, 255);
const alphaClamp = clamp(0, 1);
const percentClamp = clamp(0, 100);
const angleClamp = clamp(0, 360);

export class Color implements IColor {
  static toRGBA(color: IColorOptions): IRGBA {
    return Color.build(color);
  }

  static toHSLA(color: IColorOptions): IHSLA {
    const rgba = Color.build(color);

    rgba.r /= 255;
    rgba.g /= 255;
    rgba.b /= 255;

    const max = Math.max(rgba.r, rgba.g, rgba.b);
    const min = Math.min(rgba.r, rgba.g, rgba.b);

    let h;
    let s;
    let l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
    } else {
      if (l < 0.5) {
        s = (max - min) / (max + min);
      } else {
        s = (max - min) / (2.0 - max - min);
      }
      if (rgba.r == max) {
        h = (rgba.g - rgba.b) / (max - min);
      } else if (rgba.g == max) {
        h = 2.0 + (rgba.b - rgba.r) / (max - min);
      } else {
        h = 4.0 + (rgba.r - rgba.g) / (max - min);
      }
    }

    l *= 100;
    s *= 100;
    h *= 60;
    if (h < 0) {
      h += 360;
    }

    return {
      h,
      s,
      l,
      a: rgba.a
    };
  }

  static isHSLAFormat(color: IColorOptions): color is IHSLA {
    return (color as IHSLA).h !== undefined;
  }

  static isRGBAFormat(color: IColorOptions): color is IRGBA {
    return (color as IRGBA).r !== undefined;
  }

  static isColorFormat(color: IColorOptions): color is IColor {
    return color instanceof Color;
  }

  static isStringColorFormat(color: IColorOptions): color is string {
    return (
      ["rbga", "hsla", "rbg(", "hsl("].indexOf(
        (color as string).substring(0, 4)
      ) >= 0 ||
      color[0] === "#" ||
      colorsTable[color as string]
    );
  }

  static build(color: IColorOptions): IRGBA {
    if (Color.isRGBAFormat(color)) return { ...color };
    if (Color.isHSLAFormat(color))
      return ColorConvert(Color.toHSLAString(color));
    if (Color.isColorFormat(color)) return { ...color.rgba };
    if (Color.isStringColorFormat(color)) return ColorConvert(color);
    else throw new ColorError("Unexpected color format");
  }

  static toRGBAString(color: IRGBA): string {
    const { r, g, b, a } = color;
    return `rgba(${r},${g},${b},${a})`;
  }

  static toHSLAString(color: IHSLA): string {
    const { h, s, l, a } = color;
    return `hsla(${h},${s}%,${l}%,${a})`;
  }

  rgba: IRGBA;
  hsla: IHSLA;

  constructor(color: IColorOptions) {
    this.setColor(color);
  }

  setColor(color: IColorOptions): this {
    this.rgba = Color.build(color);
    this.hsla = this.toHSLA();
    return this;
  }

  toRGBAString(): string {
    return Color.toRGBAString(this.rgba);
  }

  toHSLAString(): string {
    return Color.toHSLAString(Color.toHSLA(this.rgba));
  }

  alpha(num: number): Color {
    this.rgba.a = alphaClamp(+num);
    return new Color(this.rgba);
  }

  hue(num: number): Color {
    this.hsla.h = angleClamp(+num);
    return new Color(this.hsla);
  }

  saturation(num: number): Color {
    this.hsla.s = percentClamp(+num);
    return new Color(this.hsla);
  }

  light(num: number): Color {
    this.hsla.l = percentClamp(+num);
    return new Color(this.hsla);
  }

  red(num: number): Color {
    this.rgba.r = rgbClamp(+num);
    return new Color(this.rgba);
  }

  green(num: number): Color {
    this.rgba.g = rgbClamp(+num);
    return new Color(this.rgba);
  }

  blue(num: number): Color {
    this.rgba.b = rgbClamp(+num);
    return new Color(this.rgba);
  }

  saturate(num: number): Color {
    this.hsla.s = percentClamp(+num + this.hsla.s);
    return new Color(this.hsla);
  }

  desaturate(num: number): Color {
    this.hsla.s = percentClamp(Math.abs(+num - this.hsla.s));
    return new Color(this.hsla);
  }

  lighten(num: number): Color {
    this.hsla.l = percentClamp(+num + this.hsla.l);
    return new Color(this.hsla);
  }

  darken(num: number): Color {
    this.hsla.l = percentClamp(Math.abs(+num - this.hsla.l));
    return new Color(this.hsla);
  }

  opacify(num: number): Color {
    this.rgba.a = alphaClamp(this.rgba.a - +num);
    return new Color(this.rgba);
  }

  hueRotate(num: number): Color {
    this.hsla.h = Math.abs(+num + this.hsla.h) % 361;
    return new Color(this.hsla);
  }

  redish(num: number): Color {
    this.rgba.r = rgbClamp(Math.abs(+num + this.rgba.r));
    return new Color(this.rgba);
  }

  greenish(num: number): Color {
    this.rgba.g = rgbClamp(Math.abs(+num + this.rgba.g));
    return new Color(this.rgba);
  }

  blueish(num: number): Color {
    this.rgba.b = rgbClamp(Math.abs(+num + this.rgba.b));
    return new Color(this.rgba);
  }

  multiply(color: IColorOptions): Color {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = Math.round((rgba1.r + rgba2.r) / 2);
    const g = Math.round((rgba1.g + rgba2.g) / 2);
    const b = Math.round((rgba1.b + rgba2.b) / 2);
    const a = (rgba1.a + rgba2.a) / 2;

    return new Color({ r, g, b, a });
  }

  screen(color: IColorOptions): Color {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = 255 - ((255 - rgba1.r) * (255 - rgba2.r)) / 255;
    const g = 255 - ((255 - rgba1.g) * (255 - rgba2.g)) / 255;
    const b = 255 - ((255 - rgba1.b) * (255 - rgba2.b)) / 255;
    const a = (rgba1.a + rgba2.a) / 2;

    return new Color({ r, g, b, a });
  }

  overlay(color: IColorOptions): Color {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r =
      rgba1.r < 128
        ? (2 * rgba1.r * rgba2.r) / 255
        : 255 - (2 * (255 - rgba1.r) * (255 - rgba2.r)) / 255;
    const g =
      rgba1.g < 128
        ? (2 * rgba1.g * rgba2.g) / 255
        : 255 - (2 * (255 - rgba1.g) * (255 - rgba2.g)) / 255;
    const b =
      rgba1.b < 128
        ? (2 * rgba1.b * rgba2.b) / 255
        : 255 - (2 * (255 - rgba1.b) * (255 - rgba2.b)) / 255;
    const a = (rgba1.a + rgba2.a) / 2;

    return new Color({ r, g, b, a });
  }

  mix(color: IColorOptions, weight?: number): Color {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    if (weight === undefined) weight = 0.5;

    const p = weight;
    const w = p * 2 - 1;
    const a = rgba1.a - rgba2.a;

    const w1 = ((w * a == -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
    const w2 = 1 - w1;

    const newColor = {
      r: rgba2.r * w1 + rgba1.r * w2,
      g: rgba2.g * w1 + rgba1.g * w2,
      b: rgba2.b * w1 + rgba1.b * w2,
      a: rgba2.a
    };

    return new Color(newColor);
  }

  difference(color: IColorOptions): Color {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = Math.abs(rgba1.r - rgba2.r);
    const g = Math.abs(rgba1.g - rgba2.g);
    const b = Math.abs(rgba1.b - rgba2.b);
    const a = (rgba1.a + rgba2.a) / 2;

    return new Color({ r, g, b, a });
  }

  divide(color: IColorOptions): Color {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = (rgba1.r / rgba2.r) * 255;
    const g = (rgba1.g / rgba2.g) * 255;
    const b = (rgba1.b / rgba2.b) * 255;
    const a = rgba1.a;

    return new Color({ r, g, b, a });
  }

  addition(color: IColorOptions): Color {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = rgbClamp(rgba1.r + rgba2.r);
    const g = rgbClamp(rgba1.g + rgba2.g);
    const b = rgbClamp(rgba1.b + rgba2.b);
    const a = rgba1.a;

    return new Color({ r, g, b, a });
  }

  subtract(color: IColorOptions): Color {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = rgbClamp(rgba1.r - rgba2.r);
    const g = rgbClamp(rgba1.g - rgba2.g);
    const b = rgbClamp(rgba1.b - rgba2.b);
    const a = rgba1.a;

    return new Color({ r, g, b, a });
  }

  darkenOnly(color: IColorOptions): Color {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = Math.min(rgba1.r, rgba2.r);
    const g = Math.min(rgba1.g, rgba2.g);
    const b = Math.min(rgba1.b, rgba2.b);
    const a = rgba1.a;

    return new Color({ r, g, b, a });
  }

  lightenOnly(color: IColorOptions): Color {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = Math.max(rgba1.r, rgba2.r);
    const g = Math.max(rgba1.g, rgba2.g);
    const b = Math.max(rgba1.b, rgba2.b);
    const a = rgba1.a;

    return new Color({ r, g, b, a });
  }

  getDistance(color: IColorOptions): number {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    return Math.sqrt(
      (rgba1.r - rgba2.r) ** 2 +
        (rgba1.g - rgba2.g) ** 2 +
        (rgba1.b - rgba2.b) ** 2
    );
  }

  toString() {
    return this.toRGBAString();
  }

  private toRGBA(): IRGBA {
    return this.rgba;
  }

  private toHSLA(): IHSLA {
    return Color.toHSLA(this.rgba);
  }
}
