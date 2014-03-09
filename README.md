Lua Worker
==========

Package for running a Lua VM in a Web Worker.


Example
-------

To be able to run this in a browser, you need to use a framework that
supports CommonJS modules (for example: [Browserify][]).

If you prebuilt the `worker.js` file, you can specify its location when
calling the `luaworker` module function:

```js
var lua = require('luaworker')('build/worker-lua.js');
lua.execute('name = "Lua"');
lua.execute('print("Hello from " .. name .. "!")');
```


Emscripten
----------

To build the required JavaScript, you need to have [Emscripten][] in
your PATH. To build, simply run `./build`.

The work in `emlua.patch` is borrowed from kripken's [lua.vm.js][].

**Note:** This does not include the Lua → JS bridge, since allowing
access to JavaScript from Lua might not always be desirable.

[Emscripten]: https://github.com/kripken/emscripten
[lua.vm.js]: https://github.com/kripken/lua.vm.js
