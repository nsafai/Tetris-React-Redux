import React, { Component } from 'react'
import { connect } from 'react-redux'

// Displays a message
class MessagePopup extends Component {
  
  render() {
    const { isRunning, gameOver } = this.props
    let popupTitle = ''
    let popupMsg = ''
    let isHidden = 'hidden'

    // If the game is over, show the popup saying "Game Over"
    if (gameOver) {
      popupTitle = 'Game Over'
      popupMsg = 'Think you can do better next time?'
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
        <h1>{popupTitle}</h1>
        <p>{popupMsg}</p>
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
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps())(MessagePopup)