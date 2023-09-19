import AllowedOperations from "../constants/operation"
import HttpStatus from "../constants/status_code"
import AppError from "../types/errors"

class Calculator {
  private resultStack: number[]
  private precision: number

  constructor(
    operand_first: number,
    operand_second: number,
    operation: AllowedOperations
  ) {
    this.precision = 4
    this.resultStack = [operand_first]
    this.performOperation(operation, operand_second)
    this.resultStack = this.resultStack.slice(1)
  }

  performOperation(operation: AllowedOperations, operand: number) {
    let lastResult = this.getCurrentValue()
    let result: number | null
    switch (operation) {
      case AllowedOperations.ADD:
        result = lastResult + operand
        break
      case AllowedOperations.SUBTRACT:
        result = lastResult - operand
        break
      case AllowedOperations.MULTIPLY:
        result = lastResult * operand
        break
      case AllowedOperations.DIVISION:
        if (operand === 0)
          throw new AppError(
            "division by 0 is not allowed",
            HttpStatus.BAD_REQUEST
          )
        result = lastResult / operand
        break
      default:
        throw new AppError("Operation not allowed", HttpStatus.BAD_REQUEST)
    }

    if (result === null) return
    if (result.toString().split(".").length === 2) {
      result = parseFloat(result.toFixed(this.precision))
    }

    this.resultStack.push(result)
    return this.getCurrentValue()
  }

  getCurrentValue() {
    if (this.resultStack.length === 0) return 0
    return this.resultStack[this.resultStack.length - 1]
  }

  getTotalOperation() {
    return this.resultStack.length
  }

  undo() {
    this.resultStack.pop()
    return this.getCurrentValue()
  }

  reset() {
    this.resultStack = []
    return this.getCurrentValue()
  }
}

export default Calculator
