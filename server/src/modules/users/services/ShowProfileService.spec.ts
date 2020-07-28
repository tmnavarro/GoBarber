import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toEqual('Túlio');
    expect(profile.email).toEqual('t@s.com.br');
  });

  it('should not be to show the profile non user existing', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
