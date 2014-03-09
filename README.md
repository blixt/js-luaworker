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
var lua = require('luaworker')('worker.js');
lua.execute('name = "Lua"');
lua.execute('print("Hello from " .. name .. "!")');
```


Using this package
------------------

As stated above, you need to first package this code so that it can run
in a browser. You can do this with, for example, [Browserify][].

To get the necessary files from this package, install it with [NPM][]:

```bash
npm install --save luaworker
```

Here's how you'd create the JavaScript files to run in your browser,
assuming you are using the code in the *Example* section above:

```bash
# Bundle the Worker code into its own file.
browserify node_modules/luaworker/worker.js -o worker.js
# This file contains the code from the Example section.
browserify main.js -o app.js
```

Note that this hasn't been optimized yet, so if you don't minimize your
code (by using [UglifyJS][], for example), you may end up with a huge
`worker.js` file.


Building
--------

To build the required JavaScript, you need to have [Emscripten][] in
your PATH. To build, simply run `./build`.

The work in `emlua.patch` is borrowed from kripken's [lua.vm.js][].

**Note:** This does not include the Lua → JS bridge, since allowing
access to JavaScript from Lua might not always be desirable.

[Browserify]: http://browserify.org/
[Emscripten]: https://github.com/kripken/emscripten
[lua.vm.js]: https://github.com/kripken/lua.vm.js
[NPM]: https://www.npmjs.org/
[UglifyJS]: https://github.com/mishoo/UglifyJS
