import React, { useState, useEffect, useRef } from "react";
import { ChatContainer } from "../styles/ChatContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import ChatsComponent from "../components/Chat";

import Welcome from "../components/Welcome";
import { io } from "socket.io-client";
function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  const fetchUsers = async () => {
    if (currentUser && currentUser._id) {
      if (currentUser) {
        let token = localStorage.getItem("token");
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`, {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        });
        if (data.data.status) {
          setContacts(data.data.users);
        }
      }
     
    }
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <ChatContainer>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatsComponent
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </ChatContainer>
  );
}

export default Chat;
