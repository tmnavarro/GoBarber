import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a user', async () => {
    const user = await createUser.execute({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('t@s.com.br');
  });

  it('should not be able to create a new user with same email form another', async () => {
    await createUser.execute({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'Túlio',
        email: 't@s.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
