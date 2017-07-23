'use strict';

var fs = require('fs');
var path = require('path');

var gitBranch = '';

var configFilePath = getConfigFile();

try {
  gitBranch = fs.readFileSync(path.resolve(configFilePath, '.gitbranch')).toString();
} catch (e) {
  if (e.code === 'ENOENT') {
    process.stdout.write('Can\'t found .gitbranch file,below is git branch:');
  }
}

gitBranch.replace(/\r\n|\n/g, '\n');

var branchs = {};
var branch = /^([^ ]*) (.*)(?=\n|$)\n*/;

while (gitBranch.length > 0) {
  var g = gitBranch.match(branch);
  gitBranch = gitBranch.substring(g[0].length);
  branchs[g[1]] = g[2];
}

/**
 * helpers
 */
function getConfigFile() {
  var currentPath = process.cwd();
  while (currentPath !== '/') {
    if (fs.existsSync(path.resolve(currentPath, '.gitbranch'))) {
      break;
    } else {
      currentPath = path.resolve(currentPath, '../');
    }
  }

  return currentPath;
}

exports.branchs = branchs;