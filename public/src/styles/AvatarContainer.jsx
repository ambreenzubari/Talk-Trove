import styled from "styled-components";

export const AvatarContainer = styled.div`
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 40%;
  }

  @media screen and (max-width:720px){
    .loader {
      max-inline-size: 80%;
    }
  }

  .title-container {
    h1 {
      color: white;
      font-family: 'Poppins', sans-serif;
      text-transform: uppercase;
    }
  }

  .avatars {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
      &:hover {
        border-color: #4e8eff;
      }
    }
    .selected {
      border-color: #4e0eff;
    }
  }

  button {
    background-color: #4e8eff;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: #997af0;
    }
  }

  @media (max-width: 768px) {
    .avatars {
      gap: 1rem;
      .avatar {
        img {
          height: 4rem;
        }
      }
    }

    button {
      padding: 0.8rem 1.5rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .avatars {
      flex-direction: column;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
    }

    button {
      padding: 0.6rem 1rem;
      font-size: 0.8rem;
    }
  }
`;
