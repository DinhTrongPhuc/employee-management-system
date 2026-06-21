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
    private _updateAt: Date,
  ) {}

  get Id(): string {
    return this._id;
  }

  get Username(): Name {
    return this._username;
  }

  get Password(): Password {
    return this._password;
  }

  get Email(): Email {
    return this._email;
  }

  get UserRole(): UserRole {
    return this._role;
  }

  get UpdateAt(): Date {
    return this._updateAt;
  }

  changeUsername(newUsername: Name) {
    this._username = newUsername;
    this._updateAt = new Date();
  }

  ChangePassword(newPassword: Password) {
    this._password = newPassword;
    this._updateAt = new Date();
  }

  changeEmail(newEmail: Email) {
    this._email = newEmail;
    this._updateAt = new Date();
  }

  changeRole(newRole: UserRole) {
    this._role = newRole;
    this._updateAt = new Date();
  }
}
