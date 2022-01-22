import { Request, Response, NextFunction } from 'express' 

export const errorHandler = (
    err: any, 
    res: Response, 
  ) => {
    if (err.errors) {
      let errCode = 400 
      const keys = Object.keys(err.errors)
      let errMessage = err.errors[keys[0]].message
    } else {
      errCode = err.status || 500
      errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('txt')
      .send(errMessage)
  }

export const notFoundHandler = ( 
    next: NextFunction
    ) => {
    return next({ status: 404, message: 'not found' })
  }