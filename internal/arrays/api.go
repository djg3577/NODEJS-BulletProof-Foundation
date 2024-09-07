package arrays

import (
    "github.com/gin-gonic/gin"
)

func InitArrayHashingRoutes(api *gin.RouterGroup) {
    arraysHandler := &ArraysHandler{}
    arrayHashingAPI := api.Group("/arrays")
    {
        arrayHashingAPI.POST("/", arraysHandler.ContainsDuplicates)
    }
}