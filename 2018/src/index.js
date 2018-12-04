import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

import Day1 from './solutions/day01'
import Day2 from './solutions/day02'

class App extends React.Component {
  getAnswer (day) {
    return Day2.part1()
  }

  render () {
    return (
      <div className="App">
        <h1>Solutions</h1>
        {/* <h2>Day 1, part1 {this.getAnswer()}</h2> */}
        <h2>Day 1, part2 {this.getAnswer()}</h2>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
