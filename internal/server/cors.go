package server

import (
	"net/http"

	"github.com/rs/cors"
)

func SetupCORS(router http.Handler) http.Handler {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})
	return c.Handler(router)
}
