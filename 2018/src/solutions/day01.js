import { head, tail, reduce } from 'ramda'
import { input } from '../data/day01.js'

function cycle (arr) {
  let index = 0

  return {
    next: () => {
      index = index === arr.length ? 0 : index
      return arr[index++]
    }
  }
}

class Day1 {
  constructor () {
    this.data = input.split('\n')
  }

  part1 () {
    return reduce((sum, command) => {
      switch (head(command)) {
        case '+': return sum + parseInt(tail(command))
        case '-': return sum - parseInt(tail(command))
        default: return sum
      }
    }, 0, this.data)
  }

  part2 () {
    let sum = 0
    let values = new Set([])
    let iterator = cycle(this.data)

    while (!values.has(sum)) {
      values.add(sum)
      let command = iterator.next()
      switch (head(command)) {
        case '+': sum = sum + parseInt(tail(command)); break
        case '-': sum = sum - parseInt(tail(command)); break
      }
    }
    return sum
  }
}

export default new Day1()
