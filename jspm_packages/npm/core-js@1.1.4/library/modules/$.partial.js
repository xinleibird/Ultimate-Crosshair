/* */ 
'use strict';
var path = require("./$.path"),
    invoke = require("./$.invoke"),
    aFunction = require("./$.a-function");
module.exports = function() {
  var fn = aFunction(this),
      length = arguments.length,
      pargs = Array(length),
      i = 0,
      _ = path._,
      holder = false;
  while (length > i)
    if ((pargs[i] = arguments[i++]) === _)
      holder = true;
  return function() {
    var that = this,
        _length = arguments.length,
        j = 0,
        k = 0,
        args;
    if (!holder && !_length)
      return invoke(fn, pargs, that);
    args = pargs.slice();
    if (holder)
      for (; length > j; j++)
        if (args[j] === _)
          args[j] = arguments[k++];
    while (_length > k)
      args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
