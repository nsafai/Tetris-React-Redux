import React, { Component } from 'react'
import { connect } from 'react-redux'
import { restart } from '../actions'

// Displays a message
class MessagePopup extends Component {
  
  render() {
    const { isRunning, gameOver, restart } = this.props
    
    let popupTitle = ''
    let popupMsg = ''
    let isHidden = 'hidden'

    // If the game is over, show the popup saying "Game Over"
    if (gameOver) {
      popupTitle = 'Game Over'
      popupMsg = 'Can you do better?'
      isHidden = ''
    }

    // If the is not over, it must be paused
    else if (!isRunning) {
      popupTitle = 'Paused'
      popupMsg = 'Unpause whenever you\'re ready'
    }

    // Default message, will be hidden
    else {
      popupTitle = ''
      popupMsg = ''
    }

    return (
      <div className={`message-popup ${isHidden}`}>
        <h1 className="message-popup-title">{popupTitle}</h1>
        <p className="message-popup-text">{popupMsg}</p>
        <button className={`message-popup-rs-btn score-board-button ${isHidden}`} onClick={(e) => {
          restart()
        }}>Try Again</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isRunning: state.game.isRunning,
    gameOver: state.game.gameOver
  }
}

const mapDispatchToProps = () => {
  return {
    restart
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(MessagePopup)