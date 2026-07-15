import { User, UserRole } from "../../../domain/entities/User";
import { Email } from "../../../domain/value-object/Email";
import { Name } from "../../../domain/value-object/Name";
import { Password } from "../../../domain/value-object/Password";
import { UserRepository } from "../../ports/UserRepository";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    id: string,
    updateUserData: {
      username?: Name;
      password?: Password;
      email?: Email;
      role?: UserRole;
    },
  ): Promise<User> {
    const exitingUser = await this.userRepository.findById(id);

    if (!exitingUser) {
      throw new Error("User not found");
    }

    const updatedUser = new User(
      id,
      updateUserData.username
        ? new Name(updateUserData.username.value)
        : exitingUser.Username,
      updateUserData.password
        ? new Password(updateUserData.password.value)
        : exitingUser.Password,
      updateUserData.email
        ? new Email(updateUserData.email.value)
        : exitingUser.Email,
      updateUserData.role
        ? (updateUserData.role as UserRole)
        : exitingUser.UserRole,
      new Date(),
    );

    await this.userRepository.updateUserById(id, updatedUser);

    return updatedUser;
  }
}
