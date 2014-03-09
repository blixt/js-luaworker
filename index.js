var workerproxy = require('workerproxy');

module.exports = function (opt_workerPath) {
  if (!opt_workerPath) opt_workerPath = __dirname + '/worker.js';
  var worker = new Worker(opt_workerPath);
  return workerproxy(worker, {functionNames: ['execute']});
};
