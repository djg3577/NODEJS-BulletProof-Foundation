package arrays

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ArraysHandler struct {
	Service *ArrayService
}

func (h *ArraysHandler) ContainsDuplicates(c *gin.Context) {
	var numbers []int
	if err := c.ShouldBindJSON(&numbers); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	containsDuplicate := h.Service.ContainsDuplicates(numbers)

	c.JSON(http.StatusOK, gin.H{"containsDuplicates": containsDuplicate})
}