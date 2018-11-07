# Optical-js

[![https://nodei.co/npm/optical-js.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/optical-js.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/optical-js)

A tiny javascript library to manipulate colors

## Instalation

```
npm i optical-js -s
```

or

```
yarn add optical-js
```

Optical-js has a `Color` constructor or isolated functions that allow you to manipulate colors.

In both cases, using by constructor creator or by functions, your can define a color by using one of the **colorFormat**:
  - Using a rbga object: `{r: $red, g: $green, b: $blue, a: $alpha}`
  - A hsl string: `hsl($hue, $saturation, $light)`
  - A hsla string: `hsla($hue, $saturation, $light, $alpha)`
  - A rba string: `rgb($red, $blue, $green)`
  - A rgba string: `rgba($red, $blue, $green, $alpha)`
  - A 3 digitis hexa string: `#000`
  - A 6 digitis hexa string: `#000000`
  - A color name: `blue`
  - A color instance: `new Color(blue)`

Any one of this formats is accepted.

When you has a color, you can manipulate then, with transformation methods:

- alpha: **(float: [0..1])**

Change the alpha channel from this color, accept only decimal values between 0 and 1, Ex:
```js
  new Color('red').alpha(.5) // => rgba(255, 0, 0, 0.5);
```
![#ff000080](https://placehold.it/15/ff000080/000000?text=+)
<span style="background-color:rgba(255, 0, 0, 0.5);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- hue: **(int: [0..360])**

Change the hue channel from this color, accept only integer values between 0 and 360, Ex:
```js
  new Color({r: 255, g: 0, b: 0, a: 1}).hue(90) // => rgb(128, 255, 0);
```
![#80ff00](https://placehold.it/15/80ff00/000000?text=+)
<span style="background-color:rgb(128, 255, 0);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- saturation: **(int: [0..100])**

Change the saturation channel from this color, accept only integer values between 0 and 100, Ex:
```js
  new Color('rgb(255, 0, 0)').saturation(50) // => rgb(191, 64, 64);
```
![#bf4040](https://placehold.it/15/bf4040/000000?text=+)
<span style="background-color:rgb(191, 64, 64);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- light: **(int: [0..100])**

Change the light channel from this color, accept only integer values between 0 and 100, Ex:
```js
  new Color('rgba(255, 0, 0, 1)').light(80) // => rgb(235, 173, 173);
```
![#ebadad](https://placehold.it/15/ebadad/000000?text=+)
<span style="background-color:rgb(235, 173, 173);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- red: **(int: [0..255])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('hsl(0, 100%, 50%)').red(50) // => rgb(50, 0, 0);
```
![#ebadad](https://placehold.it/15/ebadad/000000?text=+)
<span style="background-color:rgb(50, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- green: **(int: [0..255])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('hsla(0, 100%, 50%, 1)').green(50) // => rgb(255, 50, 0);
```
![#ff3200](https://placehold.it/15/ff3200/000000?text=+)
<span style="background-color:rgb(255, 50, 0);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- blue: **(int: [0..255])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('red').blue(50) // => rgb(255, 0, 50);
```
![#ff0032](https://placehold.it/15/ff0032/000000?text=+)
<span style="background-color:rgb(255, 0, 50);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- saturate: **(int: [0..100])**

Change the red channel from this color, accept only integer values between 0 and 100, Ex:
```js
  new Color('brown').saturate(40) // => rgb(203, 1, 1);
```
![#cb0101](https://placehold.it/15/cb0101/000000?text=+)
<span style="background-color:rgb(203, 1, 1);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- desaturate: **(int: [0..100])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('red').desaturate(50) // => rgb(191, 64, 64);
```
![#bf4040](https://placehold.it/15/bf4040/000000?text=+)
<span style="background-color:rgb(191, 64, 64);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- lighten: **(int: [0..100])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('red').lighten(20) // => rgb(255, 102, 102);
```
![#ff6666](https://placehold.it/15/ff6666/000000?text=+)
<span style="background-color:rgb(255, 102, 102);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- darken: **(int: [0..100])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('red').darken(20) // => rgb(153, 0, 0);
```
![#990000](https://placehold.it/15/990000/000000?text=+)
<span style="background-color:rgb(153, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- opacify: **(int: [0..1])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('red').opacify(.2) // => rgba(255, 0, 0, 0.8);
```
![#ff0000cc](https://placehold.it/15/ff0000cc/000000?text=+)
<span style="background-color:rgba(255, 0, 0, 0.8);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- hueRotate: **(int: [0..*])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('red').hueRotate(500) // => rgb(0, 255, 81);
```
![#00ff51](https://placehold.it/15/00ff51/000000?text=+)
<span style="background-color:rgb(0, 255, 81);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- redish: **(int: [0..255])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('blue').redish(100) // => rgb(100, 0, 255);
```
![#6400ff](https://placehold.it/15/6400ff/000000?text=+)
<span style="background-color:rgb(100, 0, 255);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- greenish: **(int: [0..255])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('red').greenish(100) // => rgb(255, 100, 0);
```
![#ff6400](https://placehold.it/15/ff6400/000000?text=+)
<span style="background-color:rgb(255, 100, 0);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- blueish: **(int: [0..255])**

Change the red channel from this color, accept only integer values between 0 and 255, Ex:
```js
  new Color('red').blueish(100) // => rgb(255, 0, 100);
```
![#ff0064](https://placehold.it/15/ff0064/000000?text=+)
<span style="background-color:rgb(255, 0, 100);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- multiply: **(color: [colorFormat])**

Apply `Multiply` color algorithm, accept all of the colors formats, Ex:
```js
  new Color('red').multiply('blue') // => rgb(128, 0, 128);
```
![#800080](https://placehold.it/15/800080/000000?text=+)
<span style="background-color:rgb(128, 0, 128);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- screen: **(color: [colorFormat])**

Apply `Screen` color algorithm, accept all of the colors formats, Ex:
```js
  new Color('red').screen('blue') // => rgb(255, 0, 255);
```
![#ff00ff](https://placehold.it/15/ff00ff/000000?text=+)
<span style="background-color:rgb(255, 0, 255);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- overlay: **(color: [colorFormat])**

Apply `Overlay` color algorithm, accept all of the colors formats, Ex:
```js
  new Color('red').overlay('blue') // => rgb(255, 0, 0);
```
![#ff0000](https://placehold.it/15/ff0000/000000?text=+)
<span style="background-color:rgb(255, 0, 0);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- mix: **(color: [colorFormat], weight: [0..100])**

Apply `Mix` color algorithm, accept all of the colors formats, and a weight to represent amount strength is the mixed color, 50 is the middle between the colors strength on the mix Ex:
```js
  new Color('red').mix('blue', 30) // => rgb(179, 0, 77);
```
![#b3004d](https://placehold.it/15/b3004d/000000?text=+)
<span style="background-color:rgb(179, 0, 77);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- difference: **(color: [colorFormat])**

Apply `Difference` color algorithm, accept all of the colors formats, Ex:
```js
  new Color('red').difference('blue') // => rgb(255, 0, 255);
```
![#ff00ff](https://placehold.it/15/ff00ff/000000?text=+)
<span style="background-color:rgb(255, 0, 255);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- divide: **(color: [colorFormat])**

Apply `Divide` color algorithm, accept all of the colors formats, Ex:
```js
  new Color('red').divide('blue') // => rgb(198, 255, 0);
```
![#c6ff00](https://placehold.it/15/c6ff00/000000?text=+)
<span style="background-color:rgb(198, 255, 0);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- addition: **(color: [colorFormat])**

Apply `Addition` color algorithm, accept all of the colors formats, Ex:
```js
  new Color('red').addition('blue') // => rgb(255, 0, 255);
```
![#ff00ff](https://placehold.it/15/ff00ff/000000?text=+)
<span style="background-color:rgb(255, 0, 255);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- subtract: **(color: [colorFormat])**

Apply `Subtract` color algorithm, accept all of the colors formats, Ex:
```js
  new Color('brown').subtract('darkblue') // => rgb(165, 42, 0);
```
![#a52a00](https://placehold.it/15/a52a00/000000?text=+)
<span style="background-color:rgb(165, 42, 0);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- darkenOnly: **(color: [colorFormat])**

Apply `DarkenOnly` color algorithm, accept all of the colors formats, Ex:
```js
  new Color('brown').darkenOnly('magenta') // => rgb(165, 0, 42);
```
![#a5002a](https://placehold.it/15/a5002a/000000?text=+)
<span style="background-color:rgb(165, 0, 42);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

- lightenOnly: **(color: [colorFormat])**

Apply `LightenOnly` color algorithm, accept all of the colors formats, Ex:
```js
  new Color('brown').lightenOnly('magenta') // => rgb(255, 42, 255);
```
![#ff2aff](https://placehold.it/15/ff2aff/000000?text=+)
<span style="background-color:rgb(255, 42, 255);">&nbsp;&nbsp;&nbsp;&nbsp;</span>

