package main

import (
	"fmt"
	"net/http"

	"github.com/BishwashGurung/Go_React_Chat_App/pkg/websocket"
)

// defining our websocket
func serverWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}
	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}
	pool.Register <- client
	client.Read()
}

func SetUpRoutes() {
	pool := websocket.NewPool()
	go pool.Start()
	// map our '/ws' endpoint to the 'serverWs' function
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serverWs(pool, w, r)
	})
}

func main() {
	fmt.Println("Distributed Chat App v0.01")
	SetUpRoutes()
	http.ListenAndServe(":8080", nil)
}
