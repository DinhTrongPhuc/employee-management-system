import { User, UserRole } from "../../../domain/entities/User";
import { Email } from "../../../domain/value-object/Email";
import { Name } from "../../../domain/value-object/Name";
import { Password } from "../../../domain/value-object/Password";
import { UserRepository } from "../../ports/UserRepository";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async excute(
    id: string,
    username: Name,
    password: Password,
    email: Email,
    role: UserRole,
    updateAt: Date,
  ): Promise<void> {
    const user = new User(id, username, password, email, role, updateAt);

    await this.userRepository.save(user);
  }
}
