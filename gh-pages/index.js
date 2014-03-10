var lua = require('luaworker')('worker.js');

function output(text, opt_class) {
  var element = document.createElement('div');
  element.textContent = text;
  if (opt_class) element.className = opt_class;
  document.getElementById('output').appendChild(element);
}

document.getElementById('run').addEventListener('click', function () {
  var input = document.getElementById('input');

  output(input.value + '\n', 'code');
  lua.execute(input.value, function (err, result) {
    output(result, 'result');
  });

  input.value = '';
});
