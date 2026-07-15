import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../ports/UserRepository";

export class SearchUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return (await this.userRepository.findById(id)) || null;
  }
}
