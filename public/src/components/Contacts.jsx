import React, { useState, useEffect } from "react";
import { ContactsContainer } from "../styles/ContactsContainer";
import Logo from "../../src/assets/logo.png";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUser && (
        <ContactsContainer>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>TalkTrove</h3>
          </div>

          <div className="contacts">
            {contacts.map((contact, index) => (
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
          </div>
        </ContactsContainer>
      )}
    </>
  );
};

export default Contacts;
