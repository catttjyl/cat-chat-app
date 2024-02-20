import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../../utils/APIRoutes";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { LiaChessBoardSolid } from "react-icons/lia";


import "./InfoBar.css"

const InfoBar = () => {
    const navigate = useNavigate();

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);

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

    const handleLogout = async () => {
          const id = await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )._id;
          const data = await axios.get(`${logoutRoute}/${id}`);
          if (data.status === 200) {
              localStorage.clear();
              navigate("/login");
          }
    };
  
    
    return(
        <div className="info-containter">
            <Popup
                trigger=
                {<button className="avatar-img"> 
                    <img
                        src={`data:image/svg+xml;base64,${currentUserImage}`}
                        alt="avatar"
                    />
                </button>}
                position="right top"
                nested
                arrow={false}
                contentStyle={{
                    padding: '10px',
                    backgroundColor: '#EEEEEE', 
                    borderRadius: '3px', 
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
                    marginLeft: 2,
                }}
            >
                    <h1 style={{ fontSize: "35px", marginLeft: 20 , marginBottom: -20, marginTop: 5, marginRight: 0}}>{currentUserName}</h1>
                    <h3 style={{ fontSize: "17px", marginLeft: 10, marginRight: 0}}><Link style={{color: "#393E46", textDecoration: "none", margin: '12px', backgroundColor: "#929AAB"}} to="/setAvatar">Change avatar</Link></h3>
            </Popup>

            <Popup
                trigger=
                {<button className="setting">
                    <LiaChessBoardSolid style={{width: "50px", height: "50px"}}/>
                </button>}
                position="right bottom"
                nested
                arrow={false}
                contentStyle={{
                    display: "flex",
                    flexDirection: "column",
                    // padding: '10px 25px',
                    backgroundColor: '#929AAB', 
                    borderRadius: '2px', 
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
                    marginLeft: 7,
                    border: "none"
                }}
            >
                <Popup trigger=
                    {<button style={{border: "none", background: "transparent"}}>
                        <h2>Feedback</h2>
                    </button>}
                    modal 
                    nested
                    contentStyle={{
                        padding: "30px",
                        width: "30rem",
                        backgroundColor: '#F7F7F7', 
                        borderRadius: '3px', 
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
                        border: "none"
                    }}
                >
                    { close => (
                            <div style={{display:"flex", flexDirection:"column", gap: "10px"}}>
                                <select name="feedback-category" style={{width: "50%"}}>
                                    <option value="UI"><h3>Design</h3></option>
                                    <option value="banana">Function</option>
                                    <option value="banana">Technical</option>
                                    <option value="orange">Security</option>
                                    <option value="others">Others</option>
                                </select>
                                <input placeholder="Put your suggestion here..." style={{height: "80px"}}/>
                                <button 
                                    style={{width: "40%", height:"30px", borderRadius:"5px"}}
                                    onClick={()=>{close()}}
                                >Send</button>
                            </div>
                        )
                    }
                </Popup>
                    <button style={{ border: "none", background: "transparent"}} onClick={handleLogout}><h2>Log Out</h2></button>
            </Popup>
            
            {/* <Popup trigger=
                {<button className="setting">
                    <LiaChessBoardSolid style={{width: "50px", height: "50px"}}/>
                </button>}
                modal 
                nested
            >
                { close => (
                        <div className='modal'>
                            <div className='content'>
                                Welcome to GFG!!!
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close modal
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup> */}
            {/* <button  onClick={handleLogout}>
                <LiaChessBoardSolid />
            </button> */}
        </div>
    );
};

export default InfoBar;