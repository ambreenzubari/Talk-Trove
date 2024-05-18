import styled from "styled-components";

export const AvatarContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
background-color: #1e1e2f;
color: #fff;

.title-container {
  margin-bottom: 20px;
}

.avatars {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-left:40px;
  margin-right:40px;
  margin-bottom: 20px;

  .avatar {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    
    &.selected {
      transform: scale(1.1);
      border: 2px solid #4caf50;
    }

    .avatar-card {
      background: #2c2c3c;
      border-radius: 10px;
      padding: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
  }
}

.submit-btn {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    transform:scale(1.2);
    transition: background-color 0.3s ease-in-out;
    background-color: #45a049;
  }
}

.loader {
  width: 50px;
}
`;
