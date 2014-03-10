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
