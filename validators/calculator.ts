import AllowedOperations from "../constants/operation"
import {
  OperationRequest,
  UndoOrResetOperationRequest,
  InitializeCalculatorRequest,
} from "../types/requests"

export function validateCalculatorInitializeRequest(
  payload: InitializeCalculatorRequest
): string | null {
  let errorString: string = ""
  if (payload.operand_first === null || payload.operand_first === undefined) {
    errorString = errorString.concat(
      "operand_first: required. no input recieved \n "
    )
  } else if (!(typeof payload.operand_first === "number")) {
    errorString = errorString.concat(
      "operand_first: should be number. Invalid type recieved \n "
    )
  }
  if (payload.operand_second === null || payload.operand_second === undefined) {
    errorString = errorString.concat(
      "operand_second: required. no input recieved \n "
    )
  } else if (!(typeof payload.operand_second === "number")) {
    errorString = errorString.concat(
      "operand_second: should be number. Invalid type recieved \n "
    )
  }
  if (!payload.operator) {
    errorString = errorString.concat("operator: required. no input recieved")
  } else if (!Object.values(AllowedOperations).includes(payload.operator)) {
    errorString = errorString.concat(
      "operator: invalid operation type. Allowed operation : ['add', 'sub', 'mul', 'div']\n "
    )
  }
  if (errorString.length > 1) return errorString
  return null
}

export function validateOperationRequest(
  payload: OperationRequest
): string | null {
  let errorString = ""

  if (payload.operand === null || payload.operand === undefined) {
    errorString = errorString.concat("operand: required. not recieved \n ")
  } else if (!(typeof payload.operand === "number")) {
    errorString.concat("operand: invalid type. operand should be number \n ")
  }

  if (!payload.operator) {
    errorString = errorString.concat("operator: required. not recieved \n ")
  } else if (!Object.values(AllowedOperations).includes(payload.operator)) {
    errorString = errorString.concat(
      "operator: invalid operation type. Allowed operation : ['add', 'sub', 'mul', 'div']\n "
    )
  }

  if (!payload.calculator_instance_id) {
    errorString = errorString.concat(
      "calculator_instance_id: required, not recieved \n "
    )
  } else if (!(typeof payload.calculator_instance_id === "string")) {
    errorString.concat(
      "calculator_instance_id: invalid type. string type allowed"
    )
  }
  if (errorString.length > 1) return errorString
  return null
}
