import {readFileSync} from 'node:fs'
import {finish, step} from './logger-utility.js'

step(1)
// Let's read a file:
const data = readFileSync('async-programming.md')

step(2)
// I have some other works here.
// So I don't want to wait for I/O operation to be completed, currently.
// But I can't!😕

step(3)
// After some irrelevant works, this is the first place that I need to `data`:
console.info('File size:', data.length)

finish()
