const fs = require('fs')
const path = require('path')

let git_branch = ''

let currentPath = process.cwd()
while(currentPath !== '/') {
  if(fs.existsSync(path.resolve(currentPath, '.gitbranch'))) {
    break
  } else {
    currentPath = path.resolve(currentPath, '../')
  }
}

try {
  git_branch = fs.readFileSync(path.resolve(currentPath, '.gitbranch')).toString()
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