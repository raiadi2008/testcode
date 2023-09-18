import { Router } from "express"

import {
  initializeCalculator,
  performOperation,
  resetCalculator,
  undoOperation,
} from "../controllers/calculator"

const calcRouter = Router()

calcRouter.route("/init").post(initializeCalculator)
calcRouter.route("/operation").post(performOperation)
calcRouter.route("/reset/:calculator_instance_id").get(resetCalculator)
calcRouter.route("/undo/:calculator_instance_id").put(undoOperation)

export default calcRouter

// 3aea9ed4-17e0-497a-91b0-c157360de3fb
// 24c9f114-2665-481e-b3be-87a094f51631
// 86dd90a3-2cf9-4644-a66e-524d3f61cacb
