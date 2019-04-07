import {
  MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE,
  PAUSE, RESUME, RESTART, GAME_OVER
} from '../actions'

import {
  defaultState,
  nextRotation,
  canMoveTo,
  addBlockToGrid,
  checkRows,
  randomShape
} from '../utils'

const gameReducer = (state = defaultState(), action) => {
  const { shape, grid, x, y, rotation, nextShape, score, isRunning } = state

  switch(action.type) {
    case ROTATE:
      const newRotation = nextRotation(shape, rotation)
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        return { ...state, rotation: newRotation }
      }
      return state

    case MOVE_RIGHT:
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        return { ...state, x: x + 1 }
      }
      return state

    case MOVE_LEFT:
      // subtract 1 from the x and check if this new position is possible by calling `canMoveTo()
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        return { ...state, x: x - 1 }
      }
      return state

    case MOVE_DOWN:
      const maybeY = y + 1 // Get the next potential Y position

      // Check if the current block can move here
      if (canMoveTo(shape, grid, x, maybeY, rotation)) {
        // If so move the block
        return { ...state, y: maybeY }
      }

      // If not place the block
      // (this returns an object with a grid and gameover bool)
      // const { newGrid, gameOver } = addBlockToGrid(shape, grid, x, y, rotation)
      const obj = addBlockToGrid(shape, grid, x, y, rotation)
      const newGrid = obj.grid
      const gameOver = obj.gameOver

      if (gameOver) {
        const newState = { ...state }
        newState.shape = 0 
        newState.grid = newGrid
        return { ...state, gameOver: true }
      }

      // reset some things to start a new shape/block
      const newState = defaultState()
      newState.grid = newGrid
      newState.shape = nextShape // get next shape
      newState.score = score
      newState.isRunning = isRunning

      // Update the score based on if rows were completed or not
      newState.score = score + checkRows(newGrid)

      return newState

    case RESUME:
      return { ...state, isRunning: true }

    case PAUSE:
      return { ...state, isRunning: false }

    case GAME_OVER:

      return state

    case RESTART:
      return defaultState()

    default:
      return state
  }
}

export default gameReducer