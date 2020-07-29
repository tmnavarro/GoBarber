import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvaiabilityController from '../controllers/ProviderMonthAvaiabilityController';
import ProviderDayAvaiabilityController from '../controllers/ProviderDayAvaiabilityController';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);
const providersController = new ProvidersController();
const providerMonthAvaiabilityController = new ProviderMonthAvaiabilityController();
const providerDayAvaiabilityController = new ProviderDayAvaiabilityController();

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvaiabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvaiabilityController.index,
);

export default providersRouter;
