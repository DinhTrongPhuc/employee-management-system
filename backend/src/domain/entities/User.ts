import { Email } from "../value-object/Email";
import { Name } from "../value-object/Name";
import { Password } from "../value-object/Password";

export enum UserRole {
  ADMIN = "admin",
  STAFF = "staff",
  SALE = "sale",
  HR = "hr",
}

export class User {
  constructor(
    private readonly _id: string,
    private _username: Name,
    private _password: Password,
    private _email: Email,
    private _role: UserRole,
  ) {}

  get Id(): string {
    return this._id;
  }

  get Username(): Name {
    return this._username;
  }
  get Email(): Email {
    return this._email;
  }

  get Role(): UserRole {
    return this._role;
  }

  changeUsername(newUsername: Name) {
    this._username = newUsername;
  }

  ChangePassword(newPassword: Password) {
    this._password = newPassword;
  }

  changeEmail(newEmail: Email) {
    this._email = newEmail;
  }

  changeRole(newRole: UserRole) {
    this._role = newRole;
  }
}
