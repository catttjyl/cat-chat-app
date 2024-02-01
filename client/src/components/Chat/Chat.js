import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

import './Chat.css';

let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
		const [message, setMessage] = useState('');
		const [messageList, setMessageList] = useState([]);
		const [users, setUsers] = useState('');
	
    const ENDPOINT = 'http://localhost:3001';
  
    const location = useLocation();
    
    useEffect(() => {
			const { name, room } = queryString.parse(location.search);

			// console.log(location.search);
			// console.log(name,room);

			socket = io(ENDPOINT);
			console.log(socket);

			setRoom(room);
			setName(name)

			socket.emit('join', { name, room }, (error) => {
			//   if(error) {
			//     alert(error);
			//   }
			});
		}, [ENDPOINT, location.search]);

		useEffect(() => {
			socket.on('message', message => {
				setMessageList(messageList => [ ...messageList, message ]);
			});
			
			socket.on("roomData", ({ users }) => {
				setUsers(users);
			});
		}, [messageList]);
	
		const sendMessage = (event) => {
			if (event) event.preventDefault();
	
			if(message) {
				socket.emit('sendMessage', message, () => setMessage(''));
			}
		}

		console.log(message, messageList);

    return (
      <div className="outerContainer">
				<div className="container">
						<InfoBar room={room} />
						<Messages messageList={messageList} name={name} />
						<Input 
							message={message} 
							setMessage={setMessage} 
							sendMessage={sendMessage} />
						{/* <input
							value={message}
							onChange={(event)=>setMessage(event.target.value)}
							onKeyDown={(event)=> event.key === 'Enter' ? sendMessage(event) : null}
						/> */}
				</div>
				<TextContainer users={users}/>
			</div>
    );
};

export default Chat;