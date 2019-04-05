import React, { Component } from 'react'
import { connect } from 'react-redux'
import GridSquare from './grid-square'
import { shapes } from '../utils'

// Draws the "next" block view showing the next block to drop
class NextBlock extends Component {

  makeGrid() {
    // deconstruct shape
    const { shape } = this.props
    // get the array for this shape's first rotation
    const block = shapes[shape][0]
    // get the empty shape
    const box = shapes[0][0]        
  
    // Map the block to the grid
    return box.map((rowArray, row) => {
      return rowArray.map((square, col) => {
        // If there is a 1 use the shape index
        const color = block[row][col] === 0 ? 0 : shape
        return <GridSquare key={`${row}${col}`} color={color} />
      })
    })
  }

  render () {
    return (
      <div className="next-block">
        {this.makeGrid()}
      </div>
    )
  }
}

// Get the data from state and map it to props in this component.
const mapStateToProps = (state) => {
  return {
    // Return nextShape as shape
    shape: state.game.nextShape
  }
}

// Connect this component up to Redux:
export default connect(mapStateToProps)(NextBlock)

// export default NextBlock