var lua = require('luaworker')('worker.js');

function output(text, opt_class) {
  var element = document.createElement('div');
  element.textContent = text;
  if (opt_class) element.className = opt_class;
  document.getElementById('output').appendChild(element);
}

function run() {
  var input = document.getElementById('input');

  output(input.value + '\n', 'code');
  lua.execute(input.value, function (err, result) {
    output(result, 'result');
  });

  input.value = '';
}

document.addEventListener('keydown', function (event) {
  // Ctrl+Enter and Cmd+Enter is the same as hitting "Run code".
  if (event.keyCode != 13 || (!event.ctrlKey && !event.metaKey)) return;

  run();
  event.preventDefault();
});

document.getElementById('run').addEventListener('click', run);
