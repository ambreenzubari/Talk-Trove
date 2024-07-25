import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../src/assets/load.gif";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  allUsersRoute,
  getUserByIdRoute,
  sendFileToFirebaseRoute,
  setAvatarRoute,
} from "../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { FaUpload } from "react-icons/fa";
import DefaultAvatar from "../assets/user.png";
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
  const [isLoading, setIsLoading] = useState(false);
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
      console.log("No file selected or file selection was canceled.");
    }
  };

  const deleteAvatar = async () => {
    setIsLoading(true);
    setUploadedImage("");

    try {
      let avatarRes = await axios.post(`${setAvatarRoute}/${user._id}`, {});
      if (avatarRes.data.isSet) {
        localStorage.setItem("user", JSON.stringify(user));
        // navigate("/");
        toast.success("Avatar deleted successfully", toastOptions);
      }
    } catch (error) {
      toast.error("Error deleting avatar. Please try again", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  const removeAvatar = () => {
    setUploadedImage("");
    setImageFile(null);
  };

  const setProfilePicture = async () => {
    if (!uploadedImage || uploadedImage == "") {
      toast.error("Please select an avatar or upload an image", toastOptions);
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const data = await axios.post(`${sendFileToFirebaseRoute}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let avatarImage = data.data.fileUrl;
      let avatarRes = await axios.post(`${setAvatarRoute}/${user._id}`, {
        avatarImage,
      });

      if (avatarRes.data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = avatarImage;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        toast.success("Avatar set successfully", toastOptions);
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    } catch (error) {
      toast.error("Error uploading image. Please try again", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setIsLoading(true);
    try {
      let tempUser = JSON.parse(localStorage.getItem("user"));
      setUser(tempUser);
      console.log("User, t", tempUser);
      let token = await localStorage.getItem("token");

      let res = await axios.get(`${getUserByIdRoute}/${tempUser._id}`, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });
      console.log("RESPO----", res);
      if (res.status === 200) {
        setUser(res.data.user);
        setUploadedImage(res.data.user.avatarImage);
      }
    } catch (error) {
      toast.error("Error fetching user data. Please try again", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AvatarContainer>
        <div className="title-container">
          <h1>Select Image for Your Profile Picture</h1>
        </div>
        {isLoading ? (
          <div className="loader-container">
            <img src={loader} alt="Loading..." className="loader" />
          </div>
        ) : (
          <>
            <div className="avatar-section">
              <div className="uploaded-image-container">
                <img
                  src={
                    uploadedImage
                      ? uploadedImage
                      : "https://firebasestorage.googleapis.com/v0/b/talk-trove-aa698.appspot.com/o/user.png?alt=media&token=51ce9f15-d783-456f-807c-423e81b7b158"
                  }
                  alt="Uploaded Avatar"
                />
                <div className="camera-container" onClick={handleCameraClick}>
                  <img className="camera" src={Camera} alt="Camera Icon" />
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
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
            {imageFile && (
              <button className="submit-btn" onClick={setProfilePicture}>
                Set as Profile Picture
              </button>
            )}
            {uploadedImage && !imageFile && user.avatarImage && (
              <button className="submit-btn" onClick={deleteAvatar}>
                Delete Avatar
              </button>
            )}
            {imageFile && (
              <button className="submit-btn" onClick={removeAvatar}>
                Remove Avatar
              </button>
            )}
          </>
        )}
      </AvatarContainer>
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
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);

  .title-container {
    h1 {
      color: #ffffff;
      font-family: "Poppins", sans-serif;
      text-transform: uppercase;
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }

  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .uploaded-image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;

    img {
      height: 10rem;
      width: 10rem;
      border-radius: 50%;
      border: 0.4rem solid #4e8eff;
      object-fit: cover;
    }

    .camera-container {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 3rem;
      height: 3rem;
      background: #4e8eff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #2173a5;
      }

      .camera {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  .upload-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #ffffff;
    font-family: "Poppins", sans-serif;

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #4e8eff;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: background-color 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: #2173a5;
      }

      svg {
        font-size: 1.5rem;
      }
    }

    input {
      display: none;
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
      background-color: #2173a5;
    }
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;

    .loader {
      width: 5rem;
      height: 5rem;
    }
  }
`;
