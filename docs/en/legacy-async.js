import {readFile} from 'node:fs'
import {finish, step} from './logger-utility.js'

step(1)
// Let's read a file:
readFile('async-programming.md', (err, data) => {
  step(5)
  if (err) console.error('I/O operation encountered some error.\n', err)
  console.info('I/O operation was finished.', data.length, 'bytes were loaded from disk.')
  finish()
})

step(2)
// I have some other works here.
// So I don't want to wait for I/O operation to be completed, currently.😊

step(3)
// OK. Now, I want to wait for I/O operation result.
// But I can't do it here (in THIS PLACE OF CODE).😕
