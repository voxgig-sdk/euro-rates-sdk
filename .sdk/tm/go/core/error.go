package core

type EuroRatesError struct {
	IsEuroRatesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewEuroRatesError(code string, msg string, ctx *Context) *EuroRatesError {
	return &EuroRatesError{
		IsEuroRatesError: true,
		Sdk:              "EuroRates",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *EuroRatesError) Error() string {
	return e.Msg
}
