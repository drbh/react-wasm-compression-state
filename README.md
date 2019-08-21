### Use WASM FLATE as a custom React hook


[![npm version](https://badge.fury.io/js/react-compressed-local-storage.svg)](https://badge.fury.io/js/react-compressed-local-storage)
[![dependencies Status](https://david-dm.org/dwyl/esta/status.svg)](https://david-dm.org/dwyl/esta)

### Powered by

<a href="https://github.com/drbh/wasm-flate">
<img src="https://raw.githubusercontent.com/drbh/wasm-flate/master/images/wasm-flate.png"  width="120" />
</a>

<img src="https://img.shields.io/github/stars/drbh/wasm-flate.svg" /> [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=The%20fastest%20compression%20library%20in%20your%20browser.&url=https://github.com/drbh/wasm-flate&hashtags=wasm,js,webdev,rust,compression) 


## Install 
```bash
npm i react-compressed-local-storage
```

## Use


#### Example
Check out https://github.com/drbh/react-compressed-local-storage for a full React example

Using the hook is easy! Just use `useCompressedLocalStorageState` in place of `setState`

```javascript
import React from "react";
import useCompressedLocalStorageState from "react-compressed-local-storage";

export default function Counter() {
  const [count, setCount] = useCompressedLocalStorageState(
    "counter",
    999999999999999
  );
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}
```
