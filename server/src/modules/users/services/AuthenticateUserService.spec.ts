import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticationUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able authenticate', async () => {
    await createUser.execute({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    const response = await authenticateUser.execute({
      email: 't@s.com.br',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('token');
  });

  it('should not be able authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 't@s.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authentiucate with wrong password', async () => {
    await createUser.execute({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: 't@s.com.br',
        password: '22222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
