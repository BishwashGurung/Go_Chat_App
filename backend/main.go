package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// Defining upgrader
// Require a read and write buffer size
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	// check the origin of our connection
	// allow us to make requests from our react development server to here
	// For now, no checking and just allow any connection
	CheckOrigin: func(r *http.Request) bool { return true },
}

// Reader will listen for new messages being sent to our weksocket endpoint
func reader(conn *websocket.Conn) {
	for {
		// read in a message
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		// printing out that message for clarity
		fmt.Println(string(p))
		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

// defining our websocket
func serverWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)
	// upgrading this connection to websocket connection
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	// listening indefinitely for new messages coming through on our WebSocket Connection
	reader(ws)
}

func SetUpRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Simple Server")
	})
	// map our '/ws' endpoint to the 'serverWs' function
	http.HandleFunc("/ws", serverWs)
}

func main() {
	fmt.Println("Chat App v0.01")
	SetUpRoutes()
	http.ListenAndServe(":8080", nil)
}
