import AllowedOperations from "../constants/operation"

export interface InitializeCalculatorRequest {
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
