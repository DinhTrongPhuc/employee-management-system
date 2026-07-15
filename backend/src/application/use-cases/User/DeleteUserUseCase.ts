import { UserRepository } from "../../ports/UserRepository";

export class DeleteUserUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.deleteUserById(id);
  }
}
