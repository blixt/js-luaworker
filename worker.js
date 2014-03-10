(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function(){
// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = {
  printBuffer: '',
  print: function (out) {
    Module.printBuffer += out + '\n';
  }
};

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
}
else if (ENVIRONMENT_IS_SHELL) {
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WEB) {
    this['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Auto-generated preamble library stuff ===

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?\{ ?[^}]* ?\}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_ && type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    code = Pointer_stringify(code);
    if (code[0] === '"') {
      // tolerate EM_ASM("..code..") even though EM_ASM(..code..) is correct
      if (code.indexOf('"', 1) === code.length-1) {
        code = code.substr(1, code.length-2);
      } else {
        // something invalid happened, e.g. EM_ASM("..code($0)..", input)
        abort('invalid EM_ASM input |' + code + '|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)');
      }
    }
    return Runtime.asmConstCache[code] = eval('(function(' + args.join(',') + '){ ' + code + ' })'); // new Function does not allow upvars in node
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;

      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }

      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }

      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          Math.floor((codePoint - 0x10000) / 0x400) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  getCompilerSetting: function (name) {
    throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*(+4294967296))) : ((+((low>>>0)))+((+((high|0)))*(+4294967296)))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}


Module['Runtime'] = Runtime;









//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = Module['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      value = intArrayFromString(value);
      type = 'array';
    }
    if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}

// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;

// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;

// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module['allocate'] = allocate;

function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }

  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16LE form. The copy will require at most (str.length*2+1)*2 bytes of space in the HEAP.
function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;

// Given a pointer 'ptr' to a null-terminated UTF32LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32LE form. The copy will require at most (str.length+1)*4 bytes of space in the HEAP,
// but can use less, since str.length does not return the number of characters in the string, but the number of UTF-16 code units in the string.
function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;

function demangle(func) {
  var i = 3;
  // params, etc.
  var basicTypes = {
    'v': 'void',
    'b': 'bool',
    'c': 'char',
    's': 'short',
    'i': 'int',
    'l': 'long',
    'f': 'float',
    'd': 'double',
    'w': 'wchar_t',
    'a': 'signed char',
    'h': 'unsigned char',
    't': 'unsigned short',
    'j': 'unsigned int',
    'm': 'unsigned long',
    'x': 'long long',
    'y': 'unsigned long long',
    'z': '...'
  };
  var subs = [];
  var first = true;
  function dump(x) {
    //return;
    if (x) Module.print(x);
    Module.print(func);
    var pre = '';
    for (var a = 0; a < i; a++) pre += ' ';
    Module.print (pre + '^');
  }
  function parseNested() {
    i++;
    if (func[i] === 'K') i++; // ignore const
    var parts = [];
    while (func[i] !== 'E') {
      if (func[i] === 'S') { // substitution
        i++;
        var next = func.indexOf('_', i);
        var num = func.substring(i, next) || 0;
        parts.push(subs[num] || '?');
        i = next+1;
        continue;
      }
      if (func[i] === 'C') { // constructor
        parts.push(parts[parts.length-1]);
        i += 2;
        continue;
      }
      var size = parseInt(func.substr(i));
      var pre = size.toString().length;
      if (!size || !pre) { i--; break; } // counter i++ below us
      var curr = func.substr(i + pre, size);
      parts.push(curr);
      subs.push(curr);
      i += pre + size;
    }
    i++; // skip E
    return parts;
  }
  function parse(rawList, limit, allowVoid) { // main parser
    limit = limit || Infinity;
    var ret = '', list = [];
    function flushList() {
      return '(' + list.join(', ') + ')';
    }
    var name;
    if (func[i] === 'N') {
      // namespaced N-E
      name = parseNested().join('::');
      limit--;
      if (limit === 0) return rawList ? [name] : name;
    } else {
      // not namespaced
      if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
      var size = parseInt(func.substr(i));
      if (size) {
        var pre = size.toString().length;
        name = func.substr(i + pre, size);
        i += pre + size;
      }
    }
    first = false;
    if (func[i] === 'I') {
      i++;
      var iList = parse(true);
      var iRet = parse(true, 1, true);
      ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
    } else {
      ret = name;
    }
    paramLoop: while (i < func.length && limit-- > 0) {
      //dump('paramLoop');
      var c = func[i++];
      if (c in basicTypes) {
        list.push(basicTypes[c]);
      } else {
        switch (c) {
          case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
          case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
          case 'L': { // literal
            i++; // skip basic type
            var end = func.indexOf('E', i);
            var size = end - i;
            list.push(func.substr(i, size));
            i += size + 2; // size + 'EE'
            break;
          }
          case 'A': { // array
            var size = parseInt(func.substr(i));
            i += size.toString().length;
            if (func[i] !== '_') throw '?';
            i++; // skip _
            list.push(parse(true, 1, true)[0] + ' [' + size + ']');
            break;
          }
          case 'E': break paramLoop;
          default: ret += '?' + c; break paramLoop;
        }
      }
    }
    if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
    return rawList ? list : ret + flushList();
  }
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    return parse();
  } catch(e) {
    return func;
  }
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function stackTrace() {
  var stack = new Error().stack;
  return stack ? demangleAll(stack) : '(no stack trace available)'; // Stack trace is not available at least on IE10 and Safari 6.
}

// Memory management

var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk

function enlargeMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');
}

var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 134217728;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;

var totalMemory = 4096;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be more reasonable');
  TOTAL_MEMORY = totalMemory;
}

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'JS engine does not provide full typed array support');

var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);

// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;

function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;

// Tools

// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;

// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))|0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;

// === Body ===





STATIC_BASE = 8;

STATICTOP = STATIC_BASE + Runtime.alignMemory(12587);
/* global initializers */ __ATINIT__.push();


/* memory initializer */ allocate([0,0,0,0,0,0,0,0,105,110,112,117,116,0,0,0,69,82,82,79,82,58,32,37,115,10,0,0,0,0,0,0,0,0,0,0,0,96,127,64,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,115,10,0,0,0,0,0,115,116,97,99,107,32,116,114,97,99,101,98,97,99,107,58,0,0,0,0,0,0,0,0,10,9,46,46,46,0,0,0,83,108,110,116,0,0,0,0,10,9,37,115,58,0,0,0,37,100,58,0,0,0,0,0,32,105,110,32,0,0,0,0,10,9,40,46,46,46,116,97,105,108,32,99,97,108,108,115,46,46,46,41,0,0,0,0,98,97,100,32,97,114,103,117,109,101,110,116,32,35,37,100,32,40,37,115,41,0,0,0,110,0,0,0,0,0,0,0,109,101,116,104,111,100,0,0,99,97,108,108,105,110,103,32,39,37,115,39,32,111,110,32,98,97,100,32,115,101,108,102,32,40,37,115,41,0,0,0,63,0,0,0,0,0,0,0,98,97,100,32,97,114,103,117,109,101,110,116,32,35,37,100,32,116,111,32,39,37,115,39,32,40,37,115,41,0,0,0,83,108,0,0,0,0,0,0,37,115,58,37,100,58,32,0,0,0,0,0,0,0,0,0,37,115,58,32,37,115,0,0,101,120,105,116,0,0,0,0,105,110,118,97,108,105,100,32,111,112,116,105,111,110,32,39,37,115,39,0,0,0,0,0,115,116,97,99,107,32,111,118,101,114,102,108,111,119,32,40,37,115,41,0,0,0,0,0,115,116,97,99,107,32,111,118,101,114,102,108,111,119,0,0,118,97,108,117,101,32,101,120,112,101,99,116,101,100,0,0,98,117,102,102,101,114,32,116,111,111,32,108,97,114,103,101,0,0,0,0,0,0,0,0,61,115,116,100,105,110,0,0,64,37,115,0,0,0,0,0,114,0,0,0,0,0,0,0,111,112,101,110,0,0,0,0,114,98,0,0,0,0,0,0,114,101,111,112,101,110,0,0,114,101,97,100,0,0,0,0,111,98,106,101,99,116,32,108,101,110,103,116,104,32,105,115,32,110,111,116,32,97,32,110,117,109,98,101,114,0,0,0,95,95,116,111,115,116,114,105,110,103,0,0,0,0,0,0,116,114,117,101,0,0,0,0,102,97,108,115,101,0,0,0,110,105,108,0,0,0,0,0,37,115,58,32,37,112,0,0,95,76,79,65,68,69,68,0,110,97,109,101,32,99,111,110,102,108,105,99,116,32,102,111,114,32,109,111,100,117,108,101,32,39,37,115,39,0,0,0,116,111,111,32,109,97,110,121,32,117,112,118,97,108,117,101,115,0,0,0,0,0,0,0,109,117,108,116,105,112,108,101,32,76,117,97,32,86,77,115,32,100,101,116,101,99,116,101,100,0,0,0,0,0,0,0,118,101,114,115,105,111,110,32,109,105,115,109,97,116,99,104,58,32,97,112,112,46,32,110,101,101,100,115,32,37,102,44,32,76,117,97,32,99,111,114,101,32,112,114,111,118,105,100,101,115,32,37,102,0,0,0,98,97,100,32,99,111,110,118,101,114,115,105,111,110,32,110,117,109,98,101,114,45,62,105,110,116,59,32,109,117,115,116,32,114,101,99,111,109,112,105,108,101,32,76,117,97,32,119,105,116,104,32,112,114,111,112,101,114,32,115,101,116,116,105,110,103,115,0,0,0,0,0,80,65,78,73,67,58,32,117,110,112,114,111,116,101,99,116,101,100,32,101,114,114,111,114,32,105,110,32,99,97,108,108,32,116,111,32,76,117,97,32,65,80,73,32,40,37,115,41,10,0,0,0,0,0,0,0,239,187,191,0,0,0,0,0,99,97,110,110,111,116,32,37,115,32,37,115,58,32,37,115,0,0,0,0,0,0,0,0,37,115,32,101,120,112,101,99,116,101,100,44,32,103,111,116,32,37,115,0,0,0,0,0,102,0,0,0,0,0,0,0,46,0,0,0,0,0,0,0,102,117,110,99,116,105,111,110,32,39,37,115,39,0,0,0,109,97,105,110,32,99,104,117,110,107,0,0,0,0,0,0,102,117,110,99,116,105,111,110,32,60,37,115,58,37,100,62,0,0,0,0,0,0,0,0,97,116,116,101,109,112,116,32,116,111,32,37,115,32,37,115,32,39,37,115,39,32,40,97,32,37,115,32,118,97,108,117,101,41,0,0,0,0,0,0,97,116,116,101,109,112,116,32,116,111,32,37,115,32,97,32,37,115,32,118,97,108,117,101,0,0,0,0,0,0,0,0,99,111,110,99,97,116,101,110,97,116,101,0,0,0,0,0,112,101,114,102,111,114,109,32,97,114,105,116,104,109,101,116,105,99,32,111,110,0,0,0,97,116,116,101,109,112,116,32,116,111,32,99,111,109,112,97,114,101,32,116,119,111,32,37,115,32,118,97,108,117,101,115,0,0,0,0,0,0,0,0,97,116,116,101,109,112,116,32,116,111,32,99,111,109,112,97,114,101,32,37,115,32,119,105,116,104,32,37,115,0,0,0,37,115,58,37,100,58,32,37,115,0,0,0,0,0,0,0,108,111,99,97,108,0,0,0,95,69,78,86,0,0,0,0,103,108,111,98,97,108,0,0,102,105,101,108,100,0,0,0,117,112,118,97,108,117,101,0,99,111,110,115,116,97,110,116,0,0,0,0,0,0,0,0,109,101,116,104,111,100,0,0,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,102,111,114,32,105,116,101,114,97,116,111,114,0,0,0,0,109,101,116,97,109,101,116,104,111,100,0,0,0,0,0,0,61,91,67,93,0,0,0,0,67,0,0,0,0,0,0,0,61,63,0,0,0,0,0,0,109,97,105,110,0,0,0,0,76,117,97,0,0,0,0,0,40,42,116,101,109,112,111,114,97,114,121,41,0,0,0,0,40,42,118,97,114,97,114,103,41,0,0,0,0,0,0,0,115,116,97,99,107,32,111,118,101,114,102,108,111,119,0,0,67,32,115,116,97,99,107,32,111,118,101,114,102,108,111,119,0,0,0,0,0,0,0,0,97,116,116,101,109,112,116,32,116,111,32,121,105,101,108,100,32,97,99,114,111,115,115,32,97,32,67,45,99,97,108,108,32,98,111,117,110,100,97,114,121,0,0,0,0,0,0,0,97,116,116,101,109,112,116,32,116,111,32,121,105,101,108,100,32,102,114,111,109,32,111,117,116,115,105,100,101,32,97,32,99,111,114,111,117,116,105,110,101,0,0,0,0,0,0,0,98,105,110,97,114,121,0,0,116,101,120,116,0,0,0,0,97,116,116,101,109,112,116,32,116,111,32,108,111,97,100,32,97,32,37,115,32,99,104,117,110,107,32,40,109,111,100,101,32,105,115,32,39,37,115,39,41,0,0,0,0,0,0,0,101,114,114,111,114,32,105,110,32,101,114,114,111,114,32,104,97,110,100,108,105,110,103,0,99,97,110,110,111,116,32,114,101,115,117,109,101,32,110,111,110,45,115,117,115,112,101,110,100,101,100,32,99,111,114,111,117,116,105,110,101,0,0,0,99,97,110,110,111,116,32,114,101,115,117,109,101,32,100,101,97,100,32,99,111,114,111,117,116,105,110,101,0,0,0,0,99,97,108,108,0,0,0,0,110,111,32,109,101,115,115,97,103,101,0,0,0,0,0,0,101,114,114,111,114,32,105,110,32,95,95,103,99,32,109,101,116,97,109,101,116,104,111,100,32,40,37,115,41,0,0,0,95,80,82,69,76,79,65,68,0,0,0,0,0,0,0,0,95,71,0,0,0,0,0,0,112,97,99,107,97,103,101,0,99,111,114,111,117,116,105,110,101,0,0,0,0,0,0,0,116,97,98,108,101,0,0,0,105,111,0,0,0,0,0,0,111,115,0,0,0,0,0,0,115,116,114,105,110,103,0,0,98,105,116,51,50,0,0,0,109,97,116,104,0,0,0,0,100,101,98,117,103,0,0,0,32,8,0,0,1,0,0,0,40,8,0,0,2,0,0,0,192,9,0,0,3,0,0,0,48,8,0,0,4,0,0,0,200,9,0,0,5,0,0,0,208,9,0,0,6,0,0,0,216,9,0,0,7,0,0,0,56,8,0,0,8,0,0,0,224,9,0,0,9,0,0,0,232,9,0,0,10,0,0,0,80,8,0,0,11,0,0,0,0,0,0,0,0,0,0,0,95,73,79,95,105,110,112,117,116,0,0,0,0,0,0,0,115,116,100,105,110,0,0,0,95,73,79,95,111,117,116,112,117,116,0,0,0,0,0,0,115,116,100,111,117,116,0,0,115,116,100,101,114,114,0,0,70,73,76,69,42,0,0,0,99,97,110,110,111,116,32,99,108,111,115,101,32,115,116,97,110,100,97,114,100,32,102,105,108,101,0,0,0,0,0,0,95,95,105,110,100,101,120,0,32,8,0,0,1,0,0,0,40,8,0,0,12,0,0,0,48,8,0,0,13,0,0,0,56,8,0,0,14,0,0,0,64,8,0,0,15,0,0,0,72,8,0,0,16,0,0,0,80,8,0,0,17,0,0,0,88,8,0,0,18,0,0,0,96,8,0,0,19,0,0,0,0,0,0,0,0,0,0,0,99,108,111,115,101,0,0,0,102,108,117,115,104,0,0,0,108,105,110,101,115,0,0,0,114,101,97,100,0,0,0,0,115,101,101,107,0,0,0,0,115,101,116,118,98,117,102,0,119,114,105,116,101,0,0,0,95,95,103,99,0,0,0,0,95,95,116,111,115,116,114,105,110,103,0,0,0,0,0,0,102,105,108,101,32,40,99,108,111,115,101,100,41,0,0,0,102,105,108,101,32,40,37,112,41,0,0,0,0,0,0,0,37,46,49,52,103,0,0,0,97,116,116,101,109,112,116,32,116,111,32,117,115,101,32,97,32,99,108,111,115,101,100,32,102,105,108,101,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,216,8,0,0,224,8,0,0,232,8,0,0,0,0,0,0,110,111,0,0,0,0,0,0,102,117,108,108,0,0,0,0,108,105,110,101,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,16,9,0,0,24,9,0,0,32,9,0,0,0,0,0,0,115,101,116,0,0,0,0,0,99,117,114,0,0,0,0,0,101,110,100,0,0,0,0,0,110,111,116,32,97,110,32,105,110,116,101,103,101,114,32,105,110,32,112,114,111,112,101,114,32,114,97,110,103,101,0,0,116,111,111,32,109,97,110,121,32,97,114,103,117,109,101,110,116,115,0,0,0,0,0,0,105,110,118,97,108,105,100,32,111,112,116,105,111,110,0,0,105,110,118,97,108,105,100,32,102,111,114,109,97,116,0,0,37,108,102,0,0,0,0,0,116,111,111,32,109,97,110,121,32,111,112,116,105,111,110,115,0,0,0,0,0,0,0,0,102,105,108,101,32,105,115,32,97,108,114,101,97,100,121,32,99,108,111,115,101,100,0,0,37,115,0,0,0,0,0,0,105,110,112,117,116,0,0,0,111,112,101,110,0,0,0,0,111,117,116,112,117,116,0,0,112,111,112,101,110,0,0,0,116,109,112,102,105,108,101,0,116,121,112,101,0,0,0,0,115,116,97,110,100,97,114,100,32,37,115,32,102,105,108,101,32,105,115,32,99,108,111,115,101,100,0,0,0,0,0,0,99,108,111,115,101,100,32,102,105,108,101,0,0,0,0,0,102,105,108,101,0,0,0,0,114,0,0,0,0,0,0,0,39,112,111,112,101,110,39,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,0,0,119,0,0,0,0,0,0,0,99,97,110,110,111,116,32,111,112,101,110,32,102,105,108,101,32,39,37,115,39,32,40,37,115,41,0,0,0,0,0,0,114,119,97,0,0,0,0,0,105,110,118,97,108,105,100,32,109,111,100,101,0,0,0,0,128,11,0,0,20,0,0,0,136,11,0,0,21,0,0,0,144,11,0,0,22,0,0,0,152,11,0,0,23,0,0,0,160,11,0,0,24,0,0,0,168,11,0,0,25,0,0,0,176,11,0,0,26,0,0,0,184,11,0,0,27,0,0,0,192,11,0,0,28,0,0,0,200,11,0,0,29,0,0,0,208,11,0,0,30,0,0,0,216,11,0,0,31,0,0,0,224,11,0,0,32,0,0,0,232,11,0,0,33,0,0,0,240,11,0,0,34,0,0,0,248,11,0,0,35,0,0,0,0,12,0,0,36,0,0,0,8,12,0,0,37,0,0,0,16,12,0,0,38,0,0,0,24,12,0,0,39,0,0,0,32,12,0,0,40,0,0,0,40,12,0,0,41,0,0,0,48,12,0,0,42,0,0,0,64,12,0,0,43,0,0,0,72,12,0,0,44,0,0,0,80,12,0,0,45,0,0,0,88,12,0,0,46,0,0,0,96,12,0,0,47,0,0,0,0,0,0,0,0,0,0,0,112,105,0,0,0,0,0,0,104,117,103,101,0,0,0,0,97,98,115,0,0,0,0,0,97,99,111,115,0,0,0,0,97,115,105,110,0,0,0,0,97,116,97,110,50,0,0,0,97,116,97,110,0,0,0,0,99,101,105,108,0,0,0,0,99,111,115,104,0,0,0,0,99,111,115,0,0,0,0,0,100,101,103,0,0,0,0,0,101,120,112,0,0,0,0,0,102,108,111,111,114,0,0,0,102,109,111,100,0,0,0,0,102,114,101,120,112,0,0,0,108,100,101,120,112,0,0,0,108,111,103,49,48,0,0,0,108,111,103,0,0,0,0,0,109,97,120,0,0,0,0,0,109,105,110,0,0,0,0,0,109,111,100,102,0,0,0,0,112,111,119,0,0,0,0,0,114,97,100,0,0,0,0,0,114,97,110,100,111,109,0,0,114,97,110,100,111,109,115,101,101,100,0,0,0,0,0,0,115,105,110,104,0,0,0,0,115,105,110,0,0,0,0,0,115,113,114,116,0,0,0,0,116,97,110,104,0,0,0,0,116,97,110,0,0,0,0,0,105,110,116,101,114,118,97,108,32,105,115,32,101,109,112,116,121,0,0,0,0,0,0,0,119,114,111,110,103,32,110,117,109,98,101,114,32,111,102,32,97,114,103,117,109,101,110,116,115,0,0,0,0,0,0,0,116,111,111,32,109,97,110,121,32,37,115,32,40,108,105,109,105,116,32,105,115,32,37,100,41,0,0,0,0,0,0,0,109,101,109,111,114,121,32,97,108,108,111,99,97,116,105,111,110,32,101,114,114,111,114,58,32,98,108,111,99,107,32,116,111,111,32,98,105,103,0,0,95,67,76,73,66,83,0,0,95,95,103,99,0,0,0,0,160,16,0,0,48,0,0,0,168,16,0,0,49,0,0,0,184,16,0,0,50,0,0,0,0,0,0,0,0,0,0,0,108,111,97,100,101,114,115,0,115,101,97,114,99,104,101,114,115,0,0,0,0,0,0,0,112,97,116,104,0,0,0,0,76,85,65,95,80,65,84,72,95,53,95,50,0,0,0,0,76,85,65,95,80,65,84,72,0,0,0,0,0,0,0,0,47,117,115,114,47,108,111,99,97,108,47,115,104,97,114,101,47,108,117,97,47,53,46,50,47,63,46,108,117,97,59,47,117,115,114,47,108,111,99,97,108,47,115,104,97,114,101,47,108,117,97,47,53,46,50,47,63,47,105,110,105,116,46,108,117,97,59,47,117,115,114,47,108,111,99,97,108,47,108,105,98,47,108,117,97,47,53,46,50,47,63,46,108,117,97,59,47,117,115,114,47,108,111,99,97,108,47,108,105,98,47,108,117,97,47,53,46,50,47,63,47,105,110,105,116,46,108,117,97,59,46,47,63,46,108,117,97,0,0,0,0,0,0,0,99,112,97,116,104,0,0,0,76,85,65,95,67,80,65,84,72,95,53,95,50,0,0,0,76,85,65,95,67,80,65,84,72,0,0,0,0,0,0,0,47,117,115,114,47,108,111,99,97,108,47,108,105,98,47,108,117,97,47,53,46,50,47,63,46,115,111,59,47,117,115,114,47,108,111,99,97,108,47,108,105,98,47,108,117,97,47,53,46,50,47,108,111,97,100,97,108,108,46,115,111,59,46,47,63,46,115,111,0,0,0,0,47,10,59,10,63,10,33,10,45,10,0,0,0,0,0,0,99,111,110,102,105,103,0,0,95,76,79,65,68,69,68,0,108,111,97,100,101,100,0,0,95,80,82,69,76,79,65,68,0,0,0,0,0,0,0,0,112,114,101,108,111,97,100,0,176,14,0,0,51,0,0,0,184,14,0,0,52,0,0,0,0,0,0,0,0,0,0,0,109,111,100,117,108,101,0,0,114,101,113,117,105,114,101,0,39,112,97,99,107,97,103,101,46,115,101,97,114,99,104,101,114,115,39,32,109,117,115,116,32,98,101,32,97,32,116,97,98,108,101,0,0,0,0,0,109,111,100,117,108,101,32,39,37,115,39,32,110,111,116,32,102,111,117,110,100,58,37,115,0,0,0,0,0,0,0,0,95,78,65,77,69,0,0,0,102,0,0,0,0,0,0,0,39,109,111,100,117,108,101,39,32,110,111,116,32,99,97,108,108,101,100,32,102,114,111,109,32,97,32,76,117,97,32,102,117,110,99,116,105,111,110,0,95,77,0,0,0,0,0,0,95,80,65,67,75,65,71,69,0,0,0,0,0,0,0,0,59,59,0,0,0,0,0,0,59,1,59,0,0,0,0,0,1,0,0,0,0,0,0,0,76,85,65,95,78,79,69,78,86,0,0,0,0,0,0,0,47,0,0,0,0,0,0,0,10,9,110,111,32,109,111,100,117,108,101,32,39,37,115,39,32,105,110,32,102,105,108,101,32,39,37,115,39,0,0,0,101,114,114,111,114,32,108,111,97,100,105,110,103,32,109,111,100,117,108,101,32,39,37,115,39,32,102,114,111,109,32,102,105,108,101,32,39,37,115,39,58,10,9,37,115,0,0,0,46,0,0,0,0,0,0,0,95,0,0,0,0,0,0,0,108,117,97,111,112,101,110,95,37,115,0,0,0,0,0,0,100,121,110,97,109,105,99,32,108,105,98,114,97,114,105,101,115,32,110,111,116,32,101,110,97,98,108,101,100,59,32,99,104,101,99,107,32,121,111,117,114,32,76,117,97,32,105,110,115,116,97,108,108,97,116,105,111,110,0,0,0,0,0,0,39,112,97,99,107,97,103,101,46,37,115,39,32,109,117,115,116,32,98,101,32,97,32,115,116,114,105,110,103,0,0,0,63,0,0,0,0,0,0,0,10,9,110,111,32,102,105,108,101,32,39,37,115,39,0,0,114,0,0,0,0,0,0,0,10,9,110,111,32,102,105,101,108,100,32,112,97,99,107,97,103,101,46,112,114,101,108,111,97,100,91,39,37,115,39,93,0,0,0,0,0,0,0,0,108,111,97,100,108,105,98,0,115,101,97,114,99,104,112,97,116,104,0,0,0,0,0,0,115,101,101,97,108,108,0,0,95,95,105,110,100,101,120,0,97,98,115,101,110,116,0,0,105,110,105,116,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,110,78,0,0,0,0,0,0,120,88,0,0,0,0,0,0,40,110,117,108,108,41,0,0,37,112,0,0,0,0,0,0,37,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,111,112,116,105,111,110,32,39,37,37,37,99,39,32,116,111,32,39,108,117,97,95,112,117,115,104,102,115,116,114,105,110,103,39,0,0,0,0,0,0,46,46,46,0,0,0,0,0,91,115,116,114,105,110,103,32,34,0,0,0,0,0,0,0,34,93,0,0,0,0,0,0,96,113,65,84,80,80,92,108,60,16,60,84,108,124,124,124,124,124,124,96,96,96,104,34,188,188,188,132,228,84,84,16,98,98,4,98,20,81,80,23,232,18,0,0,53,0,0,0,240,18,0,0,54,0,0,0,248,18,0,0,55,0,0,0,8,19,0,0,56,0,0,0,16,19,0,0,57,0,0,0,24,19,0,0,58,0,0,0,32,19,0,0,59,0,0,0,40,19,0,0,60,0,0,0,48,19,0,0,61,0,0,0,64,19,0,0,62,0,0,0,72,19,0,0,63,0,0,0,0,0,0,0,0,0,0,0,99,108,111,99,107,0,0,0,100,97,116,101,0,0,0,0,100,105,102,102,116,105,109,101,0,0,0,0,0,0,0,0,101,120,101,99,117,116,101,0,101,120,105,116,0,0,0,0,103,101,116,101,110,118,0,0,114,101,109,111,118,101,0,0,114,101,110,97,109,101,0,0,115,101,116,108,111,99,97,108,101,0,0,0,0,0,0,0,116,105,109,101,0,0,0,0,116,109,112,110,97,109,101,0,117,110,97,98,108,101,32,116,111,32,103,101,110,101,114,97,116,101,32,97,32,117,110,105,113,117,101,32,102,105,108,101,110,97,109,101,0,0,0,0,115,101,99,0,0,0,0,0,109,105,110,0,0,0,0,0,104,111,117,114,0,0,0,0,100,97,121,0,0,0,0,0,109,111,110,116,104,0,0,0,121,101,97,114,0,0,0,0,105,115,100,115,116,0,0,0,102,105,101,108,100,32,39,37,115,39,32,109,105,115,115,105,110,103,32,105,110,32,100,97,116,101,32,116,97,98,108,101,0,0,0,0,0,0,0,0,6,0,0,0,3,0,0,0,0,0,0,0,4,0,0,0,1,0,0,0,2,0,0,0,16,20,0,0,24,20,0,0,32,20,0,0,40,20,0,0,56,20,0,0,64,19,0,0,0,0,0,0,0,0,0,0,97,108,108,0,0,0,0,0,99,111,108,108,97,116,101,0,99,116,121,112,101,0,0,0,109,111,110,101,116,97,114,121,0,0,0,0,0,0,0,0,110,117,109,101,114,105,99,0,37,99,0,0,0,0,0,0,42,116,0,0,0,0,0,0,119,100,97,121,0,0,0,0,121,100,97,121,0,0,0,0,97,65,98,66,99,100,72,73,106,109,77,112,83,85,119,87,120,88,121,89,122,37,0,0,105,110,118,97,108,105,100,32,99,111,110,118,101,114,115,105,111,110,32,115,112,101,99,105,102,105,101,114,32,39,37,37,37,115,39,0,0,0,0,0,60,37,115,62,32,97,116,32,108,105,110,101,32,37,100,32,110,111,116,32,105,110,115,105,100,101,32,97,32,108,111,111,112,0,0,0,0,0,0,0,110,111,32,118,105,115,105,98,108,101,32,108,97,98,101,108,32,39,37,115,39,32,102,111,114,32,60,103,111,116,111,62,32,97,116,32,108,105,110,101,32,37,100,0,0,0,0,0,60,103,111,116,111,32,37,115,62,32,97,116,32,108,105,110,101,32,37,100,32,106,117,109,112,115,32,105,110,116,111,32,116,104,101,32,115,99,111,112,101,32,111,102,32,108,111,99,97,108,32,39,37,115,39,0,98,114,101,97,107,0,0,0,108,97,98,101,108,115,47,103,111,116,111,115,0,0,0,0,37,115,32,101,120,112,101,99,116,101,100,0,0,0,0,0,115,121,110,116,97,120,32,101,114,114,111,114,0,0,0,0,67,32,108,101,118,101,108,115,0,0,0,0,0,0,0,0,6,6,6,6,7,7,7,7,7,7,10,9,5,4,3,3,3,3,3,3,3,3,3,3,3,3,2,2,1,1,0,0,99,97,110,110,111,116,32,117,115,101,32,39,46,46,46,39,32,111,117,116,115,105,100,101,32,97,32,118,97,114,97,114,103,32,102,117,110,99,116,105,111,110,0,0,0,0,0,0,115,101,108,102,0,0,0,0,60,110,97,109,101,62,32,111,114,32,39,46,46,46,39,32,101,120,112,101,99,116,101,100,0,0,0,0,0,0,0,0,108,111,99,97,108,32,118,97,114,105,97,98,108,101,115,0,102,117,110,99,116,105,111,110,115,0,0,0,0,0,0,0,105,116,101,109,115,32,105,110,32,97,32,99,111,110,115,116,114,117,99,116,111,114,0,0,109,97,105,110,32,102,117,110,99,116,105,111,110,0,0,0,102,117,110,99,116,105,111,110,32,97,116,32,108,105,110,101,32,37,100,0,0,0,0,0,116,111,111,32,109,97,110,121,32,37,115,32,40,108,105,109,105,116,32,105,115,32,37,100,41,32,105,110,32,37,115,0,102,117,110,99,116,105,111,110,32,97,114,103,117,109,101,110,116,115,32,101,120,112,101,99,116,101,100,0,0,0,0,0,117,110,101,120,112,101,99,116,101,100,32,115,121,109,98,111,108,0,0,0,0,0,0,0,108,97,98,101,108,32,39,37,115,39,32,97,108,114,101,97,100,121,32,100,101,102,105,110,101,100,32,111,110,32,108,105,110,101,32,37,100,0,0,0,39,61,39,32,111,114,32,39,105,110,39,32,101,120,112,101,99,116,101,100,0,0,0,0,40,102,111,114,32,103,101,110,101,114,97,116,111,114,41,0,40,102,111,114,32,115,116,97,116,101,41,0,0,0,0,0,40,102,111,114,32,99,111,110,116,114,111,108,41,0,0,0,40,102,111,114,32,105,110,100,101,120,41,0,0,0,0,0,40,102,111,114,32,108,105,109,105,116,41,0,0,0,0,0,40,102,111,114,32,115,116,101,112,41,0,0,0,0,0,0,37,115,32,101,120,112,101,99,116,101,100,32,40,116,111,32,99,108,111,115,101,32,37,115,32,97,116,32,108,105,110,101,32,37,100,41,0,0,0,0,117,112,118,97,108,117,101,115,0,0,0,0,0,0,0,0,110,111,116,32,101,110,111,117,103,104,32,109,101,109,111,114,121,0,0,0,0,0,0,0,32,24,0,0,64,0,0,0,40,24,0,0,65,0,0,0,48,24,0,0,66,0,0,0,56,24,0,0,67,0,0,0,64,24,0,0,68,0,0,0,72,24,0,0,69,0,0,0,80,24,0,0,70,0,0,0,88,24,0,0,71,0,0,0,96,24,0,0,72,0,0,0,104,24,0,0,73,0,0,0,112,24,0,0,74,0,0,0,120,24,0,0,75,0,0,0,128,24,0,0,76,0,0,0,136,24,0,0,77,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,95,95,105,110,100,101,120,0,98,121,116,101,0,0,0,0,99,104,97,114,0,0,0,0,100,117,109,112,0,0,0,0,102,105,110,100,0,0,0,0,102,111,114,109,97,116,0,0,103,109,97,116,99,104,0,0,103,115,117,98,0,0,0,0,108,101,110,0,0,0,0,0,108,111,119,101,114,0,0,0,109,97,116,99,104,0,0,0,114,101,112,0,0,0,0,0,114,101,118,101,114,115,101,0,115,117,98,0,0,0,0,0,117,112,112,101,114,0,0,0,114,101,115,117,108,116,105,110,103,32,115,116,114,105,110,103,32,116,111,111,32,108,97,114,103,101,0,0,0,0,0,0,116,111,111,32,109,97,110,121,32,99,97,112,116,117,114,101,115,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,99,97,112,116,117,114,101,32,105,110,100,101,120,0,0,0,117,110,102,105,110,105,115,104,101,100,32,99,97,112,116,117,114,101,0,0,0,0,0,0,112,97,116,116,101,114,110,32,116,111,111,32,99,111,109,112,108,101,120,0,0,0,0,0,109,105,115,115,105,110,103,32,39,91,39,32,97,102,116,101,114,32,39,37,37,102,39,32,105,110,32,112,97,116,116,101,114,110,0,0,0,0,0,0,105,110,118,97,108,105,100,32,99,97,112,116,117,114,101,32,105,110,100,101,120,32,37,37,37,100,0,0,0,0,0,0,109,97,108,102,111,114,109,101,100,32,112,97,116,116,101,114,110,32,40,101,110,100,115,32,119,105,116,104,32,39,37,37,39,41,0,0,0,0,0,0,109,97,108,102,111,114,109,101,100,32,112,97,116,116,101,114,110,32,40,109,105,115,115,105,110,103,32,39,93,39,41,0,109,97,108,102,111,114,109,101,100,32,112,97,116,116,101,114,110,32,40,109,105,115,115,105,110,103,32,97,114,103,117,109,101,110,116,115,32,116,111,32,39,37,37,98,39,41,0,0,105,110,118,97,108,105,100,32,112,97,116,116,101,114,110,32,99,97,112,116,117,114,101,0,94,36,42,43,63,46,40,91,37,45,0,0,0,0,0,0,115,116,114,105,110,103,47,102,117,110,99,116,105,111,110,47,116,97,98,108,101,32,101,120,112,101,99,116,101,100,0,0,105,110,118,97,108,105,100,32,114,101,112,108,97,99,101,109,101,110,116,32,118,97,108,117,101,32,40,97,32,37,115,41,0,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,117,115,101,32,111,102,32,39,37,99,39,32,105,110,32,114,101,112,108,97,99,101,109,101,110,116,32,115,116,114,105,110,103,0,0,0,0,0,0,0,110,111,32,118,97,108,117,101,0,0,0,0,0,0,0,0,110,111,116,32,97,32,110,117,109,98,101,114,32,105,110,32,112,114,111,112,101,114,32,114,97,110,103,101,0,0,0,0,110,111,116,32,97,32,110,111,110,45,110,101,103,97,116,105,118,101,32,110,117,109,98,101,114,32,105,110,32,112,114,111,112,101,114,32,114,97,110,103,101,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,111,112,116,105,111,110,32,39,37,37,37,99,39,32,116,111,32,39,102,111,114,109,97,116,39,0,0,0,0,0,0,0,92,37,100,0,0,0,0,0,92,37,48,51,100,0,0,0,45,43,32,35,48,0,0,0,105,110,118,97,108,105,100,32,102,111,114,109,97,116,32,40,114,101,112,101,97,116,101,100,32,102,108,97,103,115,41,0,105,110,118,97,108,105,100,32,102,111,114,109,97,116,32,40,119,105,100,116,104,32,111,114,32,112,114,101,99,105,115,105,111,110,32,116,111,111,32,108,111,110,103,41,0,0,0,0,117,110,97,98,108,101,32,116,111,32,100,117,109,112,32,103,105,118,101,110,32,102,117,110,99,116,105,111,110,0,0,0,118,97,108,117,101,32,111,117,116,32,111,102,32,114,97,110,103,101,0,0,0,0,0,0,115,116,114,105,110,103,32,115,108,105,99,101,32,116,111,111,32,108,111,110,103,0,0,0,116,97,98,108,101,32,105,110,100,101,120,32,105,115,32,110,105,108,0,0,0,0,0,0,116,97,98,108,101,32,105,110,100,101,120,32,105,115,32,78,97,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,116,97,98,108,101,32,111,118,101,114,102,108,111,119,0,0,105,110,118,97,108,105,100,32,107,101,121,32,116,111,32,39,110,101,120,116,39,0,0,0,112,28,0,0,78,0,0,0,120,28,0,0,79,0,0,0,128,28,0,0,80,0,0,0,136,28,0,0,81,0,0,0,104,28,0,0,82,0,0,0,144,28,0,0,83,0,0,0,152,28,0,0,84,0,0,0,0,0,0,0,0,0,0,0,117,110,112,97,99,107,0,0,99,111,110,99,97,116,0,0,109,97,120,110,0,0,0,0,105,110,115,101,114,116,0,0,112,97,99,107,0,0,0,0,114,101,109,111,118,101,0,0,115,111,114,116,0,0,0,0,0,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,111,114,100,101,114,32,102,117,110,99,116,105,111,110,32,102,111,114,32,115,111,114,116,105,110,103,0,0,0,0,0,0,112,111,115,105,116,105,111,110,32,111,117,116,32,111,102,32,98,111,117,110,100,115,0,0,116,111,111,32,109,97,110,121,32,114,101,115,117,108,116,115,32,116,111,32,117,110,112,97,99,107,0,0,0,0,0,0,110,0,0,0,0,0,0,0,119,114,111,110,103,32,110,117,109,98,101,114,32,111,102,32,97,114,103,117,109,101,110,116,115,32,116,111,32,39,105,110,115,101,114,116,39,0,0,0,105,110,118,97,108,105,100,32,118,97,108,117,101,32,40,37,115,41,32,97,116,32,105,110,100,101,120,32,37,100,32,105,110,32,116,97,98,108,101,32,102,111,114,32,39,99,111,110,99,97,116,39,0,0,0,0,110,111,32,118,97,108,117,101,0,0,0,0,0,0,0,0,110,105,108,0,0,0,0,0,98,111,111,108,101,97,110,0,117,115,101,114,100,97,116,97,0,0,0,0,0,0,0,0,110,117,109,98,101,114,0,0,115,116,114,105,110,103,0,0,116,97,98,108,101,0,0,0,102,117,110,99,116,105,111,110,0,0,0,0,0,0,0,0,116,104,114,101,97,100,0,0,112,114,111,116,111,0,0,0,117,112,118,97,108,0,0,0,112,29,0,0,128,29,0,0,136,29,0,0,144,29,0,0,160,29,0,0,168,29,0,0,176,29,0,0,184,29,0,0,144,29,0,0,200,29,0,0,208,29,0,0,216,29,0,0,88,30,0,0,96,30,0,0,112,30,0,0,120,30,0,0,128,30,0,0,136,30,0,0,144,30,0,0,152,30,0,0,160,30,0,0,168,30,0,0,176,30,0,0,184,30,0,0,192,30,0,0,200,30,0,0,208,30,0,0,216,30,0,0,232,30,0,0,0,0,0,0,95,95,105,110,100,101,120,0,95,95,110,101,119,105,110,100,101,120,0,0,0,0,0,0,95,95,103,99,0,0,0,0,95,95,109,111,100,101,0,0,95,95,108,101,110,0,0,0,95,95,101,113,0,0,0,0,95,95,97,100,100,0,0,0,95,95,115,117,98,0,0,0,95,95,109,117,108,0,0,0,95,95,100,105,118,0,0,0,95,95,109,111,100,0,0,0,95,95,112,111,119,0,0,0,95,95,117,110,109,0,0,0,95,95,108,116,0,0,0,0,95,95,108,101,0,0,0,0,95,95,99,111,110,99,97,116,0,0,0,0,0,0,0,0,95,95,99,97,108,108,0,0,98,105,110,97,114,121,32,115,116,114,105,110,103,0,0,0,25,147,13,10,26,10,0,0,116,114,117,110,99,97,116,101,100,0,0,0,0,0,0,0,37,115,58,32,37,115,32,112,114,101,99,111,109,112,105,108,101,100,32,99,104,117,110,107,0,0,0,0,0,0,0,0,99,111,114,114,117,112,116,101,100,0,0,0,0,0,0,0,110,111,116,32,97,0,0,0,118,101,114,115,105,111,110,32,109,105,115,109,97,116,99,104,32,105,110,0,0,0,0,0,105,110,99,111,109,112,97,116,105,98,108,101,0,0,0,0,37,46,49,52,103,0,0,0,105,110,100,101,120,0,0,0,108,111,111,112,32,105,110,32,103,101,116,116,97,98,108,101,0,0,0,0,0,0,0,0,108,111,111,112,32,105,110,32,115,101,116,116,97,98,108,101,0,0,0,0,0,0,0,0,115,116,114,105,110,103,32,108,101,110,103,116,104,32,111,118,101,114,102,108,111,119,0,0,103,101,116,32,108,101,110,103,116,104,32,111,102,0,0,0,39,102,111,114,39,32,105,110,105,116,105,97,108,32,118,97,108,117,101,32,109,117,115,116,32,98,101,32,97,32,110,117,109,98,101,114,0,0,0,0,39,102,111,114,39,32,108,105,109,105,116,32,109,117,115,116,32,98,101,32,97,32,110,117,109,98,101,114,0,0,0,0,39,102,111,114,39,32,115,116,101,112,32,109,117,115,116,32,98,101,32,97,32,110,117,109,98,101,114,0,0,0,0,0,95,71,0,0,0,0,0,0,40,33,0,0,85,0,0,0,48,33,0,0,86,0,0,0,64,33,0,0,87,0,0,0,72,33,0,0,88,0,0,0,80,33,0,0,89,0,0,0,96,33,0,0,90,0,0,0,104,33,0,0,91,0,0,0,120,33,0,0,92,0,0,0,128,33,0,0,92,0,0,0,144,33,0,0,93,0,0,0,152,33,0,0,94,0,0,0,160,33,0,0,95,0,0,0,168,33,0,0,96,0,0,0,176,33,0,0,97,0,0,0,192,33,0,0,98,0,0,0,200,33,0,0,99,0,0,0,208,33,0,0,100,0,0,0,216,33,0,0,101,0,0,0,224,33,0,0,102,0,0,0,240,33,0,0,103,0,0,0,0,34,0,0,104,0,0,0,16,34,0,0,105,0,0,0,24,34,0,0,106,0,0,0,0,0,0,0,0,0,0,0,76,117,97,32,53,46,50,0,95,86,69,82,83,73,79,78,0,0,0,0,0,0,0,0,97,115,115,101,114,116,0,0,99,111,108,108,101,99,116,103,97,114,98,97,103,101,0,0,100,111,102,105,108,101,0,0,101,114,114,111,114,0,0,0,103,101,116,109,101,116,97,116,97,98,108,101,0,0,0,0,105,112,97,105,114,115,0,0,108,111,97,100,102,105,108,101,0,0,0,0,0,0,0,0,108,111,97,100,0,0,0,0,108,111,97,100,115,116,114,105,110,103,0,0,0,0,0,0,110,101,120,116,0,0,0,0,112,97,105,114,115,0,0,0,112,99,97,108,108,0,0,0,112,114,105,110,116,0,0,0,114,97,119,101,113,117,97,108,0,0,0,0,0,0,0,0,114,97,119,108,101,110,0,0,114,97,119,103,101,116,0,0,114,97,119,115,101,116,0,0,115,101,108,101,99,116,0,0,115,101,116,109,101,116,97,116,97,98,108,101,0,0,0,0,116,111,110,117,109,98,101,114,0,0,0,0,0,0,0,0,116,111,115,116,114,105,110,103,0,0,0,0,0,0,0,0,116,121,112,101,0,0,0,0,120,112,99,97,108,108,0,0,118,97,108,117,101,32,101,120,112,101,99,116,101,100,0,0,115,116,97,99,107,32,111,118,101,114,102,108,111,119,0,0,98,97,115,101,32,111,117,116,32,111,102,32,114,97,110,103,101,0,0,0,0,0,0,0,32,12,10,13,9,11,0,0,110,105,108,32,111,114,32,116,97,98,108,101,32,101,120,112,101,99,116,101,100,0,0,0,95,95,109,101,116,97,116,97,98,108,101,0,0,0,0,0,99,97,110,110,111,116,32,99,104,97,110,103,101,32,97,32,112,114,111,116,101,99,116,101,100,32,109,101,116,97,116,97,98,108,101,0,0,0,0,0,105,110,100,101,120,32,111,117,116,32,111,102,32,114,97,110,103,101,0,0,0,0,0,0,116,97,98,108,101,32,111,114,32,115,116,114,105,110,103,32,101,120,112,101,99,116,101,100,0,0,0,0,0,0,0,0,39,116,111,115,116,114,105,110,103,39,32,109,117,115,116,32,114,101,116,117,114,110,32,97,32,115,116,114,105,110,103,32,116,111,32,39,112,114,105,110,116,39,0,0,0,0,0,0,95,95,112,97,105,114,115,0,98,116,0,0,0,0,0,0,61,40,108,111,97,100,41,0,116,111,111,32,109,97,110,121,32,110,101,115,116,101,100,32,102,117,110,99,116,105,111,110,115,0,0,0,0,0,0,0,114,101,97,100,101,114,32,102,117,110,99,116,105,111,110,32,109,117,115,116,32,114,101,116,117,114,110,32,97,32,115,116,114,105,110,103,0,0,0,0,95,95,105,112,97,105,114,115,0,0,0,0,0,0,0,0,184,35,0,0,192,35,0,0,200,35,0,0,208,35,0,0,216,35,0,0,224,35,0,0,240,35,0,0,0,36,0,0,16,36,0,0,32,36,0,0,48,36,0,0,0,0,0,0,115,116,111,112,0,0,0,0,114,101,115,116,97,114,116,0,99,111,108,108,101,99,116,0,99,111,117,110,116,0,0,0,115,116,101,112,0,0,0,0,115,101,116,112,97,117,115,101,0,0,0,0,0,0,0,0,115,101,116,115,116,101,112,109,117,108,0,0,0,0,0,0,115,101,116,109,97,106,111,114,105,110,99,0,0,0,0,0,105,115,114,117,110,110,105,110,103,0,0,0,0,0,0,0,103,101,110,101,114,97,116,105,111,110,97,108,0,0,0,0,105,110,99,114,101,109,101,110,116,97,108,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,3,0,0,0,5,0,0,0,6,0,0,0,7,0,0,0,8,0,0,0,9,0,0,0,10,0,0,0,11,0,0,0,0,0,0,0,37,115,0,0,0,0,0,0,97,115,115,101,114,116,105,111,110,32,102,97,105,108,101,100,33,0,0,0,0,0,0,0,248,36,0,0,107,0,0,0,0,37,0,0,108,0,0,0,8,37,0,0,109,0,0,0,16,37,0,0,110,0,0,0,24,37,0,0,111,0,0,0,32,37,0,0,112,0,0,0,40,37,0,0,113,0,0,0,48,37,0,0,114,0,0,0,56,37,0,0,115,0,0,0,64,37,0,0,116,0,0,0,72,37,0,0,117,0,0,0,80,37,0,0,118,0,0,0,0,0,0,0,0,0,0,0,97,114,115,104,105,102,116,0,98,97,110,100,0,0,0,0,98,110,111,116,0,0,0,0,98,111,114,0,0,0,0,0,98,120,111,114,0,0,0,0,98,116,101,115,116,0,0,0,101,120,116,114,97,99,116,0,108,114,111,116,97,116,101,0,108,115,104,105,102,116,0,0,114,101,112,108,97,99,101,0,114,114,111,116,97,116,101,0,114,115,104,105,102,116,0,0,102,105,101,108,100,32,99,97,110,110,111,116,32,98,101,32,110,101,103,97,116,105,118,101,0,0,0,0,0,0,0,0,119,105,100,116,104,32,109,117,115,116,32,98,101,32,112,111,115,105,116,105,118,101,0,0,116,114,121,105,110,103,32,116,111,32,97,99,99,101,115,115,32,110,111,110,45,101,120,105,115,116,101,110,116,32,98,105,116,115,0,0,0,0,0,0,102,117,110,99,116,105,111,110,32,111,114,32,101,120,112,114,101,115,115,105,111,110,32,116,111,111,32,99,111,109,112,108,101,120,0,0,0,0,0,0,99,111,110,115,116,114,117,99,116,111,114,32,116,111,111,32,108,111,110,103,0,0,0,0,99,111,110,115,116,97,110,116,115,0,0,0,0,0,0,0,111,112,99,111,100,101,115,0,99,111,110,116,114,111,108,32,115,116,114,117,99,116,117,114,101,32,116,111,111,32,108,111,110,103,0,0,0,0,0,0,104,38,0,0,119,0,0,0,112,38,0,0,120,0,0,0,120,38,0,0,121,0,0,0,128,38,0,0,122,0,0,0,136,38,0,0,123,0,0,0,144,38,0,0,124,0,0,0,0,0,0,0,0,0,0,0,99,114,101,97,116,101,0,0,114,101,115,117,109,101,0,0,114,117,110,110,105,110,103,0,115,116,97,116,117,115,0,0,119,114,97,112,0,0,0,0,121,105,101,108,100,0,0,0,116,111,111,32,109,97,110,121,32,97,114,103,117,109,101,110,116,115,32,116,111,32,114,101,115,117,109,101,0,0,0,0,99,97,110,110,111,116,32,114,101,115,117,109,101,32,100,101,97,100,32,99,111,114,111,117,116,105,110,101,0,0,0,0,116,111,111,32,109,97,110,121,32,114,101,115,117,108,116,115,32,116,111,32,114,101,115,117,109,101,0,0,0,0,0,0,99,111,114,111,117,116,105,110,101,32,101,120,112,101,99,116,101,100,0,0,0,0,0,0,115,117,115,112,101,110,100,101,100,0,0,0,0,0,0,0,110,111,114,109,97,108,0,0,100,101,97,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,8,8,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,22,22,22,22,22,22,22,22,22,22,4,4,4,4,4,4,4,21,21,21,21,21,21,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,5,4,21,21,21,21,21,21,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);
/* memory initializer */ allocate([192,40,0,0,125,0,0,0,200,40,0,0,126,0,0,0,216,40,0,0,127,0,0,0,224,40,0,0,128,0,0,0,232,40,0,0,129,0,0,0,248,40,0,0,130,0,0,0,8,41,0,0,131,0,0,0,24,41,0,0,132,0,0,0,40,41,0,0,133,0,0,0,56,41,0,0,134,0,0,0,72,41,0,0,135,0,0,0,88,41,0,0,136,0,0,0,96,41,0,0,137,0,0,0,112,41,0,0,138,0,0,0,128,41,0,0,139,0,0,0,144,41,0,0,140,0,0,0,0,0,0,0,0,0,0,0,100,101,98,117,103,0,0,0,103,101,116,117,115,101,114,118,97,108,117,101,0,0,0,0,103,101,116,104,111,111,107,0,103,101,116,105,110,102,111,0,103,101,116,108,111,99,97,108,0,0,0,0,0,0,0,0,103,101,116,114,101,103,105,115,116,114,121,0,0,0,0,0,103,101,116,109,101,116,97,116,97,98,108,101,0,0,0,0,103,101,116,117,112,118,97,108,117,101,0,0,0,0,0,0,117,112,118,97,108,117,101,106,111,105,110,0,0,0,0,0,117,112,118,97,108,117,101,105,100,0,0,0,0,0,0,0,115,101,116,117,115,101,114,118,97,108,117,101,0,0,0,0,115,101,116,104,111,111,107,0,115,101,116,108,111,99,97,108,0,0,0,0,0,0,0,0,115,101,116,109,101,116,97,116,97,98,108,101,0,0,0,0,115,101,116,117,112,118,97,108,117,101,0,0,0,0,0,0,116,114,97,99,101,98,97,99,107,0,0,0,0,0,0,0,110,105,108,32,111,114,32,116,97,98,108,101,32,101,120,112,101,99,116,101,100,0,0,0,108,101,118,101,108,32,111,117,116,32,111,102,32,114,97,110,103,101,0,0,0,0,0,0,95,72,75,69,89,0,0,0,107,0,0,0,0,0,0,0,95,95,109,111,100,101,0,0,0,42,0,0,8,42,0,0,16,42,0,0,24,42,0,0,32,42,0,0,0,0,0,0,99,97,108,108,0,0,0,0,114,101,116,117,114,110,0,0,108,105,110,101,0,0,0,0,99,111,117,110,116,0,0,0,116,97,105,108,32,99,97,108,108,0,0,0,0,0,0,0,102,117,108,108,32,117,115,101,114,100,97,116,97,32,101,120,112,101,99,116,101,100,44,32,103,111,116,32,108,105,103,104,116,32,117,115,101,114,100,97,116,97,0,0,0,0,0,0,62,117,0,0,0,0,0,0,105,110,118,97,108,105,100,32,117,112,118,97,108,117,101,32,105,110,100,101,120,0,0,0,76,117,97,32,102,117,110,99,116,105,111,110,32,101,120,112,101,99,116,101,100,0,0,0,102,108,110,83,116,117,0,0,62,37,115,0,0,0,0,0,102,117,110,99,116,105,111,110,32,111,114,32,108,101,118,101,108,32,101,120,112,101,99,116,101,100,0,0,0,0,0,0,105,110,118,97,108,105,100,32,111,112,116,105,111,110,0,0,115,111,117,114,99,101,0,0,115,104,111,114,116,95,115,114,99,0,0,0,0,0,0,0,108,105,110,101,100,101,102,105,110,101,100,0,0,0,0,0,108,97,115,116,108,105,110,101,100,101,102,105,110,101,100,0,119,104,97,116,0,0,0,0,99,117,114,114,101,110,116,108,105,110,101,0,0,0,0,0,110,117,112,115,0,0,0,0,110,112,97,114,97,109,115,0,105,115,118,97,114,97,114,103,0,0,0,0,0,0,0,0,110,97,109,101,0,0,0,0,110,97,109,101,119,104,97,116,0,0,0,0,0,0,0,0,105,115,116,97,105,108,99,97,108,108,0,0,0,0,0,0,97,99,116,105,118,101,108,105,110,101,115,0,0,0,0,0,102,117,110,99,0,0,0,0,101,120,116,101,114,110,97,108,32,104,111,111,107,0,0,0,108,117,97,95,100,101,98,117,103,62,32,0,0,0,0,0,99,111,110,116,10,0,0,0,61,40,100,101,98,117,103,32,99,111,109,109,97,110,100,41,0,0,0,0,0,0,0,0,37,115,10,0,0,0,0,0,224,45,0,0,232,45,0,0,240,45,0,0,248,45,0,0,0,46,0,0,8,46,0,0,16,46,0,0,24,46,0,0,32,46,0,0,48,46,0,0,56,46,0,0,64,46,0,0,72,46,0,0,80,46,0,0,88,46,0,0,96,46,0,0,104,46,0,0,112,46,0,0,120,46,0,0,128,46,0,0,136,46,0,0,144,46,0,0,152,46,0,0,160,46,0,0,168,46,0,0,176,46,0,0,184,46,0,0,192,46,0,0,200,46,0,0,208,46,0,0,216,46,0,0,232,46,0,0,240,46,0,0,0,0,0,0,39,37,99,39,0,0,0,0,99,104,97,114,40,37,100,41,0,0,0,0,0,0,0,0,39,37,115,39,0,0,0,0,95,69,78,86,0,0,0,0,105,110,118,97,108,105,100,32,108,111,110,103,32,115,116,114,105,110,103,32,100,101,108,105,109,105,116,101,114,0,0,0,46,0,0,0,0,0,0,0,69,101,0,0,0,0,0,0,88,120,0,0,0,0,0,0,80,112,0,0,0,0,0,0,43,45,0,0,0,0,0,0,109,97,108,102,111,114,109,101,100,32,110,117,109,98,101,114,0,0,0,0,0,0,0,0,108,101,120,105,99,97,108,32,101,108,101,109,101,110,116,32,116,111,111,32,108,111,110,103,0,0,0,0,0,0,0,0,117,110,102,105,110,105,115,104,101,100,32,115,116,114,105,110,103,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,101,115,99,97,112,101,32,115,101,113,117,101,110,99,101,0,100,101,99,105,109,97,108,32,101,115,99,97,112,101,32,116,111,111,32,108,97,114,103,101,0,0,0,0,0,0,0,0,104,101,120,97,100,101,99,105,109,97,108,32,100,105,103,105,116,32,101,120,112,101,99,116,101,100,0,0,0,0,0,0,117,110,102,105,110,105,115,104,101,100,32,108,111,110,103,32,115,116,114,105,110,103,0,0,117,110,102,105,110,105,115,104,101,100,32,108,111,110,103,32,99,111,109,109,101,110,116,0,99,104,117,110,107,32,104,97,115,32,116,111,111,32,109,97,110,121,32,108,105,110,101,115,0,0,0,0,0,0,0,0,37,115,58,37,100,58,32,37,115,0,0,0,0,0,0,0,37,115,32,110,101,97,114,32,37,115,0,0,0,0,0,0,97,110,100,0,0,0,0,0,98,114,101,97,107,0,0,0,100,111,0,0,0,0,0,0,101,108,115,101,0,0,0,0,101,108,115,101,105,102,0,0,101,110,100,0,0,0,0,0,102,97,108,115,101,0,0,0,102,111,114,0,0,0,0,0,102,117,110,99,116,105,111,110,0,0,0,0,0,0,0,0,103,111,116,111,0,0,0,0,105,102,0,0,0,0,0,0,105,110,0,0,0,0,0,0,108,111,99,97,108,0,0,0,110,105,108,0,0,0,0,0,110,111,116,0,0,0,0,0,111,114,0,0,0,0,0,0,114,101,112,101,97,116,0,0,114,101,116,117,114,110,0,0,116,104,101,110,0,0,0,0,116,114,117,101,0,0,0,0,117,110,116,105,108,0,0,0,119,104,105,108,101,0,0,0,46,46,0,0,0,0,0,0,46,46,46,0,0,0,0,0,61,61,0,0,0,0,0,0,62,61,0,0,0,0,0,0,60,61,0,0,0,0,0,0,126,61,0,0,0,0,0,0,58,58,0,0,0,0,0,0,60,101,111,102,62,0,0,0,60,110,117,109,98,101,114,62,0,0,0,0,0,0,0,0,60,110,97,109,101,62,0,0,60,115,116,114,105,110,103,62,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,105,110,102,105,110,105,116,121,0,0,0,0,0,0,0,0,110,97,110,0,0,0,0,0,95,112,137,0,255,9,47,15,10,0,0,0,100,0,0,0,232,3,0,0,16,39,0,0,160,134,1,0,64,66,15,0,128,150,152,0,0,225,245,5], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE+10288);




var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}


  function _llvm_lifetime_end() {}

  
   
  Module["_rand_r"] = _rand_r;
  
  var ___rand_seed=allocate([0x0273459b, 0, 0, 0], "i32", ALLOC_STATIC); 
  Module["_rand"] = _rand;

  
   
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i32=_memset;

  
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value;
      return value;
    }
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  
  var MEMFS={ops_table:null,CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.contents = [];
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },ensureFlexible:function (node) {
        if (node.contentMode !== MEMFS.CONTENT_FLEXIBLE) {
          var contents = node.contents;
          node.contents = Array.prototype.slice.call(contents);
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        }
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.contents.length;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.ensureFlexible(node);
            var contents = node.contents;
            if (attr.size < contents.length) contents.length = attr.size;
            else while (attr.size > contents.length) contents.push(0);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          var node = stream.node;
          node.timestamp = Date.now();
          var contents = node.contents;
          if (length && contents.length === 0 && position === 0 && buffer.subarray) {
            // just replace it with the new data
            if (canOwn && offset === 0) {
              node.contents = buffer; // this could be a subarray of Emscripten HEAP, or allocated from some other source.
              node.contentMode = (buffer.buffer === HEAP8.buffer) ? MEMFS.CONTENT_OWNING : MEMFS.CONTENT_FIXED;
            } else {
              node.contents = new Uint8Array(buffer.subarray(offset, offset+length));
              node.contentMode = MEMFS.CONTENT_FIXED;
            }
            return length;
          }
          MEMFS.ensureFlexible(node);
          var contents = node.contents;
          while (contents.length < position) contents.push(0);
          for (var i = 0; i < length; i++) {
            contents[position + i] = buffer[offset + i];
          }
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.contents.length;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.ensureFlexible(stream.node);
          var contents = stream.node.contents;
          var limit = offset + length;
          while (limit > contents.length) contents.push(0);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          fileStore.createIndex('timestamp', 'timestamp', { unique: false });
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function() {
          callback(this.error);
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function() { callback(this.error); };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          var index = store.index('timestamp');
  
          index.openKeyCursor().onsuccess = function(event) {
            var cursor = event.target.result;
  
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, entries: entries });
            }
  
            entries[cursor.primaryKey] = { timestamp: cursor.key };
  
            cursor.continue();
          };
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { encoding: 'binary', canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function() { callback(this.error); };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function() { callback(this.error); };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function() { done(this.error); };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
      },mount:function (mount) {
      },createNode:function (parent, name, mode, dev) {
      },getMode:function (path) {
      },realPath:function (node) {
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
        },setattr:function (node, attr) {
        },lookup:function (parent, name) {
        },mknod:function (parent, name, mode, dev) {
        },rename:function (oldNode, newDir, newName) {
        },unlink:function (parent, name) {
        },rmdir:function (parent, name) {
        },readdir:function (node) {
        },symlink:function (parent, newName, oldPath) {
        },readlink:function (node) {
        }},stream_ops:{open:function (stream) {
        },close:function (stream) {
        },read:function (stream, buffer, offset, length, position) {
        },write:function (stream, buffer, offset, length, position) {
        },llseek:function (stream, offset, whence) {
        }}};
  
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        return FS.nodePermissions(dir, 'x');
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        if (stream.__proto__) {
          // reuse the object
          stream.__proto__ = FS.FSStream.prototype;
        } else {
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
        }
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },getStreamFromPtr:function (ptr) {
        return FS.streams[ptr - 1];
      },getPtrForStream:function (stream) {
        return stream ? stream.fd + 1 : 0;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            callback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0, opts.canOwn);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0, opts.canOwn);
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=FS.getPtrForStream(stdin);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=FS.getPtrForStream(stdout);
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=FS.getPtrForStream(stderr);
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno) {
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
          this.message = ERRNO_MESSAGES[errno];
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
  
              if (!hasByteServing) chunkSize = datalength;
  
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
  
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
  
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
  
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};
  
  function _lseek(fildes, offset, whence) {
      // off_t lseek(int fildes, off_t offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/lseek.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        return FS.llseek(stream, offset, whence);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  
  function _fileno(stream) {
      // int fileno(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fileno.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) return -1;
      return stream.fd;
    }function _fseek(stream, offset, whence) {
      // int fseek(FILE *stream, long offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fseek.html
      var fd = _fileno(stream);
      var ret = _lseek(fd, offset, whence);
      if (ret == -1) {
        return -1;
      }
      stream = FS.getStreamFromPtr(stream);
      stream.eof = false;
      return 0;
    }

   
  Module["_i64Subtract"] = _i64Subtract;

   
  Module["_i64Add"] = _i64Add;

  function _setlocale(category, locale) {
      if (!_setlocale.ret) _setlocale.ret = allocate([0], 'i8', ALLOC_NORMAL);
      return _setlocale.ret;
    }

  
  function _close(fildes) {
      // int close(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/close.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        FS.close(stream);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  
  function _fsync(fildes) {
      // int fsync(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fsync.html
      var stream = FS.getStream(fildes);
      if (stream) {
        // We write directly to the file system, so there's nothing to do here.
        return 0;
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }function _fclose(stream) {
      // int fclose(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fclose.html
      var fd = _fileno(stream);
      _fsync(fd);
      return _close(fd);
    }

  function _modf(x, intpart) {
      HEAPF64[((intpart)>>3)]=Math.floor(x);
      return x - HEAPF64[((intpart)>>3)];
    }

  function _toupper(chr) {
      if (chr >= 97 && chr <= 122) {
        return chr - 97 + 65;
      } else {
        return chr;
      }
    }

  
  
  
  
  
  
  function _mkport() { throw 'TODO' }var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
  
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
  
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              var url = 'ws://' + addr + ':' + port;
              // the node ws library API is slightly different than the browser's
              var opts = ENVIRONMENT_IS_NODE ? {headers: {'websocket-protocol': ['binary']}} : ['binary'];
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? null : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
  
  
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
  
          var handleOpen = function () {
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
  
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
          };
  
          if (ENVIRONMENT_IS_NODE) {
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        }}};function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var fd = _fileno(stream);
      var bytesWritten = _write(fd, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  
  
   
  Module["_strlen"] = _strlen;
  
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = (HEAP32[((tempDoublePtr)>>2)]=HEAP32[(((varargs)+(argIndex))>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((varargs)+((argIndex)+(4)))>>2)],(+(HEAPF64[(tempDoublePtr)>>3])));
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+4))>>2)]];
  
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Runtime.getNativeFieldSize(type);
        return ret;
      }
  
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
  
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
  
          // Handle precision.
          var precisionSet = false, precision = -1;
          if (next == 46) {
            precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          }
          if (precision < 0) {
            precision = 6; // Standard default.
            precisionSet = false;
          }
  
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
  
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
  
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
  
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
  
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
  
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
  
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
  
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
  
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
  
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
  
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
  
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
  
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
  
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length;
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }function _printf(format, varargs) {
      // int printf(const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var stdout = HEAP32[((_stdout)>>2)];
      return _fprintf(stdout, format, varargs);
    }


  
  function _open(path, oflag, varargs) {
      // int open(const char *path, int oflag, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/open.html
      var mode = HEAP32[((varargs)>>2)];
      path = Pointer_stringify(path);
      try {
        var stream = FS.open(path, oflag, mode);
        return stream.fd;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fopen(filename, mode) {
      // FILE *fopen(const char *restrict filename, const char *restrict mode);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fopen.html
      var flags;
      mode = Pointer_stringify(mode);
      if (mode[0] == 'r') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 0;
        }
      } else if (mode[0] == 'w') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 512;
      } else if (mode[0] == 'a') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 1024;
      } else {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return 0;
      }
      var fd = _open(filename, flags, allocate([0x1FF, 0, 0, 0], 'i32', ALLOC_STACK));  // All creation permissions.
      return fd === -1 ? 0 : FS.getPtrForStream(FS.getStream(fd));
    }

  var _emscripten_check_longjmp=true;

  function _fputc(c, stream) {
      // int fputc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputc.html
      var chr = unSign(c & 0xFF);
      HEAP8[((_fputc.ret)|0)]=chr;
      var fd = _fileno(stream);
      var ret = _write(fd, _fputc.ret, 1);
      if (ret == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return -1;
      } else {
        return chr;
      }
    }

  var _log=Math_log;

  var _emscripten_postinvoke=true;

  
  function _putchar(c) {
      // int putchar(int c);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/putchar.html
      return _fputc(c, HEAP32[((_stdout)>>2)]);
    } 
  Module["_saveSetjmp"] = _saveSetjmp;


  function _system(command) {
      // int system(const char *command);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/system.html
      // Can't call external programs.
      ___setErrNo(ERRNO_CODES.EAGAIN);
      return -1;
    }

  function _frexp(x, exp_addr) {
      var sig = 0, exp_ = 0;
      if (x !== 0) {
        var sign = 1;
        if (x < 0) {
          x = -x;
          sign = -1;
        }
        var raw_exp = Math.log(x)/Math.log(2);
        exp_ = Math.ceil(raw_exp);
        if (exp_ === raw_exp) exp_ += 1;
        sig = sign*x/Math.pow(2, exp_);
      }
      HEAP32[((exp_addr)>>2)]=exp_;
      return sig;
    }

  
  
  var _tzname=allocate(8, "i32*", ALLOC_STATIC);
  
  var _daylight=allocate(1, "i32*", ALLOC_STATIC);
  
  var _timezone=allocate(1, "i32*", ALLOC_STATIC);function _tzset() {
      // TODO: Use (malleable) environment variables instead of system settings.
      if (_tzset.called) return;
      _tzset.called = true;
  
      HEAP32[((_timezone)>>2)]=-(new Date()).getTimezoneOffset() * 60;
  
      var winter = new Date(2000, 0, 1);
      var summer = new Date(2000, 6, 1);
      HEAP32[((_daylight)>>2)]=Number(winter.getTimezoneOffset() != summer.getTimezoneOffset());
  
      var winterName = 'GMT'; // XXX do not rely on browser timezone info, it is very unpredictable | winter.toString().match(/\(([A-Z]+)\)/)[1];
      var summerName = 'GMT'; // XXX do not rely on browser timezone info, it is very unpredictable | summer.toString().match(/\(([A-Z]+)\)/)[1];
      var winterNamePtr = allocate(intArrayFromString(winterName), 'i8', ALLOC_NORMAL);
      var summerNamePtr = allocate(intArrayFromString(summerName), 'i8', ALLOC_NORMAL);
      HEAP32[((_tzname)>>2)]=winterNamePtr;
      HEAP32[(((_tzname)+(4))>>2)]=summerNamePtr;
    }function _mktime(tmPtr) {
      _tzset();
      var year = HEAP32[(((tmPtr)+(20))>>2)];
      var timestamp = new Date(year >= 1900 ? year : year + 1900,
                               HEAP32[(((tmPtr)+(16))>>2)],
                               HEAP32[(((tmPtr)+(12))>>2)],
                               HEAP32[(((tmPtr)+(8))>>2)],
                               HEAP32[(((tmPtr)+(4))>>2)],
                               HEAP32[((tmPtr)>>2)],
                               0).getTime() / 1000;
      HEAP32[(((tmPtr)+(24))>>2)]=new Date(timestamp).getDay();
      var yday = Math.round((timestamp - (new Date(year, 0, 1)).getTime()) / (1000 * 60 * 60 * 24));
      HEAP32[(((tmPtr)+(28))>>2)]=yday;
      return timestamp;
    }

  function _isalpha(chr) {
      return (chr >= 97 && chr <= 122) ||
             (chr >= 65 && chr <= 90);
    }

  
  function _malloc(bytes) {
      /* Over-allocate to make sure it is byte-aligned by 8.
       * This will leak memory, but this is only the dummy
       * implementation (replaced by dlmalloc normally) so
       * not an issue.
       */
      var ptr = Runtime.dynamicAlloc(bytes + 8);
      return (ptr+8) & 0xFFFFFFF8;
    }
  Module["_malloc"] = _malloc;function _tmpnam(s, dir, prefix) {
      // char *tmpnam(char *s);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/tmpnam.html
      // NOTE: The dir and prefix arguments are for internal use only.
      var folder = FS.findObject(dir || '/tmp');
      if (!folder || !folder.isFolder) {
        dir = '/tmp';
        folder = FS.findObject(dir);
        if (!folder || !folder.isFolder) return 0;
      }
      var name = prefix || 'file';
      do {
        name += String.fromCharCode(65 + Math.floor(Math.random() * 25));
      } while (name in folder.contents);
      var result = dir + '/' + name;
      if (!_tmpnam.buffer) _tmpnam.buffer = _malloc(256);
      if (!s) s = _tmpnam.buffer;
      writeAsciiToMemory(result, s);
      return s;
    }

  var Browser={mainLoop:{scheduler:null,method:"",shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        
        // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
        // Module['forcedAspectRatio'] = 4 / 3;
        
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'] ||
                                    canvas['msRequestPointerLock'] ||
                                    function(){};
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 document['msExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas ||
                                document['msPointerLockElement'] === canvas;
        }
  
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
        document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        var errorInfo = '?';
        function onContextCreationError(event) {
          errorInfo = event.statusMessage || errorInfo;
        }
        try {
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false
            };
  
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
  
  
            canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
            try {
              ['experimental-webgl', 'webgl'].some(function(webglId) {
                return ctx = canvas.getContext(webglId, contextAttributes);
              });
            } finally {
              canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
            }
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas: ' + [errorInfo, e]);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
  
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          GLctx = Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        var canvasContainer = canvas.parentNode;
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement'] ||
               document['msFullScreenElement'] || document['msFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'] ||
                                      document['msExitFullscreen'] ||
                                      document['exitFullscreen'] ||
                                      function() {};
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else {
            
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            var canvasContainer = canvas.parentNode;
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
            
            if (Browser.resizeCanvas) Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
          Browser.updateCanvasDimensions(canvas);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
          document.addEventListener('MSFullscreenChange', fullScreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
        
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullScreen = canvasContainer['requestFullScreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullScreen'] ? function() { canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvasContainer.requestFullScreen();
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          setTimeout(func, 1000/60);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           window['setTimeout'];
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },getMouseWheelDelta:function (event) {
        return Math.max(-1, Math.min(1, event.type === 'DOMMouseScroll' ? event.detail : -event.wheelDelta));
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x, y;
          
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          if (event.type == 'touchstart' ||
              event.type == 'touchend' ||
              event.type == 'touchmove') {
            var t = event.touches.item(0);
            if (t) {
              x = t.pageX - (scrollX + rect.left);
              y = t.pageY - (scrollY + rect.top);
            } else {
              return;
            }
          } else {
            x = event.pageX - (scrollX + rect.left);
            y = event.pageY - (scrollY + rect.top);
          }
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },updateCanvasDimensions:function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
             document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
             document['fullScreenElement'] || document['fullscreenElement'] ||
             document['msFullScreenElement'] || document['msFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      }};

  function _log10(x) {
      return Math.log(x) / Math.LN10;
    }

  function _isspace(chr) {
      return (chr == 32) || (chr >= 9 && chr <= 13);
    }

  
  var ___tm_current=allocate(44, "i8", ALLOC_STATIC);
  
  
  var ___tm_timezone=allocate(intArrayFromString("GMT"), "i8", ALLOC_STATIC);function _localtime_r(time, tmPtr) {
      _tzset();
      var date = new Date(HEAP32[((time)>>2)]*1000);
      HEAP32[((tmPtr)>>2)]=date.getSeconds();
      HEAP32[(((tmPtr)+(4))>>2)]=date.getMinutes();
      HEAP32[(((tmPtr)+(8))>>2)]=date.getHours();
      HEAP32[(((tmPtr)+(12))>>2)]=date.getDate();
      HEAP32[(((tmPtr)+(16))>>2)]=date.getMonth();
      HEAP32[(((tmPtr)+(20))>>2)]=date.getFullYear()-1900;
      HEAP32[(((tmPtr)+(24))>>2)]=date.getDay();
  
      var start = new Date(date.getFullYear(), 0, 1);
      var yday = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      HEAP32[(((tmPtr)+(28))>>2)]=yday;
      HEAP32[(((tmPtr)+(36))>>2)]=start.getTimezoneOffset() * 60;
  
      var dst = Number(start.getTimezoneOffset() != date.getTimezoneOffset());
      HEAP32[(((tmPtr)+(32))>>2)]=dst;
  
      HEAP32[(((tmPtr)+(40))>>2)]=___tm_timezone;
  
      return tmPtr;
    }function _localtime(time) {
      return _localtime_r(time, ___tm_current);
    }

  
  
  function _recv(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _read(fd, buf, len);
    }
  
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fread(ptr, size, nitems, stream) {
      // size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fread.html
      var bytesToRead = nitems * size;
      if (bytesToRead == 0) {
        return 0;
      }
      var bytesRead = 0;
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return 0;
      }
      while (streamObj.ungotten.length && bytesToRead > 0) {
        HEAP8[((ptr++)|0)]=streamObj.ungotten.pop();
        bytesToRead--;
        bytesRead++;
      }
      var err = _read(streamObj.fd, ptr, bytesToRead);
      if (err == -1) {
        if (streamObj) streamObj.error = true;
        return 0;
      }
      bytesRead += err;
      if (bytesRead < bytesToRead) streamObj.eof = true;
      return Math.floor(bytesRead / size);
    }

  var _emscripten_prep_setjmp=true;

  
  
   
  Module["_testSetjmp"] = _testSetjmp;function _longjmp(env, value) {
      asm['setThrew'](env, value || 1);
      throw 'longjmp';
    }function _emscripten_longjmp(env, value) {
      _longjmp(env, value);
    }

  var _ceil=Math_ceil;

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 
  Module["_memcpy"] = _memcpy;

  function _strstr(ptr1, ptr2) {
      var check = 0, start;
      do {
        if (!check) {
          start = ptr1;
          check = ptr2;
        }
        var curr1 = HEAP8[((ptr1++)|0)];
        var curr2 = HEAP8[((check++)|0)];
        if (curr2 == 0) return start;
        if (curr2 != curr1) {
          // rewind to one character after start, to find ez in eeez
          ptr1 = start + 1;
          check = 0;
        }
      } while (curr1);
      return 0;
    }

  var _llvm_pow_f64=Math_pow;

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }

  
  function _sinh(x) {
      var p = Math.pow(Math.E, x);
      return (p - (1 / p)) / 2;
    }
  
  function _cosh(x) {
      var p = Math.pow(Math.E, x);
      return (p + (1 / p)) / 2;
    }function _tanh(x) {
      return _sinh(x) / _cosh(x);
    }

  function _localeconv() {
      // %struct.timeval = type { char* decimal point, other stuff... }
      // var indexes = Runtime.calculateStructAlignment({ fields: ['i32', 'i32'] });
      var me = _localeconv;
      if (!me.ret) {
      // These are defaults from the "C" locale
        me.ret = allocate([
          allocate(intArrayFromString('.'), 'i8', ALLOC_NORMAL),0,0,0, // decimal_point
          allocate(intArrayFromString(''), 'i8', ALLOC_NORMAL),0,0,0, // thousands_sep
          allocate(intArrayFromString(''), 'i8', ALLOC_NORMAL),0,0,0, // grouping
          allocate(intArrayFromString(''), 'i8', ALLOC_NORMAL),0,0,0, // int_curr_symbol
          allocate(intArrayFromString(''), 'i8', ALLOC_NORMAL),0,0,0, // currency_symbol
          allocate(intArrayFromString(''), 'i8', ALLOC_NORMAL),0,0,0, // mon_decimal_point
          allocate(intArrayFromString(''), 'i8', ALLOC_NORMAL),0,0,0, // mon_thousands_sep
          allocate(intArrayFromString(''), 'i8', ALLOC_NORMAL),0,0,0, // mon_grouping
          allocate(intArrayFromString(''), 'i8', ALLOC_NORMAL),0,0,0, // positive_sign
          allocate(intArrayFromString(''), 'i8', ALLOC_NORMAL),0,0,0 // negative_sign
        ], 'i8*', ALLOC_NORMAL); // Allocate strings in lconv, still don't allocate chars
      }
      return me.ret;
    }

  
  
  function __getFloat(text) {
      return /^[+-]?[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?/.exec(text);
    }function __scanString(format, get, unget, varargs) {
      if (!__scanString.whiteSpace) {
        __scanString.whiteSpace = {};
        __scanString.whiteSpace[32] = 1;
        __scanString.whiteSpace[9] = 1;
        __scanString.whiteSpace[10] = 1;
        __scanString.whiteSpace[11] = 1;
        __scanString.whiteSpace[12] = 1;
        __scanString.whiteSpace[13] = 1;
      }
      // Supports %x, %4x, %d.%d, %lld, %s, %f, %lf.
      // TODO: Support all format specifiers.
      format = Pointer_stringify(format);
      var soFar = 0;
      if (format.indexOf('%n') >= 0) {
        // need to track soFar
        var _get = get;
        get = function get() {
          soFar++;
          return _get();
        }
        var _unget = unget;
        unget = function unget() {
          soFar--;
          return _unget();
        }
      }
      var formatIndex = 0;
      var argsi = 0;
      var fields = 0;
      var argIndex = 0;
      var next;
  
      mainLoop:
      for (var formatIndex = 0; formatIndex < format.length;) {
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'n') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          HEAP32[((argPtr)>>2)]=soFar;
          formatIndex += 2;
          continue;
        }
  
        if (format[formatIndex] === '%') {
          var nextC = format.indexOf('c', formatIndex+1);
          if (nextC > 0) {
            var maxx = 1;
            if (nextC > formatIndex+1) {
              var sub = format.substring(formatIndex+1, nextC);
              maxx = parseInt(sub);
              if (maxx != sub) maxx = 0;
            }
            if (maxx) {
              var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
              argIndex += Runtime.getAlignSize('void*', null, true);
              fields++;
              for (var i = 0; i < maxx; i++) {
                next = get();
                HEAP8[((argPtr++)|0)]=next;
                if (next === 0) return i > 0 ? fields : fields-1; // we failed to read the full length of this field
              }
              formatIndex += nextC - formatIndex + 1;
              continue;
            }
          }
        }
  
        // handle %[...]
        if (format[formatIndex] === '%' && format.indexOf('[', formatIndex+1) > 0) {
          var match = /\%([0-9]*)\[(\^)?(\]?[^\]]*)\]/.exec(format.substring(formatIndex));
          if (match) {
            var maxNumCharacters = parseInt(match[1]) || Infinity;
            var negateScanList = (match[2] === '^');
            var scanList = match[3];
  
            // expand "middle" dashs into character sets
            var middleDashMatch;
            while ((middleDashMatch = /([^\-])\-([^\-])/.exec(scanList))) {
              var rangeStartCharCode = middleDashMatch[1].charCodeAt(0);
              var rangeEndCharCode = middleDashMatch[2].charCodeAt(0);
              for (var expanded = ''; rangeStartCharCode <= rangeEndCharCode; expanded += String.fromCharCode(rangeStartCharCode++));
              scanList = scanList.replace(middleDashMatch[1] + '-' + middleDashMatch[2], expanded);
            }
  
            var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
            argIndex += Runtime.getAlignSize('void*', null, true);
            fields++;
  
            for (var i = 0; i < maxNumCharacters; i++) {
              next = get();
              if (negateScanList) {
                if (scanList.indexOf(String.fromCharCode(next)) < 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              } else {
                if (scanList.indexOf(String.fromCharCode(next)) >= 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              }
            }
  
            // write out null-terminating character
            HEAP8[((argPtr++)|0)]=0;
            formatIndex += match[0].length;
            
            continue;
          }
        }      
        // remove whitespace
        while (1) {
          next = get();
          if (next == 0) return fields;
          if (!(next in __scanString.whiteSpace)) break;
        }
        unget();
  
        if (format[formatIndex] === '%') {
          formatIndex++;
          var suppressAssignment = false;
          if (format[formatIndex] == '*') {
            suppressAssignment = true;
            formatIndex++;
          }
          var maxSpecifierStart = formatIndex;
          while (format[formatIndex].charCodeAt(0) >= 48 &&
                 format[formatIndex].charCodeAt(0) <= 57) {
            formatIndex++;
          }
          var max_;
          if (formatIndex != maxSpecifierStart) {
            max_ = parseInt(format.slice(maxSpecifierStart, formatIndex), 10);
          }
          var long_ = false;
          var half = false;
          var longLong = false;
          if (format[formatIndex] == 'l') {
            long_ = true;
            formatIndex++;
            if (format[formatIndex] == 'l') {
              longLong = true;
              formatIndex++;
            }
          } else if (format[formatIndex] == 'h') {
            half = true;
            formatIndex++;
          }
          var type = format[formatIndex];
          formatIndex++;
          var curr = 0;
          var buffer = [];
          // Read characters according to the format. floats are trickier, they may be in an unfloat state in the middle, then be a valid float later
          if (type == 'f' || type == 'e' || type == 'g' ||
              type == 'F' || type == 'E' || type == 'G') {
            next = get();
            while (next > 0 && (!(next in __scanString.whiteSpace)))  {
              buffer.push(String.fromCharCode(next));
              next = get();
            }
            var m = __getFloat(buffer.join(''));
            var last = m ? m[0].length : 0;
            for (var i = 0; i < buffer.length - last + 1; i++) {
              unget();
            }
            buffer.length = last;
          } else {
            next = get();
            var first = true;
            
            // Strip the optional 0x prefix for %x.
            if ((type == 'x' || type == 'X') && (next == 48)) {
              var peek = get();
              if (peek == 120 || peek == 88) {
                next = get();
              } else {
                unget();
              }
            }
            
            while ((curr < max_ || isNaN(max_)) && next > 0) {
              if (!(next in __scanString.whiteSpace) && // stop on whitespace
                  (type == 's' ||
                   ((type === 'd' || type == 'u' || type == 'i') && ((next >= 48 && next <= 57) ||
                                                                     (first && next == 45))) ||
                   ((type === 'x' || type === 'X') && (next >= 48 && next <= 57 ||
                                     next >= 97 && next <= 102 ||
                                     next >= 65 && next <= 70))) &&
                  (formatIndex >= format.length || next !== format[formatIndex].charCodeAt(0))) { // Stop when we read something that is coming up
                buffer.push(String.fromCharCode(next));
                next = get();
                curr++;
                first = false;
              } else {
                break;
              }
            }
            unget();
          }
          if (buffer.length === 0) return 0;  // Failure.
          if (suppressAssignment) continue;
  
          var text = buffer.join('');
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          switch (type) {
            case 'd': case 'u': case 'i':
              if (half) {
                HEAP16[((argPtr)>>1)]=parseInt(text, 10);
              } else if (longLong) {
                (tempI64 = [parseInt(text, 10)>>>0,(tempDouble=parseInt(text, 10),(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((argPtr)>>2)]=tempI64[0],HEAP32[(((argPtr)+(4))>>2)]=tempI64[1]);
              } else {
                HEAP32[((argPtr)>>2)]=parseInt(text, 10);
              }
              break;
            case 'X':
            case 'x':
              HEAP32[((argPtr)>>2)]=parseInt(text, 16);
              break;
            case 'F':
            case 'f':
            case 'E':
            case 'e':
            case 'G':
            case 'g':
            case 'E':
              // fallthrough intended
              if (long_) {
                HEAPF64[((argPtr)>>3)]=parseFloat(text);
              } else {
                HEAPF32[((argPtr)>>2)]=parseFloat(text);
              }
              break;
            case 's':
              var array = intArrayFromString(text);
              for (var j = 0; j < array.length; j++) {
                HEAP8[(((argPtr)+(j))|0)]=array[j];
              }
              break;
          }
          fields++;
        } else if (format[formatIndex].charCodeAt(0) in __scanString.whiteSpace) {
          next = get();
          while (next in __scanString.whiteSpace) {
            if (next <= 0) break mainLoop;  // End of input.
            next = get();
          }
          unget(next);
          formatIndex++;
        } else {
          // Not a specifier.
          next = get();
          if (format[formatIndex].charCodeAt(0) !== next) {
            unget(next);
            break mainLoop;
          }
          formatIndex++;
        }
      }
      return fields;
    }
  
  function _fgetc(stream) {
      // int fgetc(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgetc.html
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) return -1;
      if (streamObj.eof || streamObj.error) return -1;
      var ret = _fread(_fgetc.ret, 1, 1, stream);
      if (ret == 0) {
        return -1;
      } else if (ret == -1) {
        streamObj.error = true;
        return -1;
      } else {
        return HEAPU8[((_fgetc.ret)|0)];
      }
    }
  
  function _ungetc(c, stream) {
      // int ungetc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ungetc.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) {
        return -1;
      }
      if (c === -1) {
        // do nothing for EOF character
        return c;
      }
      c = unSign(c & 0xFF);
      stream.ungotten.push(c);
      stream.eof = false;
      return c;
    }function _fscanf(stream, format, varargs) {
      // int fscanf(FILE *restrict stream, const char *restrict format, ... );
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/scanf.html
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) {
        return -1;
      }
      var buffer = [];
      function get() {
        var c = _fgetc(stream);
        buffer.push(c);
        return c;
      };
      function unget() {
        _ungetc(buffer.pop(), stream);
      };
      return __scanString(format, get, unget, varargs);
    }

  var _emscripten_preinvoke=true;

  
  function _strerror_r(errnum, strerrbuf, buflen) {
      if (errnum in ERRNO_MESSAGES) {
        if (ERRNO_MESSAGES[errnum].length > buflen - 1) {
          return ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          var msg = ERRNO_MESSAGES[errnum];
          writeAsciiToMemory(msg, strerrbuf);
          return 0;
        }
      } else {
        return ___setErrNo(ERRNO_CODES.EINVAL);
      }
    }function _strerror(errnum) {
      if (!_strerror.buffer) _strerror.buffer = _malloc(256);
      _strerror_r(errnum, _strerror.buffer, 256);
      return _strerror.buffer;
    }

  
  function _unlink(path) {
      // int unlink(const char *path);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/unlink.html
      path = Pointer_stringify(path);
      try {
        FS.unlink(path);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  
  function _rmdir(path) {
      // int rmdir(const char *path);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/rmdir.html
      path = Pointer_stringify(path);
      try {
        FS.rmdir(path);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _remove(path) {
      // int remove(const char *path);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/remove.html
      var ret = _unlink(path);
      if (ret == -1) ret = _rmdir(path);
      return ret;
    }

  function _llvm_lifetime_start() {}

  function _abort() {
      Module['abort']();
    }

  function _strspn(pstr, pset) {
      var str = pstr, set, strcurr, setcurr;
      while (1) {
        strcurr = HEAP8[(str)];
        if (!strcurr) return str - pstr;
        set = pset;
        while (1) {
          setcurr = HEAP8[(set)];
          if (!setcurr || setcurr == strcurr) break;
          set++;
        }
        if (!setcurr) return str - pstr;
        str++;
      }
    }

  function _freopen(filename, mode, stream) {
      // FILE *freopen(const char *restrict filename, const char *restrict mode, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/freopen.html
      if (!filename) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (!streamObj) {
          ___setErrNo(ERRNO_CODES.EBADF);
          return 0;
        }
        if (_freopen.buffer) _free(_freopen.buffer);
        filename = intArrayFromString(streamObj.path);
        filename = allocate(filename, 'i8', ALLOC_NORMAL);
      }
      _fclose(stream);
      return _fopen(filename, mode);
    }


  function _memchr(ptr, chr, num) {
      chr = unSign(chr);
      for (var i = 0; i < num; i++) {
        if (HEAP8[(ptr)] == chr) return ptr;
        ptr++;
      }
      return 0;
    }

  function _rename(old_path, new_path) {
      // int rename(const char *old, const char *new);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/rename.html
      old_path = Pointer_stringify(old_path);
      new_path = Pointer_stringify(new_path);
      try {
        FS.rename(old_path, new_path);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }

  function _tmpfile() {
      // FILE *tmpfile(void);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/tmpfile.html
      // TODO: Delete the created file on closing.
      if (_tmpfile.mode) {
        _tmpfile.mode = allocate(intArrayFromString('w+'), 'i8', ALLOC_NORMAL);
      }
      return _fopen(_tmpnam(0), _tmpfile.mode);
    }

  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }


  function ___errno_location() {
      return ___errno_state;
    }



   
  Module["_bitshift64Shl"] = _bitshift64Shl;

  var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;


  function _fgets(s, n, stream) {
      // char *fgets(char *restrict s, int n, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgets.html
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) return 0;
      if (streamObj.error || streamObj.eof) return 0;
      var byte_;
      for (var i = 0; i < n - 1 && byte_ != 10; i++) {
        byte_ = _fgetc(stream);
        if (byte_ == -1) {
          if (streamObj.error || (streamObj.eof && i == 0)) return 0;
          else if (streamObj.eof) break;
        }
        HEAP8[(((s)+(i))|0)]=byte_;
      }
      HEAP8[(((s)+(i))|0)]=0;
      return s;
    }

  var _tan=Math_tan;

  function _ispunct(chr) {
      return (chr >= 33 && chr <= 47) ||
             (chr >= 58 && chr <= 64) ||
             (chr >= 91 && chr <= 96) ||
             (chr >= 123 && chr <= 126);
    }

  function _feof(stream) {
      // int feof(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/feof.html
      stream = FS.getStreamFromPtr(stream);
      return Number(stream && stream.eof);
    }

   
  Module["_tolower"] = _tolower;

  function _strchr(ptr, chr) {
      ptr--;
      do {
        ptr++;
        var val = HEAP8[(ptr)];
        if (val == chr) return ptr;
      } while (val);
      return 0;
    }

  var _asin=Math_asin;

  function _clearerr(stream) {
      // void clearerr(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/clearerr.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) {
        return;
      }
      stream.eof = false;
      stream.error = false;
    }

  var _fabs=Math_abs;

  function _clock() {
      if (_clock.start === undefined) _clock.start = Date.now();
      return Math.floor((Date.now() - _clock.start) * (1000000/1000));
    }


  var _getc=_fgetc;

  function _emscripten_exit_with_live_runtime() {
      Module['noExitRuntime'] = true;
      throw 'SimulateInfiniteLoop';
    }

  var _sqrt=Math_sqrt;

  function _isxdigit(chr) {
      return (chr >= 48 && chr <= 57) ||
             (chr >= 97 && chr <= 102) ||
             (chr >= 65 && chr <= 70);
    }

  function _ftell(stream) {
      // long ftell(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ftell.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      if (FS.isChrdev(stream.node.mode)) {
        ___setErrNo(ERRNO_CODES.ESPIPE);
        return -1;
      } else {
        return stream.position;
      }
    }

  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }

  
  function _snprintf(s, n, format, varargs) {
      // int snprintf(char *restrict s, size_t n, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var limit = (n === undefined) ? result.length
                                    : Math.min(result.length, Math.max(n - 1, 0));
      if (s < 0) {
        s = -s;
        var buf = _malloc(limit+1);
        HEAP32[((s)>>2)]=buf;
        s = buf;
      }
      for (var i = 0; i < limit; i++) {
        HEAP8[(((s)+(i))|0)]=result[i];
      }
      if (limit < n || (n === undefined)) HEAP8[(((s)+(i))|0)]=0;
      return result.length;
    }function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }

  var _emscripten_get_longjmp_result=true;

  function _strrchr(ptr, chr) {
      var ptr2 = ptr + _strlen(ptr);
      do {
        if (HEAP8[(ptr2)] == chr) return ptr2;
        ptr2--;
      } while (ptr2 >= ptr);
      return 0;
    }

  var _sin=Math_sin;

  
  function _fmod(x, y) {
      return x % y;
    }var _fmodl=_fmod;



  var _atan=Math_atan;

  function _ferror(stream) {
      // int ferror(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ferror.html
      stream = FS.getStreamFromPtr(stream);
      return Number(stream && stream.error);
    }

  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

  function _copysign(a, b) {
      return __reallyNegative(a) === __reallyNegative(b) ? a : -a;
    }

  
  function _gmtime_r(time, tmPtr) {
      var date = new Date(HEAP32[((time)>>2)]*1000);
      HEAP32[((tmPtr)>>2)]=date.getUTCSeconds();
      HEAP32[(((tmPtr)+(4))>>2)]=date.getUTCMinutes();
      HEAP32[(((tmPtr)+(8))>>2)]=date.getUTCHours();
      HEAP32[(((tmPtr)+(12))>>2)]=date.getUTCDate();
      HEAP32[(((tmPtr)+(16))>>2)]=date.getUTCMonth();
      HEAP32[(((tmPtr)+(20))>>2)]=date.getUTCFullYear()-1900;
      HEAP32[(((tmPtr)+(24))>>2)]=date.getUTCDay();
      HEAP32[(((tmPtr)+(36))>>2)]=0;
      HEAP32[(((tmPtr)+(32))>>2)]=0;
      var start = new Date(date); // define date using UTC, start from Jan 01 00:00:00 UTC
      start.setUTCDate(1);
      start.setUTCMonth(0);
      start.setUTCHours(0);
      start.setUTCMinutes(0);
      start.setUTCSeconds(0);
      start.setUTCMilliseconds(0);
      var yday = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      HEAP32[(((tmPtr)+(28))>>2)]=yday;
      HEAP32[(((tmPtr)+(40))>>2)]=___tm_timezone;
  
      return tmPtr;
    }function _gmtime(time) {
      return _gmtime_r(time, ___tm_current);
    }

  function _strpbrk(ptr1, ptr2) {
      var curr;
      var searchSet = {};
      while (1) {
        var curr = HEAP8[((ptr2++)|0)];
        if (!curr) break;
        searchSet[curr] = 1;
      }
      while (1) {
        curr = HEAP8[(ptr1)];
        if (!curr) break;
        if (curr in searchSet) return ptr1;
        ptr1++;
      }
      return 0;
    }

  function _isgraph(chr) {
      return 0x20 < chr && chr < 0x7F;
    }


  
  
  
  
  var _environ=allocate(1, "i32*", ALLOC_STATIC);var ___environ=_environ;function ___buildEnvironment(env) {
      // WARNING: Arbitrary limit!
      var MAX_ENV_VALUES = 64;
      var TOTAL_ENV_SIZE = 1024;
  
      // Statically allocate memory for the environment.
      var poolPtr;
      var envPtr;
      if (!___buildEnvironment.called) {
        ___buildEnvironment.called = true;
        // Set default values. Use string keys for Closure Compiler compatibility.
        ENV['USER'] = 'root';
        ENV['PATH'] = '/';
        ENV['PWD'] = '/';
        ENV['HOME'] = '/home/emscripten';
        ENV['LANG'] = 'en_US.UTF-8';
        ENV['_'] = './this.program';
        // Allocate memory.
        poolPtr = allocate(TOTAL_ENV_SIZE, 'i8', ALLOC_STATIC);
        envPtr = allocate(MAX_ENV_VALUES * 4,
                          'i8*', ALLOC_STATIC);
        HEAP32[((envPtr)>>2)]=poolPtr;
        HEAP32[((_environ)>>2)]=envPtr;
      } else {
        envPtr = HEAP32[((_environ)>>2)];
        poolPtr = HEAP32[((envPtr)>>2)];
      }
  
      // Collect key=value lines.
      var strings = [];
      var totalSize = 0;
      for (var key in env) {
        if (typeof env[key] === 'string') {
          var line = key + '=' + env[key];
          strings.push(line);
          totalSize += line.length;
        }
      }
      if (totalSize > TOTAL_ENV_SIZE) {
        throw new Error('Environment size exceeded TOTAL_ENV_SIZE!');
      }
  
      // Make new.
      var ptrSize = 4;
      for (var i = 0; i < strings.length; i++) {
        var line = strings[i];
        writeAsciiToMemory(line, poolPtr);
        HEAP32[(((envPtr)+(i * ptrSize))>>2)]=poolPtr;
        poolPtr += line.length + 1;
      }
      HEAP32[(((envPtr)+(strings.length * ptrSize))>>2)]=0;
    }var ENV={};function _getenv(name) {
      // char *getenv(const char *name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/getenv.html
      if (name === 0) return 0;
      name = Pointer_stringify(name);
      if (!ENV.hasOwnProperty(name)) return 0;
  
      if (_getenv.ret) _free(_getenv.ret);
      _getenv.ret = allocate(intArrayFromString(ENV[name]), 'i8', ALLOC_NORMAL);
      return _getenv.ret;
    }

  var _emscripten_setjmp=true;

  var _cos=Math_cos;

  function _srand(seed) {
      HEAP32[((___rand_seed)>>2)]=seed
    }

  function _isalnum(chr) {
      return (chr >= 48 && chr <= 57) ||
             (chr >= 97 && chr <= 122) ||
             (chr >= 65 && chr <= 90);
    }

  var _BItoD=true;

  function _difftime(time1, time0) {
      return time1 - time0;
    }

  var _floor=Math_floor;

  function _iscntrl(chr) {
      return (0 <= chr && chr <= 0x1F) || chr === 0x7F;
    }

  var _atan2=Math_atan2;

  function _setvbuf(stream, buf, type, size) {
      // int setvbuf(FILE *restrict stream, char *restrict buf, int type, size_t size);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/setvbuf.html
      // TODO: Implement custom buffering.
      return 0;
    }

  var _exp=Math_exp;

  var _copysignl=_copysign;

  function _islower(chr) {
      return chr >= 97 && chr <= 122;
    }

  var _acos=Math_acos;

  function _isupper(chr) {
      return chr >= 65 && chr <= 90;
    }

  
  function __isLeapYear(year) {
        return year%4 === 0 && (year%100 !== 0 || year%400 === 0);
    }
  
  function __arraySum(array, index) {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]);
      return sum;
    }
  
  
  var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];
  
  var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date, days) {
      var newDate = new Date(date.getTime());
      while(days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
  
        if (days > daysInCurrentMonth-newDate.getDate()) {
          // we spill over to next month
          days -= (daysInCurrentMonth-newDate.getDate()+1);
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth+1)
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear()+1);
          }
        } else {
          // we stay in current month 
          newDate.setDate(newDate.getDate()+days);
          return newDate;
        }
      }
  
      return newDate;
    }function _strftime(s, maxsize, format, tm) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
      
      var date = {
        tm_sec: HEAP32[((tm)>>2)],
        tm_min: HEAP32[(((tm)+(4))>>2)],
        tm_hour: HEAP32[(((tm)+(8))>>2)],
        tm_mday: HEAP32[(((tm)+(12))>>2)],
        tm_mon: HEAP32[(((tm)+(16))>>2)],
        tm_year: HEAP32[(((tm)+(20))>>2)],
        tm_wday: HEAP32[(((tm)+(24))>>2)],
        tm_yday: HEAP32[(((tm)+(28))>>2)],
        tm_isdst: HEAP32[(((tm)+(32))>>2)]
      };
  
      var pattern = Pointer_stringify(format);
  
      // expand format
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',     // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
        '%D': '%m/%d/%y',                 // Equivalent to %m / %d / %y
        '%F': '%Y-%m-%d',                 // Equivalent to %Y - %m - %d
        '%h': '%b',                       // Equivalent to %b
        '%r': '%I:%M:%S %p',              // Replaced by the time in a.m. and p.m. notation
        '%R': '%H:%M',                    // Replaced by the time in 24-hour notation
        '%T': '%H:%M:%S',                 // Replaced by the time
        '%x': '%m/%d/%y',                 // Replaced by the locale's appropriate date representation
        '%X': '%H:%M:%S',                 // Replaced by the locale's appropriate date representation
      };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule]);
      }
  
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
      function leadingSomething(value, digits, character) {
        var str = typeof value === 'number' ? value.toString() : (value || '');
        while (str.length < digits) {
          str = character[0]+str;
        }
        return str;
      };
  
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0');
      };
  
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : (value > 0 ? 1 : 0);
        };
  
        var compare;
        if ((compare = sgn(date1.getFullYear()-date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth()-date2.getMonth())) === 0) {
            compare = sgn(date1.getDate()-date2.getDate());
          }
        }
        return compare;
      };
  
      function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0: // Sunday
              return new Date(janFourth.getFullYear()-1, 11, 29);
            case 1: // Monday
              return janFourth;
            case 2: // Tuesday
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3: // Wednesday
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4: // Thursday
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5: // Friday
              return new Date(janFourth.getFullYear()-1, 11, 31);
            case 6: // Saturday
              return new Date(janFourth.getFullYear()-1, 11, 30);
          }
      };
  
      function getWeekBasedYear(date) {
          var thisDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear()+1, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            // this date is after the start of the first week of this year
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear()+1;
            } else {
              return thisDate.getFullYear();
            }
          } else { 
            return thisDate.getFullYear()-1;
          }
      };
  
      var EXPANSION_RULES_2 = {
        '%a': function(date) {
          return WEEKDAYS[date.tm_wday].substring(0,3);
        },
        '%A': function(date) {
          return WEEKDAYS[date.tm_wday];
        },
        '%b': function(date) {
          return MONTHS[date.tm_mon].substring(0,3);
        },
        '%B': function(date) {
          return MONTHS[date.tm_mon];
        },
        '%C': function(date) {
          var year = date.tm_year+1900;
          return leadingNulls(Math.floor(year/100),2);
        },
        '%d': function(date) {
          return leadingNulls(date.tm_mday, 2);
        },
        '%e': function(date) {
          return leadingSomething(date.tm_mday, 2, ' ');
        },
        '%g': function(date) {
          // %g, %G, and %V give values according to the ISO 8601:2000 standard week-based year. 
          // In this system, weeks begin on a Monday and week 1 of the year is the week that includes 
          // January 4th, which is also the week that includes the first Thursday of the year, and 
          // is also the first week that contains at least four days in the year. 
          // If the first Monday of January is the 2nd, 3rd, or 4th, the preceding days are part of 
          // the last week of the preceding year; thus, for Saturday 2nd January 1999, 
          // %G is replaced by 1998 and %V is replaced by 53. If December 29th, 30th, 
          // or 31st is a Monday, it and any following days are part of week 1 of the following year. 
          // Thus, for Tuesday 30th December 1997, %G is replaced by 1998 and %V is replaced by 01.
          
          return getWeekBasedYear(date).toString().substring(2);
        },
        '%G': function(date) {
          return getWeekBasedYear(date);
        },
        '%H': function(date) {
          return leadingNulls(date.tm_hour, 2);
        },
        '%I': function(date) {
          return leadingNulls(date.tm_hour < 13 ? date.tm_hour : date.tm_hour-12, 2);
        },
        '%j': function(date) {
          // Day of the year (001-366)
          return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon-1), 3);
        },
        '%m': function(date) {
          return leadingNulls(date.tm_mon+1, 2);
        },
        '%M': function(date) {
          return leadingNulls(date.tm_min, 2);
        },
        '%n': function() {
          return '\n';
        },
        '%p': function(date) {
          if (date.tm_hour > 0 && date.tm_hour < 13) {
            return 'AM';
          } else {
            return 'PM';
          }
        },
        '%S': function(date) {
          return leadingNulls(date.tm_sec, 2);
        },
        '%t': function() {
          return '\t';
        },
        '%u': function(date) {
          var day = new Date(date.tm_year+1900, date.tm_mon+1, date.tm_mday, 0, 0, 0, 0);
          return day.getDay() || 7;
        },
        '%U': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53]. 
          // The first Sunday of January is the first day of week 1; 
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year+1900, 0, 1);
          var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7-janFirst.getDay());
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
          
          // is target date after the first Sunday?
          if (compareByDay(firstSunday, endDate) < 0) {
            // calculate difference in days between first Sunday and endDate
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstSundayUntilEndJanuary = 31-firstSunday.getDate();
            var days = firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
  
          return compareByDay(firstSunday, janFirst) === 0 ? '01': '00';
        },
        '%V': function(date) {
          // Replaced by the week number of the year (Monday as the first day of the week) 
          // as a decimal number [01,53]. If the week containing 1 January has four 
          // or more days in the new year, then it is considered week 1. 
          // Otherwise, it is the last week of the previous year, and the next week is week 1. 
          // Both January 4th and the first Thursday of January are always in week 1. [ tm_year, tm_wday, tm_yday]
          var janFourthThisYear = new Date(date.tm_year+1900, 0, 4);
          var janFourthNextYear = new Date(date.tm_year+1901, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          var endDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            // if given date is before this years first week, then it belongs to the 53rd week of last year
            return '53';
          } 
  
          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            // if given date is after next years first week, then it belongs to the 01th week of next year
            return '01';
          }
  
          // given date is in between CW 01..53 of this calendar year
          var daysDifference;
          if (firstWeekStartThisYear.getFullYear() < date.tm_year+1900) {
            // first CW of this year starts last year
            daysDifference = date.tm_yday+32-firstWeekStartThisYear.getDate()
          } else {
            // first CW of this year starts this year
            daysDifference = date.tm_yday+1-firstWeekStartThisYear.getDate();
          }
          return leadingNulls(Math.ceil(daysDifference/7), 2);
        },
        '%w': function(date) {
          var day = new Date(date.tm_year+1900, date.tm_mon+1, date.tm_mday, 0, 0, 0, 0);
          return day.getDay();
        },
        '%W': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53]. 
          // The first Monday of January is the first day of week 1; 
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year, 0, 1);
          var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7-janFirst.getDay()+1);
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
  
          // is target date after the first Monday?
          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstMondayUntilEndJanuary = 31-firstMonday.getDate();
            var days = firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
          return compareByDay(firstMonday, janFirst) === 0 ? '01': '00';
        },
        '%y': function(date) {
          // Replaced by the last two digits of the year as a decimal number [00,99]. [ tm_year]
          return (date.tm_year+1900).toString().substring(2);
        },
        '%Y': function(date) {
          // Replaced by the year as a decimal number (for example, 1997). [ tm_year]
          return date.tm_year+1900;
        },
        '%z': function(date) {
          // Replaced by the offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ),
          // or by no characters if no timezone is determinable. 
          // For example, "-0430" means 4 hours 30 minutes behind UTC (west of Greenwich). 
          // If tm_isdst is zero, the standard time offset is used. 
          // If tm_isdst is greater than zero, the daylight savings time offset is used. 
          // If tm_isdst is negative, no characters are returned. 
          // FIXME: we cannot determine time zone (or can we?)
          return '';
        },
        '%Z': function(date) {
          // Replaced by the timezone name or abbreviation, or by no bytes if no timezone information exists. [ tm_isdst]
          // FIXME: we cannot determine time zone (or can we?)
          return '';
        },
        '%%': function() {
          return '%';
        }
      };
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.indexOf(rule) >= 0) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date));
        }
      }
  
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      } 
  
      writeArrayToMemory(bytes, s);
      return bytes.length-1;
    }



FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
_fputc.ret = allocate([0], "i8", ALLOC_STATIC);
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
_fgetc.ret = allocate([0], "i8", ALLOC_STATIC);
___buildEnvironment(ENV);
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + 5242880;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");

 var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_DYNAMIC);
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);

var Math_min = Math.min;
function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiiii(index,a1,a2,a3,a4) {
  try {
    return Module["dynCall_iiiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.ctlz_i8|0;var o=env.___rand_seed|0;var p=env._stderr|0;var q=env._stdin|0;var r=env._stdout|0;var s=0;var t=0;var u=0;var v=0;var w=+env.NaN,x=+env.Infinity;var y=0,z=0,A=0,B=0,C=0.0,D=0,E=0,F=0,G=0.0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=0;var N=0;var O=0;var P=0;var Q=0;var R=global.Math.floor;var S=global.Math.abs;var T=global.Math.sqrt;var U=global.Math.pow;var V=global.Math.cos;var W=global.Math.sin;var X=global.Math.tan;var Y=global.Math.acos;var Z=global.Math.asin;var _=global.Math.atan;var $=global.Math.atan2;var aa=global.Math.exp;var ba=global.Math.log;var ca=global.Math.ceil;var da=global.Math.imul;var ea=env.abort;var fa=env.assert;var ga=env.asmPrintInt;var ha=env.asmPrintFloat;var ia=env.min;var ja=env.invoke_ii;var ka=env.invoke_iiii;var la=env.invoke_vii;var ma=env.invoke_iii;var na=env.invoke_iiiii;var oa=env._isalnum;var pa=env._fabs;var qa=env._frexp;var ra=env._exp;var sa=env._strrchr;var ta=env._fread;var ua=env._memchr;var va=env.__reallyNegative;var wa=env._strpbrk;var xa=env._longjmp;var ya=env.__addDays;var za=env._fsync;var Aa=env._rename;var Ba=env._sbrk;var Ca=env._emscripten_memcpy_big;var Da=env._sinh;var Ea=env._sysconf;var Fa=env._close;var Ga=env._ferror;var Ha=env._clock;var Ia=env._cos;var Ja=env._tanh;var Ka=env._unlink;var La=env._write;var Ma=env.__isLeapYear;var Na=env._ftell;var Oa=env._isupper;var Pa=env._gmtime_r;var Qa=env._strstr;var Ra=env._islower;var Sa=env._tmpnam;var Ta=env._llvm_lifetime_end;var Ua=env._tmpfile;var Va=env._emscripten_exit_with_live_runtime;var Wa=env._send;var Xa=env._abort;var Ya=env._setvbuf;var Za=env._atan2;var _a=env._setlocale;var $a=env._isgraph;var ab=env._modf;var bb=env._strerror_r;var cb=env._sin;var db=env._fscanf;var eb=env.___setErrNo;var fb=env._isalpha;var gb=env._srand;var hb=env._strchr;var ib=env._mktime;var jb=env._putchar;var kb=env._gmtime;var lb=env._localeconv;var mb=env._printf;var nb=env._sprintf;var ob=env._localtime;var pb=env._read;var qb=env._fwrite;var rb=env._time;var sb=env._fprintf;var tb=env._exit;var ub=env._freopen;var vb=env._llvm_pow_f64;var wb=env._fgetc;var xb=env._fmod;var yb=env._lseek;var zb=env._rmdir;var Ab=env._asin;var Bb=env.___buildEnvironment;var Cb=env._pwrite;var Db=env._localtime_r;var Eb=env._tzset;var Fb=env._open;var Gb=env._remove;var Hb=env._snprintf;var Ib=env.__scanString;var Jb=env._strftime;var Kb=env._fseek;var Lb=env._iscntrl;var Mb=env._getenv;var Nb=env._fclose;var Ob=env._log;var Pb=env._recv;var Qb=env._tan;var Rb=env._copysign;var Sb=env.__getFloat;var Tb=env._fputc;var Ub=env._ispunct;var Vb=env._ceil;var Wb=env._isspace;var Xb=env._fopen;var Yb=env._strspn;var Zb=env._floor;var _b=env._llvm_lifetime_start;var $b=env._acos;var ac=env._cosh;var bc=env._difftime;var cc=env._ungetc;var dc=env._system;var ec=env._fflush;var fc=env._log10;var gc=env._fileno;var hc=env.__exit;var ic=env.__arraySum;var jc=env._fgets;var kc=env._atan;var lc=env._pread;var mc=env._mkport;var nc=env._toupper;var oc=env._feof;var pc=env.___errno_location;var qc=env._clearerr;var rc=env._isxdigit;var sc=env._strerror;var tc=env._emscripten_longjmp;var uc=env.__formatString;var vc=env._sqrt;var wc=0.0;
// EMSCRIPTEN_START_FUNCS
function Cc(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+7&-8;return b|0}function Dc(){return i|0}function Ec(a){a=a|0;i=a}function Fc(a,b){a=a|0;b=b|0;if((s|0)==0){s=a;t=b}}function Gc(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0]}function Hc(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0];a[k+4|0]=a[b+4|0];a[k+5|0]=a[b+5|0];a[k+6|0]=a[b+6|0];a[k+7|0]=a[b+7|0]}function Ic(a){a=a|0;H=a}function Jc(a){a=a|0;I=a}function Kc(a){a=a|0;J=a}function Lc(a){a=a|0;K=a}function Mc(a){a=a|0;L=a}function Nc(a){a=a|0;M=a}function Oc(a){a=a|0;N=a}function Pc(a){a=a|0;O=a}function Qc(a){a=a|0;P=a}function Rc(a){a=a|0;Q=a}function Sc(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=b;e=c[2]|0;Se(e,a,Um(a|0)|0,16,0)|0;if((Yd(c[2]|0,0,0,0,0,0)|0)==0){i=b;return}c[d>>2]=qd(c[2]|0,-1,0)|0;mb(24,d|0)|0;i=b;return}function Tc(a,b){a=a|0;b=b|0;b=i;a=df()|0;c[2]=a;be(a,0,0)|0;tg(c[2]|0);be(c[2]|0,1,0)|0;Va();i=b;return 0}function Uc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;d=i;i=i+8|0;e=d;c[e>>2]=b;f=c[a+16>>2]|0;g=a+8|0;h=c[g>>2]|0;j=h;do{if(((c[a+24>>2]|0)-j>>4|0)>(b|0)){k=b;l=h;m=1}else{if(((j-(c[a+28>>2]|0)>>4)+5|0)>(1e6-b|0)){n=0;i=d;return n|0}o=(zf(a,1,e)|0)==0;if(o){k=c[e>>2]|0;l=c[g>>2]|0;m=o&1;break}else{n=0;i=d;return n|0}}}while(0);g=f+4|0;f=l+(k<<4)|0;if(!((c[g>>2]|0)>>>0<f>>>0)){n=m;i=d;return n|0}c[g>>2]=f;n=m;i=d;return n|0}function Vc(a,b){a=a|0;b=b|0;var d=0;d=i;Bf(a,c[b>>2]|0);i=d;return}function Wc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;if((a|0)==(b|0)){i=e;return}f=a+8|0;a=(c[f>>2]|0)+(0-d<<4)|0;c[f>>2]=a;if((d|0)<=0){i=e;return}g=b+8|0;b=a;a=0;while(1){h=c[g>>2]|0;c[g>>2]=h+16;j=b+(a<<4)|0;k=c[j+4>>2]|0;l=h;c[l>>2]=c[j>>2];c[l+4>>2]=k;c[h+8>>2]=c[b+(a<<4)+8>>2];h=a+1|0;if((h|0)==(d|0)){break}b=c[f>>2]|0;a=h}i=e;return}function Xc(a,b){a=a|0;b=b|0;var d=0;d=(c[a+12>>2]|0)+168|0;a=c[d>>2]|0;c[d>>2]=b;i=i;return a|0}function Yc(a){a=a|0;var b=0;if((a|0)==0){b=40}else{b=c[(c[a+12>>2]|0)+176>>2]|0}i=i;return b|0}function Zc(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;if((b+1000999|0)>>>0>1000999){e=b;i=d;return e|0}e=((c[a+8>>2]|0)-(c[c[a+16>>2]>>2]|0)>>4)+b|0;i=d;return e|0}function _c(a){a=a|0;i=i;return(c[a+8>>2]|0)-((c[c[a+16>>2]>>2]|0)+16)>>4|0}function $c(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;if(!((b|0)>-1)){e=a+8|0;c[e>>2]=(c[e>>2]|0)+(b+1<<4);i=d;return}e=a+8|0;f=c[e>>2]|0;g=(c[c[a+16>>2]>>2]|0)+(b+1<<4)|0;if(f>>>0<g>>>0){b=f;while(1){h=b+16|0;c[b+8>>2]=0;if(h>>>0<g>>>0){b=h}else{break}}c[e>>2]=h}c[e>>2]=g;i=d;return}function ad(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=h+16|0;b=a+8|0;a=c[b>>2]|0;if(f>>>0<a>>>0){l=f;m=h}else{n=a;o=n+ -16|0;c[b>>2]=o;i=e;return}while(1){a=l;h=c[a+4>>2]|0;f=m;c[f>>2]=c[a>>2];c[f+4>>2]=h;c[m+8>>2]=c[m+24>>2];h=l+16|0;f=c[b>>2]|0;if(h>>>0<f>>>0){m=l;l=h}else{n=f;break}}o=n+ -16|0;c[b>>2]=o;i=e;return}function bd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=a+8|0;a=c[f>>2]|0;if(a>>>0>h>>>0){b=a;while(1){g=b+ -16|0;k=g;j=c[k+4>>2]|0;l=b;c[l>>2]=c[k>>2];c[l+4>>2]=j;c[b+8>>2]=c[b+ -8>>2];if(g>>>0>h>>>0){b=g}else{break}}m=c[f>>2]|0}else{m=a}a=m;f=c[a+4>>2]|0;b=h;c[b>>2]=c[a>>2];c[b+4>>2]=f;c[h+8>>2]=c[m+8>>2];i=e;return}function cd(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;g=b+8|0;h=c[g>>2]|0;j=h+ -16|0;k=b+16|0;l=c[k>>2]|0;do{if((e|0)>0){m=(c[l>>2]|0)+(e<<4)|0;n=m>>>0<h>>>0?m:4312}else{if(!((e|0)<-1000999)){n=h+(e<<4)|0;break}if((e|0)==-1001e3){n=(c[b+12>>2]|0)+40|0;break}m=-1001e3-e|0;o=c[l>>2]|0;if((c[o+8>>2]|0)==22){n=4312;break}p=c[o>>2]|0;if((m|0)>(d[p+6|0]|0|0)){n=4312;break}n=p+(m+ -1<<4)+16|0}}while(0);l=j;m=c[l+4>>2]|0;p=n;c[p>>2]=c[l>>2];c[p+4>>2]=m;m=h+ -8|0;c[n+8>>2]=c[m>>2];do{if((e|0)<-1001e3){if((c[m>>2]&64|0)==0){break}n=c[j>>2]|0;if((a[n+5|0]&3)==0){break}h=c[c[c[k>>2]>>2]>>2]|0;if((a[h+5|0]&4)==0){break}_f(b,h,n)}}while(0);c[g>>2]=(c[g>>2]|0)+ -16;i=f;return}function dd(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;h=b+16|0;j=c[h>>2]|0;do{if((e|0)>0){k=(c[j>>2]|0)+(e<<4)|0;l=k>>>0<(c[b+8>>2]|0)>>>0?k:4312}else{if(!((e|0)<-1000999)){l=(c[b+8>>2]|0)+(e<<4)|0;break}if((e|0)==-1001e3){l=(c[b+12>>2]|0)+40|0;break}k=-1001e3-e|0;m=c[j>>2]|0;if((c[m+8>>2]|0)==22){l=4312;break}n=c[m>>2]|0;if((k|0)>(d[n+6|0]|0|0)){l=4312;break}l=n+(k+ -1<<4)+16|0}}while(0);do{if((f|0)>0){e=(c[j>>2]|0)+(f<<4)|0;o=e>>>0<(c[b+8>>2]|0)>>>0?e:4312}else{if(!((f|0)<-1000999)){o=(c[b+8>>2]|0)+(f<<4)|0;break}if((f|0)==-1001e3){o=(c[b+12>>2]|0)+40|0;break}e=-1001e3-f|0;k=c[j>>2]|0;if((c[k+8>>2]|0)==22){o=4312;break}n=c[k>>2]|0;if((e|0)>(d[n+6|0]|0|0)){o=4312;break}o=n+(e+ -1<<4)+16|0}}while(0);j=l;e=c[j+4>>2]|0;n=o;c[n>>2]=c[j>>2];c[n+4>>2]=e;e=l+8|0;c[o+8>>2]=c[e>>2];if(!((f|0)<-1001e3)){i=g;return}if((c[e>>2]&64|0)==0){i=g;return}e=c[l>>2]|0;if((a[e+5|0]&3)==0){i=g;return}l=c[c[c[h>>2]>>2]>>2]|0;if((a[l+5|0]&4)==0){i=g;return}_f(b,l,e);i=g;return}function ed(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=a+8|0;a=c[f>>2]|0;b=h;g=c[b+4>>2]|0;k=a;c[k>>2]=c[b>>2];c[k+4>>2]=g;c[a+8>>2]=c[h+8>>2];c[f>>2]=(c[f>>2]|0)+16;i=e;return}function fd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){k=-1;i=e;return k|0}l=c[j>>2]|0;if((g|0)>(d[l+6|0]|0|0)){k=-1;i=e;return k|0}else{h=l+(g+ -1<<4)+16|0;break}}}while(0);if((h|0)==4312){k=-1;i=e;return k|0}k=c[h+8>>2]&15;i=e;return k|0}function gd(a,b){a=a|0;b=b|0;i=i;return c[7648+(b+1<<2)>>2]|0}function hd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=c[h+8>>2]|0;i=e;return((f|0)==22|(f|0)==102)&1|0}function id(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;i=i+16|0;f=e;g=c[a+16>>2]|0;do{if((b|0)>0){h=(c[g>>2]|0)+(b<<4)|0;j=h>>>0<(c[a+8>>2]|0)>>>0?h:4312}else{if(!((b|0)<-1000999)){j=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){j=(c[a+12>>2]|0)+40|0;break}h=-1001e3-b|0;k=c[g>>2]|0;if((c[k+8>>2]|0)==22){j=4312;break}l=c[k>>2]|0;if((h|0)>(d[l+6|0]|0|0)){j=4312;break}j=l+(h+ -1<<4)+16|0}}while(0);if((c[j+8>>2]|0)==3){m=1;n=m&1;i=e;return n|0}m=(Tj(j,f)|0)!=0;n=m&1;i=e;return n|0}function jd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){k=0;l=k&1;i=e;return l|0}m=c[j>>2]|0;if((g|0)>(d[m+6|0]|0|0)){k=0;l=k&1;i=e;return l|0}else{h=m+(g+ -1<<4)+16|0;break}}}while(0);if((h|0)==4312){k=0;l=k&1;i=e;return l|0}k=((c[h+8>>2]&15)+ -3|0)>>>0<2;l=k&1;i=e;return l|0}function kd(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;g=c[a+16>>2]|0;do{if((b|0)>0){h=(c[g>>2]|0)+(b<<4)|0;j=h>>>0<(c[a+8>>2]|0)>>>0?h:4312}else{if(!((b|0)<-1000999)){j=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){j=(c[a+12>>2]|0)+40|0;break}h=-1001e3-b|0;k=c[g>>2]|0;if((c[k+8>>2]|0)==22){j=4312;break}l=c[k>>2]|0;if((h|0)>(d[l+6|0]|0|0)){j=4312;break}j=l+(h+ -1<<4)+16|0}}while(0);do{if((e|0)>0){b=(c[g>>2]|0)+(e<<4)|0;m=b>>>0<(c[a+8>>2]|0)>>>0?b:4312}else{if(!((e|0)<-1000999)){m=(c[a+8>>2]|0)+(e<<4)|0;break}if((e|0)==-1001e3){m=(c[a+12>>2]|0)+40|0;break}b=-1001e3-e|0;h=c[g>>2]|0;if((c[h+8>>2]|0)==22){n=0;i=f;return n|0}l=c[h>>2]|0;if((b|0)>(d[l+6|0]|0|0)){n=0;i=f;return n|0}else{m=l+(b+ -1<<4)+16|0;break}}}while(0);if((j|0)==4312|(m|0)==4312){n=0;i=f;return n|0}if((c[j+8>>2]|0)==(c[m+8>>2]|0)){o=(Zj(0,j,m)|0)!=0}else{o=0}n=o&1;i=f;return n|0}function ld(a,b,e,f){a=a|0;b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=i;h=c[a+16>>2]|0;do{if((b|0)>0){j=(c[h>>2]|0)+(b<<4)|0;k=j>>>0<(c[a+8>>2]|0)>>>0?j:4312}else{if(!((b|0)<-1000999)){k=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){k=(c[a+12>>2]|0)+40|0;break}j=-1001e3-b|0;l=c[h>>2]|0;if((c[l+8>>2]|0)==22){k=4312;break}m=c[l>>2]|0;if((j|0)>(d[m+6|0]|0|0)){k=4312;break}k=m+(j+ -1<<4)+16|0}}while(0);do{if((e|0)>0){b=(c[h>>2]|0)+(e<<4)|0;n=b>>>0<(c[a+8>>2]|0)>>>0?b:4312}else{if(!((e|0)<-1000999)){n=(c[a+8>>2]|0)+(e<<4)|0;break}if((e|0)==-1001e3){n=(c[a+12>>2]|0)+40|0;break}b=-1001e3-e|0;j=c[h>>2]|0;if((c[j+8>>2]|0)==22){o=0;i=g;return o|0}m=c[j>>2]|0;if((b|0)>(d[m+6|0]|0|0)){o=0;i=g;return o|0}else{n=m+(b+ -1<<4)+16|0;break}}}while(0);if((k|0)==4312|(n|0)==4312){o=0;i=g;return o|0}if((f|0)==1){o=Xj(a,k,n)|0;i=g;return o|0}else if((f|0)==2){o=Yj(a,k,n)|0;i=g;return o|0}else if((f|0)==0){if((c[k+8>>2]|0)==(c[n+8>>2]|0)){p=(Zj(a,k,n)|0)!=0}else{p=0}o=p&1;i=g;return o|0}else{o=0;i=g;return o|0}return 0}function md(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0.0;f=i;i=i+16|0;g=f;j=c[a+16>>2]|0;do{if((b|0)>0){k=(c[j>>2]|0)+(b<<4)|0;l=k>>>0<(c[a+8>>2]|0)>>>0?k:4312}else{if(!((b|0)<-1000999)){l=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){l=(c[a+12>>2]|0)+40|0;break}k=-1001e3-b|0;m=c[j>>2]|0;if((c[m+8>>2]|0)==22){l=4312;break}n=c[m>>2]|0;if((k|0)>(d[n+6|0]|0|0)){l=4312;break}l=n+(k+ -1<<4)+16|0}}while(0);do{if((c[l+8>>2]|0)==3){o=l}else{j=Tj(l,g)|0;if((j|0)!=0){o=j;break}if((e|0)==0){p=0.0;i=f;return+p}c[e>>2]=0;p=0.0;i=f;return+p}}while(0);if((e|0)!=0){c[e>>2]=1}p=+h[o>>3];i=f;return+p}function nd(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+16|0;g=f;j=c[a+16>>2]|0;do{if((b|0)>0){k=(c[j>>2]|0)+(b<<4)|0;l=k>>>0<(c[a+8>>2]|0)>>>0?k:4312}else{if(!((b|0)<-1000999)){l=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){l=(c[a+12>>2]|0)+40|0;break}k=-1001e3-b|0;m=c[j>>2]|0;if((c[m+8>>2]|0)==22){l=4312;break}n=c[m>>2]|0;if((k|0)>(d[n+6|0]|0|0)){l=4312;break}l=n+(k+ -1<<4)+16|0}}while(0);do{if((c[l+8>>2]|0)==3){o=l}else{j=Tj(l,g)|0;if((j|0)!=0){o=j;break}if((e|0)==0){p=0;i=f;return p|0}c[e>>2]=0;p=0;i=f;return p|0}}while(0);g=~~+h[o>>3];if((e|0)==0){p=g;i=f;return p|0}c[e>>2]=1;p=g;i=f;return p|0}function od(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=i;i=i+24|0;g=f;j=f+16|0;k=c[a+16>>2]|0;do{if((b|0)>0){l=(c[k>>2]|0)+(b<<4)|0;m=l>>>0<(c[a+8>>2]|0)>>>0?l:4312}else{if(!((b|0)<-1000999)){m=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){m=(c[a+12>>2]|0)+40|0;break}l=-1001e3-b|0;n=c[k>>2]|0;if((c[n+8>>2]|0)==22){m=4312;break}o=c[n>>2]|0;if((l|0)>(d[o+6|0]|0|0)){m=4312;break}m=o+(l+ -1<<4)+16|0}}while(0);do{if((c[m+8>>2]|0)==3){p=m}else{k=Tj(m,g)|0;if((k|0)!=0){p=k;break}if((e|0)==0){q=0;i=f;return q|0}c[e>>2]=0;q=0;i=f;return q|0}}while(0);h[j>>3]=+h[p>>3]+6755399441055744.0;p=c[j>>2]|0;if((e|0)==0){q=p;i=f;return q|0}c[e>>2]=1;q=p;i=f;return q|0}function pd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=c[h+8>>2]|0;if((f|0)==0){l=0;m=l&1;i=e;return m|0}if((f|0)!=1){l=1;m=l&1;i=e;return m|0}l=(c[h>>2]|0)!=0;m=l&1;i=e;return m|0}function qd(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;g=a+16|0;h=c[g>>2]|0;j=(b|0)>0;do{if(j){k=(c[h>>2]|0)+(b<<4)|0;l=k>>>0<(c[a+8>>2]|0)>>>0?k:4312}else{if(!((b|0)<-1000999)){l=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){l=(c[a+12>>2]|0)+40|0;break}k=-1001e3-b|0;m=c[h>>2]|0;if((c[m+8>>2]|0)==22){l=4312;break}n=c[m>>2]|0;if((k|0)>(d[n+6|0]|0|0)){l=4312;break}l=n+(k+ -1<<4)+16|0}}while(0);do{if((c[l+8>>2]&15|0)==4){o=l}else{if((Uj(a,l)|0)==0){if((e|0)==0){p=0;i=f;return p|0}c[e>>2]=0;p=0;i=f;return p|0}h=a+12|0;if((c[(c[h>>2]|0)+12>>2]|0)>0){mg(a)}k=c[g>>2]|0;if(j){n=(c[k>>2]|0)+(b<<4)|0;o=n>>>0<(c[a+8>>2]|0)>>>0?n:4312;break}if(!((b|0)<-1000999)){o=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){o=(c[h>>2]|0)+40|0;break}h=-1001e3-b|0;n=c[k>>2]|0;if((c[n+8>>2]|0)==22){o=4312;break}k=c[n>>2]|0;if((h|0)>(d[k+6|0]|0|0)){o=4312;break}o=k+(h+ -1<<4)+16|0}}while(0);b=c[o>>2]|0;if((e|0)!=0){c[e>>2]=c[b+12>>2]}p=b+16|0;i=f;return p|0}function rd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=c[h+8>>2]&15;if((f|0)==4){l=c[(c[h>>2]|0)+12>>2]|0;i=e;return l|0}else if((f|0)==7){l=c[(c[h>>2]|0)+16>>2]|0;i=e;return l|0}else if((f|0)==5){l=Bj(c[h>>2]|0)|0;i=e;return l|0}else{l=0;i=e;return l|0}return 0}function sd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=c[h+8>>2]&15;if((f|0)==7){l=(c[h>>2]|0)+24|0;i=e;return l|0}else if((f|0)==2){l=c[h>>2]|0;i=e;return l|0}else{l=0;i=e;return l|0}return 0}function td(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);if((c[h+8>>2]|0)!=72){l=0;i=e;return l|0}l=c[h>>2]|0;i=e;return l|0}function ud(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;f=c[a+16>>2]|0;g=(b|0)>0;do{if(g){h=(c[f>>2]|0)+(b<<4)|0;j=h>>>0<(c[a+8>>2]|0)>>>0?h:4312}else{if(!((b|0)<-1000999)){j=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){j=(c[a+12>>2]|0)+40|0;break}h=-1001e3-b|0;k=c[f>>2]|0;if((c[k+8>>2]|0)==22){j=4312;break}l=c[k>>2]|0;if((h|0)>(d[l+6|0]|0|0)){j=4312;break}j=l+(h+ -1<<4)+16|0}}while(0);switch(c[j+8>>2]&63|0){case 6:{m=c[j>>2]|0;i=e;return m|0};case 5:{m=c[j>>2]|0;i=e;return m|0};case 38:{m=c[j>>2]|0;i=e;return m|0};case 22:{m=c[j>>2]|0;i=e;return m|0};case 2:case 7:{do{if(g){h=(c[f>>2]|0)+(b<<4)|0;n=h>>>0<(c[a+8>>2]|0)>>>0?h:4312}else{if(!((b|0)<-1000999)){n=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){n=(c[a+12>>2]|0)+40|0;break}h=-1001e3-b|0;l=c[f>>2]|0;if((c[l+8>>2]|0)==22){n=4312;break}k=c[l>>2]|0;if((h|0)>(d[k+6|0]|0|0)){n=4312;break}n=k+(h+ -1<<4)+16|0}}while(0);f=c[n+8>>2]&15;if((f|0)==7){m=(c[n>>2]|0)+24|0;i=e;return m|0}else if((f|0)==2){m=c[n>>2]|0;i=e;return m|0}else{m=0;i=e;return m|0}break};case 8:{m=c[j>>2]|0;i=e;return m|0};default:{m=0;i=e;return m|0}}return 0}function vd(a){a=a|0;var b=0;b=a+8|0;a=c[b>>2]|0;c[a+8>>2]=0;c[b>>2]=a+16;i=i;return}function wd(a,b){a=a|0;b=+b;var d=0;d=a+8|0;a=c[d>>2]|0;h[a>>3]=b;c[a+8>>2]=3;c[d>>2]=a+16;i=i;return}function xd(a,b){a=a|0;b=b|0;var d=0;d=a+8|0;a=c[d>>2]|0;h[a>>3]=+(b|0);c[a+8>>2]=3;c[d>>2]=a+16;i=i;return}function yd(a,b){a=a|0;b=b|0;var d=0.0;if((b|0)>-1){d=+(b|0)}else{d=+(b>>>0)}b=a+8|0;a=c[b>>2]|0;h[a>>3]=d;c[a+8>>2]=3;c[b>>2]=a+16;i=i;return}function zd(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0;f=i;if((c[(c[a+12>>2]|0)+12>>2]|0)>0){mg(a)}g=Si(a,b,e)|0;e=a+8|0;a=c[e>>2]|0;c[a>>2]=g;c[a+8>>2]=d[g+4|0]|0|64;c[e>>2]=(c[e>>2]|0)+16;i=f;return g+16|0}function Ad(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0;e=i;if((b|0)==0){f=a+8|0;g=c[f>>2]|0;c[g+8>>2]=0;c[f>>2]=g+16;h=0;i=e;return h|0}if((c[(c[a+12>>2]|0)+12>>2]|0)>0){mg(a)}g=Ti(a,b)|0;b=a+8|0;a=c[b>>2]|0;c[a>>2]=g;c[a+8>>2]=d[g+4|0]|0|64;c[b>>2]=(c[b>>2]|0)+16;h=g+16|0;i=e;return h|0}function Bd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;if((c[(c[a+12>>2]|0)+12>>2]|0)>0){mg(a)}f=Wh(a,b,d)|0;i=e;return f|0}function Cd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+16|0;f=e;if((c[(c[a+12>>2]|0)+12>>2]|0)>0){mg(a)}c[f>>2]=d;d=Wh(a,b,f)|0;i=e;return d|0}function Dd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;if((d|0)==0){f=c[a+8>>2]|0;c[f>>2]=b;c[f+8>>2]=22;g=a+8|0;h=c[g>>2]|0;j=h+16|0;c[g>>2]=j;i=e;return}if((c[(c[a+12>>2]|0)+12>>2]|0)>0){mg(a)}f=Rf(a,d)|0;c[f+12>>2]=b;b=a+8|0;k=(c[b>>2]|0)+(0-d<<4)|0;c[b>>2]=k;l=d;d=k;do{l=l+ -1|0;k=d+(l<<4)|0;m=c[k+4>>2]|0;n=f+(l<<4)+16|0;c[n>>2]=c[k>>2];c[n+4>>2]=m;c[f+(l<<4)+24>>2]=c[d+(l<<4)+8>>2];d=c[b>>2]|0}while((l|0)!=0);c[d>>2]=f;c[d+8>>2]=102;g=a+8|0;h=c[g>>2]|0;j=h+16|0;c[g>>2]=j;i=e;return}function Ed(a,b){a=a|0;b=b|0;var d=0;d=a+8|0;a=c[d>>2]|0;c[a>>2]=(b|0)!=0;c[a+8>>2]=1;c[d>>2]=a+16;i=i;return}function Fd(a,b){a=a|0;b=b|0;var d=0;d=a+8|0;a=c[d>>2]|0;c[a>>2]=b;c[a+8>>2]=2;c[d>>2]=(c[d>>2]|0)+16;i=i;return}function Gd(a){a=a|0;var b=0,d=0;b=a+8|0;d=c[b>>2]|0;c[d>>2]=a;c[d+8>>2]=72;c[b>>2]=(c[b>>2]|0)+16;i=i;return(c[(c[a+12>>2]|0)+172>>2]|0)==(a|0)|0}function Hd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0;e=i;f=yj(c[(c[a+12>>2]|0)+40>>2]|0,2)|0;g=a+8|0;h=c[g>>2]|0;c[g>>2]=h+16;j=Ti(a,b)|0;c[h>>2]=j;c[h+8>>2]=d[j+4|0]|0|64;j=(c[g>>2]|0)+ -16|0;Vj(a,f,j,j);i=e;return}function Id(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=(c[a+8>>2]|0)+ -16|0;Vj(a,h,f,f);i=e;return}function Jd(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;g=c[a+16>>2]|0;do{if((b|0)>0){h=(c[g>>2]|0)+(b<<4)|0;j=h>>>0<(c[a+8>>2]|0)>>>0?h:4312}else{if(!((b|0)<-1000999)){j=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){j=(c[a+12>>2]|0)+40|0;break}h=-1001e3-b|0;k=c[g>>2]|0;if((c[k+8>>2]|0)==22){j=4312;break}l=c[k>>2]|0;if((h|0)>(d[l+6|0]|0|0)){j=4312;break}j=l+(h+ -1<<4)+16|0}}while(0);g=a+8|0;b=c[g>>2]|0;h=Ti(a,e)|0;c[b>>2]=h;c[b+8>>2]=d[h+4|0]|0|64;h=c[g>>2]|0;c[g>>2]=h+16;Vj(a,j,h,h);i=f;return}function Kd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=a+8|0;a=Aj(c[h>>2]|0,(c[f>>2]|0)+ -16|0)|0;h=c[f>>2]|0;f=a;b=c[f+4>>2]|0;g=h+ -16|0;c[g>>2]=c[f>>2];c[g+4>>2]=b;c[h+ -8>>2]=c[a+8>>2];i=e;return}function Ld(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;g=c[a+16>>2]|0;do{if((b|0)>0){h=(c[g>>2]|0)+(b<<4)|0;j=h>>>0<(c[a+8>>2]|0)>>>0?h:4312}else{if(!((b|0)<-1000999)){j=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){j=(c[a+12>>2]|0)+40|0;break}h=-1001e3-b|0;k=c[g>>2]|0;if((c[k+8>>2]|0)==22){j=4312;break}l=c[k>>2]|0;if((h|0)>(d[l+6|0]|0|0)){j=4312;break}j=l+(h+ -1<<4)+16|0}}while(0);g=yj(c[j>>2]|0,e)|0;e=a+8|0;a=c[e>>2]|0;j=g;b=c[j+4>>2]|0;h=a;c[h>>2]=c[j>>2];c[h+4>>2]=b;c[a+8>>2]=c[g+8>>2];c[e>>2]=(c[e>>2]|0)+16;i=f;return}function Md(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;if((c[(c[a+12>>2]|0)+12>>2]|0)>0){mg(a)}f=uj(a)|0;g=a+8|0;h=c[g>>2]|0;c[h>>2]=f;c[h+8>>2]=69;c[g>>2]=(c[g>>2]|0)+16;if(!((b|0)>0|(d|0)>0)){i=e;return}pj(a,f,b,d);i=e;return}function Nd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=c[h+8>>2]&15;if((f|0)==5){l=c[(c[h>>2]|0)+8>>2]|0}else if((f|0)==7){l=c[(c[h>>2]|0)+8>>2]|0}else{l=c[(c[a+12>>2]|0)+(f<<2)+252>>2]|0}if((l|0)==0){m=0;i=e;return m|0}f=a+8|0;a=c[f>>2]|0;c[a>>2]=l;c[a+8>>2]=69;c[f>>2]=(c[f>>2]|0)+16;m=1;i=e;return m|0}function Od(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=c[(c[h>>2]|0)+12>>2]|0;h=a+8|0;a=c[h>>2]|0;if((f|0)==0){c[a+8>>2]=0;l=a;m=l+16|0;c[h>>2]=m;i=e;return}else{c[a>>2]=f;c[a+8>>2]=69;l=c[h>>2]|0;m=l+16|0;c[h>>2]=m;i=e;return}}function Pd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0;e=i;f=yj(c[(c[a+12>>2]|0)+40>>2]|0,2)|0;g=a+8|0;h=c[g>>2]|0;c[g>>2]=h+16;j=Ti(a,b)|0;c[h>>2]=j;c[h+8>>2]=d[j+4|0]|0|64;j=c[g>>2]|0;Wj(a,f,j+ -16|0,j+ -32|0);c[g>>2]=(c[g>>2]|0)+ -32;i=e;return}function Qd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=a+8|0;b=c[f>>2]|0;Wj(a,h,b+ -32|0,b+ -16|0);c[f>>2]=(c[f>>2]|0)+ -32;i=e;return}function Rd(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;g=c[a+16>>2]|0;do{if((b|0)>0){h=(c[g>>2]|0)+(b<<4)|0;j=h>>>0<(c[a+8>>2]|0)>>>0?h:4312}else{if(!((b|0)<-1000999)){j=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){j=(c[a+12>>2]|0)+40|0;break}h=-1001e3-b|0;k=c[g>>2]|0;if((c[k+8>>2]|0)==22){j=4312;break}l=c[k>>2]|0;if((h|0)>(d[l+6|0]|0|0)){j=4312;break}j=l+(h+ -1<<4)+16|0}}while(0);g=a+8|0;b=c[g>>2]|0;c[g>>2]=b+16;h=Ti(a,e)|0;c[b>>2]=h;c[b+8>>2]=d[h+4|0]|0|64;h=c[g>>2]|0;Wj(a,j,h+ -16|0,h+ -32|0);c[g>>2]=(c[g>>2]|0)+ -32;i=f;return}function Sd(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;g=c[b+16>>2]|0;do{if((e|0)>0){h=(c[g>>2]|0)+(e<<4)|0;j=h>>>0<(c[b+8>>2]|0)>>>0?h:4312}else{if(!((e|0)<-1000999)){j=(c[b+8>>2]|0)+(e<<4)|0;break}if((e|0)==-1001e3){j=(c[b+12>>2]|0)+40|0;break}h=-1001e3-e|0;k=c[g>>2]|0;if((c[k+8>>2]|0)==22){j=4312;break}l=c[k>>2]|0;if((h|0)>(d[l+6|0]|0|0)){j=4312;break}j=l+(h+ -1<<4)+16|0}}while(0);g=b+8|0;e=c[g>>2]|0;h=j;j=sj(b,c[h>>2]|0,e+ -32|0)|0;l=e+ -16|0;k=c[l+4>>2]|0;m=j;c[m>>2]=c[l>>2];c[m+4>>2]=k;c[j+8>>2]=c[e+ -8>>2];a[(c[h>>2]|0)+6|0]=0;e=c[g>>2]|0;if((c[e+ -8>>2]&64|0)==0){n=e;o=n+ -32|0;c[g>>2]=o;i=f;return}if((a[(c[e+ -16>>2]|0)+5|0]&3)==0){n=e;o=n+ -32|0;c[g>>2]=o;i=f;return}j=c[h>>2]|0;if((a[j+5|0]&4)==0){n=e;o=n+ -32|0;c[g>>2]=o;i=f;return}ag(b,j);n=c[g>>2]|0;o=n+ -32|0;c[g>>2]=o;i=f;return}function Td(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;h=c[b+16>>2]|0;do{if((e|0)>0){j=(c[h>>2]|0)+(e<<4)|0;k=j>>>0<(c[b+8>>2]|0)>>>0?j:4312}else{if(!((e|0)<-1000999)){k=(c[b+8>>2]|0)+(e<<4)|0;break}if((e|0)==-1001e3){k=(c[b+12>>2]|0)+40|0;break}j=-1001e3-e|0;l=c[h>>2]|0;if((c[l+8>>2]|0)==22){k=4312;break}m=c[l>>2]|0;if((j|0)>(d[m+6|0]|0|0)){k=4312;break}k=m+(j+ -1<<4)+16|0}}while(0);h=k;k=b+8|0;rj(b,c[h>>2]|0,f,(c[k>>2]|0)+ -16|0);f=c[k>>2]|0;if((c[f+ -8>>2]&64|0)==0){n=f;o=n+ -16|0;c[k>>2]=o;i=g;return}if((a[(c[f+ -16>>2]|0)+5|0]&3)==0){n=f;o=n+ -16|0;c[k>>2]=o;i=g;return}e=c[h>>2]|0;if((a[e+5|0]&4)==0){n=f;o=n+ -16|0;c[k>>2]=o;i=g;return}ag(b,e);n=c[k>>2]|0;o=n+ -16|0;c[k>>2]=o;i=g;return}function Ud(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;g=c[b+16>>2]|0;do{if((e|0)>0){h=(c[g>>2]|0)+(e<<4)|0;j=h>>>0<(c[b+8>>2]|0)>>>0?h:4312}else{if(!((e|0)<-1000999)){j=(c[b+8>>2]|0)+(e<<4)|0;break}if((e|0)==-1001e3){j=(c[b+12>>2]|0)+40|0;break}h=-1001e3-e|0;k=c[g>>2]|0;if((c[k+8>>2]|0)==22){j=4312;break}l=c[k>>2]|0;if((h|0)>(d[l+6|0]|0|0)){j=4312;break}j=l+(h+ -1<<4)+16|0}}while(0);g=b+8|0;e=c[g>>2]|0;if((c[e+ -8>>2]|0)==0){m=0}else{m=c[e+ -16>>2]|0}e=c[j+8>>2]&15;if((e|0)==5){h=j;c[(c[h>>2]|0)+8>>2]=m;if((m|0)==0){n=c[g>>2]|0;o=n+ -16|0;c[g>>2]=o;i=f;return 1}do{if(!((a[m+5|0]&3)==0)){l=c[h>>2]|0;if((a[l+5|0]&4)==0){break}ag(b,l)}}while(0);eg(b,c[h>>2]|0,m);n=c[g>>2]|0;o=n+ -16|0;c[g>>2]=o;i=f;return 1}else if((e|0)==7){h=j;j=m;c[(c[h>>2]|0)+8>>2]=j;if((m|0)==0){n=c[g>>2]|0;o=n+ -16|0;c[g>>2]=o;i=f;return 1}do{if(!((a[m+5|0]&3)==0)){l=c[h>>2]|0;if((a[l+5|0]&4)==0){break}_f(b,l,j)}}while(0);eg(b,c[h>>2]|0,m);n=c[g>>2]|0;o=n+ -16|0;c[g>>2]=o;i=f;return 1}else{c[(c[b+12>>2]|0)+(e<<2)+252>>2]=m;n=c[g>>2]|0;o=n+ -16|0;c[g>>2]=o;i=f;return 1}return 0}function Vd(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;f=i;g=c[b+16>>2]|0;do{if((e|0)>0){h=(c[g>>2]|0)+(e<<4)|0;j=h>>>0<(c[b+8>>2]|0)>>>0?h:4312}else{if(!((e|0)<-1000999)){j=(c[b+8>>2]|0)+(e<<4)|0;break}if((e|0)==-1001e3){j=(c[b+12>>2]|0)+40|0;break}h=-1001e3-e|0;k=c[g>>2]|0;if((c[k+8>>2]|0)==22){j=4312;break}l=c[k>>2]|0;if((h|0)>(d[l+6|0]|0|0)){j=4312;break}j=l+(h+ -1<<4)+16|0}}while(0);g=b+8|0;e=c[g>>2]|0;if((c[e+ -8>>2]|0)==0){c[(c[j>>2]|0)+12>>2]=0;m=c[g>>2]|0;n=m+ -16|0;c[g>>2]=n;i=f;return}h=j;c[(c[h>>2]|0)+12>>2]=c[e+ -16>>2];e=c[(c[g>>2]|0)+ -16>>2]|0;if((a[e+5|0]&3)==0){m=c[g>>2]|0;n=m+ -16|0;c[g>>2]=n;i=f;return}j=c[h>>2]|0;if((a[j+5|0]&4)==0){m=c[g>>2]|0;n=m+ -16|0;c[g>>2]=n;i=f;return}_f(b,j,e);m=c[g>>2]|0;n=m+ -16|0;c[g>>2]=n;i=f;return}function Wd(b,e){b=b|0;e=e|0;var f=0,g=0,h=0;f=i;g=c[b+16>>2]|0;if((a[g+18|0]&8)==0){h=0;i=f;return h|0}if((e|0)!=0){c[e>>2]=c[g+24>>2]}h=d[g+37|0]|0;i=f;return h|0}function Xd(a,d,e,f,g){a=a|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0;h=i;j=a+8|0;k=(c[j>>2]|0)+(~d<<4)|0;do{if((g|0)==0){l=4}else{if((b[a+36>>1]|0)!=0){l=4;break}d=a+16|0;c[(c[d>>2]|0)+28>>2]=g;c[(c[d>>2]|0)+24>>2]=f;Gf(a,k,e,1)}}while(0);if((l|0)==4){Gf(a,k,e,0)}if(!((e|0)==-1)){i=h;return}e=(c[a+16>>2]|0)+4|0;a=c[j>>2]|0;if(!((c[e>>2]|0)>>>0<a>>>0)){i=h;return}c[e>>2]=a;i=h;return}function Yd(e,f,g,h,j,k){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;l=i;i=i+8|0;m=l;if((h|0)==0){n=0}else{o=c[e+16>>2]|0;do{if((h|0)>0){p=(c[o>>2]|0)+(h<<4)|0;q=p>>>0<(c[e+8>>2]|0)>>>0?p:4312}else{if(!((h|0)<-1000999)){q=(c[e+8>>2]|0)+(h<<4)|0;break}if((h|0)==-1001e3){q=(c[e+12>>2]|0)+40|0;break}p=-1001e3-h|0;r=c[o>>2]|0;if((c[r+8>>2]|0)==22){q=4312;break}s=c[r>>2]|0;if((p|0)>(d[s+6|0]|0)){q=4312;break}q=s+(p+ -1<<4)+16|0}}while(0);n=q-(c[e+28>>2]|0)|0}q=e+8|0;o=(c[q>>2]|0)+(~f<<4)|0;f=m;c[f>>2]=o;do{if((k|0)==0){t=14}else{if((b[e+36>>1]|0)!=0){t=14;break}h=c[e+16>>2]|0;c[h+28>>2]=k;c[h+24>>2]=j;c[h+20>>2]=(c[f>>2]|0)-(c[e+28>>2]|0);a[h+36|0]=a[e+41|0]|0;p=e+68|0;s=h+32|0;c[s>>2]=c[p>>2];c[p>>2]=n;r=h+18|0;a[r]=d[r]|16;Gf(e,c[f>>2]|0,g,1);a[r]=a[r]&239;c[p>>2]=c[s>>2];u=0}}while(0);if((t|0)==14){c[m+4>>2]=g;u=Lf(e,2,m,o-(c[e+28>>2]|0)|0,n)|0}if(!((g|0)==-1)){i=l;return u|0}g=(c[e+16>>2]|0)+4|0;e=c[q>>2]|0;if(!((c[g>>2]|0)>>>0<e>>>0)){i=l;return u|0}c[g>>2]=e;i=l;return u|0}function Zd(a,b){a=a|0;b=b|0;var d=0;d=i;Gf(a,c[b>>2]|0,c[b+4>>2]|0,0);i=d;return}function _d(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0;h=i;i=i+24|0;j=h;fk(b,j,d,e);e=Mf(b,j,(f|0)==0?48:f,g)|0;if((e|0)!=0){i=h;return e|0}g=c[(c[b+8>>2]|0)+ -16>>2]|0;if((a[g+6|0]|0)!=1){i=h;return e|0}f=yj(c[(c[b+12>>2]|0)+40>>2]|0,2)|0;j=g+16|0;g=c[(c[j>>2]|0)+8>>2]|0;d=f;k=c[d+4>>2]|0;l=g;c[l>>2]=c[d>>2];c[l+4>>2]=k;k=f+8|0;c[g+8>>2]=c[k>>2];if((c[k>>2]&64|0)==0){i=h;return e|0}k=c[f>>2]|0;if((a[k+5|0]&3)==0){i=h;return e|0}f=c[j>>2]|0;if((a[f+5|0]&4)==0){i=h;return e|0}_f(b,f,k);i=h;return e|0}function $d(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;f=c[a+8>>2]|0;if((c[f+ -8>>2]|0)!=70){g=1;i=e;return g|0}g=Pf(a,c[(c[f+ -16>>2]|0)+12>>2]|0,b,d,0)|0;i=e;return g|0}function ae(a){a=a|0;i=i;return d[a+6|0]|0|0}function be(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;g=i;h=c[b+12>>2]|0;a:do{switch(e|0){case 0:{a[h+63|0]=0;j=0;break};case 5:{if((a[h+62|0]|0)==2){k=(c[h+20>>2]|0)==0|0;kg(b);j=k;break a}k=(f<<10)+ -1600|0;if((a[h+63|0]|0)==0){l=k;Fi(h,l);kg(b);m=h+61|0;n=a[m]|0;o=n<<24>>24==5;p=o&1;i=g;return p|0}l=(c[h+12>>2]|0)+k|0;Fi(h,l);kg(b);m=h+61|0;n=a[m]|0;o=n<<24>>24==5;p=o&1;i=g;return p|0};case 1:{Fi(h,0);a[h+63|0]=1;j=0;break};case 7:{k=h+164|0;q=c[k>>2]|0;c[k>>2]=f;j=q;break};case 9:{j=d[h+63|0]|0;break};case 3:{j=((c[h+12>>2]|0)+(c[h+8>>2]|0)|0)>>>10;break};case 4:{j=(c[h+12>>2]|0)+(c[h+8>>2]|0)&1023;break};case 2:{ng(b,0);j=0;break};case 6:{q=h+156|0;k=c[q>>2]|0;c[q>>2]=f;j=k;break};case 10:{fg(b,2);j=0;break};case 8:{k=h+160|0;q=c[k>>2]|0;c[k>>2]=f;j=q;break};case 11:{fg(b,0);j=0;break};default:{j=-1}}}while(0);i=g;return j|0}function ce(a){a=a|0;xf(a);return 0}function de(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=a+8|0;b=oj(a,c[h>>2]|0,(c[f>>2]|0)+ -16|0)|0;h=c[f>>2]|0;c[f>>2]=(b|0)==0?h+ -16|0:h+16|0;i=e;return b|0}function ee(a,b){a=a|0;b=b|0;var e=0,f=0,g=0;e=i;if((b|0)>1){if((c[(c[a+12>>2]|0)+12>>2]|0)>0){mg(a)}$j(a,b);i=e;return}else{if((b|0)!=0){i=e;return}b=a+8|0;f=c[b>>2]|0;g=Si(a,56,0)|0;c[f>>2]=g;c[f+8>>2]=d[g+4|0]|0|64;c[b>>2]=(c[b>>2]|0)+16;i=e;return}}function fe(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;f=c[a+16>>2]|0;do{if((b|0)>0){g=(c[f>>2]|0)+(b<<4)|0;h=g>>>0<(c[a+8>>2]|0)>>>0?g:4312}else{if(!((b|0)<-1000999)){h=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){h=(c[a+12>>2]|0)+40|0;break}g=-1001e3-b|0;j=c[f>>2]|0;if((c[j+8>>2]|0)==22){h=4312;break}k=c[j>>2]|0;if((g|0)>(d[k+6|0]|0|0)){h=4312;break}h=k+(g+ -1<<4)+16|0}}while(0);f=a+8|0;ak(a,c[f>>2]|0,h);c[f>>2]=(c[f>>2]|0)+16;i=e;return}function ge(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;if((c[(c[a+12>>2]|0)+12>>2]|0)>0){mg(a)}e=Ui(a,b,0)|0;b=a+8|0;a=c[b>>2]|0;c[a>>2]=e;c[a+8>>2]=71;c[b>>2]=(c[b>>2]|0)+16;i=d;return e+24|0}function he(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;g=c[a+16>>2]|0;do{if((b|0)>0){h=(c[g>>2]|0)+(b<<4)|0;j=h>>>0<(c[a+8>>2]|0)>>>0?h:4312}else{if(!((b|0)<-1000999)){j=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){j=(c[a+12>>2]|0)+40|0;break}h=-1001e3-b|0;k=c[g>>2]|0;if((c[k+8>>2]|0)==22){j=4312;break}l=c[k>>2]|0;if((h|0)>(d[l+6|0]|0|0)){j=4312;break}j=l+(h+ -1<<4)+16|0}}while(0);g=c[j+8>>2]&63;do{if((g|0)==38){b=c[j>>2]|0;if((e|0)<=0){m=0;i=f;return m|0}if((d[b+6|0]|0|0)<(e|0)){m=0;i=f;return m|0}else{n=56;o=b+(e+ -1<<4)+16|0;break}}else if((g|0)==6){b=c[j>>2]|0;h=c[b+12>>2]|0;if((e|0)<=0){m=0;i=f;return m|0}if((c[h+40>>2]|0)<(e|0)){m=0;i=f;return m|0}l=e+ -1|0;k=c[(c[b+16+(l<<2)>>2]|0)+8>>2]|0;b=c[(c[h+28>>2]|0)+(l<<3)>>2]|0;if((b|0)==0){n=56;o=k;break}n=b+16|0;o=k}else{m=0;i=f;return m|0}}while(0);e=a+8|0;a=c[e>>2]|0;j=o;g=c[j+4>>2]|0;k=a;c[k>>2]=c[j>>2];c[k+4>>2]=g;c[a+8>>2]=c[o+8>>2];c[e>>2]=(c[e>>2]|0)+16;m=n;i=f;return m|0}function ie(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;g=i;h=c[b+16>>2]|0;do{if((e|0)>0){j=(c[h>>2]|0)+(e<<4)|0;k=j>>>0<(c[b+8>>2]|0)>>>0?j:4312}else{if(!((e|0)<-1000999)){k=(c[b+8>>2]|0)+(e<<4)|0;break}if((e|0)==-1001e3){k=(c[b+12>>2]|0)+40|0;break}j=-1001e3-e|0;l=c[h>>2]|0;if((c[l+8>>2]|0)==22){k=4312;break}m=c[l>>2]|0;if((j|0)>(d[m+6|0]|0|0)){k=4312;break}k=m+(j+ -1<<4)+16|0}}while(0);h=c[k+8>>2]&63;do{if((h|0)==38){e=c[k>>2]|0;if((f|0)<=0){n=0;i=g;return n|0}if((d[e+6|0]|0|0)<(f|0)){n=0;i=g;return n|0}else{o=56;p=e;q=e+(f+ -1<<4)+16|0;break}}else if((h|0)==6){e=c[k>>2]|0;j=c[e+12>>2]|0;if((f|0)<=0){n=0;i=g;return n|0}if((c[j+40>>2]|0)<(f|0)){n=0;i=g;return n|0}m=f+ -1|0;l=c[e+16+(m<<2)>>2]|0;e=c[l+8>>2]|0;r=l;l=c[(c[j+28>>2]|0)+(m<<3)>>2]|0;if((l|0)==0){o=56;p=r;q=e;break}o=l+16|0;p=r;q=e}else{n=0;i=g;return n|0}}while(0);f=b+8|0;k=c[f>>2]|0;h=k+ -16|0;c[f>>2]=h;e=h;h=c[e+4>>2]|0;r=q;c[r>>2]=c[e>>2];c[r+4>>2]=h;c[q+8>>2]=c[k+ -8>>2];k=c[f>>2]|0;if((c[k+8>>2]&64|0)==0){n=o;i=g;return n|0}f=c[k>>2]|0;if((a[f+5|0]&3)==0){n=o;i=g;return n|0}if((a[p+5|0]&4)==0){n=o;i=g;return n|0}_f(b,p,f);n=o;i=g;return n|0}function je(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;g=c[a+16>>2]|0;h=(b|0)>0;do{if(h){j=(c[g>>2]|0)+(b<<4)|0;k=j>>>0<(c[a+8>>2]|0)>>>0?j:4312}else{if(!((b|0)<-1000999)){k=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){k=(c[a+12>>2]|0)+40|0;break}j=-1001e3-b|0;l=c[g>>2]|0;if((c[l+8>>2]|0)==22){k=4312;break}m=c[l>>2]|0;if((j|0)>(d[m+6|0]|0|0)){k=4312;break}k=m+(j+ -1<<4)+16|0}}while(0);j=c[k+8>>2]&63;if((j|0)==6){do{if(h){m=(c[g>>2]|0)+(b<<4)|0;n=m>>>0<(c[a+8>>2]|0)>>>0?m:4312}else{if(!((b|0)<-1000999)){n=(c[a+8>>2]|0)+(b<<4)|0;break}if((b|0)==-1001e3){n=(c[a+12>>2]|0)+40|0;break}m=-1001e3-b|0;l=c[g>>2]|0;if((c[l+8>>2]|0)==22){n=4312;break}o=c[l>>2]|0;if((m|0)>(d[o+6|0]|0|0)){n=4312;break}n=o+(m+ -1<<4)+16|0}}while(0);p=c[(c[n>>2]|0)+16+(e+ -1<<2)>>2]|0;i=f;return p|0}else if((j|0)==38){p=(c[k>>2]|0)+(e+ -1<<4)+16|0;i=f;return p|0}else{p=0;i=f;return p|0}return 0}function ke(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0;j=i;k=c[b+16>>2]|0;do{if((e|0)>0){l=(c[k>>2]|0)+(e<<4)|0;m=l>>>0<(c[b+8>>2]|0)>>>0?l:4312}else{if(!((e|0)<-1000999)){m=(c[b+8>>2]|0)+(e<<4)|0;break}if((e|0)==-1001e3){m=(c[b+12>>2]|0)+40|0;break}l=-1001e3-e|0;n=c[k>>2]|0;if((c[n+8>>2]|0)==22){m=4312;break}o=c[n>>2]|0;if((l|0)>(d[o+6|0]|0|0)){m=4312;break}m=o+(l+ -1<<4)+16|0}}while(0);e=c[m>>2]|0;m=e+16+(f+ -1<<2)|0;do{if((g|0)>0){f=(c[k>>2]|0)+(g<<4)|0;p=f>>>0<(c[b+8>>2]|0)>>>0?f:4312}else{if(!((g|0)<-1000999)){p=(c[b+8>>2]|0)+(g<<4)|0;break}if((g|0)==-1001e3){p=(c[b+12>>2]|0)+40|0;break}f=-1001e3-g|0;l=c[k>>2]|0;if((c[l+8>>2]|0)==22){p=4312;break}o=c[l>>2]|0;if((f|0)>(d[o+6|0]|0|0)){p=4312;break}p=o+(f+ -1<<4)+16|0}}while(0);k=(c[p>>2]|0)+16+(h+ -1<<2)|0;c[m>>2]=c[k>>2];m=c[k>>2]|0;if((a[m+5|0]&3)==0){i=j;return}if((a[e+5|0]&4)==0){i=j;return}_f(b,e,m);i=j;return}function le(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;g=i;i=i+8|0;h=g;j=i;i=i+8|0;k=i;i=i+8|0;l=i;i=i+8|0;m=i;i=i+8|0;n=i;i=i+8|0;o=i;i=i+104|0;p=i;i=i+104|0;q=_c(b)|0;r=1;s=1;while(1){if((mf(d,r,o)|0)==0){break}else{s=r;r=r<<1}}if((s|0)<(r|0)){t=r;u=s;while(1){s=(t+u|0)/2|0;v=(mf(d,s,o)|0)==0;w=v?s:t;x=v?u:s+1|0;if((x|0)<(w|0)){u=x;t=w}else{y=w;break}}}else{y=r}r=(y+ -1|0)>22?12:0;if((e|0)!=0){c[n>>2]=e;Cd(b,64,n)|0}zd(b,72,16)|0;if((mf(d,f,p)|0)==0){z=_c(b)|0;A=z-q|0;ee(b,A);i=g;return}n=y+ -11|0;y=p+36|0;e=p+20|0;t=p+8|0;u=p+12|0;o=p+24|0;w=p+35|0;x=p+4|0;s=f;while(1){f=s+1|0;if((f|0)==(r|0)){zd(b,96,5)|0;B=n}else{qf(d,104,p)|0;c[m>>2]=y;Cd(b,112,m)|0;v=c[e>>2]|0;if((v|0)>0){c[l>>2]=v;Cd(b,120,l)|0}zd(b,128,4)|0;do{if((a[c[t>>2]|0]|0)==0){v=a[c[u>>2]|0]|0;if(v<<24>>24==67){if((oe(b,p)|0)==0){zd(b,232,1)|0;break}else{c[j>>2]=qd(b,-1,0)|0;Cd(b,904,j)|0;ad(b,-2);break}}else if(v<<24>>24==109){zd(b,920,10)|0;break}else{v=c[o>>2]|0;c[h>>2]=y;c[h+4>>2]=v;Cd(b,936,h)|0;break}}else{c[k>>2]=c[x>>2];Cd(b,904,k)|0}}while(0);if((a[w]|0)!=0){zd(b,136,20)|0}ee(b,(_c(b)|0)-q|0);B=f}if((mf(d,B,p)|0)==0){break}else{s=B}}z=_c(b)|0;A=z-q|0;ee(b,A);i=g;return}function me(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;i=i+16|0;f=e;g=i;i=i+8|0;h=i;i=i+8|0;j=i;i=i+104|0;if((mf(a,0,j)|0)==0){c[h>>2]=b;c[h+4>>2]=d;k=ne(a,160,h)|0;i=e;return k|0}qf(a,184,j)|0;do{if((Nm(c[j+8>>2]|0,192)|0)==0){h=b+ -1|0;if((h|0)!=0){l=h;break}c[g>>2]=c[j+4>>2];c[g+4>>2]=d;k=ne(a,200,g)|0;i=e;return k|0}else{l=b}}while(0);b=j+4|0;g=c[b>>2]|0;if((g|0)==0){if((oe(a,j)|0)==0){m=232}else{m=qd(a,-1,0)|0}c[b>>2]=m;n=m}else{n=g}c[f>>2]=l;c[f+4>>2]=n;c[f+8>>2]=d;k=ne(a,240,f)|0;i=e;return k|0}function ne(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+8|0;f=e;e=i;i=i+104|0;g=i;i=i+16|0;h=g;c[g>>2]=d;do{if((mf(a,1,e)|0)!=0){qf(a,272,e)|0;d=c[e+20>>2]|0;if((d|0)<=0){break}c[f>>2]=e+36;c[f+4>>2]=d;Cd(a,280,f)|0;Bd(a,b,h)|0;ee(a,2);ce(a)|0}}while(0);zd(a,288,0)|0;Bd(a,b,h)|0;ee(a,2);ce(a)|0;return 0}function oe(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=i;d=_c(a)|0;qf(a,888,b)|0;Ld(a,-1001e3,2);b=d+1|0;if((gf(a,b,2)|0)==0){$c(a,d);e=0;i=c;return e|0}else{dd(a,-1,b);$c(a,-3);e=1;i=c;return e|0}return 0}function pe(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;i=i+8|0;e=d;f=i;i=i+104|0;do{if((mf(a,b,f)|0)!=0){qf(a,272,f)|0;g=c[f+20>>2]|0;if((g|0)<=0){break}c[e>>2]=f+36;c[e+4>>2]=g;Cd(a,280,e)|0;i=d;return}}while(0);zd(a,288,0)|0;i=d;return}function qe(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+8|0;f=e;g=c[(pc()|0)>>2]|0;if((b|0)!=0){Ed(a,1);h=1;i=e;return h|0}vd(a);b=sc(g|0)|0;if((d|0)==0){Ad(a,b)|0}else{c[f>>2]=d;c[f+4>>2]=b;Cd(a,296,f)|0}xd(a,g);h=3;i=e;return h|0}function re(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;if((b|0)==0){Ed(a,1)}else if((b|0)==-1){e=c[(pc()|0)>>2]|0;vd(a);Ad(a,sc(e|0)|0)|0;xd(a,e);i=d;return 3}else{vd(a)}Ad(a,304)|0;xd(a,b);i=d;return 3}function se(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;Jd(a,-1001e3,b);if((fd(a,-1)|0)!=0){d=0;i=c;return d|0}$c(a,-2);Md(a,0,0);ed(a,-1);Rd(a,-1001e3,b);d=1;i=c;return d|0}function te(a,b){a=a|0;b=b|0;var c=0;c=i;Jd(a,-1001e3,b);Ud(a,-2)|0;i=c;return}function ue(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;d=i;e=sd(a,b)|0;do{if((e|0)==0){f=0}else{if((Nd(a,b)|0)==0){f=0;break}Jd(a,-1001e3,c);g=(kd(a,-1,-2)|0)==0;$c(a,-3);f=g?0:e}}while(0);i=d;return f|0}function ve(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;i=i+8|0;f=e;g=sd(a,b)|0;do{if((g|0)!=0){if((Nd(a,b)|0)==0){break}Jd(a,-1001e3,d);h=(kd(a,-1,-2)|0)==0;j=h?0:g;$c(a,-3);if((j|0)==0){break}else{k=j}i=e;return k|0}}while(0);g=gd(a,fd(a,b)|0)|0;c[f>>2]=d;c[f+4>>2]=g;me(a,b,Cd(a,864,f)|0)|0;k=0;i=e;return k|0}function we(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;f=i;i=i+8|0;g=f;h=i;i=i+8|0;do{if((d|0)==0){j=qd(a,b,0)|0;if((j|0)!=0){k=j;break}j=gd(a,4)|0;l=gd(a,fd(a,b)|0)|0;c[h>>2]=j;c[h+4>>2]=l;me(a,b,Cd(a,864,h)|0)|0;k=0}else{k=xe(a,b,d,0)|0}}while(0);d=c[e>>2]|0;a:do{if((d|0)!=0){h=d;l=0;while(1){j=l+1|0;if((Nm(h,k)|0)==0){m=l;break}n=c[e+(j<<2)>>2]|0;if((n|0)==0){break a}else{h=n;l=j}}i=f;return m|0}}while(0);c[g>>2]=k;m=me(a,b,Cd(a,312,g)|0)|0;i=f;return m|0}function xe(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;i=i+8|0;g=f;if((fd(a,b)|0)>=1){h=qd(a,b,e)|0;if((h|0)!=0){j=h;i=f;return j|0}h=gd(a,4)|0;k=gd(a,fd(a,b)|0)|0;c[g>>2]=h;c[g+4>>2]=k;me(a,b,Cd(a,864,g)|0)|0;j=0;i=f;return j|0}if((e|0)==0){j=d;i=f;return j|0}if((d|0)==0){l=0}else{l=Um(d|0)|0}c[e>>2]=l;j=d;i=f;return j|0}function ye(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+8|0;f=e;g=qd(a,b,d)|0;if((g|0)!=0){i=e;return g|0}d=gd(a,4)|0;h=gd(a,fd(a,b)|0)|0;c[f>>2]=d;c[f+4>>2]=h;me(a,b,Cd(a,864,f)|0)|0;i=e;return g|0}function ze(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+8|0;f=i;i=i+8|0;if((Uc(a,b+20|0)|0)!=0){i=e;return}if((d|0)==0){ne(a,360,e)|0;i=e;return}else{c[f>>2]=d;ne(a,336,f)|0;i=e;return}}function Ae(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e;if((fd(a,b)|0)==(d|0)){i=e;return}g=gd(a,d)|0;d=gd(a,fd(a,b)|0)|0;c[f>>2]=g;c[f+4>>2]=d;me(a,b,Cd(a,864,f)|0)|0;i=e;return}function Be(a,b){a=a|0;b=b|0;var c=0;c=i;if((fd(a,b)|0)==-1){me(a,b,376)|0}i=c;return}function Ce(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0.0,h=0;d=i;i=i+8|0;e=d;f=i;i=i+8|0;g=+md(a,b,f);if((c[f>>2]|0)!=0){i=d;return+g}f=gd(a,3)|0;h=gd(a,fd(a,b)|0)|0;c[e>>2]=f;c[e+4>>2]=h;me(a,b,Cd(a,864,e)|0)|0;i=d;return+g}function De(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0.0;d=i;if((fd(a,b)|0)<1){e=c}else{e=+Ce(a,b)}i=d;return+e}function Ee(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+8|0;e=d;f=i;i=i+8|0;g=nd(a,b,f)|0;if((c[f>>2]|0)!=0){i=d;return g|0}f=gd(a,3)|0;h=gd(a,fd(a,b)|0)|0;c[e>>2]=f;c[e+4>>2]=h;me(a,b,Cd(a,864,e)|0)|0;i=d;return g|0}function Fe(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+8|0;e=d;f=i;i=i+8|0;g=od(a,b,f)|0;if((c[f>>2]|0)!=0){i=d;return g|0}f=gd(a,3)|0;h=gd(a,fd(a,b)|0)|0;c[e>>2]=f;c[e+4>>2]=h;me(a,b,Cd(a,864,e)|0)|0;i=d;return g|0}function Ge(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;if((fd(a,b)|0)<1){e=c}else{e=Ee(a,b)|0}i=d;return e|0}function He(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;d=i;i=i+8|0;e=c[a+12>>2]|0;f=a+4|0;g=c[f>>2]|0;h=a+8|0;j=c[h>>2]|0;if(!((g-j|0)>>>0<b>>>0)){k=c[a>>2]|0;l=j;m=k+l|0;i=d;return m|0}n=g<<1;g=(n-j|0)>>>0<b>>>0?j+b|0:n;if(g>>>0<j>>>0|(g-j|0)>>>0<b>>>0){ne(e,392,d)|0}b=ge(e,g)|0;j=a;Xm(b|0,c[j>>2]|0,c[h>>2]|0)|0;if((c[j>>2]|0)!=(a+16|0)){ad(e,-2)}c[j>>2]=b;c[f>>2]=g;k=b;l=c[h>>2]|0;m=k+l|0;i=d;return m|0}function Ie(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;e=i;i=i+8|0;f=c[a+12>>2]|0;g=a+4|0;h=c[g>>2]|0;j=a+8|0;k=c[j>>2]|0;if(!((h-k|0)>>>0<d>>>0)){l=c[a>>2]|0;m=k;n=l+m|0;Xm(n|0,b|0,d|0)|0;o=c[j>>2]|0;p=o+d|0;c[j>>2]=p;i=e;return}q=h<<1;h=(q-k|0)>>>0<d>>>0?k+d|0:q;if(h>>>0<k>>>0|(h-k|0)>>>0<d>>>0){ne(f,392,e)|0}k=ge(f,h)|0;q=a;Xm(k|0,c[q>>2]|0,c[j>>2]|0)|0;if((c[q>>2]|0)!=(a+16|0)){ad(f,-2)}c[q>>2]=k;c[g>>2]=h;l=k;m=c[j>>2]|0;n=l+m|0;Xm(n|0,b|0,d|0)|0;o=c[j>>2]|0;p=o+d|0;c[j>>2]=p;i=e;return}function Je(a,b){a=a|0;b=b|0;var c=0;c=i;Ie(a,b,Um(b|0)|0);i=c;return}function Ke(a){a=a|0;var b=0,d=0,e=0;b=i;d=c[a+12>>2]|0;e=a;zd(d,c[e>>2]|0,c[a+8>>2]|0)|0;if((c[e>>2]|0)==(a+16|0)){i=b;return}ad(d,-2);i=b;return}function Le(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;e=a+8|0;f=(c[e>>2]|0)+b|0;c[e>>2]=f;e=c[a+12>>2]|0;b=a;zd(e,c[b>>2]|0,f)|0;if((c[b>>2]|0)==(a+16|0)){i=d;return}ad(e,-2);i=d;return}function Me(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;i=i+8|0;d=b;e=c[a+12>>2]|0;f=qd(e,-1,d)|0;g=a;h=a+16|0;if((c[g>>2]|0)!=(h|0)){bd(e,-2)}Ie(a,f,c[d>>2]|0);ad(e,(c[g>>2]|0)!=(h|0)?-2:-1);i=b;return}function Ne(a,b){a=a|0;b=b|0;c[b+12>>2]=a;c[b>>2]=b+16;c[b+8>>2]=0;c[b+4>>2]=1024;i=i;return}function Oe(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;c[b+12>>2]=a;f=b+16|0;g=b;c[g>>2]=f;h=b+8|0;c[h>>2]=0;j=b+4|0;c[j>>2]=1024;if(!(d>>>0>1024)){k=f;l=0;m=k+l|0;i=e;return m|0}b=d>>>0>2048?d:2048;d=ge(a,b)|0;Xm(d|0,c[g>>2]|0,c[h>>2]|0)|0;if((c[g>>2]|0)!=(f|0)){ad(a,-2)}c[g>>2]=d;c[j>>2]=b;k=d;l=c[h>>2]|0;m=k+l|0;i=e;return m|0}function Pe(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,r=0,s=0,t=0,u=0;f=i;i=i+16|0;g=f;h=i;i=i+16|0;j=i;i=i+16|0;k=i;i=i+8|0;l=i;i=i+1032|0;m=i;i=i+8|0;n=l;o=(_c(b)|0)+1|0;p=(d|0)==0;do{if(p){zd(b,416,6)|0;c[l+4>>2]=c[q>>2]}else{c[k>>2]=d;Cd(b,424,k)|0;r=Xb(d|0,432)|0;c[l+4>>2]=r;if((r|0)!=0){break}r=sc(c[(pc()|0)>>2]|0)|0;s=(qd(b,o,0)|0)+1|0;c[j>>2]=440;c[j+4>>2]=s;c[j+8>>2]=r;Cd(b,840,j)|0;ad(b,o);t=7;i=f;return t|0}}while(0);if((Qe(l,m)|0)!=0){j=l;k=c[j>>2]|0;c[j>>2]=k+1;a[l+k+8|0]=10}k=c[m>>2]|0;do{if((k|0)!=27|p){u=k}else{j=l+4|0;r=ub(d|0,448,c[j>>2]|0)|0;c[j>>2]=r;if((r|0)!=0){Qe(l,m)|0;u=c[m>>2]|0;break}r=sc(c[(pc()|0)>>2]|0)|0;j=(qd(b,o,0)|0)+1|0;c[h>>2]=456;c[h+4>>2]=j;c[h+8>>2]=r;Cd(b,840,h)|0;ad(b,o);t=7;i=f;return t|0}}while(0);if(!((u|0)==-1)){h=l;m=c[h>>2]|0;c[h>>2]=m+1;a[l+m+8|0]=u}u=_d(b,1,n,qd(b,-1,0)|0,e)|0;e=c[l+4>>2]|0;l=Ga(e|0)|0;if(!p){Nb(e|0)|0}if((l|0)==0){ad(b,o);t=u;i=f;return t|0}else{$c(b,o);u=sc(c[(pc()|0)>>2]|0)|0;l=(qd(b,o,0)|0)+1|0;c[g>>2]=464;c[g+4>>2]=l;c[g+8>>2]=u;Cd(b,840,g)|0;ad(b,o);t=7;i=f;return t|0}return 0}function Qe(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;g=b;c[g>>2]=0;h=b+4|0;j=832;while(1){k=wb(c[h>>2]|0)|0;if((k|0)==-1){l=3;break}m=j+1|0;if((k|0)!=(d[j]|0)){n=k;break}o=c[g>>2]|0;c[g>>2]=o+1;a[b+o+8|0]=k;if((a[m]|0)==0){l=6;break}else{j=m}}if((l|0)==3){c[e>>2]=-1;p=0;i=f;return p|0}else if((l|0)==6){c[g>>2]=0;n=wb(c[h>>2]|0)|0}c[e>>2]=n;if((n|0)!=35){p=0;i=f;return p|0}do{n=wb(c[h>>2]|0)|0}while(!((n|0)==10|(n|0)==-1));c[e>>2]=wb(c[h>>2]|0)|0;p=1;i=f;return p|0}function Re(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;a=i;e=b;f=c[e>>2]|0;if((f|0)>0){c[d>>2]=f;c[e>>2]=0;g=b+8|0;i=a;return g|0}e=b+4|0;if((oc(c[e>>2]|0)|0)!=0){g=0;i=a;return g|0}f=b+8|0;c[d>>2]=ta(f|0,1,1024,c[e>>2]|0)|0;g=f;i=a;return g|0}function Se(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;i=i+8|0;h=g;c[h>>2]=b;c[h+4>>2]=d;d=_d(a,2,h,e,f)|0;i=g;return d|0}function Te(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;a=i;e=b+4|0;f=c[e>>2]|0;if((f|0)==0){g=0;i=a;return g|0}c[d>>2]=f;c[e>>2]=0;g=c[b>>2]|0;i=a;return g|0}function Ue(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;do{if((Nd(a,b)|0)==0){e=0}else{Ad(a,c)|0;Kd(a,-2);if((fd(a,-1)|0)==0){$c(a,-3);e=0;break}else{ad(a,-2);e=1;break}}}while(0);i=d;return e|0}function Ve(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=i;e=Zc(a,b)|0;if((Nd(a,e)|0)==0){f=0;i=d;return f|0}Ad(a,c)|0;Kd(a,-2);if((fd(a,-1)|0)==0){$c(a,-3);f=0;i=d;return f|0}else{ad(a,-2);ed(a,e);Xd(a,1,1,0,0);f=1;i=d;return f|0}return 0}function We(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;i=i+8|0;e=i;i=i+8|0;fe(a,b);b=nd(a,-1,e)|0;if((c[e>>2]|0)!=0){$c(a,-2);i=d;return b|0}ne(a,472,d)|0;$c(a,-2);i=d;return b|0}function Xe(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+8|0;f=e;do{if((Ve(a,b,504)|0)==0){g=fd(a,b)|0;if((g|0)==1){h=(pd(a,b)|0)!=0;Ad(a,h?520:528)|0;break}else if((g|0)==4|(g|0)==3){ed(a,b);break}else if((g|0)==0){zd(a,536,3)|0;break}else{g=gd(a,fd(a,b)|0)|0;h=ud(a,b)|0;c[f>>2]=g;c[f+4>>2]=h;Cd(a,544,f)|0;break}}}while(0);f=qd(a,-1,d)|0;i=e;return f|0}function Ye(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+8|0;f=e;Ze(a,-1001e3,552,1)|0;Jd(a,-1,b);if((fd(a,-1)|0)==5){ad(a,-2);i=e;return}$c(a,-2);Ld(a,-1001e3,2);if((Ze(a,0,b,d)|0)!=0){c[f>>2]=b;ne(a,560,f)|0}ed(a,-1);Rd(a,-3,b);ad(a,-2);i=e;return}function Ze(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;if((c|0)==0){g=d}else{ed(b,c);g=d}while(1){d=hb(g|0,46)|0;if((d|0)==0){h=g+(Um(g|0)|0)|0}else{h=d}d=h-g|0;zd(b,g,d)|0;Kd(b,-2);if((fd(b,-1)|0)==0){$c(b,-2);Md(b,0,(a[h]|0)==46?1:e);zd(b,g,d)|0;ed(b,-2);Qd(b,-4)}else{if((fd(b,-1)|0)!=5){break}}ad(b,-2);if((a[h]|0)==46){g=h+1|0}else{j=0;k=10;break}}if((k|0)==10){i=f;return j|0}$c(b,-3);j=g;i=f;return j|0}function _e(a,b){a=a|0;b=+b;var d=0,e=0,f=0,g=0,j=0,l=0.0,m=0;d=i;i=i+8|0;e=d;f=i;i=i+16|0;g=i;i=i+8|0;j=Yc(a)|0;do{if((j|0)==(Yc(0)|0)){l=+h[j>>3];if(!(l!=b)){break}m=f;h[k>>3]=b;c[m>>2]=c[k>>2];c[m+4>>2]=c[k+4>>2];m=f+8|0;h[k>>3]=l;c[m>>2]=c[k>>2];c[m+4>>2]=c[k+4>>2];ne(a,648,f)|0}else{ne(a,616,g)|0}}while(0);wd(a,-4660.0);do{if((nd(a,-1,0)|0)==-4660){if(!((od(a,-1,0)|0)==-4660)){break}$c(a,-2);i=d;return}}while(0);ne(a,704,e)|0;$c(a,-2);i=d;return}function $e(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;i=i+8|0;f=e;_e(a,502.0);if((Uc(a,d+20|0)|0)==0){c[f>>2]=592;ne(a,336,f)|0}f=b;if((c[f>>2]|0)==0){g=~d;$c(a,g);i=e;return}b=-2-d|0;h=0-d|0;if((d|0)>0){j=f}else{k=f;do{Dd(a,c[k+4>>2]|0,d);Rd(a,b,c[k>>2]|0);k=k+8|0;}while((c[k>>2]|0)!=0);g=~d;$c(a,g);i=e;return}do{k=0;do{ed(a,h);k=k+1|0;}while((k|0)!=(d|0));Dd(a,c[j+4>>2]|0,d);Rd(a,b,c[j>>2]|0);j=j+8|0;}while((c[j>>2]|0)!=0);g=~d;$c(a,g);i=e;return}function af(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=i;Jd(a,b,c);if((fd(a,-1)|0)==5){e=1;i=d;return e|0}$c(a,-2);f=Zc(a,b)|0;Md(a,0,0);ed(a,-1);Rd(a,f,c);e=0;i=d;return e|0}function bf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=i;Dd(a,c,0);Ad(a,b)|0;Xd(a,1,1,0,0);af(a,-1001e3,552)|0;ed(a,-2);Rd(a,-2,b);$c(a,-2);if((d|0)==0){i=e;return}ed(a,-1);Pd(a,b);i=e;return}function cf(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;f=i;i=i+8|0;g=f;h=i;i=i+8|0;j=i;i=i+8|0;k=i;i=i+1040|0;l=Um(d|0)|0;m=k+12|0;c[m>>2]=a;n=k+16|0;o=k;c[o>>2]=n;p=k+8|0;c[p>>2]=0;q=k+4|0;c[q>>2]=1024;k=Qa(b|0,d|0)|0;if((k|0)==0){r=b;s=0;t=1024;u=a}else{v=b;b=1024;w=a;x=0;y=k;while(1){k=y-v|0;if((b-x|0)>>>0<k>>>0){z=b<<1;A=(z-x|0)>>>0<k>>>0?x+k|0:z;if(A>>>0<x>>>0|(A-x|0)>>>0<k>>>0){ne(w,392,j)|0}z=ge(w,A)|0;Xm(z|0,c[o>>2]|0,c[p>>2]|0)|0;if((c[o>>2]|0)!=(n|0)){ad(w,-2)}c[o>>2]=z;c[q>>2]=A;B=z;C=c[p>>2]|0}else{B=c[o>>2]|0;C=x}Xm(B+C|0,v|0,k|0)|0;z=(c[p>>2]|0)+k|0;c[p>>2]=z;k=Um(e|0)|0;A=c[m>>2]|0;D=c[q>>2]|0;if((D-z|0)>>>0<k>>>0){E=D<<1;D=(E-z|0)>>>0<k>>>0?z+k|0:E;if(D>>>0<z>>>0|(D-z|0)>>>0<k>>>0){ne(A,392,h)|0}E=ge(A,D)|0;Xm(E|0,c[o>>2]|0,c[p>>2]|0)|0;if((c[o>>2]|0)!=(n|0)){ad(A,-2)}c[o>>2]=E;c[q>>2]=D;F=E;G=c[p>>2]|0}else{F=c[o>>2]|0;G=z}Xm(F+G|0,e|0,k|0)|0;z=(c[p>>2]|0)+k|0;c[p>>2]=z;k=y+l|0;E=Qa(k|0,d|0)|0;D=c[m>>2]|0;A=c[q>>2]|0;if((E|0)==0){r=k;s=z;t=A;u=D;break}else{v=k;b=A;w=D;x=z;y=E}}}y=Um(r|0)|0;if((t-s|0)>>>0<y>>>0){x=t<<1;t=(x-s|0)>>>0<y>>>0?s+y|0:x;if(t>>>0<s>>>0|(t-s|0)>>>0<y>>>0){ne(u,392,g)|0}g=ge(u,t)|0;Xm(g|0,c[o>>2]|0,c[p>>2]|0)|0;if((c[o>>2]|0)!=(n|0)){ad(u,-2)}c[o>>2]=g;c[q>>2]=t;H=g;I=c[p>>2]|0}else{H=c[o>>2]|0;I=s}Xm(H+I|0,r|0,y|0)|0;r=(c[p>>2]|0)+y|0;c[p>>2]=r;p=c[m>>2]|0;zd(p,c[o>>2]|0,r)|0;if((c[o>>2]|0)==(n|0)){J=qd(a,-1,0)|0;i=f;return J|0}ad(p,-2);J=qd(a,-1,0)|0;i=f;return J|0}function df(){var a=0,b=0;a=i;b=Ki(1,0)|0;if((b|0)!=0){Xc(b,141)|0}i=a;return b|0}function ef(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;c=i;if((d|0)==0){zm(b);e=0}else{e=Am(b,d)|0}i=c;return e|0}function ff(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=b;e=c[p>>2]|0;c[d>>2]=qd(a,-1,0)|0;sb(e|0,776,d|0)|0;ec(e|0)|0;i=b;return 0}function gf(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;d=i;a:do{if((c|0)==0){e=0}else{if((fd(a,-1)|0)!=5){e=0;break}vd(a);if((de(a,-2)|0)==0){e=0;break}f=c+ -1|0;while(1){if((fd(a,-2)|0)==4){if((kd(a,b,-1)|0)!=0){g=7;break}if((gf(a,b,f)|0)!=0){g=9;break}}$c(a,-2);if((de(a,-2)|0)==0){e=0;break a}}if((g|0)==7){$c(a,-2);e=1;break}else if((g|0)==9){ad(a,-2);zd(a,896,1)|0;bd(a,-2);ee(a,3);e=1;break}}}while(0);i=d;return e|0}function hf(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=(d|0)==0|(e|0)==0;h=c[b+16>>2]|0;if(!((a[h+18|0]&1)==0)){c[b+20>>2]=c[h+28>>2]}c[b+52>>2]=g?0:d;c[b+44>>2]=f;c[b+48>>2]=f;a[b+40|0]=g?0:e&255;i=i;return 1}function jf(a){a=a|0;i=i;return c[a+52>>2]|0}function kf(a){a=a|0;i=i;return d[a+40|0]|0|0}function lf(a){a=a|0;i=i;return c[a+44>>2]|0}function mf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;a:do{if((b|0)<0){f=0}else{g=c[a+16>>2]|0;if((b|0)>0){h=a+72|0;j=b;k=g;do{if((k|0)==(h|0)){f=0;break a}j=j+ -1|0;k=c[k+8>>2]|0;}while((j|0)>0);if((j|0)==0){l=k}else{f=0;break}}else{l=g}if((l|0)==(a+72|0)){f=0;break}c[d+96>>2]=l;f=1}}while(0);i=e;return f|0}function nf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;i=i+8|0;f=e;if((b|0)==0){g=c[a+8>>2]|0;if((c[g+ -8>>2]|0)!=70){h=0;i=e;return h|0}h=Zf(c[(c[g+ -16>>2]|0)+12>>2]|0,d,0)|0;i=e;return h|0}else{c[f>>2]=0;g=of(a,c[b+96>>2]|0,d,f)|0;if((g|0)==0){h=0;i=e;return h|0}d=c[f>>2]|0;f=a+8|0;a=c[f>>2]|0;b=d;j=c[b+4>>2]|0;k=a;c[k>>2]=c[b>>2];c[k+4>>2]=j;c[a+8>>2]=c[d+8>>2];c[f>>2]=(c[f>>2]|0)+16;h=g;i=e;return h|0}return 0}function of(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;h=i;do{if((a[e+18|0]&1)==0){j=(c[e>>2]|0)+16|0;k=7}else{if((f|0)>=0){l=c[e+24>>2]|0;m=c[(c[c[e>>2]>>2]|0)+12>>2]|0;n=Zf(m,f,((c[e+28>>2]|0)-(c[m+12>>2]|0)>>2)+ -1|0)|0;if((n|0)==0){j=l;k=7;break}else{o=l;p=n;break}}n=c[e>>2]|0;l=d[(c[(c[n>>2]|0)+12>>2]|0)+76|0]|0;if((((c[e+24>>2]|0)-n>>4)-l|0)<=(0-f|0)){q=0;i=h;return q|0}c[g>>2]=n+(l-f<<4);q=1328;i=h;return q|0}}while(0);do{if((k|0)==7){if((c[b+16>>2]|0)==(e|0)){r=b+8|0}else{r=c[e+12>>2]|0}if(((c[r>>2]|0)-j>>4|0)>=(f|0)&(f|0)>0){o=j;p=1312;break}else{q=0}i=h;return q|0}}while(0);c[g>>2]=o+(f+ -1<<4);q=p;i=h;return q|0}function pf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;i=i+8|0;f=e;c[f>>2]=0;g=of(a,c[b+96>>2]|0,d,f)|0;d=a+8|0;if((g|0)==0){h=c[d>>2]|0;j=h+ -16|0;c[d>>2]=j;i=e;return g|0}a=c[d>>2]|0;b=c[f>>2]|0;f=a+ -16|0;k=c[f+4>>2]|0;l=b;c[l>>2]=c[f>>2];c[l+4>>2]=k;c[b+8>>2]=c[a+ -8>>2];h=c[d>>2]|0;j=h+ -16|0;c[d>>2]=j;i=e;return g|0}function qf(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0;g=i;i=i+16|0;h=g;if((a[e]|0)==62){j=b+8|0;k=(c[j>>2]|0)+ -16|0;c[j>>2]=k;l=e+1|0;m=0;n=k}else{k=c[f+96>>2]|0;l=e;m=k;n=c[k>>2]|0}k=n+8|0;if((c[k>>2]&31|0)==6){o=c[n>>2]|0}else{o=0}e=a[l]|0;a:do{if(e<<24>>24==0){p=1}else{j=(o|0)==0;q=f+16|0;r=f+24|0;s=f+28|0;t=f+12|0;u=f+36|0;v=o+4|0;w=o+12|0;x=(m|0)==0;y=f+20|0;z=m+18|0;A=m;B=m+28|0;C=f+32|0;D=f+34|0;E=f+33|0;F=o+6|0;G=f+35|0;H=f+8|0;I=f+4|0;J=m+8|0;K=b+12|0;L=l;M=e;N=1;while(1){b:do{switch(M<<24>>24|0){case 83:{do{if(j){O=11}else{if((a[v]|0)==38){O=11;break}P=c[w>>2]|0;Q=c[P+36>>2]|0;if((Q|0)==0){R=1288}else{R=Q+16|0}c[q>>2]=R;Q=c[P+64>>2]|0;c[r>>2]=Q;c[s>>2]=c[P+68>>2];S=R;T=(Q|0)==0?1296:1304}}while(0);if((O|0)==11){O=0;c[q>>2]=1272;c[r>>2]=-1;c[s>>2]=-1;S=1272;T=1280}c[t>>2]=T;Yh(u,S,60);U=N;break};case 108:{do{if(x){V=-1}else{if((a[z]&1)==0){V=-1;break}Q=c[(c[c[A>>2]>>2]|0)+12>>2]|0;P=c[Q+20>>2]|0;if((P|0)==0){V=0;break}V=c[P+(((c[B>>2]|0)-(c[Q+12>>2]|0)>>2)+ -1<<2)>>2]|0}}while(0);c[y>>2]=V;U=N;break};case 117:{do{if(j){a[C]=0}else{a[C]=a[F]|0;if((a[v]|0)==38){break}a[D]=a[(c[w>>2]|0)+77|0]|0;a[E]=a[(c[w>>2]|0)+76|0]|0;U=N;break b}}while(0);a[D]=1;a[E]=0;U=N;break};case 116:{if(x){W=0}else{W=d[z]&64}a[G]=W;U=N;break};case 110:{c:do{if(x){O=47}else{if(!((a[z]&64)==0)){O=47;break}Q=c[J>>2]|0;if((a[Q+18|0]&1)==0){O=47;break}P=c[(c[c[Q>>2]>>2]|0)+12>>2]|0;X=c[P+12>>2]|0;Y=((c[Q+28>>2]|0)-X>>2)+ -1|0;Q=c[X+(Y<<2)>>2]|0;switch(Q&63|0){case 10:case 8:{Z=1;O=46;break};case 24:{Z=5;O=46;break};case 13:{Z=6;O=46;break};case 14:{Z=7;O=46;break};case 15:{Z=8;O=46;break};case 16:{Z=9;O=46;break};case 17:{Z=10;O=46;break};case 18:{Z=11;O=46;break};case 19:{Z=12;O=46;break};case 21:{Z=4;O=46;break};case 25:{Z=13;O=46;break};case 26:{Z=14;O=46;break};case 22:{Z=15;O=46;break};case 7:case 6:case 12:{Z=0;O=46;break};case 34:{_=1240;$=1240;break};case 30:case 29:{X=sf(P,Y,Q>>>6&255,I)|0;c[H>>2]=X;if((X|0)==0){break c}else{U=N;break b}break};default:{O=47;break c}}if((O|0)==46){O=0;_=(c[(c[K>>2]|0)+(Z<<2)+184>>2]|0)+16|0;$=1256}c[I>>2]=_;c[H>>2]=$;U=N;break b}}while(0);if((O|0)==47){O=0;c[H>>2]=0}c[H>>2]=1232;c[I>>2]=0;U=N;break};case 102:case 76:{U=N;break};default:{U=0}}}while(0);X=L+1|0;Q=a[X]|0;if(Q<<24>>24==0){p=U;break a}else{L=X;M=Q;N=U}}}}while(0);if((hb(l|0,102)|0)!=0){U=b+8|0;O=c[U>>2]|0;$=n;n=c[$+4>>2]|0;_=O;c[_>>2]=c[$>>2];c[_+4>>2]=n;c[O+8>>2]=c[k>>2];c[U>>2]=(c[U>>2]|0)+16}if((hb(l|0,76)|0)==0){i=g;return p|0}do{if((o|0)!=0){if((a[o+4|0]|0)==38){break}l=o+12|0;U=c[(c[l>>2]|0)+20>>2]|0;k=uj(b)|0;O=b+8|0;n=c[O>>2]|0;c[n>>2]=k;c[n+8>>2]=69;c[O>>2]=(c[O>>2]|0)+16;c[h>>2]=1;c[h+8>>2]=1;if((c[(c[l>>2]|0)+52>>2]|0)>0){aa=0}else{i=g;return p|0}do{rj(b,k,c[U+(aa<<2)>>2]|0,h);aa=aa+1|0;}while((aa|0)<(c[(c[l>>2]|0)+52>>2]|0));i=g;return p|0}}while(0);aa=b+8|0;b=c[aa>>2]|0;c[b+8>>2]=0;c[aa>>2]=b+16;i=g;return p|0}function rf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;f=i;i=i+8|0;g=f;f=i;i=i+16|0;h=i;i=i+8|0;j=c[b+16>>2]|0;c[h>>2]=0;k=c[7648+((c[d+8>>2]&15)+1<<2)>>2]|0;a:do{if(!((a[j+18|0]&1)==0)){l=c[c[j>>2]>>2]|0;m=a[l+6|0]|0;b:do{if(!(m<<24>>24==0)){n=l+16|0;o=m&255;p=0;while(1){q=p+1|0;if((c[(c[n+(p<<2)>>2]|0)+8>>2]|0)==(d|0)){break}if((q|0)<(o|0)){p=q}else{break b}}o=c[(c[(c[l+12>>2]|0)+28>>2]|0)+(p<<3)>>2]|0;if((o|0)==0){r=1224}else{r=o+16|0}c[h>>2]=r;s=r;t=1192;u=f;c[u>>2]=e;v=f+4|0;c[v>>2]=t;w=f+8|0;c[w>>2]=s;x=f+12|0;c[x>>2]=k;tf(b,960,f)}}while(0);m=c[j+24>>2]|0;o=c[j+4>>2]|0;if(m>>>0<o>>>0){y=m}else{break}while(1){n=y+16|0;if((y|0)==(d|0)){break}if(n>>>0<o>>>0){y=n}else{break a}}o=c[l+12>>2]|0;n=sf(o,((c[j+28>>2]|0)-(c[o+12>>2]|0)>>2)+ -1|0,d-m>>4,h)|0;if((n|0)==0){break}s=c[h>>2]|0;t=n;u=f;c[u>>2]=e;v=f+4|0;c[v>>2]=t;w=f+8|0;c[w>>2]=s;x=f+12|0;c[x>>2]=k;tf(b,960,f)}}while(0);c[g>>2]=e;c[g+4>>2]=k;tf(b,1e3,g)}function sf(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;g=i;h=b+12|0;j=d;d=e;a:while(1){e=Zf(b,d+1|0,j)|0;c[f>>2]=e;if((e|0)!=0){k=1160;l=47;break}if((j|0)<=0){k=0;l=47;break}m=c[h>>2]|0;e=0;n=0;o=-1;while(1){p=c[m+(n<<2)>>2]|0;q=p&63;r=p>>>6&255;b:do{switch(q|0){case 27:{if((r|0)!=(d|0)){s=e;t=o;break b}s=e;t=(n|0)<(e|0)?-1:n;break};case 34:{if((r+2|0)>(d|0)){s=e;t=o;break b}s=e;t=(n|0)<(e|0)?-1:n;break};case 30:case 29:{if((r|0)>(d|0)){s=e;t=o;break b}s=e;t=(n|0)<(e|0)?-1:n;break};case 4:{if((r|0)>(d|0)){s=e;t=o;break b}if((r+(p>>>23)|0)<(d|0)){s=e;t=o;break b}s=e;t=(n|0)<(e|0)?-1:n;break};case 23:{u=n+ -131070+(p>>>14)|0;s=(u|0)<=(j|0)&(n|0)<(u|0)&(u|0)>(e|0)?u:e;t=o;break};default:{if(!((a[4704+q|0]&64)!=0&(r|0)==(d|0))){s=e;t=o;break b}s=e;t=(n|0)<(e|0)?-1:n}}}while(0);r=n+1|0;if((r|0)==(j|0)){break}else{e=s;n=r;o=t}}if((t|0)==-1){k=0;l=47;break}v=c[m+(t<<2)>>2]|0;w=v&63;switch(w|0){case 12:{l=41;break a;break};case 7:case 6:{l=22;break a;break};case 5:{l=34;break a;break};case 0:{break};case 1:{l=37;break a;break};case 2:{l=38;break a;break};default:{k=0;l=47;break a}}o=v>>>23;if(o>>>0<(v>>>6&255)>>>0){j=t;d=o}else{k=0;l=47;break}}if((l|0)==22){d=v>>>14;j=d&511;s=v>>>23;do{if((w|0)==7){x=Zf(b,s+1|0,t)|0}else{h=c[(c[b+28>>2]|0)+(s<<3)>>2]|0;if((h|0)==0){x=1224;break}x=h+16|0}}while(0);do{if((d&256|0)==0){s=sf(b,t,j,f)|0;if((s|0)==0){l=31;break}if((a[s]|0)!=99){l=31}}else{s=d&255;w=c[b+8>>2]|0;if((c[w+(s<<4)+8>>2]&15|0)!=4){l=31;break}c[f>>2]=(c[w+(s<<4)>>2]|0)+16}}while(0);if((l|0)==31){c[f>>2]=1224}if((x|0)==0){k=1184;i=g;return k|0}d=(Nm(x,1168)|0)==0;k=d?1176:1184;i=g;return k|0}else if((l|0)==34){d=c[(c[b+28>>2]|0)+(v>>>23<<3)>>2]|0;if((d|0)==0){y=1224}else{y=d+16|0}c[f>>2]=y;k=1192;i=g;return k|0}else if((l|0)==37){z=v>>>14}else if((l|0)==38){z=(c[m+(t+1<<2)>>2]|0)>>>6}else if((l|0)==41){m=v>>>14;do{if((m&256|0)==0){v=sf(b,t,m&511,f)|0;if((v|0)==0){break}if((a[v]|0)==99){k=1216}else{break}i=g;return k|0}else{v=m&255;y=c[b+8>>2]|0;if((c[y+(v<<4)+8>>2]&15|0)!=4){break}c[f>>2]=(c[y+(v<<4)>>2]|0)+16;k=1216;i=g;return k|0}}while(0);c[f>>2]=1224;k=1216;i=g;return k|0}else if((l|0)==47){i=g;return k|0}l=c[b+8>>2]|0;if((c[l+(z<<4)+8>>2]&15|0)!=4){k=0;i=g;return k|0}c[f>>2]=(c[l+(z<<4)>>2]|0)+16;k=1200;i=g;return k|0}function tf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;i=i+16|0;g=f;f=i;i=i+64|0;h=i;i=i+16|0;c[h>>2]=e;e=Wh(b,d,h)|0;h=c[b+16>>2]|0;if((a[h+18|0]&1)==0){xf(b)}d=f;j=c[(c[c[h>>2]>>2]|0)+12>>2]|0;k=c[j+20>>2]|0;if((k|0)==0){l=0}else{l=c[k+(((c[h+28>>2]|0)-(c[j+12>>2]|0)>>2)+ -1<<2)>>2]|0}h=c[j+36>>2]|0;if((h|0)==0){a[d]=63;a[f+1|0]=0}else{Yh(d,h+16|0,60)}c[g>>2]=d;c[g+4>>2]=l;c[g+8>>2]=e;Xh(b,1144,g)|0;xf(b)}function uf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+8>>2]|0;rf(a,(e&15|0)==4|(e|0)==3?d:b,1032)}function vf(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;i=i+16|0;e=(Tj(b,d)|0)==0;rf(a,e?b:c,1048)}function wf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e;e=i;i=i+8|0;g=c[7648+((c[b+8>>2]&15)+1<<2)>>2]|0;b=c[7648+((c[d+8>>2]&15)+1<<2)>>2]|0;if((g|0)==(b|0)){c[e>>2]=g;tf(a,1072,e)}else{c[f>>2]=g;c[f+4>>2]=b;tf(a,1112,f)}}function xf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;b=c[a+68>>2]|0;if((b|0)==0){yf(a,2)}d=c[a+28>>2]|0;e=d+(b+8)|0;if((c[e>>2]&15|0)!=6){yf(a,6)}f=a+8|0;g=c[f>>2]|0;h=g+ -16|0;i=c[h+4>>2]|0;j=g;c[j>>2]=c[h>>2];c[j+4>>2]=i;c[g+8>>2]=c[g+ -8>>2];g=c[f>>2]|0;i=d+b|0;b=c[i+4>>2]|0;d=g+ -16|0;c[d>>2]=c[i>>2];c[d+4>>2]=b;c[g+ -8>>2]=c[e>>2];e=c[f>>2]|0;c[f>>2]=e+16;Gf(a,e+ -16|0,1,0);yf(a,2)}function yf(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;e=b+64|0;f=c[e>>2]|0;if((f|0)!=0){c[f+160>>2]=d;xa((c[e>>2]|0)+4|0,1)}a[b+6|0]=d;e=b+12|0;f=c[e>>2]|0;g=c[f+172>>2]|0;if((c[g+64>>2]|0)!=0){h=c[b+8>>2]|0;i=g+8|0;g=c[i>>2]|0;c[i>>2]=g+16;i=h+ -16|0;j=c[i+4>>2]|0;k=g;c[k>>2]=c[i>>2];c[k+4>>2]=j;c[g+8>>2]=c[h+ -8>>2];yf(c[(c[e>>2]|0)+172>>2]|0,d)}d=c[f+168>>2]|0;if((d|0)==0){Xa()}xc[d&255](b)|0;Xa()}function zf(a,d,e){a=a|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,u=0,v=0;f=i;g=i;i=i+168|0;c[g>>2]=0;h=i;i=i+168|0;j=a+38|0;k=b[j>>1]|0;l=h+160|0;c[l>>2]=0;m=a+64|0;n=h;c[n>>2]=c[m>>2];c[m>>2]=h;Vm(h+4|0,1,g|0)|0;s=0;h=s;s=0;if((h|0)!=0&(t|0)!=0){o=Wm(c[h>>2]|0,g)|0;if((o|0)==0){xa(h|0,t|0)}H=t}else{o=-1}if((o|0)==1){p=H}else{p=0}while(1){if((p|0)!=0){q=6;break}s=0;la(d|0,a|0,e|0);o=s;s=0;if((o|0)!=0&(t|0)!=0){r=Wm(c[o>>2]|0,g)|0;if((r|0)==0){xa(o|0,t|0)}H=t}else{r=-1}if((r|0)==1){p=H}else{break}}if((q|0)==6){u=c[n>>2]|0;c[m>>2]=u;b[j>>1]=k;v=c[l>>2]|0;i=f;return v|0}u=c[n>>2]|0;c[m>>2]=u;b[j>>1]=k;v=c[l>>2]|0;i=f;return v|0}function Af(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;f=b+28|0;g=c[f>>2]|0;h=b+32|0;j=c[h>>2]|0;if((d+1|0)>>>0>268435455){zh(b)}k=Ah(b,g,j<<4,d<<4)|0;c[f>>2]=k;if((j|0)<(d|0)){l=j;do{c[k+(l<<4)+8>>2]=0;l=l+1|0;}while((l|0)!=(d|0))}c[h>>2]=d;c[b+24>>2]=k+(d+ -5<<4);d=b+8|0;h=g;c[d>>2]=k+((c[d>>2]|0)-h>>4<<4);d=c[b+56>>2]|0;do{if((d|0)!=0){g=d+8|0;c[g>>2]=k+((c[g>>2]|0)-h>>4<<4);g=c[d>>2]|0;if((g|0)==0){break}else{m=g}do{g=m+8|0;c[g>>2]=(c[f>>2]|0)+((c[g>>2]|0)-h>>4<<4);m=c[m>>2]|0;}while((m|0)!=0)}}while(0);m=c[b+16>>2]|0;if((m|0)==0){i=e;return}else{n=m}do{m=n+4|0;c[m>>2]=(c[f>>2]|0)+((c[m>>2]|0)-h>>4<<4);m=n;c[m>>2]=(c[f>>2]|0)+((c[m>>2]|0)-h>>4<<4);if(!((a[n+18|0]&1)==0)){m=n+24|0;c[m>>2]=(c[f>>2]|0)+((c[m>>2]|0)-h>>4<<4)}n=c[n+8>>2]|0;}while((n|0)!=0);i=e;return}function Bf(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;i=i+8|0;e=c[a+32>>2]|0;if((e|0)>1e6){yf(a,6)}f=b+5+((c[a+8>>2]|0)-(c[a+28>>2]|0)>>4)|0;b=e<<1;e=(b|0)>1e6?1e6:b;b=(e|0)<(f|0)?f:e;if((b|0)>1e6){Af(a,1000200);tf(a,1344,d)}else{Af(a,b);i=d;return}}function Cf(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;d=c[a+8>>2]|0;e=c[a+16>>2]|0;if((e|0)==0){f=d}else{g=e;e=d;while(1){d=c[g+4>>2]|0;h=e>>>0<d>>>0?d:e;d=c[g+8>>2]|0;if((d|0)==0){f=h;break}else{e=h;g=d}}}g=f-(c[a+28>>2]|0)|0;f=(g>>4)+1|0;e=((f|0)/8|0)+10+f|0;f=(e|0)>1e6?1e6:e;if((g|0)>15999984){i=b;return}if((f|0)>=(c[a+32>>2]|0)){i=b;return}Af(a,f);i=b;return}function Df(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;i=i+8|0;h=g;j=i;i=i+104|0;k=c[b+52>>2]|0;if((k|0)==0){i=g;return}l=b+41|0;if((a[l]|0)==0){i=g;return}m=c[b+16>>2]|0;n=b+8|0;o=c[n>>2]|0;p=b+28|0;q=o;r=c[p>>2]|0;s=q-r|0;t=m+4|0;u=(c[t>>2]|0)-r|0;c[j>>2]=e;c[j+20>>2]=f;c[j+96>>2]=m;do{if(((c[b+24>>2]|0)-q|0)<336){f=c[b+32>>2]|0;if((f|0)>1e6){yf(b,6)}e=(s>>4)+25|0;r=f<<1;f=(r|0)>1e6?1e6:r;r=(f|0)<(e|0)?e:f;if((r|0)>1e6){Af(b,1000200);tf(b,1344,h)}else{Af(b,r);v=c[n>>2]|0;break}}else{v=o}}while(0);c[t>>2]=v+320;a[l]=0;v=m+18|0;a[v]=d[v]|2;zc[k&15](b,j);a[l]=1;c[t>>2]=(c[p>>2]|0)+u;c[n>>2]=(c[p>>2]|0)+s;a[v]=a[v]&253;i=g;return}function Ef(e,f,g){e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;h=i;i=i+8|0;j=h;k=i;i=i+8|0;l=i;i=i+8|0;m=i;i=i+8|0;n=e+28|0;o=e+8|0;p=e+24|0;q=e+32|0;r=f;while(1){s=r;t=c[n>>2]|0;u=s-t|0;f=c[r+8>>2]&63;if((f|0)==22){v=3;break}else if((f|0)==38){v=4;break}else if((f|0)==6){v=31;break}f=Oj(e,r,16)|0;w=s-(c[n>>2]|0)|0;x=f+8|0;if((c[x>>2]&15|0)!=6){v=62;break}y=c[o>>2]|0;if(y>>>0>r>>>0){z=y;while(1){A=z+ -16|0;B=A;C=c[B+4>>2]|0;D=z;c[D>>2]=c[B>>2];c[D+4>>2]=C;c[z+8>>2]=c[z+ -8>>2];if(A>>>0>r>>>0){z=A}else{break}}E=c[o>>2]|0}else{E=y}z=E+16|0;c[o>>2]=z;A=z;if(((c[p>>2]|0)-A|0)<16){z=c[q>>2]|0;if((z|0)>1e6){v=68;break}C=(A-(c[n>>2]|0)>>4)+5|0;A=z<<1;z=(A|0)>1e6?1e6:A;A=(z|0)<(C|0)?C:z;if((A|0)>1e6){v=70;break}Af(e,A)}A=c[n>>2]|0;z=A+w|0;C=f;D=c[C+4>>2]|0;B=z;c[B>>2]=c[C>>2];c[B+4>>2]=D;c[A+(w+8)>>2]=c[x>>2];r=z}if((v|0)==3){F=r}else if((v|0)==4){F=(c[r>>2]|0)+12|0}else if((v|0)==31){E=c[(c[r>>2]|0)+12>>2]|0;z=c[o>>2]|0;A=z-s>>4;s=A+ -1|0;D=E+78|0;B=d[D]|0;do{if(((c[p>>2]|0)-z>>4|0)<=(B|0)){C=c[q>>2]|0;if((C|0)>1e6){yf(e,6)}G=B+5+(z-t>>4)|0;H=C<<1;C=(H|0)>1e6?1e6:H;H=(C|0)<(G|0)?G:C;if((H|0)>1e6){Af(e,1000200);tf(e,1344,l)}else{Af(e,H);break}}}while(0);l=E+76|0;z=a[l]|0;if((A|0)>(z&255|0)){I=z;J=s}else{z=c[o>>2]|0;A=s;while(1){s=z+16|0;c[o>>2]=s;c[z+8>>2]=0;B=A+1|0;H=a[l]|0;if((B|0)<(H&255|0)){A=B;z=s}else{I=H;J=B;break}}}if((a[E+77|0]|0)==0){z=c[n>>2]|0;K=z;L=z+(u+16)|0}else{z=I&255;A=c[o>>2]|0;l=A;B=d[D]|0;do{if(((c[p>>2]|0)-l>>4|0)>(B|0)){M=A}else{H=c[q>>2]|0;if((H|0)>1e6){yf(e,6)}s=B+5+(l-(c[n>>2]|0)>>4)|0;C=H<<1;H=(C|0)>1e6?1e6:C;C=(H|0)<(s|0)?s:H;if((C|0)>1e6){Af(e,1000200);tf(e,1344,k)}else{Af(e,C);M=c[o>>2]|0;break}}}while(0);do{if(!(I<<24>>24==0)){k=0-J|0;c[o>>2]=M+16;l=M+(k<<4)|0;B=c[l+4>>2]|0;A=M;c[A>>2]=c[l>>2];c[A+4>>2]=B;B=M+(k<<4)+8|0;c[M+8>>2]=c[B>>2];c[B>>2]=0;if((I&255)>1){N=1}else{break}do{B=c[o>>2]|0;k=N-J|0;c[o>>2]=B+16;A=M+(k<<4)|0;l=c[A+4>>2]|0;C=B;c[C>>2]=c[A>>2];c[C+4>>2]=l;l=M+(k<<4)+8|0;c[B+8>>2]=c[l>>2];c[l>>2]=0;N=N+1|0;}while((N|0)<(z|0))}}while(0);K=c[n>>2]|0;L=M}M=e+16|0;z=c[(c[M>>2]|0)+12>>2]|0;if((z|0)==0){O=Gi(e)|0}else{O=z}c[M>>2]=O;b[O+16>>1]=g;c[O>>2]=K+u;c[O+24>>2]=L;K=L+(d[D]<<4)|0;c[O+4>>2]=K;D=O+28|0;c[D>>2]=c[E+12>>2];E=O+18|0;a[E]=1;c[o>>2]=K;if((c[(c[e+12>>2]|0)+12>>2]|0)>0){mg(e)}if((a[e+40|0]&1)==0){P=0;i=h;return P|0}c[D>>2]=(c[D>>2]|0)+4;K=c[O+8>>2]|0;do{if((a[K+18|0]&1)==0){Q=0}else{if((c[(c[K+28>>2]|0)+ -4>>2]&63|0)!=30){Q=0;break}a[E]=d[E]|64;Q=4}}while(0);Df(e,Q,-1);c[D>>2]=(c[D>>2]|0)+ -4;P=0;i=h;return P|0}else if((v|0)==62){rf(e,r,1640)}else if((v|0)==68){yf(e,6)}else if((v|0)==70){Af(e,1000200);tf(e,1344,j)}j=c[F>>2]|0;F=c[o>>2]|0;do{if(((c[p>>2]|0)-F|0)<336){v=c[q>>2]|0;if((v|0)>1e6){yf(e,6)}r=(F-t>>4)+25|0;D=v<<1;v=(D|0)>1e6?1e6:D;D=(v|0)<(r|0)?r:v;if((D|0)>1e6){Af(e,1000200);tf(e,1344,m)}else{Af(e,D);break}}}while(0);m=e+16|0;t=c[(c[m>>2]|0)+12>>2]|0;if((t|0)==0){R=Gi(e)|0}else{R=t}c[m>>2]=R;b[R+16>>1]=g;c[R>>2]=(c[n>>2]|0)+u;c[R+4>>2]=(c[o>>2]|0)+320;a[R+18|0]=0;if((c[(c[e+12>>2]|0)+12>>2]|0)>0){mg(e)}R=e+40|0;if(!((a[R]&1)==0)){Df(e,0,-1)}u=xc[j&255](e)|0;j=(c[o>>2]|0)+(0-u<<4)|0;u=c[m>>2]|0;g=d[R]|0;if((g&6|0)==0){S=j;T=u+8|0}else{if((g&2|0)==0){U=j}else{g=j-(c[n>>2]|0)|0;Df(e,1,-1);U=(c[n>>2]|0)+g|0}g=u+8|0;c[e+20>>2]=c[(c[g>>2]|0)+28>>2];S=U;T=g}g=c[u>>2]|0;U=b[u+16>>1]|0;c[m>>2]=c[T>>2];a:do{if(U<<16>>16==0){V=g}else{T=S;m=U<<16>>16;u=g;while(1){if(!(T>>>0<(c[o>>2]|0)>>>0)){break}e=u+16|0;n=T;j=c[n+4>>2]|0;R=u;c[R>>2]=c[n>>2];c[R+4>>2]=j;c[u+8>>2]=c[T+8>>2];j=m+ -1|0;if((j|0)==0){V=e;break a}T=T+16|0;m=j;u=e}if((m|0)>0){W=m;X=u}else{V=u;break}while(1){T=W+ -1|0;c[X+8>>2]=0;if((T|0)>0){X=X+16|0;W=T}else{break}}V=u+(m<<4)|0}}while(0);c[o>>2]=V;P=1;i=h;return P|0}function Ff(a,e){a=a|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;f=i;g=a+16|0;h=c[g>>2]|0;j=d[a+40|0]|0;if((j&6|0)==0){k=e;l=h+8|0}else{if((j&2|0)==0){m=e}else{j=a+28|0;n=e-(c[j>>2]|0)|0;Df(a,1,-1);m=(c[j>>2]|0)+n|0}n=h+8|0;c[a+20>>2]=c[(c[n>>2]|0)+28>>2];k=m;l=n}n=c[h>>2]|0;m=b[h+16>>1]|0;h=m<<16>>16;c[g>>2]=c[l>>2];l=a+8|0;if(m<<16>>16==0){o=n;c[l>>2]=o;p=h+1|0;i=f;return p|0}else{q=k;r=h;s=n}while(1){if(!(q>>>0<(c[l>>2]|0)>>>0)){break}n=s+16|0;k=q;m=c[k+4>>2]|0;a=s;c[a>>2]=c[k>>2];c[a+4>>2]=m;c[s+8>>2]=c[q+8>>2];m=r+ -1|0;if((m|0)==0){o=n;t=12;break}else{q=q+16|0;r=m;s=n}}if((t|0)==12){c[l>>2]=o;p=h+1|0;i=f;return p|0}if((r|0)>0){u=r;v=s}else{o=s;c[l>>2]=o;p=h+1|0;i=f;return p|0}while(1){t=u+ -1|0;c[v+8>>2]=0;if((t|0)>0){v=v+16|0;u=t}else{break}}o=s+(r<<4)|0;c[l>>2]=o;p=h+1|0;i=f;return p|0}function Gf(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;i=i+8|0;g=f;h=a+38|0;j=(b[h>>1]|0)+1<<16>>16;b[h>>1]=j;do{if((j&65535)>199){if(j<<16>>16==200){tf(a,1360,g)}if(!((j&65535)>224)){break}yf(a,6)}}while(0);j=(e|0)!=0;if(!j){e=a+36|0;b[e>>1]=(b[e>>1]|0)+1<<16>>16}if((Ef(a,c,d)|0)==0){dk(a)}if(j){k=b[h>>1]|0;l=k+ -1<<16>>16;b[h>>1]=l;i=f;return}j=a+36|0;b[j>>1]=(b[j>>1]|0)+ -1<<16>>16;k=b[h>>1]|0;l=k+ -1<<16>>16;b[h>>1]=l;i=f;return}function Hf(f,g,h){f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;j=i;k=f+36|0;l=b[k>>1]|0;if((g|0)==0){m=1}else{m=(e[g+38>>1]|0)+1&65535}g=f+38|0;b[g>>1]=m;b[k>>1]=0;m=f+8|0;n=zf(f,3,(c[m>>2]|0)+(0-h<<4)|0)|0;if((n|0)==-1){o=2;b[k>>1]=l;p=b[g>>1]|0;q=p+ -1<<16>>16;b[g>>1]=q;i=j;return o|0}if(!(n>>>0>1)){o=n;b[k>>1]=l;p=b[g>>1]|0;q=p+ -1<<16>>16;b[g>>1]=q;i=j;return o|0}h=f+16|0;r=f+28|0;s=f+41|0;t=f+68|0;u=f+32|0;v=f+12|0;w=n;a:while(1){n=c[h>>2]|0;if((n|0)==0){break}else{x=n}while(1){y=x+18|0;if(!((a[y]&16)==0)){break}n=c[x+8>>2]|0;if((n|0)==0){break a}else{x=n}}n=c[r>>2]|0;z=c[x+20>>2]|0;A=n+z|0;Wf(f,A);if((w|0)==6){B=Si(f,1544,23)|0;c[A>>2]=B;c[n+(z+8)>>2]=d[B+4|0]|0|64}else if((w|0)==4){B=c[(c[v>>2]|0)+180>>2]|0;c[A>>2]=B;c[n+(z+8)>>2]=d[B+4|0]|0|64}else{B=c[m>>2]|0;C=B+ -16|0;D=c[C+4>>2]|0;E=A;c[E>>2]=c[C>>2];c[E+4>>2]=D;c[n+(z+8)>>2]=c[B+ -8>>2]}B=n+(z+16)|0;c[m>>2]=B;c[h>>2]=x;a[s]=a[x+36|0]|0;b[k>>1]=0;if((x|0)==0){F=B}else{z=x;n=B;while(1){B=c[z+4>>2]|0;D=n>>>0<B>>>0?B:n;B=c[z+8>>2]|0;if((B|0)==0){F=D;break}else{n=D;z=B}}}z=F-(c[r>>2]|0)|0;n=(z>>4)+1|0;B=((n|0)/8|0)+10+n|0;n=(B|0)>1e6?1e6:B;do{if((z|0)<=15999984){if((n|0)>=(c[u>>2]|0)){break}Af(f,n)}}while(0);c[t>>2]=c[x+32>>2];a[y]=d[y]|0|32;a[x+37|0]=w;n=zf(f,4,0)|0;if(n>>>0>1){w=n}else{o=n;G=24;break}}if((G|0)==24){b[k>>1]=l;p=b[g>>1]|0;q=p+ -1<<16>>16;b[g>>1]=q;i=j;return o|0}a[f+6|0]=w;G=c[m>>2]|0;if((w|0)==4){x=c[(c[v>>2]|0)+180>>2]|0;c[G>>2]=x;c[G+8>>2]=d[x+4|0]|0|64}else if((w|0)==6){x=Si(f,1544,23)|0;c[G>>2]=x;c[G+8>>2]=d[x+4|0]|0|64}else{x=G+ -16|0;f=c[x+4>>2]|0;v=G;c[v>>2]=c[x>>2];c[v+4>>2]=f;c[G+8>>2]=c[G+ -8>>2]}f=G+16|0;c[m>>2]=f;c[(c[h>>2]|0)+4>>2]=f;o=w;b[k>>1]=l;p=b[g>>1]|0;q=p+ -1<<16>>16;b[g>>1]=q;i=j;return o|0}function If(f,g){f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;h=i;j=g;k=f+16|0;l=c[k>>2]|0;if((e[f+38>>1]|0)>199){Of(f,1360,j)}m=f+6|0;n=a[m]|0;if(n<<24>>24==1){a[m]=0;m=f+28|0;c[l>>2]=(c[m>>2]|0)+(c[l+20>>2]|0);o=l+18|0;p=a[o]|0;if((p&1)==0){q=c[l+28>>2]|0;if((q|0)==0){r=j}else{a[l+37|0]=1;a[o]=p&255|8;p=xc[q&255](f)|0;r=(c[f+8>>2]|0)+(0-p<<4)|0}p=c[k>>2]|0;q=d[f+40|0]|0;if((q&6|0)==0){s=r;t=p+8|0}else{if((q&2|0)==0){u=r}else{q=r-(c[m>>2]|0)|0;Df(f,1,-1);u=(c[m>>2]|0)+q|0}q=p+8|0;c[f+20>>2]=c[(c[q>>2]|0)+28>>2];s=u;t=q}q=c[p>>2]|0;u=b[p+16>>1]|0;c[k>>2]=c[t>>2];t=f+8|0;a:do{if(u<<16>>16==0){v=q}else{k=s;p=u<<16>>16;m=q;while(1){if(!(k>>>0<(c[t>>2]|0)>>>0)){break}r=m+16|0;o=k;w=c[o+4>>2]|0;x=m;c[x>>2]=c[o>>2];c[x+4>>2]=w;c[m+8>>2]=c[k+8>>2];w=p+ -1|0;if((w|0)==0){v=r;break a}k=k+16|0;p=w;m=r}if((p|0)>0){y=p;z=m}else{v=m;break}while(1){k=y+ -1|0;c[z+8>>2]=0;if((k|0)>0){z=z+16|0;y=k}else{break}}v=m+(p<<4)|0}}while(0);c[t>>2]=v}else{dk(f)}Jf(f,0);i=h;return}else if(n<<24>>24==0){if((l|0)!=(f+72|0)){Of(f,1568,j)}if((Ef(f,g+ -16|0,-1)|0)!=0){i=h;return}dk(f);i=h;return}else{Of(f,1608,j)}}function Jf(e,f){e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;f=i;g=e+16|0;h=c[g>>2]|0;j=e+72|0;if((h|0)==(j|0)){i=f;return}k=e+8|0;l=e+40|0;m=e+20|0;n=e+28|0;o=e+68|0;p=h;do{h=p+18|0;q=a[h]|0;if((q&1)==0){r=q&255;if((r&16|0)!=0){a[h]=r&239;c[o>>2]=c[p+32>>2]}do{if((b[p+16>>1]|0)==-1){r=(c[g>>2]|0)+4|0;q=c[k>>2]|0;if(!((c[r>>2]|0)>>>0<q>>>0)){break}c[r>>2]=q}}while(0);q=a[h]|0;if((q&32)==0){a[p+37|0]=1}a[h]=q&199|8;q=xc[c[p+28>>2]&255](e)|0;r=(c[k>>2]|0)+(0-q<<4)|0;q=c[g>>2]|0;s=d[l]|0;if((s&6|0)==0){t=r;u=q+8|0}else{if((s&2|0)==0){v=r}else{s=r-(c[n>>2]|0)|0;Df(e,1,-1);v=(c[n>>2]|0)+s|0}s=q+8|0;c[m>>2]=c[(c[s>>2]|0)+28>>2];t=v;u=s}s=c[q>>2]|0;r=b[q+16>>1]|0;c[g>>2]=c[u>>2];a:do{if(r<<16>>16==0){w=s}else{q=r<<16>>16;if(t>>>0<(c[k>>2]|0)>>>0){x=t;y=q;z=s;while(1){A=z+16|0;B=x;C=c[B+4>>2]|0;D=z;c[D>>2]=c[B>>2];c[D+4>>2]=C;c[z+8>>2]=c[x+8>>2];C=y+ -1|0;D=x+16|0;if((C|0)==0){w=A;break a}if(D>>>0<(c[k>>2]|0)>>>0){z=A;y=C;x=D}else{E=C;F=A;break}}}else{E=q;F=s}if((E|0)>0){G=E;H=F}else{w=F;break}while(1){x=G+ -1|0;c[H+8>>2]=0;if((x|0)>0){H=H+16|0;G=x}else{break}}w=F+(E<<4)|0}}while(0);c[k>>2]=w}else{ck(e);dk(e)}p=c[g>>2]|0;}while((p|0)!=(j|0));i=f;return}function Kf(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;h=i;i=i+8|0;j=h;k=i;i=i+8|0;l=c[d+16>>2]|0;if((b[d+36>>1]|0)!=0){if((c[(c[d+12>>2]|0)+172>>2]|0)==(d|0)){tf(d,1432,j)}else{tf(d,1384,k)}}a[d+6|0]=1;k=l;c[l+20>>2]=(c[k>>2]|0)-(c[d+28>>2]|0);if(!((a[l+18|0]&1)==0)){i=h;return 0}c[l+28>>2]=g;if((g|0)==0){m=d+8|0;n=c[m>>2]|0;o=~e;p=n+(o<<4)|0;c[k>>2]=p;yf(d,1)}c[l+24>>2]=f;m=d+8|0;n=c[m>>2]|0;o=~e;p=n+(o<<4)|0;c[k>>2]=p;yf(d,1);return 0}function Lf(e,f,g,h,j){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;k=i;l=e+16|0;m=c[l>>2]|0;n=e+41|0;o=a[n]|0;p=e+36|0;q=b[p>>1]|0;r=e+68|0;s=c[r>>2]|0;c[r>>2]=j;j=zf(e,f,g)|0;if((j|0)==0){c[r>>2]=s;i=k;return j|0}g=e+28|0;f=c[g>>2]|0;t=f+h|0;Wf(e,t);if((j|0)==6){u=Si(e,1544,23)|0;c[t>>2]=u;c[f+(h+8)>>2]=d[u+4|0]|0|64}else if((j|0)==4){u=c[(c[e+12>>2]|0)+180>>2]|0;c[t>>2]=u;c[f+(h+8)>>2]=d[u+4|0]|0|64}else{u=c[e+8>>2]|0;v=u+ -16|0;w=c[v+4>>2]|0;x=t;c[x>>2]=c[v>>2];c[x+4>>2]=w;c[f+(h+8)>>2]=c[u+ -8>>2]}u=f+(h+16)|0;c[e+8>>2]=u;c[l>>2]=m;a[n]=o;b[p>>1]=q;if((m|0)==0){y=u}else{q=m;m=u;while(1){u=c[q+4>>2]|0;p=m>>>0<u>>>0?u:m;u=c[q+8>>2]|0;if((u|0)==0){y=p;break}else{m=p;q=u}}}q=y-(c[g>>2]|0)|0;g=(q>>4)+1|0;y=((g|0)/8|0)+10+g|0;g=(y|0)>1e6?1e6:y;if((q|0)>15999984){c[r>>2]=s;i=k;return j|0}if((g|0)>=(c[e+32>>2]|0)){c[r>>2]=s;i=k;return j|0}Af(e,g);c[r>>2]=s;i=k;return j|0}function Mf(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=i;i=i+64|0;h=g;j=a+36|0;b[j>>1]=(b[j>>1]|0)+1<<16>>16;c[h>>2]=d;c[h+56>>2]=e;c[h+52>>2]=f;f=h+16|0;c[f>>2]=0;e=h+24|0;c[e>>2]=0;d=h+28|0;c[d>>2]=0;k=h+36|0;c[k>>2]=0;l=h+40|0;c[l>>2]=0;m=h+48|0;c[m>>2]=0;n=h+4|0;c[n>>2]=0;o=h+12|0;c[o>>2]=0;p=Lf(a,5,h,(c[a+8>>2]|0)-(c[a+28>>2]|0)|0,c[a+68>>2]|0)|0;c[n>>2]=Ah(a,c[n>>2]|0,c[o>>2]|0,0)|0;c[o>>2]=0;Ah(a,c[f>>2]|0,c[e>>2]<<1,0)|0;Ah(a,c[d>>2]|0,c[k>>2]<<4,0)|0;Ah(a,c[l>>2]|0,c[m>>2]<<4,0)|0;b[j>>1]=(b[j>>1]|0)+ -1<<16>>16;i=g;return p|0}function Nf(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;i=i+8|0;g=f;h=i;i=i+8|0;j=e;k=c[j>>2]|0;l=k;m=c[l>>2]|0;c[l>>2]=m+ -1;if((m|0)==0){n=ek(k)|0}else{m=k+4|0;k=c[m>>2]|0;c[m>>2]=k+1;n=d[k]|0}k=c[e+52>>2]|0;m=(k|0)==0;if((n|0)==27){do{if(!m){if((hb(k|0,98)|0)!=0){break}c[h>>2]=1480;c[h+4>>2]=k;Xh(b,1496,h)|0;yf(b,3)}}while(0);o=Pj(b,c[j>>2]|0,e+4|0,c[e+56>>2]|0)|0}else{do{if(!m){if((hb(k|0,116)|0)!=0){break}c[g>>2]=1488;c[g+4>>2]=k;Xh(b,1496,g)|0;yf(b,3)}}while(0);o=ji(b,c[j>>2]|0,e+4|0,e+16|0,c[e+56>>2]|0,n)|0}n=o+6|0;if((a[n]|0)==0){i=f;return}e=o+16|0;j=o+5|0;g=o;o=0;do{k=Tf(b)|0;c[e+(o<<2)>>2]=k;m=k;do{if(!((a[k+5|0]&3)==0)){if((a[j]&4)==0){break}_f(b,g,m)}}while(0);o=o+1|0;}while((o|0)<(d[n]|0));i=f;return}function Of(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0;f=a+8|0;c[f>>2]=e;g=Ti(a,b)|0;c[e>>2]=g;c[e+8>>2]=d[g+4|0]|0|64;c[f>>2]=(c[f>>2]|0)+16;yf(a,-1)}function Pf(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;g=i;i=i+48|0;h=g+24|0;c[h>>2]=a;c[h+4>>2]=d;c[h+8>>2]=e;c[h+12>>2]=f;f=h+16|0;j=g;Rj(j);c[f>>2]=Bc[d&3](a,j,18,e)|0;Qf(b,h);i=g;return c[f>>2]|0}function Qf(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0;e=i;i=i+216|0;f=e;g=e+8|0;j=e+16|0;k=e+24|0;l=e+32|0;m=e+40|0;n=e+48|0;o=e+56|0;p=e+64|0;q=e+72|0;r=e+80|0;s=e+88|0;t=e+96|0;u=e+104|0;v=e+112|0;w=e+120|0;x=e+128|0;y=e+136|0;z=e+144|0;A=e+152|0;B=e+160|0;C=e+168|0;D=e+176|0;E=e+184|0;F=e+192|0;G=e+200|0;H=e+208|0;c[w>>2]=c[b+64>>2];I=d+16|0;J=c[I>>2]|0;if((J|0)==0){K=Bc[c[d+4>>2]&3](c[d>>2]|0,w,4,c[d+8>>2]|0)|0;c[I>>2]=K;L=K}else{L=J}c[v>>2]=c[b+68>>2];if((L|0)==0){J=Bc[c[d+4>>2]&3](c[d>>2]|0,v,4,c[d+8>>2]|0)|0;c[I>>2]=J;M=J}else{M=L}a[u]=a[b+76|0]|0;if((M|0)==0){L=Bc[c[d+4>>2]&3](c[d>>2]|0,u,1,c[d+8>>2]|0)|0;c[I>>2]=L;N=L}else{N=M}a[t]=a[b+77|0]|0;if((N|0)==0){M=Bc[c[d+4>>2]&3](c[d>>2]|0,t,1,c[d+8>>2]|0)|0;c[I>>2]=M;O=M}else{O=N}a[s]=a[b+78|0]|0;if((O|0)==0){N=Bc[c[d+4>>2]&3](c[d>>2]|0,s,1,c[d+8>>2]|0)|0;c[I>>2]=N;P=N}else{P=O}O=c[b+12>>2]|0;N=c[b+48>>2]|0;c[r>>2]=N;do{if((P|0)==0){s=d+4|0;M=d;t=d+8|0;L=Bc[c[s>>2]&3](c[M>>2]|0,r,4,c[t>>2]|0)|0;c[I>>2]=L;if((L|0)!=0){Q=L;R=13;break}L=Bc[c[s>>2]&3](c[M>>2]|0,O,N<<2,c[t>>2]|0)|0;c[I>>2]=L;t=c[b+44>>2]|0;c[n>>2]=t;if((L|0)!=0){S=t;T=L;break}L=Bc[c[d+4>>2]&3](c[d>>2]|0,n,4,c[d+8>>2]|0)|0;c[I>>2]=L;S=t;T=L}else{Q=P;R=13}}while(0);if((R|0)==13){P=c[b+44>>2]|0;c[n>>2]=P;S=P;T=Q}if((S|0)>0){Q=b+8|0;P=d+4|0;n=d;N=d+8|0;O=g;r=j;L=k;t=T;M=0;while(1){s=c[Q>>2]|0;u=s+(M<<4)|0;J=s+(M<<4)+8|0;s=c[J>>2]|0;a[m]=s&15;if((t|0)==0){v=Bc[c[P>>2]&3](c[n>>2]|0,m,1,c[N>>2]|0)|0;c[I>>2]=v;U=c[J>>2]|0;V=v}else{U=s;V=t}s=U&15;do{if((s|0)==1){a[l]=c[u>>2];if((V|0)!=0){W=V;break}v=Bc[c[P>>2]&3](c[n>>2]|0,l,1,c[N>>2]|0)|0;c[I>>2]=v;W=v}else if((s|0)==3){h[k>>3]=+h[u>>3];if((V|0)!=0){W=V;break}v=Bc[c[P>>2]&3](c[n>>2]|0,L,8,c[N>>2]|0)|0;c[I>>2]=v;W=v}else if((s|0)==4){v=c[u>>2]|0;if((v|0)==0){c[g>>2]=0;if((V|0)!=0){W=V;break}J=Bc[c[P>>2]&3](c[n>>2]|0,O,4,c[N>>2]|0)|0;c[I>>2]=J;W=J;break}c[j>>2]=(c[v+12>>2]|0)+1;if((V|0)!=0){W=V;break}J=Bc[c[P>>2]&3](c[n>>2]|0,r,4,c[N>>2]|0)|0;c[I>>2]=J;if((J|0)!=0){W=J;break}J=Bc[c[P>>2]&3](c[n>>2]|0,v+16|0,c[j>>2]|0,c[N>>2]|0)|0;c[I>>2]=J;W=J}else{W=V}}while(0);u=M+1|0;if((u|0)==(S|0)){X=W;break}else{t=W;M=u}}}else{X=T}T=c[b+56>>2]|0;c[f>>2]=T;if((X|0)==0){M=Bc[c[d+4>>2]&3](c[d>>2]|0,f,4,c[d+8>>2]|0)|0;c[I>>2]=M;Y=M}else{Y=X}if((T|0)>0){X=b+16|0;M=0;do{Qf(c[(c[X>>2]|0)+(M<<2)>>2]|0,d);M=M+1|0;}while((M|0)!=(T|0));Z=c[I>>2]|0}else{Z=Y}Y=b+40|0;T=c[Y>>2]|0;c[q>>2]=T;if((Z|0)==0){M=Bc[c[d+4>>2]&3](c[d>>2]|0,q,4,c[d+8>>2]|0)|0;c[I>>2]=M;_=M}else{_=Z}if((T|0)>0){Z=b+28|0;M=d+4|0;q=d;X=d+8|0;f=_;W=0;while(1){t=c[Z>>2]|0;a[p]=a[t+(W<<3)+4|0]|0;if((f|0)==0){S=Bc[c[M>>2]&3](c[q>>2]|0,p,1,c[X>>2]|0)|0;c[I>>2]=S;$=S;aa=c[Z>>2]|0}else{$=f;aa=t}a[o]=a[aa+(W<<3)+5|0]|0;if(($|0)==0){t=Bc[c[M>>2]&3](c[q>>2]|0,o,1,c[X>>2]|0)|0;c[I>>2]=t;ba=t}else{ba=$}t=W+1|0;if((t|0)==(T|0)){ca=ba;break}else{f=ba;W=t}}}else{ca=_}_=d+12|0;do{if((c[_>>2]|0)==0){W=c[b+36>>2]|0;ba=G;f=H;if((W|0)==0){da=f;ea=ba;R=50;break}c[H>>2]=(c[W+12>>2]|0)+1;if((ca|0)!=0){fa=f;ga=ba;break}T=d+4|0;$=d;X=d+8|0;o=Bc[c[T>>2]&3](c[$>>2]|0,f,4,c[X>>2]|0)|0;c[I>>2]=o;if((o|0)!=0){fa=f;ga=ba;break}c[I>>2]=Bc[c[T>>2]&3](c[$>>2]|0,W+16|0,c[H>>2]|0,c[X>>2]|0)|0;fa=f;ga=ba}else{da=H;ea=G;R=50}}while(0);do{if((R|0)==50){c[G>>2]=0;if((ca|0)!=0){fa=da;ga=ea;break}c[I>>2]=Bc[c[d+4>>2]&3](c[d>>2]|0,ea,4,c[d+8>>2]|0)|0;fa=da;ga=ea}}while(0);if((c[_>>2]|0)==0){ha=c[b+52>>2]|0}else{ha=0}ea=c[b+20>>2]|0;c[F>>2]=ha;ga=c[I>>2]|0;do{if((ga|0)==0){da=d+4|0;fa=d;ca=d+8|0;G=Bc[c[da>>2]&3](c[fa>>2]|0,F,4,c[ca>>2]|0)|0;c[I>>2]=G;if((G|0)!=0){ia=G;break}G=Bc[c[da>>2]&3](c[fa>>2]|0,ea,ha<<2,c[ca>>2]|0)|0;c[I>>2]=G;ia=G}else{ia=ga}}while(0);if((c[_>>2]|0)==0){ja=c[b+60>>2]|0}else{ja=0}c[E>>2]=ja;if((ia|0)==0){ga=Bc[c[d+4>>2]&3](c[d>>2]|0,E,4,c[d+8>>2]|0)|0;c[I>>2]=ga;ka=ga}else{ka=ia}if((ja|0)>0){ia=b+24|0;ga=C;E=D;ha=d+4|0;ea=d;F=d+8|0;G=B;ca=A;fa=ka;da=0;while(1){R=c[(c[ia>>2]|0)+(da*12|0)>>2]|0;do{if((R|0)==0){c[C>>2]=0;if((fa|0)!=0){la=fa;break}H=Bc[c[ha>>2]&3](c[ea>>2]|0,ga,4,c[F>>2]|0)|0;c[I>>2]=H;la=H}else{c[D>>2]=(c[R+12>>2]|0)+1;if((fa|0)!=0){la=fa;break}H=Bc[c[ha>>2]&3](c[ea>>2]|0,E,4,c[F>>2]|0)|0;c[I>>2]=H;if((H|0)!=0){la=H;break}H=Bc[c[ha>>2]&3](c[ea>>2]|0,R+16|0,c[D>>2]|0,c[F>>2]|0)|0;c[I>>2]=H;la=H}}while(0);R=c[ia>>2]|0;c[B>>2]=c[R+(da*12|0)+4>>2];if((la|0)==0){H=Bc[c[ha>>2]&3](c[ea>>2]|0,G,4,c[F>>2]|0)|0;c[I>>2]=H;ma=H;na=c[ia>>2]|0}else{ma=la;na=R}c[A>>2]=c[na+(da*12|0)+8>>2];if((ma|0)==0){R=Bc[c[ha>>2]&3](c[ea>>2]|0,ca,4,c[F>>2]|0)|0;c[I>>2]=R;oa=R}else{oa=ma}R=da+1|0;if((R|0)==(ja|0)){pa=oa;break}else{fa=oa;da=R}}}else{pa=ka}if((c[_>>2]|0)==0){qa=c[Y>>2]|0}else{qa=0}c[z>>2]=qa;if((pa|0)==0){Y=Bc[c[d+4>>2]&3](c[d>>2]|0,z,4,c[d+8>>2]|0)|0;c[I>>2]=Y;ra=Y}else{ra=pa}if((qa|0)<=0){i=e;return}pa=b+28|0;b=x;Y=y;z=d+4|0;_=d;ka=d+8|0;d=ra;ra=0;while(1){da=c[(c[pa>>2]|0)+(ra<<3)>>2]|0;do{if((da|0)==0){c[x>>2]=0;if((d|0)!=0){sa=d;break}oa=Bc[c[z>>2]&3](c[_>>2]|0,b,4,c[ka>>2]|0)|0;c[I>>2]=oa;sa=oa}else{c[y>>2]=(c[da+12>>2]|0)+1;if((d|0)!=0){sa=d;break}oa=Bc[c[z>>2]&3](c[_>>2]|0,Y,4,c[ka>>2]|0)|0;c[I>>2]=oa;if((oa|0)!=0){sa=oa;break}oa=Bc[c[z>>2]&3](c[_>>2]|0,da+16|0,c[y>>2]|0,c[ka>>2]|0)|0;c[I>>2]=oa;sa=oa}}while(0);da=ra+1|0;if((da|0)==(qa|0)){break}else{d=sa;ra=da}}i=e;return}function Rf(b,c){b=b|0;c=c|0;var d=0,e=0;d=i;e=dg(b,38,(c<<4)+16|0,0,0)|0;a[e+6|0]=c;i=d;return e|0}function Sf(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=i;f=dg(b,6,(d<<2)+16|0,0,0)|0;b=f;c[f+12>>2]=0;a[f+6|0]=d;if((d|0)==0){i=e;return b|0}g=f+16|0;f=d;do{f=f+ -1|0;c[g+(f<<2)>>2]=0;}while((f|0)!=0);i=e;return b|0}function Tf(a){a=a|0;var b=0,d=0;b=i;d=dg(a,10,32,0,0)|0;c[d+8>>2]=d+16;c[d+24>>2]=0;i=b;return d|0}function Uf(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=i;g=c[b+12>>2]|0;h=b+56|0;j=c[h>>2]|0;a:do{if((j|0)==0){k=h}else{l=j;m=h;while(1){n=c[l+8>>2]|0;if(n>>>0<e>>>0){k=m;break a}o=l;p=l;if((n|0)==(e|0)){break}n=c[p>>2]|0;if((n|0)==0){k=p;break a}else{l=n;m=p}}m=l+5|0;p=(d[m]|0)^3;if((((d[g+60|0]|0)^3)&p|0)!=0){q=o;i=f;return q|0}a[m]=p;q=o;i=f;return q|0}}while(0);o=dg(b,10,32,k,0)|0;k=o;c[o+8>>2]=e;e=o+16|0;c[e>>2]=g+112;o=g+132|0;g=c[o>>2]|0;c[e+4>>2]=g;c[g+16>>2]=k;c[o>>2]=k;q=k;i=f;return q|0}function Vf(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;if((c[b+8>>2]|0)==(b+16|0)){e=b;Ah(a,e,32,0)|0;i=d;return}f=b+16|0;g=f;h=f+4|0;c[(c[h>>2]|0)+16>>2]=c[g>>2];c[(c[g>>2]|0)+20>>2]=c[h>>2];e=b;Ah(a,e,32,0)|0;i=d;return}function Wf(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;e=i;f=c[a+12>>2]|0;g=a+56|0;h=c[g>>2]|0;if((h|0)==0){i=e;return}j=f+60|0;k=f+68|0;l=h;while(1){h=l;m=l+8|0;if((c[m>>2]|0)>>>0<b>>>0){n=10;break}o=l;c[g>>2]=c[o>>2];if((((d[j]|0)^3)&((d[l+5|0]|0)^3)|0)==0){if((c[m>>2]|0)!=(l+16|0)){p=l+16|0;q=p;r=p+4|0;c[(c[r>>2]|0)+16>>2]=c[q>>2];c[(c[q>>2]|0)+20>>2]=c[r>>2]}Ah(a,l,32,0)|0}else{r=l+16|0;q=r;p=r+4|0;c[(c[p>>2]|0)+16>>2]=c[q>>2];c[(c[q>>2]|0)+20>>2]=c[p>>2];p=c[m>>2]|0;q=l+16|0;r=p;s=c[r+4>>2]|0;t=q;c[t>>2]=c[r>>2];c[t+4>>2]=s;c[l+24>>2]=c[p+8>>2];c[m>>2]=q;c[o>>2]=c[k>>2];c[k>>2]=l;cg(f,h)}h=c[g>>2]|0;if((h|0)==0){n=10;break}else{l=h}}if((n|0)==10){i=e;return}}function Xf(b){b=b|0;var d=0,e=0;d=i;e=dg(b,9,80,0,0)|0;b=e;c[e+8>>2]=0;c[e+44>>2]=0;c[e+16>>2]=0;c[e+56>>2]=0;c[e+12>>2]=0;c[e+32>>2]=0;c[e+48>>2]=0;c[b+20>>2]=0;c[e+52>>2]=0;c[b+28>>2]=0;c[e+40>>2]=0;a[e+76|0]=0;a[e+77|0]=0;a[e+78|0]=0;c[e+24>>2]=0;c[e+60>>2]=0;c[e+64>>2]=0;c[e+68>>2]=0;c[e+36>>2]=0;i=d;return b|0}function Yf(a,b){a=a|0;b=b|0;var d=0;d=i;Ah(a,c[b+12>>2]|0,c[b+48>>2]<<2,0)|0;Ah(a,c[b+16>>2]|0,c[b+56>>2]<<2,0)|0;Ah(a,c[b+8>>2]|0,c[b+44>>2]<<4,0)|0;Ah(a,c[b+20>>2]|0,c[b+52>>2]<<2,0)|0;Ah(a,c[b+24>>2]|0,(c[b+60>>2]|0)*12|0,0)|0;Ah(a,c[b+28>>2]|0,c[b+40>>2]<<3,0)|0;Ah(a,b,80,0)|0;i=d;return}function Zf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;f=c[a+60>>2]|0;if((f|0)<=0){g=0;i=e;return g|0}h=c[a+24>>2]|0;a=b;b=0;while(1){if((c[h+(b*12|0)+4>>2]|0)>(d|0)){g=0;j=8;break}if((c[h+(b*12|0)+8>>2]|0)>(d|0)){k=a+ -1|0;if((k|0)==0){j=6;break}else{l=k}}else{l=a}k=b+1|0;if((k|0)<(f|0)){a=l;b=k}else{g=0;j=8;break}}if((j|0)==6){g=(c[h+(b*12|0)>>2]|0)+16|0;i=e;return g|0}else if((j|0)==8){i=e;return g|0}return 0}function _f(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0;g=i;h=c[b+12>>2]|0;if((d[h+61|0]|0)<2){$f(h,f);i=g;return}else{f=e+5|0;a[f]=a[h+60|0]&3|a[f]&184;i=g;return}}function $f(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;g=e+5|0;a[g]=a[g]&252;a:do{switch(d[e+4|0]|0|0){case 7:{h=c[e+8>>2]|0;do{if((h|0)!=0){if((a[h+5|0]&3)==0){break}$f(b,h)}}while(0);h=c[e+12>>2]|0;do{if((h|0)!=0){if((a[h+5|0]&3)==0){break}$f(b,h)}}while(0);j=(c[e+16>>2]|0)+24|0;break};case 6:{h=b+84|0;c[e+8>>2]=c[h>>2];c[h>>2]=e;i=f;return};case 38:{h=b+84|0;c[e+8>>2]=c[h>>2];c[h>>2]=e;i=f;return};case 20:case 4:{j=(c[e+12>>2]|0)+17|0;break};case 10:{h=e+8|0;k=c[h>>2]|0;do{if((c[k+8>>2]&64|0)==0){l=k}else{m=c[k>>2]|0;if((a[m+5|0]&3)==0){l=k;break}$f(b,m);l=c[h>>2]|0}}while(0);if((l|0)==(e+16|0)){j=32;break a}i=f;return};case 5:{h=b+84|0;c[e+24>>2]=c[h>>2];c[h>>2]=e;i=f;return};case 9:{h=b+84|0;c[e+72>>2]=c[h>>2];c[h>>2]=e;i=f;return};case 8:{h=b+84|0;c[e+60>>2]=c[h>>2];c[h>>2]=e;i=f;return};default:{i=f;return}}}while(0);a[g]=d[g]|0|4;g=b+16|0;c[g>>2]=(c[g>>2]|0)+j;i=f;return}function ag(b,d){b=b|0;d=d|0;var e=0;e=c[b+12>>2]|0;b=d+5|0;a[b]=a[b]&251;b=e+88|0;c[d+24>>2]=c[b>>2];c[b>>2]=d;i=i;return}function bg(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0;g=i;if((c[e+32>>2]|0)!=0){h=c[b+12>>2]|0;j=e+5|0;a[j]=a[j]&251;j=h+88|0;c[e+72>>2]=c[j>>2];c[j>>2]=e;i=g;return}if((a[f+5|0]&3)==0){i=g;return}j=e+5|0;e=a[j]|0;if((e&4)==0){i=g;return}h=c[b+12>>2]|0;if((d[h+61|0]|0)<2){$f(h,f);i=g;return}else{a[j]=a[h+60|0]&3|e&184;i=g;return}}function cg(b,e){b=b|0;e=e|0;var f=0,g=0,h=0;f=i;g=e+5|0;h=d[g]|0;if((h&7|0)!=0){i=f;return}do{if((a[b+62|0]|0)!=2){if((d[b+61|0]|0)<2){break}a[g]=a[b+60|0]&3|h&184;i=f;return}}while(0);a[g]=h&187|4;h=c[e+8>>2]|0;if((c[h+8>>2]&64|0)==0){i=f;return}e=c[h>>2]|0;if((a[e+5|0]&3)==0){i=f;return}$f(b,e);i=f;return}function dg(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0;h=i;j=c[b+12>>2]|0;k=Ah(b,0,d&15,e)|0;e=k+g|0;b=e;l=(f|0)==0?j+68|0:f;a[k+(g+5)|0]=a[j+60|0]&3;a[k+(g+4)|0]=d;c[e>>2]=c[l>>2];c[l>>2]=b;i=h;return b|0}function eg(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;h=c[b+12>>2]|0;j=e+5|0;if((a[j]&24)!=0|(f|0)==0){i=g;return}if(!((a[f+6|0]&4)==0)){i=g;return}if((Nj(f,2,c[h+192>>2]|0)|0)==0){i=g;return}f=h+76|0;k=c[f>>2]|0;l=e;if((k|0)==(l|0)){do{m=ig(b,k,1)|0;}while((m|0)==(k|0));c[f>>2]=m}m=h+68|0;while(1){f=c[m>>2]|0;if((f|0)==(e|0)){break}else{m=f}}c[m>>2]=c[l>>2];m=h+72|0;c[l>>2]=c[m>>2];c[m>>2]=e;e=d[j]|0|16;a[j]=e;if((d[h+61|0]|0)<2){a[j]=e&191;i=g;return}else{a[j]=a[h+60|0]&3|e&184;i=g;return}}function fg(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;g=b+12|0;h=c[g>>2]|0;j=h+62|0;if((d[j]|0)==(e|0)){i=f;return}if((e|0)==2){e=h+61|0;if((a[e]|0)!=0){do{jg(b)|0;}while((a[e]|0)!=0)}c[h+20>>2]=(c[h+12>>2]|0)+(c[h+8>>2]|0);a[j]=2;i=f;return}a[j]=0;j=c[g>>2]|0;a[j+61|0]=2;c[j+64>>2]=0;h=j+72|0;do{k=ig(b,h,1)|0;}while((k|0)==(h|0));c[j+80>>2]=k;k=j+68|0;do{l=ig(b,k,1)|0;}while((l|0)==(k|0));c[j+76>>2]=l;l=(c[g>>2]|0)+61|0;if((1<<d[l]&-29|0)!=0){i=f;return}do{jg(b)|0;}while((1<<d[l]&-29|0)==0);i=f;return}function gg(a,b){a=a|0;b=b|0;var e=0,f=0;e=i;f=(c[a+12>>2]|0)+61|0;if((1<<(d[f]|0)&b|0)!=0){i=e;return}do{jg(a)|0;}while((1<<(d[f]|0)&b|0)==0);i=e;return}function hg(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;f=b+12|0;g=c[f>>2]|0;h=g+104|0;while(1){j=c[h>>2]|0;if((j|0)==0){break}else{h=j}}j=g+72|0;k=c[j>>2]|0;if((k|0)==0){l=g}else{m=k;k=h;while(1){h=m+5|0;a[h]=d[h]|0|8;h=m;c[j>>2]=c[h>>2];c[h>>2]=c[k>>2];c[k>>2]=m;n=c[j>>2]|0;if((n|0)==0){break}else{k=h;m=n}}l=c[f>>2]|0}f=l+104|0;l=c[f>>2]|0;if((l|0)!=0){m=l;do{l=m+5|0;a[l]=a[l]&191;lg(b,0);m=c[f>>2]|0;}while((m|0)!=0)}a[g+60|0]=3;a[g+62|0]=0;ig(b,j,-3)|0;ig(b,g+68|0,-3)|0;j=g+32|0;if((c[j>>2]|0)<=0){i=e;return}m=g+24|0;g=0;do{ig(b,(c[m>>2]|0)+(g<<2)|0,-3)|0;g=g+1|0;}while((g|0)<(c[j>>2]|0));i=e;return}function ig(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;g=i;h=b+12|0;j=c[h>>2]|0;k=d[j+60|0]|0;l=k^3;m=(a[j+62|0]|0)==2;j=m?255:184;n=m?64:k&3;k=m?64:0;m=c[e>>2]|0;a:do{if((m|0)==0){o=e;p=0}else{q=e;r=f;s=m;b:while(1){t=r+ -1|0;if((r|0)==0){o=q;p=s;break a}u=s+5|0;v=d[u]|0;c:do{if(((v^3)&l|0)==0){c[q>>2]=c[s>>2];switch(d[s+4|0]|0){case 10:{Vf(b,s);w=q;break c;break};case 20:{break};case 5:{vj(b,s);w=q;break c;break};case 6:{Ah(b,s,(d[s+6|0]<<2)+16|0,0)|0;w=q;break c;break};case 8:{Ji(b,s);w=q;break c;break};case 7:{Ah(b,s,(c[s+16>>2]|0)+24|0,0)|0;w=q;break c;break};case 9:{Yf(b,s);w=q;break c;break};case 4:{x=(c[h>>2]|0)+28|0;c[x>>2]=(c[x>>2]|0)+ -1;break};case 38:{Ah(b,s,(d[s+6|0]<<4)+16|0,0)|0;w=q;break c;break};default:{w=q;break c}}Ah(b,s,(c[s+12>>2]|0)+17|0,0)|0;w=q}else{if((v&k|0)!=0){y=0;break b}do{if((a[s+4|0]|0)==8){x=s;if((c[x+28>>2]|0)==0){break}ig(b,s+56|0,-3)|0;Hi(x);if((a[(c[h>>2]|0)+62|0]|0)==1){break}Cf(x)}}while(0);a[u]=v&j|n;w=s}}while(0);v=c[w>>2]|0;if((v|0)==0){o=w;p=0;break a}else{q=w;s=v;r=t}}i=g;return y|0}}while(0);y=(p|0)==0?0:o;i=g;return y|0}function jg(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;e=i;i=i+8|0;f=e;g=b+12|0;h=c[g>>2]|0;j=h+61|0;switch(d[j]|0){case 5:{k=h+16|0;c[k>>2]=c[h+32>>2]<<2;l=h+84|0;c[l+0>>2]=0;c[l+4>>2]=0;c[l+8>>2]=0;c[l+12>>2]=0;c[l+16>>2]=0;l=c[h+172>>2]|0;do{if((l|0)!=0){if((a[l+5|0]&3)==0){break}$f(h,l)}}while(0);do{if((c[h+48>>2]&64|0)!=0){l=c[h+40>>2]|0;if((a[l+5|0]&3)==0){break}$f(h,l)}}while(0);qg(h);l=c[h+104>>2]|0;if((l|0)!=0){m=h+60|0;n=l;do{l=n+5|0;a[l]=a[m]&3|a[l]&184;$f(h,n);n=c[n>>2]|0;}while((n|0)!=0)}a[j]=0;o=c[k>>2]|0;i=e;return o|0};case 0:{if((c[h+84>>2]|0)!=0){k=h+16|0;n=c[k>>2]|0;pg(h);o=(c[k>>2]|0)-n|0;i=e;return o|0}a[j]=1;n=h+20|0;c[n>>2]=c[h+16>>2];k=c[g>>2]|0;m=k+16|0;l=c[m>>2]|0;do{if((b|0)!=0){if((a[b+5|0]&3)==0){break}$f(k,b)}}while(0);do{if((c[k+48>>2]&64|0)!=0){p=c[k+40>>2]|0;if((a[p+5|0]&3)==0){break}$f(k,p)}}while(0);qg(k);p=k+112|0;q=c[k+132>>2]|0;if((q|0)!=(p|0)){r=q;do{do{if((a[r+5|0]&7)==0){q=c[r+8>>2]|0;if((c[q+8>>2]&64|0)==0){break}s=c[q>>2]|0;if((a[s+5|0]&3)==0){break}$f(k,s)}}while(0);r=c[r+20>>2]|0;}while((r|0)!=(p|0))}p=k+84|0;if((c[p>>2]|0)!=0){do{pg(k);}while((c[p>>2]|0)!=0)}r=(c[m>>2]|0)-l|0;l=k+92|0;s=c[l>>2]|0;q=k+88|0;t=c[q>>2]|0;u=k+96|0;v=c[u>>2]|0;c[u>>2]=0;c[q>>2]=0;c[l>>2]=0;c[p>>2]=t;if((t|0)!=0){do{pg(k);}while((c[p>>2]|0)!=0)}c[p>>2]=s;if((s|0)!=0){do{pg(k);}while((c[p>>2]|0)!=0)}c[p>>2]=v;if((v|0)!=0){do{pg(k);}while((c[p>>2]|0)!=0)}v=c[m>>2]|0;while(1){s=c[u>>2]|0;c[u>>2]=0;t=0;q=s;a:while(1){s=q;while(1){if((s|0)==0){break a}w=c[s+24>>2]|0;if((sg(k,s)|0)==0){s=w}else{break}}if((c[p>>2]|0)==0){t=1;q=w;continue}while(1){pg(k);if((c[p>>2]|0)==0){t=1;q=w;continue a}}}if((t|0)==0){break}}rg(k,c[l>>2]|0,0);w=k+100|0;rg(k,c[w>>2]|0,0);q=c[l>>2]|0;s=c[w>>2]|0;x=c[m>>2]|0;y=c[g>>2]|0;z=y+104|0;while(1){A=c[z>>2]|0;if((A|0)==0){break}else{z=A}}A=r-v+x|0;x=y+72|0;y=c[x>>2]|0;b:do{if((y|0)!=0){v=y;r=z;B=x;while(1){C=v;D=r;while(1){E=C+5|0;F=a[E]|0;if((F&3)==0){break}a[E]=F&255|8;F=C;c[B>>2]=c[F>>2];c[F>>2]=c[D>>2];c[D>>2]=C;E=c[B>>2]|0;if((E|0)==0){break b}else{C=E;D=F}}F=C;E=c[F>>2]|0;if((E|0)==0){break}else{v=E;r=D;B=F}}}}while(0);x=c[k+104>>2]|0;if((x|0)!=0){z=k+60|0;y=x;do{x=y+5|0;a[x]=a[z]&3|a[x]&184;$f(k,y);y=c[y>>2]|0;}while((y|0)!=0)}if((c[p>>2]|0)!=0){do{pg(k);}while((c[p>>2]|0)!=0)}y=c[m>>2]|0;while(1){z=c[u>>2]|0;c[u>>2]=0;x=0;B=z;c:while(1){z=B;while(1){if((z|0)==0){break c}G=c[z+24>>2]|0;if((sg(k,z)|0)==0){z=G}else{break}}if((c[p>>2]|0)==0){x=1;B=G;continue}while(1){pg(k);if((c[p>>2]|0)==0){x=1;B=G;continue c}}}if((x|0)==0){break}}G=A-y|0;y=c[u>>2]|0;if((y|0)!=0){u=y;do{y=1<<d[u+7|0];A=c[u+16>>2]|0;p=A+(y<<5)|0;if((y|0)>0){y=A;do{A=y+8|0;do{if((c[A>>2]|0)!=0){B=y+24|0;z=c[B>>2]|0;if((z&64|0)==0){break}D=c[y+16>>2]|0;if((z&15|0)==4){if((D|0)==0){break}if((a[D+5|0]&3)==0){break}$f(k,D);break}else{z=D+5|0;if((a[z]&3)==0){break}c[A>>2]=0;if((a[z]&3)==0){break}c[B>>2]=11;break}}}while(0);y=y+32|0;}while(y>>>0<p>>>0)}u=c[u+24>>2]|0;}while((u|0)!=0)}u=c[w>>2]|0;if((u|0)!=0){p=u;do{u=1<<d[p+7|0];y=c[p+16>>2]|0;x=y+(u<<5)|0;if((u|0)>0){u=y;do{y=u+8|0;do{if((c[y>>2]|0)!=0){A=u+24|0;B=c[A>>2]|0;if((B&64|0)==0){break}z=c[u+16>>2]|0;if((B&15|0)==4){if((z|0)==0){break}if((a[z+5|0]&3)==0){break}$f(k,z);break}else{B=z+5|0;if((a[B]&3)==0){break}c[y>>2]=0;if((a[B]&3)==0){break}c[A>>2]=11;break}}}while(0);u=u+32|0;}while(u>>>0<x>>>0)}p=c[p+24>>2]|0;}while((p|0)!=0)}rg(k,c[l>>2]|0,q);rg(k,c[w>>2]|0,s);s=k+60|0;a[s]=d[s]^3;s=G+(c[m>>2]|0)|0;c[n>>2]=(c[n>>2]|0)+s;n=c[g>>2]|0;a[n+61|0]=2;c[n+64>>2]=0;m=n+72|0;G=0;do{G=G+1|0;H=ig(b,m,1)|0;}while((H|0)==(m|0));c[n+80>>2]=H;H=n+68|0;m=0;do{m=m+1|0;I=ig(b,H,1)|0;}while((I|0)==(H|0));c[n+76>>2]=I;o=((m+G|0)*5|0)+s|0;i=e;return o|0};case 2:{s=h+64|0;G=h+32|0;m=h+24|0;I=0;while(1){n=c[s>>2]|0;H=n+I|0;k=c[G>>2]|0;if((H|0)>=(k|0)){J=k;K=n;L=I;break}ig(b,(c[m>>2]|0)+(H<<2)|0,-3)|0;M=I+1|0;if((M|0)<80){I=M}else{N=96;break}}if((N|0)==96){J=c[G>>2]|0;K=c[s>>2]|0;L=M}M=K+L|0;c[s>>2]=M;if((M|0)>=(J|0)){a[j]=3}o=L*5|0;i=e;return o|0};case 3:{L=h+80|0;J=c[L>>2]|0;if((J|0)==0){a[j]=4;o=0;i=e;return o|0}else{c[L>>2]=ig(b,J,80)|0;o=400;i=e;return o|0}break};case 4:{J=h+76|0;L=c[J>>2]|0;if((L|0)!=0){c[J>>2]=ig(b,L,80)|0;o=400;i=e;return o|0}c[f>>2]=c[h+172>>2];ig(b,f,1)|0;f=c[g>>2]|0;if((a[f+62|0]|0)!=1){g=(c[f+32>>2]|0)/2|0;if((c[f+28>>2]|0)>>>0<g>>>0){Ri(b,g)}g=f+144|0;h=f+152|0;c[g>>2]=Ah(b,c[g>>2]|0,c[h>>2]|0,0)|0;c[h>>2]=0}a[j]=5;o=5;i=e;return o|0};default:{o=0;i=e;return o|0}}return 0}function kg(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;d=i;e=c[b+12>>2]|0;a:do{if((a[e+62|0]|0)==2){f=e+20|0;g=c[f>>2]|0;do{if((g|0)==0){ng(b,0);h=c[e+8>>2]|0;j=c[e+12>>2]|0;c[f>>2]=j+h;k=j;l=h}else{h=e+61|0;if((a[h]|0)!=5){do{jg(b)|0;}while((a[h]|0)!=5)}a[h]=0;j=c[e+8>>2]|0;m=c[e+12>>2]|0;if((m+j|0)>>>0>(da(c[e+160>>2]|0,(g>>>0)/100|0)|0)>>>0){c[f>>2]=0;k=m;l=j;break}else{c[f>>2]=g;k=m;l=j;break}}}while(0);g=l+k|0;f=(g|0)/100|0;j=c[e+156>>2]|0;if((j|0)<(2147483644/(f|0)|0|0)){n=da(j,f)|0}else{n=2147483644}Fi(e,g-n|0);o=e+61|0}else{g=e+12|0;f=c[e+164>>2]|0;j=(f|0)<40?40:f;f=((c[g>>2]|0)/200|0)+1|0;if((f|0)<(2147483644/(j|0)|0|0)){p=da(f,j)|0}else{p=2147483644}f=e+61|0;m=p;do{m=m-(jg(b)|0)|0;q=(a[f]|0)==5;if(!((m|0)>-1600)){r=17;break}}while(!q);do{if((r|0)==17){if(q){break}Fi(e,((m|0)/(j|0)|0)*200|0);o=f;break a}}while(0);j=(c[e+20>>2]|0)/100|0;m=c[e+156>>2]|0;if((m|0)<(2147483644/(j|0)|0|0)){s=da(m,j)|0}else{s=2147483644}Fi(e,(c[e+8>>2]|0)-s+(c[g>>2]|0)|0);o=f}}while(0);s=e+104|0;if((c[s>>2]|0)==0){i=d;return}else{t=0}while(1){if((t|0)>=4){if((a[o]|0)!=5){r=26;break}}lg(b,1);if((c[s>>2]|0)==0){r=26;break}else{t=t+1|0}}if((r|0)==26){i=d;return}}function lg(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;f=i;i=i+8|0;g=f;h=i;i=i+16|0;j=c[b+12>>2]|0;k=j+104|0;l=c[k>>2]|0;m=l;c[k>>2]=c[m>>2];k=j+68|0;c[m>>2]=c[k>>2];c[k>>2]=l;k=l+5|0;m=d[k]|0;a[k]=m&239;if((d[j+61|0]|0)>=2){a[k]=a[j+60|0]&3|m&168}c[h>>2]=l;m=h+8|0;c[m>>2]=d[l+4|0]|0|64;l=Oj(b,h,2)|0;if((l|0)==0){i=f;return}k=l+8|0;if((c[k>>2]&15|0)!=6){i=f;return}n=b+41|0;o=a[n]|0;p=j+63|0;j=a[p]|0;a[n]=0;a[p]=0;q=b+8|0;r=c[q>>2]|0;s=l;l=c[s+4>>2]|0;t=r;c[t>>2]=c[s>>2];c[t+4>>2]=l;c[r+8>>2]=c[k>>2];k=c[q>>2]|0;r=h;h=c[r+4>>2]|0;l=k+16|0;c[l>>2]=c[r>>2];c[l+4>>2]=h;c[k+24>>2]=c[m>>2];m=c[q>>2]|0;c[q>>2]=m+32;k=Lf(b,6,0,m-(c[b+28>>2]|0)|0,0)|0;a[n]=o;a[p]=j;if((k|0)==0|(e|0)==0){i=f;return}if((k|0)!=2){u=k;yf(b,u)}k=c[q>>2]|0;if((c[k+ -8>>2]&15|0)==4){v=(c[k+ -16>>2]|0)+16|0}else{v=1648}c[g>>2]=v;Xh(b,1664,g)|0;u=5;yf(b,u)}function mg(b){b=b|0;var d=0,e=0;d=i;e=c[b+12>>2]|0;if((a[e+63|0]|0)==0){Fi(e,-1600);i=d;return}else{kg(b);i=d;return}}function ng(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;f=i;g=b+12|0;h=c[g>>2]|0;j=h+62|0;k=a[j]|0;l=(e|0)!=0;do{if(l){a[j]=1;m=6}else{a[j]=0;e=(c[g>>2]|0)+104|0;n=c[e>>2]|0;if((n|0)==0){m=6;break}else{o=n}do{n=o+5|0;a[n]=a[n]&191;lg(b,1);o=c[e>>2]|0;}while((o|0)!=0);if((a[j]|0)==2){m=7}else{m=6}}}while(0);if((m|0)==6){if((d[h+61|0]|0)<2){m=7}}if((m|0)==7){m=c[g>>2]|0;a[m+61|0]=2;c[m+64>>2]=0;o=m+72|0;do{p=ig(b,o,1)|0;}while((p|0)==(o|0));c[m+80>>2]=p;p=m+68|0;do{q=ig(b,p,1)|0;}while((q|0)==(p|0));c[m+76>>2]=q}q=c[g>>2]|0;m=q+61|0;if((a[m]|0)==5){r=5;s=q}else{do{jg(b)|0;}while((a[m]|0)!=5);m=c[g>>2]|0;r=a[m+61|0]|0;s=m}m=s+61|0;if((1<<(r&255)&-33|0)==0){do{jg(b)|0;}while((1<<d[m]&-33|0)==0);m=c[g>>2]|0;t=a[m+61|0]|0;u=m}else{t=r;u=s}s=u+61|0;if(!(t<<24>>24==5)){do{jg(b)|0;}while((a[s]|0)!=5)}do{if(k<<24>>24==2){s=(c[g>>2]|0)+61|0;if((a[s]|0)==0){break}do{jg(b)|0;}while((a[s]|0)!=0)}}while(0);a[j]=k;k=c[h+8>>2]|0;j=c[h+12>>2]|0;s=(j+k|0)/100|0;t=c[h+156>>2]|0;if((t|0)<(2147483644/(s|0)|0|0)){v=da(t,s)|0}else{v=2147483644}Fi(h,k-v+j|0);if(l){i=f;return}l=(c[g>>2]|0)+104|0;g=c[l>>2]|0;if((g|0)==0){i=f;return}else{w=g}do{g=w+5|0;a[g]=a[g]&191;lg(b,1);w=c[l>>2]|0;}while((w|0)!=0);i=f;return}function og(a,b){a=a|0;b=b|0;b=i;Gf(a,(c[a+8>>2]|0)+ -32|0,0,0);i=b;return}function pg(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0;e=i;f=b+84|0;g=c[f>>2]|0;h=g+5|0;a[h]=d[h]|4;a:do{switch(d[g+4|0]|0){case 6:{j=g;c[f>>2]=c[g+8>>2];k=c[g+12>>2]|0;do{if((k|0)!=0){if((a[k+5|0]&3)==0){break}$f(b,k)}}while(0);k=g+6|0;l=a[k]|0;if(l<<24>>24==0){m=l&255}else{n=l;l=0;while(1){o=c[j+(l<<2)+16>>2]|0;do{if((o|0)==0){p=n}else{if((a[o+5|0]&3)==0){p=n;break}$f(b,o);p=a[k]|0}}while(0);o=l+1|0;q=p&255;if((o|0)<(q|0)){n=p;l=o}else{m=q;break}}}r=(m<<2)+16|0;break};case 38:{c[f>>2]=c[g+8>>2];l=g+6|0;n=a[l]|0;if(n<<24>>24==0){s=n&255}else{k=n;n=0;while(1){do{if((c[g+(n<<4)+24>>2]&64|0)==0){t=k}else{j=c[g+(n<<4)+16>>2]|0;if((a[j+5|0]&3)==0){t=k;break}$f(b,j);t=a[l]|0}}while(0);j=n+1|0;q=t&255;if((j|0)<(q|0)){k=t;n=j}else{s=q;break}}}r=(s<<4)+16|0;break};case 8:{n=g+60|0;c[f>>2]=c[n>>2];k=b+88|0;c[n>>2]=c[k>>2];c[k>>2]=g;a[h]=a[h]&251;k=g+28|0;n=c[k>>2]|0;if((n|0)==0){r=1;break a}l=g+8|0;q=c[l>>2]|0;if(n>>>0<q>>>0){j=q;q=n;while(1){do{if((c[q+8>>2]&64|0)==0){u=j}else{o=c[q>>2]|0;if((a[o+5|0]&3)==0){u=j;break}$f(b,o);u=c[l>>2]|0}}while(0);o=q+16|0;if(o>>>0<u>>>0){j=u;q=o}else{v=o;break}}}else{v=n}do{if((a[b+61|0]|0)==1){q=g+32|0;j=(c[k>>2]|0)+(c[q>>2]<<4)|0;if(v>>>0<j>>>0){w=v}else{x=q;y=0;break}while(1){c[w+8>>2]=0;l=w+16|0;if(l>>>0<j>>>0){w=l}else{x=q;y=0;break}}}else{q=g+72|0;j=c[g+16>>2]|0;if((q|0)==(j|0)){z=0}else{l=q;q=0;while(1){o=q+1|0;A=c[l+12>>2]|0;if((A|0)==(j|0)){z=o;break}else{q=o;l=A}}}x=g+32|0;y=z}}while(0);r=(y*40|0)+112+(c[x>>2]<<4)|0;break};case 9:{k=g;c[f>>2]=c[g+72>>2];n=g+32|0;l=c[n>>2]|0;do{if((l|0)!=0){if((a[l+5|0]&3)==0){break}c[n>>2]=0}}while(0);n=c[g+36>>2]|0;do{if((n|0)!=0){if((a[n+5|0]&3)==0){break}$f(b,n)}}while(0);n=g+44|0;l=c[n>>2]|0;if((l|0)>0){q=g+8|0;j=l;l=0;while(1){A=c[q>>2]|0;do{if((c[A+(l<<4)+8>>2]&64|0)==0){B=j}else{o=c[A+(l<<4)>>2]|0;if((a[o+5|0]&3)==0){B=j;break}$f(b,o);B=c[n>>2]|0}}while(0);A=l+1|0;if((A|0)<(B|0)){j=B;l=A}else{break}}}l=g+40|0;j=c[l>>2]|0;if((j|0)>0){q=k+28|0;A=j;j=0;while(1){o=c[(c[q>>2]|0)+(j<<3)>>2]|0;do{if((o|0)==0){C=A}else{if((a[o+5|0]&3)==0){C=A;break}$f(b,o);C=c[l>>2]|0}}while(0);o=j+1|0;if((o|0)<(C|0)){A=C;j=o}else{break}}}j=g+56|0;A=c[j>>2]|0;if((A|0)>0){q=g+16|0;k=A;o=0;while(1){D=c[(c[q>>2]|0)+(o<<2)>>2]|0;do{if((D|0)==0){E=k}else{if((a[D+5|0]&3)==0){E=k;break}$f(b,D);E=c[j>>2]|0}}while(0);D=o+1|0;if((D|0)<(E|0)){k=E;o=D}else{F=E;break}}}else{F=A}o=g+60|0;k=c[o>>2]|0;if((k|0)>0){q=g+24|0;D=k;G=0;while(1){H=c[(c[q>>2]|0)+(G*12|0)>>2]|0;do{if((H|0)==0){I=D}else{if((a[H+5|0]&3)==0){I=D;break}$f(b,H);I=c[o>>2]|0}}while(0);H=G+1|0;if((H|0)<(I|0)){D=I;G=H}else{break}}J=I;K=c[j>>2]|0}else{J=k;K=F}r=(J*12|0)+80+(c[n>>2]<<4)+(c[l>>2]<<3)+((c[g+48>>2]|0)+K+(c[g+52>>2]|0)<<2)|0;break};case 5:{G=g;D=g+24|0;c[f>>2]=c[D>>2];o=g+8|0;q=c[o>>2]|0;A=q;do{if((q|0)==0){L=33}else{if((a[q+6|0]&8)==0){H=Nj(A,3,c[b+196>>2]|0)|0;M=c[o>>2]|0;if((M|0)==0){N=H}else{O=H;P=M;L=5}}else{O=0;P=A;L=5}do{if((L|0)==5){if((a[P+5|0]&3)==0){N=O;break}$f(b,P);N=O}}while(0);if((N|0)==0){L=33;break}if((c[N+8>>2]&15|0)!=4){L=33;break}M=(c[N>>2]|0)+16|0;H=hb(M|0,107)|0;Q=(H|0)!=0;H=(hb(M|0,118)|0)==0;if(H&(Q^1)){L=33;break}a[h]=a[h]&251;if(Q){if(H){sg(b,G)|0;break}else{H=b+100|0;c[D>>2]=c[H>>2];c[H>>2]=g;break}}H=1<<d[G+7|0];Q=c[g+16>>2]|0;M=Q+(H<<5)|0;R=(c[G+28>>2]|0)>0|0;if((H|0)>0){H=R;S=Q;while(1){Q=S+8|0;T=S+24|0;U=(c[T>>2]&64|0)==0;do{if((c[Q>>2]|0)==0){if(U){V=H;break}if((a[(c[S+16>>2]|0)+5|0]&3)==0){V=H;break}c[T>>2]=11;V=H}else{do{if(!U){W=c[S+16>>2]|0;if((a[W+5|0]&3)==0){break}$f(b,W)}}while(0);if((H|0)!=0){V=H;break}W=c[Q>>2]|0;if((W&64|0)==0){V=0;break}X=c[S>>2]|0;if((W&15|0)!=4){V=(a[X+5|0]&3)!=0|0;break}if((X|0)==0){V=0;break}if((a[X+5|0]&3)==0){V=0;break}$f(b,X);V=0}}while(0);Q=S+32|0;if(Q>>>0<M>>>0){H=V;S=Q}else{Y=V;break}}}else{Y=R}if((Y|0)==0){S=b+88|0;c[D>>2]=c[S>>2];c[S>>2]=g;break}else{S=b+92|0;c[D>>2]=c[S>>2];c[S>>2]=g;break}}}while(0);do{if((L|0)==33){D=g+16|0;A=c[D>>2]|0;o=A+(1<<d[G+7|0]<<5)|0;q=G+28|0;l=c[q>>2]|0;if((l|0)>0){n=g+12|0;k=l;l=0;while(1){j=c[n>>2]|0;do{if((c[j+(l<<4)+8>>2]&64|0)==0){Z=k}else{S=c[j+(l<<4)>>2]|0;if((a[S+5|0]&3)==0){Z=k;break}$f(b,S);Z=c[q>>2]|0}}while(0);j=l+1|0;if((j|0)<(Z|0)){k=Z;l=j}else{break}}_=c[D>>2]|0}else{_=A}if(_>>>0<o>>>0){$=_}else{break}do{l=$+8|0;k=c[l>>2]|0;q=$+24|0;n=(c[q>>2]&64|0)==0;do{if((k|0)==0){if(n){break}if((a[(c[$+16>>2]|0)+5|0]&3)==0){break}c[q>>2]=11}else{do{if(n){aa=k}else{R=c[$+16>>2]|0;if((a[R+5|0]&3)==0){aa=k;break}$f(b,R);aa=c[l>>2]|0}}while(0);if((aa&64|0)==0){break}R=c[$>>2]|0;if((a[R+5|0]&3)==0){break}$f(b,R)}}while(0);$=$+32|0;}while($>>>0<o>>>0)}}while(0);r=(c[G+28>>2]<<4)+32+(32<<d[G+7|0])|0;break};default:{i=e;return}}}while(0);$=b+16|0;c[$>>2]=(c[$>>2]|0)+r;i=e;return}function qg(b){b=b|0;var d=0,e=0;d=i;e=c[b+252>>2]|0;do{if((e|0)!=0){if((a[e+5|0]&3)==0){break}$f(b,e)}}while(0);e=c[b+256>>2]|0;do{if((e|0)!=0){if((a[e+5|0]&3)==0){break}$f(b,e)}}while(0);e=c[b+260>>2]|0;do{if((e|0)!=0){if((a[e+5|0]&3)==0){break}$f(b,e)}}while(0);e=c[b+264>>2]|0;do{if((e|0)!=0){if((a[e+5|0]&3)==0){break}$f(b,e)}}while(0);e=c[b+268>>2]|0;do{if((e|0)!=0){if((a[e+5|0]&3)==0){break}$f(b,e)}}while(0);e=c[b+272>>2]|0;do{if((e|0)!=0){if((a[e+5|0]&3)==0){break}$f(b,e)}}while(0);e=c[b+276>>2]|0;do{if((e|0)!=0){if((a[e+5|0]&3)==0){break}$f(b,e)}}while(0);e=c[b+280>>2]|0;do{if((e|0)!=0){if((a[e+5|0]&3)==0){break}$f(b,e)}}while(0);e=c[b+284>>2]|0;if((e|0)==0){i=d;return}if((a[e+5|0]&3)==0){i=d;return}$f(b,e);i=d;return}function rg(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;if((e|0)==(f|0)){i=g;return}else{h=e}do{e=h;j=h+16|0;k=c[j>>2]|0;l=k+(1<<(d[e+7|0]|0)<<5)|0;m=e+28|0;if((c[m>>2]|0)>0){e=h+12|0;n=0;do{o=c[e>>2]|0;p=o+(n<<4)+8|0;q=c[p>>2]|0;do{if((q&64|0)!=0){r=c[o+(n<<4)>>2]|0;if((q&15|0)!=4){if((a[r+5|0]&3)==0){break}c[p>>2]=0;break}if((r|0)==0){break}if((a[r+5|0]&3)==0){break}$f(b,r)}}while(0);n=n+1|0;}while((n|0)<(c[m>>2]|0));s=c[j>>2]|0}else{s=k}if(s>>>0<l>>>0){m=s;do{n=m+8|0;e=c[n>>2]|0;do{if(!((e|0)==0|(e&64|0)==0)){p=c[m>>2]|0;if((e&15|0)==4){if((p|0)==0){break}if((a[p+5|0]&3)==0){break}$f(b,p);break}if((a[p+5|0]&3)==0){break}c[n>>2]=0;p=m+24|0;if((c[p>>2]&64|0)==0){break}if((a[(c[m+16>>2]|0)+5|0]&3)==0){break}c[p>>2]=11}}while(0);m=m+32|0;}while(m>>>0<l>>>0)}h=c[h+24>>2]|0;}while((h|0)!=(f|0));i=g;return}function sg(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;f=i;g=e+16|0;h=c[g>>2]|0;j=h+(1<<(d[e+7|0]|0)<<5)|0;k=e+28|0;l=c[k>>2]|0;if((l|0)>0){m=e+12|0;n=l;l=0;o=0;while(1){p=c[m>>2]|0;do{if((c[p+(l<<4)+8>>2]&64|0)==0){q=n;r=o}else{s=c[p+(l<<4)>>2]|0;if((a[s+5|0]&3)==0){q=n;r=o;break}$f(b,s);q=c[k>>2]|0;r=1}}while(0);p=l+1|0;if((p|0)<(q|0)){n=q;l=p;o=r}else{break}}t=c[g>>2]|0;u=r}else{t=h;u=0}do{if(t>>>0<j>>>0){h=0;r=u;g=t;o=0;while(1){l=g+8|0;q=c[l>>2]|0;n=g+24|0;k=c[n>>2]|0;m=(k&64|0)==0;a:do{if((q|0)==0){if(m){v=h;w=r;x=o;break}if((a[(c[g+16>>2]|0)+5|0]&3)==0){v=h;w=r;x=o;break}c[n>>2]=11;v=h;w=r;x=o}else{do{if(m){y=q;z=18}else{p=c[g+16>>2]|0;if((k&15|0)==4){if((p|0)==0){y=q;z=18;break}if((a[p+5|0]&3)==0){y=q;z=18;break}$f(b,p);y=c[l>>2]|0;z=18;break}s=(q&64|0)==0;if((a[p+5|0]&3)==0){if(s){v=h;w=r;x=o;break a}else{break}}if(s){v=1;w=r;x=o;break a}v=1;w=r;x=(a[(c[g>>2]|0)+5|0]&3)==0?o:1;break a}}while(0);if((z|0)==18){z=0;if((y&64|0)==0){v=h;w=r;x=o;break}}s=c[g>>2]|0;if((a[s+5|0]&3)==0){v=h;w=r;x=o;break}$f(b,s);v=h;w=1;x=o}}while(0);q=g+32|0;if(q>>>0<j>>>0){h=v;r=w;g=q;o=x}else{break}}if((x|0)!=0){o=b+96|0;c[e+24>>2]=c[o>>2];c[o>>2]=e;A=w;i=f;return A|0}if((v|0)==0){B=w;break}o=b+100|0;c[e+24>>2]=c[o>>2];c[o>>2]=e;A=w;i=f;return A|0}else{B=u}}while(0);u=b+88|0;c[e+24>>2]=c[u>>2];c[u>>2]=e;A=B;i=f;return A|0}function tg(a){a=a|0;var b=0;b=i;bf(a,1712,142,1);$c(a,-2);bf(a,1720,143,1);$c(a,-2);bf(a,1728,144,1);$c(a,-2);bf(a,1744,145,1);$c(a,-2);bf(a,1752,146,1);$c(a,-2);bf(a,1760,147,1);$c(a,-2);bf(a,1768,148,1);$c(a,-2);bf(a,1776,149,1);$c(a,-2);bf(a,1784,150,1);$c(a,-2);bf(a,1792,151,1);$c(a,-2);af(a,-1001e3,1696)|0;$c(a,-2);i=b;return}function ug(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;Md(a,0,11);$e(a,1800,0);se(a,1952)|0;ed(a,-1);Rd(a,-2,1992);$e(a,2e3,0);$c(a,-2);d=c[q>>2]|0;e=ge(a,8)|0;f=e+4|0;c[f>>2]=0;te(a,1952);c[e>>2]=d;c[f>>2]=152;ed(a,-1);Rd(a,-1001e3,1896);Rd(a,-2,1912);f=c[r>>2]|0;d=ge(a,8)|0;e=d+4|0;c[e>>2]=0;te(a,1952);c[d>>2]=f;c[e>>2]=152;ed(a,-1);Rd(a,-1001e3,1920);Rd(a,-2,1936);e=c[p>>2]|0;f=ge(a,8)|0;d=f+4|0;c[d>>2]=0;te(a,1952);c[f>>2]=e;c[d>>2]=152;Rd(a,-2,1944);i=b;return 1}function vg(a){a=a|0;var b=0;b=i;c[(ve(a,1,1952)|0)+4>>2]=152;vd(a);zd(a,1960,26)|0;i=b;return 2}function wg(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;if((fd(a,1)|0)==-1){Jd(a,-1001e3,1920)}if((c[(ve(a,1,1952)|0)+4>>2]|0)==0){ne(a,2200,b)|0}d=(ve(a,1,1952)|0)+4|0;e=c[d>>2]|0;c[d>>2]=0;d=xc[e&255](a)|0;i=b;return d|0}function xg(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=ve(a,1,1952)|0;if((c[d+4>>2]|0)==0){ne(a,2200,b)|0}e=qe(a,(ec(c[d>>2]|0)|0)==0|0,0)|0;i=b;return e|0}function yg(a){a=a|0;var b=0;b=i;i=i+8|0;if((c[(ve(a,1,1952)|0)+4>>2]|0)!=0){Ig(a,0);i=b;return 1}ne(a,2200,b)|0;Ig(a,0);i=b;return 1}function zg(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=ve(a,1,1952)|0;if((c[d+4>>2]|0)==0){ne(a,2200,b)|0}e=Gg(a,c[d>>2]|0,2)|0;i=b;return e|0}function Ag(a){a=a|0;var b=0,d=0,e=0,f=0.0,g=0,h=0;b=i;i=i+8|0;d=ve(a,1,1952)|0;if((c[d+4>>2]|0)==0){ne(a,2200,b)|0}e=c[d>>2]|0;d=we(a,2,2328,2304)|0;f=+De(a,3,0.0);g=~~f;if(!(+(g|0)==f)){me(a,3,2344)|0}if((Kb(e|0,g|0,c[2288+(d<<2)>>2]|0)|0)==0){wd(a,+(Na(e|0)|0));h=1;i=b;return h|0}else{h=qe(a,0,0)|0;i=b;return h|0}return 0}function Bg(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=i;i=i+8|0;d=ve(a,1,1952)|0;if((c[d+4>>2]|0)==0){ne(a,2200,b)|0}e=c[d>>2]|0;d=we(a,2,0,2248)|0;f=Ge(a,3,1024)|0;g=qe(a,(Ya(e|0,0,c[2232+(d<<2)>>2]|0,f|0)|0)==0|0,0)|0;i=b;return g|0}function Cg(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=ve(a,1,1952)|0;if((c[d+4>>2]|0)==0){ne(a,2200,b)|0}e=c[d>>2]|0;ed(a,1);d=Fg(a,e,2)|0;i=b;return d|0}function Dg(a){a=a|0;var b=0,d=0,e=0;b=i;d=ve(a,1,1952)|0;if((c[d+4>>2]|0)==0){i=b;return 0}if((c[d>>2]|0)==0){i=b;return 0}d=(ve(a,1,1952)|0)+4|0;e=c[d>>2]|0;c[d>>2]=0;xc[e&255](a)|0;i=b;return 0}function Eg(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=b;e=ve(a,1,1952)|0;if((c[e+4>>2]|0)==0){zd(a,2160,13)|0;i=b;return 1}else{c[d>>2]=c[e>>2];Cd(a,2176,d)|0;i=b;return 1}return 0}function Fg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,j=0,l=0,m=0,n=0,o=0,p=0.0,q=0,r=0;e=i;i=i+8|0;f=e;g=i;i=i+8|0;j=_c(a)|0;if((j|0)==(d|0)){l=1;i=e;return l|0}m=d;n=j-d|0;d=1;while(1){j=n+ -1|0;do{if((fd(a,m)|0)==3){if((d|0)==0){o=0;break}p=+md(a,m,0);q=f;h[k>>3]=p;c[q>>2]=c[k>>2];c[q+4>>2]=c[k+4>>2];o=(sb(b|0,2192,f|0)|0)>0}else{q=ye(a,m,g)|0;if((d|0)==0){o=0;break}r=qb(q|0,1,c[g>>2]|0,b|0)|0;o=(r|0)==(c[g>>2]|0)}}while(0);if((j|0)==0){break}else{m=m+1|0;d=o&1;n=j}}if(o){l=1;i=e;return l|0}l=qe(a,0,0)|0;i=e;return l|0}function Gg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;f=i;i=i+8|0;g=f;j=i;i=i+1040|0;k=i;i=i+8|0;l=i;i=i+1040|0;m=_c(b)|0;qc(d|0);a:do{if((m|0)==1){n=e+1|0;o=Hg(b,d,1)|0}else{ze(b,m+19|0,2376);p=l+8|0;q=j+8|0;r=m+ -2|0;s=e;b:while(1){do{if((fd(b,s)|0)==3){t=nd(b,s,0)|0;if((t|0)==0){u=wb(d|0)|0;cc(u|0,d|0)|0;zd(b,0,0)|0;v=(u|0)!=-1|0;break}else{Ne(b,l);u=ta(He(l,t)|0,1,t|0,d|0)|0;c[p>>2]=(c[p>>2]|0)+u;Ke(l);v=(u|0)!=0|0;break}}else{u=qd(b,s,0)|0;if((u|0)==0){w=10}else{if((a[u]|0)!=42){w=10}}if((w|0)==10){w=0;me(b,s,2400)|0}t=a[u+1|0]|0;if((t|0)==76){v=Hg(b,d,0)|0;break}else if((t|0)==97){Ne(b,j);u=ta(He(j,1024)|0,1,1024,d|0)|0;c[q>>2]=(c[q>>2]|0)+u;if(!(u>>>0<1024)){u=1024;do{u=u<<(u>>>0<1073741824);x=ta(He(j,u)|0,1,u|0,d|0)|0;c[q>>2]=(c[q>>2]|0)+x;}while(!(x>>>0<u>>>0))}Ke(j);v=1;break}else if((t|0)==110){c[g>>2]=k;if((db(d|0,2432,g|0)|0)!=1){w=14;break b}wd(b,+h[k>>3]);v=1;break}else if((t|0)==108){v=Hg(b,d,1)|0;break}else{break b}}}while(0);u=s+1|0;if((r|0)==0|(v|0)==0){n=u;o=v;break a}else{r=r+ -1|0;s=u}}if((w|0)==14){vd(b);n=s+1|0;o=0;break}y=me(b,s,2416)|0;i=f;return y|0}}while(0);if((Ga(d|0)|0)!=0){y=qe(b,0,0)|0;i=f;return y|0}if((o|0)==0){$c(b,-2);vd(b)}y=n-e|0;i=f;return y|0}function Hg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+1040|0;g=f;Ne(b,g);h=He(g,1024)|0;a:do{if((jc(h|0,1024,d|0)|0)!=0){j=g+8|0;k=h;while(1){l=Um(k|0)|0;if((l|0)!=0){if((a[k+(l+ -1)|0]|0)==10){break}}c[j>>2]=(c[j>>2]|0)+l;k=He(g,1024)|0;if((jc(k|0,1024,d|0)|0)==0){break a}}c[j>>2]=l-e+(c[j>>2]|0);Ke(g);m=1;i=f;return m|0}}while(0);Ke(g);m=(rd(b,-1)|0)!=0|0;i=f;return m|0}function Ig(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=i;d=_c(a)|0;e=d+ -1|0;if((d|0)>=19){me(a,17,2440)|0}ed(a,1);xd(a,e);Ed(a,b);if((d|0)>=2){b=1;while(1){f=b+1|0;ed(a,f);if((b|0)<(e|0)){b=f}else{break}}}Dd(a,153,d+2|0);i=c;return}function Jg(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;i=i+8|0;d=b;e=i;i=i+8|0;f=sd(a,-1001001)|0;g=nd(a,-1001002,0)|0;if((c[f+4>>2]|0)==0){h=ne(a,2464,e)|0;i=b;return h|0}$c(a,1);if((g|0)>=1){e=1;while(1){ed(a,-1001003-e|0);if((e|0)==(g|0)){break}else{e=e+1|0}}}e=Gg(a,c[f>>2]|0,2)|0;if((fd(a,0-e|0)|0)!=0){h=e;i=b;return h|0}if((e|0)>1){c[d>>2]=qd(a,1-e|0,0)|0;h=ne(a,2488,d)|0;i=b;return h|0}if((pd(a,-1001003)|0)==0){h=0;i=b;return h|0}$c(a,0);ed(a,-1001001);d=(ve(a,1,1952)|0)+4|0;e=c[d>>2]|0;c[d>>2]=0;xc[e&255](a)|0;h=0;i=b;return h|0}function Kg(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=b;Jd(a,-1001e3,1920);e=sd(a,-1)|0;if((c[e+4>>2]|0)==0){c[d>>2]=1924;ne(a,2544,d)|0}d=qe(a,(ec(c[e>>2]|0)|0)==0|0,0)|0;i=b;return d|0}function Lg(a){a=a|0;var b=0;b=i;Wg(a,1896,2600);i=b;return 1}function Mg(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0;b=i;i=i+8|0;d=b;e=i;i=i+8|0;if((fd(a,1)|0)==-1){vd(a)}if((fd(a,1)|0)==0){Jd(a,-1001e3,1896);cd(a,1);if((c[(ve(a,1,1952)|0)+4>>2]|0)!=0){f=0;Ig(a,f);i=b;return 1}ne(a,2200,e)|0;f=0;Ig(a,f);i=b;return 1}else{e=ye(a,1,0)|0;g=ge(a,8)|0;h=g+4|0;c[h>>2]=0;te(a,1952);j=g;c[j>>2]=0;c[h>>2]=154;h=Xb(e|0,2600)|0;c[j>>2]=h;if((h|0)==0){h=sc(c[(pc()|0)>>2]|0)|0;c[d>>2]=e;c[d+4>>2]=h;ne(a,2640,d)|0}cd(a,1);f=1;Ig(a,f);i=b;return 1}return 0}function Ng(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;d=i;e=ye(b,1,0)|0;f=xe(b,2,2600,0)|0;g=ge(b,8)|0;h=g+4|0;c[h>>2]=0;te(b,1952);j=g;c[j>>2]=0;c[h>>2]=154;h=a[f]|0;do{if(h<<24>>24==0){k=4}else{g=f+1|0;if((ua(2672,h<<24>>24|0,4)|0)==0){k=4;break}l=(a[g]|0)==43?f+2|0:g;if((a[(a[l]|0)==98?l+1|0:l]|0)!=0){k=4}}}while(0);if((k|0)==4){me(b,2,2680)|0}k=Xb(e|0,f|0)|0;c[j>>2]=k;if((k|0)!=0){m=1;i=d;return m|0}m=qe(b,0,e)|0;i=d;return m|0}function Og(a){a=a|0;var b=0;b=i;Wg(a,1920,2632);i=b;return 1}function Pg(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;i=i+8|0;d=ye(a,1,0)|0;xe(a,2,2600,0)|0;e=ge(a,8)|0;f=e+4|0;c[f>>2]=0;te(a,1952);ne(a,2608,b)|0;c[e>>2]=0;c[f>>2]=155;f=qe(a,0,d)|0;i=b;return f|0}function Qg(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=b;Jd(a,-1001e3,1896);e=sd(a,-1)|0;if((c[e+4>>2]|0)==0){c[d>>2]=1900;ne(a,2544,d)|0}d=Gg(a,c[e>>2]|0,1)|0;i=b;return d|0}function Rg(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=i;d=ge(a,8)|0;e=d+4|0;c[e>>2]=0;te(a,1952);f=d;c[f>>2]=0;c[e>>2]=154;e=Ua()|0;c[f>>2]=e;if((e|0)!=0){g=1;i=b;return g|0}g=qe(a,0,0)|0;i=b;return g|0}function Sg(a){a=a|0;var b=0,d=0;b=i;Be(a,1);d=ue(a,1,1952)|0;if((d|0)==0){vd(a);i=b;return 1}if((c[d+4>>2]|0)==0){zd(a,2576,11)|0;i=b;return 1}else{zd(a,2592,4)|0;i=b;return 1}return 0}function Tg(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=b;Jd(a,-1001e3,1920);e=sd(a,-1)|0;if((c[e+4>>2]|0)==0){c[d>>2]=1924;ne(a,2544,d)|0}d=Fg(a,c[e>>2]|0,1)|0;i=b;return d|0}function Ug(a){a=a|0;var b=0,d=0;b=i;d=qe(a,(Nb(c[(ve(a,1,1952)|0)>>2]|0)|0)==0|0,0)|0;i=b;return d|0}function Vg(a){a=a|0;var b=0,c=0;b=i;ve(a,1,1952)|0;c=re(a,-1)|0;i=b;return c|0}function Wg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;i=i+8|0;f=e;g=i;i=i+8|0;if((fd(a,1)|0)<1){Jd(a,-1001e3,b);i=e;return}h=qd(a,1,0)|0;do{if((h|0)==0){if((c[(ve(a,1,1952)|0)+4>>2]|0)==0){ne(a,2200,f)|0}ed(a,1)}else{j=ge(a,8)|0;k=j+4|0;c[k>>2]=0;te(a,1952);l=j;c[l>>2]=0;c[k>>2]=154;k=Xb(h|0,d|0)|0;c[l>>2]=k;if((k|0)!=0){break}k=sc(c[(pc()|0)>>2]|0)|0;c[g>>2]=h;c[g+4>>2]=k;ne(a,2640,g)|0}}while(0);Rd(a,-1001e3,b);Jd(a,-1001e3,b);i=e;return}function Xg(a){a=a|0;var b=0;b=i;Md(a,0,28);$e(a,2696,0);wd(a,3.141592653589793);Rd(a,-2,2928);wd(a,x);Rd(a,-2,2936);i=b;return 1}function Yg(a){a=a|0;var b=0;b=i;wd(a,+S(+(+Ce(a,1))));i=b;return 1}function Zg(a){a=a|0;var b=0;b=i;wd(a,+Y(+(+Ce(a,1))));i=b;return 1}function _g(a){a=a|0;var b=0;b=i;wd(a,+Z(+(+Ce(a,1))));i=b;return 1}function $g(a){a=a|0;var b=0,c=0.0;b=i;c=+Ce(a,1);wd(a,+$(+c,+(+Ce(a,2))));i=b;return 1}function ah(a){a=a|0;var b=0;b=i;wd(a,+_(+(+Ce(a,1))));i=b;return 1}function bh(a){a=a|0;var b=0;b=i;wd(a,+ca(+(+Ce(a,1))));i=b;return 1}function ch(a){a=a|0;var b=0;b=i;wd(a,+ac(+(+Ce(a,1))));i=b;return 1}function dh(a){a=a|0;var b=0;b=i;wd(a,+V(+(+Ce(a,1))));i=b;return 1}function eh(a){a=a|0;var b=0;b=i;wd(a,+Ce(a,1)/.017453292519943295);i=b;return 1}function fh(a){a=a|0;var b=0;b=i;wd(a,+aa(+(+Ce(a,1))));i=b;return 1}function gh(a){a=a|0;var b=0;b=i;wd(a,+R(+(+Ce(a,1))));i=b;return 1}function hh(a){a=a|0;var b=0,c=0.0;b=i;c=+Ce(a,1);wd(a,+xb(+c,+(+Ce(a,2))));i=b;return 1}function ih(a){a=a|0;var b=0,d=0;b=i;i=i+8|0;d=b;wd(a,+qa(+(+Ce(a,1)),d|0));xd(a,c[d>>2]|0);i=b;return 2}function jh(a){a=a|0;var b=0,c=0.0;b=i;c=+Ce(a,1);wd(a,+xm(c,Ee(a,2)|0));i=b;return 1}function kh(a){a=a|0;var b=0;b=i;wd(a,+fc(+(+Ce(a,1))));i=b;return 1}function lh(a){a=a|0;var b=0,c=0.0,d=0.0,e=0.0;b=i;c=+Ce(a,1);do{if((fd(a,2)|0)<1){d=+ba(+c)}else{e=+Ce(a,2);if(e==10.0){d=+fc(+c);break}else{d=+ba(+c)/+ba(+e);break}}}while(0);wd(a,d);i=b;return 1}function mh(a){a=a|0;var b=0,c=0,d=0.0,e=0.0,f=0.0,g=0,h=0.0;b=i;c=_c(a)|0;d=+Ce(a,1);if((c|0)<2){e=d}else{f=d;g=2;while(1){d=+Ce(a,g);h=d>f?d:f;if((g|0)==(c|0)){e=h;break}else{g=g+1|0;f=h}}}wd(a,e);i=b;return 1}function nh(a){a=a|0;var b=0,c=0,d=0.0,e=0.0,f=0.0,g=0,h=0.0;b=i;c=_c(a)|0;d=+Ce(a,1);if((c|0)<2){e=d}else{f=d;g=2;while(1){d=+Ce(a,g);h=d<f?d:f;if((g|0)==(c|0)){e=h;break}else{g=g+1|0;f=h}}}wd(a,e);i=b;return 1}function oh(a){a=a|0;var b=0,c=0,d=0.0;b=i;i=i+8|0;c=b;d=+ab(+(+Ce(a,1)),c|0);wd(a,+h[c>>3]);wd(a,d);i=b;return 2}function ph(a){a=a|0;var b=0,c=0.0;b=i;c=+Ce(a,1);wd(a,+U(+c,+(+Ce(a,2))));i=b;return 1}function qh(a){a=a|0;var b=0;b=i;wd(a,+Ce(a,1)*.017453292519943295);i=b;return 1}function rh(a){a=a|0;var b=0,c=0,d=0.0,e=0,f=0.0,g=0,h=0.0;b=i;i=i+8|0;c=b;d=+((Qm()|0)%2147483647|0|0)/2147483647.0;e=_c(a)|0;if((e|0)==1){f=+Ce(a,1);if(!(f>=1.0)){me(a,1,3176)|0}wd(a,+R(+(d*f))+1.0);g=1;i=b;return g|0}else if((e|0)==0){wd(a,d);g=1;i=b;return g|0}else if((e|0)==2){f=+Ce(a,1);h=+Ce(a,2);if(!(f<=h)){me(a,2,3176)|0}wd(a,f+ +R(+(d*(h-f+1.0))));g=1;i=b;return g|0}else{g=ne(a,3200,c)|0;i=b;return g|0}return 0}function sh(a){a=a|0;var b=0;b=i;gb(Fe(a,1)|0);Qm()|0;i=b;return 0}function th(a){a=a|0;var b=0;b=i;wd(a,+Da(+(+Ce(a,1))));i=b;return 1}function uh(a){a=a|0;var b=0;b=i;wd(a,+W(+(+Ce(a,1))));i=b;return 1}function vh(a){a=a|0;var b=0;b=i;wd(a,+T(+(+Ce(a,1))));i=b;return 1}function wh(a){a=a|0;var b=0;b=i;wd(a,+Ja(+(+Ce(a,1))));i=b;return 1}function xh(a){a=a|0;var b=0;b=i;wd(a,+X(+(+Ce(a,1))));i=b;return 1}function yh(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;j=i;i=i+8|0;k=j;l=c[e>>2]|0;do{if((l|0)<((g|0)/2|0|0)){m=l<<1;n=(m|0)<4?4:m}else{if((l|0)<(g|0)){n=g;break}c[k>>2]=h;c[k+4>>2]=g;tf(b,3232,k)}}while(0);if((n+1|0)>>>0>(4294967293/(f>>>0)|0)>>>0){zh(b)}k=da(l,f)|0;l=da(n,f)|0;f=c[b+12>>2]|0;g=(d|0)!=0;h=f;m=f+4|0;o=Bc[c[h>>2]&3](c[m>>2]|0,d,k,l)|0;if((o|0)!=0|(l|0)==0){p=o;q=f+12|0;r=c[q>>2]|0;s=0-k|0;t=g?s:0;u=t+l|0;v=u+r|0;c[q>>2]=v;c[e>>2]=n;i=j;return p|0}if((a[f+63|0]|0)==0){yf(b,4)}ng(b,1);o=Bc[c[h>>2]&3](c[m>>2]|0,d,k,l)|0;if((o|0)==0){yf(b,4)}else{p=o;q=f+12|0;r=c[q>>2]|0;s=0-k|0;t=g?s:0;u=t+l|0;v=u+r|0;c[q>>2]=v;c[e>>2]=n;i=j;return p|0}return 0}function zh(a){a=a|0;var b=0;b=i;i=i+8|0;tf(a,3264,b)}function Ah(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;h=c[b+12>>2]|0;j=(d|0)!=0;k=h;l=h+4|0;m=Bc[c[k>>2]&3](c[l>>2]|0,d,e,f)|0;do{if((m|0)!=0|(f|0)==0){n=m}else{if((a[h+63|0]|0)==0){yf(b,4)}ng(b,1);o=Bc[c[k>>2]&3](c[l>>2]|0,d,e,f)|0;if((o|0)!=0){n=o;break}yf(b,4)}}while(0);b=h+12|0;c[b>>2]=(j?0-e|0:0)+f+(c[b>>2]|0);i=g;return n|0}function Bh(a){a=a|0;var b=0;b=i;af(a,-1001e3,3304)|0;Md(a,0,1);Dd(a,156,0);Rd(a,-2,3312);Ud(a,-2)|0;Md(a,0,3);$e(a,3320,0);Md(a,4,0);ed(a,-2);Dd(a,157,1);Td(a,-2,1);ed(a,-2);Dd(a,158,1);Td(a,-2,2);ed(a,-2);Dd(a,159,1);Td(a,-2,3);ed(a,-2);Dd(a,160,1);Td(a,-2,4);ed(a,-1);Rd(a,-3,3352);Rd(a,-2,3360);Dh(a,3376,3384,3400,3416);Dh(a,3560,3568,3584,3600);zd(a,3672,10)|0;Rd(a,-2,3688);af(a,-1001e3,3696)|0;Rd(a,-2,3704);af(a,-1001e3,3712)|0;Rd(a,-2,3728);Ld(a,-1001e3,2);ed(a,-2);$e(a,3736,1);$c(a,-2);i=b;return 1}function Ch(a){a=a|0;var b=0,c=0,d=0;b=i;c=We(a,1)|0;if((c|0)>0){d=c}else{i=b;return 0}do{Ld(a,1,d);$c(a,-2);d=d+ -1|0;}while((d|0)>0);i=b;return 0}function Dh(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;g=Mb(c|0)|0;if((g|0)==0){c=Mb(d|0)|0;if((c|0)!=0){h=c;j=3}}else{h=g;j=3}do{if((j|0)==3){Jd(a,-1001e3,3952);g=pd(a,-1)|0;$c(a,-2);if((g|0)!=0){break}cf(a,cf(a,h,3928,3936)|0,3944,e)|0;ad(a,-2);Rd(a,-2,b);i=f;return}}while(0);Ad(a,e)|0;Rd(a,-2,b);i=f;return}function Eh(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,j=0;b=i;i=i+8|0;c=b;d=i;i=i+104|0;e=ye(a,1,0)|0;f=_c(a)|0;Ye(a,e,1);Jd(a,-1,3848);g=(fd(a,-1)|0)==0;$c(a,-2);if(g){ed(a,-1);Rd(a,-2,3904);Ad(a,e)|0;Rd(a,-2,3848);g=sa(e|0,46)|0;zd(a,e,((g|0)==0?e:g+1|0)-e|0)|0;Rd(a,-2,3912)}ed(a,-1);do{if((mf(a,1,d)|0)==0){h=6}else{if((qf(a,3856,d)|0)==0){h=6;break}if((hd(a,-1)|0)!=0){h=6}}}while(0);if((h|0)==6){ne(a,3864,c)|0}ed(a,-2);ie(a,-2,1)|0;$c(a,-2);if((f|0)<2){i=b;return 1}else{j=2}while(1){if((fd(a,j)|0)==6){ed(a,j);ed(a,-2);Xd(a,1,0,0,0)}if((j|0)==(f|0)){break}else{j=j+1|0}}i=b;return 1}function Fh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;i=i+8|0;d=b;e=i;i=i+8|0;f=i;i=i+1040|0;g=ye(a,1,0)|0;$c(a,1);Jd(a,-1001e3,3696);Jd(a,2,g);if((pd(a,-1)|0)!=0){i=b;return 1}$c(a,-2);Ne(a,f);Jd(a,-1001001,3360);if((fd(a,3)|0)==5){h=1}else{ne(a,3776,e)|0;h=1}while(1){Ld(a,3,h);if((fd(a,-1)|0)==0){$c(a,-2);Ke(f);e=qd(a,-1,0)|0;c[d>>2]=g;c[d+4>>2]=e;ne(a,3816,d)|0}Ad(a,g)|0;Xd(a,1,2,0,0);if((fd(a,-2)|0)==6){break}if((jd(a,-2)|0)==0){$c(a,-3)}else{$c(a,-2);Me(f)}h=h+1|0}Ad(a,g)|0;bd(a,-2);Xd(a,2,1,0,0);if((fd(a,-1)|0)!=0){Rd(a,2,g)}Jd(a,2,g);if((fd(a,-1)|0)!=0){i=b;return 1}Ed(a,1);ed(a,-1);Rd(a,2,g);i=b;return 1}function Gh(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=b;e=ye(a,1,0)|0;Jd(a,-1001e3,3712);Jd(a,-1,e);if((fd(a,-1)|0)!=0){i=b;return 1}c[d>>2]=e;Cd(a,4216,d)|0;i=b;return 1}function Hh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;i=i+16|0;d=b;e=i;i=i+8|0;f=ye(a,1,0)|0;Jd(a,-1001001,3376);g=qd(a,-1,0)|0;if((g|0)==0){c[e>>2]=3376;ne(a,4152,e)|0}e=Mh(a,f,g,4056,3968)|0;if((e|0)==0){h=1;i=b;return h|0}if((Pe(a,e,0)|0)==0){Ad(a,e)|0;h=2;i=b;return h|0}else{g=qd(a,1,0)|0;f=qd(a,-1,0)|0;c[d>>2]=g;c[d+4>>2]=e;c[d+8>>2]=f;h=ne(a,4008,d)|0;i=b;return h|0}return 0}function Ih(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;i=i+16|0;d=b;e=i;i=i+8|0;f=ye(a,1,0)|0;Jd(a,-1001001,3560);g=qd(a,-1,0)|0;if((g|0)==0){c[e>>2]=3560;ne(a,4152,e)|0}e=Mh(a,f,g,4056,3968)|0;if((e|0)==0){h=1;i=b;return h|0}if((Kh(a,e,f)|0)==0){Ad(a,e)|0;h=2;i=b;return h|0}else{f=qd(a,1,0)|0;g=qd(a,-1,0)|0;c[d>>2]=f;c[d+4>>2]=e;c[d+8>>2]=g;h=ne(a,4008,d)|0;i=b;return h|0}return 0}function Jh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0;b=i;i=i+8|0;d=b;e=i;i=i+16|0;f=i;i=i+8|0;g=ye(a,1,0)|0;h=hb(g|0,46)|0;if((h|0)==0){j=0;i=b;return j|0}zd(a,g,h-g|0)|0;h=qd(a,-1,0)|0;Jd(a,-1001001,3560);k=qd(a,-1,0)|0;if((k|0)==0){c[f>>2]=3560;ne(a,4152,f)|0}f=Mh(a,h,k,4056,3968)|0;if((f|0)==0){j=1;i=b;return j|0}k=Kh(a,f,g)|0;if((k|0)==0){Ad(a,f)|0;j=2;i=b;return j|0}else if((k|0)==2){c[d>>2]=g;c[d+4>>2]=f;Cd(a,3976,d)|0;j=1;i=b;return j|0}else{d=qd(a,1,0)|0;g=qd(a,-1,0)|0;c[e>>2]=d;c[e+4>>2]=f;c[e+8>>2]=g;j=ne(a,4008,e)|0;i=b;return j|0}return 0}function Kh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;i=i+8|0;f=e;g=i;i=i+8|0;h=cf(a,d,4056,4064)|0;d=hb(h|0,45)|0;do{if((d|0)==0){j=h}else{c[g>>2]=zd(a,h,d-h|0)|0;k=Lh(a,b,Cd(a,4072,g)|0)|0;if((k|0)==2){j=d+1|0;break}else{l=k;i=e;return l|0}}}while(0);c[f>>2]=j;l=Lh(a,b,Cd(a,4072,f)|0)|0;i=e;return l|0}function Lh(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;e=i;Jd(b,-1001e3,3304);Jd(b,-1,c);c=sd(b,-1)|0;$c(b,-3);if((c|0)==0){zd(b,4088,58)|0;f=1;i=e;return f|0}if((a[d]|0)==42){Ed(b,1);f=0;i=e;return f|0}else{zd(b,4088,58)|0;f=2;i=e;return f|0}return 0}function Mh(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;h=i;i=i+8|0;j=h;k=i;i=i+1040|0;Ne(b,k);if((a[f]|0)==0){l=d}else{l=cf(b,d,f,g)|0}g=e;while(1){e=a[g]|0;if(e<<24>>24==0){m=12;break}else if(e<<24>>24==59){g=g+1|0;continue}e=hb(g|0,59)|0;if((e|0)==0){n=g+(Um(g|0)|0)|0}else{n=e}zd(b,g,n-g|0)|0;if((n|0)==0){m=12;break}o=cf(b,qd(b,-1,0)|0,4184,l)|0;ad(b,-2);p=Xb(o|0,4208)|0;if((p|0)!=0){m=10;break}c[j>>2]=o;Cd(b,4192,j)|0;ad(b,-2);Me(k);g=n}if((m|0)==10){Nb(p|0)|0;q=o;i=h;return q|0}else if((m|0)==12){Ke(k);q=0;i=h;return q|0}return 0}function Nh(a){a=a|0;var b=0,c=0,d=0,e=0;b=i;c=ye(a,1,0)|0;d=Lh(a,c,ye(a,2,0)|0)|0;if((d|0)==0){e=1;i=b;return e|0}vd(a);bd(a,-2);Ad(a,(d|0)==1?4296:4304)|0;e=3;i=b;return e|0}function Oh(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=i;c=ye(a,1,0)|0;d=ye(a,2,0)|0;e=xe(a,3,4056,0)|0;if((Mh(a,c,d,e,xe(a,4,3968,0)|0)|0)!=0){f=1;i=b;return f|0}vd(a);bd(a,-2);f=2;i=b;return f|0}function Ph(a){a=a|0;var b=0;b=i;Ae(a,1,5);if((Nd(a,1)|0)==0){Md(a,0,1);ed(a,-1);Ud(a,1)|0}Ld(a,-1001e3,2);Rd(a,-2,4288);i=b;return 0}function Qh(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0;b=i;if(a>>>0<8){c=a;i=b;return c|0}if(a>>>0>15){d=a;e=1;do{f=d+1|0;d=f>>>1;e=e+1|0;}while(f>>>0>31);g=d;h=e<<3}else{g=a;h=8}c=h|g+ -8;i=b;return c|0}function Rh(a){a=a|0;var b=0,c=0;b=a>>>3&31;if((b|0)==0){c=a}else{c=(a&7|8)<<b+ -1}i=i;return c|0}function Sh(a){a=a|0;var b=0,c=0,e=0,f=0,g=0,h=0,j=0;b=i;c=a+ -1|0;if(c>>>0>255){a=c;e=0;while(1){f=e+8|0;g=a>>>8;if(a>>>0>65535){e=f;a=g}else{h=g;j=f;break}}}else{h=c;j=0}i=b;return(d[4328+h|0]|0)+j|0}function Th(a,b,c){a=a|0;b=+b;c=+c;var d=0.0;switch(a|0){case 1:{d=b-c;break};case 6:{d=-b;break};case 5:{d=+U(+b,+c);break};case 2:{d=b*c;break};case 0:{d=b+c;break};case 4:{d=b- +R(+(b/c))*c;break};case 3:{d=b/c;break};default:{d=0.0}}i=i;return+d}function Uh(b){b=b|0;var c=0,d=0;c=i;if((a[b+10033|0]&2)==0){d=(b|32)+ -87|0;i=c;return d|0}else{d=b+ -48|0;i=c;return d|0}return 0}function Vh(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,j=0,k=0,l=0.0,m=0,n=0.0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0.0,y=0,z=0,A=0,B=0,C=0,D=0.0,E=0,F=0,G=0,H=0,I=0,J=0,K=0.0,L=0.0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0.0,aa=0;g=i;i=i+8|0;j=g;if((wa(b|0,4584)|0)!=0){k=0;i=g;return k|0}a:do{if((wa(b|0,4592)|0)==0){l=+Lm(b,j);m=c[j>>2]|0;n=l}else{c[j>>2]=b;o=b;while(1){p=a[o]|0;q=o+1|0;if((a[(p&255)+10033|0]&8)==0){break}else{o=q}}if(p<<24>>24==45){r=1;s=q}else if(p<<24>>24==43){r=0;s=q}else{r=0;s=o}do{if((a[s]|0)==48){t=a[s+1|0]|0;if(!(t<<24>>24==88|t<<24>>24==120)){break}t=s+2|0;u=a[t]|0;v=u&255;w=a[v+10033|0]|0;if((w&16)==0){x=0.0;y=u;z=t;A=0}else{l=0.0;u=0;B=t;t=w;w=v;while(1){if((t&2)==0){C=(w|32)+ -87|0}else{C=w+ -48|0}D=l*16.0+ +(C|0);v=u+1|0;E=B+1|0;F=a[E]|0;G=F&255;H=a[G+10033|0]|0;if((H&16)==0){x=D;y=F;z=E;A=v;break}else{l=D;u=v;B=E;t=H;w=G}}}do{if(y<<24>>24==46){w=z+1|0;t=d[w]|0;B=a[t+10033|0]|0;if((B&16)==0){I=w;J=0;K=x;break}else{L=x;M=0;N=w;O=B;P=t}while(1){if((O&2)==0){Q=(P|32)+ -87|0}else{Q=P+ -48|0}l=L*16.0+ +(Q|0);t=M+1|0;B=N+1|0;w=d[B]|0;u=a[w+10033|0]|0;if((u&16)==0){I=B;J=t;K=l;break}else{L=l;M=t;N=B;O=u;P=w}}}else{I=z;J=0;K=x}}while(0);if((J|A|0)==0){break}w=da(J,-4)|0;c[j>>2]=I;u=a[I]|0;do{if(u<<24>>24==80|u<<24>>24==112){B=I+1|0;t=a[B]|0;if(t<<24>>24==45){R=1;S=I+2|0}else if(t<<24>>24==43){R=0;S=I+2|0}else{R=0;S=B}B=a[S]|0;if((a[(B&255)+10033|0]&2)==0){T=I;U=w;break}else{V=S;W=B;X=0}do{V=V+1|0;X=(W<<24>>24)+ -48+(X*10|0)|0;W=a[V]|0;}while(!((a[(W&255)+10033|0]&2)==0));Y=V;Z=((R|0)==0?X:0-X|0)+w|0;_=29}else{Y=I;Z=w;_=29}}while(0);if((_|0)==29){c[j>>2]=Y;T=Y;U=Z}if((r|0)==0){$=K}else{$=-K}m=T;n=+xm($,U);break a}}while(0);h[f>>3]=0.0;k=0;i=g;return k|0}}while(0);h[f>>3]=n;if((m|0)==(b|0)){k=0;i=g;return k|0}if((a[(d[m]|0)+10033|0]&8)==0){aa=m}else{f=m;do{f=f+1|0;}while(!((a[(d[f]|0)+10033|0]&8)==0));c[j>>2]=f;aa=f}k=(aa|0)==(b+e|0)|0;i=g;return k|0}function Wh(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0.0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0;g=i;i=i+8|0;j=g;k=i;i=i+8|0;l=i;i=i+8|0;m=i;i=i+24|0;n=hb(e|0,37)|0;o=b+24|0;p=b+8|0;q=c[p>>2]|0;r=(c[o>>2]|0)-q|0;a:do{if((n|0)==0){s=e;t=r;u=q;v=0}else{w=m;x=e;y=q;z=r;A=n;B=0;b:while(1){if((z|0)<48){Bf(b,2);C=c[p>>2]|0}else{C=y}c[p>>2]=C+16;D=Si(b,x,A-x|0)|0;c[C>>2]=D;c[C+8>>2]=d[D+4|0]|64;E=a[A+1|0]|0;switch(E|0){case 112:{D=f;F=c[D>>2]|0;G=c[F>>2]|0;c[D>>2]=F+4;c[k>>2]=G;G=nb(w|0,4608,k|0)|0;F=c[p>>2]|0;c[p>>2]=F+16;D=Si(b,w,G)|0;c[F>>2]=D;c[F+8>>2]=d[D+4|0]|64;break};case 99:{D=f;F=c[D>>2]|0;G=c[F>>2]|0;c[D>>2]=F+4;a[l]=G;G=c[p>>2]|0;c[p>>2]=G+16;F=Si(b,l,1)|0;c[G>>2]=F;c[G+8>>2]=d[F+4|0]|64;break};case 100:{F=c[p>>2]|0;c[p>>2]=F+16;G=f;D=c[G>>2]|0;H=c[D>>2]|0;c[G>>2]=D+4;h[F>>3]=+(H|0);c[F+8>>2]=3;break};case 102:{F=c[p>>2]|0;c[p>>2]=F+16;H=f;D=c[H>>2]|0;I=+h[D>>3];c[H>>2]=D+8;h[F>>3]=I;c[F+8>>2]=3;break};case 115:{F=f;D=c[F>>2]|0;H=c[D>>2]|0;c[F>>2]=D+4;D=(H|0)==0?4600:H;H=Um(D|0)|0;F=c[p>>2]|0;c[p>>2]=F+16;G=Si(b,D,H)|0;c[F>>2]=G;c[F+8>>2]=d[G+4|0]|64;break};case 37:{G=c[p>>2]|0;c[p>>2]=G+16;F=Si(b,4616,1)|0;c[G>>2]=F;c[G+8>>2]=d[F+4|0]|64;break};default:{break b}}F=B+2|0;G=A+2|0;H=hb(G|0,37)|0;D=c[p>>2]|0;J=(c[o>>2]|0)-D|0;if((H|0)==0){s=G;t=J;u=D;v=F;break a}else{x=G;y=D;z=J;A=H;B=F}}c[j>>2]=E;tf(b,4624,j)}}while(0);if((t|0)<32){Bf(b,1);K=c[p>>2]|0}else{K=u}u=Um(s|0)|0;c[p>>2]=K+16;t=Si(b,s,u)|0;c[K>>2]=t;c[K+8>>2]=d[t+4|0]|64;if((v|0)<=0){L=c[p>>2]|0;M=L+ -16|0;N=M;O=c[N>>2]|0;P=O+16|0;Q=P;i=g;return Q|0}$j(b,v|1);L=c[p>>2]|0;M=L+ -16|0;N=M;O=c[N>>2]|0;P=O+16|0;Q=P;i=g;return Q|0}function Xh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+16|0;f=e;c[f>>2]=d;d=Wh(a,b,f)|0;i=e;return d|0}function Yh(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;f=Um(c|0)|0;g=a[c]|0;if(g<<24>>24==61){h=c+1|0;if(f>>>0>d>>>0){j=d+ -1|0;Xm(b|0,h|0,j|0)|0;a[b+j|0]=0;i=e;return}else{Xm(b|0,h|0,f|0)|0;i=e;return}}else if(g<<24>>24==64){if(f>>>0>d>>>0){a[b+0|0]=a[4672|0]|0;a[b+1|0]=a[4673|0]|0;a[b+2|0]=a[4674|0]|0;Xm(b+3|0,c+(4-d+f)|0,d+ -3|0)|0;i=e;return}else{Xm(b|0,c+1|0,f|0)|0;i=e;return}}else{g=hb(c|0,10)|0;h=b+0|0;j=4680|0;k=h+9|0;do{a[h]=a[j]|0;h=h+1|0;j=j+1|0}while((h|0)<(k|0));j=b+9|0;h=d+ -15|0;d=(g|0)==0;if(f>>>0<h>>>0&d){Xm(j|0,c|0,f|0)|0;l=f+9|0}else{if(d){m=f}else{m=g-c|0}g=m>>>0>h>>>0?h:m;Xm(j|0,c|0,g|0)|0;c=b+(g+9)|0;a[c+0|0]=a[4672|0]|0;a[c+1|0]=a[4673|0]|0;a[c+2|0]=a[4674|0]|0;l=g+12|0}g=b+l|0;a[g+0|0]=a[4696|0]|0;a[g+1|0]=a[4697|0]|0;a[g+2|0]=a[4698|0]|0;i=e;return}}function Zh(a){a=a|0;var b=0;b=i;Md(a,0,11);$e(a,4744,0);i=b;return 1}function _h(a){a=a|0;var b=0;b=i;wd(a,+(Ha()|0)/1.0e6);i=b;return 1}function $h(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;d=i;i=i+8|0;e=d;f=i;i=i+8|0;g=i;i=i+8|0;h=i;i=i+1040|0;j=i;i=i+200|0;k=xe(b,1,5184,0)|0;if((fd(b,2)|0)<1){l=rb(0)|0}else{l=~~+Ce(b,2)}c[f>>2]=l;if((a[k]|0)==33){m=k+1|0;n=kb(f|0)|0}else{m=k;n=ob(f|0)|0}if((n|0)==0){vd(b);i=d;return 1}if((Nm(m,5192)|0)==0){Md(b,0,9);xd(b,c[n>>2]|0);Rd(b,-2,4984);xd(b,c[n+4>>2]|0);Rd(b,-2,4992);xd(b,c[n+8>>2]|0);Rd(b,-2,5e3);xd(b,c[n+12>>2]|0);Rd(b,-2,5008);xd(b,(c[n+16>>2]|0)+1|0);Rd(b,-2,5016);xd(b,(c[n+20>>2]|0)+1900|0);Rd(b,-2,5024);xd(b,(c[n+24>>2]|0)+1|0);Rd(b,-2,5200);xd(b,(c[n+28>>2]|0)+1|0);Rd(b,-2,5208);f=c[n+32>>2]|0;if((f|0)<0){i=d;return 1}Ed(b,f);Rd(b,-2,5032);i=d;return 1}f=g;a[f]=37;Ne(b,h);k=h+8|0;l=h+4|0;o=h;p=j;j=g+1|0;q=g+2|0;g=m;while(1){m=a[g]|0;if(m<<24>>24==0){break}else if(!(m<<24>>24==37)){r=c[k>>2]|0;if(r>>>0<(c[l>>2]|0)>>>0){s=r;t=m}else{He(h,1)|0;s=c[k>>2]|0;t=a[g]|0}c[k>>2]=s+1;a[(c[o>>2]|0)+s|0]=t;g=g+1|0;continue}m=g+1|0;r=g+2|0;u=a[m]|0;do{if(u<<24>>24==0){v=20}else{if((ua(5216,u<<24>>24|0,23)|0)==0){v=20;break}a[j]=u;a[q]=0;w=r}}while(0);if((v|0)==20){v=0;c[e>>2]=m;me(b,1,Cd(b,5240,e)|0)|0;w=m}Ie(h,p,Jb(p|0,200,f|0,n|0)|0);g=w}Ke(h);i=d;return 1}function ai(a){a=a|0;var b=0,c=0;b=i;c=~~+Ce(a,1);wd(a,+bc(c|0,~~+De(a,2,0.0)|0));i=b;return 1}function bi(a){a=a|0;var b=0,c=0,d=0,e=0;b=i;c=xe(a,1,0,0)|0;d=dc(c|0)|0;if((c|0)==0){Ed(a,d);e=1;i=b;return e|0}else{e=re(a,d)|0;i=b;return e|0}return 0}function ci(a){a=a|0;var b=0,c=0;b=i;if((fd(a,1)|0)==1){c=(pd(a,1)|0)==0|0}else{c=Ge(a,1,0)|0}if((pd(a,2)|0)!=0){Ni(a)}if((a|0)==0){i=b;return 0}else{tb(c|0)}return 0}function di(a){a=a|0;var b=0;b=i;Ad(a,Mb(ye(a,1,0)|0)|0)|0;i=b;return 1}function ei(a){a=a|0;var b=0,c=0,d=0;b=i;c=ye(a,1,0)|0;d=qe(a,(Gb(c|0)|0)==0|0,c)|0;i=b;return d|0}function fi(a){a=a|0;var b=0,c=0,d=0;b=i;c=ye(a,1,0)|0;d=qe(a,(Aa(c|0,ye(a,2,0)|0)|0)==0|0,0)|0;i=b;return d|0}function gi(a){a=a|0;var b=0,d=0;b=i;d=xe(a,1,0,0)|0;Ad(a,_a(c[5080+((we(a,2,5136,5104)|0)<<2)>>2]|0,d|0)|0)|0;i=b;return 1}



function hi(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;b=i;i=i+8|0;d=b;e=i;i=i+8|0;f=i;i=i+8|0;g=i;i=i+8|0;h=i;i=i+8|0;j=i;i=i+8|0;k=i;i=i+8|0;l=i;i=i+8|0;m=i;i=i+8|0;n=i;i=i+48|0;if((fd(a,1)|0)<1){o=rb(0)|0}else{Ae(a,1,5);$c(a,1);Jd(a,-1,4984);p=nd(a,-1,m)|0;q=(c[m>>2]|0)==0?0:p;$c(a,-2);c[n>>2]=q;Jd(a,-1,4992);q=nd(a,-1,l)|0;p=(c[l>>2]|0)==0?0:q;$c(a,-2);c[n+4>>2]=p;Jd(a,-1,5e3);p=nd(a,-1,k)|0;q=(c[k>>2]|0)==0?12:p;$c(a,-2);c[n+8>>2]=q;Jd(a,-1,5008);q=nd(a,-1,j)|0;if((c[j>>2]|0)==0){c[f>>2]=5008;r=ne(a,5040,f)|0}else{$c(a,-2);r=q}c[n+12>>2]=r;Jd(a,-1,5016);r=nd(a,-1,h)|0;if((c[h>>2]|0)==0){c[e>>2]=5016;s=ne(a,5040,e)|0}else{$c(a,-2);s=r}c[n+16>>2]=s+ -1;Jd(a,-1,5024);s=nd(a,-1,g)|0;if((c[g>>2]|0)==0){c[d>>2]=5024;t=ne(a,5040,d)|0}else{$c(a,-2);t=s}c[n+20>>2]=t+ -1900;Jd(a,-1,5032);if((fd(a,-1)|0)==0){u=-1}else{u=pd(a,-1)|0}$c(a,-2);c[n+32>>2]=u;o=ib(n|0)|0}if((o|0)==-1){vd(a);i=b;return 1}else{wd(a,+(o|0));i=b;return 1}return 0}function ii(a){a=a|0;var b=0,c=0,d=0,e=0;b=i;i=i+8|0;c=i;i=i+24|0;d=c;if((Sa(d|0)|0)==0){e=ne(a,4944,b)|0;i=b;return e|0}else{Ad(a,d)|0;e=1;i=b;return e|0}return 0}function ji(d,e,f,g,h,j){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;k=i;i=i+176|0;l=k;m=k+16|0;n=k+40|0;o=k+120|0;p=Sf(d,1)|0;q=d+8|0;r=c[q>>2]|0;c[r>>2]=p;c[r+8>>2]=70;r=(c[q>>2]|0)+16|0;c[q>>2]=r;if(((c[d+24>>2]|0)-r|0)<16){Bf(d,0)}r=Xf(d)|0;c[p+12>>2]=r;q=o;c[q>>2]=r;r=Ti(d,h)|0;c[(c[q>>2]|0)+36>>2]=r;c[n+60>>2]=f;f=n+64|0;c[f>>2]=g;c[g+28>>2]=0;c[g+16>>2]=0;c[g+4>>2]=0;nm(d,n,e,c[(c[q>>2]|0)+36>>2]|0,j);j=c[n+52>>2]|0;e=n+48|0;c[o+8>>2]=c[e>>2];d=o+12|0;c[d>>2]=n;c[e>>2]=o;c[o+20>>2]=0;c[o+24>>2]=0;c[o+28>>2]=-1;c[o+32>>2]=0;c[o+36>>2]=0;e=o+44|0;c[e+0>>2]=0;a[e+4|0]=0;c[o+40>>2]=c[(c[f>>2]|0)+4>>2];f=o+16|0;c[f>>2]=0;e=c[q>>2]|0;c[e+36>>2]=c[n+68>>2];a[e+78|0]=2;e=uj(j)|0;c[o+4>>2]=e;g=j+8|0;r=c[g>>2]|0;c[r>>2]=e;c[r+8>>2]=69;r=(c[g>>2]|0)+16|0;c[g>>2]=r;if(((c[j+24>>2]|0)-r|0)<16){Bf(j,0)}a[l+10|0]=0;a[l+8|0]=a[o+46|0]|0;j=c[(c[d>>2]|0)+64>>2]|0;b[l+4>>1]=c[j+28>>2];b[l+6>>1]=c[j+16>>2];a[l+9|0]=0;c[l>>2]=c[f>>2];c[f>>2]=l;a[(c[q>>2]|0)+77|0]=1;c[m+16>>2]=-1;c[m+20>>2]=-1;c[m>>2]=7;c[m+8>>2]=0;ki(o,c[n+72>>2]|0,m)|0;om(n);m=n+16|0;a:while(1){o=c[m>>2]|0;switch(o|0){case 277:case 286:case 262:case 261:case 260:{s=o;break a;break};default:{}}ri(n);if((o|0)==274){t=8;break}}if((t|0)==8){s=c[m>>2]|0}if((s|0)==286){li(n);i=k;return p|0}else{qi(n,286)}return 0}function ki(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;g=i;i=i+16|0;h=g;j=i;i=i+8|0;k=c[b>>2]|0;l=k+40|0;m=c[l>>2]|0;n=b+47|0;o=d[n]|0;if((o+1|0)>>>0>255){p=b+12|0;q=c[(c[p>>2]|0)+52>>2]|0;r=c[k+64>>2]|0;if((r|0)==0){s=5672;t=h;c[t>>2]=6e3;u=h+4|0;c[u>>2]=255;v=h+8|0;c[v>>2]=s;w=Xh(q,5712,h)|0;x=c[p>>2]|0;km(x,w)}c[j>>2]=r;s=Xh(q,5688,j)|0;t=h;c[t>>2]=6e3;u=h+4|0;c[u>>2]=255;v=h+8|0;c[v>>2]=s;w=Xh(q,5712,h)|0;x=c[p>>2]|0;km(x,w)}if((o|0)<(m|0)){y=m}else{o=k+28|0;c[o>>2]=yh(c[(c[b+12>>2]|0)+52>>2]|0,c[o>>2]|0,l,8,255,6e3)|0;y=c[l>>2]|0}l=k+28|0;if((m|0)<(y|0)){o=m;while(1){m=o+1|0;c[(c[l>>2]|0)+(o<<3)>>2]=0;if((m|0)<(y|0)){o=m}else{break}}}a[(c[l>>2]|0)+((d[n]|0)<<3)+4|0]=(c[f>>2]|0)==7|0;a[(c[l>>2]|0)+((d[n]|0)<<3)+5|0]=c[f+8>>2];c[(c[l>>2]|0)+((d[n]|0)<<3)>>2]=e;if((a[e+5|0]&3)==0){z=a[n]|0;A=z+1<<24>>24;a[n]=A;B=z&255;i=g;return B|0}if((a[k+5|0]&4)==0){z=a[n]|0;A=z+1<<24>>24;a[n]=A;B=z&255;i=g;return B|0}_f(c[(c[b+12>>2]|0)+52>>2]|0,k,e);z=a[n]|0;A=z+1<<24>>24;a[n]=A;B=z&255;i=g;return B|0}function li(a){a=a|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;f=c[a+52>>2]|0;g=a+48|0;h=c[g>>2]|0;j=c[h>>2]|0;bl(h,0,0);mi(h);k=h+20|0;l=c[k>>2]|0;if((l+1|0)>>>0>1073741823){zh(f)}m=j+12|0;n=j+48|0;c[m>>2]=Ah(f,c[m>>2]|0,c[n>>2]<<2,l<<2)|0;c[n>>2]=c[k>>2];n=c[k>>2]|0;if((n+1|0)>>>0>1073741823){zh(f)}l=j+20|0;m=j+52|0;c[l>>2]=Ah(f,c[l>>2]|0,c[m>>2]<<2,n<<2)|0;c[m>>2]=c[k>>2];k=h+32|0;m=c[k>>2]|0;if((m+1|0)>>>0>268435455){zh(f)}n=j+8|0;l=j+44|0;c[n>>2]=Ah(f,c[n>>2]|0,c[l>>2]<<4,m<<4)|0;c[l>>2]=c[k>>2];k=h+36|0;l=c[k>>2]|0;if((l+1|0)>>>0>1073741823){zh(f)}m=j+16|0;n=j+56|0;c[m>>2]=Ah(f,c[m>>2]|0,c[n>>2]<<2,l<<2)|0;c[n>>2]=c[k>>2];k=h+44|0;n=b[k>>1]|0;if((n+1|0)>>>0>357913941){zh(f)}l=j+24|0;m=j+60|0;c[l>>2]=Ah(f,c[l>>2]|0,(c[m>>2]|0)*12|0,n*12|0)|0;c[m>>2]=b[k>>1]|0;k=h+47|0;m=j+28|0;n=j+40|0;c[m>>2]=Ah(f,c[m>>2]|0,c[n>>2]<<3,d[k]<<3)|0;c[n>>2]=d[k]|0;c[g>>2]=c[h+8>>2];if(((c[a+16>>2]|0)+ -288|0)>>>0<2){h=c[a+24>>2]|0;mm(a,h+16|0,c[h+12>>2]|0)|0}h=f+8|0;c[h>>2]=(c[h>>2]|0)+ -16;if((c[(c[f+12>>2]|0)+12>>2]|0)<=0){i=e;return}mg(f);i=e;return}function mi(e){e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;f=i;i=i+8|0;g=f;h=e+16|0;j=c[h>>2]|0;k=e+12|0;l=c[k>>2]|0;m=j;do{if((c[m>>2]|0)!=0){if((a[j+9|0]|0)==0){break}n=_k(e)|0;fl(e,n,d[j+8|0]|0);el(e,n)}}while(0);a:do{if((a[j+10|0]|0)!=0){n=l+52|0;o=Ti(c[n>>2]|0,5424)|0;p=l+64|0;q=c[p>>2]|0;r=q+24|0;s=l+48|0;t=c[(c[s>>2]|0)+20>>2]|0;u=q+28|0;v=c[u>>2]|0;w=q+32|0;if((v|0)<(c[w>>2]|0)){x=c[r>>2]|0}else{q=r;y=yh(c[n>>2]|0,c[q>>2]|0,w,16,32767,5432)|0;c[q>>2]=y;x=y}y=r;c[x+(v<<4)>>2]=o;o=c[y>>2]|0;c[o+(v<<4)+8>>2]=0;a[o+(v<<4)+12|0]=a[(c[s>>2]|0)+46|0]|0;c[(c[y>>2]|0)+(v<<4)+4>>2]=t;c[u>>2]=(c[u>>2]|0)+1;u=c[p>>2]|0;p=(c[u+24>>2]|0)+(v<<4)|0;v=b[(c[(c[s>>2]|0)+16>>2]|0)+6>>1]|0;s=u+16|0;if((v|0)>=(c[s>>2]|0)){break}t=u+12|0;u=p;y=v;do{while(1){if((Pi(c[(c[t>>2]|0)+(y<<4)>>2]|0,c[u>>2]|0)|0)==0){break}pi(l,y,p);if((y|0)>=(c[s>>2]|0)){break a}}y=y+1|0;}while((y|0)<(c[s>>2]|0))}}while(0);c[h>>2]=c[m>>2];h=j+8|0;x=a[h]|0;s=e+46|0;y=(c[k>>2]|0)+64|0;p=(c[y>>2]|0)+4|0;c[p>>2]=(x&255)-(d[s]|0)+(c[p>>2]|0);p=a[s]|0;if((p&255)>(x&255)){u=e+20|0;t=e+40|0;v=(c[e>>2]|0)+24|0;o=p;while(1){r=c[u>>2]|0;q=o+ -1<<24>>24;a[s]=q;c[(c[v>>2]|0)+((b[(c[c[y>>2]>>2]|0)+((c[t>>2]|0)+(q&255)<<1)>>1]|0)*12|0)+8>>2]=r;r=a[s]|0;if((r&255)>(x&255)){o=r}else{z=r;break}}}else{z=p}a[e+48|0]=z;z=c[l+64>>2]|0;c[z+28>>2]=b[j+4>>1]|0;p=b[j+6>>1]|0;if((c[m>>2]|0)==0){if((p|0)>=(c[z+16>>2]|0)){i=f;return}m=c[z+12>>2]|0;z=c[m+(p<<4)>>2]|0;o=z;if((a[o+4|0]|0)!=4){A=5320;B=l+52|0;C=c[B>>2]|0;D=z+16|0;E=m+(p<<4)+8|0;F=c[E>>2]|0;G=g;c[G>>2]=D;H=g+4|0;c[H>>2]=F;I=Xh(C,A,g)|0;ni(l,I)}A=(a[o+6|0]|0)!=0?5280:5320;B=l+52|0;C=c[B>>2]|0;D=z+16|0;E=m+(p<<4)+8|0;F=c[E>>2]|0;G=g;c[G>>2]=D;H=g+4|0;c[H>>2]=F;I=Xh(C,A,g)|0;ni(l,I)}I=c[y>>2]|0;y=I+16|0;if((p|0)>=(c[y>>2]|0)){i=f;return}l=I+12|0;I=j+9|0;j=p;do{p=c[l>>2]|0;g=p+(j<<4)+12|0;A=a[h]|0;C=A&255;if((d[g]|0)>(A&255)){if((a[I]|0)==0){J=A}else{fl(e,c[p+(j<<4)+4>>2]|0,C);J=a[h]|0}a[g]=J}j=((oi(c[k>>2]|0,j)|0)==0)+j|0;}while((j|0)<(c[y>>2]|0));i=f;return}function ni(a,b){a=a|0;b=b|0;c[a+16>>2]=0;km(a,b)}function oi(e,f){e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;g=i;h=e+48|0;j=c[(c[h>>2]|0)+16>>2]|0;k=c[e+64>>2]|0;l=c[k+12>>2]|0;m=j+4|0;n=b[m>>1]|0;o=k+28|0;if((n|0)>=(c[o>>2]|0)){p=0;i=g;return p|0}q=k+24|0;k=l+(f<<4)|0;r=n;while(1){s=c[q>>2]|0;t=s+(r<<4)|0;n=r+1|0;if((Pi(c[t>>2]|0,c[k>>2]|0)|0)!=0){break}if((n|0)<(c[o>>2]|0)){r=n}else{p=0;u=10;break}}if((u|0)==10){i=g;return p|0}u=a[s+(r<<4)+12|0]|0;do{if((d[l+(f<<4)+12|0]|0)>(u&255)){if((a[j+9|0]|0)==0){if((c[o>>2]|0)<=(b[m>>1]|0)){break}}fl(c[h>>2]|0,c[l+(f<<4)+4>>2]|0,u&255)}}while(0);pi(e,f,t);p=1;i=g;return p|0}function pi(e,f,g){e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;h=i;i=i+16|0;j=h;k=c[e+48>>2]|0;l=c[e+64>>2]|0;m=l+12|0;n=c[m>>2]|0;o=a[n+(f<<4)+12|0]|0;if((o&255)<(d[g+12|0]|0)){p=c[e+52>>2]|0;q=c[n+(f<<4)+8>>2]|0;r=(c[(c[(c[k>>2]|0)+24>>2]|0)+((b[(c[c[(c[k+12>>2]|0)+64>>2]>>2]|0)+((c[k+40>>2]|0)+(o&255)<<1)>>1]|0)*12|0)>>2]|0)+16|0;c[j>>2]=(c[n+(f<<4)>>2]|0)+16;c[j+4>>2]=q;c[j+8>>2]=r;ni(e,Xh(p,5368,j)|0)}dl(k,c[n+(f<<4)+4>>2]|0,c[g+4>>2]|0);g=l+16|0;l=(c[g>>2]|0)+ -1|0;if((l|0)>(f|0)){s=f}else{t=l;c[g>>2]=t;i=h;return}while(1){l=c[m>>2]|0;f=s+1|0;n=l+(s<<4)|0;k=l+(f<<4)|0;c[n+0>>2]=c[k+0>>2];c[n+4>>2]=c[k+4>>2];c[n+8>>2]=c[k+8>>2];c[n+12>>2]=c[k+12>>2];k=(c[g>>2]|0)+ -1|0;if((f|0)<(k|0)){s=f}else{t=k;break}}c[g>>2]=t;i=h;return}function qi(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;i=i+8|0;e=d;d=c[a+52>>2]|0;c[e>>2]=jm(a,b)|0;km(a,Xh(d,5448,e)|0)}function ri(e){e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0;f=i;i=i+8|0;g=f;h=i;i=i+16|0;j=i;i=i+8|0;k=i;i=i+24|0;l=i;i=i+24|0;m=i;i=i+24|0;n=i;i=i+32|0;o=i;i=i+24|0;p=i;i=i+24|0;q=i;i=i+24|0;r=i;i=i+24|0;s=i;i=i+24|0;t=i;i=i+24|0;u=i;i=i+24|0;v=i;i=i+16|0;w=i;i=i+16|0;x=i;i=i+24|0;y=i;i=i+16|0;z=i;i=i+16|0;A=i;i=i+24|0;B=i;i=i+16|0;C=i;i=i+16|0;D=i;i=i+16|0;E=i;i=i+8|0;F=e+4|0;G=c[F>>2]|0;H=e+48|0;I=c[H>>2]|0;J=e+52|0;K=(c[J>>2]|0)+38|0;L=(b[K>>1]|0)+1<<16>>16;b[K>>1]=L;if((L&65535)>200){L=I+12|0;K=c[(c[L>>2]|0)+52>>2]|0;M=c[(c[I>>2]|0)+64>>2]|0;if((M|0)==0){N=5672;O=h;c[O>>2]=5480;P=h+4|0;c[P>>2]=200;Q=h+8|0;c[Q>>2]=N;R=Xh(K,5712,h)|0;S=c[L>>2]|0;km(S,R)}c[j>>2]=M;N=Xh(K,5688,j)|0;O=h;c[O>>2]=5480;P=h+4|0;c[P>>2]=200;Q=h+8|0;c[Q>>2]=N;R=Xh(K,5712,h)|0;S=c[L>>2]|0;km(S,R)}R=e+16|0;a:do{switch(c[R>>2]|0){case 269:{om(e);S=c[R>>2]|0;if((S|0)==265){om(e);L=c[H>>2]|0;if((c[R>>2]|0)==288){h=c[e+24>>2]|0;om(e);yi(e,h);h=c[H>>2]|0;K=h+46|0;N=(d[K]|0)+1|0;a[K]=N;c[(c[(c[h>>2]|0)+24>>2]|0)+((b[(c[c[(c[h+12>>2]|0)+64>>2]>>2]|0)+((N&255)+ -1+(c[h+40>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[h+20>>2];xi(e,q,0,c[F>>2]|0);c[(c[(c[L>>2]|0)+24>>2]|0)+((b[(c[c[(c[L+12>>2]|0)+64>>2]>>2]|0)+((c[L+40>>2]|0)+(c[q+8>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[L+20>>2];break a}else{qi(e,288)}}if((S|0)!=288){qi(e,288)}S=e+24|0;L=1;while(1){h=c[S>>2]|0;om(e);yi(e,h);h=c[R>>2]|0;if((h|0)==61){T=81;break}else if((h|0)!=44){T=83;break}om(e);if((c[R>>2]|0)==288){L=L+1|0}else{T=78;break}}do{if((T|0)==78){qi(e,288)}else if((T|0)==81){om(e);vi(e,p,0)|0;if((c[R>>2]|0)==44){S=1;while(1){om(e);ql(c[H>>2]|0,p);vi(e,p,0)|0;h=S+1|0;if((c[R>>2]|0)==44){S=h}else{U=h;break}}}else{U=1}S=c[p>>2]|0;h=c[H>>2]|0;N=L-U|0;if((S|0)==0){V=N;W=h;T=88;break}else if(!((S|0)==13|(S|0)==12)){ql(h,p);V=N;W=h;T=88;break}S=N+1|0;N=(S|0)<0?0:S;nl(h,p,N);if((N|0)<=1){break}jl(h,N+ -1|0)}else if((T|0)==83){c[p>>2]=0;V=L;W=c[H>>2]|0;T=88}}while(0);do{if((T|0)==88){if((V|0)<=0){break}N=d[W+48|0]|0;jl(W,V);Yk(W,N,V)}}while(0);N=c[H>>2]|0;h=N+46|0;S=(d[h]|0)+L|0;a[h]=S;if((L|0)==0){break a}K=N+20|0;Q=N+40|0;P=c[(c[N>>2]|0)+24>>2]|0;O=c[c[(c[N+12>>2]|0)+64>>2]>>2]|0;c[P+((b[O+((S&255)-L+(c[Q>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[K>>2];S=L+ -1|0;if((S|0)==0){break a}else{X=S}do{c[P+((b[O+((d[h]|0)-X+(c[Q>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[K>>2];X=X+ -1|0;}while((X|0)!=0);break};case 259:{om(e);K=c[H>>2]|0;a[z+10|0]=0;a[z+8|0]=a[K+46|0]|0;Q=c[(c[K+12>>2]|0)+64>>2]|0;b[z+4>>1]=c[Q+28>>2];b[z+6>>1]=c[Q+16>>2];a[z+9|0]=0;Q=K+16|0;c[z>>2]=c[Q>>2];c[Q>>2]=z;b:do{Q=c[R>>2]|0;switch(Q|0){case 277:case 286:case 262:case 261:case 260:{break b;break};default:{}}ri(e)}while((Q|0)!=274);mi(K);si(e,262,259,G);break};case 59:{om(e);break};case 267:{c[E>>2]=-1;Ei(e,E);while(1){Q=c[R>>2]|0;if((Q|0)==260){T=10;break}else if((Q|0)!=261){break}Ei(e,E)}if((T|0)==10){om(e);K=c[H>>2]|0;a[D+10|0]=0;a[D+8|0]=a[K+46|0]|0;Q=c[(c[K+12>>2]|0)+64>>2]|0;b[D+4>>1]=c[Q+28>>2];b[D+6>>1]=c[Q+16>>2];a[D+9|0]=0;Q=K+16|0;c[D>>2]=c[Q>>2];c[Q>>2]=D;c:do{Q=c[R>>2]|0;switch(Q|0){case 277:case 286:case 262:case 261:case 260:{break c;break};default:{}}ri(e)}while((Q|0)!=274);mi(K)}si(e,262,267,G);el(I,c[E>>2]|0);break};case 278:{om(e);Q=cl(I)|0;vi(e,A,0)|0;h=A;if((c[h>>2]|0)==1){c[h>>2]=3}yl(c[H>>2]|0,A);h=c[A+20>>2]|0;a[C+10|0]=1;a[C+8|0]=a[I+46|0]|0;O=c[(c[I+12>>2]|0)+64>>2]|0;b[C+4>>1]=c[O+28>>2];b[C+6>>1]=c[O+16>>2];a[C+9|0]=0;O=I+16|0;c[C>>2]=c[O>>2];c[O>>2]=C;if((c[R>>2]|0)!=259){qi(e,259)}om(e);O=c[H>>2]|0;a[B+10|0]=0;a[B+8|0]=a[O+46|0]|0;P=c[(c[O+12>>2]|0)+64>>2]|0;b[B+4>>1]=c[P+28>>2];b[B+6>>1]=c[P+16>>2];a[B+9|0]=0;P=O+16|0;c[B>>2]=c[P>>2];c[P>>2]=B;d:do{P=c[R>>2]|0;switch(P|0){case 277:case 286:case 262:case 261:case 260:{break d;break};default:{}}ri(e)}while((P|0)!=274);mi(O);dl(I,_k(I)|0,Q);si(e,262,278,G);mi(I);el(I,h);break};case 266:case 258:{K=_k(I)|0;P=c[F>>2]|0;L=(c[R>>2]|0)==266;om(e);do{if(L){if((c[R>>2]|0)==288){S=c[e+24>>2]|0;om(e);Y=S;break}else{qi(e,288)}}else{Y=Ti(c[J>>2]|0,5424)|0}}while(0);L=c[e+64>>2]|0;h=L+12|0;Q=L+16|0;O=c[Q>>2]|0;S=L+20|0;if((O|0)<(c[S>>2]|0)){Z=c[h>>2]|0}else{L=h;N=yh(c[J>>2]|0,c[L>>2]|0,S,16,32767,5432)|0;c[L>>2]=N;Z=N}N=h;c[Z+(O<<4)>>2]=Y;h=c[N>>2]|0;c[h+(O<<4)+8>>2]=P;a[h+(O<<4)+12|0]=a[(c[H>>2]|0)+46|0]|0;c[(c[N>>2]|0)+(O<<4)+4>>2]=K;c[Q>>2]=(c[Q>>2]|0)+1;oi(e,O)|0;break};case 264:{a[y+10|0]=1;a[y+8|0]=a[I+46|0]|0;O=c[(c[I+12>>2]|0)+64>>2]|0;b[y+4>>1]=c[O+28>>2];b[y+6>>1]=c[O+16>>2];a[y+9|0]=0;O=I+16|0;c[y>>2]=c[O>>2];c[O>>2]=y;om(e);if((c[R>>2]|0)!=288){qi(e,288)}O=e+24|0;Q=c[O>>2]|0;om(e);N=c[R>>2]|0;if((N|0)==61){h=c[H>>2]|0;L=h+48|0;S=d[L]|0;yi(e,mm(e,5912,11)|0);yi(e,mm(e,5928,11)|0);yi(e,mm(e,5944,10)|0);yi(e,Q);if((c[R>>2]|0)!=61){qi(e,61)}om(e);vi(e,m,0)|0;ql(c[H>>2]|0,m);if((c[R>>2]|0)!=44){qi(e,44)}om(e);vi(e,l,0)|0;ql(c[H>>2]|0,l);if((c[R>>2]|0)==44){om(e);vi(e,k,0)|0;ql(c[H>>2]|0,k)}else{j=d[L]|0;hl(h,j,ml(h,1.0)|0)|0;jl(h,1)}Di(e,S,G,1,1)}else if((N|0)==268|(N|0)==44){N=c[H>>2]|0;S=d[N+48|0]|0;yi(e,mm(e,5864,15)|0);yi(e,mm(e,5880,11)|0);yi(e,mm(e,5896,13)|0);yi(e,Q);Q=c[R>>2]|0;do{if((Q|0)==44){h=4;while(1){om(e);if((c[R>>2]|0)!=288){T=40;break}j=c[O>>2]|0;om(e);yi(e,j);_=c[R>>2]|0;if((_|0)==44){h=h+1|0}else{T=42;break}}if((T|0)==40){qi(e,288)}else if((T|0)==42){$=_;aa=h+ -2|0;break}}else{$=Q;aa=1}}while(0);if(($|0)!=268){qi(e,268)}om(e);Q=c[F>>2]|0;vi(e,x,0)|0;if((c[R>>2]|0)==44){O=1;while(1){om(e);ql(c[H>>2]|0,x);vi(e,x,0)|0;K=O+1|0;if((c[R>>2]|0)==44){O=K}else{ba=K;break}}}else{ba=1}O=c[H>>2]|0;K=3-ba|0;P=c[x>>2]|0;do{if((P|0)==13|(P|0)==12){j=K+1|0;L=(j|0)<0?0:j;nl(O,x,L);if((L|0)<=1){break}jl(O,L+ -1|0)}else if((P|0)==0){T=51}else{ql(O,x);T=51}}while(0);do{if((T|0)==51){if((K|0)<=0){break}P=d[O+48|0]|0;jl(O,K);Yk(O,P,K)}}while(0);il(N,3);Di(e,S,Q,aa,0)}else{km(e,5840)}si(e,262,264,G);mi(I);break};case 273:{K=cl(I)|0;a[v+10|0]=1;O=I+46|0;a[v+8|0]=a[O]|0;P=I+12|0;L=c[(c[P>>2]|0)+64>>2]|0;b[v+4>>1]=c[L+28>>2];b[v+6>>1]=c[L+16>>2];a[v+9|0]=0;L=I+16|0;c[v>>2]=c[L>>2];c[L>>2]=v;a[w+10|0]=0;j=w+8|0;a[j]=a[O]|0;O=c[(c[P>>2]|0)+64>>2]|0;b[w+4>>1]=c[O+28>>2];b[w+6>>1]=c[O+16>>2];O=w+9|0;a[O]=0;c[w>>2]=c[L>>2];c[L>>2]=w;om(e);e:do{L=c[R>>2]|0;switch(L|0){case 277:case 286:case 262:case 261:case 260:{break e;break};default:{}}ri(e)}while((L|0)!=274);si(e,277,273,G);vi(e,u,0)|0;Q=u;if((c[Q>>2]|0)==1){c[Q>>2]=3}yl(c[H>>2]|0,u);Q=c[u+20>>2]|0;if((a[O]|0)!=0){fl(I,Q,d[j]|0)}mi(I);dl(I,Q,K);mi(I);break};case 265:{om(e);if((c[R>>2]|0)!=288){qi(e,288)}Q=c[e+24>>2]|0;om(e);S=c[H>>2]|0;if((Ci(S,Q,s,1)|0)==0){Ci(S,c[e+72>>2]|0,s,1)|0;N=kl(c[H>>2]|0,Q)|0;c[r+16>>2]=-1;c[r+20>>2]=-1;c[r>>2]=4;c[r+8>>2]=N;Al(S,s,r)}while(1){S=c[R>>2]|0;if((S|0)==58){T=70;break}else if((S|0)!=46){ca=0;break}Ai(e,s)}if((T|0)==70){Ai(e,s);ca=1}xi(e,t,ca,G);wl(c[H>>2]|0,s,t);Fl(c[H>>2]|0,G);break};case 285:{om(e);if((c[R>>2]|0)!=288){qi(e,288)}K=c[e+24>>2]|0;om(e);j=c[H>>2]|0;O=e+64|0;S=c[O>>2]|0;N=S+24|0;Q=j+16|0;L=b[(c[Q>>2]|0)+4>>1]|0;P=S+28|0;f:do{if((L|0)<(c[P>>2]|0)){M=N;da=L;while(1){ea=da+1|0;if((Pi(K,c[(c[M>>2]|0)+(da<<4)>>2]|0)|0)!=0){break}if((ea|0)<(c[P>>2]|0)){da=ea}else{break f}}h=j+12|0;ea=c[(c[h>>2]|0)+52>>2]|0;fa=c[(c[M>>2]|0)+(da<<4)+8>>2]|0;c[g>>2]=K+16;c[g+4>>2]=fa;fa=Xh(ea,5800,g)|0;ni(c[h>>2]|0,fa)}}while(0);if((c[R>>2]|0)!=285){qi(e,285)}om(e);L=c[j+20>>2]|0;fa=c[P>>2]|0;h=S+32|0;if((fa|0)<(c[h>>2]|0)){ga=c[N>>2]|0}else{ea=N;ha=yh(c[J>>2]|0,c[ea>>2]|0,h,16,32767,5432)|0;c[ea>>2]=ha;ga=ha}ha=N;c[ga+(fa<<4)>>2]=K;ea=c[ha>>2]|0;c[ea+(fa<<4)+8>>2]=G;a[ea+(fa<<4)+12|0]=a[(c[H>>2]|0)+46|0]|0;c[(c[ha>>2]|0)+(fa<<4)+4>>2]=L;c[P>>2]=(c[P>>2]|0)+1;g:while(1){switch(c[R>>2]|0){case 285:case 59:{break};case 286:case 262:case 261:case 260:{T=108;break g;break};default:{break g}}ri(e)}if((T|0)==108){a[(c[ha>>2]|0)+(fa<<4)+12|0]=a[(c[Q>>2]|0)+8|0]|0}P=(c[ha>>2]|0)+(fa<<4)|0;K=c[O>>2]|0;N=b[(c[(c[H>>2]|0)+16>>2]|0)+6>>1]|0;S=K+16|0;if((N|0)>=(c[S>>2]|0)){break a}j=K+12|0;K=P;L=N;do{while(1){if((Pi(c[(c[j>>2]|0)+(L<<4)>>2]|0,c[K>>2]|0)|0)==0){break}pi(e,L,P);if((L|0)>=(c[S>>2]|0)){break a}}L=L+1|0;}while((L|0)<(c[S>>2]|0));break};case 274:{om(e);S=c[H>>2]|0;h:do{switch(c[R>>2]|0){case 59:case 277:case 286:case 262:case 261:case 260:{ia=0;ja=0;break};default:{vi(e,o,0)|0;if((c[R>>2]|0)==44){L=1;while(1){om(e);ql(c[H>>2]|0,o);vi(e,o,0)|0;P=L+1|0;if((c[R>>2]|0)==44){L=P}else{ka=P;break}}}else{ka=1}L=o;if(((c[L>>2]|0)+ -12|0)>>>0<2){nl(S,o,-1);if((c[L>>2]|0)==12&(ka|0)==1){L=(c[(c[S>>2]|0)+12>>2]|0)+(c[o+8>>2]<<2)|0;c[L>>2]=c[L>>2]&-64|30}ia=d[S+46|0]|0;ja=-1;break h}else{if((ka|0)==1){ia=sl(S,o)|0;ja=1;break h}else{ql(S,o);ia=d[S+46|0]|0;ja=ka;break h}}}}}while(0);bl(S,ia,ja);if((c[R>>2]|0)!=59){break a}om(e);break};default:{L=n+8|0;ti(e,L);P=c[R>>2]|0;if((P|0)==44|(P|0)==61){c[n>>2]=0;ui(e,n,1);break a}if((c[L>>2]|0)==12){L=(c[(c[I>>2]|0)+12>>2]|0)+(c[n+16>>2]<<2)|0;c[L>>2]=c[L>>2]&-8372225|16384;break a}else{km(e,5464)}}}}while(0);e=c[H>>2]|0;a[e+48|0]=a[e+46|0]|0;e=(c[J>>2]|0)+38|0;b[e>>1]=(b[e>>1]|0)+ -1<<16>>16;i=f;return}function si(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f;if((c[a+16>>2]|0)==(b|0)){om(a);i=f;return}if((c[a+4>>2]|0)==(e|0)){qi(a,b)}else{f=c[a+52>>2]|0;h=jm(a,b)|0;b=jm(a,d)|0;c[g>>2]=h;c[g+4>>2]=b;c[g+8>>2]=e;km(a,Xh(f,5960,g)|0)}}function ti(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;d=i;i=i+72|0;e=d;f=d+24|0;g=d+48|0;h=a+48|0;j=c[h>>2]|0;k=c[a+4>>2]|0;l=a+16|0;m=c[l>>2]|0;do{if((m|0)==288){n=a+24|0;o=c[n>>2]|0;om(a);p=c[h>>2]|0;if((Ci(p,o,b,1)|0)!=0){q=n;break}Ci(p,c[a+72>>2]|0,b,1)|0;r=kl(c[h>>2]|0,o)|0;c[e+16>>2]=-1;c[e+20>>2]=-1;c[e>>2]=4;c[e+8>>2]=r;Al(p,b,e);q=n}else if((m|0)==40){om(a);vi(a,b,0)|0;si(a,41,40,k);pl(c[h>>2]|0,b);q=a+24|0}else{km(a,5776)}}while(0);m=g+16|0;e=g+20|0;n=g;p=g+8|0;a:while(1){switch(c[l>>2]|0){case 123:case 289:case 40:{ql(j,b);Bi(a,b,k);continue a;break};case 58:{om(a);if((c[l>>2]|0)!=288){s=13;break a}r=c[q>>2]|0;om(a);o=kl(c[h>>2]|0,r)|0;c[m>>2]=-1;c[e>>2]=-1;c[n>>2]=4;c[p>>2]=o;xl(j,b,g);Bi(a,b,k);continue a;break};case 91:{tl(j,b);om(a);vi(a,f,0)|0;ul(c[h>>2]|0,f);if((c[l>>2]|0)!=93){s=10;break a}om(a);Al(j,b,f);continue a;break};case 46:{Ai(a,b);continue a;break};default:{s=16;break a}}}if((s|0)==10){qi(a,93)}else if((s|0)==13){qi(a,288)}else if((s|0)==16){i=d;return}}function ui(f,g,h){f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;j=i;i=i+16|0;k=j;l=i;i=i+8|0;m=i;i=i+24|0;n=i;i=i+32|0;o=g+8|0;if(!(((c[o>>2]|0)+ -7|0)>>>0<3)){km(f,5464)}p=f+16|0;q=c[p>>2]|0;do{if((q|0)==61){om(f);vi(f,m,0)|0;r=f+48|0;if((c[p>>2]|0)==44){s=1;while(1){om(f);ql(c[r>>2]|0,m);vi(f,m,0)|0;t=s+1|0;if((c[p>>2]|0)==44){s=t}else{u=t;break}}}else{u=1}s=c[r>>2]|0;if((u|0)==(h|0)){ol(s,m);wl(c[r>>2]|0,o,m);i=j;return}t=h-u|0;v=m;w=c[v>>2]|0;do{if((w|0)==13|(w|0)==12){x=t+1|0;y=(x|0)<0?0:x;nl(s,m,y);if((y|0)<=1){break}jl(s,y+ -1|0)}else if((w|0)==0){z=30}else{ql(s,m);z=30}}while(0);do{if((z|0)==30){if((t|0)<=0){break}w=d[s+48|0]|0;jl(s,t);Yk(s,w,t)}}while(0);if((u|0)<=(h|0)){A=v;break}s=(c[r>>2]|0)+48|0;a[s]=t+(d[s]|0);A=v}else if((q|0)==44){om(f);c[n>>2]=g;s=n+8|0;ti(f,s);w=s;s=f+48|0;do{if((c[w>>2]|0)!=9){y=c[s>>2]|0;x=a[y+48|0]|0;B=x&255;if((g|0)==0){break}C=n+16|0;D=x&255;E=g;F=0;while(1){do{if((c[E+8>>2]|0)==9){G=E+16|0;H=G;I=H+3|0;J=d[I]|0;K=c[w>>2]|0;do{if((J|0)==(K|0)){L=H+2|0;if((d[L]|0)!=(c[C>>2]|0)){M=J;N=F;break}a[I]=7;a[L]=x;M=c[w>>2]|0;N=1}else{M=K;N=F}}while(0);if((M|0)!=7){O=N;break}K=G;if((b[K>>1]|0)!=(c[C>>2]|0)){O=N;break}b[K>>1]=D;O=1}else{O=F}}while(0);K=c[E>>2]|0;if((K|0)==0){break}else{E=K;F=O}}if((O|0)==0){break}Zk(y,(c[w>>2]|0)==7?0:5,B,c[C>>2]|0,0)|0;jl(y,1)}}while(0);w=c[s>>2]|0;if(((e[(c[f+52>>2]|0)+38>>1]|0)+h|0)<=200){ui(f,n,h+1|0);A=m;break}v=w+12|0;t=c[(c[v>>2]|0)+52>>2]|0;r=c[(c[w>>2]|0)+64>>2]|0;if((r|0)==0){P=5672;Q=k;c[Q>>2]=5480;R=k+4|0;c[R>>2]=200;S=k+8|0;c[S>>2]=P;T=Xh(t,5712,k)|0;U=c[v>>2]|0;km(U,T)}c[l>>2]=r;P=Xh(t,5688,l)|0;Q=k;c[Q>>2]=5480;R=k+4|0;c[R>>2]=200;S=k+8|0;c[S>>2]=P;T=Xh(t,5712,k)|0;U=c[v>>2]|0;km(U,T)}else{qi(f,61)}}while(0);T=c[f+48>>2]|0;f=(d[T+48|0]|0)+ -1|0;c[m+16>>2]=-1;c[m+20>>2]=-1;c[A>>2]=6;c[m+8>>2]=f;wl(T,o,m);i=j;return}function vi(e,f,g){e=e|0;f=f|0;g=g|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;j=i;i=i+16|0;k=j;l=i;i=i+8|0;m=i;i=i+24|0;n=e+48|0;o=c[n>>2]|0;p=e+52|0;q=(c[p>>2]|0)+38|0;r=(b[q>>1]|0)+1<<16>>16;b[q>>1]=r;if((r&65535)>200){r=o+12|0;q=c[(c[r>>2]|0)+52>>2]|0;s=c[(c[o>>2]|0)+64>>2]|0;if((s|0)==0){t=5672;u=k;c[u>>2]=5480;v=k+4|0;c[v>>2]=200;w=k+8|0;c[w>>2]=t;x=Xh(q,5712,k)|0;y=c[r>>2]|0;km(y,x)}c[l>>2]=s;t=Xh(q,5688,l)|0;u=k;c[u>>2]=5480;v=k+4|0;c[v>>2]=200;w=k+8|0;c[w>>2]=t;x=Xh(q,5712,k)|0;y=c[r>>2]|0;km(y,x)}x=e+16|0;a:do{switch(c[x>>2]|0){case 35:{z=2;A=8;break};case 276:{c[f+16>>2]=-1;c[f+20>>2]=-1;c[f>>2]=2;c[f+8>>2]=0;A=20;break};case 45:{z=0;A=8;break};case 270:{c[f+16>>2]=-1;c[f+20>>2]=-1;c[f>>2]=1;c[f+8>>2]=0;A=20;break};case 287:{c[f+16>>2]=-1;c[f+20>>2]=-1;c[f>>2]=5;c[f+8>>2]=0;h[f+8>>3]=+h[e+24>>3];A=20;break};case 280:{if((a[(c[o>>2]|0)+77|0]|0)==0){km(e,5528)}else{y=Zk(o,38,0,1,0)|0;c[f+16>>2]=-1;c[f+20>>2]=-1;c[f>>2]=13;c[f+8>>2]=y;A=20;break a}break};case 263:{c[f+16>>2]=-1;c[f+20>>2]=-1;c[f>>2]=3;c[f+8>>2]=0;A=20;break};case 289:{y=kl(o,c[e+24>>2]|0)|0;c[f+16>>2]=-1;c[f+20>>2]=-1;c[f>>2]=4;c[f+8>>2]=y;A=20;break};case 271:{z=1;A=8;break};case 265:{om(e);xi(e,f,0,c[e+4>>2]|0);break};case 123:{wi(e,f);break};default:{ti(e,f)}}}while(0);if((A|0)==8){o=c[e+4>>2]|0;om(e);vi(e,f,8)|0;Bl(c[n>>2]|0,z,f,o)}else if((A|0)==20){om(e)}switch(c[x>>2]|0){case 45:{B=1;break};case 284:{B=10;break};case 257:{B=13;break};case 272:{B=14;break};case 62:{B=11;break};case 47:{B=3;break};case 42:{B=2;break};case 283:{B=9;break};case 282:{B=12;break};case 279:{B=6;break};case 43:{B=0;break};case 94:{B=5;break};case 281:{B=7;break};case 37:{B=4;break};case 60:{B=8;break};default:{C=15;D=c[p>>2]|0;E=D+38|0;F=b[E>>1]|0;G=F+ -1<<16>>16;b[E>>1]=G;i=j;return C|0}}x=e+4|0;o=B;while(1){if((d[5496+(o<<1)|0]|0)<=(g|0)){C=o;A=39;break}B=c[x>>2]|0;om(e);Dl(c[n>>2]|0,o,f);z=vi(e,m,d[5497+(o<<1)|0]|0)|0;El(c[n>>2]|0,o,f,m,B);if((z|0)==15){C=15;A=39;break}else{o=z}}if((A|0)==39){D=c[p>>2]|0;E=D+38|0;F=b[E>>1]|0;G=F+ -1<<16>>16;b[E>>1]=G;i=j;return C|0}return 0}function wi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;d=i;i=i+16|0;e=d;f=i;i=i+8|0;g=i;i=i+16|0;h=i;i=i+8|0;j=i;i=i+40|0;k=a+48|0;l=c[k>>2]|0;m=c[a+4>>2]|0;n=Zk(l,11,0,0,0)|0;o=j+36|0;c[o>>2]=0;p=j+28|0;c[p>>2]=0;q=j+32|0;c[q>>2]=0;r=j+24|0;c[r>>2]=b;c[b+16>>2]=-1;c[b+20>>2]=-1;c[b>>2]=11;c[b+8>>2]=n;s=j;c[j+16>>2]=-1;c[j+20>>2]=-1;t=j;c[t>>2]=0;c[j+8>>2]=0;ql(c[k>>2]|0,b);b=a+16|0;if((c[b>>2]|0)!=123){qi(a,123)}om(a);a:do{if((c[b>>2]|0)!=125){b:while(1){do{if((c[t>>2]|0)!=0){ql(l,s);c[t>>2]=0;if((c[o>>2]|0)!=50){break}Gl(l,c[(c[r>>2]|0)+8>>2]|0,c[q>>2]|0,50);c[o>>2]=0}}while(0);u=c[b>>2]|0;do{if((u|0)==91){zi(a,j)}else if((u|0)==288){if((qm(a)|0)==61){zi(a,j);break}vi(a,s,0)|0;v=c[k>>2]|0;w=c[q>>2]|0;if((w|0)>2147483645){x=10;break b}c[q>>2]=w+1;c[o>>2]=(c[o>>2]|0)+1}else{vi(a,s,0)|0;y=c[k>>2]|0;w=c[q>>2]|0;if((w|0)>2147483645){x=17;break b}c[q>>2]=w+1;c[o>>2]=(c[o>>2]|0)+1}}while(0);u=c[b>>2]|0;if((u|0)==59){om(a)}else if((u|0)==44){om(a)}else{break a}if((c[b>>2]|0)==125){break a}}if((x|0)==10){u=v+12|0;w=c[(c[u>>2]|0)+52>>2]|0;z=c[(c[v>>2]|0)+64>>2]|0;if((z|0)==0){A=5672;B=g;c[B>>2]=5648;C=g+4|0;c[C>>2]=2147483645;D=g+8|0;c[D>>2]=A;E=Xh(w,5712,g)|0;F=c[u>>2]|0;km(F,E)}c[h>>2]=z;A=Xh(w,5688,h)|0;B=g;c[B>>2]=5648;C=g+4|0;c[C>>2]=2147483645;D=g+8|0;c[D>>2]=A;E=Xh(w,5712,g)|0;F=c[u>>2]|0;km(F,E)}else if((x|0)==17){u=y+12|0;w=c[(c[u>>2]|0)+52>>2]|0;z=c[(c[y>>2]|0)+64>>2]|0;if((z|0)==0){G=5672;H=e;c[H>>2]=5648;I=e+4|0;c[I>>2]=2147483645;J=e+8|0;c[J>>2]=G;K=Xh(w,5712,e)|0;L=c[u>>2]|0;km(L,K)}c[f>>2]=z;G=Xh(w,5688,f)|0;H=e;c[H>>2]=5648;I=e+4|0;c[I>>2]=2147483645;J=e+8|0;c[J>>2]=G;K=Xh(w,5712,e)|0;L=c[u>>2]|0;km(L,K)}}}while(0);si(a,125,123,m);m=c[o>>2]|0;do{if((m|0)!=0){a=c[t>>2]|0;if((a|0)==13|(a|0)==12){nl(l,s,-1);Gl(l,c[(c[r>>2]|0)+8>>2]|0,c[q>>2]|0,-1);c[q>>2]=(c[q>>2]|0)+ -1;break}else if((a|0)==0){M=m}else{ql(l,s);M=c[o>>2]|0}Gl(l,c[(c[r>>2]|0)+8>>2]|0,c[q>>2]|0,M)}}while(0);M=l;l=c[(c[(c[M>>2]|0)+12>>2]|0)+(n<<2)>>2]&8388607;r=(Qh(c[q>>2]|0)|0)<<23|l;c[(c[(c[M>>2]|0)+12>>2]|0)+(n<<2)>>2]=r;l=(Qh(c[p>>2]|0)|0)<<14&8372224|r&-8372225;c[(c[(c[M>>2]|0)+12>>2]|0)+(n<<2)>>2]=l;i=d;return}function xi(e,f,g,h){e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;j=i;i=i+72|0;k=j;l=j+56|0;m=e+48|0;n=c[m>>2]|0;o=e+52|0;p=c[o>>2]|0;q=c[n>>2]|0;r=n+36|0;n=q+56|0;s=c[n>>2]|0;t=q+16|0;do{if((c[r>>2]|0)>=(s|0)){u=yh(p,c[t>>2]|0,n,4,262143,5632)|0;c[t>>2]=u;v=c[n>>2]|0;if((s|0)>=(v|0)){break}w=s+1|0;c[u+(s<<2)>>2]=0;if((w|0)<(v|0)){x=w}else{break}while(1){w=x+1|0;c[(c[t>>2]|0)+(x<<2)>>2]=0;if((w|0)==(v|0)){break}else{x=w}}}}while(0);x=Xf(p)|0;s=c[r>>2]|0;c[r>>2]=s+1;c[(c[t>>2]|0)+(s<<2)>>2]=x;s=x;do{if(!((a[x+5|0]&3)==0)){if((a[q+5|0]&4)==0){break}_f(p,q,s)}}while(0);s=k;c[s>>2]=x;c[x+64>>2]=h;q=c[o>>2]|0;c[k+8>>2]=c[m>>2];o=k+12|0;c[o>>2]=e;c[m>>2]=k;c[k+20>>2]=0;c[k+24>>2]=0;c[k+28>>2]=-1;c[k+32>>2]=0;c[k+36>>2]=0;p=e+64|0;t=k+44|0;c[t+0>>2]=0;a[t+4|0]=0;c[k+40>>2]=c[(c[p>>2]|0)+4>>2];p=k+16|0;c[p>>2]=0;c[x+36>>2]=c[e+68>>2];a[x+78|0]=2;x=uj(q)|0;c[k+4>>2]=x;t=q+8|0;r=c[t>>2]|0;c[r>>2]=x;c[r+8>>2]=69;r=(c[t>>2]|0)+16|0;c[t>>2]=r;if(((c[q+24>>2]|0)-r|0)<16){Bf(q,0)}a[l+10|0]=0;a[l+8|0]=a[k+46|0]|0;k=c[(c[o>>2]|0)+64>>2]|0;b[l+4>>1]=c[k+28>>2];b[l+6>>1]=c[k+16>>2];a[l+9|0]=0;c[l>>2]=c[p>>2];c[p>>2]=l;l=e+16|0;if((c[l>>2]|0)!=40){qi(e,40)}om(e);if((g|0)!=0){yi(e,mm(e,5576,4)|0);g=c[m>>2]|0;p=g+46|0;k=(d[p]|0)+1|0;a[p]=k;c[(c[(c[g>>2]|0)+24>>2]|0)+((b[(c[c[(c[g+12>>2]|0)+64>>2]>>2]|0)+((k&255)+ -1+(c[g+40>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[g+20>>2]}g=c[m>>2]|0;k=c[g>>2]|0;p=k+77|0;a[p]=0;o=c[l>>2]|0;a:do{if((o|0)==41){y=0}else{q=e+24|0;r=o;t=0;while(1){if((r|0)==280){z=18;break}else if((r|0)!=288){z=19;break}x=c[q>>2]|0;om(e);yi(e,x);x=t+1|0;if((a[p]|0)!=0){y=x;break a}if((c[l>>2]|0)!=44){y=x;break a}om(e);r=c[l>>2]|0;t=x}if((z|0)==18){om(e);a[p]=1;y=t;break}else if((z|0)==19){km(e,5584)}}}while(0);p=c[m>>2]|0;o=p+46|0;r=(d[o]|0)+y|0;a[o]=r;do{if((y|0)!=0){q=p+20|0;x=p+40|0;n=c[(c[p>>2]|0)+24>>2]|0;v=c[c[(c[p+12>>2]|0)+64>>2]>>2]|0;c[n+((b[v+((r&255)-y+(c[x>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[q>>2];w=y+ -1|0;if((w|0)==0){break}else{A=w}do{c[n+((b[v+((d[o]|0)-A+(c[x>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[q>>2];A=A+ -1|0;}while((A|0)!=0)}}while(0);A=g+46|0;a[k+76|0]=a[A]|0;jl(g,d[A]|0);if((c[l>>2]|0)!=41){qi(e,41)}om(e);b:while(1){A=c[l>>2]|0;switch(A|0){case 277:case 286:case 262:case 261:case 260:{z=30;break b;break};default:{}}ri(e);if((A|0)==274){z=30;break}}if((z|0)==30){c[(c[s>>2]|0)+68>>2]=c[e+4>>2];si(e,262,265,h);h=c[(c[m>>2]|0)+8>>2]|0;m=$k(h,37,0,(c[h+36>>2]|0)+ -1|0)|0;c[f+16>>2]=-1;c[f+20>>2]=-1;c[f>>2]=11;c[f+8>>2]=m;ql(h,f);li(e);i=j;return}}function yi(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;f=i;i=i+16|0;g=f;h=i;i=i+8|0;j=c[d+48>>2]|0;k=c[d+64>>2]|0;l=j;m=c[l>>2]|0;n=m+60|0;o=c[n>>2]|0;p=j+44|0;if((b[p>>1]|0)<(o|0)){q=m+24|0;r=o}else{s=m+24|0;c[s>>2]=yh(c[d+52>>2]|0,c[s>>2]|0,n,12,32767,5616)|0;q=s;r=c[n>>2]|0}if((o|0)<(r|0)){n=o;while(1){o=n+1|0;c[(c[q>>2]|0)+(n*12|0)>>2]=0;if((o|0)==(r|0)){break}else{n=o}}}n=b[p>>1]|0;c[(c[q>>2]|0)+((n<<16>>16)*12|0)>>2]=e;q=e;do{if((a[e+5|0]&3)==0){t=n}else{if((a[m+5|0]&4)==0){t=n;break}_f(c[d+52>>2]|0,m,q);t=b[p>>1]|0}}while(0);b[p>>1]=t+1<<16>>16;p=k+4|0;q=c[p>>2]|0;if((q+1-(c[j+40>>2]|0)|0)>200){m=j+12|0;j=c[(c[m>>2]|0)+52>>2]|0;n=c[(c[l>>2]|0)+64>>2]|0;if((n|0)==0){u=5672;v=g;c[v>>2]=5616;w=g+4|0;c[w>>2]=200;x=g+8|0;c[x>>2]=u;y=Xh(j,5712,g)|0;z=c[m>>2]|0;km(z,y)}c[h>>2]=n;u=Xh(j,5688,h)|0;v=g;c[v>>2]=5616;w=g+4|0;c[w>>2]=200;x=g+8|0;c[x>>2]=u;y=Xh(j,5712,g)|0;z=c[m>>2]|0;km(z,y)}y=k+8|0;if((q+2|0)>(c[y>>2]|0)){z=k;m=yh(c[d+52>>2]|0,c[z>>2]|0,y,2,2147483645,5616)|0;c[z>>2]=m;A=m;B=c[p>>2]|0;C=B+1|0;c[p>>2]=C;D=A+(B<<1)|0;b[D>>1]=t;i=f;return}else{A=c[k>>2]|0;B=q;C=B+1|0;c[p>>2]=C;D=A+(B<<1)|0;b[D>>1]=t;i=f;return}}function zi(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;e=i;i=i+16|0;f=e;g=i;i=i+8|0;h=i;i=i+24|0;j=i;i=i+24|0;k=b+48|0;l=c[k>>2]|0;m=l+48|0;n=a[m]|0;o=b+16|0;do{if((c[o>>2]|0)==288){p=d+28|0;if((c[p>>2]|0)<=2147483645){q=c[b+24>>2]|0;om(b);r=kl(c[k>>2]|0,q)|0;c[h+16>>2]=-1;c[h+20>>2]=-1;c[h>>2]=4;c[h+8>>2]=r;s=p;break}p=l+12|0;r=c[(c[p>>2]|0)+52>>2]|0;q=c[(c[l>>2]|0)+64>>2]|0;if((q|0)==0){t=5672;u=f;c[u>>2]=5648;v=f+4|0;c[v>>2]=2147483645;w=f+8|0;c[w>>2]=t;x=Xh(r,5712,f)|0;y=c[p>>2]|0;km(y,x)}c[g>>2]=q;t=Xh(r,5688,g)|0;u=f;c[u>>2]=5648;v=f+4|0;c[v>>2]=2147483645;w=f+8|0;c[w>>2]=t;x=Xh(r,5712,f)|0;y=c[p>>2]|0;km(y,x)}else{om(b);vi(b,h,0)|0;ul(c[k>>2]|0,h);if((c[o>>2]|0)==93){om(b);s=d+28|0;break}else{qi(b,93)}}}while(0);c[s>>2]=(c[s>>2]|0)+1;if((c[o>>2]|0)==61){om(b);o=vl(l,h)|0;vi(b,j,0)|0;h=c[(c[d+24>>2]|0)+8>>2]|0;Zk(l,10,h,o,vl(l,j)|0)|0;a[m]=n;i=e;return}else{qi(b,61)}}function Ai(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0;d=i;i=i+24|0;e=d;f=a+48|0;g=c[f>>2]|0;tl(g,b);om(a);if((c[a+16>>2]|0)==288){h=c[a+24>>2]|0;om(a);j=kl(c[f>>2]|0,h)|0;c[e+16>>2]=-1;c[e+20>>2]=-1;c[e>>2]=4;c[e+8>>2]=j;Al(g,b,e);i=d;return}else{qi(a,288)}}function Bi(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;i=i+24|0;h=g;j=b+48|0;k=c[j>>2]|0;l=b+16|0;m=c[l>>2]|0;if((m|0)==40){om(b);if((c[l>>2]|0)==41){c[h>>2]=0}else{vi(b,h,0)|0;if((c[l>>2]|0)==44){do{om(b);ql(c[j>>2]|0,h);vi(b,h,0)|0;}while((c[l>>2]|0)==44)}nl(k,h,-1)}si(b,41,40,f)}else if((m|0)==123){wi(b,h)}else if((m|0)==289){m=kl(k,c[b+24>>2]|0)|0;c[h+16>>2]=-1;c[h+20>>2]=-1;c[h>>2]=4;c[h+8>>2]=m;om(b)}else{km(b,5744)}b=e+8|0;m=c[b>>2]|0;l=c[h>>2]|0;if((l|0)==13|(l|0)==12){n=0}else if((l|0)==0){o=13}else{ql(k,h);o=13}if((o|0)==13){n=(d[k+48|0]|0)-m|0}o=Zk(k,29,m,n,2)|0;c[e+16>>2]=-1;c[e+20>>2]=-1;c[e>>2]=12;c[b>>2]=o;Fl(k,f);a[k+48|0]=m+1;i=g;return}function Ci(e,f,g,h){e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;j=i;if((e|0)==0){k=0;i=j;return k|0}l=e;m=e+12|0;n=e+40|0;o=d[e+46|0]|0;while(1){p=o+ -1|0;q=c[l>>2]|0;if((o|0)<=0){break}if((Pi(f,c[(c[q+24>>2]|0)+((b[(c[c[(c[m>>2]|0)+64>>2]>>2]|0)+((c[n>>2]|0)+p<<1)>>1]|0)*12|0)>>2]|0)|0)==0){o=p}else{r=5;break}}if((r|0)==5){c[g+16>>2]=-1;c[g+20>>2]=-1;c[g>>2]=7;c[g+8>>2]=p;if((h|0)!=0){k=7;i=j;return k|0}h=e+16|0;do{h=c[h>>2]|0;}while((d[h+8|0]|0)>(p|0));a[h+9|0]=1;k=7;i=j;return k|0}h=c[q+28>>2]|0;q=e+47|0;a:do{if((a[q]|0)==0){r=13}else{p=0;while(1){o=p+1|0;if((Pi(c[h+(p<<3)>>2]|0,f)|0)!=0){break}if((o|0)<(d[q]|0)){p=o}else{r=13;break a}}if((p|0)<0){r=13}else{s=p}}}while(0);do{if((r|0)==13){if((Ci(c[e+8>>2]|0,f,g,0)|0)==0){k=0;i=j;return k|0}else{s=ki(e,f,g)|0;break}}}while(0);c[g+16>>2]=-1;c[g+20>>2]=-1;c[g>>2]=8;c[g+8>>2]=s;k=8;i=j;return k|0}function Di(e,f,g,h,j){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;k=i;i=i+32|0;l=k;m=k+16|0;n=e+48|0;o=c[n>>2]|0;p=o+46|0;q=(d[p]|0)+3|0;a[p]=q;r=o+20|0;s=o+12|0;t=o+40|0;u=c[(c[o>>2]|0)+24>>2]|0;v=c[c[(c[s>>2]|0)+64>>2]>>2]|0;c[u+((b[v+((q&255)+ -3+(c[t>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[r>>2];c[u+((b[v+((d[p]|0)+ -2+(c[t>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[r>>2];c[u+((b[v+((d[p]|0)+ -1+(c[t>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[r>>2];r=e+16|0;if((c[r>>2]|0)!=259){qi(e,259)}om(e);t=(j|0)!=0;if(t){w=$k(o,33,f,131070)|0}else{w=_k(o)|0}a[m+10|0]=0;a[m+8|0]=a[p]|0;p=c[(c[s>>2]|0)+64>>2]|0;b[m+4>>1]=c[p+28>>2];b[m+6>>1]=c[p+16>>2];a[m+9|0]=0;p=o+16|0;c[m>>2]=c[p>>2];c[p>>2]=m;m=c[n>>2]|0;p=m+46|0;s=(d[p]|0)+h|0;a[p]=s;do{if((h|0)!=0){j=m+20|0;v=m+40|0;u=c[(c[m>>2]|0)+24>>2]|0;q=c[c[(c[m+12>>2]|0)+64>>2]>>2]|0;c[u+((b[q+((s&255)-h+(c[v>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[j>>2];x=h+ -1|0;if((x|0)==0){break}else{y=x}do{c[u+((b[q+((d[p]|0)-y+(c[v>>2]|0)<<1)>>1]|0)*12|0)+4>>2]=c[j>>2];y=y+ -1|0;}while((y|0)!=0)}}while(0);jl(o,h);y=c[n>>2]|0;a[l+10|0]=0;a[l+8|0]=a[y+46|0]|0;n=c[(c[y+12>>2]|0)+64>>2]|0;b[l+4>>1]=c[n+28>>2];b[l+6>>1]=c[n+16>>2];a[l+9|0]=0;n=y+16|0;c[l>>2]=c[n>>2];c[n>>2]=l;a:do{l=c[r>>2]|0;switch(l|0){case 277:case 286:case 262:case 261:case 260:{break a;break};default:{}}ri(e)}while((l|0)!=274);mi(y);mi(o);el(o,w);if(t){z=$k(o,32,f,131070)|0;A=w+1|0;dl(o,z,A);Fl(o,g);i=k;return}else{Zk(o,34,f,0,h)|0;Fl(o,g);z=$k(o,35,f+2|0,131070)|0;A=w+1|0;dl(o,z,A);Fl(o,g);i=k;return}}function Ei(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;f=i;i=i+40|0;g=f;h=f+16|0;j=d+48|0;k=c[j>>2]|0;om(d);vi(d,h,0)|0;l=d+16|0;if((c[l>>2]|0)!=275){qi(d,275)}om(d);m=c[l>>2]|0;do{if((m|0)==258|(m|0)==266){zl(c[j>>2]|0,h);a[g+10|0]=0;a[g+8|0]=a[k+46|0]|0;n=c[(c[k+12>>2]|0)+64>>2]|0;b[g+4>>1]=c[n+28>>2];b[g+6>>1]=c[n+16>>2];a[g+9|0]=0;n=k+16|0;c[g>>2]=c[n>>2];c[n>>2]=g;n=c[h+16>>2]|0;o=c[d+4>>2]|0;p=(c[l>>2]|0)==266;om(d);do{if(p){if((c[l>>2]|0)==288){q=c[d+24>>2]|0;om(d);r=q;break}else{qi(d,288)}}else{r=Ti(c[d+52>>2]|0,5424)|0}}while(0);p=c[d+64>>2]|0;q=p+12|0;s=p+16|0;t=c[s>>2]|0;u=p+20|0;if((t|0)<(c[u>>2]|0)){v=c[q>>2]|0}else{p=q;w=yh(c[d+52>>2]|0,c[p>>2]|0,u,16,32767,5432)|0;c[p>>2]=w;v=w}w=q;c[v+(t<<4)>>2]=r;q=c[w>>2]|0;c[q+(t<<4)+8>>2]=o;a[q+(t<<4)+12|0]=a[(c[j>>2]|0)+46|0]|0;c[(c[w>>2]|0)+(t<<4)+4>>2]=n;c[s>>2]=(c[s>>2]|0)+1;oi(d,t)|0;a:while(1){switch(c[l>>2]|0){case 286:case 262:case 261:case 260:{break a;break};case 285:case 59:{break};default:{x=16;break a}}ri(d)}if((x|0)==16){y=_k(k)|0;break}mi(k);i=f;return}else{yl(c[j>>2]|0,h);a[g+10|0]=0;a[g+8|0]=a[k+46|0]|0;n=c[(c[k+12>>2]|0)+64>>2]|0;b[g+4>>1]=c[n+28>>2];b[g+6>>1]=c[n+16>>2];a[g+9|0]=0;n=k+16|0;c[g>>2]=c[n>>2];c[n>>2]=g;y=c[h+20>>2]|0}}while(0);b:do{h=c[l>>2]|0;switch(h|0){case 277:case 286:case 262:case 261:case 260:{break b;break};default:{}}ri(d)}while((h|0)!=274);mi(k);if(((c[l>>2]|0)+ -260|0)>>>0<2){al(k,e,_k(k)|0)}el(k,y);i=f;return}function Fi(a,b){a=a|0;b=b|0;var d=0,e=0;d=a+12|0;e=a+8|0;c[e>>2]=(c[d>>2]|0)-b+(c[e>>2]|0);c[d>>2]=b;i=i;return}function Gi(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;d=Ah(a,0,0,40)|0;e=d;f=a+16|0;c[(c[f>>2]|0)+12>>2]=e;c[d+8>>2]=c[f>>2];c[d+12>>2]=0;i=b;return e|0}function Hi(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;d=(c[a+16>>2]|0)+12|0;e=c[d>>2]|0;c[d>>2]=0;if((e|0)==0){i=b;return}else{f=e}while(1){e=c[f+12>>2]|0;Ah(a,f,40,0)|0;if((e|0)==0){break}else{f=e}}i=b;return}function Ii(d){d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;e=i;f=d+12|0;if((c[(c[f>>2]|0)+12>>2]|0)>0){mg(d)}g=dg(d,8,112,0,0)|0;h=g;j=d+8|0;k=c[j>>2]|0;c[k>>2]=g;c[k+8>>2]=72;c[j>>2]=(c[j>>2]|0)+16;c[g+12>>2]=c[f>>2];f=h+28|0;c[f>>2]=0;j=g+16|0;c[j>>2]=0;k=g+32|0;c[k>>2]=0;c[g+64>>2]=0;b[g+38>>1]=0;l=g+52|0;c[l>>2]=0;m=g+40|0;a[m]=0;n=g+44|0;c[n>>2]=0;a[g+41|0]=1;o=g+48|0;c[o>>2]=0;c[g+56>>2]=0;b[g+36>>1]=1;a[g+6|0]=0;c[g+68>>2]=0;a[m]=a[d+40|0]|0;m=c[d+44>>2]|0;c[n>>2]=m;c[l>>2]=c[d+52>>2];c[o>>2]=m;m=Ah(d,0,0,640)|0;d=m;c[f>>2]=d;c[k>>2]=40;f=0;do{c[d+(f<<4)+8>>2]=0;f=f+1|0;}while((f|0)!=40);c[g+24>>2]=d+((c[k>>2]|0)+ -5<<4);k=g+72|0;c[g+80>>2]=0;c[g+84>>2]=0;a[g+90|0]=0;c[k>>2]=d;c[g+8>>2]=m+16;c[m+8>>2]=0;c[g+76>>2]=m+336;c[j>>2]=k;i=e;return h|0}function Ji(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;e=b+28|0;Wf(b,c[e>>2]|0);f=c[e>>2]|0;if((f|0)==0){g=b;Ah(a,g,112,0)|0;i=d;return}c[b+16>>2]=b+72;h=b+84|0;j=c[h>>2]|0;c[h>>2]=0;if((j|0)==0){k=f}else{f=j;while(1){j=c[f+12>>2]|0;Ah(b,f,40,0)|0;if((j|0)==0){break}else{f=j}}k=c[e>>2]|0}Ah(b,k,c[b+32>>2]<<4,0)|0;g=b;Ah(a,g,112,0)|0;i=d;return}function Ki(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+24|0;g=f;h=f+16|0;j=Bc[d&3](e,0,8,400)|0;if((j|0)==0){k=0;i=f;return k|0}l=j;m=j+112|0;c[j>>2]=0;a[j+4|0]=8;a[j+172|0]=33;a[j+5|0]=1;a[j+174|0]=0;c[j+12>>2]=m;c[j+28>>2]=0;c[j+16>>2]=0;c[j+32>>2]=0;c[j+64>>2]=0;b[j+38>>1]=0;c[j+52>>2]=0;a[j+40|0]=0;c[j+44>>2]=0;a[j+41|0]=1;c[j+48>>2]=0;c[j+56>>2]=0;b[j+36>>1]=1;a[j+6|0]=0;c[j+68>>2]=0;c[m>>2]=d;c[j+116>>2]=e;c[j+284>>2]=l;e=rb(0)|0;c[h>>2]=e;c[g>>2]=j;c[g+4>>2]=h;c[g+8>>2]=4312;c[g+12>>2]=1;c[j+168>>2]=Qi(g,16,e)|0;e=j+224|0;c[j+240>>2]=e;c[j+244>>2]=e;a[j+175|0]=0;e=j+132|0;c[j+160>>2]=0;c[j+256>>2]=0;c[j+264>>2]=0;c[j+280>>2]=0;c[j+288>>2]=0;g=j+173|0;c[e+0>>2]=0;c[e+4>>2]=0;c[e+8>>2]=0;c[e+12>>2]=0;a[g]=5;g=j+120|0;e=j+180|0;h=e+40|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(h|0));c[g>>2]=400;c[j+124>>2]=0;c[j+268>>2]=200;c[j+272>>2]=200;c[j+276>>2]=200;e=j+364|0;h=e+36|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(h|0));if((zf(l,7,0)|0)==0){k=l;i=f;return k|0}Mi(l);k=0;i=f;return k|0}function Li(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;e=i;i=i+16|0;f=e;g=c[b+12>>2]|0;h=Ah(b,0,0,640)|0;j=h;c[b+28>>2]=j;k=b+32|0;c[k>>2]=40;l=0;do{c[j+(l<<4)+8>>2]=0;l=l+1|0;}while((l|0)!=40);c[b+24>>2]=j+((c[k>>2]|0)+ -5<<4);k=b+72|0;c[b+80>>2]=0;c[b+84>>2]=0;a[b+90|0]=0;c[k>>2]=j;c[b+8>>2]=h+16;c[h+8>>2]=0;c[b+76>>2]=h+336;c[b+16>>2]=k;k=uj(b)|0;c[g+40>>2]=k;c[g+48>>2]=69;pj(b,k,2,0);h=f;c[h>>2]=b;j=f+8|0;c[j>>2]=72;rj(b,k,1,f);c[h>>2]=uj(b)|0;c[j>>2]=69;rj(b,k,2,f);Ri(b,32);Mj(b);im(b);f=Si(b,6016,17)|0;c[g+180>>2]=f;b=f+5|0;a[b]=d[b]|0|32;a[g+63|0]=1;c[g+176>>2]=Yc(0)|0;i=e;return}function Mi(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;b=i;d=a+12|0;e=c[d>>2]|0;f=a+28|0;Wf(a,c[f>>2]|0);hg(a);g=c[d>>2]|0;Ah(a,c[g+24>>2]|0,c[g+32>>2]<<2,0)|0;g=e+144|0;d=e+152|0;c[g>>2]=Ah(a,c[g>>2]|0,c[d>>2]|0,0)|0;c[d>>2]=0;d=c[f>>2]|0;if((d|0)==0){h=e;j=c[h>>2]|0;k=e+4|0;l=c[k>>2]|0;m=a;Bc[j&3](l,m,400,0)|0;i=b;return}c[a+16>>2]=a+72;g=a+84|0;n=c[g>>2]|0;c[g>>2]=0;if((n|0)==0){o=d}else{d=n;while(1){n=c[d+12>>2]|0;Ah(a,d,40,0)|0;if((n|0)==0){break}else{d=n}}o=c[f>>2]|0}Ah(a,o,c[a+32>>2]<<4,0)|0;h=e;j=c[h>>2]|0;k=e+4|0;l=c[k>>2]|0;m=a;Bc[j&3](l,m,400,0)|0;i=b;return}function Ni(a){a=a|0;var b=0;b=i;Mi(c[(c[a+12>>2]|0)+172>>2]|0);i=b;return}function Oi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;e=c[a+12>>2]|0;do{if((a|0)==(b|0)){f=1}else{if((e|0)!=(c[b+12>>2]|0)){f=0;break}f=(Mm(a+16|0,b+16|0,e)|0)==0}}while(0);i=d;return f&1|0}function Pi(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;f=a[b+4|0]|0;do{if(f<<24>>24==(a[d+4|0]|0)){if(f<<24>>24==4){g=(b|0)==(d|0);break}h=c[b+12>>2]|0;if((b|0)==(d|0)){g=1;break}if((h|0)!=(c[d+12>>2]|0)){g=0;break}g=(Mm(b+16|0,d+16|0,h)|0)==0}else{g=0}}while(0);i=e;return g&1|0}function Qi(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,f=0,g=0,h=0,j=0;e=i;f=c^b;c=(b>>>5)+1|0;if(c>>>0>b>>>0){g=f;i=e;return g|0}else{h=f;j=b}while(1){b=(h<<5)+(h>>>2)+(d[a+(j+ -1)|0]|0)^h;f=j-c|0;if(f>>>0<c>>>0){g=b;break}else{j=f;h=b}}i=e;return g|0}function Ri(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;e=i;f=c[b+12>>2]|0;g=f+24|0;gg(b,-5);h=f+32|0;f=c[h>>2]|0;a:do{if((f|0)<(d|0)){if((d+1|0)>>>0>1073741823){zh(b)}j=g;k=Ah(b,c[j>>2]|0,f<<2,d<<2)|0;c[j>>2]=k;l=c[h>>2]|0;if((l|0)<(d|0)){m=k;n=l}else{o=l;break}while(1){c[m+(n<<2)>>2]=0;k=n+1|0;if((k|0)==(d|0)){o=l;break a}m=c[j>>2]|0;n=k}}else{o=f}}while(0);if((o|0)>0){f=g;n=d+ -1|0;m=o;j=0;while(1){l=(c[f>>2]|0)+(j<<2)|0;k=c[l>>2]|0;c[l>>2]=0;if((k|0)==0){p=m}else{l=k;while(1){k=l;q=c[k>>2]|0;r=c[l+8>>2]&n;c[k>>2]=c[(c[f>>2]|0)+(r<<2)>>2];c[(c[f>>2]|0)+(r<<2)>>2]=l;r=l+5|0;a[r]=a[r]&191;if((q|0)==0){break}else{l=q}}p=c[h>>2]|0}l=j+1|0;if((l|0)<(p|0)){m=p;j=l}else{s=p;break}}}else{s=o}if((s|0)<=(d|0)){c[h>>2]=d;i=e;return}if((d+1|0)>>>0>1073741823){zh(b)}o=g;c[o>>2]=Ah(b,c[o>>2]|0,s<<2,d<<2)|0;c[h>>2]=d;i=e;return}function Si(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;if(!(f>>>0<41)){if((f+1|0)>>>0>4294967277){zh(b)}h=c[(c[b+12>>2]|0)+56>>2]|0;j=dg(b,20,f+17|0,0,0)|0;c[j+12>>2]=f;c[j+8>>2]=h;a[j+6|0]=0;h=j+16|0;Xm(h|0,e|0,f|0)|0;a[h+f|0]=0;k=j;i=g;return k|0}j=c[b+12>>2]|0;h=c[j+56>>2]^f;l=(f>>>5)+1|0;if(l>>>0>f>>>0){m=h}else{n=h;h=f;while(1){o=(n<<5)+(n>>>2)+(d[e+(h+ -1)|0]|0)^n;p=h-l|0;if(p>>>0<l>>>0){m=o;break}else{h=p;n=o}}}n=j+32|0;h=c[n>>2]|0;l=j+24|0;o=c[l>>2]|0;p=c[o+((h+ -1&m)<<2)>>2]|0;a:do{if((p|0)!=0){q=p;b:while(1){r=q;do{if((m|0)==(c[q+8>>2]|0)){if((c[q+12>>2]|0)!=(f|0)){break}if((Mm(e,q+16|0,f)|0)==0){break b}}}while(0);s=c[q>>2]|0;if((s|0)==0){break a}else{q=s}}s=q+5|0;t=(d[s]|0)^3;if((((d[j+60|0]|0)^3)&t|0)!=0){k=r;i=g;return k|0}a[s]=t;k=r;i=g;return k|0}}while(0);r=j+28|0;if((c[r>>2]|0)>>>0>=h>>>0&(h|0)<1073741823){Ri(b,h<<1);u=c[l>>2]|0;v=c[n>>2]|0}else{u=o;v=h}h=dg(b,4,f+17|0,u+((v+ -1&m)<<2)|0,0)|0;c[h+12>>2]=f;c[h+8>>2]=m;a[h+6|0]=0;m=h+16|0;Xm(m|0,e|0,f|0)|0;a[m+f|0]=0;c[r>>2]=(c[r>>2]|0)+1;k=h;i=g;return k|0}function Ti(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=Si(a,b,Um(b|0)|0)|0;i=c;return d|0}function Ui(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;if(b>>>0>4294967269){zh(a)}else{f=dg(a,7,b+24|0,0,0)|0;c[f+16>>2]=b;c[f+8>>2]=0;c[f+12>>2]=d;i=e;return f|0}return 0}function Vi(a){a=a|0;var b=0;b=i;Md(a,0,14);$e(a,6040,0);Md(a,0,1);zd(a,6160,0)|0;ed(a,-2);Ud(a,-2)|0;$c(a,-2);ed(a,-2);Rd(a,-2,6168);$c(a,-2);i=b;return 1}function Wi(a){a=a|0;var b=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+8|0;e=b;f=i;i=i+8|0;g=ye(a,1,f)|0;h=Ge(a,2,1)|0;j=c[f>>2]|0;do{if((h|0)>-1){k=h}else{if(j>>>0<(0-h|0)>>>0){k=0;break}k=h+1+j|0}}while(0);j=Ge(a,3,k)|0;h=c[f>>2]|0;do{if((j|0)>-1){l=j}else{if(h>>>0<(0-j|0)>>>0){l=0;break}l=j+1+h|0}}while(0);j=(k|0)==0?1:k;f=l>>>0>h>>>0?h:l;if(j>>>0>f>>>0){m=0;i=b;return m|0}n=f-j+1|0;if((f|0)==-1){m=ne(a,7064,e)|0;i=b;return m|0}ze(a,n,7064);if((n|0)<=0){m=n;i=b;return m|0}e=j+ -1|0;j=~l;l=~h;h=0-(j>>>0>l>>>0?j:l)-(k>>>0>1?k:1)|0;k=0;while(1){xd(a,d[g+(e+k)|0]|0);l=k+1|0;if((l|0)==(h|0)){m=n;break}else{k=l}}i=b;return m|0}function Xi(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;c=i;i=i+1040|0;d=c;e=_c(b)|0;f=Oe(b,d,e)|0;if((e|0)<1){Le(d,e);i=c;return 1}else{g=1}while(1){h=Ee(b,g)|0;if((h&255|0)!=(h|0)){me(b,g,7040)|0}a[f+(g+ -1)|0]=h;if((g|0)==(e|0)){break}else{g=g+1|0}}Le(d,e);i=c;return 1}function Yi(a){a=a|0;var b=0,c=0,d=0;b=i;i=i+8|0;c=i;i=i+1040|0;Ae(a,1,6);$c(a,1);Ne(a,c);if(($d(a,2,c)|0)==0){Ke(c);d=1;i=b;return d|0}else{d=ne(a,7008,b)|0;i=b;return d|0}return 0}function Zi(a){a=a|0;var b=0,c=0;b=i;c=ij(a,1)|0;i=b;return c|0}function _i(b){b=b|0;var e=0,f=0,g=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0.0,ba=0.0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0;e=i;i=i+8|0;f=e;g=i;i=i+8|0;j=i;i=i+8|0;l=i;i=i+8|0;m=i;i=i+8|0;n=i;i=i+8|0;o=i;i=i+8|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=i;i=i+8|0;t=i;i=i+16|0;u=i;i=i+8|0;v=i;i=i+1040|0;w=i;i=i+24|0;x=i;i=i+8|0;y=_c(b)|0;z=ye(b,1,u)|0;A=c[u>>2]|0;u=z+A|0;Ne(b,v);a:do{if((A|0)>0){B=v+8|0;C=v+4|0;D=v;E=w;F=w+1|0;G=t;H=1;I=z;b:while(1){J=I;while(1){K=a[J]|0;if(K<<24>>24==37){L=J+1|0;if((a[L]|0)!=37){break}M=c[B>>2]|0;if(M>>>0<(c[C>>2]|0)>>>0){N=M;O=37}else{He(v,1)|0;N=c[B>>2]|0;O=a[L]|0}c[B>>2]=N+1;a[(c[D>>2]|0)+N|0]=O;P=J+2|0}else{M=c[B>>2]|0;if(M>>>0<(c[C>>2]|0)>>>0){Q=M;R=K}else{He(v,1)|0;Q=c[B>>2]|0;R=a[J]|0}c[B>>2]=Q+1;a[(c[D>>2]|0)+Q|0]=R;P=J+1|0}if(P>>>0<u>>>0){J=P}else{break a}}J=He(v,512)|0;K=H+1|0;if((H|0)>=(y|0)){me(b,K,6768)|0}M=a[L]|0;c:do{if(M<<24>>24==0){S=0;T=L}else{U=M;V=L;while(1){W=V+1|0;if((ua(6920,U<<24>>24|0,6)|0)==0){S=U;T=V;break c}X=a[W]|0;if(X<<24>>24==0){S=0;T=W;break}else{U=X;V=W}}}}while(0);M=L;if((T-M|0)>>>0>5){ne(b,6928,r)|0;Y=a[T]|0}else{Y=S}V=((Y&255)+ -48|0)>>>0<10?T+1|0:T;U=((d[V]|0)+ -48|0)>>>0<10?V+1|0:V;V=a[U]|0;if(V<<24>>24==46){W=U+1|0;X=((d[W]|0)+ -48|0)>>>0<10?U+2|0:W;W=((d[X]|0)+ -48|0)>>>0<10?X+1|0:X;Z=a[W]|0;_=W}else{Z=V;_=U}if(((Z&255)+ -48|0)>>>0<10){ne(b,6960,q)|0}a[E]=37;U=_-M|0;Xm(F|0,L|0,U+1|0)|0;a[w+(U+2)|0]=0;U=_+1|0;$=a[_]|0;d:do{switch($|0){case 105:case 100:{aa=+Ce(b,K);M=~~aa;ba=aa- +(M|0);if(!(ba>-1.0&ba<1.0)){me(b,K,6784)|0}V=Um(E|0)|0;W=w+(V+ -1)|0;X=a[W]|0;ca=W;a[ca]=108;a[ca+1|0]=0;a[w+V|0]=X;a[w+(V+1)|0]=0;c[o>>2]=M;da=nb(J|0,E|0,o|0)|0;break};case 71:case 103:case 102:case 69:case 101:{a[w+(Um(E|0)|0)|0]=0;ba=+Ce(b,K);M=m;h[k>>3]=ba;c[M>>2]=c[k>>2];c[M+4>>2]=c[k+4>>2];da=nb(J|0,E|0,m|0)|0;break};case 99:{c[p>>2]=Ee(b,K)|0;da=nb(J|0,E|0,p|0)|0;break};case 88:case 120:case 117:case 111:{ba=+Ce(b,K);M=~~ba>>>0;aa=ba- +(M>>>0);if(!(aa>-1.0&aa<1.0)){me(b,K,6816)|0}V=Um(E|0)|0;X=w+(V+ -1)|0;ca=a[X]|0;W=X;a[W]=108;a[W+1|0]=0;a[w+V|0]=ca;a[w+(V+1)|0]=0;c[n>>2]=M;da=nb(J|0,E|0,n|0)|0;break};case 113:{M=ye(b,K,s)|0;V=c[B>>2]|0;if(V>>>0<(c[C>>2]|0)>>>0){ea=V}else{He(v,1)|0;ea=c[B>>2]|0}c[B>>2]=ea+1;a[(c[D>>2]|0)+ea|0]=34;V=c[s>>2]|0;c[s>>2]=V+ -1;if((V|0)!=0){V=M;while(1){M=a[V]|0;do{if(M<<24>>24==10|M<<24>>24==92|M<<24>>24==34){ca=c[B>>2]|0;if(ca>>>0<(c[C>>2]|0)>>>0){fa=ca}else{He(v,1)|0;fa=c[B>>2]|0}c[B>>2]=fa+1;a[(c[D>>2]|0)+fa|0]=92;ca=c[B>>2]|0;if(ca>>>0<(c[C>>2]|0)>>>0){ga=ca}else{He(v,1)|0;ga=c[B>>2]|0}ca=a[V]|0;c[B>>2]=ga+1;a[(c[D>>2]|0)+ga|0]=ca}else if(M<<24>>24==0){ha=0;ia=44}else{if((Lb(M&255|0)|0)!=0){ha=a[V]|0;ia=44;break}ca=c[B>>2]|0;if(ca>>>0<(c[C>>2]|0)>>>0){ja=ca}else{He(v,1)|0;ja=c[B>>2]|0}ca=a[V]|0;c[B>>2]=ja+1;a[(c[D>>2]|0)+ja|0]=ca}}while(0);if((ia|0)==44){ia=0;M=ha&255;if(((d[V+1|0]|0)+ -48|0)>>>0<10){c[j>>2]=M;nb(G|0,6912,j|0)|0}else{c[l>>2]=M;nb(G|0,6904,l|0)|0}Je(v,G)}M=c[s>>2]|0;c[s>>2]=M+ -1;if((M|0)==0){break}else{V=V+1|0}}}V=c[B>>2]|0;if(V>>>0<(c[C>>2]|0)>>>0){ka=V}else{He(v,1)|0;ka=c[B>>2]|0}c[B>>2]=ka+1;a[(c[D>>2]|0)+ka|0]=34;da=0;break};case 115:{V=Xe(b,K,x)|0;do{if((hb(E|0,46)|0)==0){if(!((c[x>>2]|0)>>>0>99)){break}Me(v);da=0;break d}}while(0);c[g>>2]=V;M=nb(J|0,E|0,g|0)|0;$c(b,-2);da=M;break};default:{break b}}}while(0);c[B>>2]=(c[B>>2]|0)+da;if(U>>>0<u>>>0){H=K;I=U}else{break a}}c[f>>2]=$;la=ne(b,6864,f)|0;i=e;return la|0}}while(0);Ke(v);la=1;i=e;return la|0}function $i(a){a=a|0;var b=0;b=i;ye(a,1,0)|0;ye(a,2,0)|0;$c(a,2);xd(a,0);Dd(a,161,3);i=b;return 1}function aj(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;d=i;i=i+8|0;e=d;f=i;i=i+8|0;g=i;i=i+8|0;h=i;i=i+8|0;j=i;i=i+8|0;k=i;i=i+8|0;l=i;i=i+280|0;m=i;i=i+1040|0;n=ye(b,1,j)|0;o=ye(b,2,k)|0;p=fd(b,3)|0;q=Ge(b,4,(c[j>>2]|0)+1|0)|0;r=(a[o]|0)==94;if(!((p+ -3|0)>>>0<2|(p|0)==6|(p|0)==5)){me(b,3,6648)|0}Ne(b,m);if(r){s=(c[k>>2]|0)+ -1|0;c[k>>2]=s;t=s;u=o+1|0}else{t=c[k>>2]|0;u=o}o=l+16|0;c[o>>2]=b;c[l>>2]=200;k=l+4|0;c[k>>2]=n;s=l+8|0;c[s>>2]=n+(c[j>>2]|0);c[l+12>>2]=u+t;t=l+20|0;j=m+8|0;v=m+4|0;w=m;x=l+28|0;y=l+24|0;z=0;A=n;while(1){if(!(z>>>0<q>>>0)){B=z;C=A;D=48;break}c[t>>2]=0;n=jj(l,A,u)|0;if((n|0)==0){E=z;D=43}else{F=z+1|0;G=c[o>>2]|0;do{if((p|0)==6){ed(G,3);H=c[t>>2]|0;I=(H|0)!=0|(A|0)==0?H:1;ze(c[o>>2]|0,I,6320);if((I|0)>0){H=0;do{kj(l,H,A,n);H=H+1|0;}while((H|0)!=(I|0))}Xd(G,I,1,0,0);D=37}else if((p|0)==5){a:do{if((c[t>>2]|0)>0){H=c[x>>2]|0;do{if((H|0)==-1){ne(G,6368,g)|0;J=c[y>>2]|0;K=c[o>>2]|0}else{L=c[y>>2]|0;if(!((H|0)==-2)){J=L;K=G;break}xd(G,L+1-(c[k>>2]|0)|0);break a}}while(0);zd(K,J,H)|0}else{zd(G,A,n-A|0)|0}}while(0);Id(G,3);D=37}else{I=qd(G,3,h)|0;if((c[h>>2]|0)==0){break}L=n-A|0;M=0;do{N=I+M|0;O=a[N]|0;do{if(O<<24>>24==37){P=M+1|0;Q=I+P|0;R=a[Q]|0;S=R<<24>>24;if(((R&255)+ -48|0)>>>0<10){if(R<<24>>24==48){Ie(m,A,L);T=P;break}else{kj(l,S+ -49|0,A,n);Me(m);T=P;break}}if(!(R<<24>>24==37)){R=c[o>>2]|0;c[f>>2]=37;ne(R,6720,f)|0}R=c[j>>2]|0;if(R>>>0<(c[v>>2]|0)>>>0){U=R}else{He(m,1)|0;U=c[j>>2]|0}R=a[Q]|0;c[j>>2]=U+1;a[(c[w>>2]|0)+U|0]=R;T=P}else{P=c[j>>2]|0;if(P>>>0<(c[v>>2]|0)>>>0){V=P;W=O}else{He(m,1)|0;V=c[j>>2]|0;W=a[N]|0}c[j>>2]=V+1;a[(c[w>>2]|0)+V|0]=W;T=M}}while(0);M=T+1|0;}while(M>>>0<(c[h>>2]|0)>>>0)}}while(0);if((D|0)==37){D=0;do{if((pd(G,-1)|0)==0){$c(G,-2);zd(G,A,n-A|0)|0}else{if((jd(G,-1)|0)!=0){break}c[e>>2]=gd(G,fd(G,-1)|0)|0;ne(G,6680,e)|0}}while(0);Me(m)}if(n>>>0>A>>>0){X=F;Y=n}else{E=F;D=43}}if((D|0)==43){D=0;if(!(A>>>0<(c[s>>2]|0)>>>0)){B=E;C=A;D=48;break}G=c[j>>2]|0;if(G>>>0<(c[v>>2]|0)>>>0){Z=G}else{He(m,1)|0;Z=c[j>>2]|0}G=a[A]|0;c[j>>2]=Z+1;a[(c[w>>2]|0)+Z|0]=G;X=E;Y=A+1|0}if(r){B=X;C=Y;D=48;break}else{z=X;A=Y}}if((D|0)==48){Ie(m,C,(c[s>>2]|0)-C|0);Ke(m);xd(b,B);i=d;return 2}return 0}function bj(a){a=a|0;var b=0,d=0;b=i;i=i+8|0;d=b;ye(a,1,d)|0;xd(a,c[d>>2]|0);i=b;return 1}function cj(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;i=i+1048|0;f=e;g=e+8|0;h=ye(b,1,f)|0;j=Oe(b,g,c[f>>2]|0)|0;if((c[f>>2]|0)==0){k=0;Le(g,k);i=e;return 1}else{l=0}while(1){a[j+l|0]=Zm(d[h+l|0]|0|0)|0;b=l+1|0;m=c[f>>2]|0;if(b>>>0<m>>>0){l=b}else{k=m;break}}Le(g,k);i=e;return 1}function dj(a){a=a|0;var b=0,c=0;b=i;c=ij(a,0)|0;i=b;return c|0}function ej(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;b=i;i=i+8|0;d=b;e=i;i=i+8|0;f=i;i=i+8|0;g=i;i=i+1040|0;h=ye(a,1,e)|0;j=Ee(a,2)|0;k=xe(a,3,6160,f)|0;if((j|0)<1){zd(a,6160,0)|0;l=1;i=b;return l|0}m=c[e>>2]|0;n=c[f>>2]|0;o=n+m|0;do{if(!(o>>>0<m>>>0)){if(!(o>>>0<(2147483647/(j>>>0)|0)>>>0)){break}p=(da(n,j+ -1|0)|0)+(da(m,j)|0)|0;q=Oe(a,g,p)|0;Xm(q|0,h|0,c[e>>2]|0)|0;if((j|0)>1){r=j;s=q;while(1){q=r+ -1|0;t=c[e>>2]|0;u=s+t|0;v=c[f>>2]|0;if((v|0)==0){w=t;x=u}else{Xm(u|0,k|0,v|0)|0;w=c[e>>2]|0;x=s+((c[f>>2]|0)+t)|0}Xm(x|0,h|0,w|0)|0;if((q|0)>1){s=x;r=q}else{break}}}Le(g,p);l=1;i=b;return l|0}}while(0);l=ne(a,6288,d)|0;i=b;return l|0}function fj(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;d=i;i=i+1048|0;e=d;f=d+8|0;g=ye(b,1,e)|0;h=Oe(b,f,c[e>>2]|0)|0;b=c[e>>2]|0;if((b|0)==0){j=0;Le(f,j);i=d;return 1}else{k=b;l=0}while(1){a[h+l|0]=a[g+(k+~l)|0]|0;b=l+1|0;m=c[e>>2]|0;if(b>>>0<m>>>0){l=b;k=m}else{j=m;break}}Le(f,j);i=d;return 1}function gj(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0;b=i;i=i+8|0;d=b;e=ye(a,1,d)|0;f=Ee(a,2)|0;g=c[d>>2]|0;do{if((f|0)>-1){h=f}else{if(g>>>0<(0-f|0)>>>0){h=0;break}h=f+1+g|0}}while(0);g=Ge(a,3,-1)|0;f=c[d>>2]|0;do{if((g|0)>-1){j=g}else{if(f>>>0<(0-g|0)>>>0){j=0;break}j=g+1+f|0}}while(0);g=(h|0)==0?1:h;h=j>>>0>f>>>0?f:j;if(g>>>0>h>>>0){zd(a,6160,0)|0;i=b;return 1}else{zd(a,e+(g+ -1)|0,1-g+h|0)|0;i=b;return 1}return 0}function hj(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;i=i+1048|0;f=e;g=e+8|0;h=ye(b,1,f)|0;j=Oe(b,g,c[f>>2]|0)|0;if((c[f>>2]|0)==0){k=0;Le(g,k);i=e;return 1}else{l=0}while(1){a[j+l|0]=nc(d[h+l|0]|0|0)|0;b=l+1|0;m=c[f>>2]|0;if(b>>>0<m>>>0){l=b}else{k=m;break}}Le(g,k);i=e;return 1}function ij(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;e=i;i=i+296|0;f=e;g=e+8|0;h=e+16|0;j=ye(b,1,f)|0;k=ye(b,2,g)|0;l=Ge(b,3,1)|0;m=c[f>>2]|0;do{if((l|0)>-1){n=l;o=4}else{if(m>>>0<(0-l|0)>>>0){p=1;break}n=l+1+m|0;o=4}}while(0);do{if((o|0)==4){if((n|0)==0){p=1;break}if(!(n>>>0>(m+1|0)>>>0)){p=n;break}vd(b);q=1;i=e;return q|0}}while(0);n=(d|0)!=0;a:do{if(n){d=(pd(b,4)|0)==0;m=c[g>>2]|0;if(d){d=0;do{l=k+d|0;if((wa(l|0,6632)|0)!=0){o=20;break a}d=d+1+(Um(l|0)|0)|0;}while(!(d>>>0>m>>>0))}d=j+(p+ -1)|0;l=(c[f>>2]|0)-p+1|0;b:do{if((m|0)==0){if((d|0)==0){break a}else{r=d}}else{if(m>>>0>l>>>0){break a}s=m+ -1|0;if((s|0)==(l|0)){break a}t=a[k]|0;u=k+1|0;v=l-s|0;w=d;while(1){x=ua(w|0,t|0,v|0)|0;if((x|0)==0){break a}y=x+1|0;if((Mm(y,u,s)|0)==0){r=x;break b}x=y;z=w+v|0;if((z|0)==(x|0)){break a}else{v=z-x|0;w=y}}}}while(0);d=r-j|0;xd(b,d+1|0);xd(b,d+(c[g>>2]|0)|0);q=2;i=e;return q|0}else{o=20}}while(0);c:do{if((o|0)==20){r=j+(p+ -1)|0;d=(a[k]|0)==94;if(d){l=(c[g>>2]|0)+ -1|0;c[g>>2]=l;A=l;B=k+1|0}else{A=c[g>>2]|0;B=k}l=h+16|0;c[l>>2]=b;c[h>>2]=200;c[h+4>>2]=j;m=h+8|0;c[m>>2]=j+(c[f>>2]|0);c[h+12>>2]=B+A;w=h+20|0;d:do{if(d){c[w>>2]=0;v=jj(h,r,B)|0;if((v|0)==0){break c}else{C=v;D=r}}else{v=r;while(1){c[w>>2]=0;s=jj(h,v,B)|0;if((s|0)!=0){C=s;D=v;break d}if(!(v>>>0<(c[m>>2]|0)>>>0)){break c}v=v+1|0}}}while(0);if(n){m=j;xd(b,1-m+D|0);xd(b,C-m|0);m=c[w>>2]|0;ze(c[l>>2]|0,m,6320);if((m|0)>0){r=0;do{kj(h,r,0,0);r=r+1|0;}while((r|0)!=(m|0))}q=m+2|0;i=e;return q|0}else{r=c[w>>2]|0;d=(r|0)!=0|(D|0)==0?r:1;ze(c[l>>2]|0,d,6320);if((d|0)>0){E=0}else{q=r;i=e;return q|0}while(1){kj(h,E,D,C);r=E+1|0;if((r|0)==(d|0)){q=d;break}else{E=r}}i=e;return q|0}}}while(0);vd(b);q=1;i=e;return q|0}function jj(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0;g=i;i=i+8|0;h=g;j=i;i=i+8|0;k=i;i=i+8|0;l=i;i=i+8|0;m=i;i=i+8|0;n=i;i=i+8|0;o=i;i=i+8|0;p=i;i=i+8|0;q=i;i=i+8|0;r=i;i=i+8|0;s=i;i=i+8|0;t=b;u=c[t>>2]|0;c[t>>2]=u+ -1;if((u|0)==0){ne(c[b+16>>2]|0,6392,s)|0}s=b+12|0;u=c[s>>2]|0;a:do{if((u|0)==(f|0)){v=e}else{w=b+8|0;x=b+16|0;y=b+4|0;z=b+20|0;A=e;B=f;C=u;b:while(1){D=A+1|0;E=A+ -1|0;F=B;G=C;c:while(1){H=a[F]|0;I=H<<24>>24;d:do{if((I|0)==40){J=7;break b}else if((I|0)==41){J=16;break b}else if((I|0)==36){K=F+1|0;if((K|0)==(G|0)){J=23;break b}else{L=K;M=K;J=89}}else if((I|0)==37){K=F+1|0;N=a[K]|0;switch(N<<24>>24|0){case 102:{break};case 57:case 56:case 55:case 54:case 53:case 52:case 51:case 50:case 49:case 48:{J=69;break c;break};case 98:{J=25;break c;break};default:{if((K|0)==(G|0)){ne(c[x>>2]|0,6488,j)|0}L=F+2|0;M=K;J=89;break d}}K=F+2|0;if((a[K]|0)==91){O=91}else{ne(c[x>>2]|0,6416,n)|0;O=a[K]|0}P=F+3|0;Q=O<<24>>24;if((Q|0)==91){R=(a[P]|0)==94?F+4|0:P;while(1){if((R|0)==(c[s>>2]|0)){ne(c[x>>2]|0,6528,l)|0}S=R+1|0;if((a[R]|0)==37){T=S>>>0<(c[s>>2]|0)>>>0?R+2|0:S}else{T=S}if((a[T]|0)==93){break}else{R=T}}U=T+1|0}else if((Q|0)==37){if((P|0)==(c[s>>2]|0)){ne(c[x>>2]|0,6488,m)|0}U=F+4|0}else{U=P}if((A|0)==(c[y>>2]|0)){V=0}else{V=a[E]|0}R=V&255;S=U+ -1|0;W=(a[P]|0)==94;X=W?P:K;Y=W&1;W=Y^1;Z=X+1|0;e:do{if(Z>>>0<S>>>0){_=X;$=Z;while(1){aa=a[$]|0;ba=_+2|0;ca=a[ba]|0;f:do{if(aa<<24>>24==37){if((lj(R,ca&255)|0)==0){da=ba}else{ea=W;break e}}else{do{if(ca<<24>>24==45){fa=_+3|0;if(!(fa>>>0<S>>>0)){break}if((aa&255)>(V&255)){da=fa;break f}if((d[fa]|0)<(V&255)){da=fa;break f}else{ea=W;break e}}}while(0);if(aa<<24>>24==V<<24>>24){ea=W;break e}else{da=$}}}while(0);aa=da+1|0;if(aa>>>0<S>>>0){_=da;$=aa}else{ea=Y;break}}}else{ea=Y}}while(0);if((ea|0)!=0){v=0;break a}Y=a[A]|0;W=Y&255;R=(a[P]|0)==94;Z=R?P:K;X=R&1;R=X^1;Q=Z+1|0;g:do{if(Q>>>0<S>>>0){$=Z;_=Q;while(1){aa=a[_]|0;ca=$+2|0;ba=a[ca]|0;h:do{if(aa<<24>>24==37){if((lj(W,ba&255)|0)==0){ga=ca}else{ha=R;break g}}else{do{if(ba<<24>>24==45){fa=$+3|0;if(!(fa>>>0<S>>>0)){break}if((aa&255)>(Y&255)){ga=fa;break h}if((d[fa]|0)<(Y&255)){ga=fa;break h}else{ha=R;break g}}}while(0);if(aa<<24>>24==Y<<24>>24){ha=R;break g}else{ga=_}}}while(0);aa=ga+1|0;if(aa>>>0<S>>>0){$=ga;_=aa}else{ha=X;break}}}else{ha=X}}while(0);if((ha|0)==0){v=0;break a}else{ia=U}}else{X=F+1|0;if(!(H<<24>>24==91)){L=X;M=X;J=89;break}S=(a[X]|0)==94?F+2|0:X;R=G;while(1){if((S|0)==(R|0)){ne(c[x>>2]|0,6528,h)|0}Y=S+1|0;if((a[S]|0)==37){ja=Y>>>0<(c[s>>2]|0)>>>0?S+2|0:Y}else{ja=Y}if((a[ja]|0)==93){break}S=ja;R=c[s>>2]|0}L=ja+1|0;M=X;J=89}}while(0);i:do{if((J|0)==89){J=0;do{if((c[w>>2]|0)>>>0>A>>>0){H=a[A]|0;I=H&255;R=a[F]|0;S=R<<24>>24;j:do{if((S|0)==46){ka=a[L]|0}else if((S|0)==37){la=lj(I,d[M]|0)|0;J=104}else if((S|0)==91){Y=L+ -1|0;W=(a[M]|0)==94;Q=W?M:F;Z=W&1;W=Z^1;K=Q+1|0;if(K>>>0<Y>>>0){ma=Q;na=K}else{la=Z;J=104;break}while(1){K=a[na]|0;Q=ma+2|0;P=a[Q]|0;k:do{if(K<<24>>24==37){if((lj(I,P&255)|0)==0){oa=Q}else{la=W;J=104;break j}}else{do{if(P<<24>>24==45){_=ma+3|0;if(!(_>>>0<Y>>>0)){break}if((K&255)>(H&255)){oa=_;break k}if((d[_]|0)<(H&255)){oa=_;break k}else{la=W;J=104;break j}}}while(0);if(K<<24>>24==H<<24>>24){la=W;J=104;break j}else{oa=na}}}while(0);K=oa+1|0;if(K>>>0<Y>>>0){ma=oa;na=K}else{la=Z;J=104;break}}}else{la=R<<24>>24==H<<24>>24|0;J=104}}while(0);if((J|0)==104){J=0;H=a[L]|0;if((la|0)==0){pa=H;break}else{ka=H}}H=ka<<24>>24;if((H|0)==45){J=109;break b}else if((H|0)==42){J=112;break b}else if((H|0)==43){qa=D;break b}else if((H|0)!=63){ra=D;sa=L;break c}H=L+1|0;R=jj(b,D,H)|0;if((R|0)==0){ia=H;break i}else{v=R;break a}}else{pa=a[L]|0}}while(0);if(!(pa<<24>>24==45|pa<<24>>24==63|pa<<24>>24==42)){v=0;break a}ia=L+1|0}}while(0);X=c[s>>2]|0;if((ia|0)==(X|0)){v=A;break a}else{F=ia;G=X}}if((J|0)==25){J=0;E=F+2|0;if(!((G+ -1|0)>>>0>E>>>0)){ne(c[x>>2]|0,6560,o)|0}X=a[A]|0;if(!(X<<24>>24==(a[E]|0))){v=0;break a}E=a[F+3|0]|0;R=c[w>>2]|0;if(D>>>0<R>>>0){ta=A;ua=D;va=1}else{v=0;break a}while(1){H=a[ua]|0;if(H<<24>>24==E<<24>>24){I=va+ -1|0;if((I|0)==0){break}else{wa=I}}else{wa=(H<<24>>24==X<<24>>24)+va|0}H=ua+1|0;if(H>>>0<R>>>0){I=ua;ua=H;va=wa;ta=I}else{v=0;break a}}ra=ta+2|0;sa=F+4|0}else if((J|0)==69){J=0;R=N&255;X=R+ -49|0;do{if((X|0)<0){J=72}else{if((X|0)>=(c[z>>2]|0)){J=72;break}E=c[b+(X<<3)+28>>2]|0;if((E|0)==-1){J=72}else{xa=X;ya=E}}}while(0);if((J|0)==72){J=0;X=c[x>>2]|0;c[k>>2]=R+ -48;E=ne(X,6456,k)|0;xa=E;ya=c[b+(E<<3)+28>>2]|0}if(((c[w>>2]|0)-A|0)>>>0<ya>>>0){v=0;break a}if((Mm(c[b+(xa<<3)+24>>2]|0,A,ya)|0)!=0){v=0;break a}E=A+ya|0;if((E|0)==0){v=0;break a}ra=E;sa=F+2|0}E=c[s>>2]|0;if((sa|0)==(E|0)){v=ra;break a}else{A=ra;B=sa;C=E}}if((J|0)==7){C=F+1|0;if((a[C]|0)==41){B=c[z>>2]|0;if((B|0)>31){ne(c[x>>2]|0,6320,r)|0}c[b+(B<<3)+24>>2]=A;c[b+(B<<3)+28>>2]=-2;c[z>>2]=B+1;B=jj(b,A,F+2|0)|0;if((B|0)!=0){v=B;break}c[z>>2]=(c[z>>2]|0)+ -1;v=0;break}else{B=c[z>>2]|0;if((B|0)>31){ne(c[x>>2]|0,6320,q)|0}c[b+(B<<3)+24>>2]=A;c[b+(B<<3)+28>>2]=-1;c[z>>2]=B+1;B=jj(b,A,C)|0;if((B|0)!=0){v=B;break}c[z>>2]=(c[z>>2]|0)+ -1;v=0;break}}else if((J|0)==16){B=F+1|0;C=c[z>>2]|0;while(1){y=C+ -1|0;if((C|0)<=0){J=19;break}if((c[b+(y<<3)+28>>2]|0)==-1){za=y;break}else{C=y}}if((J|0)==19){za=ne(c[x>>2]|0,6608,p)|0}C=b+(za<<3)+28|0;c[C>>2]=A-(c[b+(za<<3)+24>>2]|0);z=jj(b,A,B)|0;if((z|0)!=0){v=z;break}c[C>>2]=-1;v=0;break}else if((J|0)==23){v=(A|0)==(c[w>>2]|0)?A:0;break}else if((J|0)==109){C=L+1|0;z=jj(b,A,C)|0;if((z|0)!=0){v=z;break}z=L+ -1|0;y=A;while(1){if(!((c[w>>2]|0)>>>0>y>>>0)){v=0;break a}E=a[y]|0;X=E&255;D=a[F]|0;G=D<<24>>24;l:do{if((G|0)==37){Aa=lj(X,d[M]|0)|0;J=147}else if((G|0)==91){I=(a[M]|0)==94;H=I?M:F;S=I&1;I=S^1;Z=H+1|0;if(Z>>>0<z>>>0){Ba=H;Ca=Z}else{Aa=S;J=147;break}while(1){Z=a[Ca]|0;H=Ba+2|0;Y=a[H]|0;m:do{if(Z<<24>>24==37){if((lj(X,Y&255)|0)==0){Da=H}else{Aa=I;J=147;break l}}else{do{if(Y<<24>>24==45){W=Ba+3|0;if(!(W>>>0<z>>>0)){break}if((Z&255)>(E&255)){Da=W;break m}if((d[W]|0)<(E&255)){Da=W;break m}else{Aa=I;J=147;break l}}}while(0);if(Z<<24>>24==E<<24>>24){Aa=I;J=147;break l}else{Da=Ca}}}while(0);Z=Da+1|0;if(Z>>>0<z>>>0){Ba=Da;Ca=Z}else{Aa=S;J=147;break}}}else if((G|0)!=46){Aa=D<<24>>24==E<<24>>24|0;J=147}}while(0);if((J|0)==147){J=0;if((Aa|0)==0){v=0;break a}}E=y+1|0;D=jj(b,E,C)|0;if((D|0)==0){y=E}else{v=D;break a}}}else if((J|0)==112){qa=A}y=c[w>>2]|0;if(y>>>0>qa>>>0){C=L+ -1|0;z=qa;B=0;x=y;while(1){y=a[z]|0;D=y&255;E=a[F]|0;G=E<<24>>24;n:do{if((G|0)==37){Ea=lj(D,d[M]|0)|0;J=129}else if((G|0)==91){X=(a[M]|0)==94;R=X?M:F;S=X&1;X=S^1;I=R+1|0;if(I>>>0<C>>>0){Fa=R;Ga=I}else{Ea=S;J=129;break}while(1){I=a[Ga]|0;R=Fa+2|0;Z=a[R]|0;o:do{if(I<<24>>24==37){if((lj(D,Z&255)|0)==0){Ha=R}else{Ea=X;J=129;break n}}else{do{if(Z<<24>>24==45){Y=Fa+3|0;if(!(Y>>>0<C>>>0)){break}if((I&255)>(y&255)){Ha=Y;break o}if((d[Y]|0)<(y&255)){Ha=Y;break o}else{Ea=X;J=129;break n}}}while(0);if(I<<24>>24==y<<24>>24){Ea=X;J=129;break n}else{Ha=Ga}}}while(0);I=Ha+1|0;if(I>>>0<C>>>0){Fa=Ha;Ga=I}else{Ea=S;J=129;break}}}else if((G|0)==46){Ia=x}else{Ea=E<<24>>24==y<<24>>24|0;J=129}}while(0);if((J|0)==129){J=0;if((Ea|0)==0){Ja=B;break}Ia=c[w>>2]|0}y=B+1|0;E=qa+y|0;if(Ia>>>0>E>>>0){z=E;B=y;x=Ia}else{Ja=y;break}}if((Ja|0)>-1){Ka=Ja}else{v=0;break}}else{Ka=0}x=L+1|0;B=Ka;while(1){z=jj(b,qa+B|0,x)|0;if((z|0)!=0){v=z;break a}if((B|0)>0){B=B+ -1|0}else{v=0;break}}}}while(0);c[t>>2]=(c[t>>2]|0)+1;i=g;return v|0}function kj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;i=i+8|0;g=f;h=i;i=i+8|0;if((c[a+20>>2]|0)<=(b|0)){j=c[a+16>>2]|0;if((b|0)==0){zd(j,d,e-d|0)|0;i=f;return}else{ne(j,6344,h)|0;i=f;return}}h=c[a+(b<<3)+28>>2]|0;do{if((h|0)==-1){j=a+16|0;ne(c[j>>2]|0,6368,g)|0;k=c[a+(b<<3)+24>>2]|0;l=c[j>>2]|0}else{j=c[a+16>>2]|0;d=c[a+(b<<3)+24>>2]|0;if(!((h|0)==-2)){k=d;l=j;break}xd(j,d+1-(c[a+4>>2]|0)|0);i=f;return}}while(0);zd(l,k,h)|0;i=f;return}function lj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=i;switch(Zm(b|0)|0){case 97:{d=fb(a|0)|0;break};case 119:{d=oa(a|0)|0;break};case 103:{d=$a(a|0)|0;break};case 120:{d=rc(a|0)|0;break};case 115:{d=Wb(a|0)|0;break};case 122:{d=(a|0)==0|0;break};case 99:{d=Lb(a|0)|0;break};case 108:{d=Ra(a|0)|0;break};case 117:{d=Oa(a|0)|0;break};case 112:{d=Ub(a|0)|0;break};case 100:{d=(a+ -48|0)>>>0<10|0;break};default:{e=(b|0)==(a|0)|0;i=c;return e|0}}if((Ra(b|0)|0)!=0){e=d;i=c;return e|0}e=(d|0)==0|0;i=c;return e|0}function mj(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;b=i;i=i+296|0;d=b;e=b+280|0;f=b+288|0;g=qd(a,-1001001,e)|0;h=qd(a,-1001002,f)|0;j=d+16|0;c[j>>2]=a;c[d>>2]=200;c[d+4>>2]=g;k=d+8|0;c[k>>2]=g+(c[e>>2]|0);c[d+12>>2]=h+(c[f>>2]|0);f=g+(nd(a,-1001003,0)|0)|0;if(f>>>0>(c[k>>2]|0)>>>0){l=0;i=b;return l|0}e=d+20|0;m=f;while(1){c[e>>2]=0;n=jj(d,m,h)|0;f=m+1|0;if((n|0)!=0){break}if(f>>>0>(c[k>>2]|0)>>>0){l=0;o=7;break}else{m=f}}if((o|0)==7){i=b;return l|0}xd(a,n-g+((n|0)==(m|0))|0);cd(a,-1001003);a=c[e>>2]|0;e=(a|0)!=0|(m|0)==0?a:1;ze(c[j>>2]|0,e,6320);if((e|0)>0){p=0}else{l=a;i=b;return l|0}while(1){kj(d,p,m,n);a=p+1|0;if((a|0)==(e|0)){l=e;break}else{p=a}}i=b;return l|0}function nj(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=i;Ie(d,b,c);i=a;return 0}function oj(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0.0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;f=i;i=i+8|0;g=f;j=i;i=i+8|0;k=e+8|0;l=c[k>>2]|0;a:do{if((l|0)==0){m=c[b+28>>2]|0;n=-1}else{do{if((l|0)==3){o=+h[e>>3];h[j>>3]=o+6755399441055744.0;p=c[j>>2]|0;if(!(+(p|0)==o)){break}if((p|0)<=0){break}q=c[b+28>>2]|0;if((p|0)>(q|0)){break}m=q;n=p+ -1|0;break a}}while(0);p=e;q=xj(b,e)|0;b:while(1){r=q+16|0;s=q+24|0;t=c[s>>2]|0;if((t|0)==(c[k>>2]|0)){if((Zj(0,r,e)|0)!=0){u=15;break}v=c[s>>2]|0}else{v=t}do{if((v|0)==11){if((c[k>>2]&64|0)==0){break}if((c[r>>2]|0)==(c[p>>2]|0)){u=15;break b}}}while(0);r=c[q+28>>2]|0;if((r|0)==0){u=18;break}else{q=r}}if((u|0)==15){p=c[b+28>>2]|0;m=p;n=(q-(c[b+16>>2]|0)>>5)+p|0;break}else if((u|0)==18){tf(a,7184,g)}}}while(0);g=b+12|0;a=n;while(1){w=a+1|0;if((w|0)>=(m|0)){break}x=c[g>>2]|0;y=x+(w<<4)+8|0;if((c[y>>2]|0)==0){a=w}else{u=21;break}}if((u|0)==21){h[e>>3]=+(a+2|0);c[k>>2]=3;a=x+(w<<4)|0;x=c[a+4>>2]|0;g=e+16|0;c[g>>2]=c[a>>2];c[g+4>>2]=x;c[e+24>>2]=c[y>>2];z=1;i=f;return z|0}y=w-m|0;m=1<<(d[b+7|0]|0);if((y|0)>=(m|0)){z=0;i=f;return z|0}w=b+16|0;b=c[w>>2]|0;x=y;while(1){y=x+1|0;if((c[b+(x<<5)+8>>2]|0)!=0){break}if((y|0)<(m|0)){x=y}else{z=0;u=27;break}}if((u|0)==27){i=f;return z|0}u=b+(x<<5)+16|0;m=c[u+4>>2]|0;y=e;c[y>>2]=c[u>>2];c[y+4>>2]=m;c[k>>2]=c[b+(x<<5)+24>>2];b=c[w>>2]|0;w=b+(x<<5)|0;k=c[w+4>>2]|0;m=e+16|0;c[m>>2]=c[w>>2];c[m+4>>2]=k;c[e+24>>2]=c[b+(x<<5)+8>>2];z=1;i=f;return z|0}function pj(a,b,e,f){a=a|0;b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;g=i;h=b+28|0;j=c[h>>2]|0;k=d[b+7|0]|0;l=c[b+16>>2]|0;if((j|0)<(e|0)){if((e+1|0)>>>0>268435455){zh(a)}m=b+12|0;n=Ah(a,c[m>>2]|0,j<<4,e<<4)|0;c[m>>2]=n;m=c[h>>2]|0;if((m|0)<(e|0)){o=m;do{c[n+(o<<4)+8>>2]=0;o=o+1|0;}while((o|0)!=(e|0))}c[h>>2]=e}qj(a,b,f);do{if((j|0)>(e|0)){c[h>>2]=e;f=b+12|0;o=e;while(1){n=c[f>>2]|0;if((c[n+(o<<4)+8>>2]|0)==0){p=o+1|0}else{m=o+1|0;rj(a,b,m,n+(o<<4)|0);p=m}if((p|0)==(j|0)){break}else{o=p}}if((e+1|0)>>>0>268435455){zh(a)}else{o=b+12|0;c[o>>2]=Ah(a,c[o>>2]|0,j<<4,e<<4)|0;break}}}while(0);e=1<<k;if((e|0)>0){k=e;do{k=k+ -1|0;j=l+(k<<5)+8|0;if((c[j>>2]|0)!=0){p=l+(k<<5)+16|0;h=Aj(b,p)|0;if((h|0)==4312){q=wj(a,b,p)|0}else{q=h}h=l+(k<<5)|0;p=c[h+4>>2]|0;o=q;c[o>>2]=c[h>>2];c[o+4>>2]=p;c[q+8>>2]=c[j>>2]}}while((k|0)>0)}if((l|0)==7136){i=g;return}Ah(a,l,e<<5,0)|0;i=g;return}function qj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;f=i;i=i+8|0;if((e|0)==0){c[d+16>>2]=7136;g=0;h=7136;j=0;k=d+7|0;a[k]=j;l=h+(g<<5)|0;m=d+20|0;c[m>>2]=l;i=f;return}n=Sh(e)|0;if((n|0)>30){tf(b,7168,f)}e=1<<n;if((e+1|0)>>>0>134217727){zh(b)}o=Ah(b,0,0,e<<5)|0;b=d+16|0;c[b>>2]=o;if((e|0)>0){p=o;q=0;while(1){c[p+(q<<5)+28>>2]=0;c[p+(q<<5)+24>>2]=0;c[p+(q<<5)+8>>2]=0;r=q+1|0;s=c[b>>2]|0;if((r|0)==(e|0)){t=s;break}else{q=r;p=s}}}else{t=o}g=e;h=t;j=n&255;k=d+7|0;a[k]=j;l=h+(g<<5)|0;m=d+20|0;c[m>>2]=l;i=f;return}function rj(a,b,e,f){a=a|0;b=b|0;e=e|0;f=f|0;var g=0,j=0,k=0,l=0,m=0,n=0,o=0.0,p=0,q=0,r=0,s=0.0,t=0;g=i;i=i+24|0;j=g;k=g+8|0;l=e+ -1|0;a:do{if(l>>>0<(c[b+28>>2]|0)>>>0){m=(c[b+12>>2]|0)+(l<<4)|0;n=10}else{o=+(e|0);h[j>>3]=o+1.0;p=(c[j+4>>2]|0)+(c[j>>2]|0)|0;if((p|0)<0){q=0-p|0;r=(p|0)==(q|0)?0:q}else{r=p}p=(c[b+16>>2]|0)+(((r|0)%((1<<(d[b+7|0]|0))+ -1|1|0)|0)<<5)|0;while(1){if((c[p+24>>2]|0)==3){if(+h[p+16>>3]==o){break}}q=c[p+28>>2]|0;if((q|0)==0){s=o;n=12;break a}else{p=q}}m=p;n=10}}while(0);do{if((n|0)==10){if((m|0)!=4312){t=m;break}s=+(e|0);n=12}}while(0);if((n|0)==12){h[k>>3]=s;c[k+8>>2]=3;t=wj(a,b,k)|0}k=f;b=c[k+4>>2]|0;a=t;c[a>>2]=c[k>>2];c[a+4>>2]=b;c[t+8>>2]=c[f+8>>2];i=g;return}function sj(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=i;e=Aj(b,c)|0;if((e|0)==4312){f=wj(a,b,c)|0}else{f=e}i=d;return f|0}function tj(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0;f=i;if((c[b+16>>2]|0)==7136){g=0}else{g=1<<(d[b+7|0]|0)}pj(a,b,e,g);i=f;return}function uj(b){b=b|0;var d=0,e=0;d=i;e=dg(b,5,32,0,0)|0;b=e;c[e+8>>2]=0;a[e+6|0]=-1;c[e+12>>2]=0;c[b+28>>2]=0;c[e+16>>2]=7136;a[b+7|0]=0;c[b+20>>2]=7136;i=d;return b|0}function vj(a,b){a=a|0;b=b|0;var e=0,f=0;e=i;f=c[b+16>>2]|0;if((f|0)!=7136){Ah(a,f,32<<(d[b+7|0]|0),0)|0}Ah(a,c[b+12>>2]|0,c[b+28>>2]<<4,0)|0;Ah(a,b,32,0)|0;i=e;return}function wj(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0.0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;g=i;i=i+8|0;j=g;k=i;i=i+8|0;l=i;i=i+8|0;m=i;i=i+8|0;n=i;i=i+128|0;o=n;p=f+8|0;q=c[p>>2]|0;if((q|0)==0){tf(b,7088,k)}else if((q|0)==3){r=3}do{if((r|0)==3){s=+h[f>>3];if(s==s&0.0==0.0){break}tf(b,7112,j)}}while(0);j=xj(e,f)|0;q=j+8|0;do{if((c[q>>2]|0)!=0|(j|0)==7136){k=e+20|0;t=e+16|0;u=c[t>>2]|0;v=c[k>>2]|0;while(1){if(!(v>>>0>u>>>0)){break}w=v+ -32|0;c[k>>2]=w;if((c[v+ -8>>2]|0)==0){r=37;break}else{v=w}}if((r|0)==37){k=xj(e,j+16|0)|0;if((k|0)==(j|0)){u=j+28|0;c[v+ -4>>2]=c[u>>2];c[u>>2]=w;x=w;break}else{y=k}do{z=y+28|0;y=c[z>>2]|0;}while((y|0)!=(j|0));c[z>>2]=w;v=w;k=j;c[v+0>>2]=c[k+0>>2];c[v+4>>2]=c[k+4>>2];c[v+8>>2]=c[k+8>>2];c[v+12>>2]=c[k+12>>2];c[v+16>>2]=c[k+16>>2];c[v+20>>2]=c[k+20>>2];c[v+24>>2]=c[k+24>>2];c[v+28>>2]=c[k+28>>2];c[j+28>>2]=0;c[q>>2]=0;x=j;break}k=o+0|0;v=k+124|0;do{c[k>>2]=0;k=k+4|0}while((k|0)<(v|0));k=e+12|0;v=c[e+28>>2]|0;u=0;A=1;B=0;C=1;while(1){if((C|0)>(v|0)){if((A|0)>(v|0)){D=u;break}else{E=v}}else{E=C}if((A|0)>(E|0)){F=A;G=0}else{H=c[k>>2]|0;I=A;J=0;while(1){K=((c[H+(I+ -1<<4)+8>>2]|0)!=0)+J|0;if((I|0)<(E|0)){J=K;I=I+1|0}else{break}}F=E+1|0;G=K}I=n+(B<<2)|0;c[I>>2]=(c[I>>2]|0)+G;I=G+u|0;J=B+1|0;if((J|0)<31){u=I;A=F;B=J;C=C<<1}else{D=I;break}}C=m;B=0;A=1<<(d[e+7|0]|0);u=0;a:while(1){k=A;while(1){L=k+ -1|0;if((k|0)==0){break a}M=c[t>>2]|0;if((c[M+(L<<5)+8>>2]|0)==0){k=L}else{break}}do{if((c[M+(L<<5)+24>>2]|0)==3){s=+h[M+(L<<5)+16>>3];h[m>>3]=s+6755399441055744.0;k=c[C>>2]|0;if(!(+(k|0)==s)){N=0;break}if(!((k+ -1|0)>>>0<1073741824)){N=0;break}v=n+((Sh(k)|0)<<2)|0;c[v>>2]=(c[v>>2]|0)+1;N=1}else{N=0}}while(0);B=N+B|0;A=L;u=u+1|0}A=B+D|0;do{if((c[p>>2]|0)==3){s=+h[f>>3];h[l>>3]=s+6755399441055744.0;C=c[l>>2]|0;if(!(+(C|0)==s)){O=0;break}if(!((C+ -1|0)>>>0<1073741824)){O=0;break}t=n+((Sh(C)|0)<<2)|0;c[t>>2]=(c[t>>2]|0)+1;O=1}else{O=0}}while(0);B=A+O|0;b:do{if((B|0)>0){t=0;C=0;v=0;k=0;I=0;J=1;while(1){H=c[n+(v<<2)>>2]|0;if((H|0)>0){P=H+C|0;H=(P|0)>(t|0);Q=P;R=H?J:k;S=H?P:I}else{Q=C;R=k;S=I}if((Q|0)==(B|0)){T=R;U=S;break b}P=J<<1;H=(P|0)/2|0;if((H|0)<(B|0)){t=H;C=Q;v=v+1|0;k=R;I=S;J=P}else{T=R;U=S;break}}}else{T=0;U=0}}while(0);pj(b,e,T,D+1+u-U|0);B=Aj(e,f)|0;if((B|0)!=4312){V=B;i=g;return V|0}V=wj(b,e,f)|0;i=g;return V|0}else{x=j}}while(0);j=f;U=c[j+4>>2]|0;D=x+16|0;c[D>>2]=c[j>>2];c[D+4>>2]=U;c[x+24>>2]=c[p>>2];do{if((c[p>>2]&64|0)!=0){if((a[(c[f>>2]|0)+5|0]&3)==0){break}if((a[e+5|0]&4)==0){break}ag(b,e)}}while(0);V=x;i=g;return V|0}function xj(b,e){b=b|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+8|0;g=f;switch(c[e+8>>2]&63|0){case 2:{j=(c[b+16>>2]|0)+((((c[e>>2]|0)>>>0)%(((1<<d[b+7|0])+ -1|1)>>>0)|0)<<5)|0;i=f;return j|0};case 22:{j=(c[b+16>>2]|0)+((((c[e>>2]|0)>>>0)%(((1<<d[b+7|0])+ -1|1)>>>0)|0)<<5)|0;i=f;return j|0};case 20:{k=e;l=c[k>>2]|0;m=l+6|0;if((a[m]|0)==0){n=l+8|0;c[n>>2]=Qi(l+16|0,c[l+12>>2]|0,c[n>>2]|0)|0;a[m]=1;o=c[k>>2]|0}else{o=l}j=(c[b+16>>2]|0)+(((1<<d[b+7|0])+ -1&c[o+8>>2])<<5)|0;i=f;return j|0};case 1:{j=(c[b+16>>2]|0)+(((1<<d[b+7|0])+ -1&c[e>>2])<<5)|0;i=f;return j|0};case 3:{h[g>>3]=+h[e>>3]+1.0;o=(c[g+4>>2]|0)+(c[g>>2]|0)|0;if((o|0)<0){g=0-o|0;p=(o|0)==(g|0)?0:g}else{p=o}j=(c[b+16>>2]|0)+(((p|0)%((1<<d[b+7|0])+ -1|1|0)|0)<<5)|0;i=f;return j|0};case 4:{j=(c[b+16>>2]|0)+(((1<<d[b+7|0])+ -1&c[(c[e>>2]|0)+8>>2])<<5)|0;i=f;return j|0};default:{j=(c[b+16>>2]|0)+((((c[e>>2]|0)>>>0)%(((1<<d[b+7|0])+ -1|1)>>>0)|0)<<5)|0;i=f;return j|0}}return 0}function yj(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,j=0,k=0.0,l=0,m=0;e=i;i=i+8|0;f=e;g=b+ -1|0;if(g>>>0<(c[a+28>>2]|0)>>>0){j=(c[a+12>>2]|0)+(g<<4)|0;i=e;return j|0}k=+(b|0);h[f>>3]=k+1.0;b=(c[f+4>>2]|0)+(c[f>>2]|0)|0;if((b|0)<0){f=0-b|0;l=(b|0)==(f|0)?0:f}else{l=b}b=(c[a+16>>2]|0)+(((l|0)%((1<<(d[a+7|0]|0))+ -1|1|0)|0)<<5)|0;while(1){if((c[b+24>>2]|0)==3){if(+h[b+16>>3]==k){break}}a=c[b+28>>2]|0;if((a|0)==0){j=4312;m=10;break}else{b=a}}if((m|0)==10){i=e;return j|0}j=b;i=e;return j|0}function zj(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0;e=i;f=(c[a+16>>2]|0)+(((1<<(d[a+7|0]|0))+ -1&c[b+8>>2])<<5)|0;while(1){if((c[f+24>>2]|0)==68){if((c[f+16>>2]|0)==(b|0)){break}}a=c[f+28>>2]|0;if((a|0)==0){g=4312;h=6;break}else{f=a}}if((h|0)==6){i=e;return g|0}g=f;i=e;return g|0}function Aj(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0.0,r=0.0,s=0;e=i;i=i+16|0;f=e;g=e+8|0;j=b+8|0;k=c[j>>2]&63;do{if((k|0)==4){l=c[b>>2]|0;m=(c[a+16>>2]|0)+(((1<<(d[a+7|0]|0))+ -1&c[l+8>>2])<<5)|0;while(1){if((c[m+24>>2]|0)==68){if((c[m+16>>2]|0)==(l|0)){break}}n=c[m+28>>2]|0;if((n|0)==0){o=4312;p=22;break}else{m=n}}if((p|0)==22){i=e;return o|0}o=m;i=e;return o|0}else if((k|0)==3){q=+h[b>>3];h[g>>3]=q+6755399441055744.0;l=c[g>>2]|0;r=+(l|0);if(!(r==q)){break}n=l+ -1|0;if(n>>>0<(c[a+28>>2]|0)>>>0){o=(c[a+12>>2]|0)+(n<<4)|0;i=e;return o|0}h[f>>3]=r+1.0;n=(c[f+4>>2]|0)+(c[f>>2]|0)|0;if((n|0)<0){l=0-n|0;s=(n|0)==(l|0)?0:l}else{s=n}n=(c[a+16>>2]|0)+(((s|0)%((1<<(d[a+7|0]|0))+ -1|1|0)|0)<<5)|0;while(1){if((c[n+24>>2]|0)==3){if(+h[n+16>>3]==r){break}}l=c[n+28>>2]|0;if((l|0)==0){o=4312;p=22;break}else{n=l}}if((p|0)==22){i=e;return o|0}o=n;i=e;return o|0}else if((k|0)==0){o=4312;i=e;return o|0}}while(0);k=xj(a,b)|0;while(1){if((c[k+24>>2]|0)==(c[j>>2]|0)){if((Zj(0,k+16|0,b)|0)!=0){break}}a=c[k+28>>2]|0;if((a|0)==0){o=4312;p=22;break}else{k=a}}if((p|0)==22){i=e;return o|0}o=k;i=e;return o|0}function Bj(a){a=a|0;var b=0,e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0.0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;b=i;i=i+24|0;e=b;f=b+8|0;g=b+16|0;j=a+28|0;k=c[j>>2]|0;do{if((k|0)!=0){l=c[a+12>>2]|0;if((c[l+(k+ -1<<4)+8>>2]|0)!=0){break}if(k>>>0>1){m=0;n=k}else{o=0;i=b;return o|0}while(1){p=(m+n|0)>>>1;q=(c[l+(p+ -1<<4)+8>>2]|0)==0;r=q?p:n;s=q?m:p;if((r-s|0)>>>0>1){n=r;m=s}else{o=s;break}}i=b;return o|0}}while(0);m=a+16|0;if((c[m>>2]|0)==7136){o=k;i=b;return o|0}n=a+12|0;l=a+7|0;a=g;s=g+4|0;r=k+1|0;p=k;q=k;while(1){k=r+ -1|0;a:do{if(k>>>0<p>>>0){t=(c[n>>2]|0)+(k<<4)|0}else{u=+(r|0);h[g>>3]=u+1.0;v=(c[s>>2]|0)+(c[a>>2]|0)|0;if((v|0)<0){w=0-v|0;x=(v|0)==(w|0)?0:w}else{x=v}v=(c[m>>2]|0)+(((x|0)%((1<<(d[l]|0))+ -1|1|0)|0)<<5)|0;while(1){if((c[v+24>>2]|0)==3){if(+h[v+16>>3]==u){break}}w=c[v+28>>2]|0;if((w|0)==0){t=4312;break a}else{v=w}}t=v}}while(0);if((c[t+8>>2]|0)==0){break}k=r<<1;if(k>>>0>2147483645){y=21;break}w=r;r=k;p=c[j>>2]|0;q=w}if((y|0)==21){y=e;p=e+4|0;t=1;while(1){x=t+ -1|0;b:do{if(x>>>0<(c[j>>2]|0)>>>0){z=(c[n>>2]|0)+(x<<4)|0}else{u=+(t|0);h[e>>3]=u+1.0;a=(c[p>>2]|0)+(c[y>>2]|0)|0;if((a|0)<0){s=0-a|0;A=(a|0)==(s|0)?0:s}else{A=a}a=(c[m>>2]|0)+(((A|0)%((1<<(d[l]|0))+ -1|1|0)|0)<<5)|0;while(1){if((c[a+24>>2]|0)==3){if(+h[a+16>>3]==u){break}}s=c[a+28>>2]|0;if((s|0)==0){z=4312;break b}else{a=s}}z=a}}while(0);if((c[z+8>>2]|0)==0){o=x;break}t=t+1|0}i=b;return o|0}if(!((r-q|0)>>>0>1)){o=q;i=b;return o|0}t=f;z=f+4|0;A=r;r=q;while(1){q=(A+r|0)>>>1;y=q+ -1|0;c:do{if(y>>>0<(c[j>>2]|0)>>>0){B=(c[n>>2]|0)+(y<<4)|0}else{u=+(q|0);h[f>>3]=u+1.0;p=(c[z>>2]|0)+(c[t>>2]|0)|0;if((p|0)<0){e=0-p|0;C=(p|0)==(e|0)?0:e}else{C=p}p=(c[m>>2]|0)+(((C|0)%((1<<(d[l]|0))+ -1|1|0)|0)<<5)|0;while(1){if((c[p+24>>2]|0)==3){if(+h[p+16>>3]==u){break}}e=c[p+28>>2]|0;if((e|0)==0){B=4312;break c}else{p=e}}B=p}}while(0);y=(c[B+8>>2]|0)==0;x=y?q:A;a=y?r:q;if((x-a|0)>>>0>1){A=x;r=a}else{o=a;break}}i=b;return o|0}function Cj(a){a=a|0;var b=0;b=i;Md(a,0,7);$e(a,7208,0);Jd(a,-1,7272);Pd(a,7272);i=b;return 1}function Dj(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;b=i;i=i+8|0;d=b;e=i;i=i+8|0;f=i;i=i+1040|0;g=i;i=i+8|0;h=xe(a,2,7328,g)|0;Ae(a,1,5);j=Ge(a,3,1)|0;if((fd(a,4)|0)<1){k=We(a,1)|0}else{k=Ee(a,4)|0}Ne(a,f);do{if((j|0)<(k|0)){l=j;do{Ld(a,1,l);if((jd(a,-1)|0)==0){c[e>>2]=gd(a,fd(a,-1)|0)|0;c[e+4>>2]=l;ne(a,7480,e)|0}Me(f);Ie(f,h,c[g>>2]|0);l=l+1|0;}while((l|0)!=(k|0))}else{if((j|0)==(k|0)){break}Ke(f);i=b;return 1}}while(0);Ld(a,1,k);if((jd(a,-1)|0)==0){c[d>>2]=gd(a,fd(a,-1)|0)|0;c[d+4>>2]=k;ne(a,7480,d)|0}Me(f);Ke(f);i=b;return 1}function Ej(a){a=a|0;var b=0,c=0.0,d=0.0,e=0.0;b=i;Ae(a,1,5);vd(a);a:do{if((de(a,1)|0)==0){c=0.0}else{d=0.0;while(1){while(1){$c(a,-2);if((fd(a,-1)|0)==3){e=+md(a,-1,0);if(e>d){break}}if((de(a,1)|0)==0){c=d;break a}}if((de(a,1)|0)==0){c=e;break}else{d=e}}}}while(0);wd(a,c);i=b;return 1}function Fj(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0;b=i;i=i+8|0;c=b;Ae(a,1,5);d=We(a,1)|0;e=d+1|0;f=_c(a)|0;if((f|0)==2){g=e}else if((f|0)==3){h=2}else{j=ne(a,7440,c)|0;i=b;return j|0}do{if((h|0)==2){c=Ee(a,2)|0;if((c|0)<1|(c|0)>(e|0)){me(a,2,7376)|0}if((d|0)<(c|0)){g=c;break}else{k=e}while(1){f=k+ -1|0;Ld(a,1,f);Td(a,1,k);if((f|0)>(c|0)){k=f}else{g=c;break}}}}while(0);Td(a,1,g);j=0;i=b;return j|0}function Gj(a){a=a|0;var b=0,c=0,d=0;b=i;c=_c(a)|0;Md(a,c,1);xd(a,c);Rd(a,-2,7432);if((c|0)<=0){i=b;return 1}ed(a,1);Td(a,-2,1);cd(a,1);if((c|0)>1){d=c}else{i=b;return 1}do{Td(a,1,d);d=d+ -1|0;}while((d|0)>1);i=b;return 1}function Hj(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0;b=i;i=i+8|0;c=b;Ae(a,1,5);d=Ge(a,2,1)|0;if((fd(a,3)|0)<1){e=We(a,1)|0}else{e=Ee(a,3)|0}if((d|0)>(e|0)){f=0;i=b;return f|0}g=e-d|0;h=g+1|0;do{if((g|0)>=0){if((Uc(a,h)|0)==0){break}Ld(a,1,d);if((d|0)<(e|0)){j=d}else{f=h;i=b;return f|0}while(1){k=j+1|0;Ld(a,1,k);if((k|0)==(e|0)){f=h;break}else{j=k}}i=b;return f|0}}while(0);f=ne(a,7400,c)|0;i=b;return f|0}function Ij(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=i;Ae(a,1,5);c=We(a,1)|0;d=Ge(a,2,c)|0;do{if((d|0)!=(c|0)){if(!((d|0)<1|(d|0)>(c+1|0))){break}me(a,1,7376)|0}}while(0);Ld(a,1,d);if((d|0)<(c|0)){e=d}else{f=d;vd(a);Td(a,1,f);i=b;return 1}while(1){d=e+1|0;Ld(a,1,d);Td(a,1,e);if((d|0)==(c|0)){f=c;break}else{e=d}}vd(a);Td(a,1,f);i=b;return 1}function Jj(a){a=a|0;var b=0,c=0;b=i;Ae(a,1,5);c=We(a,1)|0;ze(a,40,7328);if((fd(a,2)|0)>=1){Ae(a,2,6)}$c(a,2);Kj(a,1,c);i=b;return 0}function Kj(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;d=i;i=i+8|0;e=d;f=i;i=i+8|0;if((b|0)<(c|0)){g=b;h=c}else{i=d;return}while(1){Ld(a,1,g);Ld(a,1,h);if((Lj(a,-1,-2)|0)==0){$c(a,-3)}else{Td(a,1,g);Td(a,1,h)}c=h-g|0;if((c|0)==1){j=24;break}b=(h+g|0)/2|0;Ld(a,1,b);Ld(a,1,g);do{if((Lj(a,-2,-1)|0)==0){$c(a,-2);Ld(a,1,h);if((Lj(a,-1,-2)|0)==0){$c(a,-3);break}else{Td(a,1,b);Td(a,1,h);break}}else{Td(a,1,b);Td(a,1,g)}}while(0);if((c|0)==2){j=24;break}Ld(a,1,b);ed(a,-1);k=h+ -1|0;Ld(a,1,k);Td(a,1,b);Td(a,1,k);l=g;m=k;while(1){n=l+1|0;Ld(a,1,n);if((Lj(a,-1,-2)|0)==0){o=n;p=l}else{q=n;while(1){if((q|0)>=(h|0)){ne(a,7336,f)|0}$c(a,-2);n=q+1|0;Ld(a,1,n);if((Lj(a,-1,-2)|0)==0){o=n;p=q;break}else{q=n}}}q=m+ -1|0;Ld(a,1,q);if((Lj(a,-3,-1)|0)==0){r=q;s=m}else{n=q;while(1){if((n|0)<=(g|0)){ne(a,7336,e)|0}$c(a,-2);q=n+ -1|0;Ld(a,1,q);if((Lj(a,-3,-1)|0)==0){r=q;s=n;break}else{n=q}}}if((s|0)<=(o|0)){break}Td(a,1,o);Td(a,1,r);l=o;m=r}$c(a,-4);Ld(a,1,k);Ld(a,1,o);Td(a,1,k);Td(a,1,o);m=(o-g|0)<(h-o|0);l=p+2|0;b=m?l:g;c=m?h:p;Kj(a,m?g:l,m?p:h);if((b|0)<(c|0)){g=b;h=c}else{j=24;break}}if((j|0)==24){i=d;return}}function Lj(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;if((fd(a,2)|0)==0){e=ld(a,b,c,1)|0;i=d;return e|0}else{ed(a,2);ed(a,b+ -1|0);ed(a,c+ -2|0);Xd(a,2,1,0,0);c=pd(a,-1)|0;$c(a,-2);e=c;i=d;return e|0}return 0}function Mj(b){b=b|0;var e=0,f=0,g=0,h=0;e=i;f=b+12|0;g=0;do{h=Ti(b,c[7696+(g<<2)>>2]|0)|0;c[(c[f>>2]|0)+(g<<2)+184>>2]=h;h=(c[(c[f>>2]|0)+(g<<2)+184>>2]|0)+5|0;a[h]=d[h]|0|32;g=g+1|0;}while((g|0)!=17);i=e;return}function Nj(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0;g=i;h=zj(b,f)|0;if((c[h+8>>2]|0)!=0){j=h;i=g;return j|0}h=b+6|0;a[h]=d[h]|0|1<<e;j=0;i=g;return j|0}function Oj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;f=c[b+8>>2]&15;if((f|0)==5){g=c[(c[b>>2]|0)+8>>2]|0}else if((f|0)==7){g=c[(c[b>>2]|0)+8>>2]|0}else{g=c[(c[a+12>>2]|0)+(f<<2)+252>>2]|0}if((g|0)==0){h=4312;i=e;return h|0}h=zj(g,c[(c[a+12>>2]|0)+(d<<2)+184>>2]|0)|0;i=e;return h|0}function Pj(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+64|0;h=g;j=g+24|0;k=g+48|0;l=a[f]|0;if(l<<24>>24==27){c[k+12>>2]=7920}else if(l<<24>>24==61|l<<24>>24==64){c[k+12>>2]=f+1}else{c[k+12>>2]=f}c[k>>2]=b;c[k+4>>2]=d;c[k+8>>2]=e;e=h;f=j;c[h>>2]=1635077147;a[h+4|0]=82;a[h+5|0]=0;a[h+6|0]=1;a[h+7|0]=4;a[h+8|0]=4;a[h+9|0]=4;a[h+10|0]=8;l=h+12|0;a[h+11|0]=0;a[l+0|0]=a[7936|0]|0;a[l+1|0]=a[7937|0]|0;a[l+2|0]=a[7938|0]|0;a[l+3|0]=a[7939|0]|0;a[l+4|0]=a[7940|0]|0;a[l+5|0]=a[7941|0]|0;a[f]=27;if((gk(d,j+1|0,17)|0)!=0){Sj(k,7944)}if((Mm(e,f,18)|0)==0){j=Sf(b,1)|0;d=b+8|0;l=c[d>>2]|0;c[l>>2]=j;c[l+8>>2]=70;l=(c[d>>2]|0)+16|0;c[d>>2]=l;if(((c[b+24>>2]|0)-l|0)<16){Bf(b,0)}l=Xf(b)|0;h=j+12|0;c[h>>2]=l;Qj(k,l);l=c[h>>2]|0;h=c[l+40>>2]|0;if((h|0)==1){m=j;i=g;return m|0}j=Sf(b,h)|0;c[j+12>>2]=l;l=c[d>>2]|0;c[l+ -16>>2]=j;c[l+ -8>>2]=70;m=j;i=g;return m|0}if((Mm(e,f,4)|0)!=0){Sj(k,8008)}if((Mm(e,f,6)|0)!=0){Sj(k,8016)}if((Mm(e,f,12)|0)==0){Sj(k,7992)}else{Sj(k,8040)}return 0}function Qj(b,e){b=b|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0;f=i;i=i+184|0;g=f;j=f+8|0;k=f+16|0;l=f+24|0;m=f+32|0;n=f+40|0;o=f+48|0;p=f+56|0;q=f+64|0;r=f+72|0;s=f+80|0;t=f+88|0;u=f+96|0;v=f+104|0;w=f+112|0;x=f+120|0;y=f+128|0;z=f+136|0;A=f+144|0;B=f+152|0;C=f+160|0;D=f+168|0;E=f+176|0;F=b+4|0;if((gk(c[F>>2]|0,w,4)|0)!=0){Sj(b,7944)}G=c[w>>2]|0;if((G|0)<0){Sj(b,7992)}c[e+64>>2]=G;if((gk(c[F>>2]|0,v,4)|0)!=0){Sj(b,7944)}G=c[v>>2]|0;if((G|0)<0){Sj(b,7992)}c[e+68>>2]=G;if((gk(c[F>>2]|0,u,1)|0)!=0){Sj(b,7944)}a[e+76|0]=a[u]|0;if((gk(c[F>>2]|0,t,1)|0)!=0){Sj(b,7944)}a[e+77|0]=a[t]|0;if((gk(c[F>>2]|0,s,1)|0)!=0){Sj(b,7944)}a[e+78|0]=a[s]|0;if((gk(c[F>>2]|0,r,4)|0)!=0){Sj(b,7944)}s=c[r>>2]|0;if((s|0)<0){Sj(b,7992)}r=b;t=c[r>>2]|0;if((s+1|0)>>>0>1073741823){zh(t)}u=s<<2;G=Ah(t,0,0,u)|0;c[e+12>>2]=G;c[e+48>>2]=s;if((gk(c[F>>2]|0,G,u)|0)!=0){Sj(b,7944)}if((gk(c[F>>2]|0,n,4)|0)!=0){Sj(b,7944)}u=c[n>>2]|0;if((u|0)<0){Sj(b,7992)}n=c[r>>2]|0;if((u+1|0)>>>0>268435455){zh(n)}G=Ah(n,0,0,u<<4)|0;n=e+8|0;c[n>>2]=G;c[e+44>>2]=u;s=(u|0)>0;a:do{if(s){t=0;do{c[G+(t<<4)+8>>2]=0;t=t+1|0;}while((t|0)!=(u|0));if(!s){break}t=k;v=j;w=b+8|0;H=G;I=0;while(1){J=H+(I<<4)|0;if((gk(c[F>>2]|0,m,1)|0)!=0){K=34;break}L=a[m]|0;if((L|0)==1){if((gk(c[F>>2]|0,l,1)|0)!=0){K=38;break}c[J>>2]=a[l]|0;c[H+(I<<4)+8>>2]=1}else if((L|0)==3){if((gk(c[F>>2]|0,t,8)|0)!=0){K=41;break}h[J>>3]=+h[k>>3];c[H+(I<<4)+8>>2]=3}else if((L|0)==0){c[H+(I<<4)+8>>2]=0}else if((L|0)==4){if((gk(c[F>>2]|0,v,4)|0)!=0){K=44;break}L=c[j>>2]|0;if((L|0)==0){M=0}else{N=hk(c[r>>2]|0,c[w>>2]|0,L)|0;if((gk(c[F>>2]|0,N,c[j>>2]|0)|0)!=0){K=47;break}M=Si(c[r>>2]|0,N,(c[j>>2]|0)+ -1|0)|0}c[J>>2]=M;c[H+(I<<4)+8>>2]=d[M+4|0]|64}J=I+1|0;if((J|0)>=(u|0)){break a}H=c[n>>2]|0;I=J}if((K|0)==34){Sj(b,7944)}else if((K|0)==38){Sj(b,7944)}else if((K|0)==41){Sj(b,7944)}else if((K|0)==44){Sj(b,7944)}else if((K|0)==47){Sj(b,7944)}}}while(0);if((gk(c[F>>2]|0,g,4)|0)!=0){Sj(b,7944)}n=c[g>>2]|0;if((n|0)<0){Sj(b,7992)}g=c[r>>2]|0;if((n+1|0)>>>0>1073741823){zh(g)}u=Ah(g,0,0,n<<2)|0;g=e+16|0;c[g>>2]=u;c[e+56>>2]=n;M=(n|0)>0;do{if(M){j=u;k=0;while(1){c[j+(k<<2)>>2]=0;l=k+1|0;if((l|0)==(n|0)){break}j=c[g>>2]|0;k=l}if(M){O=0}else{break}do{k=Xf(c[r>>2]|0)|0;c[(c[g>>2]|0)+(O<<2)>>2]=k;Qj(b,c[(c[g>>2]|0)+(O<<2)>>2]|0);O=O+1|0;}while((O|0)!=(n|0))}}while(0);if((gk(c[F>>2]|0,q,4)|0)!=0){Sj(b,7944)}n=c[q>>2]|0;if((n|0)<0){Sj(b,7992)}q=c[r>>2]|0;if((n+1|0)>>>0>536870911){zh(q)}O=Ah(q,0,0,n<<3)|0;q=e+28|0;c[q>>2]=O;c[e+40>>2]=n;b:do{if((n|0)>0){c[O>>2]=0;if((n|0)==1){P=0}else{g=1;while(1){c[(c[q>>2]|0)+(g<<3)>>2]=0;M=g+1|0;if((M|0)==(n|0)){P=0;break}else{g=M}}}while(1){if((gk(c[F>>2]|0,p,1)|0)!=0){K=73;break}a[(c[q>>2]|0)+(P<<3)+4|0]=a[p]|0;if((gk(c[F>>2]|0,o,1)|0)!=0){K=75;break}a[(c[q>>2]|0)+(P<<3)+5|0]=a[o]|0;P=P+1|0;if((P|0)>=(n|0)){break b}}if((K|0)==73){Sj(b,7944)}else if((K|0)==75){Sj(b,7944)}}}while(0);if((gk(c[F>>2]|0,E,4)|0)!=0){Sj(b,7944)}n=c[E>>2]|0;do{if((n|0)==0){Q=0}else{P=hk(c[r>>2]|0,c[b+8>>2]|0,n)|0;if((gk(c[F>>2]|0,P,c[E>>2]|0)|0)==0){Q=Si(c[r>>2]|0,P,(c[E>>2]|0)+ -1|0)|0;break}else{Sj(b,7944)}}}while(0);c[e+36>>2]=Q;if((gk(c[F>>2]|0,D,4)|0)!=0){Sj(b,7944)}Q=c[D>>2]|0;if((Q|0)<0){Sj(b,7992)}D=c[r>>2]|0;if((Q+1|0)>>>0>1073741823){zh(D)}E=Q<<2;n=Ah(D,0,0,E)|0;c[e+20>>2]=n;c[e+52>>2]=Q;if((gk(c[F>>2]|0,n,E)|0)!=0){Sj(b,7944)}if((gk(c[F>>2]|0,C,4)|0)!=0){Sj(b,7944)}E=c[C>>2]|0;if((E|0)<0){Sj(b,7992)}C=c[r>>2]|0;if((E+1|0)>>>0>357913941){zh(C)}n=Ah(C,0,0,E*12|0)|0;C=e+24|0;c[C>>2]=n;c[e+60>>2]=E;c:do{if((E|0)>0){c[n>>2]=0;if((E|0)!=1){e=1;do{c[(c[C>>2]|0)+(e*12|0)>>2]=0;e=e+1|0;}while((e|0)!=(E|0))}e=B;Q=A;D=z;P=b+8|0;o=0;while(1){if((gk(c[F>>2]|0,e,4)|0)!=0){K=102;break}p=c[B>>2]|0;if((p|0)==0){R=0}else{O=hk(c[r>>2]|0,c[P>>2]|0,p)|0;if((gk(c[F>>2]|0,O,c[B>>2]|0)|0)!=0){K=105;break}R=Si(c[r>>2]|0,O,(c[B>>2]|0)+ -1|0)|0}c[(c[C>>2]|0)+(o*12|0)>>2]=R;if((gk(c[F>>2]|0,Q,4)|0)!=0){K=108;break}O=c[A>>2]|0;if((O|0)<0){K=110;break}c[(c[C>>2]|0)+(o*12|0)+4>>2]=O;if((gk(c[F>>2]|0,D,4)|0)!=0){K=112;break}O=c[z>>2]|0;if((O|0)<0){K=114;break}c[(c[C>>2]|0)+(o*12|0)+8>>2]=O;o=o+1|0;if((o|0)>=(E|0)){break c}}if((K|0)==102){Sj(b,7944)}else if((K|0)==105){Sj(b,7944)}else if((K|0)==108){Sj(b,7944)}else if((K|0)==110){Sj(b,7992)}else if((K|0)==112){Sj(b,7944)}else if((K|0)==114){Sj(b,7992)}}}while(0);if((gk(c[F>>2]|0,y,4)|0)!=0){Sj(b,7944)}E=c[y>>2]|0;if((E|0)<0){Sj(b,7992)}if((E|0)<=0){i=f;return}y=x;C=b+8|0;z=0;while(1){if((gk(c[F>>2]|0,y,4)|0)!=0){K=123;break}A=c[x>>2]|0;if((A|0)==0){S=0}else{R=hk(c[r>>2]|0,c[C>>2]|0,A)|0;if((gk(c[F>>2]|0,R,c[x>>2]|0)|0)!=0){K=126;break}S=Si(c[r>>2]|0,R,(c[x>>2]|0)+ -1|0)|0}c[(c[q>>2]|0)+(z<<3)>>2]=S;R=z+1|0;if((R|0)<(E|0)){z=R}else{K=129;break}}if((K|0)==123){Sj(b,7944)}else if((K|0)==126){Sj(b,7944)}else if((K|0)==129){i=f;return}}function Rj(b){b=b|0;var c=0,d=0;c=i;d=b;a[d]=1635077147;a[d+1|0]=6387020;a[d+2|0]=24949;a[d+3|0]=97;a[b+4|0]=82;a[b+5|0]=0;a[b+6|0]=1;a[b+7|0]=4;a[b+8|0]=4;a[b+9|0]=4;a[b+10|0]=8;d=b+12|0;a[b+11|0]=0;a[d+0|0]=a[7936|0]|0;a[d+1|0]=a[7937|0]|0;a[d+2|0]=a[7938|0]|0;a[d+3|0]=a[7939|0]|0;a[d+4|0]=a[7940|0]|0;a[d+5|0]=a[7941|0]|0;i=c;return}function Sj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;i=i+8|0;e=d;d=a;f=c[d>>2]|0;c[e>>2]=c[a+12>>2];c[e+4>>2]=b;Xh(f,7960,e)|0;yf(c[d>>2]|0,3)}function Tj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,j=0;d=i;i=i+8|0;e=d;f=c[a+8>>2]|0;do{if((f|0)==3){g=a}else{if((f&15|0)!=4){g=0;break}j=c[a>>2]|0;if((Vh(j+16|0,c[j+12>>2]|0,e)|0)==0){g=0;break}h[b>>3]=+h[e>>3];c[b+8>>2]=3;g=b}}while(0);i=d;return g|0}function Uj(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,j=0,l=0,m=0;e=i;i=i+8|0;f=e;g=i;i=i+32|0;j=b+8|0;if((c[j>>2]|0)!=3){l=0;i=e;return l|0}m=g;g=f;h[k>>3]=+h[b>>3];c[g>>2]=c[k>>2];c[g+4>>2]=c[k+4>>2];g=Si(a,m,nb(m|0,8056,f|0)|0)|0;c[b>>2]=g;c[j>>2]=d[g+4|0]|0|64;l=1;i=e;return l|0}function Vj(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;g=i;i=i+8|0;h=g;j=b+12|0;k=d;l=c[d+8>>2]|0;d=0;while(1){m=k+8|0;if((l|0)==69){n=c[k>>2]|0;o=Aj(n,e)|0;p=o+8|0;if((c[p>>2]|0)!=0){q=9;break}r=c[n+8>>2]|0;if((r|0)==0){q=9;break}if(!((a[r+6|0]&1)==0)){q=9;break}n=Nj(r,0,c[(c[j>>2]|0)+184>>2]|0)|0;if((n|0)==0){q=9;break}s=c[n+8>>2]|0;t=n}else{n=Oj(b,k,0)|0;r=c[n+8>>2]|0;if((r|0)==0){q=11;break}else{s=r;t=n}}n=d+1|0;if((s&15|0)==6){q=13;break}if((n|0)<100){k=t;l=s;d=n}else{q=14;break}}if((q|0)==9){d=o;o=c[d+4>>2]|0;s=f;c[s>>2]=c[d>>2];c[s+4>>2]=o;c[f+8>>2]=c[p>>2];i=g;return}else if((q|0)==11){rf(b,k,8064)}else if((q|0)==13){p=b+28|0;o=f-(c[p>>2]|0)|0;f=b+8|0;s=c[f>>2]|0;c[f>>2]=s+16;d=t;l=c[d+4>>2]|0;j=s;c[j>>2]=c[d>>2];c[j+4>>2]=l;c[s+8>>2]=c[t+8>>2];t=c[f>>2]|0;c[f>>2]=t+16;s=k;k=c[s+4>>2]|0;l=t;c[l>>2]=c[s>>2];c[l+4>>2]=k;c[t+8>>2]=c[m>>2];m=c[f>>2]|0;c[f>>2]=m+16;t=e;k=c[t+4>>2]|0;l=m;c[l>>2]=c[t>>2];c[l+4>>2]=k;c[m+8>>2]=c[e+8>>2];Gf(b,(c[f>>2]|0)+ -48|0,1,a[(c[b+16>>2]|0)+18|0]&1);e=c[p>>2]|0;p=c[f>>2]|0;m=p+ -16|0;c[f>>2]=m;f=m;m=c[f+4>>2]|0;k=e+o|0;c[k>>2]=c[f>>2];c[k+4>>2]=m;c[e+(o+8)>>2]=c[p+ -8>>2];i=g;return}else if((q|0)==14){tf(b,8072,h)}}function Wj(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;i=i+8|0;h=g;j=b+12|0;k=d;l=c[d+8>>2]|0;d=0;while(1){m=k+8|0;if((l|0)==69){n=c[k>>2]|0;o=n;p=Aj(o,e)|0;if((c[p+8>>2]|0)!=0){q=p;break}r=c[n+8>>2]|0;if((r|0)==0){s=9;break}if(!((a[r+6|0]&2)==0)){s=9;break}t=Nj(r,1,c[(c[j>>2]|0)+188>>2]|0)|0;if((t|0)==0){s=9;break}u=c[t+8>>2]|0;v=t}else{t=Oj(b,k,1)|0;r=c[t+8>>2]|0;if((r|0)==0){s=16;break}else{u=r;v=t}}t=d+1|0;if((u&15|0)==6){s=18;break}if((t|0)<100){k=v;l=u;d=t}else{s=19;break}}do{if((s|0)==9){if((p|0)!=4312){q=p;break}q=wj(b,o,e)|0}else if((s|0)==16){rf(b,k,8064)}else if((s|0)==18){d=b+8|0;u=c[d>>2]|0;c[d>>2]=u+16;l=v;j=c[l+4>>2]|0;t=u;c[t>>2]=c[l>>2];c[t+4>>2]=j;c[u+8>>2]=c[v+8>>2];u=c[d>>2]|0;c[d>>2]=u+16;j=k;t=c[j+4>>2]|0;l=u;c[l>>2]=c[j>>2];c[l+4>>2]=t;c[u+8>>2]=c[m>>2];u=c[d>>2]|0;c[d>>2]=u+16;t=e;l=c[t+4>>2]|0;j=u;c[j>>2]=c[t>>2];c[j+4>>2]=l;c[u+8>>2]=c[e+8>>2];u=c[d>>2]|0;c[d>>2]=u+16;l=f;j=c[l+4>>2]|0;t=u;c[t>>2]=c[l>>2];c[t+4>>2]=j;c[u+8>>2]=c[f+8>>2];Gf(b,(c[d>>2]|0)+ -64|0,0,a[(c[b+16>>2]|0)+18|0]&1);i=g;return}else if((s|0)==19){tf(b,8096,h)}}while(0);h=f;s=c[h+4>>2]|0;e=q;c[e>>2]=c[h>>2];c[e+4>>2]=s;s=f+8|0;c[q+8>>2]=c[s>>2];a[n+6|0]=0;if((c[s>>2]&64|0)==0){i=g;return}if((a[(c[f>>2]|0)+5|0]&3)==0){i=g;return}if((a[n+5|0]&4)==0){i=g;return}ag(b,n);i=g;return}function Xj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;f=i;g=d+8|0;j=c[g>>2]|0;do{if((j|0)==3){if((c[e+8>>2]|0)!=3){break}k=+h[d>>3]<+h[e>>3]|0;i=f;return k|0}else{if((j&15|0)!=4){break}if((c[e+8>>2]&15|0)!=4){break}l=c[d>>2]|0;m=c[e>>2]|0;n=l+16|0;o=m+16|0;p=Nm(n,o)|0;a:do{if((p|0)==0){q=n;r=c[l+12>>2]|0;s=c[m+12>>2]|0;t=o;while(1){u=Um(q|0)|0;v=(u|0)==(r|0);if((u|0)==(s|0)){break}if(v){w=-1;break a}x=u+1|0;u=q+x|0;y=t+x|0;z=Nm(u,y)|0;if((z|0)==0){q=u;r=r-x|0;s=s-x|0;t=y}else{w=z;break a}}w=v&1^1}else{w=p}}while(0);k=w>>>31;i=f;return k|0}}while(0);w=b+8|0;v=c[w>>2]|0;j=Oj(b,d,13)|0;do{if((c[j+8>>2]|0)==0){p=Oj(b,e,13)|0;if((c[p+8>>2]|0)!=0){A=p;break}wf(b,d,e)}else{A=j}}while(0);j=b+28|0;p=v-(c[j>>2]|0)|0;v=c[w>>2]|0;c[w>>2]=v+16;o=A;m=c[o+4>>2]|0;l=v;c[l>>2]=c[o>>2];c[l+4>>2]=m;c[v+8>>2]=c[A+8>>2];A=c[w>>2]|0;c[w>>2]=A+16;v=d;d=c[v+4>>2]|0;m=A;c[m>>2]=c[v>>2];c[m+4>>2]=d;c[A+8>>2]=c[g>>2];g=c[w>>2]|0;c[w>>2]=g+16;A=e;d=c[A+4>>2]|0;m=g;c[m>>2]=c[A>>2];c[m+4>>2]=d;c[g+8>>2]=c[e+8>>2];Gf(b,(c[w>>2]|0)+ -48|0,1,a[(c[b+16>>2]|0)+18|0]&1);b=c[j>>2]|0;j=c[w>>2]|0;e=j+ -16|0;c[w>>2]=e;g=e;e=c[g+4>>2]|0;d=b+p|0;c[d>>2]=c[g>>2];c[d+4>>2]=e;c[b+(p+8)>>2]=c[j+ -8>>2];j=c[w>>2]|0;w=c[j+8>>2]|0;do{if((w|0)==0){B=0}else{if((w|0)!=1){B=1;break}B=(c[j>>2]|0)!=0}}while(0);k=B&1;i=f;return k|0}function Yj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;f=i;g=d+8|0;j=c[g>>2]|0;do{if((j|0)==3){if((c[e+8>>2]|0)!=3){break}k=+h[d>>3]<=+h[e>>3]|0;i=f;return k|0}else{if((j&15|0)!=4){break}if((c[e+8>>2]&15|0)!=4){break}l=c[d>>2]|0;m=c[e>>2]|0;n=l+16|0;o=m+16|0;p=Nm(n,o)|0;a:do{if((p|0)==0){q=n;r=c[l+12>>2]|0;s=c[m+12>>2]|0;t=o;while(1){u=Um(q|0)|0;v=(u|0)==(r|0);if((u|0)==(s|0)){break}if(v){w=-1;break a}x=u+1|0;u=q+x|0;y=t+x|0;z=Nm(u,y)|0;if((z|0)==0){q=u;r=r-x|0;s=s-x|0;t=y}else{w=z;break a}}w=v&1^1}else{w=p}}while(0);k=(w|0)<1|0;i=f;return k|0}}while(0);w=b+8|0;v=c[w>>2]|0;j=Oj(b,d,14)|0;do{if((c[j+8>>2]|0)==0){p=Oj(b,e,14)|0;if((c[p+8>>2]|0)!=0){A=p;break}p=c[w>>2]|0;o=Oj(b,e,13)|0;do{if((c[o+8>>2]|0)==0){m=Oj(b,d,13)|0;if((c[m+8>>2]|0)!=0){B=m;break}wf(b,d,e)}else{B=o}}while(0);o=b+28|0;m=p-(c[o>>2]|0)|0;l=c[w>>2]|0;c[w>>2]=l+16;n=B;t=c[n+4>>2]|0;s=l;c[s>>2]=c[n>>2];c[s+4>>2]=t;c[l+8>>2]=c[B+8>>2];l=c[w>>2]|0;c[w>>2]=l+16;t=e;s=c[t+4>>2]|0;n=l;c[n>>2]=c[t>>2];c[n+4>>2]=s;c[l+8>>2]=c[e+8>>2];l=c[w>>2]|0;c[w>>2]=l+16;s=d;n=c[s+4>>2]|0;t=l;c[t>>2]=c[s>>2];c[t+4>>2]=n;c[l+8>>2]=c[g>>2];Gf(b,(c[w>>2]|0)+ -48|0,1,a[(c[b+16>>2]|0)+18|0]&1);l=c[o>>2]|0;o=c[w>>2]|0;n=o+ -16|0;c[w>>2]=n;t=n;n=c[t+4>>2]|0;s=l+m|0;c[s>>2]=c[t>>2];c[s+4>>2]=n;c[l+(m+8)>>2]=c[o+ -8>>2];o=c[w>>2]|0;m=c[o+8>>2]|0;do{if((m|0)==0){C=0}else{if((m|0)!=1){C=1;break}C=(c[o>>2]|0)!=0}}while(0);k=C&1^1;i=f;return k|0}else{A=j}}while(0);j=b+28|0;C=v-(c[j>>2]|0)|0;v=c[w>>2]|0;c[w>>2]=v+16;B=A;o=c[B+4>>2]|0;m=v;c[m>>2]=c[B>>2];c[m+4>>2]=o;c[v+8>>2]=c[A+8>>2];A=c[w>>2]|0;c[w>>2]=A+16;v=d;d=c[v+4>>2]|0;o=A;c[o>>2]=c[v>>2];c[o+4>>2]=d;c[A+8>>2]=c[g>>2];g=c[w>>2]|0;c[w>>2]=g+16;A=e;d=c[A+4>>2]|0;o=g;c[o>>2]=c[A>>2];c[o+4>>2]=d;c[g+8>>2]=c[e+8>>2];Gf(b,(c[w>>2]|0)+ -48|0,1,a[(c[b+16>>2]|0)+18|0]&1);b=c[j>>2]|0;j=c[w>>2]|0;e=j+ -16|0;c[w>>2]=e;g=e;e=c[g+4>>2]|0;d=b+C|0;c[d>>2]=c[g>>2];c[d+4>>2]=e;c[b+(C+8)>>2]=c[j+ -8>>2];j=c[w>>2]|0;w=c[j+8>>2]|0;do{if((w|0)==0){D=0}else{if((w|0)!=1){D=1;break}D=(c[j>>2]|0)!=0}}while(0);k=D&1;i=f;return k|0}function Zj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;f=i;g=d+8|0;a:do{switch(c[g>>2]&63|0){case 3:{j=+h[d>>3]==+h[e>>3]|0;i=f;return j|0};case 22:{j=(c[d>>2]|0)==(c[e>>2]|0)|0;i=f;return j|0};case 4:{j=(c[d>>2]|0)==(c[e>>2]|0)|0;i=f;return j|0};case 7:{k=c[d>>2]|0;l=c[e>>2]|0;if((k|0)==(l|0)){j=1;i=f;return j|0}if((b|0)==0){j=0;i=f;return j|0}else{m=_j(b,c[k+8>>2]|0,c[l+8>>2]|0)|0;break a}break};case 0:{j=1;i=f;return j|0};case 1:{j=(c[d>>2]|0)==(c[e>>2]|0)|0;i=f;return j|0};case 20:{j=Oi(c[d>>2]|0,c[e>>2]|0)|0;i=f;return j|0};case 5:{l=c[d>>2]|0;k=c[e>>2]|0;if((l|0)==(k|0)){j=1;i=f;return j|0}if((b|0)==0){j=0;i=f;return j|0}else{m=_j(b,c[l+8>>2]|0,c[k+8>>2]|0)|0;break a}break};case 2:{j=(c[d>>2]|0)==(c[e>>2]|0)|0;i=f;return j|0};default:{j=(c[d>>2]|0)==(c[e>>2]|0)|0;i=f;return j|0}}}while(0);if((m|0)==0){j=0;i=f;return j|0}k=b+8|0;l=c[k>>2]|0;n=b+28|0;o=l-(c[n>>2]|0)|0;c[k>>2]=l+16;p=m;q=c[p+4>>2]|0;r=l;c[r>>2]=c[p>>2];c[r+4>>2]=q;c[l+8>>2]=c[m+8>>2];m=c[k>>2]|0;c[k>>2]=m+16;l=d;d=c[l+4>>2]|0;q=m;c[q>>2]=c[l>>2];c[q+4>>2]=d;c[m+8>>2]=c[g>>2];g=c[k>>2]|0;c[k>>2]=g+16;m=e;d=c[m+4>>2]|0;q=g;c[q>>2]=c[m>>2];c[q+4>>2]=d;c[g+8>>2]=c[e+8>>2];Gf(b,(c[k>>2]|0)+ -48|0,1,a[(c[b+16>>2]|0)+18|0]&1);b=c[n>>2]|0;n=c[k>>2]|0;e=n+ -16|0;c[k>>2]=e;g=e;e=c[g+4>>2]|0;d=b+o|0;c[d>>2]=c[g>>2];c[d+4>>2]=e;c[b+(o+8)>>2]=c[n+ -8>>2];n=c[k>>2]|0;k=c[n+8>>2]|0;do{if((k|0)==0){s=0}else{if((k|0)!=1){s=1;break}s=(c[n>>2]|0)!=0}}while(0);j=s&1;i=f;return j|0}function _j(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0;f=i;a:do{if((d|0)==0){g=0}else{if(!((a[d+6|0]&32)==0)){g=0;break}j=b+12|0;k=Nj(d,5,c[(c[j>>2]|0)+204>>2]|0)|0;if((k|0)==0){g=0;break}if((d|0)==(e|0)){g=k;break}if((e|0)==0){g=0;break}if(!((a[e+6|0]&32)==0)){g=0;break}l=Nj(e,5,c[(c[j>>2]|0)+204>>2]|0)|0;if((l|0)==0){g=0;break}j=c[k+8>>2]|0;b:do{if((j|0)==(c[l+8>>2]|0)){switch(j&63|0){case 22:{m=(c[k>>2]|0)==(c[l>>2]|0)|0;break};case 3:{m=+h[k>>3]==+h[l>>3]|0;break};case 20:{m=Oi(c[k>>2]|0,c[l>>2]|0)|0;break};case 5:{if((c[k>>2]|0)==(c[l>>2]|0)){g=k;break a}else{break b}break};case 2:{m=(c[k>>2]|0)==(c[l>>2]|0)|0;break};case 1:{m=(c[k>>2]|0)==(c[l>>2]|0)|0;break};case 4:{m=(c[k>>2]|0)==(c[l>>2]|0)|0;break};case 0:{g=k;break a;break};case 7:{if((c[k>>2]|0)==(c[l>>2]|0)){g=k;break a}else{break b}break};default:{m=(c[k>>2]|0)==(c[l>>2]|0)|0}}if((m|0)!=0){g=k;break a}}}while(0);g=0}}while(0);i=f;return g|0}function $j(b,e){b=b|0;e=e|0;var f=0,g=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;f=i;i=i+8|0;g=f;j=i;i=i+8|0;l=i;i=i+8|0;m=i;i=i+8|0;n=i;i=i+32|0;o=b+8|0;p=n;n=b+12|0;q=b+28|0;r=b+16|0;s=e;e=c[o>>2]|0;a:while(1){t=e+ -32|0;u=e+ -24|0;v=c[u>>2]|0;w=e+ -16|0;b:do{if((v&15|0)==4|(v|0)==3){x=e+ -8|0;y=c[x>>2]|0;if((y&15|0)==4){z=w;A=v}else{if((y|0)!=3){B=7;break}y=m;h[k>>3]=+h[w>>3];c[y>>2]=c[k>>2];c[y+4>>2]=c[k+4>>2];y=Si(b,p,nb(p|0,8056,m|0)|0)|0;C=w;c[C>>2]=y;c[x>>2]=d[y+4|0]|0|64;z=C;A=c[u>>2]|0}C=c[(c[z>>2]|0)+12>>2]|0;y=(A&15|0)==4;if((C|0)==0){if(y){D=2;break}if((A|0)!=3){D=2;break}E=l;h[k>>3]=+h[t>>3];c[E>>2]=c[k>>2];c[E+4>>2]=c[k+4>>2];E=Si(b,p,nb(p|0,8056,l|0)|0)|0;c[t>>2]=E;c[u>>2]=d[E+4|0]|0|64;D=2;break}do{if(y){if((c[(c[t>>2]|0)+12>>2]|0)!=0){break}E=w;F=c[E+4>>2]|0;G=t;c[G>>2]=c[E>>2];c[G+4>>2]=F;c[u>>2]=c[x>>2];D=2;break b}}while(0);c:do{if((s|0)>1){x=1;y=C;while(1){F=~x;G=e+(F<<4)|0;E=e+(F<<4)+8|0;F=c[E>>2]|0;if((F&15|0)==4){H=G}else{if((F|0)!=3){I=x;J=y;break c}F=j;h[k>>3]=+h[G>>3];c[F>>2]=c[k>>2];c[F+4>>2]=c[k+4>>2];F=Si(b,p,nb(p|0,8056,j|0)|0)|0;K=G;c[K>>2]=F;c[E>>2]=d[F+4|0]|0|64;H=K}K=c[(c[H>>2]|0)+12>>2]|0;if(!(K>>>0<(-3-y|0)>>>0)){B=24;break a}F=K+y|0;K=x+1|0;if((K|0)<(s|0)){x=K;y=F}else{I=K;J=F;break}}}else{I=1;J=C}}while(0);C=hk(b,(c[n>>2]|0)+144|0,J)|0;y=I;x=0;do{F=c[e+(0-y<<4)>>2]|0;K=c[F+12>>2]|0;Xm(C+x|0,F+16|0,K|0)|0;x=K+x|0;y=y+ -1|0;}while((y|0)>0);y=0-I|0;K=Si(b,C,x)|0;c[e+(y<<4)>>2]=K;c[e+(y<<4)+8>>2]=d[K+4|0]|0|64;D=I}else{B=7}}while(0);if((B|0)==7){B=0;v=Oj(b,t,15)|0;if((c[v+8>>2]|0)==0){K=Oj(b,w,15)|0;if((c[K+8>>2]|0)==0){B=10;break}else{L=K}}else{L=v}v=t-(c[q>>2]|0)|0;K=c[o>>2]|0;c[o>>2]=K+16;y=L;F=c[y+4>>2]|0;E=K;c[E>>2]=c[y>>2];c[E+4>>2]=F;c[K+8>>2]=c[L+8>>2];K=c[o>>2]|0;c[o>>2]=K+16;F=t;E=c[F+4>>2]|0;y=K;c[y>>2]=c[F>>2];c[y+4>>2]=E;c[K+8>>2]=c[u>>2];K=c[o>>2]|0;c[o>>2]=K+16;E=w;y=c[E+4>>2]|0;F=K;c[F>>2]=c[E>>2];c[F+4>>2]=y;c[K+8>>2]=c[e+ -8>>2];Gf(b,(c[o>>2]|0)+ -48|0,1,a[(c[r>>2]|0)+18|0]&1);K=c[q>>2]|0;y=c[o>>2]|0;F=y+ -16|0;c[o>>2]=F;E=F;F=c[E+4>>2]|0;G=K+v|0;c[G>>2]=c[E>>2];c[G+4>>2]=F;c[K+(v+8)>>2]=c[y+ -8>>2];D=2}y=s+1-D|0;v=(c[o>>2]|0)+(1-D<<4)|0;c[o>>2]=v;if((y|0)>1){s=y;e=v}else{B=30;break}}if((B|0)==10){uf(b,t,w)}else if((B|0)==24){tf(b,8120,g)}else if((B|0)==30){i=f;return}}function ak(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=i;g=e+8|0;j=c[g>>2]&15;a:do{if((j|0)==5){k=c[e>>2]|0;l=k;m=c[k+8>>2]|0;k=m;do{if((m|0)!=0){if(!((a[m+6|0]&16)==0)){break}n=Nj(k,4,c[(c[b+12>>2]|0)+200>>2]|0)|0;if((n|0)!=0){o=n;break a}}}while(0);h[d>>3]=+(Bj(l)|0);c[d+8>>2]=3;i=f;return}else if((j|0)==4){h[d>>3]=+((c[(c[e>>2]|0)+12>>2]|0)>>>0);c[d+8>>2]=3;i=f;return}else{k=Oj(b,e,4)|0;if((c[k+8>>2]|0)!=0){o=k;break}rf(b,e,8144)}}while(0);j=b+28|0;k=d-(c[j>>2]|0)|0;d=b+8|0;m=c[d>>2]|0;c[d>>2]=m+16;n=o;p=c[n+4>>2]|0;q=m;c[q>>2]=c[n>>2];c[q+4>>2]=p;c[m+8>>2]=c[o+8>>2];o=c[d>>2]|0;c[d>>2]=o+16;m=e;e=m;p=c[e+4>>2]|0;q=o;c[q>>2]=c[e>>2];c[q+4>>2]=p;c[o+8>>2]=c[g>>2];o=c[d>>2]|0;c[d>>2]=o+16;p=m;m=c[p+4>>2]|0;q=o;c[q>>2]=c[p>>2];c[q+4>>2]=m;c[o+8>>2]=c[g>>2];Gf(b,(c[d>>2]|0)+ -48|0,1,a[(c[b+16>>2]|0)+18|0]&1);b=c[j>>2]|0;j=c[d>>2]|0;g=j+ -16|0;c[d>>2]=g;d=g;g=c[d+4>>2]|0;o=b+k|0;c[o>>2]=c[d>>2];c[o+4>>2]=g;c[b+(k+8)>>2]=c[j+ -8>>2];i=f;return}function bk(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0.0,t=0;j=i;i=i+32|0;k=j;l=j+8|0;m=j+16|0;n=e+8|0;o=c[n>>2]|0;do{if((o|0)==3){p=e;q=5}else{if((o&15|0)!=4){break}r=c[e>>2]|0;if((Vh(r+16|0,c[r+12>>2]|0,l)|0)==0){break}h[m>>3]=+h[l>>3];c[m+8>>2]=3;p=m;q=5}}while(0);do{if((q|0)==5){m=c[f+8>>2]|0;if((m|0)==3){if((f|0)==0){break}s=+h[f>>3]}else{if((m&15|0)!=4){break}m=c[f>>2]|0;if((Vh(m+16|0,c[m+12>>2]|0,k)|0)==0){break}s=+h[k>>3]}h[d>>3]=+Th(g+ -6|0,+h[p>>3],s);c[d+8>>2]=3;i=j;return}}while(0);p=Oj(b,e,g)|0;do{if((c[p+8>>2]|0)==0){k=Oj(b,f,g)|0;if((c[k+8>>2]|0)!=0){t=k;break}vf(b,e,f)}else{t=p}}while(0);p=b+28|0;g=d-(c[p>>2]|0)|0;d=b+8|0;k=c[d>>2]|0;c[d>>2]=k+16;q=t;m=c[q+4>>2]|0;l=k;c[l>>2]=c[q>>2];c[l+4>>2]=m;c[k+8>>2]=c[t+8>>2];t=c[d>>2]|0;c[d>>2]=t+16;k=e;e=c[k+4>>2]|0;m=t;c[m>>2]=c[k>>2];c[m+4>>2]=e;c[t+8>>2]=c[n>>2];n=c[d>>2]|0;c[d>>2]=n+16;t=f;e=c[t+4>>2]|0;m=n;c[m>>2]=c[t>>2];c[m+4>>2]=e;c[n+8>>2]=c[f+8>>2];Gf(b,(c[d>>2]|0)+ -48|0,1,a[(c[b+16>>2]|0)+18|0]&1);b=c[p>>2]|0;p=c[d>>2]|0;f=p+ -16|0;c[d>>2]=f;d=f;f=c[d+4>>2]|0;n=b+g|0;c[n>>2]=c[d>>2];c[n+4>>2]=f;c[b+(g+8)>>2]=c[p+ -8>>2];i=j;return}function ck(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;d=c[a+16>>2]|0;e=d+24|0;f=c[e>>2]|0;g=d+28|0;h=c[(c[g>>2]|0)+ -4>>2]|0;j=h&63;switch(j|0){case 29:{if((h&8372224|0)==0){i=b;return}c[a+8>>2]=c[d+4>>2];i=b;return};case 34:{c[a+8>>2]=c[d+4>>2];i=b;return};case 22:{k=a+8|0;l=c[k>>2]|0;m=l+ -32|0;n=m-(f+(h>>>23<<4))|0;o=l+ -16|0;p=c[o+4>>2]|0;q=l+ -48|0;c[q>>2]=c[o>>2];c[q+4>>2]=p;c[l+ -40>>2]=c[l+ -8>>2];if((n|0)>16){c[k>>2]=m;$j(a,n>>4)}n=c[k>>2]|0;m=c[e>>2]|0;e=h>>>6&255;l=n+ -16|0;p=c[l+4>>2]|0;q=m+(e<<4)|0;c[q>>2]=c[l>>2];c[q+4>>2]=p;c[m+(e<<4)+8>>2]=c[n+ -8>>2];c[k>>2]=c[d+4>>2];i=b;return};case 24:case 25:case 26:{d=a+8|0;k=c[d>>2]|0;n=c[k+ -8>>2]|0;do{if((n|0)==0){r=1}else{if((n|0)!=1){r=0;break}r=(c[k+ -16>>2]|0)==0}}while(0);n=r&1;r=n^1;c[d>>2]=k+ -16;if((j|0)==26){j=(c[(Oj(a,f+(h>>>23<<4)|0,14)|0)+8>>2]|0)==0;s=j?n:r}else{s=r}if((s|0)==(h>>>6&255|0)){i=b;return}c[g>>2]=(c[g>>2]|0)+4;i=b;return};case 12:case 7:case 6:case 21:case 19:case 18:case 17:case 16:case 15:case 14:case 13:{g=a+8|0;a=c[g>>2]|0;s=a+ -16|0;c[g>>2]=s;g=h>>>6&255;h=s;s=c[h+4>>2]|0;r=f+(g<<4)|0;c[r>>2]=c[h>>2];c[r+4>>2]=s;c[f+(g<<4)+8>>2]=c[a+ -8>>2];i=b;return};default:{i=b;return}}}function dk(b){b=b|0;var e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,S=0,T=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0.0,xa=0.0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0.0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0;e=i;i=i+8|0;f=e;g=i;i=i+8|0;j=i;i=i+8|0;k=i;i=i+8|0;l=i;i=i+8|0;m=i;i=i+8|0;n=b+16|0;o=b+40|0;p=b+12|0;q=b+8|0;r=b+24|0;s=b+48|0;t=b+20|0;u=b+6|0;v=b+44|0;w=c[n>>2]|0;a:while(1){x=w;y=c[c[x>>2]>>2]|0;z=y+12|0;A=c[(c[z>>2]|0)+8>>2]|0;B=w+24|0;C=w+28|0;D=y+16|0;y=D;E=w+4|0;F=D;D=c[B>>2]|0;b:while(1){G=c[C>>2]|0;c[C>>2]=G+4;H=c[G>>2]|0;G=a[o]|0;do{if((G&12)==0){I=D}else{J=(c[s>>2]|0)+ -1|0;c[s>>2]=J;K=(J|0)==0;if(!K){if((G&4)==0){I=D;break}}L=c[n>>2]|0;J=G&255;if((J&8|0)==0|K^1){M=0}else{c[s>>2]=c[v>>2];M=1}N=L+18|0;K=d[N]|0;if((K&128|0)==0){if(M){Df(b,3,-1)}c:do{if((J&4|0)==0){O=L+28|0}else{P=c[(c[c[L>>2]>>2]|0)+12>>2]|0;Q=L+28|0;S=c[Q>>2]|0;T=c[P+12>>2]|0;V=(S-T>>2)+ -1|0;W=c[P+20>>2]|0;P=(W|0)==0;if(P){X=0}else{X=c[W+(V<<2)>>2]|0}do{if((V|0)!=0){Y=c[t>>2]|0;if(!(S>>>0>Y>>>0)){break}if(P){Z=0}else{Z=c[W+((Y-T>>2)+ -1<<2)>>2]|0}if((X|0)==(Z|0)){O=Q;break c}}}while(0);Df(b,2,X);O=Q}}while(0);c[t>>2]=c[O>>2];if((a[u]|0)==1){_=23;break a}}else{a[N]=K&127}I=c[B>>2]|0}}while(0);$=H>>>6&255;aa=I+($<<4)|0;switch(H&63|0){case 11:{G=H>>>23;J=H>>>14&511;T=uj(b)|0;c[aa>>2]=T;c[I+($<<4)+8>>2]=69;if((J|G|0)!=0){W=Rh(G)|0;pj(b,T,W,Rh(J)|0)}if((c[(c[p>>2]|0)+12>>2]|0)>0){c[q>>2]=I+($+1<<4);mg(b);c[q>>2]=c[E>>2]}D=c[B>>2]|0;continue b;break};case 12:{J=H>>>23;W=I+(J<<4)|0;T=$+1|0;G=W;P=c[G+4>>2]|0;S=I+(T<<4)|0;c[S>>2]=c[G>>2];c[S+4>>2]=P;c[I+(T<<4)+8>>2]=c[I+(J<<4)+8>>2];J=H>>>14;if((J&256|0)==0){ba=I+((J&511)<<4)|0}else{ba=A+((J&255)<<4)|0}Vj(b,W,ba,aa);D=c[B>>2]|0;continue b;break};case 13:{W=H>>>23;if((W&256|0)==0){ca=I+(W<<4)|0}else{ca=A+((W&255)<<4)|0}W=H>>>14;if((W&256|0)==0){da=I+((W&511)<<4)|0}else{da=A+((W&255)<<4)|0}do{if((c[ca+8>>2]|0)==3){if((c[da+8>>2]|0)!=3){break}h[aa>>3]=+h[ca>>3]+ +h[da>>3];c[I+($<<4)+8>>2]=3;D=I;continue b}}while(0);bk(b,aa,ca,da,6);D=c[B>>2]|0;continue b;break};case 6:{W=H>>>14;if((W&256|0)==0){ea=I+((W&511)<<4)|0}else{ea=A+((W&255)<<4)|0}Vj(b,c[(c[y+(H>>>23<<2)>>2]|0)+8>>2]|0,ea,aa);D=c[B>>2]|0;continue b;break};case 3:{c[aa>>2]=H>>>23;c[I+($<<4)+8>>2]=1;if((H&8372224|0)==0){D=I;continue b}c[C>>2]=(c[C>>2]|0)+4;D=I;continue b;break};case 2:{W=c[C>>2]|0;c[C>>2]=W+4;J=(c[W>>2]|0)>>>6;W=A+(J<<4)|0;T=c[W+4>>2]|0;P=aa;c[P>>2]=c[W>>2];c[P+4>>2]=T;c[I+($<<4)+8>>2]=c[A+(J<<4)+8>>2];D=I;continue b;break};case 4:{J=H>>>23;T=aa;while(1){c[T+8>>2]=0;if((J|0)==0){D=I;continue b}else{T=T+16|0;J=J+ -1|0}}break};case 5:{J=c[(c[y+(H>>>23<<2)>>2]|0)+8>>2]|0;T=J;P=c[T+4>>2]|0;W=aa;c[W>>2]=c[T>>2];c[W+4>>2]=P;c[I+($<<4)+8>>2]=c[J+8>>2];D=I;continue b;break};case 14:{J=H>>>23;if((J&256|0)==0){fa=I+(J<<4)|0}else{fa=A+((J&255)<<4)|0}J=H>>>14;if((J&256|0)==0){ga=I+((J&511)<<4)|0}else{ga=A+((J&255)<<4)|0}do{if((c[fa+8>>2]|0)==3){if((c[ga+8>>2]|0)!=3){break}h[aa>>3]=+h[fa>>3]- +h[ga>>3];c[I+($<<4)+8>>2]=3;D=I;continue b}}while(0);bk(b,aa,fa,ga,7);D=c[B>>2]|0;continue b;break};case 7:{J=H>>>14;if((J&256|0)==0){ha=I+((J&511)<<4)|0}else{ha=A+((J&255)<<4)|0}Vj(b,I+(H>>>23<<4)|0,ha,aa);D=c[B>>2]|0;continue b;break};case 1:{J=H>>>14;P=A+(J<<4)|0;W=c[P+4>>2]|0;T=aa;c[T>>2]=c[P>>2];c[T+4>>2]=W;c[I+($<<4)+8>>2]=c[A+(J<<4)+8>>2];D=I;continue b;break};case 0:{J=H>>>23;W=I+(J<<4)|0;T=c[W+4>>2]|0;P=aa;c[P>>2]=c[W>>2];c[P+4>>2]=T;c[I+($<<4)+8>>2]=c[I+(J<<4)+8>>2];D=I;continue b;break};case 9:{J=c[y+(H>>>23<<2)>>2]|0;T=c[J+8>>2]|0;P=aa;W=c[P+4>>2]|0;S=T;c[S>>2]=c[P>>2];c[S+4>>2]=W;W=I+($<<4)+8|0;c[T+8>>2]=c[W>>2];if((c[W>>2]&64|0)==0){D=I;continue b}W=c[aa>>2]|0;if((a[W+5|0]&3)==0){D=I;continue b}if((a[J+5|0]&4)==0){D=I;continue b}_f(b,J,W);D=I;continue b;break};case 10:{W=H>>>23;if((W&256|0)==0){ia=I+(W<<4)|0}else{ia=A+((W&255)<<4)|0}W=H>>>14;if((W&256|0)==0){ja=I+((W&511)<<4)|0}else{ja=A+((W&255)<<4)|0}Wj(b,aa,ia,ja);D=c[B>>2]|0;continue b;break};case 8:{W=H>>>23;if((W&256|0)==0){ka=I+(W<<4)|0}else{ka=A+((W&255)<<4)|0}W=H>>>14;if((W&256|0)==0){la=I+((W&511)<<4)|0}else{la=A+((W&255)<<4)|0}Wj(b,c[(c[y+($<<2)>>2]|0)+8>>2]|0,ka,la);D=c[B>>2]|0;continue b;break};case 26:{W=H>>>23;if((W&256|0)==0){ma=I+(W<<4)|0}else{ma=A+((W&255)<<4)|0}W=H>>>14;if((W&256|0)==0){na=I+((W&511)<<4)|0}else{na=A+((W&255)<<4)|0}W=(Yj(b,ma,na)|0)==($|0);J=c[C>>2]|0;T=J;if(W){W=c[T>>2]|0;S=W>>>6&255;if((S|0)==0){oa=J}else{Wf(b,(c[B>>2]|0)+(S+ -1<<4)|0);oa=c[C>>2]|0}pa=oa+((W>>>14)+ -131070<<2)|0}else{pa=T+4|0}c[C>>2]=pa;D=c[B>>2]|0;continue b;break};case 15:{T=H>>>23;if((T&256|0)==0){qa=I+(T<<4)|0}else{qa=A+((T&255)<<4)|0}T=H>>>14;if((T&256|0)==0){ra=I+((T&511)<<4)|0}else{ra=A+((T&255)<<4)|0}do{if((c[qa+8>>2]|0)==3){if((c[ra+8>>2]|0)!=3){break}h[aa>>3]=+h[qa>>3]*+h[ra>>3];c[I+($<<4)+8>>2]=3;D=I;continue b}}while(0);bk(b,aa,qa,ra,8);D=c[B>>2]|0;continue b;break};case 16:{T=H>>>23;if((T&256|0)==0){sa=I+(T<<4)|0}else{sa=A+((T&255)<<4)|0}T=H>>>14;if((T&256|0)==0){ta=I+((T&511)<<4)|0}else{ta=A+((T&255)<<4)|0}do{if((c[sa+8>>2]|0)==3){if((c[ta+8>>2]|0)!=3){break}h[aa>>3]=+h[sa>>3]/+h[ta>>3];c[I+($<<4)+8>>2]=3;D=I;continue b}}while(0);bk(b,aa,sa,ta,9);D=c[B>>2]|0;continue b;break};case 17:{T=H>>>23;if((T&256|0)==0){ua=I+(T<<4)|0}else{ua=A+((T&255)<<4)|0}T=H>>>14;if((T&256|0)==0){va=I+((T&511)<<4)|0}else{va=A+((T&255)<<4)|0}do{if((c[ua+8>>2]|0)==3){if((c[va+8>>2]|0)!=3){break}wa=+h[ua>>3];xa=+h[va>>3];h[aa>>3]=wa-xa*+R(+(wa/xa));c[I+($<<4)+8>>2]=3;D=I;continue b}}while(0);bk(b,aa,ua,va,10);D=c[B>>2]|0;continue b;break};case 18:{T=H>>>23;if((T&256|0)==0){ya=I+(T<<4)|0}else{ya=A+((T&255)<<4)|0}T=H>>>14;if((T&256|0)==0){za=I+((T&511)<<4)|0}else{za=A+((T&255)<<4)|0}do{if((c[ya+8>>2]|0)==3){if((c[za+8>>2]|0)!=3){break}h[aa>>3]=+U(+(+h[ya>>3]),+(+h[za>>3]));c[I+($<<4)+8>>2]=3;D=I;continue b}}while(0);bk(b,aa,ya,za,11);D=c[B>>2]|0;continue b;break};case 19:{T=H>>>23;W=I+(T<<4)|0;if((c[I+(T<<4)+8>>2]|0)==3){h[aa>>3]=-+h[W>>3];c[I+($<<4)+8>>2]=3;D=I;continue b}else{bk(b,aa,W,W,12);D=c[B>>2]|0;continue b}break};case 20:{W=H>>>23;T=c[I+(W<<4)+8>>2]|0;do{if((T|0)==0){Aa=1}else{if((T|0)!=1){Aa=0;break}Aa=(c[I+(W<<4)>>2]|0)==0}}while(0);c[aa>>2]=Aa&1;c[I+($<<4)+8>>2]=1;D=I;continue b;break};case 21:{ak(b,aa,I+(H>>>23<<4)|0);D=c[B>>2]|0;continue b;break};case 22:{W=H>>>23;T=H>>>14&511;c[q>>2]=I+(T+1<<4);$j(b,1-W+T|0);T=c[B>>2]|0;S=T+(W<<4)|0;J=S;P=c[J+4>>2]|0;G=T+($<<4)|0;c[G>>2]=c[J>>2];c[G+4>>2]=P;c[T+($<<4)+8>>2]=c[T+(W<<4)+8>>2];if((c[(c[p>>2]|0)+12>>2]|0)>0){if($>>>0<W>>>0){Ba=S}else{Ba=T+($+1<<4)|0}c[q>>2]=Ba;mg(b);c[q>>2]=c[E>>2]}T=c[B>>2]|0;c[q>>2]=c[E>>2];D=T;continue b;break};case 23:{if(($|0)!=0){Wf(b,(c[B>>2]|0)+($+ -1<<4)|0)}c[C>>2]=(c[C>>2]|0)+((H>>>14)+ -131071<<2);D=I;continue b;break};case 24:{T=H>>>23;if((T&256|0)==0){Ca=I+(T<<4)|0}else{Ca=A+((T&255)<<4)|0}T=H>>>14;if((T&256|0)==0){Da=I+((T&511)<<4)|0}else{Da=A+((T&255)<<4)|0}if((c[Ca+8>>2]|0)==(c[Da+8>>2]|0)){Ea=(Zj(b,Ca,Da)|0)!=0}else{Ea=0}T=c[C>>2]|0;S=T;if((Ea&1|0)==($|0)){W=c[S>>2]|0;P=W>>>6&255;if((P|0)==0){Fa=T}else{Wf(b,(c[B>>2]|0)+(P+ -1<<4)|0);Fa=c[C>>2]|0}Ga=Fa+((W>>>14)+ -131070<<2)|0}else{Ga=S+4|0}c[C>>2]=Ga;D=c[B>>2]|0;continue b;break};case 25:{S=H>>>23;if((S&256|0)==0){Ha=I+(S<<4)|0}else{Ha=A+((S&255)<<4)|0}S=H>>>14;if((S&256|0)==0){Ia=I+((S&511)<<4)|0}else{Ia=A+((S&255)<<4)|0}S=(Xj(b,Ha,Ia)|0)==($|0);W=c[C>>2]|0;P=W;if(S){S=c[P>>2]|0;T=S>>>6&255;if((T|0)==0){Ja=W}else{Wf(b,(c[B>>2]|0)+(T+ -1<<4)|0);Ja=c[C>>2]|0}Ka=Ja+((S>>>14)+ -131070<<2)|0}else{Ka=P+4|0}c[C>>2]=Ka;D=c[B>>2]|0;continue b;break};case 27:{P=c[I+($<<4)+8>>2]|0;S=(P|0)==0;do{if((H&8372224|0)==0){if(S){break}if((P|0)!=1){_=192;break}if((c[aa>>2]|0)!=0){_=192}}else{if(S){_=192;break}if((P|0)!=1){break}if((c[aa>>2]|0)==0){_=192}}}while(0);if((_|0)==192){_=0;c[C>>2]=(c[C>>2]|0)+4;D=I;continue b}P=c[C>>2]|0;S=c[P>>2]|0;T=S>>>6&255;if((T|0)==0){La=P}else{Wf(b,(c[B>>2]|0)+(T+ -1<<4)|0);La=c[C>>2]|0}c[C>>2]=La+((S>>>14)+ -131070<<2);D=I;continue b;break};case 28:{S=H>>>23;T=I+(S<<4)|0;P=c[I+(S<<4)+8>>2]|0;S=(P|0)==0;do{if((H&8372224|0)==0){if(S){break}if((P|0)!=1){_=203;break}if((c[T>>2]|0)!=0){_=203}}else{if(S){_=203;break}if((P|0)!=1){break}if((c[T>>2]|0)==0){_=203}}}while(0);if((_|0)==203){_=0;c[C>>2]=(c[C>>2]|0)+4;D=I;continue b}S=T;W=c[S+4>>2]|0;G=aa;c[G>>2]=c[S>>2];c[G+4>>2]=W;c[I+($<<4)+8>>2]=P;W=c[C>>2]|0;G=c[W>>2]|0;S=G>>>6&255;if((S|0)==0){Ma=W}else{Wf(b,(c[B>>2]|0)+(S+ -1<<4)|0);Ma=c[C>>2]|0}c[C>>2]=Ma+((G>>>14)+ -131070<<2);D=I;continue b;break};case 29:{G=H>>>23;S=H>>>14&511;if((G|0)!=0){c[q>>2]=I+($+G<<4)}if((Ef(b,aa,S+ -1|0)|0)==0){_=213;break b}if((S|0)!=0){c[q>>2]=c[E>>2]}D=c[B>>2]|0;continue b;break};case 30:{S=H>>>23;if((S|0)!=0){c[q>>2]=I+($+S<<4)}if((Ef(b,aa,-1)|0)==0){_=218;break b}D=c[B>>2]|0;continue b;break};case 31:{_=223;break b;break};case 32:{xa=+h[I+($+2<<4)>>3];S=aa;wa=xa+ +h[S>>3];Na=+h[I+($+1<<4)>>3];if(xa>0.0){if(!(wa<=Na)){D=I;continue b}}else{if(!(Na<=wa)){D=I;continue b}}c[C>>2]=(c[C>>2]|0)+((H>>>14)+ -131071<<2);h[S>>3]=wa;c[I+($<<4)+8>>2]=3;S=$+3|0;h[I+(S<<4)>>3]=wa;c[I+(S<<4)+8>>2]=3;D=I;continue b;break};case 33:{S=$+1|0;G=I+(S<<4)|0;W=$+2|0;J=I+(W<<4)|0;V=I+($<<4)+8|0;Y=c[V>>2]|0;if((Y|0)!=3){if((Y&15|0)!=4){_=239;break a}Y=c[aa>>2]|0;if((Vh(Y+16|0,c[Y+12>>2]|0,m)|0)==0){_=239;break a}h[aa>>3]=+h[m>>3];c[V>>2]=3;if((aa|0)==0){_=239;break a}}Y=I+(S<<4)+8|0;S=c[Y>>2]|0;if((S|0)!=3){if((S&15|0)!=4){_=244;break a}S=c[G>>2]|0;if((Vh(S+16|0,c[S+12>>2]|0,l)|0)==0){_=244;break a}h[G>>3]=+h[l>>3];c[Y>>2]=3}Y=I+(W<<4)+8|0;W=c[Y>>2]|0;if((W|0)!=3){if((W&15|0)!=4){_=249;break a}W=c[J>>2]|0;if((Vh(W+16|0,c[W+12>>2]|0,k)|0)==0){_=249;break a}h[J>>3]=+h[k>>3];c[Y>>2]=3}Y=aa;h[Y>>3]=+h[Y>>3]- +h[J>>3];c[V>>2]=3;c[C>>2]=(c[C>>2]|0)+((H>>>14)+ -131071<<2);D=I;continue b;break};case 34:{V=$+3|0;J=I+(V<<4)|0;Y=$+2|0;W=$+5|0;G=I+(Y<<4)|0;S=c[G+4>>2]|0;Oa=I+(W<<4)|0;c[Oa>>2]=c[G>>2];c[Oa+4>>2]=S;c[I+(W<<4)+8>>2]=c[I+(Y<<4)+8>>2];Y=$+1|0;W=$+4|0;S=I+(Y<<4)|0;Oa=c[S+4>>2]|0;G=I+(W<<4)|0;c[G>>2]=c[S>>2];c[G+4>>2]=Oa;c[I+(W<<4)+8>>2]=c[I+(Y<<4)+8>>2];Y=aa;W=c[Y+4>>2]|0;Oa=J;c[Oa>>2]=c[Y>>2];c[Oa+4>>2]=W;c[I+(V<<4)+8>>2]=c[I+($<<4)+8>>2];c[q>>2]=I+($+6<<4);Gf(b,J,H>>>14&511,1);J=c[B>>2]|0;c[q>>2]=c[E>>2];V=c[C>>2]|0;c[C>>2]=V+4;W=c[V>>2]|0;Pa=J;Qa=W;Ra=J+((W>>>6&255)<<4)|0;break};case 35:{Pa=I;Qa=H;Ra=aa;break};case 36:{W=H>>>23;J=H>>>14&511;if((W|0)==0){Sa=((c[q>>2]|0)-aa>>4)+ -1|0}else{Sa=W}if((J|0)==0){W=c[C>>2]|0;c[C>>2]=W+4;Ta=(c[W>>2]|0)>>>6}else{Ta=J}J=c[aa>>2]|0;W=J;V=Sa+ -50+(Ta*50|0)|0;if((V|0)>(c[W+28>>2]|0)){tj(b,W,V)}if((Sa|0)>0){Oa=J+5|0;Y=V;V=Sa;while(1){G=V+$|0;S=I+(G<<4)|0;Ua=Y+ -1|0;rj(b,W,Y,S);do{if((c[I+(G<<4)+8>>2]&64|0)!=0){if((a[(c[S>>2]|0)+5|0]&3)==0){break}if((a[Oa]&4)==0){break}ag(b,J)}}while(0);S=V+ -1|0;if((S|0)>0){V=S;Y=Ua}else{break}}}c[q>>2]=c[E>>2];D=I;continue b;break};case 37:{Y=c[(c[(c[z>>2]|0)+16>>2]|0)+(H>>>14<<2)>>2]|0;V=Y+32|0;J=c[V>>2]|0;Oa=c[Y+40>>2]|0;W=c[Y+28>>2]|0;d:do{if((J|0)==0){_=276}else{if((Oa|0)>0){P=J+16|0;T=0;while(1){S=d[W+(T<<3)+5|0]|0;if((a[W+(T<<3)+4|0]|0)==0){Va=c[(c[F+(S<<2)>>2]|0)+8>>2]|0}else{Va=I+(S<<4)|0}S=T+1|0;if((c[(c[P+(T<<2)>>2]|0)+8>>2]|0)!=(Va|0)){_=276;break d}if((S|0)<(Oa|0)){T=S}else{break}}}c[aa>>2]=J;c[I+($<<4)+8>>2]=70}}while(0);if((_|0)==276){_=0;J=Sf(b,Oa)|0;c[J+12>>2]=Y;c[aa>>2]=J;c[I+($<<4)+8>>2]=70;if((Oa|0)>0){T=J+16|0;P=0;do{Ua=d[W+(P<<3)+5|0]|0;if((a[W+(P<<3)+4|0]|0)==0){c[T+(P<<2)>>2]=c[F+(Ua<<2)>>2]}else{c[T+(P<<2)>>2]=Uf(b,I+(Ua<<4)|0)|0}P=P+1|0;}while((P|0)!=(Oa|0))}if(!((a[Y+5|0]&4)==0)){bg(b,Y,J)}c[V>>2]=J}if((c[(c[p>>2]|0)+12>>2]|0)>0){c[q>>2]=I+($+1<<4);mg(b);c[q>>2]=c[E>>2]}D=c[B>>2]|0;continue b;break};case 38:{Oa=H>>>23;P=Oa+ -1|0;T=(I-(c[x>>2]|0)>>4)-(d[(c[z>>2]|0)+76|0]|0)|0;W=T+ -1|0;if((Oa|0)==0){if(((c[r>>2]|0)-(c[q>>2]|0)>>4|0)<=(W|0)){Bf(b,W)}Oa=c[B>>2]|0;c[q>>2]=Oa+(W+$<<4);Wa=W;Xa=Oa;Ya=Oa+($<<4)|0}else{Wa=P;Xa=I;Ya=aa}if((Wa|0)<=0){D=Xa;continue b}P=1-T|0;T=0;while(1){if((T|0)<(W|0)){Oa=T+P|0;Ua=Xa+(Oa<<4)|0;S=c[Ua+4>>2]|0;G=Ya+(T<<4)|0;c[G>>2]=c[Ua>>2];c[G+4>>2]=S;c[Ya+(T<<4)+8>>2]=c[Xa+(Oa<<4)+8>>2]}else{c[Ya+(T<<4)+8>>2]=0}Oa=T+1|0;if((Oa|0)==(Wa|0)){D=Xa;continue b}else{T=Oa}}break};default:{D=I;continue b}}T=c[Ra+24>>2]|0;if((T|0)==0){D=Pa;continue}P=Ra+16|0;W=c[P+4>>2]|0;J=Ra;c[J>>2]=c[P>>2];c[J+4>>2]=W;c[Ra+8>>2]=T;c[C>>2]=(c[C>>2]|0)+((Qa>>>14)+ -131071<<2);D=Pa}if((_|0)==213){_=0;D=c[n>>2]|0;C=D+18|0;a[C]=d[C]|4;w=D;continue}else if((_|0)==218){_=0;D=c[n>>2]|0;C=c[D+8>>2]|0;B=c[D>>2]|0;x=c[C>>2]|0;E=D+24|0;F=(c[E>>2]|0)+(d[(c[(c[B>>2]|0)+12>>2]|0)+76|0]<<4)|0;if((c[(c[z>>2]|0)+56>>2]|0)>0){Wf(b,c[C+24>>2]|0)}if(B>>>0<F>>>0){A=B;y=0;do{T=A;W=c[T+4>>2]|0;J=x+(y<<4)|0;c[J>>2]=c[T>>2];c[J+4>>2]=W;c[x+(y<<4)+8>>2]=c[B+(y<<4)+8>>2];y=y+1|0;A=B+(y<<4)|0;}while(A>>>0<F>>>0)}F=B;c[C+24>>2]=x+((c[E>>2]|0)-F>>4<<4);A=x+((c[q>>2]|0)-F>>4<<4)|0;c[q>>2]=A;c[C+4>>2]=A;c[C+28>>2]=c[D+28>>2];A=C+18|0;a[A]=d[A]|64;c[n>>2]=C;w=C;continue}else if((_|0)==223){_=0;A=H>>>23;if((A|0)!=0){c[q>>2]=I+(A+ -1+$<<4)}if((c[(c[z>>2]|0)+56>>2]|0)>0){Wf(b,I)}A=Ff(b,aa)|0;if((a[w+18|0]&4)==0){_=228;break}F=c[n>>2]|0;if((A|0)==0){w=F;continue}c[q>>2]=c[F+4>>2];w=F;continue}}if((_|0)==23){if(!M){Za=c[O>>2]|0;_a=Za;$a=_a+ -4|0;ab=$a;c[O>>2]=ab;bb=a[N]|0;cb=bb&255;db=cb|128;eb=db&255;a[N]=eb;fb=c[q>>2]|0;gb=fb+ -16|0;hb=L;c[hb>>2]=gb;yf(b,1)}c[s>>2]=1;Za=c[O>>2]|0;_a=Za;$a=_a+ -4|0;ab=$a;c[O>>2]=ab;bb=a[N]|0;cb=bb&255;db=cb|128;eb=db&255;a[N]=eb;fb=c[q>>2]|0;gb=fb+ -16|0;hb=L;c[hb>>2]=gb;yf(b,1)}else if((_|0)==228){i=e;return}else if((_|0)==239){tf(b,8160,j)}else if((_|0)==244){tf(b,8200,g)}else if((_|0)==249){tf(b,8232,f)}}function ek(a){a=a|0;var b=0,e=0,f=0,g=0,h=0;b=i;i=i+8|0;e=b;f=yc[c[a+8>>2]&3](c[a+16>>2]|0,c[a+12>>2]|0,e)|0;if((f|0)==0){g=-1;i=b;return g|0}h=c[e>>2]|0;if((h|0)==0){g=-1;i=b;return g|0}c[a>>2]=h+ -1;c[a+4>>2]=f+1;g=d[f]|0;i=b;return g|0}function fk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;c[b+16>>2]=a;c[b+8>>2]=d;c[b+12>>2]=e;c[b>>2]=0;c[b+4>>2]=0;i=i;return}function gk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;i=i+8|0;f=e;if((d|0)==0){g=0;i=e;return g|0}h=a;j=a+16|0;k=a+8|0;l=a+12|0;m=a+4|0;a=d;d=b;b=c[h>>2]|0;while(1){if((b|0)==0){n=yc[c[k>>2]&3](c[j>>2]|0,c[l>>2]|0,f)|0;if((n|0)==0){g=a;o=9;break}p=c[f>>2]|0;if((p|0)==0){g=a;o=9;break}c[h>>2]=p;c[m>>2]=n;q=n;r=p}else{q=c[m>>2]|0;r=b}p=a>>>0>r>>>0?r:a;Xm(d|0,q|0,p|0)|0;n=(c[h>>2]|0)-p|0;c[h>>2]=n;c[m>>2]=(c[m>>2]|0)+p;if((a|0)==(p|0)){g=0;o=9;break}else{a=a-p|0;d=d+p|0;b=n}}if((o|0)==9){i=e;return g|0}return 0}function hk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;f=b+8|0;g=c[f>>2]|0;if(!(g>>>0<d>>>0)){h=c[b>>2]|0;i=e;return h|0}j=d>>>0<32?32:d;if((j+1|0)>>>0>4294967293){zh(a)}d=b;b=Ah(a,c[d>>2]|0,g,j)|0;c[d>>2]=b;c[f>>2]=j;h=b;i=e;return h|0}function ik(a){a=a|0;var b=0;b=i;Ld(a,-1001e3,2);Ld(a,-1001e3,2);Rd(a,-2,8264);$e(a,8272,0);zd(a,8464,7)|0;Rd(a,-2,8472);i=b;return 1}function jk(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+8|0;d=b;if((pd(a,1)|0)==0){c[d>>2]=xe(a,2,9336,0)|0;e=ne(a,9328,d)|0;i=b;return e|0}else{e=_c(a)|0;i=b;return e|0}return 0}function kk(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=i;d=c[9280+((we(a,1,9160,9096)|0)<<2)>>2]|0;e=be(a,d,Ge(a,2,0)|0)|0;if((d|0)==3){f=be(a,4,0)|0;wd(a,+(e|0)+ +(f|0)*.0009765625);xd(a,f);g=2;i=b;return g|0}else if((d|0)==9|(d|0)==5){Ed(a,e);g=1;i=b;return g|0}else{xd(a,e);g=1;i=b;return g|0}return 0}function lk(a){a=a|0;var b=0,c=0;b=i;c=xe(a,1,0,0)|0;$c(a,1);if((Pe(a,c,0)|0)==0){Xd(a,0,-1,0,162);c=(_c(a)|0)+ -1|0;i=b;return c|0}else{ce(a)|0}return 0}function mk(a){a=a|0;var b=0;b=Ge(a,2,1)|0;$c(a,1);if(!((jd(a,1)|0)!=0&(b|0)>0)){ce(a)|0}pe(a,b);ed(a,1);ee(a,2);ce(a)|0;return 0}function nk(a){a=a|0;var b=0;b=i;Be(a,1);if((Nd(a,1)|0)==0){vd(a);i=b;return 1}else{Ue(a,1,8824)|0;i=b;return 1}return 0}function ok(a){a=a|0;var b=0;b=i;Hk(a,9080,1,163);i=b;return 3}function pk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=i;c=xe(a,1,0,0)|0;d=xe(a,2,0,0)|0;e=(fd(a,3)|0)!=-1;f=e?3:0;do{if((Pe(a,c,d)|0)==0){if(!e){g=1;break}ed(a,f);if((ie(a,-2,1)|0)!=0){g=1;break}$c(a,-2);g=1}else{vd(a);bd(a,-2);g=2}}while(0);i=b;return g|0}function qk(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0;b=i;i=i+8|0;d=b;e=qd(a,1,d)|0;f=xe(a,3,8992,0)|0;g=(fd(a,4)|0)!=-1;if((e|0)==0){h=xe(a,2,9e3,0)|0;Ae(a,1,6);$c(a,5);j=_d(a,3,0,h,f)|0}else{h=xe(a,2,e,0)|0;j=Se(a,e,c[d>>2]|0,h,f)|0}if((j|0)!=0){vd(a);bd(a,-2);k=2;i=b;return k|0}if(!g){k=1;i=b;return k|0}ed(a,g?4:0);if((ie(a,-2,1)|0)!=0){k=1;i=b;return k|0}$c(a,-2);k=1;i=b;return k|0}function rk(a){a=a|0;var b=0,c=0;b=i;Ae(a,1,5);$c(a,2);if((de(a,1)|0)==0){vd(a);c=1}else{c=2}i=b;return c|0}function sk(a){a=a|0;var b=0;b=i;Hk(a,8984,0,93);i=b;return 3}function tk(a){a=a|0;var b=0,c=0;b=i;Be(a,1);vd(a);bd(a,1);c=Gk(a,(Yd(a,(_c(a)|0)+ -2|0,-1,0,0,164)|0)==0|0)|0;i=b;return c|0}function uk(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0;b=i;i=i+8|0;d=b;e=i;i=i+8|0;f=_c(a)|0;Hd(a,8704);g=c[r>>2]|0;a:do{if((f|0)>=1){h=1;while(1){ed(a,-1);ed(a,h);Xd(a,1,1,0,0);j=qd(a,-1,e)|0;if((j|0)==0){break}if((h|0)>1){Tb(9,g|0)|0}qb(j|0,1,c[e>>2]|0,g|0)|0;$c(a,-2);if((h|0)<(f|0)){h=h+1|0}else{break a}}k=ne(a,8936,d)|0;i=b;return k|0}}while(0);Tb(10,g|0)|0;ec(g|0)|0;k=0;i=b;return k|0}function vk(a){a=a|0;var b=0;b=i;Be(a,1);Be(a,2);Ed(a,kd(a,1,2)|0);i=b;return 1}function wk(a){a=a|0;var b=0;b=i;if(((fd(a,1)|0)&-2|0)!=4){me(a,1,8904)|0}xd(a,rd(a,1)|0);i=b;return 1}function xk(a){a=a|0;var b=0;b=i;Ae(a,1,5);Be(a,2);$c(a,2);Kd(a,1);i=b;return 1}function yk(a){a=a|0;var b=0;b=i;Ae(a,1,5);Be(a,2);Be(a,3);$c(a,3);Sd(a,1);i=b;return 1}function zk(b){b=b|0;var c=0,d=0,e=0,f=0,g=0;c=i;d=_c(b)|0;do{if((fd(b,1)|0)==4){if((a[qd(b,1,0)|0]|0)!=35){break}xd(b,d+ -1|0);e=1;i=c;return e|0}}while(0);f=Ee(b,1)|0;if((f|0)<0){g=f+d|0}else{g=(f|0)>(d|0)?d:f}if((g|0)<=0){me(b,1,8880)|0}e=d-g|0;i=c;return e|0}function Ak(a){a=a|0;var b=0,c=0,d=0;b=i;i=i+8|0;c=fd(a,2)|0;Ae(a,1,5);if(!((c|0)==0|(c|0)==5)){me(a,2,8800)|0}if((Ue(a,1,8824)|0)==0){$c(a,2);Ud(a,1)|0;d=1;i=b;return d|0}else{d=ne(a,8840,b)|0;i=b;return d|0}return 0}function Bk(b){b=b|0;var e=0,f=0,g=0,h=0.0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0.0,s=0,t=0.0,u=0,v=0.0,w=0.0;e=i;i=i+16|0;f=e;g=e+8|0;do{if((fd(b,2)|0)<1){h=+md(b,1,f);if((c[f>>2]|0)==0){Be(b,1);break}wd(b,h);i=e;return 1}else{j=ye(b,1,g)|0;k=j+(c[g>>2]|0)|0;l=Ee(b,2)|0;if(!((l+ -2|0)>>>0<35)){me(b,2,8768)|0}m=Yb(j|0,8792)|0;n=j+m|0;o=a[n]|0;if(o<<24>>24==45){p=1;q=j+(m+1)|0}else if(o<<24>>24==43){p=0;q=j+(m+1)|0}else{p=0;q=n}if((oa(d[q]|0|0)|0)==0){break}h=+(l|0);r=0.0;n=q;while(1){m=a[n]|0;j=m&255;if((j+ -48|0)>>>0<10){s=(m<<24>>24)+ -48|0}else{s=(nc(j|0)|0)+ -55|0}if((s|0)>=(l|0)){t=r;u=n;break}v=h*r+ +(s|0);j=n+1|0;if((oa(d[j]|0|0)|0)==0){t=v;u=j;break}else{r=v;n=j}}if((u+(Yb(u|0,8792)|0)|0)!=(k|0)){break}if((p|0)==0){w=t}else{w=-t}wd(b,w);i=e;return 1}}while(0);vd(b);i=e;return 1}function Ck(a){a=a|0;var b=0;b=i;Be(a,1);Xe(a,1,0)|0;i=b;return 1}function Dk(a){a=a|0;var b=0;b=i;Be(a,1);Ad(a,gd(a,fd(a,1)|0)|0)|0;i=b;return 1}function Ek(a){a=a|0;var b=0,c=0,d=0;b=i;c=_c(a)|0;if((c|0)<=1){me(a,2,8736)|0}ed(a,1);dd(a,2,1);cd(a,2);d=Gk(a,(Yd(a,c+ -2|0,-1,1,0,164)|0)==0|0)|0;i=b;return d|0}function Fk(a){a=a|0;var b=0,c=0;b=i;c=Gk(a,(Wd(a,0)|0)==1|0)|0;i=b;return c|0}function Gk(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;if((Uc(a,1)|0)==0){$c(a,0);Ed(a,0);Ad(a,8752)|0;d=2;i=c;return d|0}else{Ed(a,b);cd(a,1);d=_c(a)|0;i=c;return d|0}return 0}function Hk(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=i;if((Ue(a,1,b)|0)!=0){ed(a,1);Xd(a,1,3,0,0);i=e;return}Ae(a,1,5);Dd(a,d,0);ed(a,1);if((c|0)==0){vd(a);i=e;return}else{xd(a,0);i=e;return}}function Ik(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;b=i;i=i+8|0;ze(a,2,9008);ed(a,1);Xd(a,0,1,0,0);if((fd(a,-1)|0)==0){$c(a,-2);c[d>>2]=0;e=0;i=b;return e|0}if((jd(a,-1)|0)==0){ne(a,9040,b)|0}cd(a,5);e=qd(a,5,d)|0;i=b;return e|0}function Jk(a){a=a|0;var b=0,c=0,d=0;b=i;c=Ee(a,2)|0;Ae(a,1,5);d=c+1|0;xd(a,d);Ld(a,1,d);d=(fd(a,-1)|0)==0;i=b;return(d?1:2)|0}function Kk(a){a=a|0;var b=0,c=0;b=i;c=(_c(a)|0)+ -1|0;i=b;return c|0}function Lk(a){a=a|0;var b=0;b=i;Md(a,0,12);$e(a,9360,0);i=b;return 1}function Mk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=i;c=Fe(a,1)|0;d=Ee(a,2)|0;if((d|0)>-1&(c|0)<0){if((d|0)>31){e=-1}else{e=c>>>d|~(-1>>>d)}yd(a,e);i=b;return 1}e=0-d|0;if((d|0)>0){f=(d|0)>31?0:c>>>d}else{f=(e|0)>31?0:c<<e}yd(a,f);i=b;return 1}function Nk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=i;c=_c(a)|0;if((c|0)<1){d=-1}else{e=1;f=-1;while(1){g=(Fe(a,e)|0)&f;if((e|0)==(c|0)){d=g;break}else{f=g;e=e+1|0}}}yd(a,d);i=b;return 1}function Ok(a){a=a|0;var b=0;b=i;yd(a,~(Fe(a,1)|0));i=b;return 1}function Pk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=i;c=_c(a)|0;if((c|0)<1){d=0}else{e=1;f=0;while(1){g=Fe(a,e)|0|f;if((e|0)==(c|0)){d=g;break}else{f=g;e=e+1|0}}}yd(a,d);i=b;return 1}function Qk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=i;c=_c(a)|0;if((c|0)<1){d=0}else{e=1;f=0;while(1){g=(Fe(a,e)|0)^f;if((e|0)==(c|0)){d=g;break}else{f=g;e=e+1|0}}}yd(a,d);i=b;return 1}function Rk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=i;c=_c(a)|0;if((c|0)<1){d=1}else{e=1;f=-1;while(1){g=(Fe(a,e)|0)&f;if((e|0)==(c|0)){break}else{f=g;e=e+1|0}}d=(g|0)!=0}Ed(a,d&1);i=b;return 1}function Sk(a){a=a|0;var b=0,c=0,d=0,e=0;b=i;i=i+8|0;c=Fe(a,1)|0;d=Ee(a,2)|0;e=Ge(a,3,1)|0;if(!((d|0)>-1)){me(a,2,9560)|0}if((e|0)<=0){me(a,3,9592)|0}if((e+d|0)>32){ne(a,9616,b)|0}yd(a,c>>>d&~(-2<<e+ -1));i=b;return 1}function Tk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=i;c=Ee(a,2)|0;d=Fe(a,1)|0;e=c&31;if((e|0)==0){f=d}else{f=d>>>(32-e|0)|d<<e}yd(a,f);i=b;return 1}function Uk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=i;c=Fe(a,1)|0;d=Ee(a,2)|0;if((d|0)<0){e=0-d|0;f=(e|0)>31?0:c>>>e;yd(a,f);i=b;return 1}else{f=(d|0)>31?0:c<<d;yd(a,f);i=b;return 1}return 0}function Vk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=i;i=i+8|0;c=Fe(a,1)|0;d=Fe(a,2)|0;e=Ee(a,3)|0;f=Ge(a,4,1)|0;if(!((e|0)>-1)){me(a,3,9560)|0}if((f|0)<=0){me(a,4,9592)|0}if((f+e|0)>32){ne(a,9616,b)|0}g=~(-2<<f+ -1);yd(a,c&~(g<<e)|(d&g)<<e);i=b;return 1}function Wk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=i;c=0-(Ee(a,2)|0)|0;d=Fe(a,1)|0;e=c&31;if((e|0)==0){f=d}else{f=d>>>(32-e|0)|d<<e}yd(a,f);i=b;return 1}function Xk(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=i;c=Fe(a,1)|0;d=Ee(a,2)|0;e=0-d|0;if((d|0)>0){f=(d|0)>31?0:c>>>d;yd(a,f);i=b;return 1}else{f=(e|0)>31?0:c<<e;yd(a,f);i=b;return 1}return 0}function Yk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;e=i;f=d+b|0;g=f+ -1|0;h=c[a+20>>2]|0;do{if((h|0)>(c[a+24>>2]|0)){j=(c[(c[a>>2]|0)+12>>2]|0)+(h+ -1<<2)|0;k=c[j>>2]|0;if((k&63|0)!=4){break}l=k>>>6&255;m=l+(k>>>23)|0;if((l|0)>(b|0)){n=5}else{if((m+1|0)<(b|0)){n=5}}if((n|0)==5){if((l|0)<(b|0)|(l|0)>(f|0)){break}}o=(l|0)<(b|0)?l:b;c[j>>2]=((m|0)>(g|0)?m:g)-o<<23|o<<6&16320|k&8372287;i=e;return}}while(0);gl(a,b<<6|(d<<23)+ -8388608|4)|0;i=e;return}function Zk(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=i;g=gl(a,c<<6|b|d<<23|e<<14)|0;i=f;return g|0}function _k(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;b=i;d=a+28|0;e=c[d>>2]|0;c[d>>2]=-1;d=gl(a,2147450903)|0;if((e|0)==-1){f=d;i=b;return f|0}if((d|0)==-1){f=e;i=b;return f|0}g=c[(c[a>>2]|0)+12>>2]|0;h=d;while(1){j=g+(h<<2)|0;k=c[j>>2]|0;l=(k>>>14)+ -131071|0;if((l|0)==-1){break}m=h+1+l|0;if((m|0)==-1){break}else{h=m}}g=e+~h|0;if((((g|0)>-1?g:0-g|0)|0)>131071){km(c[a+12>>2]|0,9744)}c[j>>2]=(g<<14)+2147467264|k&16383;f=d;i=b;return f|0}function $k(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=i;f=gl(a,c<<6|b|d<<14)|0;i=e;return f|0}function al(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;if((d|0)==-1){i=e;return}f=c[b>>2]|0;if((f|0)==-1){c[b>>2]=d;i=e;return}b=c[(c[a>>2]|0)+12>>2]|0;g=f;while(1){h=b+(g<<2)|0;j=c[h>>2]|0;f=(j>>>14)+ -131071|0;if((f|0)==-1){break}k=g+1+f|0;if((k|0)==-1){break}else{g=k}}b=~g+d|0;if((((b|0)>-1?b:0-b|0)|0)>131071){km(c[a+12>>2]|0,9744)}c[h>>2]=j&16383|(b<<14)+2147467264;i=e;return}function bl(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=i;gl(a,b<<6|(c<<23)+8388608|31)|0;i=d;return}function cl(a){a=a|0;var b=0;b=c[a+20>>2]|0;c[a+24>>2]=b;i=i;return b|0}function dl(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;if((c[b+20>>2]|0)==(e|0)){c[b+24>>2]=e;g=b+28|0;if((d|0)==-1){i=f;return}h=c[g>>2]|0;if((h|0)==-1){c[g>>2]=d;i=f;return}g=c[(c[b>>2]|0)+12>>2]|0;j=h;while(1){k=g+(j<<2)|0;l=c[k>>2]|0;h=(l>>>14)+ -131071|0;if((h|0)==-1){break}m=j+1+h|0;if((m|0)==-1){break}else{j=m}}g=~j+d|0;if((((g|0)>-1?g:0-g|0)|0)>131071){km(c[b+12>>2]|0,9744)}c[k>>2]=(g<<14)+2147467264|l&16383;i=f;return}if((d|0)==-1){i=f;return}l=c[(c[b>>2]|0)+12>>2]|0;g=d;while(1){d=l+(g<<2)|0;k=c[d>>2]|0;j=(k>>>14)+ -131071|0;if((j|0)==-1){n=-1}else{n=g+1+j|0}if((g|0)>0){j=l+(g+ -1<<2)|0;m=c[j>>2]|0;if((a[4704+(m&63)|0]|0)<0){o=j;p=m}else{q=17}}else{q=17}if((q|0)==17){q=0;o=d;p=k}if((p&63|0)==28){c[o>>2]=p&8372224|p>>>23<<6|27;m=~g+e|0;if((((m|0)>-1?m:0-m|0)|0)>131071){q=20;break}r=c[d>>2]&16383|(m<<14)+2147467264}else{m=~g+e|0;if((((m|0)>-1?m:0-m|0)|0)>131071){q=23;break}r=k&16383|(m<<14)+2147467264}c[d>>2]=r;if((n|0)==-1){q=26;break}else{g=n}}if((q|0)==20){km(c[b+12>>2]|0,9744)}else if((q|0)==23){km(c[b+12>>2]|0,9744)}else if((q|0)==26){i=f;return}}function el(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;c[a+24>>2]=c[a+20>>2];e=a+28|0;if((b|0)==-1){i=d;return}f=c[e>>2]|0;if((f|0)==-1){c[e>>2]=b;i=d;return}e=c[(c[a>>2]|0)+12>>2]|0;g=f;while(1){h=e+(g<<2)|0;j=c[h>>2]|0;f=(j>>>14)+ -131071|0;if((f|0)==-1){break}k=g+1+f|0;if((k|0)==-1){break}else{g=k}}e=~g+b|0;if((((e|0)>-1?e:0-e|0)|0)>131071){km(c[a+12>>2]|0,9744)}c[h>>2]=(e<<14)+2147467264|j&16383;i=d;return}



function fl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;if((b|0)==-1){i=e;return}f=c[(c[a>>2]|0)+12>>2]|0;a=(d<<6)+64&16320;d=b;while(1){g=f+(d<<2)|0;h=c[g>>2]|0;b=(h>>>14)+ -131071|0;if((b|0)==-1){break}j=d+1+b|0;c[g>>2]=h&-16321|a;if((j|0)==-1){k=6;break}else{d=j}}if((k|0)==6){i=e;return}c[g>>2]=h&-16321|a;i=e;return}function gl(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;f=c[b>>2]|0;g=b+28|0;h=c[g>>2]|0;j=b+20|0;k=c[j>>2]|0;do{if((h|0)==-1){l=k}else{m=c[f+12>>2]|0;n=h;while(1){o=m+(n<<2)|0;p=c[o>>2]|0;q=(p>>>14)+ -131071|0;if((q|0)==-1){r=-1}else{r=n+1+q|0}if((n|0)>0){q=m+(n+ -1<<2)|0;s=c[q>>2]|0;if((a[4704+(s&63)|0]|0)<0){t=q;u=s}else{v=7}}else{v=7}if((v|0)==7){v=0;t=o;u=p}if((u&63|0)==28){c[t>>2]=u&8372224|u>>>23<<6|27;s=k+~n|0;if((((s|0)>-1?s:0-s|0)|0)>131071){v=10;break}w=c[o>>2]&16383|(s<<14)+2147467264}else{s=k+~n|0;if((((s|0)>-1?s:0-s|0)|0)>131071){v=13;break}w=(s<<14)+2147467264|p&16383}c[o>>2]=w;if((r|0)==-1){v=16;break}else{n=r}}if((v|0)==10){km(c[b+12>>2]|0,9744)}else if((v|0)==13){km(c[b+12>>2]|0,9744)}else if((v|0)==16){l=c[j>>2]|0;break}}}while(0);c[g>>2]=-1;g=f+48|0;if((l|0)<(c[g>>2]|0)){x=f+12|0;y=l}else{l=f+12|0;c[l>>2]=yh(c[(c[b+12>>2]|0)+52>>2]|0,c[l>>2]|0,g,4,2147483645,9736)|0;x=l;y=c[j>>2]|0}c[(c[x>>2]|0)+(y<<2)>>2]=d;d=c[j>>2]|0;y=f+52|0;x=b+12|0;if((d|0)<(c[y>>2]|0)){z=f+20|0;A=d;B=c[x>>2]|0;C=B+8|0;D=c[C>>2]|0;E=c[z>>2]|0;F=E+(A<<2)|0;c[F>>2]=D;G=c[j>>2]|0;H=G+1|0;c[j>>2]=H;i=e;return G|0}else{d=f+20|0;c[d>>2]=yh(c[(c[x>>2]|0)+52>>2]|0,c[d>>2]|0,y,4,2147483645,9736)|0;z=d;A=c[j>>2]|0;B=c[x>>2]|0;C=B+8|0;D=c[C>>2]|0;E=c[z>>2]|0;F=E+(A<<2)|0;c[F>>2]=D;G=c[j>>2]|0;H=G+1|0;c[j>>2]=H;i=e;return G|0}return 0}function hl(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=i;e=b<<6;if((c|0)<262144){f=gl(a,e|c<<14|1)|0;i=d;return f|0}else{b=gl(a,e|2)|0;gl(a,c<<6|39)|0;f=b;i=d;return f|0}return 0}function il(b,e){b=b|0;e=e|0;var f=0,g=0;f=i;g=(d[b+48|0]|0)+e|0;e=(c[b>>2]|0)+78|0;if((g|0)<=(d[e]|0|0)){i=f;return}if((g|0)>249){km(c[b+12>>2]|0,9656)}a[e]=g;i=f;return}function jl(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;g=b+48|0;h=a[g]|0;j=(h&255)+e|0;k=(c[b>>2]|0)+78|0;do{if((j|0)>(d[k]|0|0)){if((j|0)>249){km(c[b+12>>2]|0,9656)}else{a[k]=j;l=a[g]|0;break}}else{l=h}}while(0);a[g]=(l&255)+e;i=f;return}function kl(a,b){a=a|0;b=b|0;var e=0,f=0;e=i;i=i+16|0;f=e;c[f>>2]=b;c[f+8>>2]=d[b+4|0]|0|64;b=ll(a,f,f)|0;i=e;return b|0}function ll(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+8|0;g=f;j=c[(c[b+12>>2]|0)+52>>2]|0;k=sj(j,c[b+4>>2]|0,d)|0;d=c[b>>2]|0;l=k+8|0;m=k;do{if((c[l>>2]|0)==3){h[g>>3]=+h[m>>3]+6755399441055744.0;k=c[g>>2]|0;n=c[d+8>>2]|0;if((c[n+(k<<4)+8>>2]|0)!=(c[e+8>>2]|0)){break}if((Zj(0,n+(k<<4)|0,e)|0)==0){break}else{o=k}i=f;return o|0}}while(0);g=d+44|0;k=c[g>>2]|0;n=b+32|0;b=c[n>>2]|0;h[m>>3]=+(b|0);c[l>>2]=3;l=c[g>>2]|0;if((b|0)<(l|0)){p=l}else{l=d+8|0;c[l>>2]=yh(j,c[l>>2]|0,g,16,67108863,9720)|0;p=c[g>>2]|0}l=c[d+8>>2]|0;if((k|0)<(p|0)){p=k;while(1){k=p+1|0;c[l+(p<<4)+8>>2]=0;if((k|0)<(c[g>>2]|0)){p=k}else{break}}}p=e;g=c[p+4>>2]|0;k=l+(b<<4)|0;c[k>>2]=c[p>>2];c[k+4>>2]=g;g=e+8|0;c[l+(b<<4)+8>>2]=c[g>>2];c[n>>2]=(c[n>>2]|0)+1;if((c[g>>2]&64|0)==0){o=b;i=f;return o|0}g=c[e>>2]|0;if((a[g+5|0]&3)==0){o=b;i=f;return o|0}if((a[d+5|0]&4)==0){o=b;i=f;return o|0}_f(j,d,g);o=b;i=f;return o|0}function ml(a,b){a=a|0;b=+b;var e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0;e=i;i=i+24|0;f=e;g=e+8|0;h[f>>3]=b;j=c[(c[a+12>>2]|0)+52>>2]|0;h[g>>3]=b;c[g+8>>2]=3;if(b!=b|0.0!=0.0|b==0.0){k=j+8|0;l=c[k>>2]|0;c[k>>2]=l+16;m=Si(j,f,8)|0;c[l>>2]=m;c[l+8>>2]=d[m+4|0]|0|64;m=ll(a,(c[k>>2]|0)+ -16|0,g)|0;c[k>>2]=(c[k>>2]|0)+ -16;n=m;i=e;return n|0}else{n=ll(a,g,g)|0;i=e;return n|0}return 0}function nl(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;h=c[e>>2]|0;if((h|0)==13){j=e+8|0;k=c[b>>2]|0;l=c[k+12>>2]|0;m=l+(c[j>>2]<<2)|0;c[m>>2]=c[m>>2]&8388607|(f<<23)+8388608;m=l+(c[j>>2]<<2)|0;j=b+48|0;c[m>>2]=(d[j]|0)<<6|c[m>>2]&-16321;m=a[j]|0;l=(m&255)+1|0;n=k+78|0;do{if(l>>>0>(d[n]|0)>>>0){if(l>>>0>249){km(c[b+12>>2]|0,9656)}else{a[n]=l;o=a[j]|0;break}}else{o=m}}while(0);a[j]=(o&255)+1;i=g;return}else if((h|0)==12){h=(c[(c[b>>2]|0)+12>>2]|0)+(c[e+8>>2]<<2)|0;c[h>>2]=c[h>>2]&-8372225|(f<<14)+16384&8372224;i=g;return}else{i=g;return}}function ol(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;e=b;f=c[e>>2]|0;if((f|0)==13){g=(c[(c[a>>2]|0)+12>>2]|0)+(c[b+8>>2]<<2)|0;c[g>>2]=c[g>>2]&8388607|16777216;c[e>>2]=11;i=d;return}else if((f|0)==12){c[e>>2]=6;e=b+8|0;c[e>>2]=(c[(c[(c[a>>2]|0)+12>>2]|0)+(c[e>>2]<<2)>>2]|0)>>>6&255;i=d;return}else{i=d;return}}function pl(e,f){e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;h=f;switch(c[h>>2]|0){case 7:{c[h>>2]=6;i=g;return};case 12:{c[h>>2]=6;j=f+8|0;c[j>>2]=(c[(c[(c[e>>2]|0)+12>>2]|0)+(c[j>>2]<<2)>>2]|0)>>>6&255;i=g;return};case 8:{j=f+8|0;c[j>>2]=gl(e,c[j>>2]<<23|5)|0;c[h>>2]=11;i=g;return};case 9:{j=f+8|0;k=j;l=j;m=b[l>>1]|0;do{if((m&256|0)==0){if((d[e+46|0]|0)>(m|0)){break}n=e+48|0;a[n]=(a[n]|0)+ -1<<24>>24}}while(0);m=k+2|0;do{if((a[k+3|0]|0)==7){if((d[e+46|0]|0)>(d[m]|0)){o=7;break}n=e+48|0;a[n]=(a[n]|0)+ -1<<24>>24;o=7}else{o=6}}while(0);c[j>>2]=gl(e,d[m]<<23|o|b[l>>1]<<14)|0;c[h>>2]=11;i=g;return};case 13:{l=(c[(c[e>>2]|0)+12>>2]|0)+(c[f+8>>2]<<2)|0;c[l>>2]=c[l>>2]&8388607|16777216;c[h>>2]=11;i=g;return};default:{i=g;return}}}function ql(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=i;pl(b,e);do{if((c[e>>2]|0)==6){g=c[e+8>>2]|0;if((g&256|0)!=0){break}if((d[b+46|0]|0|0)>(g|0)){break}g=b+48|0;a[g]=(a[g]|0)+ -1<<24>>24}}while(0);g=b+48|0;h=a[g]|0;j=(h&255)+1|0;k=(c[b>>2]|0)+78|0;if(!(j>>>0>(d[k]|0)>>>0)){l=h;m=l&255;n=m+1|0;o=n&255;a[g]=o;p=n&255;q=p+ -1|0;rl(b,e,q);i=f;return}if(j>>>0>249){km(c[b+12>>2]|0,9656)}a[k]=j;l=a[g]|0;m=l&255;n=m+1|0;o=n&255;a[g]=o;p=n&255;q=p+ -1|0;rl(b,e,q);i=f;return}function rl(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;f=i;Il(b,d,e);g=d;h=d+16|0;do{if((c[g>>2]|0)==10){j=c[d+8>>2]|0;if((j|0)==-1){break}k=c[h>>2]|0;if((k|0)==-1){c[h>>2]=j;break}l=c[(c[b>>2]|0)+12>>2]|0;m=k;while(1){n=l+(m<<2)|0;o=c[n>>2]|0;k=(o>>>14)+ -131071|0;if((k|0)==-1){break}p=m+1+k|0;if((p|0)==-1){break}else{m=p}}l=j+~m|0;if((((l|0)>-1?l:0-l|0)|0)>131071){km(c[b+12>>2]|0,9744)}else{c[n>>2]=(l<<14)+2147467264|o&16383;break}}}while(0);o=c[h>>2]|0;n=d+20|0;l=c[n>>2]|0;if((o|0)==(l|0)){c[h>>2]=-1;c[n>>2]=-1;q=d+8|0;r=q;c[r>>2]=e;c[g>>2]=6;i=f;return}a:do{if((o|0)==-1){s=20}else{p=c[(c[b>>2]|0)+12>>2]|0;k=o;while(1){t=p+(k<<2)|0;if((k|0)>0){u=c[p+(k+ -1<<2)>>2]|0;if((a[4704+(u&63)|0]|0)<0){v=u}else{s=16}}else{s=16}if((s|0)==16){s=0;v=c[t>>2]|0}if((v&63|0)!=28){s=28;break a}u=((c[t>>2]|0)>>>14)+ -131071|0;if((u|0)==-1){s=20;break a}t=k+1+u|0;if((t|0)==-1){s=20;break}else{k=t}}}}while(0);b:do{if((s|0)==20){if((l|0)==-1){w=-1;x=-1;break}v=c[(c[b>>2]|0)+12>>2]|0;o=l;while(1){k=v+(o<<2)|0;if((o|0)>0){p=c[v+(o+ -1<<2)>>2]|0;if((a[4704+(p&63)|0]|0)<0){y=p}else{s=24}}else{s=24}if((s|0)==24){s=0;y=c[k>>2]|0}if((y&63|0)!=28){s=28;break b}p=((c[k>>2]|0)>>>14)+ -131071|0;if((p|0)==-1){w=-1;x=-1;break b}k=o+1+p|0;if((k|0)==-1){w=-1;x=-1;break}else{o=k}}}}while(0);do{if((s|0)==28){y=b+28|0;do{if((c[g>>2]|0)==10){z=-1}else{l=c[y>>2]|0;c[y>>2]=-1;o=gl(b,2147450903)|0;if((l|0)==-1){z=o;break}if((o|0)==-1){z=l;break}v=c[(c[b>>2]|0)+12>>2]|0;k=o;while(1){A=v+(k<<2)|0;B=c[A>>2]|0;p=(B>>>14)+ -131071|0;if((p|0)==-1){break}m=k+1+p|0;if((m|0)==-1){break}else{k=m}}v=l+~k|0;if((((v|0)>-1?v:0-v|0)|0)>131071){km(c[b+12>>2]|0,9744)}else{c[A>>2]=(v<<14)+2147467264|B&16383;z=o;break}}}while(0);v=b+20|0;m=b+24|0;c[m>>2]=c[v>>2];p=e<<6;j=gl(b,p|16387)|0;c[m>>2]=c[v>>2];t=gl(b,p|8388611)|0;c[m>>2]=c[v>>2];if((z|0)==-1){w=j;x=t;break}v=c[y>>2]|0;if((v|0)==-1){c[y>>2]=z;w=j;x=t;break}m=c[(c[b>>2]|0)+12>>2]|0;p=v;while(1){C=m+(p<<2)|0;D=c[C>>2]|0;v=(D>>>14)+ -131071|0;if((v|0)==-1){break}u=p+1+v|0;if((u|0)==-1){break}else{p=u}}m=z+~p|0;if((((m|0)>-1?m:0-m|0)|0)>131071){km(c[b+12>>2]|0,9744)}else{c[C>>2]=(m<<14)+2147467264|D&16383;w=j;x=t;break}}}while(0);D=c[b+20>>2]|0;c[b+24>>2]=D;C=c[n>>2]|0;c:do{if(!((C|0)==-1)){z=(e|0)==255;B=e<<6&16320;A=c[(c[b>>2]|0)+12>>2]|0;m=C;while(1){y=A+(m<<2)|0;u=c[y>>2]|0;v=(u>>>14)+ -131071|0;if((v|0)==-1){E=-1}else{E=m+1+v|0}if((m|0)>0){v=A+(m+ -1<<2)|0;F=c[v>>2]|0;if((a[4704+(F&63)|0]|0)<0){G=v;H=F}else{s=52}}else{s=52}if((s|0)==52){s=0;G=y;H=u}if((H&63|0)==28){F=H>>>23;if(z|(F|0)==(e|0)){I=H&8372224|F<<6|27}else{I=H&-16321|B}c[G>>2]=I;F=D+~m|0;if((((F|0)>-1?F:0-F|0)|0)>131071){s=58;break}J=c[y>>2]&16383|(F<<14)+2147467264}else{F=w+~m|0;if((((F|0)>-1?F:0-F|0)|0)>131071){s=61;break}J=u&16383|(F<<14)+2147467264}c[y>>2]=J;if((E|0)==-1){break c}else{m=E}}if((s|0)==58){km(c[b+12>>2]|0,9744)}else if((s|0)==61){km(c[b+12>>2]|0,9744)}}}while(0);E=c[h>>2]|0;if((E|0)==-1){c[h>>2]=-1;c[n>>2]=-1;q=d+8|0;r=q;c[r>>2]=e;c[g>>2]=6;i=f;return}J=e<<6;w=J&16320;I=c[(c[b>>2]|0)+12>>2]|0;if((e|0)==255){G=E;while(1){H=I+(G<<2)|0;C=c[H>>2]|0;m=(C>>>14)+ -131071|0;if((m|0)==-1){K=-1}else{K=G+1+m|0}if((G|0)>0){m=I+(G+ -1<<2)|0;B=c[m>>2]|0;if((a[4704+(B&63)|0]|0)<0){L=m;M=B}else{s=70}}else{s=70}if((s|0)==70){s=0;L=H;M=C}if((M&63|0)==28){c[L>>2]=M&8372224|M>>>23<<6|27;B=D+~G|0;if((((B|0)>-1?B:0-B|0)|0)>131071){s=87;break}N=c[H>>2]&16383|(B<<14)+2147467264}else{B=x+~G|0;if((((B|0)>-1?B:0-B|0)|0)>131071){s=90;break}N=C&16383|(B<<14)+2147467264}c[H>>2]=N;if((K|0)==-1){s=93;break}else{G=K}}if((s|0)==87){O=b+12|0;P=c[O>>2]|0;km(P,9744)}else if((s|0)==90){Q=b+12|0;R=c[Q>>2]|0;km(R,9744)}else if((s|0)==93){c[h>>2]=-1;c[n>>2]=-1;q=d+8|0;r=q;c[r>>2]=e;c[g>>2]=6;i=f;return}}else{S=E}while(1){E=I+(S<<2)|0;K=c[E>>2]|0;G=(K>>>14)+ -131071|0;if((G|0)==-1){T=-1}else{T=S+1+G|0}if((S|0)>0){G=I+(S+ -1<<2)|0;N=c[G>>2]|0;if((a[4704+(N&63)|0]|0)<0){U=G;V=N}else{s=81}}else{s=81}if((s|0)==81){s=0;U=E;V=K}if((V&63|0)==28){if((V>>>23|0)==(e|0)){W=V&8372224|J|27}else{W=V&-16321|w}c[U>>2]=W;N=D+~S|0;if((((N|0)>-1?N:0-N|0)|0)>131071){s=87;break}X=c[E>>2]&16383|(N<<14)+2147467264}else{N=x+~S|0;if((((N|0)>-1?N:0-N|0)|0)>131071){s=90;break}X=K&16383|(N<<14)+2147467264}c[E>>2]=X;if((T|0)==-1){s=93;break}else{S=T}}if((s|0)==87){O=b+12|0;P=c[O>>2]|0;km(P,9744)}else if((s|0)==90){Q=b+12|0;R=c[Q>>2]|0;km(R,9744)}else if((s|0)==93){c[h>>2]=-1;c[n>>2]=-1;q=d+8|0;r=q;c[r>>2]=e;c[g>>2]=6;i=f;return}}function sl(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0;e=i;pl(a,b);do{if((c[b>>2]|0)==6){f=b+8|0;g=c[f>>2]|0;if((c[b+16>>2]|0)==(c[b+20>>2]|0)){h=g;i=e;return h|0}if((g|0)<(d[a+46|0]|0|0)){j=f;break}rl(a,b,g);h=c[f>>2]|0;i=e;return h|0}else{j=b+8|0}}while(0);ql(a,b);h=c[j>>2]|0;i=e;return h|0}function tl(a,b){a=a|0;b=b|0;var e=0,f=0,g=0;e=i;f=b;do{if((c[f>>2]|0)==8){if((c[b+16>>2]|0)!=(c[b+20>>2]|0)){break}i=e;return}}while(0);pl(a,b);do{if((c[f>>2]|0)==6){g=c[b+8>>2]|0;if((c[b+16>>2]|0)==(c[b+20>>2]|0)){i=e;return}if((g|0)<(d[a+46|0]|0|0)){break}rl(a,b,g);i=e;return}}while(0);ql(a,b);i=e;return}function ul(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0;e=i;f=b+16|0;g=b+20|0;if((c[f>>2]|0)==(c[g>>2]|0)){pl(a,b);i=e;return}pl(a,b);do{if((c[b>>2]|0)==6){h=c[b+8>>2]|0;if((c[f>>2]|0)==(c[g>>2]|0)){i=e;return}if((h|0)<(d[a+46|0]|0|0)){break}rl(a,b,h);i=e;return}}while(0);ql(a,b);i=e;return}function vl(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0.0,w=0,x=0,y=0,z=0,A=0,B=0;e=i;i=i+72|0;f=e;g=e+8|0;j=e+24|0;k=e+40|0;l=e+56|0;m=b+16|0;n=b+20|0;o=(c[m>>2]|0)==(c[n>>2]|0);pl(a,b);p=b;a:do{if(!o){do{if((c[p>>2]|0)==6){q=c[b+8>>2]|0;if((c[m>>2]|0)==(c[n>>2]|0)){break a}if((q|0)<(d[a+46|0]|0|0)){break}rl(a,b,q);break a}}while(0);ql(a,b)}}while(0);o=c[p>>2]|0;b:do{switch(o|0){case 4:{r=c[b+8>>2]|0;s=18;break};case 1:case 3:case 2:{if((c[a+32>>2]|0)>=256){break b}if((o|0)==1){c[l+8>>2]=0;c[k>>2]=c[a+4>>2];c[k+8>>2]=69;t=ll(a,k,l)|0}else{c[j>>2]=(o|0)==2;c[j+8>>2]=1;t=ll(a,j,j)|0}c[b+8>>2]=t;c[p>>2]=4;u=t|256;i=e;return u|0};case 5:{q=b+8|0;v=+h[q>>3];h[f>>3]=v;w=c[(c[a+12>>2]|0)+52>>2]|0;h[g>>3]=v;c[g+8>>2]=3;if(v!=v|0.0!=0.0|v==0.0){x=w+8|0;y=c[x>>2]|0;c[x>>2]=y+16;z=Si(w,f,8)|0;c[y>>2]=z;c[y+8>>2]=d[z+4|0]|0|64;z=ll(a,(c[x>>2]|0)+ -16|0,g)|0;c[x>>2]=(c[x>>2]|0)+ -16;A=z}else{A=ll(a,g,g)|0}c[q>>2]=A;c[p>>2]=4;r=A;s=18;break};default:{}}}while(0);do{if((s|0)==18){if((r|0)>=256){break}u=r|256;i=e;return u|0}}while(0);pl(a,b);do{if((c[p>>2]|0)==6){r=b+8|0;s=c[r>>2]|0;if((c[m>>2]|0)==(c[n>>2]|0)){u=s;i=e;return u|0}if((s|0)<(d[a+46|0]|0|0)){B=r;break}rl(a,b,s);u=c[r>>2]|0;i=e;return u|0}else{B=b+8|0}}while(0);ql(a,b);u=c[B>>2]|0;i=e;return u|0}function wl(b,f,g){b=b|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0;h=i;j=c[f>>2]|0;if((j|0)==7){do{if((c[g>>2]|0)==6){k=c[g+8>>2]|0;if((k&256|0)!=0){break}if((d[b+46|0]|0)>(k|0)){break}k=b+48|0;a[k]=(a[k]|0)+ -1<<24>>24}}while(0);rl(b,g,c[f+8>>2]|0);i=h;return}else if((j|0)==8){pl(b,g);do{if((c[g>>2]|0)==6){k=g+8|0;l=c[k>>2]|0;if((c[g+16>>2]|0)==(c[g+20>>2]|0)){m=l;break}if((l|0)<(d[b+46|0]|0)){n=k;o=12;break}rl(b,g,l);m=c[k>>2]|0}else{n=g+8|0;o=12}}while(0);if((o|0)==12){ql(b,g);m=c[n>>2]|0}gl(b,m<<6|c[f+8>>2]<<23|9)|0}else if((j|0)==9){j=f+8|0;f=j;m=(a[f+3|0]|0)==7?10:8;n=vl(b,g)|0;gl(b,n<<14|m|d[f+2|0]<<6|e[j>>1]<<23)|0}if((c[g>>2]|0)!=6){i=h;return}j=c[g+8>>2]|0;if((j&256|0)!=0){i=h;return}if((d[b+46|0]|0)>(j|0)){i=h;return}j=b+48|0;a[j]=(a[j]|0)+ -1<<24>>24;i=h;return}function xl(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;pl(b,e);h=e;do{if((c[h>>2]|0)==6){j=e+8|0;k=c[j>>2]|0;if((c[e+16>>2]|0)==(c[e+20>>2]|0)){l=j;break}if((k|0)<(d[b+46|0]|0|0)){m=j;n=6;break}rl(b,e,k);l=j}else{m=e+8|0;n=6}}while(0);if((n|0)==6){ql(b,e);l=m}m=c[l>>2]|0;do{if((c[h>>2]|0)==6){if((m&256|0)!=0){break}if((d[b+46|0]|0|0)>(m|0)){break}e=b+48|0;a[e]=(a[e]|0)+ -1<<24>>24}}while(0);e=b+48|0;c[l>>2]=d[e]|0;c[h>>2]=6;h=a[e]|0;n=(h&255)+2|0;j=(c[b>>2]|0)+78|0;do{if(n>>>0>(d[j]|0)>>>0){if(n>>>0>249){km(c[b+12>>2]|0,9656)}else{a[j]=n;o=a[e]|0;break}}else{o=h}}while(0);a[e]=(o&255)+2;o=c[l>>2]|0;gl(b,m<<23|o<<6|(vl(b,f)|0)<<14|12)|0;if((c[f>>2]|0)!=6){i=g;return}o=c[f+8>>2]|0;if((o&256|0)!=0){i=g;return}if((d[b+46|0]|0|0)>(o|0)){i=g;return}a[e]=(a[e]|0)+ -1<<24>>24;i=g;return}function yl(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;f=i;pl(b,e);g=e;h=c[g>>2]|0;a:do{if((h|0)==10){j=c[(c[b>>2]|0)+12>>2]|0;k=e+8|0;l=c[k>>2]|0;m=j+(l<<2)|0;if((l|0)>0){n=j+(l+ -1<<2)|0;l=c[n>>2]|0;if((a[4704+(l&63)|0]|0)<0){o=n;p=l}else{q=4}}else{q=4}if((q|0)==4){o=m;p=c[m>>2]|0}c[o>>2]=((p&16320|0)==0)<<6|p&-16321;r=c[k>>2]|0;q=18}else if(!((h|0)==2|(h|0)==5|(h|0)==4)){k=e+8|0;do{if((h|0)==6){q=14}else if((h|0)==11){m=c[(c[(c[b>>2]|0)+12>>2]|0)+(c[k>>2]<<2)>>2]|0;if((m&63|0)!=20){q=9;break}l=b+20|0;c[l>>2]=(c[l>>2]|0)+ -1;r=Hl(b,27,m>>>23,0,1)|0;q=18;break a}else{q=9}}while(0);if((q|0)==9){m=b+48|0;l=a[m]|0;n=(l&255)+1|0;j=(c[b>>2]|0)+78|0;do{if(n>>>0>(d[j]|0)>>>0){if(n>>>0>249){km(c[b+12>>2]|0,9656)}else{a[j]=n;s=a[m]|0;break}}else{s=l}}while(0);l=(s&255)+1|0;a[m]=l;Il(b,e,(l&255)+ -1|0);if((c[g>>2]|0)==6){q=14}}do{if((q|0)==14){l=c[k>>2]|0;if((l&256|0)!=0){break}if((d[b+46|0]|0)>(l|0)){break}l=b+48|0;a[l]=(a[l]|0)+ -1<<24>>24}}while(0);r=Hl(b,28,255,c[k>>2]|0,0)|0;q=18}}while(0);do{if((q|0)==18){g=e+20|0;if((r|0)==-1){break}s=c[g>>2]|0;if((s|0)==-1){c[g>>2]=r;break}g=c[(c[b>>2]|0)+12>>2]|0;h=s;while(1){t=g+(h<<2)|0;u=c[t>>2]|0;s=(u>>>14)+ -131071|0;if((s|0)==-1){break}p=h+1+s|0;if((p|0)==-1){break}else{h=p}}g=r+~h|0;if((((g|0)>-1?g:0-g|0)|0)>131071){km(c[b+12>>2]|0,9744)}else{c[t>>2]=(g<<14)+2147467264|u&16383;break}}}while(0);u=e+16|0;e=c[u>>2]|0;c[b+24>>2]=c[b+20>>2];t=b+28|0;if((e|0)==-1){c[u>>2]=-1;i=f;return}r=c[t>>2]|0;if((r|0)==-1){c[t>>2]=e;c[u>>2]=-1;i=f;return}t=c[(c[b>>2]|0)+12>>2]|0;q=r;while(1){v=t+(q<<2)|0;w=c[v>>2]|0;r=(w>>>14)+ -131071|0;if((r|0)==-1){break}g=q+1+r|0;if((g|0)==-1){break}else{q=g}}t=e+~q|0;if((((t|0)>-1?t:0-t|0)|0)>131071){km(c[b+12>>2]|0,9744)}c[v>>2]=(t<<14)+2147467264|w&16383;c[u>>2]=-1;i=f;return}function zl(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;f=i;pl(b,e);g=e;h=c[g>>2]|0;a:do{if((h|0)==10){j=c[e+8>>2]|0;k=15}else if(!((h|0)==3|(h|0)==1)){l=e+8|0;do{if((h|0)==6){k=11}else if((h|0)==11){m=c[(c[(c[b>>2]|0)+12>>2]|0)+(c[l>>2]<<2)>>2]|0;if((m&63|0)!=20){k=6;break}n=b+20|0;c[n>>2]=(c[n>>2]|0)+ -1;j=Hl(b,27,m>>>23,0,0)|0;k=15;break a}else{k=6}}while(0);if((k|0)==6){m=b+48|0;n=a[m]|0;o=(n&255)+1|0;p=(c[b>>2]|0)+78|0;do{if(o>>>0>(d[p]|0)>>>0){if(o>>>0>249){km(c[b+12>>2]|0,9656)}else{a[p]=o;q=a[m]|0;break}}else{q=n}}while(0);n=(q&255)+1|0;a[m]=n;Il(b,e,(n&255)+ -1|0);if((c[g>>2]|0)==6){k=11}}do{if((k|0)==11){n=c[l>>2]|0;if((n&256|0)!=0){break}if((d[b+46|0]|0|0)>(n|0)){break}n=b+48|0;a[n]=(a[n]|0)+ -1<<24>>24}}while(0);j=Hl(b,28,255,c[l>>2]|0,1)|0;k=15}}while(0);do{if((k|0)==15){g=e+16|0;if((j|0)==-1){break}q=c[g>>2]|0;if((q|0)==-1){c[g>>2]=j;break}g=c[(c[b>>2]|0)+12>>2]|0;h=q;while(1){r=g+(h<<2)|0;s=c[r>>2]|0;q=(s>>>14)+ -131071|0;if((q|0)==-1){break}m=h+1+q|0;if((m|0)==-1){break}else{h=m}}g=j+~h|0;if((((g|0)>-1?g:0-g|0)|0)>131071){km(c[b+12>>2]|0,9744)}else{c[r>>2]=(g<<14)+2147467264|s&16383;break}}}while(0);s=e+20|0;e=c[s>>2]|0;c[b+24>>2]=c[b+20>>2];r=b+28|0;if((e|0)==-1){c[s>>2]=-1;i=f;return}j=c[r>>2]|0;if((j|0)==-1){c[r>>2]=e;c[s>>2]=-1;i=f;return}r=c[(c[b>>2]|0)+12>>2]|0;k=j;while(1){t=r+(k<<2)|0;u=c[t>>2]|0;j=(u>>>14)+ -131071|0;if((j|0)==-1){break}g=k+1+j|0;if((g|0)==-1){break}else{k=g}}r=e+~k|0;if((((r|0)>-1?r:0-r|0)|0)>131071){km(c[b+12>>2]|0,9744)}c[t>>2]=(r<<14)+2147467264|u&16383;c[s>>2]=-1;i=f;return}function Al(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;g=i;h=e+8|0;j=h;a[j+2|0]=c[h>>2];b[h>>1]=vl(d,f)|0;f=e;a[j+3|0]=(c[f>>2]|0)==8?8:7;c[f>>2]=9;i=g;return}function Bl(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;j=i;i=i+24|0;k=j;c[k+20>>2]=-1;c[k+16>>2]=-1;c[k>>2]=5;h[k+8>>3]=0.0;if((e|0)==0){l=f;do{if((c[l>>2]|0)==5){if(!((c[f+16>>2]|0)==-1)){break}if(!((c[f+20>>2]|0)==-1)){break}m=f+8|0;h[m>>3]=-+h[m>>3];i=j;return}}while(0);pl(b,f);do{if((c[l>>2]|0)==6){m=c[f+8>>2]|0;if((c[f+16>>2]|0)==(c[f+20>>2]|0)){break}if((m|0)<(d[b+46|0]|0)){n=10;break}rl(b,f,m)}else{n=10}}while(0);if((n|0)==10){ql(b,f)}Cl(b,19,f,k,g);i=j;return}else if((e|0)==1){pl(b,f);l=f;a:do{switch(c[l>>2]|0){case 2:case 5:case 4:{c[l>>2]=3;break};case 11:{m=b+48|0;o=a[m]|0;p=(o&255)+1|0;q=(c[b>>2]|0)+78|0;do{if(p>>>0>(d[q]|0)>>>0){if(p>>>0>249){km(c[b+12>>2]|0,9656)}else{a[q]=p;r=a[m]|0;break}}else{r=o}}while(0);o=(r&255)+1|0;a[m]=o;Il(b,f,(o&255)+ -1|0);if((c[l>>2]|0)==6){n=25;break a}s=f+8|0;n=28;break};case 10:{o=c[(c[b>>2]|0)+12>>2]|0;p=c[f+8>>2]|0;q=o+(p<<2)|0;if((p|0)>0){t=o+(p+ -1<<2)|0;p=c[t>>2]|0;if((a[4704+(p&63)|0]|0)<0){u=t;v=p}else{n=17}}else{n=17}if((n|0)==17){u=q;v=c[q>>2]|0}c[u>>2]=((v&16320|0)==0)<<6|v&-16321;break};case 3:case 1:{c[l>>2]=2;break};case 6:{n=25;break};default:{}}}while(0);do{if((n|0)==25){v=f+8|0;u=c[v>>2]|0;if((u&256|0)!=0){s=v;n=28;break}if((d[b+46|0]|0)>(u|0)){s=v;n=28;break}u=b+48|0;a[u]=(a[u]|0)+ -1<<24>>24;s=v;n=28}}while(0);if((n|0)==28){c[s>>2]=gl(b,c[s>>2]<<23|20)|0;c[l>>2]=11}l=f+20|0;s=c[l>>2]|0;v=f+16|0;u=c[v>>2]|0;c[l>>2]=u;c[v>>2]=s;if((u|0)==-1){w=s}else{s=c[(c[b>>2]|0)+12>>2]|0;l=u;do{u=s+(l<<2)|0;if((l|0)>0){r=s+(l+ -1<<2)|0;q=c[r>>2]|0;if((a[4704+(q&63)|0]|0)<0){x=r;y=q}else{n=33}}else{n=33}if((n|0)==33){n=0;x=u;y=c[u>>2]|0}if((y&63|0)==28){c[x>>2]=y&8372224|y>>>23<<6|27}q=((c[u>>2]|0)>>>14)+ -131071|0;if((q|0)==-1){break}l=l+1+q|0;}while(!((l|0)==-1));w=c[v>>2]|0}if((w|0)==-1){i=j;return}v=c[(c[b>>2]|0)+12>>2]|0;l=w;while(1){w=v+(l<<2)|0;if((l|0)>0){y=v+(l+ -1<<2)|0;x=c[y>>2]|0;if((a[4704+(x&63)|0]|0)<0){z=y;A=x}else{n=43}}else{n=43}if((n|0)==43){n=0;z=w;A=c[w>>2]|0}if((A&63|0)==28){c[z>>2]=A&8372224|A>>>23<<6|27}x=((c[w>>2]|0)>>>14)+ -131071|0;if((x|0)==-1){n=54;break}w=l+1+x|0;if((w|0)==-1){n=54;break}else{l=w}}if((n|0)==54){i=j;return}}else if((e|0)==2){pl(b,f);do{if((c[f>>2]|0)==6){e=c[f+8>>2]|0;if((c[f+16>>2]|0)==(c[f+20>>2]|0)){break}if((e|0)<(d[b+46|0]|0)){n=52;break}rl(b,f,e)}else{n=52}}while(0);if((n|0)==52){ql(b,f)}Cl(b,21,f,k,g);i=j;return}else{i=j;return}}function Cl(b,e,f,g,j){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;var k=0,l=0,m=0.0,n=0,o=0,p=0;k=i;l=f;do{if((c[l>>2]|0)==5){if(!((c[f+16>>2]|0)==-1)){break}if(!((c[f+20>>2]|0)==-1)){break}if((c[g>>2]|0)!=5){break}if(!((c[g+16>>2]|0)==-1)){break}if(!((c[g+20>>2]|0)==-1)){break}m=+h[g+8>>3];if((e&-2|0)==16&m==0.0){break}n=f+8|0;h[n>>3]=+Th(e+ -13|0,+h[n>>3],m);i=k;return}}while(0);if((e|0)==19|(e|0)==21){o=0}else{o=vl(b,g)|0}n=vl(b,f)|0;do{if((n|0)>(o|0)){do{if((c[l>>2]|0)==6){p=c[f+8>>2]|0;if((p&256|0)!=0){break}if((d[b+46|0]|0|0)>(p|0)){break}p=b+48|0;a[p]=(a[p]|0)+ -1<<24>>24}}while(0);if((c[g>>2]|0)!=6){break}p=c[g+8>>2]|0;if((p&256|0)!=0){break}if((d[b+46|0]|0|0)>(p|0)){break}p=b+48|0;a[p]=(a[p]|0)+ -1<<24>>24}else{do{if((c[g>>2]|0)==6){p=c[g+8>>2]|0;if((p&256|0)!=0){break}if((d[b+46|0]|0|0)>(p|0)){break}p=b+48|0;a[p]=(a[p]|0)+ -1<<24>>24}}while(0);if((c[l>>2]|0)!=6){break}p=c[f+8>>2]|0;if((p&256|0)!=0){break}if((d[b+46|0]|0|0)>(p|0)){break}p=b+48|0;a[p]=(a[p]|0)+ -1<<24>>24}}while(0);c[f+8>>2]=gl(b,o<<14|e|n<<23)|0;c[l>>2]=11;c[(c[(c[b>>2]|0)+20>>2]|0)+((c[b+20>>2]|0)+ -1<<2)>>2]=j;i=k;return}function Dl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=i;a:do{switch(b|0){case 14:{zl(a,d);break};case 6:{ql(a,d);break};case 13:{yl(a,d);break};case 5:case 4:case 3:case 2:case 1:case 0:{do{if((c[d>>2]|0)==5){if(!((c[d+16>>2]|0)==-1)){break}if((c[d+20>>2]|0)==-1){break a}}}while(0);vl(a,d)|0;break};default:{vl(a,d)|0}}}while(0);i=e;return}function El(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;j=i;switch(e|0){case 14:{pl(b,g);k=g+16|0;l=c[f+16>>2]|0;do{if(!((l|0)==-1)){m=c[k>>2]|0;if((m|0)==-1){c[k>>2]=l;break}n=c[(c[b>>2]|0)+12>>2]|0;o=m;while(1){p=n+(o<<2)|0;q=c[p>>2]|0;m=(q>>>14)+ -131071|0;if((m|0)==-1){break}r=o+1+m|0;if((r|0)==-1){break}else{o=r}}n=l+~o|0;if((((n|0)>-1?n:0-n|0)|0)>131071){km(c[b+12>>2]|0,9744)}else{c[p>>2]=(n<<14)+2147467264|q&16383;break}}}while(0);q=f;p=g;c[q+0>>2]=c[p+0>>2];c[q+4>>2]=c[p+4>>2];c[q+8>>2]=c[p+8>>2];c[q+12>>2]=c[p+12>>2];c[q+16>>2]=c[p+16>>2];c[q+20>>2]=c[p+20>>2];i=j;return};case 5:case 4:case 3:case 2:case 1:case 0:{Cl(b,e+13|0,f,g,h);i=j;return};case 13:{pl(b,g);p=g+20|0;q=c[f+20>>2]|0;do{if(!((q|0)==-1)){l=c[p>>2]|0;if((l|0)==-1){c[p>>2]=q;break}k=c[(c[b>>2]|0)+12>>2]|0;n=l;while(1){s=k+(n<<2)|0;t=c[s>>2]|0;l=(t>>>14)+ -131071|0;if((l|0)==-1){break}r=n+1+l|0;if((r|0)==-1){break}else{n=r}}k=q+~n|0;if((((k|0)>-1?k:0-k|0)|0)>131071){km(c[b+12>>2]|0,9744)}else{c[s>>2]=(k<<14)+2147467264|t&16383;break}}}while(0);t=f;s=g;c[t+0>>2]=c[s+0>>2];c[t+4>>2]=c[s+4>>2];c[t+8>>2]=c[s+8>>2];c[t+12>>2]=c[s+12>>2];c[t+16>>2]=c[s+16>>2];c[t+20>>2]=c[s+20>>2];i=j;return};case 9:case 8:case 7:{s=e+17|0;t=vl(b,f)|0;q=vl(b,g)|0;do{if((c[g>>2]|0)==6){p=c[g+8>>2]|0;if((p&256|0)!=0){break}if((d[b+46|0]|0|0)>(p|0)){break}p=b+48|0;a[p]=(a[p]|0)+ -1<<24>>24}}while(0);p=f;k=f+8|0;do{if((c[p>>2]|0)==6){o=c[k>>2]|0;if((o&256|0)!=0){break}if((d[b+46|0]|0|0)>(o|0)){break}o=b+48|0;a[o]=(a[o]|0)+ -1<<24>>24}}while(0);c[k>>2]=Hl(b,s,1,t,q)|0;c[p>>2]=10;i=j;return};case 12:case 11:case 10:{p=e+14|0;e=vl(b,f)|0;q=vl(b,g)|0;do{if((c[g>>2]|0)==6){t=c[g+8>>2]|0;if((t&256|0)!=0){break}if((d[b+46|0]|0|0)>(t|0)){break}t=b+48|0;a[t]=(a[t]|0)+ -1<<24>>24}}while(0);t=f;s=f+8|0;do{if((c[t>>2]|0)==6){k=c[s>>2]|0;if((k&256|0)!=0){break}if((d[b+46|0]|0|0)>(k|0)){break}k=b+48|0;a[k]=(a[k]|0)+ -1<<24>>24}}while(0);k=(p|0)==24;c[s>>2]=Hl(b,p,k&1^1,k?e:q,k?q:e)|0;c[t>>2]=10;i=j;return};case 6:{t=g+16|0;e=g+20|0;q=(c[t>>2]|0)==(c[e>>2]|0);pl(b,g);k=g;a:do{if(!q){do{if((c[k>>2]|0)==6){p=c[g+8>>2]|0;if((c[t>>2]|0)==(c[e>>2]|0)){break a}if((p|0)<(d[b+46|0]|0|0)){break}rl(b,g,p);break a}}while(0);ql(b,g)}}while(0);do{if((c[k>>2]|0)==11){e=g+8|0;t=c[e>>2]|0;q=(c[b>>2]|0)+12|0;n=c[q>>2]|0;p=c[n+(t<<2)>>2]|0;if((p&63|0)!=22){break}s=f;o=f+8|0;do{if((c[s>>2]|0)==6){r=c[o>>2]|0;if((r&256|0)!=0){u=p;v=n;w=t;break}if((d[b+46|0]|0|0)>(r|0)){u=p;v=n;w=t;break}r=b+48|0;a[r]=(a[r]|0)+ -1<<24>>24;r=c[e>>2]|0;l=c[q>>2]|0;u=c[l+(r<<2)>>2]|0;v=l;w=r}else{u=p;v=n;w=t}}while(0);c[v+(w<<2)>>2]=c[o>>2]<<23|u&8388607;c[s>>2]=11;c[o>>2]=c[e>>2];i=j;return}}while(0);ql(b,g);Cl(b,22,f,g,h);i=j;return};default:{i=j;return}}}function Fl(a,b){a=a|0;b=b|0;c[(c[(c[a>>2]|0)+20>>2]|0)+((c[a+20>>2]|0)+ -1<<2)>>2]=b;i=i;return}function Gl(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;g=i;h=((e+ -1|0)/50|0)+1|0;e=(f|0)==-1?0:f;if((h|0)<512){gl(b,d<<6|e<<23|h<<14|36)|0;j=d+1|0;k=j&255;l=b+48|0;a[l]=k;i=g;return}if((h|0)>=67108864){km(c[b+12>>2]|0,9696)}gl(b,d<<6|e<<23|36)|0;gl(b,h<<6|39)|0;j=d+1|0;k=j&255;l=b+48|0;a[l]=k;i=g;return}function Hl(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;gl(a,d<<6|b|e<<23|f<<14)|0;f=a+28|0;e=c[f>>2]|0;c[f>>2]=-1;f=gl(a,2147450903)|0;if((e|0)==-1){h=f;i=g;return h|0}if((f|0)==-1){h=e;i=g;return h|0}b=c[(c[a>>2]|0)+12>>2]|0;d=f;while(1){j=b+(d<<2)|0;k=c[j>>2]|0;l=(k>>>14)+ -131071|0;if((l|0)==-1){break}m=d+1+l|0;if((m|0)==-1){break}else{d=m}}b=e+~d|0;if((((b|0)>-1?b:0-b|0)|0)>131071){km(c[a+12>>2]|0,9744)}c[j>>2]=(b<<14)+2147467264|k&16383;h=f;i=g;return h|0}function Il(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0.0,v=0;f=i;i=i+24|0;g=f;j=f+8|0;pl(a,b);k=b;l=c[k>>2]|0;a:do{switch(l|0){case 4:{m=c[b+8>>2]|0;n=e<<6;if((m|0)<262144){gl(a,n|m<<14|1)|0;break a}else{gl(a,n|2)|0;gl(a,m<<6|39)|0;break a}break};case 2:case 3:{gl(a,e<<6|((l|0)==2)<<23|3)|0;break};case 1:{m=e+1|0;n=c[a+20>>2]|0;do{if((n|0)>(c[a+24>>2]|0)){o=(c[(c[a>>2]|0)+12>>2]|0)+(n+ -1<<2)|0;p=c[o>>2]|0;if((p&63|0)!=4){break}q=p>>>6&255;r=q+(p>>>23)|0;if((q|0)>(e|0)){s=6}else{if((r+1|0)<(e|0)){s=6}}if((s|0)==6){if((q|0)<(e|0)|(q|0)>(m|0)){break}}t=(q|0)<(e|0)?q:e;c[o>>2]=t<<6&16320|p&8372287|((r|0)>(e|0)?r:e)-t<<23;break a}}while(0);gl(a,e<<6|4)|0;break};case 11:{m=(c[(c[a>>2]|0)+12>>2]|0)+(c[b+8>>2]<<2)|0;c[m>>2]=c[m>>2]&-16321|e<<6&16320;break};case 5:{u=+h[b+8>>3];h[g>>3]=u;m=c[(c[a+12>>2]|0)+52>>2]|0;h[j>>3]=u;c[j+8>>2]=3;if(u!=u|0.0!=0.0|u==0.0){n=m+8|0;t=c[n>>2]|0;c[n>>2]=t+16;r=Si(m,g,8)|0;c[t>>2]=r;c[t+8>>2]=d[r+4|0]|0|64;r=ll(a,(c[n>>2]|0)+ -16|0,j)|0;c[n>>2]=(c[n>>2]|0)+ -16;v=r}else{v=ll(a,j,j)|0}r=e<<6;if((v|0)<262144){gl(a,r|v<<14|1)|0;break a}else{gl(a,r|2)|0;gl(a,v<<6|39)|0;break a}break};case 6:{r=c[b+8>>2]|0;if((r|0)==(e|0)){break a}gl(a,r<<23|e<<6)|0;break};default:{i=f;return}}}while(0);c[b+8>>2]=e;c[k>>2]=6;i=f;return}function Jl(a){a=a|0;var b=0;b=i;Md(a,0,6);$e(a,9776,0);i=b;return 1}function Kl(a){a=a|0;var b=0,c=0;b=i;Ae(a,1,6);c=Ii(a)|0;ed(a,1);Wc(a,c,1);i=b;return 1}function Ll(a){a=a|0;var b=0,c=0,d=0,e=0;b=i;c=td(a,1)|0;if((c|0)==0){me(a,1,9976)|0}d=Rl(a,c,(_c(a)|0)+ -1|0)|0;if((d|0)<0){Ed(a,0);bd(a,-2);e=2;i=b;return e|0}else{Ed(a,1);bd(a,~d);e=d+1|0;i=b;return e|0}return 0}function Ml(a){a=a|0;var b=0;b=i;Ed(a,Gd(a)|0);i=b;return 2}function Nl(a){a=a|0;var b=0,c=0,d=0,e=0;b=i;i=i+104|0;c=b;d=td(a,1)|0;if((d|0)==0){me(a,1,9976)|0}do{if((d|0)==(a|0)){zd(a,9848,7)|0}else{e=ae(d)|0;if((e|0)==1){zd(a,1e4,9)|0;break}else if((e|0)==0){if((mf(d,0,c)|0)>0){zd(a,10016,6)|0;break}if((_c(d)|0)==0){zd(a,10024,4)|0;break}else{zd(a,1e4,9)|0;break}}else{zd(a,10024,4)|0;break}}}while(0);i=b;return 1}function Ol(a){a=a|0;var b=0,c=0;b=i;Ae(a,1,6);c=Ii(a)|0;ed(a,1);Wc(a,c,1);Dd(a,165,1);i=b;return 1}function Pl(a){a=a|0;var b=0,c=0;b=i;c=Kf(a,_c(a)|0,0,0)|0;i=b;return c|0}function Ql(a){a=a|0;var b=0,c=0,d=0;b=i;c=td(a,-1001001)|0;d=Rl(a,c,_c(a)|0)|0;if((d|0)>=0){i=b;return d|0}if((jd(a,-1)|0)==0){ce(a)|0}pe(a,1);bd(a,-2);ee(a,2);ce(a)|0;return 0}function Rl(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=i;a:do{if((Uc(b,c)|0)==0){zd(a,9880,28)|0;e=-1}else{do{if((ae(b)|0)==0){if((_c(b)|0)!=0){break}zd(a,9912,28)|0;e=-1;break a}}while(0);Wc(a,b,c);if(!((Hf(b,a,c)|0)>>>0<2)){Wc(b,a,1);e=-1;break}f=_c(b)|0;if((Uc(a,f+1|0)|0)==0){$c(b,~f);zd(a,9944,26)|0;e=-1;break}else{Wc(b,a,f);e=f;break}}}while(0);i=d;return e|0}function Sl(a){a=a|0;var b=0;b=i;Md(a,0,16);$e(a,10296,0);i=b;return 1}function Tl(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;b=i;i=i+8|0;d=b;e=i;i=i+256|0;f=e;e=c[p>>2]|0;qb(11160,11,1,e|0)|0;ec(e|0)|0;g=c[q>>2]|0;if((jc(f|0,250,g|0)|0)==0){i=b;return 0}while(1){if((Nm(f,11176)|0)==0){h=7;break}if((Se(a,f,Um(f|0)|0,11184,0)|0)==0){if((Yd(a,0,0,0,0,0)|0)!=0){h=5}}else{h=5}if((h|0)==5){h=0;c[d>>2]=qd(a,-1,0)|0;sb(e|0,11208,d|0)|0;ec(e|0)|0}$c(a,0);qb(11160,11,1,e|0)|0;ec(e|0)|0;if((jc(f|0,250,g|0)|0)==0){h=7;break}}if((h|0)==7){i=b;return 0}return 0}function Ul(a){a=a|0;var b=0;b=i;if((fd(a,1)|0)==7){Od(a,1)}else{vd(a)}i=b;return 1}function Vl(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;c=i;i=i+8|0;d=c;if((fd(b,1)|0)==8){e=td(b,1)|0}else{e=b}f=kf(e)|0;g=jf(e)|0;if((g|0)!=0&(g|0)!=8){zd(b,11144,13)|0}else{af(b,-1001e3,10704)|0;Gd(e)|0;Wc(e,b,1);Kd(b,-2);ad(b,-2)}g=d;if((f&1|0)==0){h=0}else{a[g]=99;h=1}if((f&2|0)==0){j=h}else{a[d+h|0]=114;j=h+1|0}if((f&4|0)==0){k=j;l=d+k|0;a[l]=0;Ad(b,g)|0;m=lf(e)|0;xd(b,m);i=c;return 3}a[d+j|0]=108;k=j+1|0;l=d+k|0;a[l]=0;Ad(b,g)|0;m=lf(e)|0;xd(b,m);i=c;return 3}function Wl(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;e=i;i=i+8|0;f=e;g=i;i=i+104|0;if((fd(b,1)|0)==8){h=td(b,1)|0;j=1}else{h=b;j=0}k=j|2;l=xe(b,k,10904,0)|0;m=j+1|0;do{if((id(b,m)|0)==0){if((fd(b,m)|0)==6){c[f>>2]=l;Cd(b,10912,f)|0;j=qd(b,-1,0)|0;ed(b,m);Wc(b,h,1);n=j;break}o=me(b,m,10920)|0;i=e;return o|0}else{if((mf(h,nd(b,m,0)|0,g)|0)!=0){n=l;break}vd(b);o=1;i=e;return o|0}}while(0);if((qf(h,n,g)|0)==0){o=me(b,k,10952)|0;i=e;return o|0}Md(b,0,2);if((hb(n|0,83)|0)!=0){Ad(b,c[g+16>>2]|0)|0;Rd(b,-2,10968);Ad(b,g+36|0)|0;Rd(b,-2,10976);xd(b,c[g+24>>2]|0);Rd(b,-2,10992);xd(b,c[g+28>>2]|0);Rd(b,-2,11008);Ad(b,c[g+12>>2]|0)|0;Rd(b,-2,11024)}if((hb(n|0,108)|0)!=0){xd(b,c[g+20>>2]|0);Rd(b,-2,11032)}if((hb(n|0,117)|0)!=0){xd(b,d[g+32|0]|0);Rd(b,-2,11048);xd(b,d[g+33|0]|0);Rd(b,-2,11056);Ed(b,a[g+34|0]|0);Rd(b,-2,11064)}if((hb(n|0,110)|0)!=0){Ad(b,c[g+4>>2]|0)|0;Rd(b,-2,11080);Ad(b,c[g+8>>2]|0)|0;Rd(b,-2,11088)}if((hb(n|0,116)|0)!=0){Ed(b,a[g+35|0]|0);Rd(b,-2,11104)}if((hb(n|0,76)|0)!=0){if((h|0)==(b|0)){ed(b,-2);ad(b,-3)}else{Wc(h,b,1)}Rd(b,-2,11120)}if((hb(n|0,102)|0)==0){o=1;i=e;return o|0}if((h|0)==(b|0)){ed(b,-2);ad(b,-3)}else{Wc(h,b,1)}Rd(b,-2,11136);o=1;i=e;return o|0}function Xl(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0;b=i;i=i+104|0;c=b;if((fd(a,1)|0)==8){d=td(a,1)|0;e=1}else{d=a;e=0}f=Ee(a,e|2)|0;g=e+1|0;if((fd(a,g)|0)==6){ed(a,g);Ad(a,nf(a,0,f)|0)|0;h=1;i=b;return h|0}if((mf(d,Ee(a,g)|0,c)|0)==0){h=me(a,g,10680)|0;i=b;return h|0}g=nf(d,c,f)|0;if((g|0)==0){vd(a);h=1;i=b;return h|0}else{Wc(d,a,1);Ad(a,g)|0;ed(a,-2);h=2;i=b;return h|0}return 0}function Yl(a){a=a|0;var b=0;b=i;ed(a,-1001e3);i=b;return 1}function Zl(a){a=a|0;var b=0;b=i;Be(a,1);if((Nd(a,1)|0)==0){vd(a)}i=b;return 1}function _l(a){a=a|0;var b=0,c=0,d=0,e=0;b=i;c=Ee(a,2)|0;Ae(a,1,6);d=he(a,1,c)|0;if((d|0)==0){e=0;i=b;return e|0}Ad(a,d)|0;bd(a,-2);e=2;i=b;return e|0}function $l(a){a=a|0;var b=0,c=0,e=0,f=0,g=0;b=i;i=i+208|0;c=b;e=b+104|0;f=Ee(a,2)|0;Ae(a,1,6);ed(a,1);qf(a,10848,e)|0;if((f|0)>0){if((f|0)>(d[e+32|0]|0|0)){g=3}}else{g=3}if((g|0)==3){me(a,2,10856)|0}e=Ee(a,4)|0;Ae(a,3,6);ed(a,3);qf(a,10848,c)|0;if((e|0)>0){if((e|0)>(d[c+32|0]|0|0)){g=6}}else{g=6}if((g|0)==6){me(a,4,10856)|0}if((hd(a,1)|0)!=0){me(a,1,10880)|0}if((hd(a,3)|0)==0){ke(a,1,f,3,e);i=b;return 0}me(a,3,10880)|0;ke(a,1,f,3,e);i=b;return 0}function am(a){a=a|0;var b=0,c=0,e=0,f=0;b=i;i=i+104|0;c=b;e=Ee(a,2)|0;Ae(a,1,6);ed(a,1);qf(a,10848,c)|0;if((e|0)>0){if((e|0)>(d[c+32|0]|0|0)){f=3}}else{f=3}if((f|0)==3){me(a,2,10856)|0}Fd(a,je(a,1,e)|0);i=b;return 1}function bm(a){a=a|0;var b=0;b=i;if((fd(a,1)|0)==2){me(a,1,10800)|0}Ae(a,1,7);if((fd(a,2)|0)>=1){Ae(a,2,5)}$c(a,2);Vd(a,1);i=b;return 1}function cm(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;b=i;if((fd(a,1)|0)==8){c=td(a,1)|0;d=1}else{c=a;d=0}e=d+1|0;if((fd(a,e)|0)<1){$c(a,e);f=0;g=0;h=0}else{j=ye(a,d|2,0)|0;Ae(a,e,6);k=Ge(a,d+3|0,0)|0;d=(hb(j|0,99)|0)!=0|0;l=(hb(j|0,114)|0)==0;m=l?d:d|2;d=(hb(j|0,108)|0)==0;j=d?m:m|4;f=k;g=8;h=(k|0)>0?j|8:j}if((af(a,-1001e3,10704)|0)!=0){Gd(c)|0;Wc(c,a,1);ed(a,e);Sd(a,-3);hf(c,g,h,f)|0;i=b;return 0}Ad(a,10712)|0;Rd(a,-2,10720);ed(a,-1);Ud(a,-2)|0;Gd(c)|0;Wc(c,a,1);ed(a,e);Sd(a,-3);hf(c,g,h,f)|0;i=b;return 0}function dm(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0;b=i;i=i+104|0;c=b;if((fd(a,1)|0)==8){d=td(a,1)|0;e=1}else{d=a;e=0}f=e+1|0;if((mf(d,Ee(a,f)|0,c)|0)==0){g=me(a,f,10680)|0;i=b;return g|0}else{f=e+3|0;Be(a,f);$c(a,f);Wc(a,d,1);Ad(a,pf(d,c,Ee(a,e|2)|0)|0)|0;g=1;i=b;return g|0}return 0}function em(a){a=a|0;var b=0,c=0;b=i;c=fd(a,2)|0;if(!((c|0)==0|(c|0)==5)){me(a,2,10656)|0}$c(a,2);Ud(a,1)|0;i=b;return 1}function fm(a){a=a|0;var b=0,c=0,d=0,e=0;b=i;Be(a,3);c=Ee(a,2)|0;Ae(a,1,6);d=ie(a,1,c)|0;if((d|0)==0){e=0;i=b;return e|0}Ad(a,d)|0;bd(a,-1);e=1;i=b;return e|0}function gm(a){a=a|0;var b=0,c=0,d=0,e=0,f=0;b=i;if((fd(a,1)|0)==8){c=td(a,1)|0;d=1}else{c=a;d=0}e=d+1|0;f=qd(a,e,0)|0;do{if((f|0)==0){if((fd(a,e)|0)<1){break}ed(a,e);i=b;return 1}}while(0);le(a,c,f,Ge(a,d|2,(c|0)==(a|0)|0)|0);i=b;return 1}function hm(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;af(a,-1001e3,10704)|0;Gd(a)|0;Kd(a,-2);if((fd(a,-1)|0)!=6){i=d;return}Ad(a,c[10728+(c[b>>2]<<2)>>2]|0)|0;e=c[b+20>>2]|0;if((e|0)>-1){xd(a,e)}else{vd(a)}Xd(a,2,0,0,0);i=d;return}function im(b){b=b|0;var e=0,f=0,g=0,h=0;e=i;f=0;do{g=Ti(b,c[11216+(f<<2)>>2]|0)|0;h=g+5|0;a[h]=d[h]|0|32;f=f+1|0;a[g+6|0]=f;}while((f|0)!=22);i=e;return}function jm(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;e=i;i=i+8|0;f=e;g=i;i=i+8|0;h=i;i=i+8|0;if((d|0)>=257){j=c[11216+(d+ -257<<2)>>2]|0;if((d|0)>=286){k=j;i=e;return k|0}l=c[b+52>>2]|0;c[f>>2]=j;k=Xh(l,11376,f)|0;i=e;return k|0}f=c[b+52>>2]|0;if((a[d+10033|0]&4)==0){c[g>>2]=d;k=Xh(f,11360,g)|0;i=e;return k|0}else{c[h>>2]=d;k=Xh(f,11352,h)|0;i=e;return k|0}return 0}function km(a,b){a=a|0;b=b|0;lm(a,b,c[a+16>>2]|0)}function lm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;f=i;i=i+8|0;g=f;f=i;i=i+8|0;h=i;i=i+8|0;j=i;i=i+8|0;k=i;i=i+8|0;l=i;i=i+16|0;m=i;i=i+64|0;n=m;Yh(n,(c[b+68>>2]|0)+16|0,60);m=b+52|0;o=c[m>>2]|0;p=c[b+4>>2]|0;c[l>>2]=n;c[l+4>>2]=p;c[l+8>>2]=d;d=Xh(o,11712,l)|0;if((e|0)==0){q=c[m>>2]|0;yf(q,3)}l=c[m>>2]|0;do{if((e+ -287|0)>>>0<3){o=b+60|0;p=c[o>>2]|0;n=p+4|0;r=c[n>>2]|0;s=p+8|0;t=c[s>>2]|0;do{if((r+1|0)>>>0>t>>>0){if(t>>>0>2147483645){lm(b,11488,0)}u=t<<1;if((u|0)==-2){zh(l)}else{v=p;w=Ah(l,c[v>>2]|0,t,u)|0;c[v>>2]=w;c[s>>2]=u;x=w;y=c[n>>2]|0;break}}else{x=c[p>>2]|0;y=r}}while(0);c[n>>2]=y+1;a[x+y|0]=0;r=c[m>>2]|0;c[k>>2]=c[c[o>>2]>>2];z=Xh(r,11376,k)|0}else{if((e|0)>=257){r=c[11216+(e+ -257<<2)>>2]|0;if((e|0)>=286){z=r;break}c[f>>2]=r;z=Xh(l,11376,f)|0;break}if((a[e+10033|0]&4)==0){c[h>>2]=e;z=Xh(l,11360,h)|0;break}else{c[j>>2]=e;z=Xh(l,11352,j)|0;break}}}while(0);c[g>>2]=d;c[g+4>>2]=z;Xh(l,11728,g)|0;q=c[m>>2]|0;yf(q,3)}function mm(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;g=c[a+52>>2]|0;h=Si(g,b,e)|0;e=g+8|0;b=c[e>>2]|0;c[e>>2]=b+16;c[b>>2]=h;c[b+8>>2]=d[h+4|0]|0|64;b=sj(g,c[(c[a+48>>2]|0)+4>>2]|0,(c[e>>2]|0)+ -16|0)|0;a=b+8|0;do{if((c[a>>2]|0)==0){c[b>>2]=1;c[a>>2]=1;if((c[(c[g+12>>2]|0)+12>>2]|0)<=0){j=h;break}mg(g);j=h}else{j=c[b+16>>2]|0}}while(0);c[e>>2]=(c[e>>2]|0)+ -16;i=f;return j|0}function nm(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;j=i;a[e+76|0]=46;k=e+52|0;c[k>>2]=b;c[e>>2]=h;c[e+32>>2]=286;c[e+56>>2]=f;c[e+48>>2]=0;c[e+4>>2]=1;c[e+8>>2]=1;c[e+68>>2]=g;g=Ti(b,11384)|0;c[e+72>>2]=g;b=g+5|0;a[b]=d[b]|0|32;b=e+60|0;e=c[b>>2]|0;g=Ah(c[k>>2]|0,c[e>>2]|0,c[e+8>>2]|0,32)|0;c[c[b>>2]>>2]=g;c[(c[b>>2]|0)+8>>2]=32;i=j;return}function om(a){a=a|0;var b=0,d=0,e=0,f=0;b=i;c[a+8>>2]=c[a+4>>2];d=a+32|0;e=d;if((c[e>>2]|0)==286){c[a+16>>2]=pm(a,a+24|0)|0;i=b;return}else{f=a+16|0;a=d;c[f+0>>2]=c[a+0>>2];c[f+4>>2]=c[a+4>>2];c[f+8>>2]=c[a+8>>2];c[f+12>>2]=c[a+12>>2];c[e>>2]=286;i=b;return}}function pm(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0;f=i;i=i+16|0;g=f;h=b+60|0;c[(c[h>>2]|0)+4>>2]=0;j=b;k=b+56|0;a:while(1){l=c[j>>2]|0;b:while(1){switch(l|0){case 45:{break b;break};case 58:{m=61;break a;break};case 60:{m=37;break a;break};case 62:{m=45;break a;break};case 91:{m=25;break a;break};case 61:{m=29;break a;break};case 13:case 10:{m=4;break b;break};case 11:case 9:case 12:case 32:{break};case 39:case 34:{m=69;break a;break};case 126:{m=53;break a;break};case 46:{m=162;break a;break};case 57:case 56:case 55:case 54:case 53:case 52:case 51:case 50:case 49:case 48:{n=l;break a;break};case-1:{o=286;m=308;break a;break};default:{m=284;break a}}p=c[k>>2]|0;q=p;r=c[q>>2]|0;c[q>>2]=r+ -1;if((r|0)==0){s=ek(p)|0}else{r=p+4|0;p=c[r>>2]|0;c[r>>2]=p+1;s=d[p]|0}c[j>>2]=s;l=s}if((m|0)==4){m=0;rm(b);continue}p=c[k>>2]|0;r=p;q=c[r>>2]|0;c[r>>2]=q+ -1;if((q|0)==0){t=ek(p)|0}else{q=p+4|0;p=c[q>>2]|0;c[q>>2]=p+1;t=d[p]|0}c[j>>2]=t;if((t|0)!=45){o=45;m=308;break}p=c[k>>2]|0;q=p;r=c[q>>2]|0;c[q>>2]=r+ -1;if((r|0)==0){u=ek(p)|0}else{r=p+4|0;p=c[r>>2]|0;c[r>>2]=p+1;u=d[p]|0}c[j>>2]=u;do{if((u|0)==91){p=sm(b)|0;c[(c[h>>2]|0)+4>>2]=0;if((p|0)>-1){tm(b,0,p);c[(c[h>>2]|0)+4>>2]=0;continue a}else{v=c[j>>2]|0;break}}else{v=u}}while(0);while(1){if((v|0)==-1|(v|0)==13|(v|0)==10){continue a}p=c[k>>2]|0;r=p;q=c[r>>2]|0;c[r>>2]=q+ -1;if((q|0)==0){w=ek(p)|0}else{q=p+4|0;p=c[q>>2]|0;c[q>>2]=p+1;w=d[p]|0}c[j>>2]=w;v=w}}do{if((m|0)==25){w=sm(b)|0;if((w|0)>-1){tm(b,e,w);o=289;i=f;return o|0}if((w|0)==-1){o=91;i=f;return o|0}else{lm(b,11392,289)}}else if((m|0)==29){w=c[k>>2]|0;v=w;u=c[v>>2]|0;c[v>>2]=u+ -1;if((u|0)==0){x=ek(w)|0}else{u=w+4|0;w=c[u>>2]|0;c[u>>2]=w+1;x=d[w]|0}c[j>>2]=x;if((x|0)!=61){o=61;i=f;return o|0}w=c[k>>2]|0;u=w;v=c[u>>2]|0;c[u>>2]=v+ -1;if((v|0)==0){y=ek(w)|0}else{v=w+4|0;w=c[v>>2]|0;c[v>>2]=w+1;y=d[w]|0}c[j>>2]=y;o=281;i=f;return o|0}else if((m|0)==37){w=c[k>>2]|0;v=w;u=c[v>>2]|0;c[v>>2]=u+ -1;if((u|0)==0){z=ek(w)|0}else{u=w+4|0;w=c[u>>2]|0;c[u>>2]=w+1;z=d[w]|0}c[j>>2]=z;if((z|0)!=61){o=60;i=f;return o|0}w=c[k>>2]|0;u=w;v=c[u>>2]|0;c[u>>2]=v+ -1;if((v|0)==0){A=ek(w)|0}else{v=w+4|0;w=c[v>>2]|0;c[v>>2]=w+1;A=d[w]|0}c[j>>2]=A;o=283;i=f;return o|0}else if((m|0)==45){w=c[k>>2]|0;v=w;u=c[v>>2]|0;c[v>>2]=u+ -1;if((u|0)==0){B=ek(w)|0}else{u=w+4|0;w=c[u>>2]|0;c[u>>2]=w+1;B=d[w]|0}c[j>>2]=B;if((B|0)!=61){o=62;i=f;return o|0}w=c[k>>2]|0;u=w;v=c[u>>2]|0;c[u>>2]=v+ -1;if((v|0)==0){C=ek(w)|0}else{v=w+4|0;w=c[v>>2]|0;c[v>>2]=w+1;C=d[w]|0}c[j>>2]=C;o=282;i=f;return o|0}else if((m|0)==53){w=c[k>>2]|0;v=w;u=c[v>>2]|0;c[v>>2]=u+ -1;if((u|0)==0){D=ek(w)|0}else{u=w+4|0;w=c[u>>2]|0;c[u>>2]=w+1;D=d[w]|0}c[j>>2]=D;if((D|0)!=61){o=126;i=f;return o|0}w=c[k>>2]|0;u=w;v=c[u>>2]|0;c[u>>2]=v+ -1;if((v|0)==0){E=ek(w)|0}else{v=w+4|0;w=c[v>>2]|0;c[v>>2]=w+1;E=d[w]|0}c[j>>2]=E;o=284;i=f;return o|0}else if((m|0)==61){w=c[k>>2]|0;v=w;u=c[v>>2]|0;c[v>>2]=u+ -1;if((u|0)==0){F=ek(w)|0}else{u=w+4|0;w=c[u>>2]|0;c[u>>2]=w+1;F=d[w]|0}c[j>>2]=F;if((F|0)!=58){o=58;i=f;return o|0}w=c[k>>2]|0;u=w;v=c[u>>2]|0;c[u>>2]=v+ -1;if((v|0)==0){G=ek(w)|0}else{v=w+4|0;w=c[v>>2]|0;c[v>>2]=w+1;G=d[w]|0}c[j>>2]=G;o=285;i=f;return o|0}else if((m|0)==69){w=c[h>>2]|0;v=w+4|0;u=c[v>>2]|0;t=w+8|0;s=c[t>>2]|0;do{if((u+1|0)>>>0>s>>>0){if(s>>>0>2147483645){lm(b,11488,0)}p=s<<1;q=c[b+52>>2]|0;if((p|0)==-2){zh(q)}else{r=w;H=Ah(q,c[r>>2]|0,s,p)|0;c[r>>2]=H;c[t>>2]=p;I=H;J=c[v>>2]|0;break}}else{I=c[w>>2]|0;J=u}}while(0);u=l&255;c[v>>2]=J+1;a[I+J|0]=u;w=c[k>>2]|0;t=w;s=c[t>>2]|0;c[t>>2]=s+ -1;if((s|0)==0){K=ek(w)|0}else{s=w+4|0;w=c[s>>2]|0;c[s>>2]=w+1;K=d[w]|0}c[j>>2]=K;c:do{if((K|0)!=(l|0)){w=b+52|0;s=g;t=K;d:while(1){e:do{if((t|0)==-1){m=82;break d}else if((t|0)==13|(t|0)==10){m=83;break d}else if((t|0)==92){H=c[k>>2]|0;p=H;r=c[p>>2]|0;c[p>>2]=r+ -1;if((r|0)==0){L=ek(H)|0}else{r=H+4|0;H=c[r>>2]|0;c[r>>2]=H+1;L=d[H]|0}c[j>>2]=L;switch(L|0){case-1:{M=-1;break e;break};case 98:{N=8;m=124;break};case 102:{N=12;m=124;break};case 110:{N=10;m=124;break};case 114:{N=13;m=124;break};case 116:{N=9;m=124;break};case 118:{N=11;m=124;break};case 120:{c[s>>2]=120;O=1;H=0;while(1){r=c[k>>2]|0;p=r;q=c[p>>2]|0;c[p>>2]=q+ -1;if((q|0)==0){P=ek(r)|0}else{q=r+4|0;r=c[q>>2]|0;c[q>>2]=r+1;P=d[r]|0}c[j>>2]=P;c[g+(O<<2)>>2]=P;if((a[P+10033|0]&16)==0){m=100;break d}r=(Uh(P)|0)+(H<<4)|0;q=O+1|0;if((q|0)<3){O=q;H=r}else{N=r;m=124;break}}break};case 13:case 10:{rm(b);Q=10;break};case 39:case 34:case 92:{N=L;m=124;break};case 122:{H=c[k>>2]|0;r=H;q=c[r>>2]|0;c[r>>2]=q+ -1;if((q|0)==0){R=ek(H)|0}else{q=H+4|0;H=c[q>>2]|0;c[q>>2]=H+1;R=d[H]|0}c[j>>2]=R;if((a[R+10033|0]&8)==0){M=R;break e}else{S=R}while(1){if((S|0)==13|(S|0)==10){rm(b);T=c[j>>2]|0}else{H=c[k>>2]|0;q=H;r=c[q>>2]|0;c[q>>2]=r+ -1;if((r|0)==0){U=ek(H)|0}else{r=H+4|0;H=c[r>>2]|0;c[r>>2]=H+1;U=d[H]|0}c[j>>2]=U;T=U}if((a[T+10033|0]&8)==0){M=T;break e}else{S=T}}break};case 97:{N=7;m=124;break};default:{if((a[L+10033|0]&2)==0){m=116;break d}else{V=L;W=0;X=0}while(1){if((a[V+10033|0]&2)==0){Y=W;Z=X;break}c[g+(W<<2)>>2]=V;H=V+ -48+(X*10|0)|0;r=c[k>>2]|0;q=r;p=c[q>>2]|0;c[q>>2]=p+ -1;if((p|0)==0){_=ek(r)|0}else{p=r+4|0;r=c[p>>2]|0;c[p>>2]=r+1;_=d[r]|0}c[j>>2]=_;r=W+1|0;if((r|0)<3){V=_;W=r;X=H}else{Y=r;Z=H;break}}if((Z|0)>255){m=123;break d}else{Q=Z}}}if((m|0)==124){m=0;H=c[k>>2]|0;r=H;p=c[r>>2]|0;c[r>>2]=p+ -1;if((p|0)==0){$=ek(H)|0}else{p=H+4|0;H=c[p>>2]|0;c[p>>2]=H+1;$=d[H]|0}c[j>>2]=$;Q=N}H=c[h>>2]|0;p=H+4|0;r=c[p>>2]|0;q=H+8|0;aa=c[q>>2]|0;if((r+1|0)>>>0>aa>>>0){if(aa>>>0>2147483645){m=131;break d}ba=aa<<1;ca=c[w>>2]|0;if((ba|0)==-2){m=133;break d}da=H;ea=Ah(ca,c[da>>2]|0,aa,ba)|0;c[da>>2]=ea;c[q>>2]=ba;fa=ea;ga=c[p>>2]|0}else{fa=c[H>>2]|0;ga=r}c[p>>2]=ga+1;a[fa+ga|0]=Q;M=c[j>>2]|0}else{p=c[h>>2]|0;r=p+4|0;H=c[r>>2]|0;ea=p+8|0;ba=c[ea>>2]|0;if((H+1|0)>>>0>ba>>>0){if(ba>>>0>2147483645){m=139;break d}q=ba<<1;ha=c[w>>2]|0;if((q|0)==-2){m=141;break d}da=p;aa=Ah(ha,c[da>>2]|0,ba,q)|0;c[da>>2]=aa;c[ea>>2]=q;ia=aa;ja=c[r>>2]|0}else{ia=c[p>>2]|0;ja=H}c[r>>2]=ja+1;a[ia+ja|0]=t;r=c[k>>2]|0;H=r;p=c[H>>2]|0;c[H>>2]=p+ -1;if((p|0)==0){ka=ek(r)|0}else{p=r+4|0;r=c[p>>2]|0;c[p>>2]=r+1;ka=d[r]|0}c[j>>2]=ka;M=ka}}while(0);if((M|0)==(l|0)){break c}else{t=M}}if((m|0)==82){lm(b,11520,286)}else if((m|0)==83){lm(b,11520,289)}else if((m|0)==100){vm(b,s,O+1|0,11600)}else if((m|0)==116){vm(b,j,1,11544)}else if((m|0)==123){vm(b,s,Y,11568)}else if((m|0)==131){lm(b,11488,0)}else if((m|0)==133){zh(ca)}else if((m|0)==139){lm(b,11488,0)}else if((m|0)==141){zh(ha)}}}while(0);v=c[h>>2]|0;t=v+4|0;w=c[t>>2]|0;r=v+8|0;p=c[r>>2]|0;do{if((w+1|0)>>>0>p>>>0){if(p>>>0>2147483645){lm(b,11488,0)}H=p<<1;aa=c[b+52>>2]|0;if((H|0)==-2){zh(aa)}else{q=v;ea=Ah(aa,c[q>>2]|0,p,H)|0;c[q>>2]=ea;c[r>>2]=H;la=ea;ma=c[t>>2]|0;break}}else{la=c[v>>2]|0;ma=w}}while(0);c[t>>2]=ma+1;a[la+ma|0]=u;w=c[k>>2]|0;v=w;r=c[v>>2]|0;c[v>>2]=r+ -1;if((r|0)==0){na=ek(w)|0}else{r=w+4|0;w=c[r>>2]|0;c[r>>2]=w+1;na=d[w]|0}c[j>>2]=na;w=c[h>>2]|0;r=c[b+52>>2]|0;v=Si(r,(c[w>>2]|0)+1|0,(c[w+4>>2]|0)+ -2|0)|0;w=r+8|0;p=c[w>>2]|0;c[w>>2]=p+16;c[p>>2]=v;c[p+8>>2]=d[v+4|0]|64;p=sj(r,c[(c[b+48>>2]|0)+4>>2]|0,(c[w>>2]|0)+ -16|0)|0;ea=p+8|0;do{if((c[ea>>2]|0)==0){c[p>>2]=1;c[ea>>2]=1;if((c[(c[r+12>>2]|0)+12>>2]|0)<=0){oa=v;break}mg(r);oa=v}else{oa=c[p+16>>2]|0}}while(0);c[w>>2]=(c[w>>2]|0)+ -16;c[e>>2]=oa;o=289;i=f;return o|0}else if((m|0)==162){p=c[h>>2]|0;v=p+4|0;r=c[v>>2]|0;ea=p+8|0;u=c[ea>>2]|0;do{if((r+1|0)>>>0>u>>>0){if(u>>>0>2147483645){lm(b,11488,0)}t=u<<1;H=c[b+52>>2]|0;if((t|0)==-2){zh(H)}else{q=p;aa=Ah(H,c[q>>2]|0,u,t)|0;c[q>>2]=aa;c[ea>>2]=t;pa=aa;qa=c[v>>2]|0;break}}else{pa=c[p>>2]|0;qa=r}}while(0);c[v>>2]=qa+1;a[pa+qa|0]=46;r=c[k>>2]|0;p=r;ea=c[p>>2]|0;c[p>>2]=ea+ -1;if((ea|0)==0){ra=ek(r)|0}else{ea=r+4|0;r=c[ea>>2]|0;c[ea>>2]=r+1;ra=d[r]|0}c[j>>2]=ra;do{if((ra|0)!=0){if((ua(11424,ra|0,2)|0)==0){break}r=c[h>>2]|0;ea=r+4|0;p=c[ea>>2]|0;u=r+8|0;w=c[u>>2]|0;do{if((p+1|0)>>>0>w>>>0){if(w>>>0>2147483645){lm(b,11488,0)}aa=w<<1;t=c[b+52>>2]|0;if((aa|0)==-2){zh(t)}else{q=r;H=Ah(t,c[q>>2]|0,w,aa)|0;c[q>>2]=H;c[u>>2]=aa;sa=H;ta=c[ea>>2]|0;break}}else{sa=c[r>>2]|0;ta=p}}while(0);c[ea>>2]=ta+1;a[sa+ta|0]=ra;p=c[k>>2]|0;r=p;u=c[r>>2]|0;c[r>>2]=u+ -1;if((u|0)==0){va=ek(p)|0}else{u=p+4|0;p=c[u>>2]|0;c[u>>2]=p+1;va=d[p]|0}c[j>>2]=va;if((va|0)==0){o=279;i=f;return o|0}if((ua(11424,va|0,2)|0)==0){o=279;i=f;return o|0}p=c[h>>2]|0;u=p+4|0;r=c[u>>2]|0;w=p+8|0;s=c[w>>2]|0;do{if((r+1|0)>>>0>s>>>0){if(s>>>0>2147483645){lm(b,11488,0)}H=s<<1;aa=c[b+52>>2]|0;if((H|0)==-2){zh(aa)}else{q=p;t=Ah(aa,c[q>>2]|0,s,H)|0;c[q>>2]=t;c[w>>2]=H;wa=t;xa=c[u>>2]|0;break}}else{wa=c[p>>2]|0;xa=r}}while(0);c[u>>2]=xa+1;a[wa+xa|0]=va;r=c[k>>2]|0;p=r;w=c[p>>2]|0;c[p>>2]=w+ -1;if((w|0)==0){ya=ek(r)|0}else{w=r+4|0;r=c[w>>2]|0;c[w>>2]=r+1;ya=d[r]|0}c[j>>2]=ya;o=280;i=f;return o|0}}while(0);if((a[ra+10033|0]&2)==0){o=46}else{n=ra;break}i=f;return o|0}else if((m|0)==284){if((a[l+10033|0]&1)==0){v=c[k>>2]|0;r=v;w=c[r>>2]|0;c[r>>2]=w+ -1;if((w|0)==0){za=ek(v)|0}else{w=v+4|0;v=c[w>>2]|0;c[w>>2]=v+1;za=d[v]|0}c[j>>2]=za;o=l;i=f;return o|0}v=b+52|0;w=l;while(1){r=c[h>>2]|0;p=r+4|0;s=c[p>>2]|0;ea=r+8|0;t=c[ea>>2]|0;if((s+1|0)>>>0>t>>>0){if(t>>>0>2147483645){m=289;break}H=t<<1;Aa=c[v>>2]|0;if((H|0)==-2){m=291;break}q=r;aa=Ah(Aa,c[q>>2]|0,t,H)|0;c[q>>2]=aa;c[ea>>2]=H;Ba=aa;Ca=c[p>>2]|0}else{Ba=c[r>>2]|0;Ca=s}c[p>>2]=Ca+1;a[Ba+Ca|0]=w;p=c[k>>2]|0;s=p;r=c[s>>2]|0;c[s>>2]=r+ -1;if((r|0)==0){Da=ek(p)|0}else{r=p+4|0;p=c[r>>2]|0;c[r>>2]=p+1;Da=d[p]|0}c[j>>2]=Da;if((a[Da+10033|0]&3)==0){m=297;break}else{w=Da}}if((m|0)==289){lm(b,11488,0)}else if((m|0)==291){zh(Aa)}else if((m|0)==297){w=c[h>>2]|0;p=c[v>>2]|0;r=Si(p,c[w>>2]|0,c[w+4>>2]|0)|0;w=p+8|0;s=c[w>>2]|0;c[w>>2]=s+16;c[s>>2]=r;c[s+8>>2]=d[r+4|0]|64;s=sj(p,c[(c[b+48>>2]|0)+4>>2]|0,(c[w>>2]|0)+ -16|0)|0;aa=s+8|0;do{if((c[aa>>2]|0)==0){c[s>>2]=1;c[aa>>2]=1;if((c[(c[p+12>>2]|0)+12>>2]|0)<=0){Ea=r;break}mg(p);Ea=r}else{Ea=c[s+16>>2]|0}}while(0);c[w>>2]=(c[w>>2]|0)+ -16;c[e>>2]=Ea;s=Ea;if((a[s+4|0]|0)!=4){o=288;i=f;return o|0}r=a[s+6|0]|0;if(r<<24>>24==0){o=288;i=f;return o|0}o=r&255|256;i=f;return o|0}}else if((m|0)==308){i=f;return o|0}}while(0);Ea=c[h>>2]|0;Aa=Ea+4|0;Da=c[Aa>>2]|0;Ca=Ea+8|0;Ba=c[Ca>>2]|0;do{if((Da+1|0)>>>0>Ba>>>0){if(Ba>>>0>2147483645){lm(b,11488,0)}l=Ba<<1;za=c[b+52>>2]|0;if((l|0)==-2){zh(za)}else{ra=Ea;ya=Ah(za,c[ra>>2]|0,Ba,l)|0;c[ra>>2]=ya;c[Ca>>2]=l;Fa=ya;Ga=c[Aa>>2]|0;break}}else{Fa=c[Ea>>2]|0;Ga=Da}}while(0);c[Aa>>2]=Ga+1;a[Fa+Ga|0]=n;Ga=c[k>>2]|0;Fa=Ga;Aa=c[Fa>>2]|0;c[Fa>>2]=Aa+ -1;if((Aa|0)==0){Ha=ek(Ga)|0}else{Aa=Ga+4|0;Ga=c[Aa>>2]|0;c[Aa>>2]=Ga+1;Ha=d[Ga]|0}c[j>>2]=Ha;do{if((n|0)==48){if((Ha|0)==0){Ia=0;Ja=11432;break}if((ua(11440,Ha|0,3)|0)==0){Ia=Ha;Ja=11432;break}Ga=c[h>>2]|0;Aa=Ga+4|0;Fa=c[Aa>>2]|0;Da=Ga+8|0;Ea=c[Da>>2]|0;do{if((Fa+1|0)>>>0>Ea>>>0){if(Ea>>>0>2147483645){lm(b,11488,0)}Ca=Ea<<1;Ba=c[b+52>>2]|0;if((Ca|0)==-2){zh(Ba)}else{ya=Ga;l=Ah(Ba,c[ya>>2]|0,Ea,Ca)|0;c[ya>>2]=l;c[Da>>2]=Ca;Ka=l;La=c[Aa>>2]|0;break}}else{Ka=c[Ga>>2]|0;La=Fa}}while(0);c[Aa>>2]=La+1;a[Ka+La|0]=Ha;Fa=c[k>>2]|0;Ga=Fa;Da=c[Ga>>2]|0;c[Ga>>2]=Da+ -1;if((Da|0)==0){Ma=ek(Fa)|0}else{Da=Fa+4|0;Fa=c[Da>>2]|0;c[Da>>2]=Fa+1;Ma=d[Fa]|0}c[j>>2]=Ma;Ia=Ma;Ja=11448}else{Ia=Ha;Ja=11432}}while(0);Ha=b+52|0;Ma=Ia;f:while(1){do{if((Ma|0)==0){Na=0}else{if((ua(Ja|0,Ma|0,3)|0)==0){Na=Ma;break}Ia=c[h>>2]|0;La=Ia+4|0;Ka=c[La>>2]|0;n=Ia+8|0;Fa=c[n>>2]|0;if((Ka+1|0)>>>0>Fa>>>0){if(Fa>>>0>2147483645){m=228;break f}Da=Fa<<1;Oa=c[Ha>>2]|0;if((Da|0)==-2){m=230;break f}Ga=Ia;Ea=Ah(Oa,c[Ga>>2]|0,Fa,Da)|0;c[Ga>>2]=Ea;c[n>>2]=Da;Pa=Ea;Qa=c[La>>2]|0}else{Pa=c[Ia>>2]|0;Qa=Ka}c[La>>2]=Qa+1;a[Pa+Qa|0]=Ma;La=c[k>>2]|0;Ka=La;Ia=c[Ka>>2]|0;c[Ka>>2]=Ia+ -1;if((Ia|0)==0){Ra=ek(La)|0}else{Ia=La+4|0;La=c[Ia>>2]|0;c[Ia>>2]=La+1;Ra=d[La]|0}c[j>>2]=Ra;if((Ra|0)==0){Na=0;break}if((ua(11456,Ra|0,3)|0)==0){Na=Ra;break}La=c[h>>2]|0;Ia=La+4|0;Ka=c[Ia>>2]|0;Ea=La+8|0;Da=c[Ea>>2]|0;if((Ka+1|0)>>>0>Da>>>0){if(Da>>>0>2147483645){m=240;break f}n=Da<<1;Sa=c[Ha>>2]|0;if((n|0)==-2){m=242;break f}Ga=La;Fa=Ah(Sa,c[Ga>>2]|0,Da,n)|0;c[Ga>>2]=Fa;c[Ea>>2]=n;Ta=Fa;Ua=c[Ia>>2]|0}else{Ta=c[La>>2]|0;Ua=Ka}c[Ia>>2]=Ua+1;a[Ta+Ua|0]=Ra;Ia=c[k>>2]|0;Ka=Ia;La=c[Ka>>2]|0;c[Ka>>2]=La+ -1;if((La|0)==0){Va=ek(Ia)|0}else{La=Ia+4|0;Ia=c[La>>2]|0;c[La>>2]=Ia+1;Va=d[Ia]|0}c[j>>2]=Va;Na=Va}}while(0);Wa=c[h>>2]|0;Xa=Wa+4|0;Ya=c[Xa>>2]|0;Za=Wa+8|0;_a=c[Za>>2]|0;$a=(Ya+1|0)>>>0>_a>>>0;if(!((a[Na+10033|0]&16)!=0|(Na|0)==46)){m=260;break}if($a){if(_a>>>0>2147483645){m=252;break}Aa=_a<<1;ab=c[Ha>>2]|0;if((Aa|0)==-2){m=254;break}Ia=Wa;La=Ah(ab,c[Ia>>2]|0,_a,Aa)|0;c[Ia>>2]=La;c[Za>>2]=Aa;bb=La;cb=c[Xa>>2]|0}else{bb=c[Wa>>2]|0;cb=Ya}c[Xa>>2]=cb+1;a[bb+cb|0]=Na;La=c[k>>2]|0;Aa=La;Ia=c[Aa>>2]|0;c[Aa>>2]=Ia+ -1;if((Ia|0)==0){db=ek(La)|0}else{Ia=La+4|0;La=c[Ia>>2]|0;c[Ia>>2]=La+1;db=d[La]|0}c[j>>2]=db;Ma=db}if((m|0)==228){lm(b,11488,0)}else if((m|0)==230){zh(Oa)}else if((m|0)==240){lm(b,11488,0)}else if((m|0)==242){zh(Sa)}else if((m|0)==252){lm(b,11488,0)}else if((m|0)==254){zh(ab)}else if((m|0)==260){do{if($a){if(_a>>>0>2147483645){lm(b,11488,0)}m=_a<<1;ab=c[Ha>>2]|0;if((m|0)==-2){zh(ab)}else{Sa=Wa;Oa=Ah(ab,c[Sa>>2]|0,_a,m)|0;c[Sa>>2]=Oa;c[Za>>2]=m;eb=Oa;fb=c[Xa>>2]|0;break}}else{eb=c[Wa>>2]|0;fb=Ya}}while(0);c[Xa>>2]=fb+1;a[eb+fb|0]=0;fb=b+76|0;eb=a[fb]|0;Xa=c[h>>2]|0;Ya=c[Xa>>2]|0;Wa=c[Xa+4>>2]|0;if((Wa|0)==0){gb=-1;hb=Ya}else{Xa=Wa;do{Xa=Xa+ -1|0;Wa=Ya+Xa|0;if((a[Wa]|0)==46){a[Wa]=eb}}while((Xa|0)!=0);Xa=c[h>>2]|0;gb=(c[Xa+4>>2]|0)+ -1|0;hb=c[Xa>>2]|0}Xa=e;if((Vh(hb,gb,Xa)|0)!=0){o=287;i=f;return o|0}gb=a[fb]|0;hb=a[c[(lb()|0)>>2]|0]|0;a[fb]=hb;e=c[h>>2]|0;eb=c[e>>2]|0;Ya=c[e+4>>2]|0;if((Ya|0)==0){ib=-1;jb=eb}else{e=Ya;do{e=e+ -1|0;Ya=eb+e|0;if((a[Ya]|0)==gb<<24>>24){a[Ya]=hb}}while((e|0)!=0);e=c[h>>2]|0;ib=(c[e+4>>2]|0)+ -1|0;jb=c[e>>2]|0}if((Vh(jb,ib,Xa)|0)!=0){o=287;i=f;return o|0}o=a[fb]|0;fb=c[h>>2]|0;h=c[fb>>2]|0;f=c[fb+4>>2]|0;if((f|0)==0){lm(b,11464,287)}else{kb=f}do{kb=kb+ -1|0;f=h+kb|0;if((a[f]|0)==o<<24>>24){a[f]=46}}while((kb|0)!=0);lm(b,11464,287)}return 0}function qm(a){a=a|0;var b=0,d=0;b=i;d=pm(a,a+40|0)|0;c[a+32>>2]=d;i=b;return d|0}function rm(a){a=a|0;var b=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;b=i;e=a;f=c[e>>2]|0;g=a+56|0;h=c[g>>2]|0;j=h;k=c[j>>2]|0;c[j>>2]=k+ -1;if((k|0)==0){l=ek(h)|0}else{k=h+4|0;h=c[k>>2]|0;c[k>>2]=h+1;l=d[h]|0}c[e>>2]=l;do{if((l|0)==13|(l|0)==10){if((l|0)==(f|0)){break}h=c[g>>2]|0;k=h;j=c[k>>2]|0;c[k>>2]=j+ -1;if((j|0)==0){m=ek(h)|0}else{j=h+4|0;h=c[j>>2]|0;c[j>>2]=h+1;m=d[h]|0}c[e>>2]=m}}while(0);m=a+4|0;e=c[m>>2]|0;c[m>>2]=e+1;if((e|0)>2147483643){km(a,11680)}else{i=b;return}}function sm(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;e=i;f=b;g=c[f>>2]|0;h=b+60|0;j=c[h>>2]|0;k=j+4|0;l=c[k>>2]|0;m=j+8|0;n=c[m>>2]|0;do{if((l+1|0)>>>0>n>>>0){if(n>>>0>2147483645){lm(b,11488,0)}o=n<<1;p=c[b+52>>2]|0;if((o|0)==-2){zh(p)}else{q=j;r=Ah(p,c[q>>2]|0,n,o)|0;c[q>>2]=r;c[m>>2]=o;s=r;t=c[k>>2]|0;break}}else{s=c[j>>2]|0;t=l}}while(0);c[k>>2]=t+1;a[s+t|0]=g;t=b+56|0;s=c[t>>2]|0;k=s;l=c[k>>2]|0;c[k>>2]=l+ -1;if((l|0)==0){u=ek(s)|0}else{l=s+4|0;s=c[l>>2]|0;c[l>>2]=s+1;u=d[s]|0}c[f>>2]=u;if((u|0)!=61){v=u;w=0;x=(v|0)!=(g|0);y=x<<31>>31;z=y^w;i=e;return z|0}u=b+52|0;s=0;while(1){l=c[h>>2]|0;k=l+4|0;j=c[k>>2]|0;m=l+8|0;n=c[m>>2]|0;if((j+1|0)>>>0>n>>>0){if(n>>>0>2147483645){A=16;break}r=n<<1;B=c[u>>2]|0;if((r|0)==-2){A=18;break}o=l;q=Ah(B,c[o>>2]|0,n,r)|0;c[o>>2]=q;c[m>>2]=r;C=q;D=c[k>>2]|0}else{C=c[l>>2]|0;D=j}c[k>>2]=D+1;a[C+D|0]=61;k=c[t>>2]|0;j=k;l=c[j>>2]|0;c[j>>2]=l+ -1;if((l|0)==0){E=ek(k)|0}else{l=k+4|0;k=c[l>>2]|0;c[l>>2]=k+1;E=d[k]|0}c[f>>2]=E;k=s+1|0;if((E|0)==61){s=k}else{v=E;w=k;A=24;break}}if((A|0)==16){lm(b,11488,0)}else if((A|0)==18){zh(B)}else if((A|0)==24){x=(v|0)!=(g|0);y=x<<31>>31;z=y^w;i=e;return z|0}return 0}function tm(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;g=i;h=b;j=c[h>>2]|0;k=b+60|0;l=c[k>>2]|0;m=l+4|0;n=c[m>>2]|0;o=l+8|0;p=c[o>>2]|0;do{if((n+1|0)>>>0>p>>>0){if(p>>>0>2147483645){lm(b,11488,0)}q=p<<1;r=c[b+52>>2]|0;if((q|0)==-2){zh(r)}else{s=l;t=Ah(r,c[s>>2]|0,p,q)|0;c[s>>2]=t;c[o>>2]=q;u=t;v=c[m>>2]|0;break}}else{u=c[l>>2]|0;v=n}}while(0);c[m>>2]=v+1;a[u+v|0]=j;j=b+56|0;v=c[j>>2]|0;u=v;m=c[u>>2]|0;c[u>>2]=m+ -1;if((m|0)==0){w=ek(v)|0}else{m=v+4|0;v=c[m>>2]|0;c[m>>2]=v+1;w=d[v]|0}c[h>>2]=w;if((w|0)==13|(w|0)==10){rm(b);x=13}else{y=w}a:while(1){if((x|0)==13){x=0;y=c[h>>2]|0}z=(e|0)==0;A=b+52|0;b:do{if(z){w=y;while(1){if((w|0)==93){x=22;break b}else if((w|0)==13|(w|0)==10){break b}else if((w|0)==-1){x=21;break a}v=c[j>>2]|0;m=v;u=c[m>>2]|0;c[m>>2]=u+ -1;if((u|0)==0){B=ek(v)|0}else{u=v+4|0;v=c[u>>2]|0;c[u>>2]=v+1;B=d[v]|0}c[h>>2]=B;w=B}}else{w=y;while(1){if((w|0)==93){x=22;break b}else if((w|0)==13|(w|0)==10){break b}else if((w|0)==-1){x=21;break a}v=c[k>>2]|0;u=v+4|0;m=c[u>>2]|0;n=v+8|0;l=c[n>>2]|0;if((m+1|0)>>>0>l>>>0){if(l>>>0>2147483645){x=46;break a}o=l<<1;C=c[A>>2]|0;if((o|0)==-2){x=48;break a}p=v;t=Ah(C,c[p>>2]|0,l,o)|0;c[p>>2]=t;c[n>>2]=o;D=t;E=c[u>>2]|0}else{D=c[v>>2]|0;E=m}c[u>>2]=E+1;a[D+E|0]=w;u=c[j>>2]|0;m=u;v=c[m>>2]|0;c[m>>2]=v+ -1;if((v|0)==0){F=ek(u)|0}else{v=u+4|0;u=c[v>>2]|0;c[v>>2]=u+1;F=d[u]|0}c[h>>2]=F;w=F}}}while(0);if((x|0)==22){x=0;if((sm(b)|0)==(f|0)){x=23;break}else{x=13;continue}}w=c[k>>2]|0;u=w+4|0;v=c[u>>2]|0;m=w+8|0;t=c[m>>2]|0;if((v+1|0)>>>0>t>>>0){if(t>>>0>2147483645){x=37;break}o=t<<1;G=c[A>>2]|0;if((o|0)==-2){x=39;break}n=w;p=Ah(G,c[n>>2]|0,t,o)|0;c[n>>2]=p;c[m>>2]=o;H=p;I=c[u>>2]|0}else{H=c[w>>2]|0;I=v}c[u>>2]=I+1;a[H+I|0]=10;rm(b);if(!z){x=13;continue}c[(c[k>>2]|0)+4>>2]=0;x=13}if((x|0)==21){lm(b,(e|0)!=0?11632:11656,286)}else if((x|0)==23){I=c[h>>2]|0;H=c[k>>2]|0;F=H+4|0;E=c[F>>2]|0;D=H+8|0;y=c[D>>2]|0;do{if((E+1|0)>>>0>y>>>0){if(y>>>0>2147483645){lm(b,11488,0)}B=y<<1;u=c[A>>2]|0;if((B|0)==-2){zh(u)}else{v=H;w=Ah(u,c[v>>2]|0,y,B)|0;c[v>>2]=w;c[D>>2]=B;J=w;K=c[F>>2]|0;break}}else{J=c[H>>2]|0;K=E}}while(0);c[F>>2]=K+1;a[J+K|0]=I;I=c[j>>2]|0;j=I;K=c[j>>2]|0;c[j>>2]=K+ -1;if((K|0)==0){L=ek(I)|0}else{K=I+4|0;I=c[K>>2]|0;c[K>>2]=I+1;L=d[I]|0}c[h>>2]=L;if(z){i=g;return}z=c[k>>2]|0;k=f+2|0;f=c[A>>2]|0;A=Si(f,(c[z>>2]|0)+k|0,(c[z+4>>2]|0)-(k<<1)|0)|0;k=f+8|0;z=c[k>>2]|0;c[k>>2]=z+16;c[z>>2]=A;c[z+8>>2]=d[A+4|0]|0|64;z=sj(f,c[(c[b+48>>2]|0)+4>>2]|0,(c[k>>2]|0)+ -16|0)|0;L=z+8|0;do{if((c[L>>2]|0)==0){c[z>>2]=1;c[L>>2]=1;if((c[(c[f+12>>2]|0)+12>>2]|0)<=0){M=A;break}mg(f);M=A}else{M=c[z+16>>2]|0}}while(0);c[k>>2]=(c[k>>2]|0)+ -16;c[e>>2]=M;i=g;return}else if((x|0)==37){lm(b,11488,0)}else if((x|0)==39){zh(G)}else if((x|0)==46){lm(b,11488,0)}else if((x|0)==48){zh(C)}}function um(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;e=i;f=c[b+60>>2]|0;g=f+4|0;h=c[g>>2]|0;j=f+8|0;k=c[j>>2]|0;if(!((h+1|0)>>>0>k>>>0)){l=c[f>>2]|0;m=h;n=d&255;o=m+1|0;c[g>>2]=o;p=l+m|0;a[p]=n;i=e;return}if(k>>>0>2147483645){lm(b,11488,0)}h=k<<1;q=c[b+52>>2]|0;if((h|0)==-2){zh(q)}b=f;f=Ah(q,c[b>>2]|0,k,h)|0;c[b>>2]=f;c[j>>2]=h;l=f;m=c[g>>2]|0;n=d&255;o=m+1|0;c[g>>2]=o;p=l+m|0;a[p]=n;i=e;return}function vm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;c[(c[a+60>>2]|0)+4>>2]=0;um(a,92);a:do{if((d|0)>0){f=0;do{g=c[b+(f<<2)>>2]|0;if((g|0)==-1){break a}um(a,g);f=f+1|0;}while((f|0)<(d|0))}}while(0);lm(a,e,289)}function wm(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=Nm(a,b)|0;i=c;return d|0}function xm(a,b){a=+a;b=b|0;var c=0,d=0.0;c=i;d=+Hm(a,b);i=c;return+d}function ym(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ca=0,Da=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0;b=i;do{if(a>>>0<245){if(a>>>0<11){d=16}else{d=a+11&-8}e=d>>>3;f=c[3008]|0;g=f>>>e;if((g&3|0)!=0){h=(g&1^1)+e|0;j=h<<1;k=12072+(j<<2)|0;l=12072+(j+2<<2)|0;j=c[l>>2]|0;m=j+8|0;n=c[m>>2]|0;do{if((k|0)==(n|0)){c[3008]=f&~(1<<h)}else{if(n>>>0<(c[12048>>2]|0)>>>0){Xa()}o=n+12|0;if((c[o>>2]|0)==(j|0)){c[o>>2]=k;c[l>>2]=n;break}else{Xa()}}}while(0);n=h<<3;c[j+4>>2]=n|3;l=j+(n|4)|0;c[l>>2]=c[l>>2]|1;p=m;i=b;return p|0}if(!(d>>>0>(c[12040>>2]|0)>>>0)){q=d;break}if((g|0)!=0){l=2<<e;n=g<<e&(l|0-l);l=(n&0-n)+ -1|0;n=l>>>12&16;k=l>>>n;l=k>>>5&8;o=k>>>l;k=o>>>2&4;r=o>>>k;o=r>>>1&2;s=r>>>o;r=s>>>1&1;t=(l|n|k|o|r)+(s>>>r)|0;r=t<<1;s=12072+(r<<2)|0;o=12072+(r+2<<2)|0;r=c[o>>2]|0;k=r+8|0;n=c[k>>2]|0;do{if((s|0)==(n|0)){c[3008]=f&~(1<<t)}else{if(n>>>0<(c[12048>>2]|0)>>>0){Xa()}l=n+12|0;if((c[l>>2]|0)==(r|0)){c[l>>2]=s;c[o>>2]=n;break}else{Xa()}}}while(0);n=t<<3;o=n-d|0;c[r+4>>2]=d|3;s=r;f=s+d|0;c[s+(d|4)>>2]=o|1;c[s+n>>2]=o;n=c[12040>>2]|0;if((n|0)!=0){s=c[12052>>2]|0;e=n>>>3;n=e<<1;g=12072+(n<<2)|0;m=c[3008]|0;j=1<<e;do{if((m&j|0)==0){c[3008]=m|j;u=12072+(n+2<<2)|0;v=g}else{e=12072+(n+2<<2)|0;h=c[e>>2]|0;if(!(h>>>0<(c[12048>>2]|0)>>>0)){u=e;v=h;break}Xa()}}while(0);c[u>>2]=s;c[v+12>>2]=s;c[s+8>>2]=v;c[s+12>>2]=g}c[12040>>2]=o;c[12052>>2]=f;p=k;i=b;return p|0}n=c[12036>>2]|0;if((n|0)==0){q=d;break}j=(n&0-n)+ -1|0;n=j>>>12&16;m=j>>>n;j=m>>>5&8;r=m>>>j;m=r>>>2&4;t=r>>>m;r=t>>>1&2;h=t>>>r;t=h>>>1&1;e=c[12336+((j|n|m|r|t)+(h>>>t)<<2)>>2]|0;t=(c[e+4>>2]&-8)-d|0;h=e;r=e;while(1){e=c[h+16>>2]|0;if((e|0)==0){m=c[h+20>>2]|0;if((m|0)==0){break}else{w=m}}else{w=e}e=(c[w+4>>2]&-8)-d|0;m=e>>>0<t>>>0;t=m?e:t;h=w;r=m?w:r}h=r;k=c[12048>>2]|0;if(h>>>0<k>>>0){Xa()}f=h+d|0;o=f;if(!(h>>>0<f>>>0)){Xa()}f=c[r+24>>2]|0;g=c[r+12>>2]|0;do{if((g|0)==(r|0)){s=r+20|0;m=c[s>>2]|0;if((m|0)==0){e=r+16|0;n=c[e>>2]|0;if((n|0)==0){x=0;break}else{y=n;z=e}}else{y=m;z=s}while(1){s=y+20|0;m=c[s>>2]|0;if((m|0)!=0){z=s;y=m;continue}m=y+16|0;s=c[m>>2]|0;if((s|0)==0){break}else{y=s;z=m}}if(z>>>0<k>>>0){Xa()}else{c[z>>2]=0;x=y;break}}else{m=c[r+8>>2]|0;if(m>>>0<k>>>0){Xa()}s=m+12|0;if((c[s>>2]|0)!=(r|0)){Xa()}e=g+8|0;if((c[e>>2]|0)==(r|0)){c[s>>2]=g;c[e>>2]=m;x=g;break}else{Xa()}}}while(0);a:do{if((f|0)!=0){g=c[r+28>>2]|0;k=12336+(g<<2)|0;do{if((r|0)==(c[k>>2]|0)){c[k>>2]=x;if((x|0)!=0){break}c[12036>>2]=c[12036>>2]&~(1<<g);break a}else{if(f>>>0<(c[12048>>2]|0)>>>0){Xa()}m=f+16|0;if((c[m>>2]|0)==(r|0)){c[m>>2]=x}else{c[f+20>>2]=x}if((x|0)==0){break a}}}while(0);if(x>>>0<(c[12048>>2]|0)>>>0){Xa()}c[x+24>>2]=f;g=c[r+16>>2]|0;do{if((g|0)!=0){if(g>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[x+16>>2]=g;c[g+24>>2]=x;break}}}while(0);g=c[r+20>>2]|0;if((g|0)==0){break}if(g>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[x+20>>2]=g;c[g+24>>2]=x;break}}}while(0);if(t>>>0<16){f=t+d|0;c[r+4>>2]=f|3;g=h+(f+4)|0;c[g>>2]=c[g>>2]|1}else{c[r+4>>2]=d|3;c[h+(d|4)>>2]=t|1;c[h+(t+d)>>2]=t;g=c[12040>>2]|0;if((g|0)!=0){f=c[12052>>2]|0;k=g>>>3;g=k<<1;m=12072+(g<<2)|0;e=c[3008]|0;s=1<<k;do{if((e&s|0)==0){c[3008]=e|s;A=12072+(g+2<<2)|0;B=m}else{k=12072+(g+2<<2)|0;n=c[k>>2]|0;if(!(n>>>0<(c[12048>>2]|0)>>>0)){A=k;B=n;break}Xa()}}while(0);c[A>>2]=f;c[B+12>>2]=f;c[f+8>>2]=B;c[f+12>>2]=m}c[12040>>2]=t;c[12052>>2]=o}p=r+8|0;i=b;return p|0}else{if(a>>>0>4294967231){q=-1;break}g=a+11|0;s=g&-8;e=c[12036>>2]|0;if((e|0)==0){q=s;break}h=0-s|0;n=g>>>8;do{if((n|0)==0){C=0}else{if(s>>>0>16777215){C=31;break}g=(n+1048320|0)>>>16&8;k=n<<g;j=(k+520192|0)>>>16&4;l=k<<j;k=(l+245760|0)>>>16&2;D=14-(j|g|k)+(l<<k>>>15)|0;C=s>>>(D+7|0)&1|D<<1}}while(0);n=c[12336+(C<<2)>>2]|0;b:do{if((n|0)==0){E=h;F=0;G=0}else{if((C|0)==31){H=0}else{H=25-(C>>>1)|0}r=h;o=0;t=s<<H;m=n;f=0;while(1){D=c[m+4>>2]&-8;k=D-s|0;if(k>>>0<r>>>0){if((D|0)==(s|0)){E=k;F=m;G=m;break b}else{I=k;J=m}}else{I=r;J=f}k=c[m+20>>2]|0;D=c[m+(t>>>31<<2)+16>>2]|0;l=(k|0)==0|(k|0)==(D|0)?o:k;if((D|0)==0){E=I;F=l;G=J;break}else{r=I;o=l;t=t<<1;m=D;f=J}}}}while(0);if((F|0)==0&(G|0)==0){n=2<<C;h=e&(n|0-n);if((h|0)==0){q=s;break}n=(h&0-h)+ -1|0;h=n>>>12&16;f=n>>>h;n=f>>>5&8;m=f>>>n;f=m>>>2&4;t=m>>>f;m=t>>>1&2;o=t>>>m;t=o>>>1&1;K=c[12336+((n|h|f|m|t)+(o>>>t)<<2)>>2]|0}else{K=F}if((K|0)==0){L=E;M=G}else{t=E;o=K;m=G;while(1){f=(c[o+4>>2]&-8)-s|0;h=f>>>0<t>>>0;n=h?f:t;f=h?o:m;h=c[o+16>>2]|0;if((h|0)!=0){N=f;O=n;m=N;o=h;t=O;continue}h=c[o+20>>2]|0;if((h|0)==0){L=n;M=f;break}else{N=f;O=n;o=h;m=N;t=O}}}if((M|0)==0){q=s;break}if(!(L>>>0<((c[12040>>2]|0)-s|0)>>>0)){q=s;break}t=M;m=c[12048>>2]|0;if(t>>>0<m>>>0){Xa()}o=t+s|0;e=o;if(!(t>>>0<o>>>0)){Xa()}h=c[M+24>>2]|0;n=c[M+12>>2]|0;do{if((n|0)==(M|0)){f=M+20|0;r=c[f>>2]|0;if((r|0)==0){D=M+16|0;l=c[D>>2]|0;if((l|0)==0){P=0;break}else{Q=l;R=D}}else{Q=r;R=f}while(1){f=Q+20|0;r=c[f>>2]|0;if((r|0)!=0){R=f;Q=r;continue}r=Q+16|0;f=c[r>>2]|0;if((f|0)==0){break}else{Q=f;R=r}}if(R>>>0<m>>>0){Xa()}else{c[R>>2]=0;P=Q;break}}else{r=c[M+8>>2]|0;if(r>>>0<m>>>0){Xa()}f=r+12|0;if((c[f>>2]|0)!=(M|0)){Xa()}D=n+8|0;if((c[D>>2]|0)==(M|0)){c[f>>2]=n;c[D>>2]=r;P=n;break}else{Xa()}}}while(0);c:do{if((h|0)!=0){n=c[M+28>>2]|0;m=12336+(n<<2)|0;do{if((M|0)==(c[m>>2]|0)){c[m>>2]=P;if((P|0)!=0){break}c[12036>>2]=c[12036>>2]&~(1<<n);break c}else{if(h>>>0<(c[12048>>2]|0)>>>0){Xa()}r=h+16|0;if((c[r>>2]|0)==(M|0)){c[r>>2]=P}else{c[h+20>>2]=P}if((P|0)==0){break c}}}while(0);if(P>>>0<(c[12048>>2]|0)>>>0){Xa()}c[P+24>>2]=h;n=c[M+16>>2]|0;do{if((n|0)!=0){if(n>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[P+16>>2]=n;c[n+24>>2]=P;break}}}while(0);n=c[M+20>>2]|0;if((n|0)==0){break}if(n>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[P+20>>2]=n;c[n+24>>2]=P;break}}}while(0);d:do{if(L>>>0<16){h=L+s|0;c[M+4>>2]=h|3;n=t+(h+4)|0;c[n>>2]=c[n>>2]|1}else{c[M+4>>2]=s|3;c[t+(s|4)>>2]=L|1;c[t+(L+s)>>2]=L;n=L>>>3;if(L>>>0<256){h=n<<1;m=12072+(h<<2)|0;r=c[3008]|0;D=1<<n;do{if((r&D|0)==0){c[3008]=r|D;S=12072+(h+2<<2)|0;T=m}else{n=12072+(h+2<<2)|0;f=c[n>>2]|0;if(!(f>>>0<(c[12048>>2]|0)>>>0)){S=n;T=f;break}Xa()}}while(0);c[S>>2]=e;c[T+12>>2]=e;c[t+(s+8)>>2]=T;c[t+(s+12)>>2]=m;break}h=o;D=L>>>8;do{if((D|0)==0){U=0}else{if(L>>>0>16777215){U=31;break}r=(D+1048320|0)>>>16&8;f=D<<r;n=(f+520192|0)>>>16&4;l=f<<n;f=(l+245760|0)>>>16&2;k=14-(n|r|f)+(l<<f>>>15)|0;U=L>>>(k+7|0)&1|k<<1}}while(0);D=12336+(U<<2)|0;c[t+(s+28)>>2]=U;c[t+(s+20)>>2]=0;c[t+(s+16)>>2]=0;m=c[12036>>2]|0;k=1<<U;if((m&k|0)==0){c[12036>>2]=m|k;c[D>>2]=h;c[t+(s+24)>>2]=D;c[t+(s+12)>>2]=h;c[t+(s+8)>>2]=h;break}k=c[D>>2]|0;if((U|0)==31){V=0}else{V=25-(U>>>1)|0}e:do{if((c[k+4>>2]&-8|0)==(L|0)){W=k}else{D=L<<V;m=k;while(1){X=m+(D>>>31<<2)+16|0;f=c[X>>2]|0;if((f|0)==0){break}if((c[f+4>>2]&-8|0)==(L|0)){W=f;break e}else{D=D<<1;m=f}}if(X>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[X>>2]=h;c[t+(s+24)>>2]=m;c[t+(s+12)>>2]=h;c[t+(s+8)>>2]=h;break d}}}while(0);k=W+8|0;D=c[k>>2]|0;f=c[12048>>2]|0;if(W>>>0<f>>>0){Xa()}if(D>>>0<f>>>0){Xa()}else{c[D+12>>2]=h;c[k>>2]=h;c[t+(s+8)>>2]=D;c[t+(s+12)>>2]=W;c[t+(s+24)>>2]=0;break}}}while(0);p=M+8|0;i=b;return p|0}}while(0);M=c[12040>>2]|0;if(!(q>>>0>M>>>0)){W=M-q|0;X=c[12052>>2]|0;if(W>>>0>15){L=X;c[12052>>2]=L+q;c[12040>>2]=W;c[L+(q+4)>>2]=W|1;c[L+M>>2]=W;c[X+4>>2]=q|3}else{c[12040>>2]=0;c[12052>>2]=0;c[X+4>>2]=M|3;W=X+(M+4)|0;c[W>>2]=c[W>>2]|1}p=X+8|0;i=b;return p|0}X=c[12044>>2]|0;if(q>>>0<X>>>0){W=X-q|0;c[12044>>2]=W;X=c[12056>>2]|0;M=X;c[12056>>2]=M+q;c[M+(q+4)>>2]=W|1;c[X+4>>2]=q|3;p=X+8|0;i=b;return p|0}do{if((c[3126]|0)==0){X=Ea(30)|0;if((X+ -1&X|0)==0){c[12512>>2]=X;c[12508>>2]=X;c[12516>>2]=-1;c[12520>>2]=-1;c[12524>>2]=0;c[12476>>2]=0;c[3126]=(rb(0)|0)&-16^1431655768;break}else{Xa()}}}while(0);X=q+48|0;W=c[12512>>2]|0;M=q+47|0;L=W+M|0;V=0-W|0;W=L&V;if(!(W>>>0>q>>>0)){p=0;i=b;return p|0}U=c[12472>>2]|0;do{if((U|0)!=0){T=c[12464>>2]|0;S=T+W|0;if(S>>>0<=T>>>0|S>>>0>U>>>0){p=0}else{break}i=b;return p|0}}while(0);f:do{if((c[12476>>2]&4|0)==0){U=c[12056>>2]|0;g:do{if((U|0)==0){Y=182}else{S=U;T=12480|0;while(1){Z=T;P=c[Z>>2]|0;if(!(P>>>0>S>>>0)){_=T+4|0;if((P+(c[_>>2]|0)|0)>>>0>S>>>0){break}}P=c[T+8>>2]|0;if((P|0)==0){Y=182;break g}else{T=P}}if((T|0)==0){Y=182;break}S=L-(c[12044>>2]|0)&V;if(!(S>>>0<2147483647)){$=0;break}h=Ba(S|0)|0;P=(h|0)==((c[Z>>2]|0)+(c[_>>2]|0)|0);aa=h;ba=S;ca=P?h:-1;da=P?S:0;Y=191}}while(0);do{if((Y|0)==182){U=Ba(0)|0;if((U|0)==(-1|0)){$=0;break}S=U;P=c[12508>>2]|0;h=P+ -1|0;if((h&S|0)==0){ea=W}else{ea=W-S+(h+S&0-P)|0}P=c[12464>>2]|0;S=P+ea|0;if(!(ea>>>0>q>>>0&ea>>>0<2147483647)){$=0;break}h=c[12472>>2]|0;if((h|0)!=0){if(S>>>0<=P>>>0|S>>>0>h>>>0){$=0;break}}h=Ba(ea|0)|0;S=(h|0)==(U|0);aa=h;ba=ea;ca=S?U:-1;da=S?ea:0;Y=191}}while(0);h:do{if((Y|0)==191){S=0-ba|0;if((ca|0)!=(-1|0)){fa=ca;ga=da;Y=202;break f}do{if((aa|0)!=(-1|0)&ba>>>0<2147483647&ba>>>0<X>>>0){U=c[12512>>2]|0;h=M-ba+U&0-U;if(!(h>>>0<2147483647)){ha=ba;break}if((Ba(h|0)|0)==(-1|0)){Ba(S|0)|0;$=da;break h}else{ha=h+ba|0;break}}else{ha=ba}}while(0);if((aa|0)==(-1|0)){$=da}else{fa=aa;ga=ha;Y=202;break f}}}while(0);c[12476>>2]=c[12476>>2]|4;ia=$;Y=199}else{ia=0;Y=199}}while(0);do{if((Y|0)==199){if(!(W>>>0<2147483647)){break}$=Ba(W|0)|0;ha=Ba(0)|0;if(!((ha|0)!=(-1|0)&($|0)!=(-1|0)&$>>>0<ha>>>0)){break}aa=ha-$|0;ha=aa>>>0>(q+40|0)>>>0;if(ha){fa=$;ga=ha?aa:ia;Y=202}}}while(0);do{if((Y|0)==202){ia=(c[12464>>2]|0)+ga|0;c[12464>>2]=ia;if(ia>>>0>(c[12468>>2]|0)>>>0){c[12468>>2]=ia}ia=c[12056>>2]|0;i:do{if((ia|0)==0){W=c[12048>>2]|0;if((W|0)==0|fa>>>0<W>>>0){c[12048>>2]=fa}c[12480>>2]=fa;c[12484>>2]=ga;c[12492>>2]=0;c[12068>>2]=c[3126];c[12064>>2]=-1;W=0;do{aa=W<<1;ha=12072+(aa<<2)|0;c[12072+(aa+3<<2)>>2]=ha;c[12072+(aa+2<<2)>>2]=ha;W=W+1|0;}while((W|0)!=32);W=fa+8|0;if((W&7|0)==0){ja=0}else{ja=0-W&7}W=ga+ -40-ja|0;c[12056>>2]=fa+ja;c[12044>>2]=W;c[fa+(ja+4)>>2]=W|1;c[fa+(ga+ -36)>>2]=40;c[12060>>2]=c[12520>>2]}else{W=12480|0;while(1){ka=c[W>>2]|0;la=W+4|0;ma=c[la>>2]|0;if((fa|0)==(ka+ma|0)){Y=214;break}ha=c[W+8>>2]|0;if((ha|0)==0){break}else{W=ha}}do{if((Y|0)==214){if((c[W+12>>2]&8|0)!=0){break}ha=ia;if(!(ha>>>0>=ka>>>0&ha>>>0<fa>>>0)){break}c[la>>2]=ma+ga;aa=(c[12044>>2]|0)+ga|0;$=ia+8|0;if(($&7|0)==0){na=0}else{na=0-$&7}$=aa-na|0;c[12056>>2]=ha+na;c[12044>>2]=$;c[ha+(na+4)>>2]=$|1;c[ha+(aa+4)>>2]=40;c[12060>>2]=c[12520>>2];break i}}while(0);if(fa>>>0<(c[12048>>2]|0)>>>0){c[12048>>2]=fa}W=fa+ga|0;aa=12480|0;while(1){oa=aa;if((c[oa>>2]|0)==(W|0)){Y=224;break}ha=c[aa+8>>2]|0;if((ha|0)==0){break}else{aa=ha}}do{if((Y|0)==224){if((c[aa+12>>2]&8|0)!=0){break}c[oa>>2]=fa;W=aa+4|0;c[W>>2]=(c[W>>2]|0)+ga;W=fa+8|0;if((W&7|0)==0){pa=0}else{pa=0-W&7}W=fa+(ga+8)|0;if((W&7|0)==0){qa=0}else{qa=0-W&7}W=fa+(qa+ga)|0;ha=W;$=pa+q|0;da=fa+$|0;ba=da;M=W-(fa+pa)-q|0;c[fa+(pa+4)>>2]=q|3;j:do{if((ha|0)==(c[12056>>2]|0)){X=(c[12044>>2]|0)+M|0;c[12044>>2]=X;c[12056>>2]=ba;c[fa+($+4)>>2]=X|1}else{if((ha|0)==(c[12052>>2]|0)){X=(c[12040>>2]|0)+M|0;c[12040>>2]=X;c[12052>>2]=ba;c[fa+($+4)>>2]=X|1;c[fa+(X+$)>>2]=X;break}X=ga+4|0;ca=c[fa+(X+qa)>>2]|0;if((ca&3|0)==1){ea=ca&-8;_=ca>>>3;k:do{if(ca>>>0<256){Z=c[fa+((qa|8)+ga)>>2]|0;V=c[fa+(ga+12+qa)>>2]|0;L=12072+(_<<1<<2)|0;do{if((Z|0)!=(L|0)){if(Z>>>0<(c[12048>>2]|0)>>>0){Xa()}if((c[Z+12>>2]|0)==(ha|0)){break}Xa()}}while(0);if((V|0)==(Z|0)){c[3008]=c[3008]&~(1<<_);break}do{if((V|0)==(L|0)){ra=V+8|0}else{if(V>>>0<(c[12048>>2]|0)>>>0){Xa()}S=V+8|0;if((c[S>>2]|0)==(ha|0)){ra=S;break}Xa()}}while(0);c[Z+12>>2]=V;c[ra>>2]=Z}else{L=W;S=c[fa+((qa|24)+ga)>>2]|0;T=c[fa+(ga+12+qa)>>2]|0;do{if((T|0)==(L|0)){h=qa|16;U=fa+(X+h)|0;P=c[U>>2]|0;if((P|0)==0){Q=fa+(h+ga)|0;h=c[Q>>2]|0;if((h|0)==0){sa=0;break}else{ta=h;ua=Q}}else{ta=P;ua=U}while(1){U=ta+20|0;P=c[U>>2]|0;if((P|0)!=0){ua=U;ta=P;continue}P=ta+16|0;U=c[P>>2]|0;if((U|0)==0){break}else{ta=U;ua=P}}if(ua>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[ua>>2]=0;sa=ta;break}}else{P=c[fa+((qa|8)+ga)>>2]|0;if(P>>>0<(c[12048>>2]|0)>>>0){Xa()}U=P+12|0;if((c[U>>2]|0)!=(L|0)){Xa()}Q=T+8|0;if((c[Q>>2]|0)==(L|0)){c[U>>2]=T;c[Q>>2]=P;sa=T;break}else{Xa()}}}while(0);if((S|0)==0){break}T=c[fa+(ga+28+qa)>>2]|0;Z=12336+(T<<2)|0;do{if((L|0)==(c[Z>>2]|0)){c[Z>>2]=sa;if((sa|0)!=0){break}c[12036>>2]=c[12036>>2]&~(1<<T);break k}else{if(S>>>0<(c[12048>>2]|0)>>>0){Xa()}V=S+16|0;if((c[V>>2]|0)==(L|0)){c[V>>2]=sa}else{c[S+20>>2]=sa}if((sa|0)==0){break k}}}while(0);if(sa>>>0<(c[12048>>2]|0)>>>0){Xa()}c[sa+24>>2]=S;L=qa|16;T=c[fa+(L+ga)>>2]|0;do{if((T|0)!=0){if(T>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[sa+16>>2]=T;c[T+24>>2]=sa;break}}}while(0);T=c[fa+(X+L)>>2]|0;if((T|0)==0){break}if(T>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[sa+20>>2]=T;c[T+24>>2]=sa;break}}}while(0);va=fa+((ea|qa)+ga)|0;wa=ea+M|0}else{va=ha;wa=M}X=va+4|0;c[X>>2]=c[X>>2]&-2;c[fa+($+4)>>2]=wa|1;c[fa+(wa+$)>>2]=wa;X=wa>>>3;if(wa>>>0<256){_=X<<1;ca=12072+(_<<2)|0;T=c[3008]|0;S=1<<X;do{if((T&S|0)==0){c[3008]=T|S;xa=12072+(_+2<<2)|0;ya=ca}else{X=12072+(_+2<<2)|0;Z=c[X>>2]|0;if(!(Z>>>0<(c[12048>>2]|0)>>>0)){xa=X;ya=Z;break}Xa()}}while(0);c[xa>>2]=ba;c[ya+12>>2]=ba;c[fa+($+8)>>2]=ya;c[fa+($+12)>>2]=ca;break}_=da;S=wa>>>8;do{if((S|0)==0){za=0}else{if(wa>>>0>16777215){za=31;break}T=(S+1048320|0)>>>16&8;ea=S<<T;Z=(ea+520192|0)>>>16&4;X=ea<<Z;ea=(X+245760|0)>>>16&2;V=14-(Z|T|ea)+(X<<ea>>>15)|0;za=wa>>>(V+7|0)&1|V<<1}}while(0);S=12336+(za<<2)|0;c[fa+($+28)>>2]=za;c[fa+($+20)>>2]=0;c[fa+($+16)>>2]=0;ca=c[12036>>2]|0;V=1<<za;if((ca&V|0)==0){c[12036>>2]=ca|V;c[S>>2]=_;c[fa+($+24)>>2]=S;c[fa+($+12)>>2]=_;c[fa+($+8)>>2]=_;break}V=c[S>>2]|0;if((za|0)==31){Aa=0}else{Aa=25-(za>>>1)|0}l:do{if((c[V+4>>2]&-8|0)==(wa|0)){Ca=V}else{S=wa<<Aa;ca=V;while(1){Da=ca+(S>>>31<<2)+16|0;ea=c[Da>>2]|0;if((ea|0)==0){break}if((c[ea+4>>2]&-8|0)==(wa|0)){Ca=ea;break l}else{S=S<<1;ca=ea}}if(Da>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[Da>>2]=_;c[fa+($+24)>>2]=ca;c[fa+($+12)>>2]=_;c[fa+($+8)>>2]=_;break j}}}while(0);V=Ca+8|0;S=c[V>>2]|0;L=c[12048>>2]|0;if(Ca>>>0<L>>>0){Xa()}if(S>>>0<L>>>0){Xa()}else{c[S+12>>2]=_;c[V>>2]=_;c[fa+($+8)>>2]=S;c[fa+($+12)>>2]=Ca;c[fa+($+24)>>2]=0;break}}}while(0);p=fa+(pa|8)|0;i=b;return p|0}}while(0);aa=ia;$=12480|0;while(1){Fa=c[$>>2]|0;if(!(Fa>>>0>aa>>>0)){Ga=c[$+4>>2]|0;Ha=Fa+Ga|0;if(Ha>>>0>aa>>>0){break}}$=c[$+8>>2]|0}$=Fa+(Ga+ -39)|0;if(($&7|0)==0){Ia=0}else{Ia=0-$&7}$=Fa+(Ga+ -47+Ia)|0;da=$>>>0<(ia+16|0)>>>0?aa:$;$=da+8|0;ba=$;M=fa+8|0;if((M&7|0)==0){Ja=0}else{Ja=0-M&7}M=ga+ -40-Ja|0;c[12056>>2]=fa+Ja;c[12044>>2]=M;c[fa+(Ja+4)>>2]=M|1;c[fa+(ga+ -36)>>2]=40;c[12060>>2]=c[12520>>2];c[da+4>>2]=27;c[$+0>>2]=c[12480>>2];c[$+4>>2]=c[12484>>2];c[$+8>>2]=c[12488>>2];c[$+12>>2]=c[12492>>2];c[12480>>2]=fa;c[12484>>2]=ga;c[12492>>2]=0;c[12488>>2]=ba;ba=da+28|0;c[ba>>2]=7;if((da+32|0)>>>0<Ha>>>0){$=ba;while(1){ba=$+4|0;c[ba>>2]=7;if(($+8|0)>>>0<Ha>>>0){$=ba}else{break}}}if((da|0)==(aa|0)){break}$=da-ia|0;ba=aa+($+4)|0;c[ba>>2]=c[ba>>2]&-2;c[ia+4>>2]=$|1;c[aa+$>>2]=$;ba=$>>>3;if($>>>0<256){M=ba<<1;ha=12072+(M<<2)|0;W=c[3008]|0;m=1<<ba;do{if((W&m|0)==0){c[3008]=W|m;Ka=12072+(M+2<<2)|0;La=ha}else{ba=12072+(M+2<<2)|0;S=c[ba>>2]|0;if(!(S>>>0<(c[12048>>2]|0)>>>0)){Ka=ba;La=S;break}Xa()}}while(0);c[Ka>>2]=ia;c[La+12>>2]=ia;c[ia+8>>2]=La;c[ia+12>>2]=ha;break}M=ia;m=$>>>8;do{if((m|0)==0){Ma=0}else{if($>>>0>16777215){Ma=31;break}W=(m+1048320|0)>>>16&8;aa=m<<W;da=(aa+520192|0)>>>16&4;S=aa<<da;aa=(S+245760|0)>>>16&2;ba=14-(da|W|aa)+(S<<aa>>>15)|0;Ma=$>>>(ba+7|0)&1|ba<<1}}while(0);m=12336+(Ma<<2)|0;c[ia+28>>2]=Ma;c[ia+20>>2]=0;c[ia+16>>2]=0;ha=c[12036>>2]|0;ba=1<<Ma;if((ha&ba|0)==0){c[12036>>2]=ha|ba;c[m>>2]=M;c[ia+24>>2]=m;c[ia+12>>2]=ia;c[ia+8>>2]=ia;break}ba=c[m>>2]|0;if((Ma|0)==31){Na=0}else{Na=25-(Ma>>>1)|0}m:do{if((c[ba+4>>2]&-8|0)==($|0)){Oa=ba}else{m=$<<Na;ha=ba;while(1){Pa=ha+(m>>>31<<2)+16|0;aa=c[Pa>>2]|0;if((aa|0)==0){break}if((c[aa+4>>2]&-8|0)==($|0)){Oa=aa;break m}else{m=m<<1;ha=aa}}if(Pa>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[Pa>>2]=M;c[ia+24>>2]=ha;c[ia+12>>2]=ia;c[ia+8>>2]=ia;break i}}}while(0);$=Oa+8|0;ba=c[$>>2]|0;m=c[12048>>2]|0;if(Oa>>>0<m>>>0){Xa()}if(ba>>>0<m>>>0){Xa()}else{c[ba+12>>2]=M;c[$>>2]=M;c[ia+8>>2]=ba;c[ia+12>>2]=Oa;c[ia+24>>2]=0;break}}}while(0);ia=c[12044>>2]|0;if(!(ia>>>0>q>>>0)){break}ba=ia-q|0;c[12044>>2]=ba;ia=c[12056>>2]|0;$=ia;c[12056>>2]=$+q;c[$+(q+4)>>2]=ba|1;c[ia+4>>2]=q|3;p=ia+8|0;i=b;return p|0}}while(0);c[(pc()|0)>>2]=12;p=0;i=b;return p|0}function zm(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0;b=i;if((a|0)==0){i=b;return}d=a+ -8|0;e=d;f=c[12048>>2]|0;if(d>>>0<f>>>0){Xa()}g=c[a+ -4>>2]|0;h=g&3;if((h|0)==1){Xa()}j=g&-8;k=a+(j+ -8)|0;l=k;a:do{if((g&1|0)==0){m=c[d>>2]|0;if((h|0)==0){i=b;return}n=-8-m|0;o=a+n|0;p=o;q=m+j|0;if(o>>>0<f>>>0){Xa()}if((p|0)==(c[12052>>2]|0)){r=a+(j+ -4)|0;if((c[r>>2]&3|0)!=3){s=p;t=q;break}c[12040>>2]=q;c[r>>2]=c[r>>2]&-2;c[a+(n+4)>>2]=q|1;c[k>>2]=q;i=b;return}r=m>>>3;if(m>>>0<256){m=c[a+(n+8)>>2]|0;u=c[a+(n+12)>>2]|0;v=12072+(r<<1<<2)|0;do{if((m|0)!=(v|0)){if(m>>>0<f>>>0){Xa()}if((c[m+12>>2]|0)==(p|0)){break}Xa()}}while(0);if((u|0)==(m|0)){c[3008]=c[3008]&~(1<<r);s=p;t=q;break}do{if((u|0)==(v|0)){w=u+8|0}else{if(u>>>0<f>>>0){Xa()}x=u+8|0;if((c[x>>2]|0)==(p|0)){w=x;break}Xa()}}while(0);c[m+12>>2]=u;c[w>>2]=m;s=p;t=q;break}v=o;r=c[a+(n+24)>>2]|0;x=c[a+(n+12)>>2]|0;do{if((x|0)==(v|0)){y=a+(n+20)|0;z=c[y>>2]|0;if((z|0)==0){A=a+(n+16)|0;B=c[A>>2]|0;if((B|0)==0){C=0;break}else{D=B;E=A}}else{D=z;E=y}while(1){y=D+20|0;z=c[y>>2]|0;if((z|0)!=0){E=y;D=z;continue}z=D+16|0;y=c[z>>2]|0;if((y|0)==0){break}else{D=y;E=z}}if(E>>>0<f>>>0){Xa()}else{c[E>>2]=0;C=D;break}}else{z=c[a+(n+8)>>2]|0;if(z>>>0<f>>>0){Xa()}y=z+12|0;if((c[y>>2]|0)!=(v|0)){Xa()}A=x+8|0;if((c[A>>2]|0)==(v|0)){c[y>>2]=x;c[A>>2]=z;C=x;break}else{Xa()}}}while(0);if((r|0)==0){s=p;t=q;break}x=c[a+(n+28)>>2]|0;o=12336+(x<<2)|0;do{if((v|0)==(c[o>>2]|0)){c[o>>2]=C;if((C|0)!=0){break}c[12036>>2]=c[12036>>2]&~(1<<x);s=p;t=q;break a}else{if(r>>>0<(c[12048>>2]|0)>>>0){Xa()}m=r+16|0;if((c[m>>2]|0)==(v|0)){c[m>>2]=C}else{c[r+20>>2]=C}if((C|0)==0){s=p;t=q;break a}}}while(0);if(C>>>0<(c[12048>>2]|0)>>>0){Xa()}c[C+24>>2]=r;v=c[a+(n+16)>>2]|0;do{if((v|0)!=0){if(v>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[C+16>>2]=v;c[v+24>>2]=C;break}}}while(0);v=c[a+(n+20)>>2]|0;if((v|0)==0){s=p;t=q;break}if(v>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[C+20>>2]=v;c[v+24>>2]=C;s=p;t=q;break}}else{s=e;t=j}}while(0);e=s;if(!(e>>>0<k>>>0)){Xa()}C=a+(j+ -4)|0;f=c[C>>2]|0;if((f&1|0)==0){Xa()}do{if((f&2|0)==0){if((l|0)==(c[12056>>2]|0)){D=(c[12044>>2]|0)+t|0;c[12044>>2]=D;c[12056>>2]=s;c[s+4>>2]=D|1;if((s|0)!=(c[12052>>2]|0)){i=b;return}c[12052>>2]=0;c[12040>>2]=0;i=b;return}if((l|0)==(c[12052>>2]|0)){D=(c[12040>>2]|0)+t|0;c[12040>>2]=D;c[12052>>2]=s;c[s+4>>2]=D|1;c[e+D>>2]=D;i=b;return}D=(f&-8)+t|0;E=f>>>3;b:do{if(f>>>0<256){w=c[a+j>>2]|0;h=c[a+(j|4)>>2]|0;d=12072+(E<<1<<2)|0;do{if((w|0)!=(d|0)){if(w>>>0<(c[12048>>2]|0)>>>0){Xa()}if((c[w+12>>2]|0)==(l|0)){break}Xa()}}while(0);if((h|0)==(w|0)){c[3008]=c[3008]&~(1<<E);break}do{if((h|0)==(d|0)){F=h+8|0}else{if(h>>>0<(c[12048>>2]|0)>>>0){Xa()}g=h+8|0;if((c[g>>2]|0)==(l|0)){F=g;break}Xa()}}while(0);c[w+12>>2]=h;c[F>>2]=w}else{d=k;g=c[a+(j+16)>>2]|0;v=c[a+(j|4)>>2]|0;do{if((v|0)==(d|0)){r=a+(j+12)|0;x=c[r>>2]|0;if((x|0)==0){o=a+(j+8)|0;m=c[o>>2]|0;if((m|0)==0){G=0;break}else{H=m;I=o}}else{H=x;I=r}while(1){r=H+20|0;x=c[r>>2]|0;if((x|0)!=0){I=r;H=x;continue}x=H+16|0;r=c[x>>2]|0;if((r|0)==0){break}else{H=r;I=x}}if(I>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[I>>2]=0;G=H;break}}else{x=c[a+j>>2]|0;if(x>>>0<(c[12048>>2]|0)>>>0){Xa()}r=x+12|0;if((c[r>>2]|0)!=(d|0)){Xa()}o=v+8|0;if((c[o>>2]|0)==(d|0)){c[r>>2]=v;c[o>>2]=x;G=v;break}else{Xa()}}}while(0);if((g|0)==0){break}v=c[a+(j+20)>>2]|0;w=12336+(v<<2)|0;do{if((d|0)==(c[w>>2]|0)){c[w>>2]=G;if((G|0)!=0){break}c[12036>>2]=c[12036>>2]&~(1<<v);break b}else{if(g>>>0<(c[12048>>2]|0)>>>0){Xa()}h=g+16|0;if((c[h>>2]|0)==(d|0)){c[h>>2]=G}else{c[g+20>>2]=G}if((G|0)==0){break b}}}while(0);if(G>>>0<(c[12048>>2]|0)>>>0){Xa()}c[G+24>>2]=g;d=c[a+(j+8)>>2]|0;do{if((d|0)!=0){if(d>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[G+16>>2]=d;c[d+24>>2]=G;break}}}while(0);d=c[a+(j+12)>>2]|0;if((d|0)==0){break}if(d>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[G+20>>2]=d;c[d+24>>2]=G;break}}}while(0);c[s+4>>2]=D|1;c[e+D>>2]=D;if((s|0)!=(c[12052>>2]|0)){J=D;break}c[12040>>2]=D;i=b;return}else{c[C>>2]=f&-2;c[s+4>>2]=t|1;c[e+t>>2]=t;J=t}}while(0);t=J>>>3;if(J>>>0<256){e=t<<1;f=12072+(e<<2)|0;C=c[3008]|0;G=1<<t;do{if((C&G|0)==0){c[3008]=C|G;K=12072+(e+2<<2)|0;L=f}else{t=12072+(e+2<<2)|0;j=c[t>>2]|0;if(!(j>>>0<(c[12048>>2]|0)>>>0)){K=t;L=j;break}Xa()}}while(0);c[K>>2]=s;c[L+12>>2]=s;c[s+8>>2]=L;c[s+12>>2]=f;i=b;return}f=s;L=J>>>8;do{if((L|0)==0){M=0}else{if(J>>>0>16777215){M=31;break}K=(L+1048320|0)>>>16&8;e=L<<K;G=(e+520192|0)>>>16&4;C=e<<G;e=(C+245760|0)>>>16&2;j=14-(G|K|e)+(C<<e>>>15)|0;M=J>>>(j+7|0)&1|j<<1}}while(0);L=12336+(M<<2)|0;c[s+28>>2]=M;c[s+20>>2]=0;c[s+16>>2]=0;j=c[12036>>2]|0;e=1<<M;c:do{if((j&e|0)==0){c[12036>>2]=j|e;c[L>>2]=f;c[s+24>>2]=L;c[s+12>>2]=s;c[s+8>>2]=s}else{C=c[L>>2]|0;if((M|0)==31){N=0}else{N=25-(M>>>1)|0}d:do{if((c[C+4>>2]&-8|0)==(J|0)){O=C}else{K=J<<N;G=C;while(1){P=G+(K>>>31<<2)+16|0;t=c[P>>2]|0;if((t|0)==0){break}if((c[t+4>>2]&-8|0)==(J|0)){O=t;break d}else{K=K<<1;G=t}}if(P>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[P>>2]=f;c[s+24>>2]=G;c[s+12>>2]=s;c[s+8>>2]=s;break c}}}while(0);C=O+8|0;D=c[C>>2]|0;K=c[12048>>2]|0;if(O>>>0<K>>>0){Xa()}if(D>>>0<K>>>0){Xa()}else{c[D+12>>2]=f;c[C>>2]=f;c[s+8>>2]=D;c[s+12>>2]=O;c[s+24>>2]=0;break}}}while(0);s=(c[12064>>2]|0)+ -1|0;c[12064>>2]=s;if((s|0)==0){Q=12488|0}else{i=b;return}while(1){s=c[Q>>2]|0;if((s|0)==0){break}else{Q=s+8|0}}c[12064>>2]=-1;i=b;return}function Am(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;if((a|0)==0){e=ym(b)|0;i=d;return e|0}if(b>>>0>4294967231){c[(pc()|0)>>2]=12;e=0;i=d;return e|0}if(b>>>0<11){f=16}else{f=b+11&-8}g=Bm(a+ -8|0,f)|0;if((g|0)!=0){e=g+8|0;i=d;return e|0}g=ym(b)|0;if((g|0)==0){e=0;i=d;return e|0}f=c[a+ -4>>2]|0;h=(f&-8)-((f&3|0)==0?8:4)|0;Xm(g|0,a|0,(h>>>0<b>>>0?h:b)|0)|0;zm(a);e=g;i=d;return e|0}function Bm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;d=i;e=a+4|0;f=c[e>>2]|0;g=f&-8;h=a;j=h+g|0;k=j;l=c[12048>>2]|0;if(h>>>0<l>>>0){Xa()}m=f&3;if(!((m|0)!=1&h>>>0<j>>>0)){Xa()}n=h+(g|4)|0;o=c[n>>2]|0;if((o&1|0)==0){Xa()}if((m|0)==0){if(b>>>0<256){p=0;i=d;return p|0}do{if(!(g>>>0<(b+4|0)>>>0)){if((g-b|0)>>>0>c[12512>>2]<<1>>>0){break}else{p=a}i=d;return p|0}}while(0);p=0;i=d;return p|0}if(!(g>>>0<b>>>0)){m=g-b|0;if(!(m>>>0>15)){p=a;i=d;return p|0}c[e>>2]=f&1|b|2;c[h+(b+4)>>2]=m|3;c[n>>2]=c[n>>2]|1;Cm(h+b|0,m);p=a;i=d;return p|0}if((k|0)==(c[12056>>2]|0)){m=(c[12044>>2]|0)+g|0;if(!(m>>>0>b>>>0)){p=0;i=d;return p|0}n=m-b|0;c[e>>2]=f&1|b|2;c[h+(b+4)>>2]=n|1;c[12056>>2]=h+b;c[12044>>2]=n;p=a;i=d;return p|0}if((k|0)==(c[12052>>2]|0)){n=(c[12040>>2]|0)+g|0;if(n>>>0<b>>>0){p=0;i=d;return p|0}m=n-b|0;if(m>>>0>15){c[e>>2]=f&1|b|2;c[h+(b+4)>>2]=m|1;c[h+n>>2]=m;q=h+(n+4)|0;c[q>>2]=c[q>>2]&-2;r=h+b|0;s=m}else{c[e>>2]=f&1|n|2;f=h+(n+4)|0;c[f>>2]=c[f>>2]|1;r=0;s=0}c[12040>>2]=s;c[12052>>2]=r;p=a;i=d;return p|0}if((o&2|0)!=0){p=0;i=d;return p|0}r=(o&-8)+g|0;if(r>>>0<b>>>0){p=0;i=d;return p|0}s=r-b|0;f=o>>>3;a:do{if(o>>>0<256){n=c[h+(g+8)>>2]|0;m=c[h+(g+12)>>2]|0;q=12072+(f<<1<<2)|0;do{if((n|0)!=(q|0)){if(n>>>0<l>>>0){Xa()}if((c[n+12>>2]|0)==(k|0)){break}Xa()}}while(0);if((m|0)==(n|0)){c[3008]=c[3008]&~(1<<f);break}do{if((m|0)==(q|0)){t=m+8|0}else{if(m>>>0<l>>>0){Xa()}u=m+8|0;if((c[u>>2]|0)==(k|0)){t=u;break}Xa()}}while(0);c[n+12>>2]=m;c[t>>2]=n}else{q=j;u=c[h+(g+24)>>2]|0;v=c[h+(g+12)>>2]|0;do{if((v|0)==(q|0)){w=h+(g+20)|0;x=c[w>>2]|0;if((x|0)==0){y=h+(g+16)|0;z=c[y>>2]|0;if((z|0)==0){A=0;break}else{B=z;C=y}}else{B=x;C=w}while(1){w=B+20|0;x=c[w>>2]|0;if((x|0)!=0){C=w;B=x;continue}x=B+16|0;w=c[x>>2]|0;if((w|0)==0){break}else{B=w;C=x}}if(C>>>0<l>>>0){Xa()}else{c[C>>2]=0;A=B;break}}else{x=c[h+(g+8)>>2]|0;if(x>>>0<l>>>0){Xa()}w=x+12|0;if((c[w>>2]|0)!=(q|0)){Xa()}y=v+8|0;if((c[y>>2]|0)==(q|0)){c[w>>2]=v;c[y>>2]=x;A=v;break}else{Xa()}}}while(0);if((u|0)==0){break}v=c[h+(g+28)>>2]|0;n=12336+(v<<2)|0;do{if((q|0)==(c[n>>2]|0)){c[n>>2]=A;if((A|0)!=0){break}c[12036>>2]=c[12036>>2]&~(1<<v);break a}else{if(u>>>0<(c[12048>>2]|0)>>>0){Xa()}m=u+16|0;if((c[m>>2]|0)==(q|0)){c[m>>2]=A}else{c[u+20>>2]=A}if((A|0)==0){break a}}}while(0);if(A>>>0<(c[12048>>2]|0)>>>0){Xa()}c[A+24>>2]=u;q=c[h+(g+16)>>2]|0;do{if((q|0)!=0){if(q>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[A+16>>2]=q;c[q+24>>2]=A;break}}}while(0);q=c[h+(g+20)>>2]|0;if((q|0)==0){break}if(q>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[A+20>>2]=q;c[q+24>>2]=A;break}}}while(0);if(s>>>0<16){c[e>>2]=r|c[e>>2]&1|2;A=h+(r|4)|0;c[A>>2]=c[A>>2]|1;p=a;i=d;return p|0}else{c[e>>2]=c[e>>2]&1|b|2;c[h+(b+4)>>2]=s|3;e=h+(r|4)|0;c[e>>2]=c[e>>2]|1;Cm(h+b|0,s);p=a;i=d;return p|0}return 0}function Cm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;d=i;e=a;f=e+b|0;g=f;h=c[a+4>>2]|0;a:do{if((h&1|0)==0){j=c[a>>2]|0;if((h&3|0)==0){i=d;return}k=e+(0-j)|0;l=k;m=j+b|0;n=c[12048>>2]|0;if(k>>>0<n>>>0){Xa()}if((l|0)==(c[12052>>2]|0)){o=e+(b+4)|0;if((c[o>>2]&3|0)!=3){p=l;q=m;break}c[12040>>2]=m;c[o>>2]=c[o>>2]&-2;c[e+(4-j)>>2]=m|1;c[f>>2]=m;i=d;return}o=j>>>3;if(j>>>0<256){r=c[e+(8-j)>>2]|0;s=c[e+(12-j)>>2]|0;t=12072+(o<<1<<2)|0;do{if((r|0)!=(t|0)){if(r>>>0<n>>>0){Xa()}if((c[r+12>>2]|0)==(l|0)){break}Xa()}}while(0);if((s|0)==(r|0)){c[3008]=c[3008]&~(1<<o);p=l;q=m;break}do{if((s|0)==(t|0)){u=s+8|0}else{if(s>>>0<n>>>0){Xa()}v=s+8|0;if((c[v>>2]|0)==(l|0)){u=v;break}Xa()}}while(0);c[r+12>>2]=s;c[u>>2]=r;p=l;q=m;break}t=k;o=c[e+(24-j)>>2]|0;v=c[e+(12-j)>>2]|0;do{if((v|0)==(t|0)){w=16-j|0;x=e+(w+4)|0;y=c[x>>2]|0;if((y|0)==0){z=e+w|0;w=c[z>>2]|0;if((w|0)==0){A=0;break}else{B=w;C=z}}else{B=y;C=x}while(1){x=B+20|0;y=c[x>>2]|0;if((y|0)!=0){C=x;B=y;continue}y=B+16|0;x=c[y>>2]|0;if((x|0)==0){break}else{B=x;C=y}}if(C>>>0<n>>>0){Xa()}else{c[C>>2]=0;A=B;break}}else{y=c[e+(8-j)>>2]|0;if(y>>>0<n>>>0){Xa()}x=y+12|0;if((c[x>>2]|0)!=(t|0)){Xa()}z=v+8|0;if((c[z>>2]|0)==(t|0)){c[x>>2]=v;c[z>>2]=y;A=v;break}else{Xa()}}}while(0);if((o|0)==0){p=l;q=m;break}v=c[e+(28-j)>>2]|0;n=12336+(v<<2)|0;do{if((t|0)==(c[n>>2]|0)){c[n>>2]=A;if((A|0)!=0){break}c[12036>>2]=c[12036>>2]&~(1<<v);p=l;q=m;break a}else{if(o>>>0<(c[12048>>2]|0)>>>0){Xa()}k=o+16|0;if((c[k>>2]|0)==(t|0)){c[k>>2]=A}else{c[o+20>>2]=A}if((A|0)==0){p=l;q=m;break a}}}while(0);if(A>>>0<(c[12048>>2]|0)>>>0){Xa()}c[A+24>>2]=o;t=16-j|0;v=c[e+t>>2]|0;do{if((v|0)!=0){if(v>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[A+16>>2]=v;c[v+24>>2]=A;break}}}while(0);v=c[e+(t+4)>>2]|0;if((v|0)==0){p=l;q=m;break}if(v>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[A+20>>2]=v;c[v+24>>2]=A;p=l;q=m;break}}else{p=a;q=b}}while(0);a=c[12048>>2]|0;if(f>>>0<a>>>0){Xa()}A=e+(b+4)|0;B=c[A>>2]|0;do{if((B&2|0)==0){if((g|0)==(c[12056>>2]|0)){C=(c[12044>>2]|0)+q|0;c[12044>>2]=C;c[12056>>2]=p;c[p+4>>2]=C|1;if((p|0)!=(c[12052>>2]|0)){i=d;return}c[12052>>2]=0;c[12040>>2]=0;i=d;return}if((g|0)==(c[12052>>2]|0)){C=(c[12040>>2]|0)+q|0;c[12040>>2]=C;c[12052>>2]=p;c[p+4>>2]=C|1;c[p+C>>2]=C;i=d;return}C=(B&-8)+q|0;u=B>>>3;b:do{if(B>>>0<256){h=c[e+(b+8)>>2]|0;v=c[e+(b+12)>>2]|0;j=12072+(u<<1<<2)|0;do{if((h|0)!=(j|0)){if(h>>>0<a>>>0){Xa()}if((c[h+12>>2]|0)==(g|0)){break}Xa()}}while(0);if((v|0)==(h|0)){c[3008]=c[3008]&~(1<<u);break}do{if((v|0)==(j|0)){D=v+8|0}else{if(v>>>0<a>>>0){Xa()}o=v+8|0;if((c[o>>2]|0)==(g|0)){D=o;break}Xa()}}while(0);c[h+12>>2]=v;c[D>>2]=h}else{j=f;o=c[e+(b+24)>>2]|0;n=c[e+(b+12)>>2]|0;do{if((n|0)==(j|0)){k=e+(b+20)|0;r=c[k>>2]|0;if((r|0)==0){s=e+(b+16)|0;y=c[s>>2]|0;if((y|0)==0){E=0;break}else{F=y;G=s}}else{F=r;G=k}while(1){k=F+20|0;r=c[k>>2]|0;if((r|0)!=0){G=k;F=r;continue}r=F+16|0;k=c[r>>2]|0;if((k|0)==0){break}else{F=k;G=r}}if(G>>>0<a>>>0){Xa()}else{c[G>>2]=0;E=F;break}}else{r=c[e+(b+8)>>2]|0;if(r>>>0<a>>>0){Xa()}k=r+12|0;if((c[k>>2]|0)!=(j|0)){Xa()}s=n+8|0;if((c[s>>2]|0)==(j|0)){c[k>>2]=n;c[s>>2]=r;E=n;break}else{Xa()}}}while(0);if((o|0)==0){break}n=c[e+(b+28)>>2]|0;h=12336+(n<<2)|0;do{if((j|0)==(c[h>>2]|0)){c[h>>2]=E;if((E|0)!=0){break}c[12036>>2]=c[12036>>2]&~(1<<n);break b}else{if(o>>>0<(c[12048>>2]|0)>>>0){Xa()}v=o+16|0;if((c[v>>2]|0)==(j|0)){c[v>>2]=E}else{c[o+20>>2]=E}if((E|0)==0){break b}}}while(0);if(E>>>0<(c[12048>>2]|0)>>>0){Xa()}c[E+24>>2]=o;j=c[e+(b+16)>>2]|0;do{if((j|0)!=0){if(j>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[E+16>>2]=j;c[j+24>>2]=E;break}}}while(0);j=c[e+(b+20)>>2]|0;if((j|0)==0){break}if(j>>>0<(c[12048>>2]|0)>>>0){Xa()}else{c[E+20>>2]=j;c[j+24>>2]=E;break}}}while(0);c[p+4>>2]=C|1;c[p+C>>2]=C;if((p|0)!=(c[12052>>2]|0)){H=C;break}c[12040>>2]=C;i=d;return}else{c[A>>2]=B&-2;c[p+4>>2]=q|1;c[p+q>>2]=q;H=q}}while(0);q=H>>>3;if(H>>>0<256){B=q<<1;A=12072+(B<<2)|0;E=c[3008]|0;b=1<<q;do{if((E&b|0)==0){c[3008]=E|b;I=12072+(B+2<<2)|0;J=A}else{q=12072+(B+2<<2)|0;e=c[q>>2]|0;if(!(e>>>0<(c[12048>>2]|0)>>>0)){I=q;J=e;break}Xa()}}while(0);c[I>>2]=p;c[J+12>>2]=p;c[p+8>>2]=J;c[p+12>>2]=A;i=d;return}A=p;J=H>>>8;do{if((J|0)==0){K=0}else{if(H>>>0>16777215){K=31;break}I=(J+1048320|0)>>>16&8;B=J<<I;b=(B+520192|0)>>>16&4;E=B<<b;B=(E+245760|0)>>>16&2;e=14-(b|I|B)+(E<<B>>>15)|0;K=H>>>(e+7|0)&1|e<<1}}while(0);J=12336+(K<<2)|0;c[p+28>>2]=K;c[p+20>>2]=0;c[p+16>>2]=0;e=c[12036>>2]|0;B=1<<K;if((e&B|0)==0){c[12036>>2]=e|B;c[J>>2]=A;c[p+24>>2]=J;c[p+12>>2]=p;c[p+8>>2]=p;i=d;return}B=c[J>>2]|0;if((K|0)==31){L=0}else{L=25-(K>>>1)|0}c:do{if((c[B+4>>2]&-8|0)==(H|0)){M=B}else{K=H<<L;J=B;while(1){N=J+(K>>>31<<2)+16|0;e=c[N>>2]|0;if((e|0)==0){break}if((c[e+4>>2]&-8|0)==(H|0)){M=e;break c}else{K=K<<1;J=e}}if(N>>>0<(c[12048>>2]|0)>>>0){Xa()}c[N>>2]=A;c[p+24>>2]=J;c[p+12>>2]=p;c[p+8>>2]=p;i=d;return}}while(0);N=M+8|0;H=c[N>>2]|0;B=c[12048>>2]|0;if(M>>>0<B>>>0){Xa()}if(H>>>0<B>>>0){Xa()}c[H+12>>2]=A;c[N>>2]=A;c[p+8>>2]=H;c[p+12>>2]=M;c[p+24>>2]=0;i=d;return}function Dm(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0.0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0.0,P=0,Q=0.0,R=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,ea=0.0,fa=0,ga=0.0,ha=0,ia=0.0,ja=0,ka=0.0,la=0.0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0.0,ua=0,va=0.0,wa=0,xa=0,ya=0,za=0,Aa=0.0,Ba=0,Ca=0.0,Da=0.0,Ea=0,Fa=0.0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Sb=0,Tb=0,Ub=0,Vb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0.0,xc=0,yc=0,zc=0.0,Ac=0.0,Bc=0.0,Cc=0.0,Dc=0.0,Ec=0.0,Fc=0,Gc=0,Hc=0.0,Ic=0,Jc=0.0,Kc=0,Lc=0,Mc=0,Nc=0,Oc=0;g=i;i=i+512|0;h=g;if((e|0)==1){j=53;k=-1074}else if((e|0)==0){j=24;k=-149}else if((e|0)==2){j=53;k=-1074}else{l=0.0;i=g;return+l}e=b+4|0;m=b+100|0;do{n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;o=d[n]|0}else{o=Gm(b)|0}}while((Wb(o|0)|0)!=0);do{if((o|0)==43|(o|0)==45){n=1-(((o|0)==45)<<1)|0;p=c[e>>2]|0;if(p>>>0<(c[m>>2]|0)>>>0){c[e>>2]=p+1;q=d[p]|0;r=n;break}else{q=Gm(b)|0;r=n;break}}else{q=o;r=1}}while(0);o=q;q=0;while(1){if((o|32|0)!=(a[12528+q|0]|0)){s=o;t=q;break}do{if(q>>>0<7){n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;u=d[n]|0;break}else{u=Gm(b)|0;break}}else{u=o}}while(0);n=q+1|0;if(n>>>0<8){o=u;q=n}else{s=u;t=n;break}}do{if((t|0)==3){v=23}else if((t|0)!=8){u=(f|0)==0;if(!(t>>>0<4|u)){if((t|0)==8){break}else{v=23;break}}a:do{if((t|0)==0){q=s;o=0;while(1){if((q|32|0)!=(a[12544+o|0]|0)){y=q;z=o;break a}do{if(o>>>0<2){n=c[e>>2]|0;if(n>>>0<(c[m>>2]|0)>>>0){c[e>>2]=n+1;A=d[n]|0;break}else{A=Gm(b)|0;break}}else{A=q}}while(0);n=o+1|0;if(n>>>0<3){q=A;o=n}else{y=A;z=n;break}}}else{y=s;z=t}}while(0);if((z|0)==0){do{if((y|0)==48){o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;B=d[o]|0}else{B=Gm(b)|0}if((B|32|0)!=120){if((c[m>>2]|0)==0){C=48;break}c[e>>2]=(c[e>>2]|0)+ -1;C=48;break}o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;D=d[o]|0;E=0}else{D=Gm(b)|0;E=0}while(1){if((D|0)==46){v=70;break}else if((D|0)!=48){F=0;G=0;I=0;J=0;K=D;L=E;M=0;N=0;O=1.0;P=0;Q=0.0;break}o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;D=d[o]|0;E=1;continue}else{D=Gm(b)|0;E=1;continue}}b:do{if((v|0)==70){o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;R=d[o]|0}else{R=Gm(b)|0}if((R|0)==48){T=-1;U=-1}else{F=0;G=0;I=0;J=0;K=R;L=E;M=1;N=0;O=1.0;P=0;Q=0.0;break}while(1){o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;V=d[o]|0}else{V=Gm(b)|0}if((V|0)!=48){F=T;G=U;I=0;J=0;K=V;L=1;M=1;N=0;O=1.0;P=0;Q=0.0;break b}o=Tm(T|0,U|0,-1,-1)|0;T=o;U=H}}}while(0);c:while(1){o=K+ -48|0;do{if(o>>>0<10){W=o;v=84}else{q=K|32;n=(K|0)==46;if(!((q+ -97|0)>>>0<6|n)){X=K;break c}if(n){if((M|0)==0){Y=I;Z=J;_=I;$=J;aa=L;ba=1;ca=N;ea=O;fa=P;ga=Q;break}else{X=46;break c}}else{W=(K|0)>57?q+ -87|0:o;v=84;break}}}while(0);if((v|0)==84){v=0;do{if((J|0)<0|(J|0)==0&I>>>0<8){ha=N;ia=O;ja=W+(P<<4)|0;ka=Q}else{if((J|0)<0|(J|0)==0&I>>>0<14){la=O*.0625;ha=N;ia=la;ja=P;ka=Q+la*+(W|0);break}if(!((W|0)!=0&(N|0)==0)){ha=N;ia=O;ja=P;ka=Q;break}ha=1;ia=O;ja=P;ka=Q+O*.5}}while(0);o=Tm(I|0,J|0,1,0)|0;Y=F;Z=G;_=o;$=H;aa=1;ba=M;ca=ha;ea=ia;fa=ja;ga=ka}o=c[e>>2]|0;if(o>>>0<(c[m>>2]|0)>>>0){c[e>>2]=o+1;F=Y;G=Z;I=_;J=$;K=d[o]|0;L=aa;M=ba;N=ca;O=ea;P=fa;Q=ga;continue}else{F=Y;G=Z;I=_;J=$;K=Gm(b)|0;L=aa;M=ba;N=ca;O=ea;P=fa;Q=ga;continue}}if((L|0)==0){o=(c[m>>2]|0)==0;if(!o){c[e>>2]=(c[e>>2]|0)+ -1}do{if(u){Fm(b,0)}else{if(o){break}q=c[e>>2]|0;c[e>>2]=q+ -1;if((M|0)==0){break}c[e>>2]=q+ -2}}while(0);l=+(r|0)*0.0;i=g;return+l}o=(M|0)==0;q=o?I:F;n=o?J:G;if((J|0)<0|(J|0)==0&I>>>0<8){o=I;p=J;ma=P;while(1){na=ma<<4;oa=Tm(o|0,p|0,1,0)|0;pa=H;if((pa|0)<0|(pa|0)==0&oa>>>0<8){ma=na;p=pa;o=oa}else{qa=na;break}}}else{qa=P}do{if((X|32|0)==112){o=Em(b,f)|0;p=H;if(!((o|0)==0&(p|0)==-2147483648)){ra=o;sa=p;break}if(u){Fm(b,0);l=0.0;i=g;return+l}else{if((c[m>>2]|0)==0){ra=0;sa=0;break}c[e>>2]=(c[e>>2]|0)+ -1;ra=0;sa=0;break}}else{if((c[m>>2]|0)==0){ra=0;sa=0;break}c[e>>2]=(c[e>>2]|0)+ -1;ra=0;sa=0}}while(0);p=Ym(q|0,n|0,2)|0;o=Tm(p|0,H|0,-32,-1)|0;p=Tm(o|0,H|0,ra|0,sa|0)|0;o=H;if((qa|0)==0){l=+(r|0)*0.0;i=g;return+l}if((o|0)>0|(o|0)==0&p>>>0>(0-k|0)>>>0){c[(pc()|0)>>2]=34;l=+(r|0)*1.7976931348623157e+308*1.7976931348623157e+308;i=g;return+l}ma=k+ -106|0;na=((ma|0)<0)<<31>>31;if((o|0)<(na|0)|(o|0)==(na|0)&p>>>0<ma>>>0){c[(pc()|0)>>2]=34;l=+(r|0)*2.2250738585072014e-308*2.2250738585072014e-308;i=g;return+l}if((qa|0)>-1){ma=p;na=o;oa=qa;la=Q;while(1){pa=oa<<1;if(!(la>=.5)){ta=la;ua=pa}else{ta=la+-1.0;ua=pa|1}va=la+ta;pa=Tm(ma|0,na|0,-1,-1)|0;wa=H;if((ua|0)>-1){ma=pa;na=wa;oa=ua;la=va}else{xa=pa;ya=wa;za=ua;Aa=va;break}}}else{xa=p;ya=o;za=qa;Aa=Q}oa=Sm(32,0,k|0,((k|0)<0)<<31>>31|0)|0;na=Tm(xa|0,ya|0,oa|0,H|0)|0;oa=H;if(0>(oa|0)|0==(oa|0)&j>>>0>na>>>0){Ba=(na|0)<0?0:na}else{Ba=j}do{if((Ba|0)<53){la=+(r|0);va=+Rb(+(+Hm(1.0,84-Ba|0)),+la);if(!((Ba|0)<32&Aa!=0.0)){Ca=la;Da=va;Ea=za;Fa=Aa;break}na=za&1;Ca=la;Da=va;Ea=(na^1)+za|0;Fa=(na|0)==0?0.0:Aa}else{Ca=+(r|0);Da=0.0;Ea=za;Fa=Aa}}while(0);va=Ca*Fa+(Da+Ca*+(Ea>>>0))-Da;if(!(va!=0.0)){c[(pc()|0)>>2]=34}l=+Im(va,xa);i=g;return+l}else{C=y}}while(0);o=k+j|0;p=0-o|0;na=C;oa=0;while(1){if((na|0)==46){v=139;break}else if((na|0)!=48){Ga=na;Ha=0;Ia=0;Ja=oa;Ka=0;break}ma=c[e>>2]|0;if(ma>>>0<(c[m>>2]|0)>>>0){c[e>>2]=ma+1;na=d[ma]|0;oa=1;continue}else{na=Gm(b)|0;oa=1;continue}}d:do{if((v|0)==139){na=c[e>>2]|0;if(na>>>0<(c[m>>2]|0)>>>0){c[e>>2]=na+1;La=d[na]|0}else{La=Gm(b)|0}if((La|0)==48){Ma=-1;Na=-1}else{Ga=La;Ha=0;Ia=0;Ja=oa;Ka=1;break}while(1){na=c[e>>2]|0;if(na>>>0<(c[m>>2]|0)>>>0){c[e>>2]=na+1;Oa=d[na]|0}else{Oa=Gm(b)|0}if((Oa|0)!=48){Ga=Oa;Ha=Ma;Ia=Na;Ja=1;Ka=1;break d}na=Tm(Ma|0,Na|0,-1,-1)|0;Ma=na;Na=H}}}while(0);oa=h;c[oa>>2]=0;na=Ga+ -48|0;ma=(Ga|0)==46;e:do{if(na>>>0<10|ma){n=h+496|0;q=Ga;wa=ma;pa=na;Pa=0;Qa=0;Ra=Ha;Sa=Ia;Ta=Ja;Ua=Ka;Va=0;Wa=0;Xa=0;while(1){do{if(wa){if((Ua|0)==0){Ya=Pa;Za=Qa;_a=Pa;$a=Qa;ab=Ta;bb=1;cb=Va;db=Wa;eb=Xa}else{fb=q;gb=Pa;hb=Qa;ib=Ra;jb=Sa;kb=Ta;lb=Va;mb=Wa;nb=Xa;break e}}else{ob=Tm(Pa|0,Qa|0,1,0)|0;pb=H;qb=(q|0)!=48;if((Wa|0)>=125){if(!qb){Ya=Ra;Za=Sa;_a=ob;$a=pb;ab=Ta;bb=Ua;cb=Va;db=Wa;eb=Xa;break}c[n>>2]=c[n>>2]|1;Ya=Ra;Za=Sa;_a=ob;$a=pb;ab=Ta;bb=Ua;cb=Va;db=Wa;eb=Xa;break}rb=h+(Wa<<2)|0;if((Va|0)==0){sb=pa}else{sb=q+ -48+((c[rb>>2]|0)*10|0)|0}c[rb>>2]=sb;rb=Va+1|0;tb=(rb|0)==9;Ya=Ra;Za=Sa;_a=ob;$a=pb;ab=1;bb=Ua;cb=tb?0:rb;db=(tb&1)+Wa|0;eb=qb?ob:Xa}}while(0);ob=c[e>>2]|0;if(ob>>>0<(c[m>>2]|0)>>>0){c[e>>2]=ob+1;ub=d[ob]|0}else{ub=Gm(b)|0}ob=ub+ -48|0;qb=(ub|0)==46;if(ob>>>0<10|qb){q=ub;wa=qb;pa=ob;Pa=_a;Qa=$a;Ra=Ya;Sa=Za;Ta=ab;Ua=bb;Va=cb;Wa=db;Xa=eb}else{vb=ub;wb=_a;yb=$a;zb=Ya;Ab=Za;Bb=ab;Cb=bb;Db=cb;Eb=db;Fb=eb;v=162;break}}}else{vb=Ga;wb=0;yb=0;zb=Ha;Ab=Ia;Bb=Ja;Cb=Ka;Db=0;Eb=0;Fb=0;v=162}}while(0);if((v|0)==162){na=(Cb|0)==0;fb=vb;gb=wb;hb=yb;ib=na?wb:zb;jb=na?yb:Ab;kb=Bb;lb=Db;mb=Eb;nb=Fb}na=(kb|0)!=0;do{if(na){if((fb|32|0)!=101){v=171;break}ma=Em(b,f)|0;Xa=H;do{if((ma|0)==0&(Xa|0)==-2147483648){if(u){Fm(b,0);l=0.0;i=g;return+l}else{if((c[m>>2]|0)==0){Gb=0;Hb=0;break}c[e>>2]=(c[e>>2]|0)+ -1;Gb=0;Hb=0;break}}else{Gb=ma;Hb=Xa}}while(0);Xa=Tm(Gb|0,Hb|0,ib|0,jb|0)|0;Ib=Xa;Jb=H}else{v=171}}while(0);do{if((v|0)==171){if(!((fb|0)>-1)){Ib=ib;Jb=jb;break}if((c[m>>2]|0)==0){Ib=ib;Jb=jb;break}c[e>>2]=(c[e>>2]|0)+ -1;Ib=ib;Jb=jb}}while(0);if(!na){c[(pc()|0)>>2]=22;Fm(b,0);l=0.0;i=g;return+l}Xa=c[oa>>2]|0;if((Xa|0)==0){l=+(r|0)*0.0;i=g;return+l}do{if((Ib|0)==(gb|0)&(Jb|0)==(hb|0)&((hb|0)<0|(hb|0)==0&gb>>>0<10)){if(!(j>>>0>30)){if((Xa>>>j|0)!=0){break}}l=+(r|0)*+(Xa>>>0);i=g;return+l}}while(0);Xa=(k|0)/-2|0;na=((Xa|0)<0)<<31>>31;if((Jb|0)>(na|0)|(Jb|0)==(na|0)&Ib>>>0>Xa>>>0){c[(pc()|0)>>2]=34;l=+(r|0)*1.7976931348623157e+308*1.7976931348623157e+308;i=g;return+l}Xa=k+ -106|0;na=((Xa|0)<0)<<31>>31;if((Jb|0)<(na|0)|(Jb|0)==(na|0)&Ib>>>0<Xa>>>0){c[(pc()|0)>>2]=34;l=+(r|0)*2.2250738585072014e-308*2.2250738585072014e-308;i=g;return+l}if((lb|0)==0){Kb=mb}else{if((lb|0)<9){Xa=h+(mb<<2)|0;na=c[Xa>>2]|0;ma=lb;do{na=na*10|0;ma=ma+1|0;}while((ma|0)!=9);c[Xa>>2]=na}Kb=mb+1|0}do{if((nb|0)<9){if(!((nb|0)<=(Ib|0)&(Ib|0)<18)){break}if((Ib|0)==9){l=+(r|0)*+((c[oa>>2]|0)>>>0);i=g;return+l}if((Ib|0)<9){l=+(r|0)*+((c[oa>>2]|0)>>>0)/+(c[12560+(8-Ib<<2)>>2]|0);i=g;return+l}ma=j+27+(da(Ib,-3)|0)|0;Wa=c[oa>>2]|0;if((ma|0)<=30){if((Wa>>>ma|0)!=0){break}}l=+(r|0)*+(Wa>>>0)*+(c[12560+(Ib+ -10<<2)>>2]|0);i=g;return+l}}while(0);oa=(Ib|0)%9|0;if((oa|0)==0){Lb=0;Mb=0;Nb=Ib;Ob=Kb}else{na=(Ib|0)>-1?oa:oa+9|0;oa=c[12560+(8-na<<2)>>2]|0;do{if((Kb|0)==0){Pb=0;Qb=Ib;Sb=0}else{Xa=1e9/(oa|0)|0;Wa=0;ma=0;Va=0;Ua=Ib;while(1){Ta=h+(Va<<2)|0;Sa=c[Ta>>2]|0;Ra=((Sa>>>0)/(oa>>>0)|0)+ma|0;c[Ta>>2]=Ra;Tb=da((Sa>>>0)%(oa>>>0)|0,Xa)|0;Sa=Va+1|0;if((Va|0)==(Wa|0)&(Ra|0)==0){Ub=Sa&127;Vb=Ua+ -9|0}else{Ub=Wa;Vb=Ua}if((Sa|0)==(Kb|0)){break}else{Wa=Ub;Ua=Vb;Va=Sa;ma=Tb}}if((Tb|0)==0){Pb=Ub;Qb=Vb;Sb=Kb;break}c[h+(Kb<<2)>>2]=Tb;Pb=Ub;Qb=Vb;Sb=Kb+1|0}}while(0);Lb=Pb;Mb=0;Nb=9-na+Qb|0;Ob=Sb}f:while(1){oa=h+(Lb<<2)|0;if((Nb|0)<18){ma=Mb;Va=Ob;while(1){Ua=0;Wa=Va+127|0;Xa=Va;while(1){Sa=Wa&127;Ra=h+(Sa<<2)|0;Ta=Ym(c[Ra>>2]|0,0,29)|0;Qa=Tm(Ta|0,H|0,Ua|0,0)|0;Ta=H;if(Ta>>>0>0|(Ta|0)==0&Qa>>>0>1e9){Pa=gn(Qa|0,Ta|0,1e9,0)|0;pa=hn(Qa|0,Ta|0,1e9,0)|0;Xb=pa;Yb=Pa}else{Xb=Qa;Yb=0}c[Ra>>2]=Xb;Ra=(Sa|0)==(Lb|0);if((Sa|0)!=(Xa+127&127|0)|Ra){Zb=Xa}else{Zb=(Xb|0)==0?Sa:Xa}if(Ra){break}else{Ua=Yb;Wa=Sa+ -1|0;Xa=Zb}}Xa=ma+ -29|0;if((Yb|0)==0){ma=Xa;Va=Zb}else{_b=Xa;$b=Yb;ac=Zb;break}}}else{if((Nb|0)==18){bc=Mb;cc=Ob}else{dc=Lb;ec=Mb;fc=Nb;gc=Ob;break}while(1){if(!((c[oa>>2]|0)>>>0<9007199)){dc=Lb;ec=bc;fc=18;gc=cc;break f}Va=0;ma=cc+127|0;Xa=cc;while(1){Wa=ma&127;Ua=h+(Wa<<2)|0;Sa=Ym(c[Ua>>2]|0,0,29)|0;Ra=Tm(Sa|0,H|0,Va|0,0)|0;Sa=H;if(Sa>>>0>0|(Sa|0)==0&Ra>>>0>1e9){Qa=gn(Ra|0,Sa|0,1e9,0)|0;Pa=hn(Ra|0,Sa|0,1e9,0)|0;hc=Pa;ic=Qa}else{hc=Ra;ic=0}c[Ua>>2]=hc;Ua=(Wa|0)==(Lb|0);if((Wa|0)!=(Xa+127&127|0)|Ua){jc=Xa}else{jc=(hc|0)==0?Wa:Xa}if(Ua){break}else{Va=ic;ma=Wa+ -1|0;Xa=jc}}Xa=bc+ -29|0;if((ic|0)==0){bc=Xa;cc=jc}else{_b=Xa;$b=ic;ac=jc;break}}}oa=Lb+127&127;if((oa|0)==(ac|0)){Xa=ac+127&127;ma=h+((ac+126&127)<<2)|0;c[ma>>2]=c[ma>>2]|c[h+(Xa<<2)>>2];kc=Xa}else{kc=ac}c[h+(oa<<2)>>2]=$b;Lb=oa;Mb=_b;Nb=Nb+9|0;Ob=kc}g:while(1){lc=gc+1&127;na=h+((gc+127&127)<<2)|0;oa=dc;Xa=ec;ma=fc;while(1){Va=(ma|0)==18;Wa=(ma|0)>27?9:1;mc=oa;nc=Xa;while(1){Ua=0;while(1){Ra=Ua+mc&127;if((Ra|0)==(gc|0)){oc=2;break}Qa=c[h+(Ra<<2)>>2]|0;Ra=c[12552+(Ua<<2)>>2]|0;if(Qa>>>0<Ra>>>0){oc=2;break}Pa=Ua+1|0;if(Qa>>>0>Ra>>>0){oc=Ua;break}if((Pa|0)<2){Ua=Pa}else{oc=Pa;break}}if((oc|0)==2&Va){break g}qc=Wa+nc|0;if((mc|0)==(gc|0)){mc=gc;nc=qc}else{break}}Va=(1<<Wa)+ -1|0;Ua=1e9>>>Wa;rc=mc;sc=0;Pa=mc;tc=ma;do{Ra=h+(Pa<<2)|0;Qa=c[Ra>>2]|0;Sa=(Qa>>>Wa)+sc|0;c[Ra>>2]=Sa;sc=da(Qa&Va,Ua)|0;Qa=(Pa|0)==(rc|0)&(Sa|0)==0;Pa=Pa+1&127;tc=Qa?tc+ -9|0:tc;rc=Qa?Pa:rc;}while((Pa|0)!=(gc|0));if((sc|0)==0){oa=rc;Xa=qc;ma=tc;continue}if((lc|0)!=(rc|0)){break}c[na>>2]=c[na>>2]|1;oa=rc;Xa=qc;ma=tc}c[h+(gc<<2)>>2]=sc;dc=rc;ec=qc;fc=tc;gc=lc}ma=mc&127;if((ma|0)==(gc|0)){c[h+(lc+ -1<<2)>>2]=0;uc=lc}else{uc=gc}va=+((c[h+(ma<<2)>>2]|0)>>>0);ma=mc+1&127;if((ma|0)==(uc|0)){Xa=uc+1&127;c[h+(Xa+ -1<<2)>>2]=0;vc=Xa}else{vc=uc}la=+(r|0);wc=la*(va*1.0e9+ +((c[h+(ma<<2)>>2]|0)>>>0));ma=nc+53|0;Xa=ma-k|0;if((Xa|0)<(j|0)){xc=(Xa|0)<0?0:Xa;yc=1}else{xc=j;yc=0}if((xc|0)<53){va=+Rb(+(+Hm(1.0,105-xc|0)),+wc);zc=+xb(+wc,+(+Hm(1.0,53-xc|0)));Ac=va;Bc=zc;Cc=va+(wc-zc)}else{Ac=0.0;Bc=0.0;Cc=wc}oa=mc+2&127;do{if((oa|0)==(vc|0)){Dc=Bc}else{na=c[h+(oa<<2)>>2]|0;do{if(na>>>0<5e8){if((na|0)==0){if((mc+3&127|0)==(vc|0)){Ec=Bc;break}}Ec=la*.25+Bc}else{if(na>>>0>5e8){Ec=la*.75+Bc;break}if((mc+3&127|0)==(vc|0)){Ec=la*.5+Bc;break}else{Ec=la*.75+Bc;break}}}while(0);if((53-xc|0)<=1){Dc=Ec;break}if(+xb(+Ec,1.0)!=0.0){Dc=Ec;break}Dc=Ec+1.0}}while(0);la=Cc+Dc-Ac;do{if((ma&2147483647|0)>(-2-o|0)){if(!(+S(+la)>=9007199254740992.0)){Fc=yc;Gc=nc;Hc=la}else{Fc=(yc|0)!=0&(xc|0)==(Xa|0)?0:yc;Gc=nc+1|0;Hc=la*.5}if((Gc+50|0)<=(p|0)){if(!((Fc|0)!=0&Dc!=0.0)){Ic=Gc;Jc=Hc;break}}c[(pc()|0)>>2]=34;Ic=Gc;Jc=Hc}else{Ic=nc;Jc=la}}while(0);l=+Im(Jc,Ic);i=g;return+l}else if((z|0)==3){p=c[e>>2]|0;if(p>>>0<(c[m>>2]|0)>>>0){c[e>>2]=p+1;Kc=d[p]|0}else{Kc=Gm(b)|0}if((Kc|0)==40){Lc=1}else{if((c[m>>2]|0)==0){l=w;i=g;return+l}c[e>>2]=(c[e>>2]|0)+ -1;l=w;i=g;return+l}while(1){p=c[e>>2]|0;if(p>>>0<(c[m>>2]|0)>>>0){c[e>>2]=p+1;Mc=d[p]|0}else{Mc=Gm(b)|0}if(!((Mc+ -48|0)>>>0<10|(Mc+ -65|0)>>>0<26)){if(!((Mc+ -97|0)>>>0<26|(Mc|0)==95)){break}}Lc=Lc+1|0}if((Mc|0)==41){l=w;i=g;return+l}p=(c[m>>2]|0)==0;if(!p){c[e>>2]=(c[e>>2]|0)+ -1}if(u){c[(pc()|0)>>2]=22;Fm(b,0);l=0.0;i=g;return+l}if((Lc|0)==0|p){l=w;i=g;return+l}else{Nc=Lc}while(1){p=Nc+ -1|0;c[e>>2]=(c[e>>2]|0)+ -1;if((p|0)==0){l=w;break}else{Nc=p}}i=g;return+l}else{if((c[m>>2]|0)!=0){c[e>>2]=(c[e>>2]|0)+ -1}c[(pc()|0)>>2]=22;Fm(b,0);l=0.0;i=g;return+l}}}while(0);do{if((v|0)==23){b=(c[m>>2]|0)==0;if(!b){c[e>>2]=(c[e>>2]|0)+ -1}if(t>>>0<4|(f|0)==0|b){break}else{Oc=t}do{c[e>>2]=(c[e>>2]|0)+ -1;Oc=Oc+ -1|0;}while(Oc>>>0>3)}}while(0);l=+(r|0)*x;i=g;return+l}function Em(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;e=i;f=a+4|0;g=c[f>>2]|0;h=a+100|0;if(g>>>0<(c[h>>2]|0)>>>0){c[f>>2]=g+1;j=d[g]|0}else{j=Gm(a)|0}do{if((j|0)==43|(j|0)==45){g=(j|0)==45|0;k=c[f>>2]|0;if(k>>>0<(c[h>>2]|0)>>>0){c[f>>2]=k+1;l=d[k]|0}else{l=Gm(a)|0}if((l+ -48|0)>>>0<10|(b|0)==0){m=l;n=g;break}if((c[h>>2]|0)==0){m=l;n=g;break}c[f>>2]=(c[f>>2]|0)+ -1;m=l;n=g}else{m=j;n=0}}while(0);if((m+ -48|0)>>>0>9){if((c[h>>2]|0)==0){o=0;p=-2147483648;H=p;i=e;return o|0}c[f>>2]=(c[f>>2]|0)+ -1;o=0;p=-2147483648;H=p;i=e;return o|0}else{q=m;r=0}while(1){s=q+ -48+r|0;m=c[f>>2]|0;if(m>>>0<(c[h>>2]|0)>>>0){c[f>>2]=m+1;t=d[m]|0}else{t=Gm(a)|0}if(!((t+ -48|0)>>>0<10&(s|0)<214748364)){break}q=t;r=s*10|0}r=((s|0)<0)<<31>>31;if((t+ -48|0)>>>0<10){q=s;m=r;j=t;while(1){l=fn(q|0,m|0,10,0)|0;b=H;g=Tm(j|0,((j|0)<0)<<31>>31|0,-48,-1)|0;k=Tm(g|0,H|0,l|0,b|0)|0;b=H;l=c[f>>2]|0;if(l>>>0<(c[h>>2]|0)>>>0){c[f>>2]=l+1;u=d[l]|0}else{u=Gm(a)|0}if((u+ -48|0)>>>0<10&((b|0)<21474836|(b|0)==21474836&k>>>0<2061584302)){j=u;m=b;q=k}else{v=k;w=b;x=u;break}}}else{v=s;w=r;x=t}if((x+ -48|0)>>>0<10){do{x=c[f>>2]|0;if(x>>>0<(c[h>>2]|0)>>>0){c[f>>2]=x+1;y=d[x]|0}else{y=Gm(a)|0}}while((y+ -48|0)>>>0<10)}if((c[h>>2]|0)!=0){c[f>>2]=(c[f>>2]|0)+ -1}f=(n|0)!=0;n=Sm(0,0,v|0,w|0)|0;o=f?n:v;p=f?H:w;H=p;i=e;return o|0}function Fm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;c[a+104>>2]=b;e=c[a+8>>2]|0;f=c[a+4>>2]|0;g=e-f|0;c[a+108>>2]=g;if((b|0)!=0&(g|0)>(b|0)){c[a+100>>2]=f+b;i=d;return}else{c[a+100>>2]=e;i=d;return}}function Gm(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;f=b+104|0;g=c[f>>2]|0;if((g|0)==0){h=3}else{if((c[b+108>>2]|0)<(g|0)){h=3}}do{if((h|0)==3){g=Km(b)|0;if((g|0)<0){break}j=c[f>>2]|0;k=c[b+8>>2]|0;do{if((j|0)==0){h=8}else{l=c[b+4>>2]|0;m=j-(c[b+108>>2]|0)+ -1|0;if((k-l|0)<=(m|0)){h=8;break}c[b+100>>2]=l+m}}while(0);if((h|0)==8){c[b+100>>2]=k}j=c[b+4>>2]|0;if((k|0)!=0){m=b+108|0;c[m>>2]=k+1-j+(c[m>>2]|0)}m=j+ -1|0;if((d[m]|0|0)==(g|0)){n=g;i=e;return n|0}a[m]=g;n=g;i=e;return n|0}}while(0);c[b+100>>2]=0;n=-1;i=e;return n|0}function Hm(a,b){a=+a;b=b|0;var d=0,e=0.0,f=0,g=0,j=0.0;d=i;do{if((b|0)>1023){e=a*8.98846567431158e+307;f=b+ -1023|0;if((f|0)<=1023){g=f;j=e;break}f=b+ -2046|0;g=(f|0)>1023?1023:f;j=e*8.98846567431158e+307}else{if(!((b|0)<-1022)){g=b;j=a;break}e=a*2.2250738585072014e-308;f=b+1022|0;if(!((f|0)<-1022)){g=f;j=e;break}f=b+2044|0;g=(f|0)<-1022?-1022:f;j=e*2.2250738585072014e-308}}while(0);b=Ym(g+1023|0,0,52)|0;g=H;c[k>>2]=b;c[k+4>>2]=g;a=j*+h[k>>3];i=d;return+a}function Im(a,b){a=+a;b=b|0;var c=0,d=0.0;c=i;d=+Hm(a,b);i=c;return+d}function Jm(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0;d=i;e=b+74|0;f=a[e]|0;a[e]=f+255|f;f=b+20|0;e=b+44|0;if((c[f>>2]|0)>>>0>(c[e>>2]|0)>>>0){yc[c[b+36>>2]&3](b,0,0)|0}c[b+16>>2]=0;c[b+28>>2]=0;c[f>>2]=0;f=b;g=c[f>>2]|0;if((g&20|0)==0){h=c[e>>2]|0;c[b+8>>2]=h;c[b+4>>2]=h;j=0;i=d;return j|0}if((g&4|0)==0){j=-1;i=d;return j|0}c[f>>2]=g|32;j=-1;i=d;return j|0}function Km(a){a=a|0;var b=0,e=0,f=0,g=0;b=i;i=i+8|0;e=b;if((c[a+8>>2]|0)==0){if((Jm(a)|0)==0){f=3}else{g=-1}}else{f=3}do{if((f|0)==3){if((yc[c[a+32>>2]&3](a,e,1)|0)!=1){g=-1;break}g=d[e]|0}}while(0);i=b;return g|0}function Lm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0.0,j=0,k=0;d=i;i=i+112|0;e=d;f=e+0|0;g=f+112|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));f=e+4|0;c[f>>2]=a;g=e+8|0;c[g>>2]=-1;c[e+44>>2]=a;c[e+76>>2]=-1;Fm(e,0);h=+Dm(e,1,1);j=(c[f>>2]|0)-(c[g>>2]|0)+(c[e+108>>2]|0)|0;if((b|0)==0){i=d;return+h}if((j|0)==0){k=a}else{k=a+j|0}c[b>>2]=k;i=d;return+h}function Mm(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0;e=i;a:do{if((d|0)==0){f=0}else{g=d;h=b;j=c;while(1){k=a[h]|0;l=a[j]|0;if(!(k<<24>>24==l<<24>>24)){break}m=g+ -1|0;if((m|0)==0){f=0;break a}else{g=m;h=h+1|0;j=j+1|0}}f=(k&255)-(l&255)|0}}while(0);i=e;return f|0}function Nm(b,c){b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;d=i;e=a[b]|0;f=a[c]|0;if(e<<24>>24!=f<<24>>24|e<<24>>24==0|f<<24>>24==0){g=e;h=f;j=g&255;k=h&255;l=j-k|0;i=d;return l|0}else{m=b;n=c}while(1){c=m+1|0;b=n+1|0;f=a[c]|0;e=a[b]|0;if(f<<24>>24!=e<<24>>24|f<<24>>24==0|e<<24>>24==0){g=f;h=e;break}else{n=b;m=c}}j=g&255;k=h&255;l=j-k|0;i=d;return l|0}function Om(){}function Pm(a){a=a|0;var b=0;b=(da(c[a>>2]|0,31010991)|0)+1735287159&2147483647;c[a>>2]=b;return b|0}function Qm(){return Pm(o)|0}function Rm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;g=b&3;h=d|d<<8|d<<16|d<<24;i=f&~3;if(g){g=b+4-g|0;while((b|0)<(g|0)){a[b]=d;b=b+1|0}}while((b|0)<(i|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}return b-e|0}function Sm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=b-d>>>0;e=b-d-(c>>>0>a>>>0|0)>>>0;return(H=e,a-c>>>0|0)|0}function Tm(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a+c>>>0;return(H=b+d+(e>>>0<a>>>0|0)>>>0,e|0)|0}function Um(b){b=b|0;var c=0;c=b;while(a[c]|0){c=c+1|0}return c-b|0}function Vm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;u=u+1|0;c[a>>2]=u;while((e|0)<40){if((c[d+(e<<2)>>2]|0)==0){c[d+(e<<2)>>2]=u;c[d+((e<<2)+4)>>2]=b;c[d+((e<<2)+8)>>2]=0;return 0}e=e+2|0}jb(116);jb(111);jb(111);jb(32);jb(109);jb(97);jb(110);jb(121);jb(32);jb(115);jb(101);jb(116);jb(106);jb(109);jb(112);jb(115);jb(32);jb(105);jb(110);jb(32);jb(97);jb(32);jb(102);jb(117);jb(110);jb(99);jb(116);jb(105);jb(111);jb(110);jb(32);jb(99);jb(97);jb(108);jb(108);jb(44);jb(32);jb(98);jb(117);jb(105);jb(108);jb(100);jb(32);jb(119);jb(105);jb(116);jb(104);jb(32);jb(97);jb(32);jb(104);jb(105);jb(103);jb(104);jb(101);jb(114);jb(32);jb(118);jb(97);jb(108);jb(117);jb(101);jb(32);jb(102);jb(111);jb(114);jb(32);jb(77);jb(65);jb(88);jb(95);jb(83);jb(69);jb(84);jb(74);jb(77);jb(80);jb(83);jb(10);ea(0);return 0}function Wm(a,b){a=a|0;b=b|0;var d=0,e=0;while((d|0)<20){e=c[b+(d<<2)>>2]|0;if((e|0)==0)break;if((e|0)==(a|0)){return c[b+((d<<2)+4)>>2]|0}d=d+2|0}return 0}function Xm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return Ca(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function Ym(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){H=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}H=a<<c-32;return 0}function Zm(a){a=a|0;if((a|0)<65)return a|0;if((a|0)>90)return a|0;return a-65+97|0}function _m(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){H=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}H=0;return b>>>c-32|0}function $m(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){H=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}H=(b|0)<0?-1:0;return b>>c-32|0}function an(b){b=b|0;var c=0;c=a[n+(b>>>24)|0]|0;if((c|0)<8)return c|0;c=a[n+(b>>16&255)|0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>8&255)|0]|0;if((c|0)<8)return c+16|0;return(a[n+(b&255)|0]|0)+24|0}function bn(b){b=b|0;var c=0;c=a[m+(b&255)|0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)|0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)|0]|0;if((c|0)<8)return c+16|0;return(a[m+(b>>>24)|0]|0)+24|0}function cn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=a&65535;d=b&65535;e=da(d,c)|0;f=a>>>16;a=(e>>>16)+(da(d,f)|0)|0;d=b>>>16;b=da(d,c)|0;return(H=(a>>>16)+(da(d,f)|0)+(((a&65535)+b|0)>>>16)|0,a+b<<16|e&65535|0)|0}function dn(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=b>>31|((b|0)<0?-1:0)<<1;f=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;g=d>>31|((d|0)<0?-1:0)<<1;h=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;i=Sm(e^a,f^b,e,f)|0;b=H;a=g^e;e=h^f;f=Sm((jn(i,b,Sm(g^c,h^d,g,h)|0,H,0)|0)^a,H^e,a,e)|0;return(H=H,f)|0}function en(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+8|0;g=f|0;h=b>>31|((b|0)<0?-1:0)<<1;j=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;l=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;m=Sm(h^a,j^b,h,j)|0;b=H;jn(m,b,Sm(k^d,l^e,k,l)|0,H,g)|0;l=Sm(c[g>>2]^h,c[g+4>>2]^j,h,j)|0;j=H;i=f;return(H=j,l)|0}function fn(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;a=c;c=cn(e,a)|0;f=H;return(H=(da(b,a)|0)+(da(d,e)|0)+f|f&0,c|0|0)|0}function gn(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=jn(a,b,c,d,0)|0;return(H=H,e)|0}function hn(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+8|0;g=f|0;jn(a,b,d,e,g)|0;i=f;return(H=c[g+4>>2]|0,c[g>>2]|0)|0}function jn(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,I=0,J=0,K=0,L=0,M=0;g=a;h=b;i=h;j=d;k=e;l=k;if((i|0)==0){m=(f|0)!=0;if((l|0)==0){if(m){c[f>>2]=(g>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(g>>>0)/(j>>>0)>>>0;return(H=n,o)|0}else{if(!m){n=0;o=0;return(H=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;o=0;return(H=n,o)|0}}m=(l|0)==0;do{if((j|0)==0){if(m){if((f|0)!=0){c[f>>2]=(i>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(i>>>0)/(j>>>0)>>>0;return(H=n,o)|0}if((g|0)==0){if((f|0)!=0){c[f>>2]=0;c[f+4>>2]=(i>>>0)%(l>>>0)}n=0;o=(i>>>0)/(l>>>0)>>>0;return(H=n,o)|0}p=l-1|0;if((p&l|0)==0){if((f|0)!=0){c[f>>2]=a|0;c[f+4>>2]=p&i|b&0}n=0;o=i>>>((bn(l|0)|0)>>>0);return(H=n,o)|0}p=(an(l|0)|0)-(an(i|0)|0)|0;if(p>>>0<=30){q=p+1|0;r=31-p|0;s=q;t=i<<r|g>>>(q>>>0);u=i>>>(q>>>0);v=0;w=g<<r;break}if((f|0)==0){n=0;o=0;return(H=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(H=n,o)|0}else{if(!m){r=(an(l|0)|0)-(an(i|0)|0)|0;if(r>>>0<=31){q=r+1|0;p=31-r|0;x=r-31>>31;s=q;t=g>>>(q>>>0)&x|i<<p;u=i>>>(q>>>0)&x;v=0;w=g<<p;break}if((f|0)==0){n=0;o=0;return(H=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(H=n,o)|0}p=j-1|0;if((p&j|0)!=0){x=(an(j|0)|0)+33-(an(i|0)|0)|0;q=64-x|0;r=32-x|0;y=r>>31;z=x-32|0;A=z>>31;s=x;t=r-1>>31&i>>>(z>>>0)|(i<<r|g>>>(x>>>0))&A;u=A&i>>>(x>>>0);v=g<<q&y;w=(i<<q|g>>>(z>>>0))&y|g<<r&x-33>>31;break}if((f|0)!=0){c[f>>2]=p&g;c[f+4>>2]=0}if((j|0)==1){n=h|b&0;o=a|0|0;return(H=n,o)|0}else{p=bn(j|0)|0;n=i>>>(p>>>0)|0;o=i<<32-p|g>>>(p>>>0)|0;return(H=n,o)|0}}}while(0);if((s|0)==0){B=w;C=v;D=u;E=t;F=0;G=0}else{g=d|0|0;d=k|e&0;e=Tm(g,d,-1,-1)|0;k=H;i=w;w=v;v=u;u=t;t=s;s=0;while(1){I=w>>>31|i<<1;J=s|w<<1;j=u<<1|i>>>31|0;a=u>>>31|v<<1|0;Sm(e,k,j,a)|0;b=H;h=b>>31|((b|0)<0?-1:0)<<1;K=h&1;L=Sm(j,a,h&g,(((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1)&d)|0;M=H;b=t-1|0;if((b|0)==0){break}else{i=I;w=J;v=M;u=L;t=b;s=K}}B=I;C=J;D=M;E=L;F=0;G=K}K=C;C=0;if((f|0)!=0){c[f>>2]=E;c[f+4>>2]=D}n=(K|0)>>>31|(B|C)<<1|(C<<1|K>>>31)&0|F;o=(K<<1|0>>>31)&-2|G;return(H=n,o)|0}function kn(a,b){a=a|0;b=b|0;return xc[a&255](b|0)|0}function ln(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return yc[a&3](b|0,c|0,d|0)|0}function mn(a,b,c){a=a|0;b=b|0;c=c|0;zc[a&15](b|0,c|0)}function nn(a,b,c){a=a|0;b=b|0;c=c|0;return Ac[a&1](b|0,c|0)|0}function on(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Bc[a&3](b|0,c|0,d|0,e|0)|0}function pn(a){a=a|0;ea(0);return 0}function qn(a,b,c){a=a|0;b=b|0;c=c|0;ea(1);return 0}function rn(a,b){a=a|0;b=b|0;ea(2)}function sn(a,b){a=a|0;b=b|0;ea(3);return 0}function tn(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ea(4);return 0}




// EMSCRIPTEN_END_FUNCS
var xc=[pn,wg,Kg,Lg,Mg,Ng,Og,Pg,Qg,Rg,Sg,Tg,xg,yg,zg,Ag,Bg,Cg,Dg,Eg,Yg,Zg,_g,$g,ah,bh,ch,dh,eh,fh,gh,hh,ih,jh,kh,lh,mh,nh,oh,ph,qh,rh,sh,th,uh,vh,wh,xh,Nh,Oh,Ph,Eh,Fh,_h,$h,ai,bi,ci,di,ei,fi,gi,hi,ii,Wi,Xi,Yi,Zi,_i,$i,aj,bj,cj,dj,ej,fj,gj,hj,Dj,Ej,Fj,Gj,Hj,Ij,Jj,jk,kk,lk,mk,nk,ok,pk,qk,rk,sk,tk,uk,vk,wk,xk,yk,zk,Ak,Bk,Ck,Dk,Ek,Mk,Nk,Ok,Pk,Qk,Rk,Sk,Tk,Uk,Vk,Wk,Xk,Kl,Ll,Ml,Nl,Ol,Pl,Tl,Ul,Vl,Wl,Xl,Yl,Zl,_l,$l,am,bm,cm,dm,em,fm,gm,ff,ik,Bh,Jl,Cj,ug,Zh,Vi,Lk,Xg,Sl,vg,Jg,Ug,Vg,Ch,Gh,Hh,Ih,Jh,mj,Kk,Jk,Fk,Ql,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn,pn];var yc=[qn,Re,Te,Ik];var zc=[rn,Vc,Zd,If,Jf,Nf,og,Li,hm,rn,rn,rn,rn,rn,rn,rn];var Ac=[sn,Ki];var Bc=[tn,ef,nj,tn];return{_testSetjmp:Wm,_i64Subtract:Sm,_free:zm,_main:Tc,_rand_r:Pm,_realloc:Am,_i64Add:Tm,_tolower:Zm,_strlen:Um,_memset:Rm,_malloc:ym,_saveSetjmp:Vm,_memcpy:Xm,_lua_execute:Sc,_rand:Qm,_bitshift64Shl:Ym,runPostSets:Om,stackAlloc:Cc,stackSave:Dc,stackRestore:Ec,setThrew:Fc,setTempRet0:Ic,setTempRet1:Jc,setTempRet2:Kc,setTempRet3:Lc,setTempRet4:Mc,setTempRet5:Nc,setTempRet6:Oc,setTempRet7:Pc,setTempRet8:Qc,setTempRet9:Rc,dynCall_ii:kn,dynCall_iiii:ln,dynCall_vii:mn,dynCall_iii:nn,dynCall_iiiii:on}})


// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "invoke_ii": invoke_ii, "invoke_iiii": invoke_iiii, "invoke_vii": invoke_vii, "invoke_iii": invoke_iii, "invoke_iiiii": invoke_iiiii, "_isalnum": _isalnum, "_fabs": _fabs, "_frexp": _frexp, "_exp": _exp, "_strrchr": _strrchr, "_fread": _fread, "_memchr": _memchr, "__reallyNegative": __reallyNegative, "_strpbrk": _strpbrk, "_longjmp": _longjmp, "__addDays": __addDays, "_fsync": _fsync, "_rename": _rename, "_sbrk": _sbrk, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_sinh": _sinh, "_sysconf": _sysconf, "_close": _close, "_ferror": _ferror, "_clock": _clock, "_cos": _cos, "_tanh": _tanh, "_unlink": _unlink, "_write": _write, "__isLeapYear": __isLeapYear, "_ftell": _ftell, "_isupper": _isupper, "_gmtime_r": _gmtime_r, "_strstr": _strstr, "_islower": _islower, "_tmpnam": _tmpnam, "_llvm_lifetime_end": _llvm_lifetime_end, "_tmpfile": _tmpfile, "_emscripten_exit_with_live_runtime": _emscripten_exit_with_live_runtime, "_send": _send, "_abort": _abort, "_setvbuf": _setvbuf, "_atan2": _atan2, "_setlocale": _setlocale, "_isgraph": _isgraph, "_modf": _modf, "_strerror_r": _strerror_r, "_sin": _sin, "_fscanf": _fscanf, "___setErrNo": ___setErrNo, "_isalpha": _isalpha, "_srand": _srand, "_strchr": _strchr, "_mktime": _mktime, "_putchar": _putchar, "_gmtime": _gmtime, "_localeconv": _localeconv, "_printf": _printf, "_sprintf": _sprintf, "_localtime": _localtime, "_read": _read, "_fwrite": _fwrite, "_time": _time, "_fprintf": _fprintf, "_exit": _exit, "_freopen": _freopen, "_llvm_pow_f64": _llvm_pow_f64, "_fgetc": _fgetc, "_fmod": _fmod, "_lseek": _lseek, "_rmdir": _rmdir, "_asin": _asin, "___buildEnvironment": ___buildEnvironment, "_pwrite": _pwrite, "_localtime_r": _localtime_r, "_tzset": _tzset, "_open": _open, "_remove": _remove, "_snprintf": _snprintf, "__scanString": __scanString, "_strftime": _strftime, "_fseek": _fseek, "_iscntrl": _iscntrl, "_getenv": _getenv, "_fclose": _fclose, "_log": _log, "_recv": _recv, "_tan": _tan, "_copysign": _copysign, "__getFloat": __getFloat, "_fputc": _fputc, "_ispunct": _ispunct, "_ceil": _ceil, "_isspace": _isspace, "_fopen": _fopen, "_strspn": _strspn, "_floor": _floor, "_llvm_lifetime_start": _llvm_lifetime_start, "_acos": _acos, "_cosh": _cosh, "_difftime": _difftime, "_ungetc": _ungetc, "_system": _system, "_fflush": _fflush, "_log10": _log10, "_fileno": _fileno, "__exit": __exit, "__arraySum": __arraySum, "_fgets": _fgets, "_atan": _atan, "_pread": _pread, "_mkport": _mkport, "_toupper": _toupper, "_feof": _feof, "___errno_location": ___errno_location, "_clearerr": _clearerr, "_isxdigit": _isxdigit, "_strerror": _strerror, "_emscripten_longjmp": _emscripten_longjmp, "__formatString": __formatString, "_sqrt": _sqrt, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "ctlz_i8": ctlz_i8, "___rand_seed": ___rand_seed, "NaN": NaN, "Infinity": Infinity, "_stderr": _stderr, "_stdin": _stdin, "_stdout": _stdout }, buffer);
var _testSetjmp = Module["_testSetjmp"] = asm["_testSetjmp"];
var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
var _free = Module["_free"] = asm["_free"];
var _main = Module["_main"] = asm["_main"];
var _rand_r = Module["_rand_r"] = asm["_rand_r"];
var _realloc = Module["_realloc"] = asm["_realloc"];
var _i64Add = Module["_i64Add"] = asm["_i64Add"];
var _tolower = Module["_tolower"] = asm["_tolower"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _saveSetjmp = Module["_saveSetjmp"] = asm["_saveSetjmp"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _lua_execute = Module["_lua_execute"] = asm["_lua_execute"];
var _rand = Module["_rand"] = asm["_rand"];
var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
var dynCall_iiiii = Module["dynCall_iiiii"] = asm["dynCall_iiiii"];

Runtime.stackAlloc = function(size) { return asm['stackAlloc'](size) };
Runtime.stackSave = function() { return asm['stackSave']() };
Runtime.stackRestore = function(top) { asm['stackRestore'](top) };


// TODO: strip out parts of this we do not need

//======= begin closure i64 code =======

// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */

var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };


  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.

    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };


  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.


  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};


  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }

    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };


  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };


  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };


  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }

    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));

    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };


  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.


  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;


  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);


  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);


  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);


  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);


  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);


  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);


  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };


  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };


  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (this.isZero()) {
      return '0';
    }

    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));

    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);

      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };


  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };


  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };


  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };


  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };


  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };


  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };


  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };


  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }

    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }

    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };


  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };


  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };


  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }

    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);

      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }

      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }

      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };


  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };


  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };


  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };


  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };


  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };


  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };

  //======= begin jsbn =======

  var navigator = { appName: 'Modern Browser' }; // polyfill a little

  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/

  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */

  // Basic JavaScript BN library - subset useful for RSA encryption.

  // Bits per digit
  var dbits;

  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);

  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }

  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }

  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.

  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);

  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;

  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }

  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }

  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }

  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }

  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }

  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }

  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }

  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }

  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }

  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }

  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }

  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }

  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }

  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }

  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }

  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }

  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }

  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }

  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }

  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }

  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }

  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }

  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }

  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // jsbn2 stuff

  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }

  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }

  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }

  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }

  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }

  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }

  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;

  //======= end jsbn =======

  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();

//======= end closure i64 code =======



// === Auto-generated postamble setup entry stuff ===

if (memoryInitializer) {
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      HEAPU8.set(data, STATIC_BASE);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}

function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
    Module.printErr('preload time: ' + (Date.now() - preloadStartTime) + ' ms');
  }

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);

  initialStackTop = STACKTOP;

  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    if (!Module['noExitRuntime']) {
      exit(ret);
    }
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    ensureInitRuntime();

    preMain();

    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status) {
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;

  // exit the runtime
  exitRuntime();

  // TODO We should handle this differently based on environment.
  // In the browser, the best we can do is throw an exception
  // to halt execution, but in node we could process.exit and
  // I'd imagine SM shell would have something equivalent.
  // This would let us set a proper exit status (which
  // would be great for checking test exit statuses).
  // https://github.com/kripken/emscripten/issues/1371

  // throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.';

  throw 'abort() at ' + stackTrace() + extra;
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}


run();

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}






return Module;}());

},{}],2:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};;(function (commonjs) {
  function errorObject(error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    };
  }

  function receiveCallsFromOwner(functions, options) {
    if (typeof Proxy == 'undefined') {
      // Let the other side know about our functions if they can't use Proxy.
      var names = [];
      for (var name in functions) names.push(name);
      self.postMessage({functionNames: names});
    }

    function createCallback(id) {
      function callback() {
        var args = Array.prototype.slice.call(arguments);
        self.postMessage({callResponse: id, arguments: args});
      }

      callback._autoDisabled = false;
      callback.disableAuto = function () { callback._autoDisabled = true; };

      callback.transfer = function () {
        var args = Array.prototype.slice.call(arguments),
            transferList = args.shift();
        self.postMessage({callResponse: id, arguments: args}, transferList);
      };

      return callback;
    }

    self.addEventListener('message', function (e) {
      var message = e.data;

      if (message.call) {
        var callId = message.callId;

        // Find the function to be called.
        var fn = functions[message.call];
        if (!fn) {
          self.postMessage({
            callResponse: callId,
            arguments: [errorObject(new Error('That function does not exist'))]
          });
          return;
        }

        var args = message.arguments || [];
        var callback = createCallback(callId);
        args.push(callback);

        var returnValue;
        if (options.catchErrors) {
          try {
            returnValue = fn.apply(functions, args);
          } catch (e) {
            callback(errorObject(e));
          }
        } else {
          returnValue = fn.apply(functions, args);
        }

        // If the option for it is enabled, automatically call the callback.
        if (options.autoCallback && !callback._autoDisabled) {
          callback(null, returnValue);
        }
      }
    });
  }

  function sendCallsToWorker(workers, options) {
    var cache = {},
        callbacks = {},
        timers,
        nextCallId = 1,
        fakeProxy,
        queue = [];

    // Create an array of number of pending tasks for each worker.
    var pending = workers.map(function () { return 0; });

    // Each individual call gets a timer if timing calls.
    if (options.timeCalls) timers = {};

    if (typeof Proxy == 'undefined') {
      // If we have no Proxy support, we have to pre-define all the functions.
      fakeProxy = {pendingCalls: 0};
      options.functionNames.forEach(function (name) {
        fakeProxy[name] = getHandler(null, name);
      });
    }

    function getNumPendingCalls() {
      return queue.length + pending.reduce(function (x, y) { return x + y; });
    }

    function getHandler(_, name) {
      if (name == 'pendingCalls') return getNumPendingCalls();
      if (cache[name]) return cache[name];

      var fn = cache[name] = function () {
        var args = Array.prototype.slice.call(arguments);
        queueCall(name, args);
      };

      // Sends the same call to all workers.
      fn.broadcast = function () {
        var args = Array.prototype.slice.call(arguments);
        for (var i = 0; i < workers.length; i++) {
          sendCall(i, name, args);
        }
        if (fakeProxy) fakeProxy.pendingCalls = getNumPendingCalls();
      };

      // Marks the objects in the first argument (array) as transferable.
      fn.transfer = function () {
        var args = Array.prototype.slice.call(arguments),
            transferList = args.shift();
        queueCall(name, args, transferList);
      };

      return fn;
    }

    function flushQueue() {
      // Keep the fake proxy pending count up-to-date.
      if (fakeProxy) fakeProxy.pendingCalls = getNumPendingCalls();

      if (!queue.length) return;

      for (var i = 0; i < workers.length; i++) {
        if (pending[i]) continue;

        // A worker is available.
        var params = queue.shift();
        sendCall(i, params[0], params[1], params[2]);

        if (!queue.length) return;
      }
    }

    function queueCall(name, args, opt_transferList) {
      queue.push([name, args, opt_transferList]);
      flushQueue();
    }

    function sendCall(workerIndex, name, args, opt_transferList) {
      // Get the worker and indicate that it has a pending task.
      pending[workerIndex]++;
      var worker = workers[workerIndex];

      var id = nextCallId++;

      // If the last argument is a function, assume it's the callback.
      var maybeCb = args[args.length - 1];
      if (typeof maybeCb == 'function') {
        callbacks[id] = maybeCb;
        args = args.slice(0, -1);
      }

      // If specified, time calls using the console.time interface.
      if (options.timeCalls) {
        var timerId = name + '(' + args.join(', ') + ')';
        timers[id] = timerId;
        console.time(timerId);
      }

      worker.postMessage({callId: id, call: name, arguments: args}, opt_transferList);
    }

    function listener(e) {
      var workerIndex = workers.indexOf(this);
      var message = e.data;

      if (message.callResponse) {
        var callId = message.callResponse;

        // Call the callback registered for this call (if any).
        if (callbacks[callId]) {
          callbacks[callId].apply(null, message.arguments);
          delete callbacks[callId];
        }

        // Report timing, if that option is enabled.
        if (options.timeCalls && timers[callId]) {
          console.timeEnd(timers[callId]);
          delete timers[callId];
        }

        // Indicate that this task is no longer pending on the worker.
        pending[workerIndex]--;
        flushQueue();
      } else if (message.functionNames) {
        // Received a list of available functions. Only useful for fake proxy.
        message.functionNames.forEach(function (name) {
          fakeProxy[name] = getHandler(null, name);
        });
      }
    }

    // Listen to messages from all the workers.
    for (var i = 0; i < workers.length; i++) {
      workers[i].addEventListener('message', listener);
    }

    if (typeof Proxy == 'undefined') {
      return fakeProxy;
    } else if (Proxy.create) {
      return Proxy.create({get: getHandler});
    } else {
      return new Proxy({}, {get: getHandler});
    }
  }

  /**
   * Call this function with either a Worker instance, a list of them, or a map
   * of functions that can be called inside the worker.
   */
  function createWorkerProxy(workersOrFunctions, opt_options) {
    var options = {
      // Automatically call the callback after a call if the return value is not
      // undefined.
      autoCallback: false,
      // Catch errors and automatically respond with an error callback. Off by
      // default since it breaks standard behavior.
      catchErrors: false,
      // A list of functions that can be called. This list will be used to make
      // the proxy functions available when Proxy is not supported. Note that
      // this is generally not needed since the worker will also publish its
      // known functions.
      functionNames: [],
      // Call console.time and console.timeEnd for calls sent though the proxy.
      timeCalls: false
    };

    if (opt_options) {
      for (var key in opt_options) {
        if (!(key in options)) continue;
        options[key] = opt_options[key];
      }
    }
    Object.freeze(options);

    // Ensure that we have an array of workers (even if only using one worker).
    if (typeof Worker != 'undefined' && (workersOrFunctions instanceof Worker)) {
      workersOrFunctions = [workersOrFunctions];
    }

    if (Array.isArray(workersOrFunctions)) {
      return sendCallsToWorker(workersOrFunctions, options);
    } else {
      receiveCallsFromOwner(workersOrFunctions, options);
    }
  }

  if (commonjs) {
    module.exports = createWorkerProxy;
  } else {
    var scope;
    if (typeof global != 'undefined') {
      scope = global;
    } else if (typeof window != 'undefined') {
      scope = window;
    } else if (typeof self != 'undefined') {
      scope = self;
    }

    scope.createWorkerProxy = createWorkerProxy;
  }
})(typeof module != 'undefined' && module.exports);

},{}],3:[function(require,module,exports){
var workerproxy = require('workerproxy');

var emlua = require('./lib/emlua');

workerproxy({
  execute: function (code, callback) {
    emlua.ccall('lua_execute', null, ['string'], [code]);

    var buffer = emlua.printBuffer;
    emlua.printBuffer = '';

    callback(null, buffer);
  }
});

},{"./lib/emlua":1,"workerproxy":2}]},{},[3])