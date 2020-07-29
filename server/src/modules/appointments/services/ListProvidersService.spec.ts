import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Túlio',
      email: 't@s.com.br',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'João',
      email: 'j@s.com.br',
      password: '123123',
    });

    const logggedUser = await fakeUsersRepository.create({
      name: 'Maria',
      email: 'm@s.com.br',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: logggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
