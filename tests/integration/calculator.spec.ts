import request from "supertest"
import { expect } from "chai"
import wtf from "wtfnode"

import app from "../../index"
import AllowedOperations from "../../constants/operation"
import {
  InitializeCalculatorRequest,
  OperationRequest,
} from "../../types/requests"
import HttpStatus from "../../constants/status_code"

describe("initialize calculator", () => {
  it("initialize calculator with Multiplication", async () => {
    const resp = await request(app)
      .post("/api/v1/init")
      .send({
        operand_first: 4,
        operand_second: 5,
        operator: AllowedOperations.MULTIPLY,
      } as InitializeCalculatorRequest)

    expect(resp.status).to.equal(HttpStatus.CREATED)
    expect(resp.body.result).to.equal(20)
    expect(resp.body.total_ops).to.equal(1)
    expect(resp.body)
      .to.have.property("calculator_instance_id")
      .that.is.a("string")
  })

  it("initialize calculator with Addition", async () => {
    const resp = await request(app)
      .post("/api/v1/init")
      .send({
        operand_first: 4,
        operand_second: 5,
        operator: AllowedOperations.ADD,
      } as InitializeCalculatorRequest)

    expect(resp.status).to.equal(HttpStatus.CREATED)
    expect(resp.body.result).to.equal(9)
    expect(resp.body.total_ops).to.equal(1)
    expect(resp.body)
      .to.have.property("calculator_instance_id")
      .that.is.a("string")
  })

  it("initialize calculator with Subtraction", async () => {
    const resp = await request(app)
      .post("/api/v1/init")
      .send({
        operand_first: 4,
        operand_second: 5,
        operator: AllowedOperations.SUBTRACT,
      } as InitializeCalculatorRequest)

    expect(resp.status).to.equal(HttpStatus.CREATED)
    expect(resp.body.result).to.equal(-1)
    expect(resp.body.total_ops).to.equal(1)
    expect(resp.body)
      .to.have.property("calculator_instance_id")
      .that.is.a("string")
  })

  it("initialize calculator with Divison", async () => {
    const resp = await request(app)
      .post("/api/v1/init")
      .send({
        operand_first: 4,
        operand_second: 5,
        operator: AllowedOperations.DIVISION,
      } as InitializeCalculatorRequest)

    expect(resp.status).to.equal(HttpStatus.CREATED)
    expect(resp.body.result).to.equal(0.8)
    expect(resp.body.total_ops).to.equal(1)
    expect(resp.body)
      .to.have.property("calculator_instance_id")
      .that.is.a("string")
  })

  it("initialize calculator with Invalid operation", async () => {
    const resp = await request(app).post("/api/v1/init").send({
      operand_first: 4,
      operand_second: 5,
      operator: "adfasd",
    })

    expect(resp.status).to.equal(HttpStatus.BAD_REQUEST)
  })

  it("initialize calculator with empty body operation", async () => {
    const resp = await request(app).post("/api/v1/init").send()

    expect(resp.status).to.equal(HttpStatus.BAD_REQUEST)
  })

  it("initialize calculator with wrong operand", async () => {
    const resp = await request(app).post("/api/v1/init").send({
      operand_first: "adfadsf",
      operand_second: "asdfasd",
      operator: "adfasd",
    })

    expect(resp.status).to.equal(HttpStatus.BAD_REQUEST)
  })
})

describe("perform operations", () => {
  let calculator_instance: string

  it("initialize calculator with Multiplication", async () => {
    const resp = await request(app)
      .post("/api/v1/init")
      .send({
        operand_first: 4,
        operand_second: 5,
        operator: AllowedOperations.MULTIPLY,
      } as InitializeCalculatorRequest)

    expect(resp.status).to.equal(HttpStatus.CREATED)
    expect(resp.body.result).to.equal(20)
    expect(resp.body.total_ops).to.equal(1)
    expect(resp.body)
      .to.have.property("calculator_instance_id")
      .that.is.a("string")

    calculator_instance = resp.body.calculator_instance_id
  })

  it("Add 10 to calculator instacne", async () => {
    const resp = await request(app)
      .post("/api/v1/operation")
      .send({
        operand: 10,
        operator: AllowedOperations.ADD,
        calculator_instance_id: calculator_instance,
      } as OperationRequest)

    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(30)
    expect(resp.body.total_ops).to.equal(2)
  })

  it("Add -10.05 to calculator instacne", async () => {
    const resp = await request(app)
      .post("/api/v1/operation")
      .send({
        operand: -10.05,
        operator: AllowedOperations.ADD,
        calculator_instance_id: calculator_instance,
      } as OperationRequest)

    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(19.95)
    expect(resp.body.total_ops).to.equal(3)
  })

  it("Subtract -0.05 to calculator instacne", async () => {
    const resp = await request(app)
      .post("/api/v1/operation")
      .send({
        operand: -0.05,
        operator: AllowedOperations.SUBTRACT,
        calculator_instance_id: calculator_instance,
      } as OperationRequest)

    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(20)
    expect(resp.body.total_ops).to.equal(4)
  })

  it("Divide -0.5 to calculator instacne", async () => {
    const resp = await request(app)
      .post("/api/v1/operation")
      .send({
        operand: -0.5,
        operator: AllowedOperations.DIVISION,
        calculator_instance_id: calculator_instance,
      } as OperationRequest)

    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(-40)
    expect(resp.body.total_ops).to.equal(5)
  })

  it("Multiply by -1 to calculator instacne", async () => {
    const resp = await request(app)
      .post("/api/v1/operation")
      .send({
        operand: -1,
        operator: AllowedOperations.DIVISION,
        calculator_instance_id: calculator_instance,
      } as OperationRequest)

    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(40)
    expect(resp.body.total_ops).to.equal(6)
  })
})

describe("Reset and Undo", () => {
  let calculator_instance: string

  it("initialize calculator with Multiplication", async () => {
    const resp = await request(app)
      .post("/api/v1/init")
      .send({
        operand_first: 4,
        operand_second: 5,
        operator: AllowedOperations.MULTIPLY,
      } as InitializeCalculatorRequest)

    expect(resp.status).to.equal(HttpStatus.CREATED)
    expect(resp.body.result).to.equal(20)
    expect(resp.body.total_ops).to.equal(1)
    expect(resp.body)
      .to.have.property("calculator_instance_id")
      .that.is.a("string")

    calculator_instance = resp.body.calculator_instance_id
  })

  it("Reset after init", async () => {
    const resp = await request(app).get(`/api/v1/reset/${calculator_instance}`)
    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.success).to.equal(true)
    expect(resp.body.message).to.equal(
      `calculator ${calculator_instance} has been reset`
    )
  })

  it("Reset on empty stack", async () => {
    const resp = await request(app).get(`/api/v1/reset/${calculator_instance}`)
    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.success).to.equal(true)
    expect(resp.body.message).to.equal(
      `calculator ${calculator_instance} has been reset`
    )
  })

  it("undo on emptly stack", async () => {
    const resp = await request(app).put(`/api/v1/undo/${calculator_instance}`)
    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(0)
    expect(resp.body.total_ops).to.equal(0)
  })

  it("Add 4 to calculator instacne", async () => {
    const resp = await request(app)
      .post("/api/v1/operation")
      .send({
        operand: 4,
        operator: AllowedOperations.ADD,
        calculator_instance_id: calculator_instance,
      } as OperationRequest)

    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(4)
    expect(resp.body.total_ops).to.equal(1)
  })

  it("Subtract 3 to calculator instacne", async () => {
    const resp = await request(app)
      .post("/api/v1/operation")
      .send({
        operand: 3,
        operator: AllowedOperations.SUBTRACT,
        calculator_instance_id: calculator_instance,
      } as OperationRequest)

    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(1)
    expect(resp.body.total_ops).to.equal(2)
  })

  it("undo after two operations", async () => {
    const resp = await request(app).put(`/api/v1/undo/${calculator_instance}`)

    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(4)
    expect(resp.body.total_ops).to.equal(1)
  })

  it("Reset with one operation in stack", async () => {
    const resp = await request(app).get(`/api/v1/reset/${calculator_instance}`)
    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.success).to.equal(true)
    expect(resp.body.message).to.equal(
      `calculator ${calculator_instance} has been reset`
    )
  })
})

describe("Mutliple calculator instance", () => {
  let calculator_instance_1: string
  let calculator_instance_2: string
  let calculator_instance_3: string
  let calculator_instance_4: string

  it("initialize calculator with Multiplication", async () => {
    const resp = await request(app)
      .post("/api/v1/init")
      .send({
        operand_first: 4,
        operand_second: 5,
        operator: AllowedOperations.MULTIPLY,
      } as InitializeCalculatorRequest)

    expect(resp.status).to.equal(HttpStatus.CREATED)
    expect(resp.body.result).to.equal(20)
    expect(resp.body.total_ops).to.equal(1)
    expect(resp.body)
      .to.have.property("calculator_instance_id")
      .that.is.a("string")

    calculator_instance_1 = resp.body.calculator_instance_id
  })

  it("initialize calculator with Addition", async () => {
    const resp = await request(app)
      .post("/api/v1/init")
      .send({
        operand_first: 4,
        operand_second: 5,
        operator: AllowedOperations.ADD,
      } as InitializeCalculatorRequest)

    expect(resp.status).to.equal(HttpStatus.CREATED)
    expect(resp.body.result).to.equal(9)
    expect(resp.body.total_ops).to.equal(1)
    expect(resp.body)
      .to.have.property("calculator_instance_id")
      .that.is.a("string")

    calculator_instance_2 = resp.body.calculator_instance_id
  })

  it("initialize calculator with Subtraction", async () => {
    const resp = await request(app)
      .post("/api/v1/init")
      .send({
        operand_first: 4,
        operand_second: 5,
        operator: AllowedOperations.SUBTRACT,
      } as InitializeCalculatorRequest)

    expect(resp.status).to.equal(HttpStatus.CREATED)
    expect(resp.body.result).to.equal(-1)
    expect(resp.body.total_ops).to.equal(1)
    expect(resp.body)
      .to.have.property("calculator_instance_id")
      .that.is.a("string")

    calculator_instance_3 = resp.body.calculator_instance_id
  })

  it("initialize calculator with Divison", async () => {
    const resp = await request(app)
      .post("/api/v1/init")
      .send({
        operand_first: 4,
        operand_second: 5,
        operator: AllowedOperations.DIVISION,
      } as InitializeCalculatorRequest)

    expect(resp.status).to.equal(HttpStatus.CREATED)
    expect(resp.body.result).to.equal(0.8)
    expect(resp.body.total_ops).to.equal(1)
    expect(resp.body)
      .to.have.property("calculator_instance_id")
      .that.is.a("string")

    calculator_instance_4 = resp.body.calculator_instance_id
  })

  it("reset first instance", async () => {
    const resp = await request(app).get(
      `/api/v1/reset/${calculator_instance_1}`
    )
    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.success).to.equal(true)
    expect(resp.body.message).to.equal(
      `calculator ${calculator_instance_1} has been reset`
    )
  })

  it("add number to second instance", async () => {
    const resp = await request(app)
      .post("/api/v1/operation")
      .send({
        operand: 10,
        operator: AllowedOperations.ADD,
        calculator_instance_id: calculator_instance_2,
      } as OperationRequest)

    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(19)
    expect(resp.body.total_ops).to.equal(2)
  })

  it("undo third instance", async () => {
    const resp = await request(app).put(`/api/v1/undo/${calculator_instance_3}`)
    expect(resp.status).to.equal(HttpStatus.SUCCESS)
    expect(resp.body.result).to.equal(0)
    expect(resp.body.total_ops).to.equal(0)
  })
})
