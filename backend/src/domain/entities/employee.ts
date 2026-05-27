import { Email } from "../value-object/Email";
import { Name } from "../value-object/Name";

export enum Role {
  HR = "HR",
  Manager = "Manager",
  Staff = "Staff",
}

export class Employee {
  constructor(
    private readonly _id: string,
    private _name: Name,
    private _email: Email,
    private _role: Role,
    private _salary: number,
    private _updatedAt: Date = new Date(),
  ) {
    if (_salary <= 0) {
      throw new Error("Salary must be a positive number");
    }
  }

  get Id(): string {
    return this._id;
  }

  get Name(): Name {
    return this._name;
  }

  get Email(): Email {
    return this._email;
  }

  get Role(): Role {
    return this._role;
  }

  get Salary(): number {
    return this._salary;
  }

  get UpdatedAt(): Date {
    return this._updatedAt;
  }

  changeName(newName: Name) {
    this._name = newName;
    this._updatedAt = new Date();
  }

  changeEmail(newEmail: Email) {
    this._email = newEmail;
    this._updatedAt = new Date();
  }

  changeRole(newRole: Role) {
    this._role = newRole;
    this._updatedAt = new Date();
  }

  updateSalary(newSalary: number) {
    this._salary = newSalary;
    this._updatedAt = new Date();
  }
}
