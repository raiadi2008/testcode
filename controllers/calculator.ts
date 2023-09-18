import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"

import {
  OperationRequest,
  initializeCalculatorRequest,
} from "../types/requests"
import HttpStatus from "../constants/status_code"
import {
  CalculatorResetResponseInterface,
  CalculatorResponseInterface,
  ErrorResponseInterface,
} from "../types/responses"
import {
  validateCalculatorInitializeRequest,
  validateOperationRequest,
} from "../validators/calculator"
import Calculator from "../models/calculator"
import CalculatorInstances from "../globals/calculator_instances"

export function initializeCalculator(req: Request, res: Response) {
  const payload: initializeCalculatorRequest = req.body
  console.log(payload)
  const payloadError = validateCalculatorInitializeRequest(payload)
  if (payloadError) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ error: payloadError } as ErrorResponseInterface)
  }

  const calculator = new Calculator(
    payload.operand_first,
    payload.operand_second,
    payload.operator
  )
  const calculatorInstanceId = uuidv4()

  CalculatorInstances.set(calculatorInstanceId, calculator)
  return res.status(HttpStatus.CREATED).json({
    total_ops: calculator.getTotalOperation(),
    result: calculator.getCurrentValue(),
    calculator_instance_id: calculatorInstanceId,
  } as CalculatorResponseInterface)
}

export function resetCalculator(req: Request, res: Response) {
  const calculator_instance_id = req.params.calculator_instance_id
  const calculator: Calculator | undefined = CalculatorInstances.get(
    calculator_instance_id
  )
  if (!calculator) {
    return res.status(HttpStatus.NOT_FOUND).json({
      error: `calculator instance for id ${calculator_instance_id} does not exist`,
    } as ErrorResponseInterface)
  }
  calculator.reset()
  return res.status(HttpStatus.SUCCESS).json({
    success: true,
    message: `calculator ${calculator_instance_id} has been reset`,
  } as CalculatorResetResponseInterface)
}

export function performOperation(req: Request, res: Response) {
  const payload: OperationRequest = req.body
  const payloadError = validateOperationRequest(payload)
  if (payloadError) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ error: payloadError } as ErrorResponseInterface)
  }

  const calculator: Calculator | undefined = CalculatorInstances.get(
    payload.calculator_instance_id
  )
  if (!calculator) {
    return res.status(HttpStatus.NOT_FOUND).json({
      error: `calculator instance for id ${payload.calculator_instance_id} does not exist`,
    } as ErrorResponseInterface)
  }
  calculator.performOperation(payload.operator, payload.operand)
  return res.status(HttpStatus.SUCCESS).json({
    result: calculator.getCurrentValue(),
    total_ops: calculator.getTotalOperation(),
  } as CalculatorResponseInterface)
}

export function undoOperation(req: Request, res: Response) {
  const calculator_instance_id = req.params.calculator_instance_id
  const calculator: Calculator | undefined = CalculatorInstances.get(
    calculator_instance_id
  )
  if (!calculator) {
    return res.status(HttpStatus.NOT_FOUND).json({
      error: `calculator instance for id ${calculator_instance_id} does not exist`,
    } as ErrorResponseInterface)
  }
  calculator.undo()
  return res.status(HttpStatus.SUCCESS).json({
    result: calculator.getCurrentValue(),
    total_ops: calculator.getTotalOperation(),
  } as CalculatorResponseInterface)
}
