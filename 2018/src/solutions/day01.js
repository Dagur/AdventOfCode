import { head, tail, reduce } from 'ramda'
import { input } from '../data/day01.js'

function setup() {
    let data = input.split('\n')

    return data
}

export const part1 = () => {
    let data = setup()
    let answer = reduce((sum, command) => {
        switch (head(command)) {
            case '+': return sum + parseInt(tail(command))
            case '-': return sum - parseInt(tail(command))
            default: return sum
        }    
    }, 0, data)

    return answer
}