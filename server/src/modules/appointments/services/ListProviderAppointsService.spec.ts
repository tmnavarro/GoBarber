import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointsService from './ListProviderAppointsService';

let listProviderAppoints: ListProviderAppointsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppoints', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppoints = new ListProviderAppointsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const availability = await listProviderAppoints.execute({
      provider_id: 'provider-id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual([appointment1, appointment2]);
  });
});
