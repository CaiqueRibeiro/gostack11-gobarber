import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Zezinho da meia noite',
      email: 'midnightze@example.com',
      password: 'vsk00134l10',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('Zezinho da meia noite');
    expect(profile.email).toBe('midnightze@example.com');
  }); // teste 1
});
