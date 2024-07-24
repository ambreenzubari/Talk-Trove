import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../src/assets/load.gif";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Buffer } from "buffer";
import { sendFileToFirebaseRoute, setAvatarRoute } from "../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { FaUpload } from "react-icons/fa";
import DefaultAvatar from "../assets/user.png"
import Camera from "../assets/camera.png";
export default function SetAvatar() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [defaultAvatar, setDefaultAvatar] = useState(DefaultAvatar);
  const [user, setUser] = useState({});

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {

      const imageUrl = URL.createObjectURL(file);
      setImageFile(file);
      setUploadedImage(imageUrl);
    } else {
      console.log('No file selected or file selection was canceled.');
    }
  };

  const setProfilePicture = async () => {
    if (!uploadedImage || uploadedImage == '') {
      toast.error("Please select an avatar or upload an image", toastOptions);
      return;
    }
    const formData = new FormData();
    formData.append('file', imageFile);

    const data = await axios.post(`${sendFileToFirebaseRoute}`, formData,
      // {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // }

      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      },
    );
    let avatarImage = data.data.fileUrl
    let avatarRes = await axios.post(`${setAvatarRoute}/${user._id}`, {
      avatarImage,
    });
    if (avatarRes.data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = avatarImage; // Save the base64 image directly
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again", toastOptions);
    }
  };
  useEffect(() => {
    let tempUser = JSON.parse(localStorage.getItem("user"));
    setUser(tempUser)

    if (localStorage.getItem("token") && user.isAvatarImageSet) {
      navigate("/");
    } else if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <AvatarContainer>
        <div className="title-container">
          <h1>Select Image for your profile picture</h1>
        </div>

        <div>
          {uploadedImage ? (
            <div className="uploaded-image-container">
              <img
                src={uploadedImage}
                alt="Uploaded Avatar"
              />
            </div>
          ) : (
            <div className="uploaded-image-container">
              <img
                src={user.avatarImage && user.avatarImage != '' ? user.avatarImage : 'https://firebasestorage.googleapis.com/v0/b/talk-trove-aa698.appspot.com/o/user.png?alt=media&token=51ce9f15-d783-456f-807c-423e81b7b158'}
                alt="Uploaded Avatar"
              />
            </div>
          )}
          <div style={{

          }
          }>
            <div className="camera-container">
              <img className="camera" onClick={handleCameraClick}
                src={Camera}
                alt="Camera Avatar"
              />
            </div>
          </div>
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
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>


        <button className="submit-btn" onClick={setProfilePicture}>
          Set as profile picture
        </button>

        <p className="skip">Skip</p>
      </AvatarContainer>
      {/* )
      } */}
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
    visibility: hidden;    
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

  .skip{
    color:white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
    .camera-container{
       position: absolute;
    margin-top: -29px;
    width: 30px;
    height: 30px;
    background: gray;
    /* padding: 4px; */
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    padding: 3px;
    /* margin-right: 31px; */
    }
  .camera{
  width: 20px;
    height: 20px;
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
