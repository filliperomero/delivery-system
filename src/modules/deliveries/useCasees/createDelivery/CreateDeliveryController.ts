import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { itemName, idClient } = request.body

    const createDeliveryUseCase = new CreateDeliveryUseCase()
    const result = await createDeliveryUseCase.execute({
      itemName,
      idClient
    })

    return response.json(result)
  }
}