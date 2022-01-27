
import { query } from "express-validator"

export const validate = {
  params: {
    logs: [
      query('limit').isInt()
    ]
  }
}