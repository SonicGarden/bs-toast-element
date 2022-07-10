# &lt;bs-toast&gt; element

## Installation

```
$ npm install @sonicgarden/bs-toast-element
```

## Usage

```js
import { openToast } from '@sonicgarden/bs-toast-element'

openToast('Hello, world', { bgColor: 'success', delay: 5000 })
```

Refer to the [type definitions](https://github.com/SonicGarden/bs-toast-element/blob/main/types/helpers.d.ts) for more options.

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

- Chrome
- Firefox
- Safari
- Microsoft Edge

[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements

## Development

```
pnpm i
pnpm dev
```

## License

Distributed under the MIT license. See LICENSE for details.
