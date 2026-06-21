import { User } from "../../domain/entities/User";

export interface UserRepository {
  save(user: User): Promise<void>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  deleteUserById(id: string): Promise<void>;
  updateUserById(id: string, user: User): Promise<void>;
}
