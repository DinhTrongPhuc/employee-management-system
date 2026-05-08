import { Email } from "../value-object/Email";

export enum _role {
  HR = "HR",
  Manager = "Manager",
  Staff = "Staff",
}

export class Employee {
  constructor(
    private readonly _id: string,
    private _name: string,
    private _email: Email,
    private _role: _role,
    private _salary: number,
    private _updatedAt: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get role(): _role {
    return this._role;
  }

  get salary(): number {
    return this._salary;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set name(newName: string) {
    if (!newName || newName.trim() === "") {
      throw new Error("Name cannot be empty");
    }
    this._name = newName;
    this._updatedAt = new Date();
  }

  set email(newEmail: Email) {
    this._email = newEmail;
    this._updatedAt = new Date();
  }

  set role(newRole: _role) {
    this._role = newRole;
    this._updatedAt = new Date();
  }

  set salary(newSalary: number) {
    if (newSalary <= 0) {
      throw new Error("Salary must be a positive number");
    }
    this._salary = newSalary;
    this._updatedAt = new Date();
  }
}
