package arrays

type ArrayService struct{}

type Step struct {
    Number      int  `json:"number"`
    IsDuplicate bool `json:"isDuplicate"`
}

type ContainsDuplicatesResult struct {
    ContainsDuplicates bool   `json:"containsDuplicates"`
    Steps              []Step `json:"steps"`
}

func (arrayService *ArrayService) ContainsDuplicates(numbers []int) ContainsDuplicatesResult {
    result := ContainsDuplicatesResult{
        ContainsDuplicates: false,
        Steps:              make([]Step, 0, len(numbers)),
    }

    if len(numbers) <= 1 {
        for _, number := range numbers {
            result.Steps = append(result.Steps, Step{Number: number, IsDuplicate: false})
        }
        return result
    }

    seen := make(map[int]struct{})

    for _, number := range numbers {
        if _, found := seen[number]; found {
            result.Steps = append(result.Steps, Step{Number: number, IsDuplicate: true})
            result.ContainsDuplicates = true
            return result
        }
        seen[number] = struct{}{}
        result.Steps = append(result.Steps, Step{Number: number, IsDuplicate: false})
    }

    return result
}