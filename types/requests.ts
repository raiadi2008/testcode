import AllowedOperations from "../constants/operation"

export interface initializeCalculatorRequest {
  operand_first: number
  operand_second: number
  operator: AllowedOperations
}

export interface OperationRequest {
  operator: AllowedOperations
  operand: number
  calculator_instance_id: string
}

export interface UndoOrResetOperationRequest {
  calculator_instance_id: string
}
