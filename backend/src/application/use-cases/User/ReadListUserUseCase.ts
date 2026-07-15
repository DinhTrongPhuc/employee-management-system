import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../ports/UserRepository";

export class ReadListUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
