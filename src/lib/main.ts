import ColorConvert from "./colorStringConvert";
import { IColor, IColorOptions, IHSLA, IRGBA } from "./definitions";
import { ColorError } from "./errors";
import { clamp } from "./helper";

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
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rgba.r:
          h = (rgba.g - rgba.b) / d + (rgba.g < rgba.b ? 6 : 0);
          break;
        case rgba.g:
          h = (rgba.b - rgba.r) / d + 2;
          break;
        case rgba.b:
          h = (rgba.r - rgba.g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.floor(h * 360),
      s: Math.floor(s * 100),
      l: Math.floor(l * 100),
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
      ) >= 0 || color[0] === "#"
    );
  }

  static build(color: IColorOptions): IRGBA {
    if (Color.isRGBAFormat(color)) return color;
    if (Color.isHSLAFormat(color))
      return ColorConvert(Color.toHSLAString(color));
    if (Color.isColorFormat(color)) return color.rgba;
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

  alpha(num?: number): number {
    if (num !== undefined) {
      this.rgba.a = clamp(0, 1)(+num);
      this.setColor(this.rgba);
    }
    return this.rgba.a;
  }

  hue(num?: number): number {
    if (num !== undefined) {
      this.hsla.h = clamp(0, 360)(+num);
      this.setColor(this.hsla);
    }
    return this.hsla.h;
  }

  saturation(num?: number): number {
    if (num !== undefined) {
      this.hsla.s = clamp(0, 100)(+num);
      this.setColor(this.hsla);
    }
    return this.hsla.s;
  }

  light(num?: number): number {
    if (num !== undefined) {
      this.hsla.l = clamp(0, 100)(+num);
      this.setColor(this.hsla);
    }
    return this.hsla.l;
  }

  red(num?: number): number {
    if (num !== undefined) {
      this.rgba.r = clamp(0, 255)(+num);
      this.setColor(this.rgba);
    }
    return this.rgba.r;
  }

  green(num?: number): number {
    if (num !== undefined) {
      this.rgba.g = clamp(0, 255)(+num);
      this.setColor(this.rgba);
    }
    return this.rgba.g;
  }

  blue(num?: number): number {
    if (num !== undefined) {
      this.rgba.b = clamp(0, 255)(+num);
      this.setColor(this.rgba);
    }
    return this.rgba.b;
  }

  saturate(num: number): this {
    this.hsla.s = clamp(0, 100)(Math.abs(+num + this.hsla.s));
    this.setColor(this.hsla);

    return this;
  }

  desaturate(num: number): this {
    this.hsla.s = clamp(0, 100)(Math.abs(+num - this.hsla.s));
    this.setColor(this.hsla);

    return this;
  }

  lighten(num: number): this {
    this.hsla.l = clamp(0, 100)(Math.abs(+num + this.hsla.l));
    this.setColor(this.hsla);

    return this;
  }

  darken(num: number): this {
    this.hsla.l = clamp(0, 100)(Math.abs(+num - this.hsla.l));
    this.setColor(this.hsla);

    return this;
  }

  opacify(num: number): this {
    this.rgba.a = clamp(0, 1)(Math.abs(+num - this.rgba.a));
    this.setColor(this.rgba);

    return this;
  }

  hueRotate(num: number): this {
    this.hsla.h = Math.abs(+num + this.hsla.h) % 361;
    this.setColor(this.hsla);

    return this;
  }

  redish(num: number): this {
    this.rgba.r = clamp(0, 255)(Math.abs(+num - this.rgba.r));
    this.setColor(this.rgba);

    return this;
  }

  greenish(num: number): this {
    this.rgba.g = clamp(0, 255)(Math.abs(+num - this.rgba.g));
    this.setColor(this.rgba);

    return this;
  }

  blueish(num: number): this {
    this.rgba.b = clamp(0, 255)(Math.abs(+num - this.rgba.b));
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
    return this.hsla || Color.toHSLA(this.rgba);
  }
}
