import React from "react";
import "./ChatHistory.css";

const ChatHistory = ({ chatHistory }) => {
    return (
        <div className="ChatHistory">
            <h2>Chat History</h2>
            {chatHistory.map((msg, index) => (
                <p className="message" key={index}>{msg.data}</p>
            ))}
        </div>
    );
};

export default ChatHistory;
