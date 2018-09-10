import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'

class ChatScreen extends Component {  
    constructor(props) {
        super(props)
        this.state = {
          currentUser: {},
          currentRoom: {},
          messages: [],
          usersWhoAreTyping: [],
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
      }
    
      sendTypingEvent() {
        this.state.currentUser
          .isTypingIn({ roomId: this.state.currentRoom.id })
          .catch(error => console.error('error', error))
      }
      sendMessage(text) {
        this.state.currentUser.sendMessage({
          text,
          roomId: this.state.currentRoom.id,
        })
      }
      componentDidMount () {
        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:625fb78a-9810-415e-a823-c139e4b1addc',
          userId: this.props.currentUsername,
          tokenProvider: new Chatkit.TokenProvider({
            url: 'http://localhost:3001/authenticate',
          }),
        })
    
        chatManager
          .connect()
          .then(currentUser => {
            this.setState({ currentUser })
            return currentUser.subscribeToRoom({
              roomId: 15754935,
              messageLimit: 200,
              hooks: {
                onNewMessage: message => {
                  this.setState({
                    messages: [...this.state.messages, message],
                  })
                },
                onUserStartedTyping: user => {
                  this.setState({
                    usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                 })
                },
                onUserStoppedTyping: user => {
                  this.setState({
                    usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                      username => username !== user.name
                    ),
                  })
                },
                onUserCameOnline: () => this.forceUpdate(),
                onUserWentOffline: () => this.forceUpdate(),
                onUserJoined: () => this.forceUpdate(),
              },
            })
          })
          .then(currentRoom => {
            this.setState({ currentRoom })
          })
         .catch(error => console.error('error', error))
      }

  render() {
    const styles = {
        container: {
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
        chatContainer: {
          display: 'flex',
          flex: 1,
        },
        whosOnlineListContainer: {
          width: '300px',
          flex: 'none',
          padding: 20,
          backgroundColor: '#2c303b',
          color: 'white',
        },
        chatListContainer: {
          padding: 20,
          width: '85%',
          display: 'flex',
          flexDirection: 'column',
        },
        logo: {
          color: '#fff',
          backgroundColor: '#539eff',
          padding: 20,
          marginBottom: 30
        }
     }
      
      return (
        <div style={styles.container}>
          <div style={styles.chatContainer}>
            <aside style={styles.whosOnlineListContainer}>
            <h1 style={styles.logo}>CapStone</h1>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
            </aside>
            <section style={styles.chatListContainer}>
            <MessageList
              messages={this.state.messages}
              style={styles.chatList}
            />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
            </section>
          </div>
        </div>
      )
  }
}

export default ChatScreen