import React, { useState, useEffect } from "react";
import { ContactsContainer } from "../styles/ContactsContainer";
import Logo from "../../src/assets/logo.png";
import Logout from "./Logout";
import { FaSearch } from "react-icons/fa";
import { BsCamera } from "react-icons/bs";
import { useNavigate, useNavigation } from "react-router-dom";
import Global from "../shared/global";
const Contacts = ({ contacts, currentUser, changeChat }) => {
  const navigate = useNavigate();
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    console.log("Contacts", contacts);
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    console.log("Filered Contacts", filteredContacts);
  }, [searchQuery, contacts]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {currentUser && (
        <ContactsContainer>
          <div>
            <div className="current-user">
              <div className="current-user-avatar" onClick={() => navigate("/setAvatar")}>
                <img
                  src={`${
                    currentUser.avatarImage && currentUser.avatarImage != ""
                      ? currentUser.avatarImage
                      : "https://firebasestorage.googleapis.com/v0/b/talk-trove-aa698.appspot.com/o/user.png?alt=media&token=51ce9f15-d783-456f-807c-423e81b7b158"
                  }`}
                  alt="avatar"
                  
                />
                <div className="camera">
                  <BsCamera color="#fff"/>
                </div>
              </div>
              <div className="current-username">
                <h3>{Global.capitalizeFirstLetter(currentUser.username)}</h3>
              </div>
              <div className="logout">
                <Logout />
              </div>
            </div>
            <div
              className="searchContainer"
              style={{
                position: "relative",
                display: "inline-block",
                width: "100%",
              }}
            >
              <input
                className="search-input"
                type="text"
                placeholder="Search User"
                name="email"
                autoComplete="off"
                onChange={handleChange}
                style={{ paddingLeft: "40px" }} // Adjust the padding to accommodate the icon
              />
              <FaSearch
                style={{
                  position: "absolute",
                  color: "white",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
          q
          <div className="contacts">
            {filteredContacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`${
                      contact.avatarImage && contact.avatarImage != ""
                        ? contact.avatarImage
                        : "https://firebasestorage.googleapis.com/v0/b/talk-trove-aa698.appspot.com/o/user.png?alt=media&token=51ce9f15-d783-456f-807c-423e81b7b158"
                    }`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{Global.capitalizeFirstLetter(contact.username)}</h3>
                </div>
              </div>
            ))}
          </div>
        </ContactsContainer>
      )}
    </>
  );
};

export default Contacts;
