import * as R from 'ramda'
import { input } from '../data/day02.js'

class Day2 {
  constructor () {
    this.data = input.split('\n')

    this.testdata = `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`.split('\n')
  }

  part1 () {
    let [twos, threes] = R.reduce((counts, id) => {
      let [x, y] = counts
      let sizes = R.map(group => group.length, R.groupWith(R.equals, R.sort(R.gt, id)))
      return [
        R.contains(2, sizes) ? x + 1 : x,
        R.contains(3, sizes) ? y + 1 : y
      ]
    }, [0, 0], this.data)
    return twos * threes
  }

  part2 () {
    let hits = R.filter(id => R.any(cid => R.intersection(id, cid).length === id.length - 1, this.data), this.data)
    console.log(hits)
    return R.intersection(...hits)
  }
}

export default new Day2()
