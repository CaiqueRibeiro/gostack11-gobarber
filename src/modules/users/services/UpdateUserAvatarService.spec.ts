import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Zezinho da meia noite',
      email: 'midnightze@example.com',
      password: 'vsk00134l10',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatartop.jpg',
    });

    expect(user.avatar).toBe('avatartop.jpg');
  }); // teste 1

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatartop.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  }); // teste 2

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Zezinho da meia noite',
      email: 'midnightze@example.com',
      password: 'vsk00134l10',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatartop.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatartop2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatartop.jpg');
    expect(user.avatar).toBe('avatartop2.jpg');
  }); // teste 3
});
