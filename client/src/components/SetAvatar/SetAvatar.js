import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
// import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../../utils/APIRoutes";

import "./SetAvatar.css";
import "./nyancat.css";

export default function SetAvatar() {
  const api = `https://api.dicebear.com/7.x/croodles-neutral/svg?seed=`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    async function fetchData() {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        navigate("/login");
    }
    fetchData();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  function generateRandomString(maxLength = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < maxLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  

  useEffect(() => {
    async function fetchData() {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(
                `${api}${generateRandomString()}`
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
    }
    fetchData();
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="avatar-container">
          <div class="cat">
            <div class="tail"><div class="sprite"></div></div>
            <div class="feet"><div class="sprite"></div></div>
            <div class="poptart"></div>
            <div class="head"></div>
          </div>
        </div>
      ) : (
        <div className="avatar-container">
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <span onClick={()=> setIsLoading(true)}>
            Not seeing your favourite? <a>Refresh</a>
          </span>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
