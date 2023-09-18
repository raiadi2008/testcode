import { expect } from "chai"
import Calculator from "../../models/calculator"
import { before, describe, it } from "node:test"
import AllowedOperations from "../../constants/operation"

describe("Calculator Operation Test", () => {
  let calculator: Calculator

  before(() => {
    calculator = new Calculator(0, 0, AllowedOperations.ADD)
  })

  it("calculator initialization ( 0, 0, 'add')", () => {
    const result = calculator.getCurrentValue()
    expect(result).to.equal(0)
  })

  it("add 4", () => {
    const result = calculator.performOperation(AllowedOperations.ADD, 4)
    expect(result).to.equal(4)
  })

  it("add -4.254", () => {
    const result = calculator.performOperation(AllowedOperations.ADD, -4.254)
    expect(result).to.equal(-0.254)
  })

  it("Add 0.254", () => {
    const result = calculator.performOperation(AllowedOperations.ADD, 0.254)
    expect(result).to.equal(0)
  })

  it("subtract 94", () => {
    const result = calculator.performOperation(AllowedOperations.SUBTRACT, 94)
    expect(result).to.equal(-94)
  })

  it("subtract -94", () => {
    const result = calculator.performOperation(AllowedOperations.SUBTRACT, -94)
    expect(result).to.equal(0)
  })

  it("subtract 0", () => {
    const result = calculator.performOperation(AllowedOperations.SUBTRACT, 0)
    expect(result).to.equal(0)
  })

  it("add 0", () => {
    const result = calculator.performOperation(AllowedOperations.ADD, 0)
    expect(result).to.equal(0)
  })

  it("multiply 0", () => {
    const result = calculator.performOperation(AllowedOperations.MULTIPLY, 0)
    expect(result).to.equal(0)
  })

  it("multiply 92", () => {
    const result = calculator.performOperation(AllowedOperations.MULTIPLY, 92)
    expect(result).to.equal(0)
  })

  it("add -1", () => {
    const result = calculator.performOperation(AllowedOperations.ADD, -1)
    expect(result).to.equal(-1)
  })

  it("multiply -1", () => {
    const result = calculator.performOperation(AllowedOperations.MULTIPLY, -1)
    expect(result).to.equal(1)
  })

  it("multiply 3", () => {
    const result = calculator.performOperation(AllowedOperations.MULTIPLY, 3)
    expect(result).to.equal(3)
  })

  it("divide 3", () => {
    const result = calculator.performOperation(AllowedOperations.DIVISION, 3)
    expect(result).to.equal(1)
  })

  it("divide 5", () => {
    const result = calculator.performOperation(AllowedOperations.DIVISION, 5)
    expect(result).to.equal(0.2)
  })

  it("divide -0.2", () => {
    const result = calculator.performOperation(AllowedOperations.DIVISION, -0.2)
    expect(result).to.equal(-1)
  })

  it("divide -1", () => {
    const result = calculator.performOperation(AllowedOperations.DIVISION, -1)
    expect(result).to.equal(1)
  })

  it("divide 0", () => {
    const result = () =>
      calculator.performOperation(AllowedOperations.DIVISION, 0)
    expect(result).to.throw("division by 0 is not allowed")
  })
})

describe("Calculator Operation Count test", () => {
  let calculator: Calculator

  before(() => {
    calculator = new Calculator(0, 0, AllowedOperations.ADD)
  })

  it("calculator initialization ( 0, 0, 'add')", () => {
    const result = calculator.getTotalOperation()
    expect(result).to.equal(1)
  })

  it("add 4", () => {
    calculator.performOperation(AllowedOperations.ADD, 4)
    const result = calculator.getTotalOperation()
    expect(result).to.equal(2)
  })

  it("add 4", () => {
    calculator.performOperation(AllowedOperations.ADD, 4)
    const result = calculator.getTotalOperation()
    expect(result).to.equal(3)
  })

  it("Subtract 4", () => {
    calculator.performOperation(AllowedOperations.SUBTRACT, 4)
    const result = calculator.getTotalOperation()
    expect(result).to.equal(4)
  })

  it("Multiply  4", () => {
    calculator.performOperation(AllowedOperations.MULTIPLY, 4)
    const result = calculator.getTotalOperation()
    expect(result).to.equal(5)
  })

  it("Divide by  4", () => {
    calculator.performOperation(AllowedOperations.DIVISION, 4)
    const result = calculator.getTotalOperation()
    expect(result).to.equal(6)
  })

  it("Undo operation", () => {
    calculator.undo()
    const result = calculator.getTotalOperation()
    expect(result).to.equal(5)
  })

  it("Divide by  4", () => {
    calculator.performOperation(AllowedOperations.DIVISION, 4)
    const result = calculator.getTotalOperation()
    expect(result).to.equal(6)
  })

  it("Reset", () => {
    calculator.reset()
    const result = calculator.getTotalOperation()
    expect(result).to.equal(0)
  })

  it("Divide by  4", () => {
    calculator.performOperation(AllowedOperations.DIVISION, 4)
    const result = calculator.getTotalOperation()
    expect(result).to.equal(1)
  })
})

describe("Calculator Operation Undo and Reset test", () => {
  let calculator: Calculator

  before(() => {
    calculator = new Calculator(0, 0, AllowedOperations.ADD)
  })

  it("calculator initialization ( 0, 0, 'add')", () => {
    const result = calculator.getCurrentValue()
    expect(result).to.equal(0)
  })

  it("add 4", () => {
    const result = calculator.performOperation(AllowedOperations.ADD, 4)
    expect(result).to.equal(4)
  })

  it("add -4.254", () => {
    const result = calculator.performOperation(AllowedOperations.ADD, -4.254)
    expect(result).to.equal(-0.254)
  })

  it("Add 0.254", () => {
    const result = calculator.performOperation(AllowedOperations.ADD, 0.254)
    expect(result).to.equal(0)
  })

  it("subtract 94", () => {
    const result = calculator.performOperation(AllowedOperations.SUBTRACT, 94)
    expect(result).to.equal(-94)
  })

  it("Undo operation", () => {
    calculator.undo()
    const result = calculator.getCurrentValue()
    expect(result).to.equal(0)
  })

  it("Undo operation", () => {
    calculator.undo()
    const result = calculator.getCurrentValue()
    expect(result).to.equal(-0.254)
  })

  it("Undo operation", () => {
    calculator.undo()
    const result = calculator.getCurrentValue()
    expect(result).to.equal(4)
  })

  it("Add 4", () => {
    const result = calculator.performOperation(AllowedOperations.ADD, 4)
    expect(result).to.equal(8)
  })

  it("Undo operation after one few undo and one add", () => {
    calculator.undo()
    const result = calculator.getCurrentValue()
    expect(result).to.equal(4)
  })

  it("Reset Operation on calculator", () => {
    calculator.reset()
    const result = calculator.getCurrentValue()
    expect(result).to.equal(0)
  })

  it("Undo operation after reset", () => {
    calculator.undo()
    const result = calculator.getCurrentValue()
    expect(result).to.equal(0)
  })

  it("Undo operation on empty calculator", () => {
    calculator.undo()
    const result = calculator.getCurrentValue()
    expect(result).to.equal(0)
  })

  it("Reset Operation on empty calculator", () => {
    calculator.reset()
    const result = calculator.getCurrentValue()
    expect(result).to.equal(0)
  })
})
