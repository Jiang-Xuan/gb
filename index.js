#!/usr/bin/env node

'use strict'

const child_process = require('child_process')
const spawn = child_process.spawn
const note_git_branch_info = require('./src/read_gitbranch').branchs

let git_branch = spawn('git', ['branch'])
let output = ''
let native_branch = /^(?:  |\n*\* |\n) {0,2}(.*)(?=\n|$)/

new Promise((resolve, reject) => {
  git_branch.stdout.on('data', (data) => {
    resolve(data.toString())
  })
})
.then(result => {

  while(result.length > 0) {
    let arr = result.match(native_branch)
    result = result.substring(arr[0].length)
    output += `${arr[0]}${note_git_branch_info[arr[1]] ? ' - ' + note_git_branch_info[arr[1]] : ''}`
  }

  console.log(output)
})

