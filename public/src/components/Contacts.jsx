import React, { useState, useEffect } from "react";
import { ContactsContainer } from "../styles/ContactsContainer";
import Logo from "../../src/assets/logo.png";
import Logout from "./Logout";
import { FaSearch } from "react-icons/fa";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
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
              <div className="current-user-avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="current-username">
                <h3>{currentUser.username}</h3>
              </div>
              <div className="logout">
                <Logout />
              </div>
            </div>
            <div
              className="searchContainer"
              style={{ position: "relative", display: "inline-block", width: "100%" }}
            >
              <input
                className="search-input"
                type="text"
                placeholder="Search User"
                name="email"
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

          <div className="contacts">
            {filteredContacts.map((contact, index) => (
              <div
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* <div>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>TalkTrove</h3>
            </div>
          </div> */}
        </ContactsContainer>
      )}
    </>
  );
};

export default Contacts;