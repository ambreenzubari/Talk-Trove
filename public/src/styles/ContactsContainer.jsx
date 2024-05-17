import styled from "styled-components";

export const ContactsContainer = styled.div`
  display: grid;
  grid-template-rows: 8% 77% 15%;
  overflow: hidden;
  background-color: #1e1e1e;
  border-right: 1px solid #2c2c3e;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: #997af0;
      font-size: 1.5rem;
    }
  }

  .contacts {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #2a2a40;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;

      padding-left: 0.4rem;
      padding-right: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          font-size: 1rem;
          color: white;
        }
      }
    }

    .selected {
      background-color: #997af0;
    }
  }

  .current-user {
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    gap:1rem;
    margin: 0px;
    bottom: 0; /* Ensuring it stays at the bottom */
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1); /* Adding shadow to make it stand out */

    .username {
      h2 {
        color: white;
        font-size: 1.2rem;
        word-break: break-word;
      }
    }

    /* Adding styles for the logout button */
    .logout-button {
      background-color: #997af0;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.3rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #7d5cb3;
      }
    }
  }

  .current-user-avatar {
    img {
      height: 3rem;
    }
  }

  .current-username {
    h3 {
      color: white;
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 720px) {
    .contacts {
      .contact {
        width: 100%;
        min-height: 4rem;
        padding: 0.3rem;

        .avatar {
          img {
            height: 2rem;
          }
        }
        .username {
          h3 {
            font-size: 0.6rem;
          }
        }
      }
    }
  }
`;
