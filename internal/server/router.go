package server

import (
	arrayshashing "github.com/Tech-Ascend/tech-ascend-omega-backend/internal/arrays_hashing"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	api := router.Group("/api")

	arrayshashing.InitArrayHashingRoutes(api)

	return router
}
