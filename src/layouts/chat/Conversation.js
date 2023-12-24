import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import config from '../../config'
import axios from 'axios';


const Conversation = ({data, currentUserId}) => {
  const [userData, setUserData] = useState(null)
  const {authState: {user}} = useContext(AuthContext)
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId.toString())
    console.log("sa", userId);
    const getUserData = async() => { 
        const data = {
            userId
        }
        const result  = await axios.post(`${config.urlUserService}/user/check/exist`,data)
     
        setUserData(result.data.user)
      
    }
    getUserData()
  },[]) 
  return (
    <>
    <div className="follower conversation">
      <div>
         <div className="online-dot"></div>
        <img
          src={userData?.avatar}
          alt="Profile"
          className="followerImage"
          style={{ width: "50px", height: "50px", borderRadius:"100%" }}
        />
        <div className="name" style={{fontSize: '0.8rem'}}>
          <span>{userData?.givenName} {userData?.familyName
}</span>
          {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
        </div>
      </div>
    </div>
    <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    
  </>
  )
}

export default Conversation