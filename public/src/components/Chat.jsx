import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";
import { ChatRightContainer } from "../styles/ChatRightContainer";
import Logout from "./Logout";
const ChatsComponent = ({ currentChat, currentUser, socket }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const getMessages = async () => {
    if (currentUser && currentChat) {
      let token = localStorage.getItem("token");

      const response = await axios.post(
        getMessageRoute,
        {
          from: currentUser._id,
          to: currentChat._id,
        },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      setMessages(response.data);
    }
  };

  const handleSendMsg = async (msg) => {
    if (msg.length > 0) {
      let token = localStorage.getItem("token");
      await axios.post(
        sendMessageRoute,
        {
          from: currentUser._id,
          to: currentChat._id,
          message: msg,
        },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );
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
                      ? `${
                          currentChat.avatarImage &&
                          currentChat.avatarImage != ""
                            ? currentChat.avatarImage
                            : "https://firebasestorage.googleapis.com/v0/b/talk-trove-aa698.appspot.com/o/user.png?alt=media&token=51ce9f15-d783-456f-807c-423e81b7b158"
                        }`
                      : ""
                  }
                  alt="avatar"
                />
              </div>

              <div className="username">
                <h3>{currentChat ? currentChat.username : ""}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.length > 0 ? (
              messages.map((message) => (
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
              ))
            ) : (
              <div className="no-message">
                <p>
                  Go ahead and send a message to start chatting! Once you do,
                  you'll be able to see and join the conversation. Don't be shy,
                  say hello and begin the chat!
                </p>
              </div>
            )}
          </div>
          <ChatInput handleSendMessage={handleSendMsg} />
        </ChatRightContainer>
      )}
    </>
  );
};

export default ChatsComponent;
