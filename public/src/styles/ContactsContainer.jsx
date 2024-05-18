import styled from "styled-components";

export const ContactsContainer = styled.div`
  overflow: hidden;
  background-color: #1e1e1e;
  border-right: 1px solid #2c2c3e;
  .searchContainer{
    padding: 0.5em;
  }
  .search-input {
    background-color: #333333; /* Darker input field color */
    padding: 0.8rem;
    border: none;
    border-radius: 0.5rem;
    color: #ffffff;
    width: 100%;
    font-size: 1rem;
    transition: all 0.3s ease;
    &:focus {
      border: 0.1rem solid #4e8eff; /* Light border on focus */
      outline: none;
    }
  }
  .brand {
    margin-top:1rem;
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
    height:100%;
    padding-right: 0.5rem;
    padding-bottom:120px;
    padding-left: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.5rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #4C4C4C;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #4C4C4C;
      width: 100%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 2.6rem;
        }
      }

      .username {
        h3 {
          font-weight: 500;
          font-size: 1em;
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
    margin-top: 15px;
    justify-content: space-between;
    width: 100%;
    padding-left: 1rem;
    margin: 0px;
    bottom: 0;
    padding-right: 1rem;
    padding-top: 0.9rem;
}
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
    width: 20%;
    img {

      height: 2rem;
    }
  }

  .current-username {
    width: 60%;
    h3 {
      color: white;
      font-size: 1rem;
      width: 60%;
      font-size: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .logout{
    display: flex;
    justify-content: end;  
   width:20%;
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
