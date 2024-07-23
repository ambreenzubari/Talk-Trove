import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../src/assets/load.gif";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { FaUpload } from "react-icons/fa";

export default function SetAvatar() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageMimeType, setUploadedImageMimeType] = useState("");

  const api = "https://api.multiavatar.com";

  const navigate = useNavigate();

  const setProfilePicture = async () => {
    let avatarImage = "";
    if (selectedAvatar !== undefined) {
      avatarImage = avatars[selectedAvatar];
    } else if (uploadedImage) {
      avatarImage = `data:${uploadedImageMimeType};base64,${uploadedImage}`;
    } else {
      toast.error("Please select an avatar or upload an image", toastOptions);
      return;
    }

    const user = await JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      avatarImage,
    });
    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = avatarImage; // Save the base64 image directly
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again", toastOptions);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setUploadedImage(base64String);
      setUploadedImageMimeType(file.type);
      setSelectedAvatar(undefined); // Deselect any selected avatar
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("token") && user.isAvatarImageSet) {
      navigate("/");
    } else if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      const apiKey = "sqPFgvUweONhTl";
      const getRandomId = () => Math.floor(Math.random() * 1000000000);

      for (let i = 0; i < 4; i++) {
        const id = getRandomId();
        const url = `${api}/${id}?apiKey=${apiKey}`;
        try {
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });
          const buffer = Buffer.from(response.data, "binary").toString("base64");
          data.push(buffer);
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      }

      setAvatars(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <AvatarContainer>
          <img src={loader} alt="loader" className="loader" />
        </AvatarContainer>
      ) : (
        <AvatarContainer>
          <div className="title-container">
            <h1>Choose an avatar for your profile picture</h1>
          </div>

          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedAvatar(index);
                    setUploadedImage(null); // Clear uploaded image if any
                  }}
                >
                  <div className="avatar-card">
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="upload-container">
            <label htmlFor="file-input">
              <FaUpload />
              Upload Image
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          {uploadedImage && (
            <div className="uploaded-image-container">
              <img
                src={`data:${uploadedImageMimeType};base64,${uploadedImage}`}
                alt="Uploaded Avatar"
              />
            </div>
          )}
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as profile picture
          </button>
        </AvatarContainer>
      )}
      <ToastContainer />
    </>
  );
}

const AvatarContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); /* Dark background gradient */

  .loader {
    width: 100px;
  }

  .title-container {
    h1 {
      color: #ffffff;
      font-family: 'Poppins', sans-serif;
      text-transform: uppercase;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;

      &.selected {
        border: 0.4rem solid #4e8eff;
      }

      .avatar-card {
        background-color: #ffffff;
        border-radius: 50%;
        padding: 0.5rem;
      }

      img {
        height: 6rem;
        width: 6rem;
      }
    }
  }

  .upload-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #4e8eff;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #2173A5;
      }

      svg {
        font-size: 1.5rem;
      }
    }

    input {
      display: none;
    }
  }

  .uploaded-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    img {
      height: 6rem;
      width: 6rem;
      border-radius: 50%;
      border: 0.4rem solid #4e8eff;
    }
  }

  .submit-btn {
    background-color: #4e8eff;
    color: #ffffff;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2173A5;
    }
  }
`;
