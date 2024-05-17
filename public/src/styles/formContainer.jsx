import styled from "styled-components";

export const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); /* Dark background gradient */
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 4rem;
    }
    h1 {
      color: #ffffff;
      font-family: 'Poppins', sans-serif;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #1c1c1c; /* Dark card color */
    border-radius: 1rem;
    padding: 3rem 4rem;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
    
    input {
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

    button {
      background-color: #4e8eff; /* Button color */
      color: #ffffff;
      padding: 1rem 0;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.5rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #2173A5; /* Darker button on hover */
      }
    }

    span {
      color: #ffffff;
      text-transform: uppercase;
      a {
        color: #4e8eff;
        text-decoration: none;
        font-weight: 600;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
