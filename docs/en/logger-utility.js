let lastStep = 0

export const step = (n) => {
  lastStep = n
  if (n > 1) console.timeEnd(n - 1)
  console.time(n)
}

export const finish = () => console.timeEnd(lastStep)
