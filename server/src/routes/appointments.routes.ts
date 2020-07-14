import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointsRepository = new AppointmentsRepository();

const appointmentsRoute = Router();

appointmentsRoute.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointsRepository);

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    response.json(appointment);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

appointmentsRoute.get('/', (request, reponse) => {
  const appointments = appointsRepository.all();

  return reponse.json(appointments);
});

export default appointmentsRoute;
