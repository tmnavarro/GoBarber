import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointsRepository: AppointmentsRepository;

  constructor(appointsRepository: AppointmentsRepository) {
    this.appointsRepository = appointsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new Error('This appointments is already booked');
    }

    const appointment = this.appointsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
