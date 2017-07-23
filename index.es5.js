#!/usr/bin/env node

'use strict';

var child_process = require('child_process');

var _require = require('./lib/read_gitbranch.es5'),
    branchs = _require.branchs;

var colors = require('colors');
var spawn = child_process.spawn;
var Promise = global.Promise || require('bluebird');

var gitBranch = spawn('git', ['branch']);
var output = '';
var nativeBranch = /^(?:  |\n*\* |\n) {0,2}(.*)(?=\n|$)/;

new Promise(function (resolve, reject) {
  var branchString = '';
  gitBranch.stdout.on('data', function (data) {
    branchString += data.toString();
  });
  gitBranch.on('close', function () {
    resolve(branchString);
  });
}).then(function (result) {

  while (result.length > 0) {
    var arr = result.match(nativeBranch);
    result = result.substring(arr[0].length);
    if (~arr[0].indexOf('*')) {
      output += '\n* ' + arr[1].green + (branchs[arr[1]] ? ' - ' + branchs[arr[1]].bold.underline : '');
    } else {
      output += '' + arr[0] + (branchs[arr[1]] ? ' - ' + branchs[arr[1]].bold : '');
    }
  }

  process.stdout.write(output);
});