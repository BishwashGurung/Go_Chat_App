// api/index.js
const socket = new WebSocket("ws://localhost:8080/ws");

export const connect = (cb) => {
    console.log(`Attempting Connection...`);

    socket.onopen = () => {
        console.log(`Successfully Connected`);
    };

    socket.onmessage = (msg) => {
        console.log(msg);
        cb(msg);
    };

    socket.onclose = (event) => {
        console.log(`Socket Error: ${event}`);
    };
};

export const sendMsg = (msg) => {
    console.log(`Sending Message: ${msg}`);
    socket.send(msg);
};
