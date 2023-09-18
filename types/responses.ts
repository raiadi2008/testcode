export interface ErrorResponseInterface {
  error?: string
}

export interface CalculatorResponseInterface {
  calculator_instance_id?: string
  result: number
  total_ops: number
}

export interface CalculatorResetResponseInterface {
  success: boolean
  message: string
}
