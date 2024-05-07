import React, { useState, useEffect } from "react";
import { ChatContainer } from "../styles/ChatContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  const fetchUsers = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        console.log("DATA===", data);
        if (data.data.status) {
          setContacts(data.data.users);
        }
      } else {
        navigate('/setAvatar')
      }
    }
  };
  return (
    <ChatContainer>
      <div className="container"></div>
    </ChatContainer>
  );
}

export default Chat;
