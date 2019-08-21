import { useState, useEffect } from "react";

export default function useCompressedLocalStorageState(key, defaultValue) {
  const [obj, setObj] = useState(null);
  var WASM_VECTOR_LEN = 0;

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    if (obj != null) {
      whenSetupComplete();
    }
  }, [obj]);

  function whenSetupComplete() {
    console.log("was complete");

    var compressedStore = window.localStorage.getItem(key + "compressed");

    if (compressedStore == "") {
      compressWasm(String(defaultValue)).then(compressed => {
        console.log("DEFAULT COMPRESS", String(defaultValue), compressed);
        window.localStorage.setItem(key + "compressed", compressed);

        var compressedStore = window.localStorage.getItem(key + "compressed");
        console.log("GOT COMPRESSED KEY", compressedStore, obj);
        console.log("decompressing", compressedStore);
        deCompressWasm(compressedStore).then(decompressed => {
          console.log(
            "DECOMPRE",
            compressedStore,
            decompressed,
            compressedStore.length,
            decompressed.length
          );
          setState(JSON.parse(decompressed));
        });
      });
    } else {
      deCompressWasm(compressedStore).then(decompressed => {
        console.log(
          "DECOMPRE",
          compressedStore,
          decompressed,
          compressedStore.length,
          decompressed.length
        );
        setState(JSON.parse(decompressed));
      });
    }
  }

  function setup() {
    // let wasm;
    console.log("Run Setup");
    var path =
      "https://unpkg.com/wasm-flate@0.1.12-alpha/dist/9eae6f5a6ee0cd2a3640.module.wasm";

    fetch(path).then(function(response) {
      console.log("SET STATE 1");
      response.arrayBuffer().then(function(buffer) {
        console.log("SET STATE 2");
        WebAssembly.compile(buffer).then(function(o) {
          console.log("SET STATE 3");
          setObj(o);
        });
      });
    });
  }

  function compressWasm(stringToCompress) {
    return WebAssembly.instantiate(obj).then(function(skee) {
      let wasm = skee.exports;

      let cachegetNodeBufferMemory = null;

      function getNodeBufferMemory() {
        if (
          cachegetNodeBufferMemory === null ||
          cachegetNodeBufferMemory.buffer !== wasm.memory.buffer
        ) {
          cachegetNodeBufferMemory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetNodeBufferMemory;
      }

      function passStringToWasm(arg) {
        const size = arg.length;
        const ptr = wasm.__wbindgen_malloc(size);
        var enc = new TextEncoder();
        var y = enc.encode(arg);
        getNodeBufferMemory().set(y, ptr);
        WASM_VECTOR_LEN = size;
        return ptr;
      }

      let cachegetInt32Memory = null;

      function getInt32Memory() {
        if (
          cachegetInt32Memory === null ||
          cachegetInt32Memory.buffer !== wasm.memory.buffer
        ) {
          cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
        }
        return cachegetInt32Memory;
      }

      let cachedTextDecoder = new TextDecoder("utf-8");

      let cachegetUint8Memory = null;

      function getUint8Memory() {
        if (
          cachegetUint8Memory === null ||
          cachegetUint8Memory.buffer !== wasm.memory.buffer
        ) {
          cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
      }

      function getStringFromWasm(ptr, len) {
        return cachedTextDecoder.decode(
          getUint8Memory().subarray(ptr, ptr + len)
        );
      }
      /**
       * @param {string} base_compressed
       * @returns {string}
       */
      const zlib_decode = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.zlib_decode(
          retptr,
          passStringToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getStringFromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {string} base_raw
       * @returns {string}
       */
      const zlib_encode = function(base_raw) {
        const retptr = 8;
        const ret = wasm.zlib_encode(
          retptr,
          passStringToWasm(base_raw),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getStringFromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {string} base_compressed
       * @returns {string}
       */
      const gzip_decode = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.gzip_decode(
          retptr,
          passStringToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getStringFromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {string} base_raw
       * @returns {string}
       */
      const gzip_encode = function(base_raw) {
        const retptr = 8;
        const ret = wasm.gzip_encode(
          retptr,
          passStringToWasm(base_raw),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getStringFromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {string} base_compressed
       * @returns {string}
       */
      const deflate_decode = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.deflate_decode(
          retptr,
          passStringToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getStringFromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {string} base_raw
       * @returns {string}
       */
      const deflate_encode = function(base_raw) {
        const retptr = 8;
        var v = passStringToWasm(base_raw);
        const ret = wasm.deflate_encode(retptr, v, WASM_VECTOR_LEN);
        const memi32 = getInt32Memory();
        const v0 = getStringFromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      function passArray8ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 1);
        getUint8Memory().set(arg, ptr / 1);
        WASM_VECTOR_LEN = arg.length;
        return ptr;
      }

      function getArrayU8FromWasm(ptr, len) {
        return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
      }
      /**
       * @param {Uint8Array} base_compressed
       * @returns {Uint8Array}
       */
      const zlib_decode_raw = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.zlib_decode_raw(
          retptr,
          passArray8ToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getArrayU8FromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {Uint8Array} base_raw
       * @returns {Uint8Array}
       */
      const zlib_encode_raw = function(base_raw) {
        const retptr = 8;
        const ret = wasm.zlib_encode_raw(
          retptr,
          passArray8ToWasm(base_raw),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getArrayU8FromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {Uint8Array} base_compressed
       * @returns {Uint8Array}
       */
      const gzip_decode_raw = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.gzip_decode_raw(
          retptr,
          passArray8ToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getArrayU8FromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {Uint8Array} base_raw
       * @returns {Uint8Array}
       */
      const gzip_encode_raw = function(base_raw) {
        const retptr = 8;
        const ret = wasm.gzip_encode_raw(
          retptr,
          passArray8ToWasm(base_raw),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getArrayU8FromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {Uint8Array} base_compressed
       * @returns {Uint8Array}
       */
      const deflate_decode_raw = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.deflate_decode_raw(
          retptr,
          passArray8ToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getArrayU8FromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {Uint8Array} base_raw
       * @returns {Uint8Array}
       */
      const deflate_encode_raw = function(base_raw) {
        const retptr = 8;
        const ret = wasm.deflate_encode_raw(
          retptr,
          passArray8ToWasm(base_raw),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getArrayU8FromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      return deflate_encode(stringToCompress);
    });
  }

  function deCompressWasm(stringToDeCompress) {
    return WebAssembly.instantiate(obj).then(function(skee) {
      let wasm = skee.exports;

      let cachegetNodeBufferMemory = null;

      function getNodeBufferMemory() {
        if (
          cachegetNodeBufferMemory === null ||
          cachegetNodeBufferMemory.buffer !== wasm.memory.buffer
        ) {
          cachegetNodeBufferMemory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetNodeBufferMemory;
      }

      function passStringToWasm(arg) {
        const size = arg.length;
        const ptr = wasm.__wbindgen_malloc(size);
        var enc = new TextEncoder();
        var y = enc.encode(arg);
        getNodeBufferMemory().set(y, ptr);
        WASM_VECTOR_LEN = size;
        return ptr;
      }

      let cachegetInt32Memory = null;

      function getInt32Memory() {
        if (
          cachegetInt32Memory === null ||
          cachegetInt32Memory.buffer !== wasm.memory.buffer
        ) {
          cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
        }
        return cachegetInt32Memory;
      }

      let cachedTextDecoder = new TextDecoder("utf-8");

      let cachegetUint8Memory = null;

      function getUint8Memory() {
        if (
          cachegetUint8Memory === null ||
          cachegetUint8Memory.buffer !== wasm.memory.buffer
        ) {
          cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
      }

      function getStringFromWasm(ptr, len) {
        return cachedTextDecoder.decode(
          getUint8Memory().subarray(ptr, ptr + len)
        );
      }
      /**
       * @param {string} base_compressed
       * @returns {string}
       */
      const zlib_decode = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.zlib_decode(
          retptr,
          passStringToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getStringFromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {string} base_compressed
       * @returns {string}
       */
      const gzip_decode = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.gzip_decode(
          retptr,
          passStringToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getStringFromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {string} base_compressed
       * @returns {string}
       */
      const deflate_decode = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.deflate_decode(
          retptr,
          passStringToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getStringFromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      function passArray8ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 1);
        getUint8Memory().set(arg, ptr / 1);
        WASM_VECTOR_LEN = arg.length;
        return ptr;
      }

      function getArrayU8FromWasm(ptr, len) {
        return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
      }
      /**
       * @param {Uint8Array} base_compressed
       * @returns {Uint8Array}
       */
      const zlib_decode_raw = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.zlib_decode_raw(
          retptr,
          passArray8ToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getArrayU8FromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {Uint8Array} base_compressed
       * @returns {Uint8Array}
       */
      const gzip_decode_raw = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.gzip_decode_raw(
          retptr,
          passArray8ToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getArrayU8FromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      /**
       * @param {Uint8Array} base_compressed
       * @returns {Uint8Array}
       */
      const deflate_decode_raw = function(base_compressed) {
        const retptr = 8;
        const ret = wasm.deflate_decode_raw(
          retptr,
          passArray8ToWasm(base_compressed),
          WASM_VECTOR_LEN
        );
        const memi32 = getInt32Memory();
        const v0 = getArrayU8FromWasm(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1]
        ).slice();
        wasm.__wbindgen_free(
          memi32[retptr / 4 + 0],
          memi32[retptr / 4 + 1] * 1
        );
        return v0;
      };

      return deflate_decode(stringToDeCompress);
    });
  }

  const [state, setState] = useState(() => {
    let value;
    try {
      // var compressedStore = window.localStorage.getItem(key + "compressed")

      // console.log("GOT COMPRESSED KEY", compressedStore, obj)
      // setup().then((resp) => {
      // 	console.log(resp)
      //     console.log("GOT COMPRESSED KEY", compressedStore, obj)

      //     console.log("decompressing", compressedStore)
      //     deCompressWasm(compressedStore).then((decompressed) => {
      //         console.log("DECOMPRE", compressedStore, compressed)
      //     })

      value = JSON.parse(
        // window.localStorage.getItem(key) || String(defaultValue)
        String(defaultValue)
      );
      //     return value
      // })
    } catch (e) {
      value = defaultValue;
    }
    // console.log("Got state", value)
    return value;
  });

  // WHEN EVER THE STATE CHANGES WE SHOUD COMPRESS AND SAVE
  useEffect(() => {
    console.log("CURRENT STATE", state);
    if (obj != null) {
      var toCompress = JSON.stringify(state);
      compressWasm(toCompress).then(compressed => {
        console.log(
          "COMPRESS",
          toCompress,
          compressed,
          toCompress.length,
          compressed.length
        );
        window.localStorage.setItem(key + "compressed", compressed);
      });
    }
    // window.localStorage.setItem(key, state)
  }, [state]);
  return [state, setState];
}
