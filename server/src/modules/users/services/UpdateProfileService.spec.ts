import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be to updade the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    const userUpdated = await updateProfileService.execute({
      user_id: user.id,
      name: 'Túlio Navarro',
      email: 't@s2.com.br',
    });

    expect(userUpdated.name).toEqual('Túlio Navarro');
    expect(userUpdated.email).toEqual('t@s2.com.br');
  });

  it('should not be to change to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    const userUpdateding = await fakeUsersRepository.create({
      name: 'Túlio',
      email: 't@s2.com.br',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: userUpdateding.id,
        name: 'Túlio Navarro',
        email: 't@s.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be to updade the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    const userUpdated = await updateProfileService.execute({
      user_id: user.id,
      name: 'Túlio Navarro',
      email: 't@s2.com.br',
      password: '321312',
      old_password: '123123',
    });

    expect(userUpdated.password).toEqual('321312');
  });

  it('should not be to updade the password without old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Túlio Navarro',
        email: 't@s2.com.br',
        password: '321312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be to updade the password wrong old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Túlio Navarro',
        email: 't@s.com.br',
        password: '321312',
        old_password: '1111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be to update the profile non user existing', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'Túlio Navarro',
        email: 't@s.com.br',
        password: '321312',
        old_password: '1111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
