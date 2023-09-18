import AllowedOperations from "../constants/operation"

class Calculator {
  private resultStack: number[]

  constructor(
    operand_first: number,
    operand_second: number,
    operation: AllowedOperations
  ) {
    this.resultStack = [operand_first]
    this.performOperation(operation, operand_second)
    this.resultStack = this.resultStack.slice(1)
  }

  performOperation(operation: AllowedOperations, operand: number) {
    let lastResult =
      this.resultStack.length === 0
        ? 0
        : this.resultStack[this.resultStack.length - 1]
    switch (operation) {
      case AllowedOperations.ADD:
        this.resultStack.push(lastResult + operand)
        break
      case AllowedOperations.SUBTRACT:
        this.resultStack.push(lastResult - operand)
        break
      case AllowedOperations.MULTIPLY:
        this.resultStack.push(lastResult * operand)
        break
      case AllowedOperations.DIVISION:
        this.resultStack.push(lastResult / operand)
        break
      default:
        throw new Error("Operation not allowed")
    }
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
