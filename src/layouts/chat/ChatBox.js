import React, { useContext, useEffect,useRef, useState } from "react";
import "./ChatBot.css"
import { AuthContext } from "../../context/auth.context";
import Conversation from "./Conversation";
import ChatShop from "./ChatShop";
import {io} from "socket.io-client"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from "axios";
import config from '../../config'
const ChatBox = () => {

    const {authState: {shop}, userChats} = useContext(AuthContext)
    const [user, setUser] = useState("")
    const [userId, setUserId] = useState("")


    const shopId = localStorage.getItem("shopId")
    console.log("shopId",shop);
    useEffect(() => {

        const getInfo = async() => {
            const result = await axios.get(`${config.urlProductService}/shop/getInfo/${shopId}`)
           await setUser( result.data.metadata)
           await setUserId(result.data.metadata._id)

        }
        getInfo()
    },[shopId])
   
    

    const [chats, setChats] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const [currentChat, setCurrentChat] = useState(null)
    const socket = useRef()
   console.log("user", userId);

    useEffect(() => {
       
          socket.current = io(`${config.urlSocket}`);
          socket.current.emit("new-user-add", userId)
          socket.current.on("get-user", (users) => {
            setOnlineUsers(users)
          })
    }, [shop])

    

    useEffect(() => {
        const getChats = async () => {
            try {
                console.log("userS", userId);
                if (userId) {
                    const data = await userChats(userId);
                    console.log("data", data);
                    setChats(data);
                }
            } catch (error) {
                console.log("errr", error);
            }
        };
        getChats();
    }, [userId, userChats]);
  
     //send mess to socker server
     useEffect(() => {
        if(sendMessage !== null) {
         socket.current.emit('send-message', sendMessage)
        }
     }, [sendMessage])
      //recie mess to socker server
      useEffect(() => {
        socket.current.on("receive-message", (data) => {
            console.log("data received in parent chat.jsx", data);
            setReceiveMessage(data)
        })
     }, [])
     console.log("cy",currentChat);
 
    return (
        <DashboardLayout>
        <DashboardNavbar />
        <div className="Chat">
            {/* left side */}
            <div className="Left-side-chat">
                <div className="Chat-container">
                <h2>Trò Chuyện</h2>
                <div className="Chat-list">
                   {chats?.map((chat) => (
                    <div onClick={() => setCurrentChat(chat)}>
                        <Conversation data={chat} currentUserId={user._id} />
                    </div>
                   ))}
                </div>
                </div>
                
            </div>


            {/* right side */}
            <div className="Right-side-chat">
                <div style={{width: '20rem', alignSelf: "flex-end"}}>
                </div>
                <ChatShop chat={currentChat} currentUser = {user?._id}
                setSendMessage = {setSendMessage}
                receiveMessage={receiveMessage}/>
            </div>
        </div>
        <Footer />
    </DashboardLayout>
    )
}

export default ChatBox