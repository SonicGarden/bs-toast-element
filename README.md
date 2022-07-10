# &lt;bs-toast&gt; element

## Installation

```
$ yarn add https://github.com/SonicGarden/bs-toast-element.git#v0.2.0
```

## Usage

```js
import { openToast } from '@sonicgarden/bs-toast-element'

openToast('Hello, world', { bgColor: 'success', delay: 5000 })
```

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
