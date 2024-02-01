import React from 'react';

import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type your message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={event => sendMessage(event)}>Send</button>
  </form>
)

export default Input;