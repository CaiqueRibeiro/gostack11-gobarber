import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123757',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a duplicated user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123757',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123757',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
