import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() =>  {

    fakeUsersRepository = new FakeUsersRepository();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  })
  
  it('should be able to update avatar', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Zezinho da meia noite',
      email: 'midnightze@example.com',
      password: 'vsk00134l10',
    });

    await updateProfile.execute({
      user_id: user.id,
      avatarFileName: 'avatartop.jpg',
    });

    expect(user.avatar).toBe('avatartop.jpg');
  }); // teste 1
});
