package server

import (
	"github.com/Tech-Ascend/tech-ascend-omega-backend/internal/arrays"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	api := router.Group("/api")

	arrays.InitArrayHashingRoutes(api)

	return router
}