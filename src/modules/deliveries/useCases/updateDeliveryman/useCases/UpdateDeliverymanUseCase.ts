import { prisma } from '../../../../../database/prismaClient'

interface IUpdateDeliveryman {
  deliveryId: string
  deliverymanId: string
}

export class UpdateDeliverymanUseCase {

  async execute({ deliveryId, deliverymanId }: IUpdateDeliveryman) {
    try {
      const result = await prisma.deliveries.update({
        where: {
          id: deliveryId
        },
        data: {
          id_deliveryman: deliverymanId
        }
      })
      
      return result
    } catch (err) {
      throw err
    }
  }
}