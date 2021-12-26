import { Router } from 'express'
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController'
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController'
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController'
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient'
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman'

const routes = Router()
const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliverymanController = new CreateDeliverymanController()
const findAllAvailableController = new FindAllAvailableController()
const createDeliveryController = new CreateDeliveryController()

routes.post('/client', createClientController.handle)
routes.post('/client/authenticate', authenticateClientController.handle)

routes.post('/deliveryman/', createDeliverymanController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)

routes.post('/delivery', ensureAuthenticateClient, createDeliveryController.handle)
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle)

export { routes }