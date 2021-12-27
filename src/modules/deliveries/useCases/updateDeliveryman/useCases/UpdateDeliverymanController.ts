import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

export class UpdateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { deliverymanId } = request
    const { id: deliveryId } = request.params

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase()
    const result = await updateDeliverymanUseCase.execute({ deliveryId, deliverymanId })

    return response.json(result)
  }
}