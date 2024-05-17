import styled from "styled-components";

export const ChatContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  gap: 1rem;

  .container {
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.7);
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (max-width: 720px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (max-width: 480px) {
      grid-template-columns: 45% 55%;
    }
  }
`;
