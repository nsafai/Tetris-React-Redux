import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pause, resume, restart } from '../actions'

class ScoreBoard extends Component {

  playPauseBtn() {
    if (this.props.isRunning) {
      return <i className="fas fa-pause"></i>
    } else {
      return <i className="fas fa-play"></i>
    }
  }

  render() {
    const { isRunning, score, resume, pause, restart, gameOver } = this.props

    return (
      <div className="score-board">
        <div className="score-board-text">Score: { score }</div>

        <button className="score-board-button" onClick={(e) => {
          if (gameOver) { return }
          isRunning ? pause() : resume()
        }}>{this.playPauseBtn()}</button>

        <button className="score-board-button" onClick={(e) => {
          restart()
        }}>
          <i className="fas fa-undo"></i>
        </button>

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
