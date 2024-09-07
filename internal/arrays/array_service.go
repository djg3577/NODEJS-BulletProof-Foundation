package arrays

type ArrayService struct{}

func (arrayService *ArrayService) ContainsDuplicates(numbers []int) bool {
	if len(numbers) <= 1 {
		return false
	}
	seen := make(map[int]struct{})

	for _, number := range numbers {
		if _, found := seen[number]; found {
			return true
		}
		seen[number] = struct{}{}
	}
	return false
}