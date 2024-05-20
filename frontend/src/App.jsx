import React, { useEffect, useState } from "react";
import "./App.css";
import { connect, sendMsg } from "./api/index.js";
import Header from "./components/Header.jsx";
import ChatHistory from "./components/ChatHistory.jsx";

const App = () => {
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        connect((msg) => {
            console.log("New Message");
            setChatHistory(prevChatHistory => [...prevChatHistory, msg]);
            console.log(chatHistory);
        });
    }, []);

    const send = () => {
        console.log("hello");
        sendMsg("hello");
    };

    return (
        <div className="App">
            <Header />
            <ChatHistory chatHistory={chatHistory} />
            <button onClick={send}>Hit</button>
        </div>
    );
};

export default App;
