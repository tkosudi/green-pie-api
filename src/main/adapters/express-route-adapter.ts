/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, RequestHandler, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 || httpResponse.statusCode >= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
