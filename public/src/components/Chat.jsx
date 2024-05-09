import React from "react";
import styled from "styled-components";
import Logout from "./Logout";

const ChatsComponent = ({ currentChat }) => {
  return (
    <>
      {currentChat && (
        <Container>
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
            <Logout />
          </div>
          <div className="chat-messages">
            <div className="chat-input"></div>
          </div>
        </Container>
      )}
    </>
  );
};

export default ChatsComponent;

const Container = styled.div`
  padding: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;
