package arrays

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func InitArrayHashingRoutes(api *gin.RouterGroup) {
    arrayHashingAPI := api.Group("/arrays")
    {
        arrayHashingAPI.GET("/", helloWorldHandler)
    }
}

func helloWorldHandler(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
        "message": "HELLO WORLD",
    })
}