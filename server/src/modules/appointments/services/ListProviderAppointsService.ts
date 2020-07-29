import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointments from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}
  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointments[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;
