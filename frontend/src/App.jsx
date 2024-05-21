import React, { useEffect, useState } from "react";
import "./App.css";
import { connect, sendMsg } from "./api/index.js";
import Header from "./components/Header.jsx";
import ChatHistory from "./components/ChatHistory.jsx";
import ChatInput from "./components/ChatInput.jsx";

const App = () => {
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        connect((msg) => {
            console.log("New Message");
            setChatHistory((prevChatHistory) => [...prevChatHistory, msg]);
            console.log(chatHistory);
        });
    }, []);

    const send = (event) => {
        if (event.keyCode === 13) {
            sendMsg(event.target.value);
            event.target.value = "";
        }
    };

    return (
        <div className="App">
            <Header />
            <ChatHistory chatHistory={chatHistory} />
            <ChatInput send={send} />
        </div>
    );
};

export default App;
