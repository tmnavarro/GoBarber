import Appoitment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '../dtos/ICreateAppointmentsDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appoitment>;
  findByDate(date: Date): Promise<Appoitment | undefined>;
}
