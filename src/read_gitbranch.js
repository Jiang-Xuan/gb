const fs = require('fs')

let git_branch = fs.readFileSync('./.gitbranch').toString()

git_branch.replace(/\r\n|\n/g, '\n')

let branchs = {}
let branch = /^(.*) (.*)(?=\n|$)\n*/

while(git_branch.length > 0) {
  let g = git_branch.match(branch)
  git_branch = git_branch.substring(g[0].length)
  branchs[g[1]] = g[2]
}

exports.branchs = branchs