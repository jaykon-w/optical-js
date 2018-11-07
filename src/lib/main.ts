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

  alpha(num: number): this {
    this.rgba.a = alphaClamp(+num);
    this.setColor(this.rgba);
    return this;
  }

  hue(num: number): this {
    this.hsla.h = angleClamp(+num);
    this.setColor(this.hsla);
    return this;
  }

  saturation(num: number): this {
    this.hsla.s = percentClamp(+num);
    this.setColor(this.hsla);
    return this;
  }

  light(num: number): this {
    this.hsla.l = percentClamp(+num);
    this.setColor(this.hsla);
    return this;
  }

  red(num: number): this {
    this.rgba.r = rgbClamp(+num);
    this.setColor(this.rgba);
    return this;
  }

  green(num: number): this {
    this.rgba.g = rgbClamp(+num);
    this.setColor(this.rgba);
    return this;
  }

  blue(num: number): this {
    this.rgba.b = rgbClamp(+num);
    this.setColor(this.rgba);
    return this;
  }

  saturate(num: number): this {
    console.log(this.hsla);
    this.hsla.s = percentClamp(+num + this.hsla.s);
    console.log(this.hsla);
    this.setColor(this.hsla);

    return this;
  }

  desaturate(num: number): this {
    this.hsla.s = percentClamp(Math.abs(+num - this.hsla.s));
    this.setColor(this.hsla);

    return this;
  }

  lighten(num: number): this {
    this.hsla.l = percentClamp(+num + this.hsla.l);
    this.setColor(this.hsla);

    return this;
  }

  darken(num: number): this {
    this.hsla.l = percentClamp(Math.abs(+num - this.hsla.l));
    this.setColor(this.hsla);

    return this;
  }

  opacify(num: number): this {
    this.rgba.a = alphaClamp(this.rgba.a - +num);
    this.setColor(this.rgba);

    return this;
  }

  hueRotate(num: number): this {
    this.hsla.h = Math.abs(+num + this.hsla.h) % 361;
    this.setColor(this.hsla);

    return this;
  }

  redish(num: number): this {
    this.rgba.r = rgbClamp(Math.abs(+num + this.rgba.r));
    this.setColor(this.rgba);

    return this;
  }

  greenish(num: number): this {
    this.rgba.g = rgbClamp(Math.abs(+num + this.rgba.g));
    this.setColor(this.rgba);

    return this;
  }

  blueish(num: number): this {
    this.rgba.b = rgbClamp(Math.abs(+num + this.rgba.b));
    this.setColor(this.rgba);

    return this;
  }

  multiply(color: IColor): this {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = Math.round((rgba1.r + rgba2.r) / 2);
    const g = Math.round((rgba1.g + rgba2.g) / 2);
    const b = Math.round((rgba1.b + rgba2.b) / 2);
    const a = (rgba1.a + rgba2.a) / 2;

    return this.setColor({ r, g, b, a });
  }

  screen(color: IColor): this {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = 255 - ((255 - rgba1.r) * (255 - rgba2.r)) / 255;
    const g = 255 - ((255 - rgba1.g) * (255 - rgba2.g)) / 255;
    const b = 255 - ((255 - rgba1.b) * (255 - rgba2.b)) / 255;
    const a = (rgba1.a + rgba2.a) / 2;

    return this.setColor({ r, g, b, a });
  }

  overlay(color: IColor): this {
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

    return this.setColor({ r, g, b, a });
  }

  mix(color: IColor, weight?: number): this {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    if (weight === undefined) weight = 50;

    const p = weight / 100.0;
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

    return this.setColor(newColor);
  }

  difference(color: IColor): this {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = Math.abs(rgba1.r - rgba2.r);
    const g = Math.abs(rgba1.g - rgba2.g);
    const b = Math.abs(rgba1.b - rgba2.b);
    const a = (rgba1.a + rgba2.a) / 2;

    return this.setColor({ r, g, b, a });
  }

  divide(color: IColor): this {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = (rgba1.r / rgba2.r) * 255;
    const g = (rgba1.g / rgba2.g) * 255;
    const b = (rgba1.b / rgba2.b) * 255;
    const a = rgba1.a;

    return this.setColor({ r, g, b, a });
  }

  addition(color: IColor): this {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = rgbClamp(rgba1.r + rgba2.r);
    const g = rgbClamp(rgba1.g + rgba2.g);
    const b = rgbClamp(rgba1.b + rgba2.b);
    const a = rgba1.a;

    return this.setColor({ r, g, b, a });
  }

  subtract(color: IColor): this {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = rgbClamp(rgba1.r - rgba2.r);
    const g = rgbClamp(rgba1.g - rgba2.g);
    const b = rgbClamp(rgba1.b - rgba2.b);
    const a = rgba1.a;

    return this.setColor({ r, g, b, a });
  }

  darkenOnly(color: IColor): this {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = Math.min(rgba1.r, rgba2.r);
    const g = Math.min(rgba1.g, rgba2.g);
    const b = Math.min(rgba1.b, rgba2.b);
    const a = rgba1.a;

    return this.setColor({ r, g, b, a });
  }

  lightenOnly(color: IColor): this {
    const rgba1 = this.rgba;
    const rgba2 = new Color(color).rgba;

    const r = Math.max(rgba1.r, rgba2.r);
    const g = Math.max(rgba1.g, rgba2.g);
    const b = Math.max(rgba1.b, rgba2.b);
    const a = rgba1.a;

    return this.setColor({ r, g, b, a });
  }

  getDistance(color: IColor): number {
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
