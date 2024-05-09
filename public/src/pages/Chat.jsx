import React, { useState, useEffect } from "react";
import { ChatContainer } from "../styles/ChatContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import ChatsComponent from "../components/Chat";

import Welcome from "../components/Welcome";

function Chat() {
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
    fetchUsers();
  }, [currentUser]);

  const fetchUsers = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        if (data.data.status) {
          setContacts(data.data.users);
        }
      } else {
        navigate("/setAvatar");
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
          <ChatsComponent />
        )}
      </div>
    </ChatContainer>
  );
}

export default Chat;
