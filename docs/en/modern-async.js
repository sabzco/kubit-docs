import {readFile} from 'node:fs/promises'
import {finish, step} from './logger-utility.js'

step(1)
// Let's read a file w/o blocking for it:😊
const dataPromise = readFile('async-programming.md')

step(2)
// I have some other works here.
// So I don't want to wait for I/O operation to be completed, currently.😊

step(3)
// OK. Now, I want to wait for I/O operation result.
// Using powerful `Promise` API, it's easy: 😊
const data = await dataPromise
console.info('File size:', data.length)

finish()
