import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    response.json(appointment);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

appointmentsRouter.get('/', async (request, reponse) => {
  const appointsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointsRepository.find();

  return reponse.json(appointments);
});

export default appointmentsRouter;
