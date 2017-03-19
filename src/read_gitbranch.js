const fs = require('fs')

let git_branch = ''
try {
  git_branch = fs.readFileSync('./.gitbranch').toString()
} catch(e) {
  if(e.code === 'ENOENT') {
    console.log('没有找到.gitbranch文件,下面是git分支:')
  }
}

git_branch.replace(/\r\n|\n/g, '\n')

let branchs = {}
let branch = /^([^ ]*) (.*)(?=\n|$)\n*/

while(git_branch.length > 0) {
  let g = git_branch.match(branch)
  git_branch = git_branch.substring(g[0].length)
  branchs[g[1]] = g[2]
}

exports.branchs = branchs