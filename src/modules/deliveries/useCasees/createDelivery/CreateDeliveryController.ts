import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { itemName } = request.body
    const { clientId } = request

    const createDeliveryUseCase = new CreateDeliveryUseCase()
    const result = await createDeliveryUseCase.execute({
      itemName,
      idClient: clientId
    })

    return response.json(result)
  }
}