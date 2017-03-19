'use strict'

const child_process = require('child_process')
const spawn = child_process.spawn

let git_branch = spawn('git', ['-b'])

git_branch.stdout.on('data', (data) => {
  console.log(data)
})

git_branch.on('exit', (code) => {
  console.log('子进程已经退出')
})
