import React, { useState, useEffect, useRef } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";

import './Contacts.css';

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null); // Create a ref for the search component

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false); // Close the search if click is outside
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    async function fetchData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    setShowDropdown(value.length > 0);
  }

  const filteredResults = query.length > 0 ? 
    contacts.filter(contact =>
      contact.username.toLowerCase().includes(query.toLowerCase())
    ) : 
    [];

  const changeCurrentChat = (contact) => {
    setCurrentSelected(contact._id);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <div className="contact-box">
          <div className="brand">
            <h3 style={{display: isSearchOpen ? "none": ""}}>Contact</h3>
            <button ref={searchRef} className={isSearchOpen ? "search-open":"search"}>
              <IoIosSearch className="search-icon" onClick={() => setIsOpen(!isSearchOpen)}/>
              {isSearchOpen ?
              <>
                <div>
                  <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => setShowDropdown(true)}
                  />
                  <div className="dropdown">
                      {filteredResults.map((contact) => (
                        <div 
                          key={contact._id}
                          className="item"
                          onMouseDown={() => changeCurrentChat(contact)}
                        >
                          <p style={{fontSize:"20px"}}>{contact.username}</p>
                        </div>
                      ))}
                  </div>
                </div>
                <CiCircleRemove onClick={() => setQuery("")}/>
                </>
              :null}
            </button>
            <button className="add-group">
              <AiOutlineUsergroupAdd/>
            </button>
          </div>
          <div className="contacts">
            {contacts.map((contact) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    contact._id === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Contacts;