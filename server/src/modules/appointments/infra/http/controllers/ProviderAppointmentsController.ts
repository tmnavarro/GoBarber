import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointsService from '@modules/appointments/services/ListProviderAppointsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppoints = container.resolve(ListProviderAppointsService);

    const appointments = await listProviderAppoints.execute({
      provider_id: user_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}
