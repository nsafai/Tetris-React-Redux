import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pause, resume, restart } from '../actions'

class ScoreBoard extends Component {

  render() {
    const { isRunning, score, resume, pause, restart, gameOver } = this.props

    return (
      <div className="score-board">
        <div className="score-board-text">Score: { score }</div>

        <button className="score-board-button" onClick={(e) => {
          if (gameOver) { return }
          isRunning ? pause() : resume()
        }}>{ isRunning ? <i class="fas fa-pause"></i> : <i class="fas fa-play"></i> }</button>

        <button className="score-board-button" onClick={(e) => {
          restart()
        }}><i class="fas fa-undo"></i></button>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    score: state.game.score,
    isRunning: state.game.isRunning,
    gameOver: state.game.gameOver
  }
}

const mapDispatchToProps = () => {
  return {
    pause,
    resume,
    restart
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(ScoreBoard)
