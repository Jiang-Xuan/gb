#!/usr/bin/env node

'use strict'

const child_process = require('child_process')
const { branchs } = require('./lib/read_gitbranch')
const colors = require('colors')
const spawn = child_process.spawn

let gitBranch = spawn('git', ['branch'])
let output = ''
let nativeBranch = /^(?:  |\n*\* |\n) {0,2}(.*)(?=\n|$)/

new Promise((resolve, reject) => {
  let branchString = ''
  gitBranch.stdout.on('data', (data) => {
    branchString += data.toString()
  })
  gitBranch.on('close', () => {
    resolve(branchString)
  })
})
.then(result => {
  
  while(result.length > 0) {
    let arr = result.match(nativeBranch)
    result = result.substring(arr[0].length)
    if(~arr[0].indexOf('*')) {
      output += `\n* ${arr[1].green}${branchs[arr[1]] ? ' - ' + branchs[arr[1]].bold.underline : ''}`
    } else {
      output += `${arr[0]}${branchs[arr[1]] ? ' - ' + branchs[arr[1]].bold : ''}`
    }
  }

  process.stdout.write(output)
})

