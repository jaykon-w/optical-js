import colorTable from "./colorsTable";
import { IRGBA } from "./definitions";
import { ColorError } from "./errors";

const calcHue = (h: number, s: number, l: number) => {
  const lumia = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  const lumia2 = l * 2 - lumia;

  h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;

  if (h * 6 < 1) {
    return lumia2 + (lumia - lumia2) * h * 6;
  } else if (h * 2 < 1) {
    return lumia;
  } else if (h * 3 < 2) {
    return lumia2 + (lumia - lumia2) * (2 / 3 - h) * 6;
  } else {
    return lumia2;
  }
}

const ColorConvert = (color: string): IRGBA  => {
  if (typeof color !== "string")
    throw new ColorError("Color need be a string");

  if (/^rgba?\s*\((.*)\)$/.test(color as string)) {
    const rgba = /^rgba?\s*\((.*)\)$/.exec(color)![1];
    const _rgba = new Float32Array(rgba.split(",").map(e => +e));

    const r = _rgba[0];
    const g = _rgba[1];
    const b = _rgba[2];
    const a = _rgba[3];

    return { r, g, b, a };
  } else if (/^hsla?\s*\((.*)\)$/.test(color)) {
    const hsla = /^hsla?\s*\((.*)\)$/.exec(color)![1];
    const _hsla = hsla.split(",");

    const fHSLA = new Float32Array([
      (parseInt(_hsla[0]) % 360) / 360,
      parseInt(_hsla[1]) / 100,
      parseInt(_hsla[2]) / 100,
      +_hsla[3]
    ]);

    const h = fHSLA[0];
    const s = fHSLA[1];
    const l = fHSLA[2];
    const a = fHSLA[3];

    return {
      r: Math.round(calcHue(h + 1 / 3, s, l) * 255),
      g: Math.round(calcHue(h, s, l) * 255),
      b: Math.round(calcHue(h - 1 / 3, s, l) * 255),
      a
    };
  } else if (/^rgb?\s*\((.*)\)$/.test(color)) {
    const rgb = /^rgb?\s*\((.*)\)$/.exec(color)![1];
    const _rgb = new Float32Array(rgb.split(",").map(e => +e));

    const r = _rgb[0];
    const g = _rgb[1];
    const b = _rgb[2];

    return { r, g, b, a: 1 };
  } else if (/^hsl?\s*\((.*)\)$/.test(color)) {
    const hsl = /^hsl?\s*\((.*)\)$/.exec(color)![1];
    const _hsl = hsl.split(",");

    const h = _hsl[0];
    const s = _hsl[1];
    const l = _hsl[2];
    const a = 1;

    return ColorConvert(
      "hsla(" + h + ", " + s + ", " + l + ", " + a + ")"
    );
  } else if (/^#\w{3}$/.test(color)) {
    const hex = color.replace("#", "");

    const _r = hex.substr(0, 1);
    const _g = hex.substr(1, 1);
    const _b = hex.substr(2, 1);

    const rgb = new Float32Array([
      +("0x" + _r + _r),
      +("0x" + _g + _g),
      +("0x" + _b + _b)
    ]);

    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];

    return { r, g, b, a: 1 };
  } else if (/^#\w{6}$/.test(color)) {
    const hex = color.replace("#", "");

    const _r = hex.substr(0, 2);
    const _g = hex.substr(2, 2);
    const _b = hex.substr(4, 2);

    var rgb = new Float32Array([+("0x" + _r), +("0x" + _g), +("0x" + _b)]);

    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];

    return { r, g, b, a: 1 };
  } else {
    const _color = (color as string).toLowerCase();
    const hexColor = colorTable[_color];

    if (hexColor !== undefined) {
      return ColorConvert(hexColor);
    } else {
      throw new ColorError(`The color '${color}' is not finded`);
    }
  }
}

export default ColorConvert;
