import React, { useEffect, useState } from "react";
import "./Message.css";

const Message = (props) => {
    const [message, setMessage] = useState({});

    useEffect(() => {
        if (props.message) {
            const temp = JSON.parse(props.message);
            setMessage(temp);
        }
    }, [props.message]);

    return <div className="Message">{message.body}</div>;
};

export default Message;
