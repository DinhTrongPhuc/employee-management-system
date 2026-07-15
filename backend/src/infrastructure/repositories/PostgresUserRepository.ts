import { Pool } from "pg";
import { UserRepository } from "../../application/ports/UserRepository";
import { User, UserRole } from "../../domain/entities/User";
import { Name } from "../../domain/value-object/Name";
import { Password } from "../../domain/value-object/Password";
import { Email } from "../../domain/value-object/Email";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly pool: Pool) {}

  async save(user: User): Promise<void> {
    const query = `
    INSERT INTO users(id, username, password, email, userRole , updateAt)
    VALUES ($1, $2,$3, $4, $5, $6)
    `;

    const value = [
      user.Id,
      user.Username.value,
      user.Password.value,
      user.Email.value,
      user.UserRole,
      new Date(),
    ];

    await this.pool.query(query, value);
  }

  async findById(id: string): Promise<User | null> {
    const query = `
    SELECT * FROM users WHERE id = $1
    `;

    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return new User(
      row.id,
      new Name(row.username),
      new Password(row.password),
      new Email(row.email),
      row.userRole as UserRole,
      new Date(row.updateAt),
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE username = $1`;

    const result = await this.pool.query(query, [username]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return new User(
      row.Id,
      new Name(row.username),
      new Password(row.password),
      new Email(row.email),
      row.userRole as UserRole,
      new Date(row.updateAt),
    );
  }

  async findAll(): Promise<User[]> {
    const query = `
    select * from users
    `;

    const result = await this.pool.query(query);

    return result.rows.map((row) => {
      return new User(
        row.id,
        new Name(row.username),
        new Password(row.password),
        new Email(row.email),
        row.userRole as UserRole,
        new Date(row.updateAt),
      );
    });
  }

  async deleteUserById(id: string): Promise<void> {
    const query = `DELETE * FROM users WHERE id = $1`;

    await this.pool.query(query, [id]);
  }

  async updateUserById(id: string, user: User): Promise<User> {
    const query = `UPDATE users
    SET username = $1, password = $2, email = $3, userRole = $4, updateAt = $5
    WHERE id = $6
    `;

    const value = [
      user.Username.value,
      user.Password.value,
      user.Email.value,
      user.UserRole,
      user.UpdateAt,
      id,
    ];

    await this.pool.query(query, value);

    return user;
  }
}
