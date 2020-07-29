import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointsService from '@modules/appointments/services/ListProviderAppointsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppoints = container.resolve(ListProviderAppointsService);

    const appointments = await listProviderAppoints.execute({
      provider_id: user_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}
