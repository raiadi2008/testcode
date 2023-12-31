import express, { Express, Request, Response } from "express"

import RouteNotFound from "./middlewares/route_not_found"
import calcRouter from "./routes/calculator"
import CalculatorInstances from "./globals/calculator_instances"
import ExceptionHandler from "./middlewares/exception_handler"

const app: Express = express()
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000

app.use(express.json())
app.use("/api/v1", calcRouter)
app.use(RouteNotFound)
app.use(ExceptionHandler)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

export default app
