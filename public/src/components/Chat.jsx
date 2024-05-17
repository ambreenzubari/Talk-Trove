
import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";
import { ChatRightContainer } from "../styles/ChatRightContainer";

const ChatsComponent = ({ currentChat, currentUser, socket }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const getMessages = async () => {
    if (currentUser && currentChat) {
      const response = await axios.post(getMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
  };

  const handleSendMsg = async (msg) => {
    if (msg.length > 0) {
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <ChatRightContainer>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={
                    currentChat
                      ? `data:image/svg+xml;base64,${currentChat.avatarImage}`
                      : ""
                  }
                  alt="avatar"
                />
              </div>

              <div className="username">
                <h3>{currentChat ? currentChat.username : ""}</h3>
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMessage={handleSendMsg} />
        </ChatRightContainer>
      )}
    </>
  );
};

export default ChatsComponent;
