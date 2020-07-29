import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvaliabilityService from '@modules/appointments/services/ListProviderDayAvaliabilityService';

export default class ProviderDayAvaiabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { month, year, day } = request.body;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvaliabilityService,
    );

    const aviability = await listProviderDayAvailability.execute({
      provider_id,
      month,
      year,
      day,
    });

    return response.json(aviability);
  }
}
