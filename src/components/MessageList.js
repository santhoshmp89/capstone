import React, { Component } from 'react'
class MessagesList extends Component {
  render() {
    const styles = {
      container: {
        overflowY: 'scroll',
        flex: 1,
      },
      ul: {
        listStyle: 'none',
      },
      li: {
        marginTop: 15,
        marginBottom: 15,
      },
      senderUsername: {
        fontWeight: 'bold',
      },
      message: { fontSize: 16 },
    }
    return (
      <div
        style={{
          ...this.props.style,
          ...styles.container,
        }}
      >
        <ul style={styles.ul}>
          {this.props.messages.map((message, index) => (
            <li key={index} style={styles.li}>
              <div>
                <span style={styles.senderUsername}>{message.senderId}</span>{' '}
              </div>
              <p style={styles.message}>{message.text}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default MessagesList