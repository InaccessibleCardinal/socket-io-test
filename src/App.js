import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import LoginForm from './components/LoginForm';
import ChatForm from './components/ChatForm';
import ChatWindow from './components/ChatWindow';

const socketIOUrl = 'http://localhost:9999';
const socket = socketIOClient(socketIOUrl);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      sample: '',
      sentMessages: [],
      receivedMessages: [],
      currentLocalMessage: null,
      user: '',
      userId: guid()
    };
    this.nameInputChange = this.nameInputChange.bind(this);
    this.login = this.login.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    socket.on('thread', (data) => {
      let newMessages = this.state.receivedMessages.concat(data);
      this.setState({receivedMessages: newMessages});
    });
    socket.on('userLeftRoom', (data) => {
      console.log(`${data.name} has left the room.`);
      console.log(data);
    });
  }
  login(e) {
    e.preventDefault();
    this.setState({loggedIn: true});
    socket.emit(
      'createUser', 
      {
        name: this.state.user, 
        uid: this.state.userId
      }
    );
  }
  nameInputChange(e) {
    let n = e.target.value;
    this.setState({user: n});
  }
  inputChange(e) {
    let value = e.target.value;
    let msg = {};
    msg.text = value;
    msg.id = guid();
    msg.user = this.state.user;
    this.setState({
      currentLocalMessage: msg
    });
  }
  submitMessage(e) {
    e.preventDefault();
    let msg = this.state.currentLocalMessage;
    
    msg.time = new Date().toLocaleString();
    msg.timeIndex = Date.now();
    let sentMessages = this.state.sentMessages;
    socket.emit('messages', msg);
    this.setState({
      currentLocalMessage: null,
      sentMessages: sentMessages.concat([msg])
    });
  }
  componentWillUnmount() {
    //
  }
  render() {
    let {sentMessages, receivedMessages, loggedIn, user} = this.state;
    return (
      <div className="container">
      {
        (loggedIn) ? 
        <div>
          <ChatWindow 
            sentMessages={sentMessages}
            receivedMessages={receivedMessages}
          />
          <ChatForm 
            submitHandler={this.submitMessage} 
            inputChangeHandler={this.inputChange}
            inputValue={this.state.currentLocalMessage}
          /> 
        </div> :
        <LoginForm
          nameChangeHandler={this.nameInputChange}
          submitHandler={this.login}
          user={user}
        />
      }
        
        
      </div>
    );
  }
}

export default App;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}