### Use WASM FLATE as a custom React hook


[![npm version](https://badge.fury.io/js/react-compressed-local-storage.svg)](https://badge.fury.io/js/react-compressed-local-storage)
[![dependencies Status](https://david-dm.org/dwyl/esta/status.svg)](https://david-dm.org/dwyl/esta)

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


### Dev
```
npm publish
```
