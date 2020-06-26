import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password: string;
    password?: string;
}

@injectable()
class UpdateProfileServve {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository') repository: IUsersRepository,
    @inject('HashProvider') hashProvider: IHashProvider,
  ) {
    this.usersRepository = repository;
    this.hashProvider = hashProvider;
  }

  public async execute({ user_id, name, email }: IRequest): Promise<void> {
  }
}
export default UpdateProfileService;
