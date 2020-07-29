import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvaliabilityService from './ListProviderDayAvaliabilityService';

let listProviderDayAvaliabilityService: ListProviderDayAvaliabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvaliabilityService = new ListProviderDayAvaliabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: '1',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: '1',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvaliabilityService.execute({
      provider_id: '1',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
