/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import "./Chat.scss";
import AuthContext from "../../context/AuthContext";
import { api } from "../../utils/api";
import { format } from "timeago.js";
import SocketContext from "../../context/SocketContext";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const chatArray = chats.chats || [];

  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [chat?.messages])

  const openChat = async (id, receiver) => {
    try {
      const response = await api.get(`/chat/${id}`);
      setChat({ ...response.data.chat, receiver });
    } catch (error) {
      console.log("error in chat", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.target.form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;

    const tempMessage = {
      id: `temp-${Date.now()}`,
      userId: currentUser.user.id,
      text,
      createdAt: new Date().toISOString()
    }

    try {
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, tempMessage]
      }))
      e.target.reset();
      const response = await api.post(`/message/${chat.id}`, { text });
      setChat((prev) => ({
        ...prev,
       messages: prev.messages.map((message) =>
        message.id === tempMessage.id ? response.data : message
        )
      }));
      const id = chat.receiver.id
      socket.emit("sendMessage", {
        receiverId: id,
        data: response.data,
      });
    
    } catch (error) {
      console.error("error in add chat", error);
      setChat((prev) => ({
        ...prev,
        messages: prev.messages.filter(
          (message) => message.id !== tempMessage.id
        ),
      }));
      console.log("Message not sent")
    }
    
  };

  useEffect(() => {
    const read = async () => {
      try {
        await api.put("/chat/read/" + chat.id);
      } catch (error) {
        console.error("error in read", error);
      }
    };

    if (chat && socket) {
      const handleMessage = (data) => {
         if (chat.id === data.chatId) {
           setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
           read();
         }
      }
     
        return () => {
          socket.off("getMessage", handleMessage);
        };
    }
  },[chat, socket]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {Array.isArray(chatArray) && chatArray.length > 0 ? (
          chatArray.map((chat) => (
            <div
              className="message"
              key={chat.id}
              style={{
                backgroundColor:
                  chat.seenBy.includes(currentUser.id) || chat?.id === chat.id
                    ? "white"
                    : "#fecd514e",
              }}
              onClick={() => openChat(chat.id, chat.receiver)}
            >
              <img src={chat.receiver.image || "/image.png"} alt="" />
              <span>{chat.receiver.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>
      {chat && (
        <div className="chatBox pt-96">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.image || "/image.png"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                style={{
                  alignSelf:
                    message.userId === currentUser.user.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.user.id ? "right" : "left",
                }}
                key={message.id}
                className="chatMessage"
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text" onKeyDown={handleKeyDown}></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
