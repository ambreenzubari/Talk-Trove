import styled from "styled-components";

export const ChatRightContainer = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  overflow: hidden;
  background-color: #1e1e1e;
  padding: 0px;
  margin: 0px;
  border-radius: 0.5rem;

  @media screen and (min-width: 400px) and (max-width: 1200px) {
    grid-template-rows: 10% 78% 12%;
  }
  .no-message {
    color: #000000; /* Black text for better contrast on yellow */
    display: flex;
    align-items: center;
    justify-content: center;
   
  }
  
  .no-message p {
    font-size: 12px; /* Smaller text size */
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    padding: 4px; /* Padding for better spacing */
    text-align: center; /* Center the text */
    width: 70%;
    background: #fff8cd; /* Yellow background similar to WhatsApp */

    margin: 0; /* Remove default margin */
    line-height: 1.2; /* Increase line height for better readability */
    font-weight: normal; /* Normal font weight */
  }
  
  
  .chat-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background-color: #1E1E1E;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      align-items: center;
      .avatar {
        img {
          height: 2.5rem;
          border-radius: 50%;
        }
      }

      .username {
        h3 {
          color: white;
          font-size: 16px;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.3rem;

      &-thumb {
        background-color: #ffffff39;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        

        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
  }

  .sended {
    justify-content: flex-end;

    .content {
      background-color: #4c4c4c;
    }
  }

  .recieved {
    justify-content: flex-start;

    .content {
      background-color: #9900ff20;
    }
  }
`;
