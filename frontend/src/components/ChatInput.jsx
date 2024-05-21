import React from "react";
import "./ChatInput.css";

const ChatInput = ({ send }) => {
    return (
        <div className="ChatInput">
            <input onKeyDown={send} />
        </div>
    );
};

export default ChatInput;
