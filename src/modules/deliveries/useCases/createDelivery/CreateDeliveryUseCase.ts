import { prisma } from '../../../../database/prismaClient'

interface ICreateDelivery {
  itemName: string
  idClient: string
}

export class CreateDeliveryUseCase {

  async execute({ itemName, idClient }: ICreateDelivery) {
    try {
      const delivery = await prisma.deliveries.create({
        data: {
          item_name: itemName,
          id_client: idClient
        }
      })

      return delivery
    } catch (err) {
      throw err
    }
  }
}