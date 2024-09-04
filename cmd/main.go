package main

import (
	"log"
	"net/http"

	"github.com/Tech-Ascend/tech-ascend-omega-backend/internal/server"
)

func main() {
	router := server.SetupRouter()
	handler := server.SetupCORS(router)
	startServer(handler)
}

func startServer(handler http.Handler) {
	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
