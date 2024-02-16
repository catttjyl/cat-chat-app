import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import Contacts from "../../components/Contacts/Contacts";
import Welcome from "../../components/Welcome/Welcome";

import "./Chat.css";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
		async function fetchData() {
			if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
				navigate("/login");
			} else {
				setCurrentUser(
					await JSON.parse(
					localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
					)
				);
			}
		}
		fetchData();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
		async function fetchData() {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) {
				  const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
				  setContacts(data.data);
				} else {
				  navigate("/setAvatar");
				}
			}
		}
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
		<div className="chat">
			<div className="contain-box">
				<Contacts contacts={contacts} changeChat={handleChatChange} />
				{currentChat === undefined ? (
					<Welcome />
				) : (
					<ChatContainer currentChat={currentChat} socket={socket} />
				)}
			</div>
		</div>
  );
}

export default Chat;