# Set Facebook Cookies

This simple script sets the `_fbp` and `_fbc` cookies when Pixel doesn't.

In Belgium, the served Pixel script is [different than in the rest of the world](./be_pixel.diff): it's missing pieces of code for handling first-party cookies. This affects other parts of the Pixel code including the correct handling of tracking in iOS 14.5+, and prevents us from reading the cookies for use with the Conversion API.

This package is reimplements the missing piece of the Pixel which sets `_fbc` and `_fbp`.

```html
<script async defer src="https://unpkg.com/set-fb-cookies">
```

```ts
import setFbCookies from "set-fb-cookies";

setFbCookies();
```

```js
const setFbCookies = require("set-fb-cookies").default;

setFbCookies();
```

Better yet, if you want to use only the Conversion API you can use this script to generate `_fbc` and `_fbp` which you can then pass to your Server. This makes it possible to skip the using the browser Pixel.
