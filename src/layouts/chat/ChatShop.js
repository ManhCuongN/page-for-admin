import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios"
import { AuthContext } from "../../context/auth.context";
import { format } from "timeago.js"
import InputEmoji from 'react-input-emoji'
import "./ChatShop.css"
import config from '../../config'
const ChatShop = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scroll = useRef()
    useEffect(() => {
        if(receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessages([...messages, receiveMessage])
        }
    }, [receiveMessage])

    const { getMessages, addMessages } = useContext(AuthContext)

    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser.toString())

        const getUserData = async () => {
            const data = {
                userId
            }
            const result  = await axios.post(`${config.urlUserService}/user/check/exist`,data)
     
            setUserData(result.data.user)

        }
        if (chat !== null) getUserData()

    }, [chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getMessages(chat._id)
                setMessages(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages()
    }, [chat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    const handleSend = async(e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id
        }

        try {
            const data = await addMessages(message)
            console.log(data);
            setMessages([...messages, data])
            setNewMessage("")

        } catch (error) {
            console.log(error);
        }
        const receiverId = chat.members.find((id) => id !== currentUser.toString())
        setSendMessage({...message, receiverId})
    }

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <img
                                        src={userData?.avatar}
                                        alt="Profile"
                                        className="followerImage"
                                        style={{ width: "50px", height: "50px", borderRadius: "100%"}}
                                    />
                                    <div className="name" style={{ fontSize: '0.8rem' }}>
                                        <span>{userData?.name}</span>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />

                        </div>
                        {/* 
                  chatbox mess */}
                        <div className="chat-body">
                            {
                                messages.map((message) => (
                                    <>

                                        <div 
                                        ref={scroll}
                                        className={message.senderId === currentUser.toString() ? "message own" : "message"}>
                                            <span>{message.text}</span>
                                            <span>{format(message.createdAt)}</span>
                                        </div>
                                    </>
                                ))}
                        </div>
                        {/*  chat sender */}
                        <div className="chat-sender">
                            <div>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div className="send-button button" onClick={handleSend}>Send</div>
                        </div>
                    </>
                ) : (
                    <span>Tap on to start chat</span>
                )}

            </div>
        </>
    )
}

export default ChatShop