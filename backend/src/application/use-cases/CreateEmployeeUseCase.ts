import { Employee, Role } from "../../domain/entities/Employee";
import { Email } from "../../domain/value-object/Email";
import { Name } from "../../domain/value-object/Name";
import { EmployeeRepository } from "../ports/EmployeeRepository";

export class CreateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(
    id: string,
    name: Name,
    email: Email,
    role: Role,
    salary: number,
    updatedAt: Date = new Date(),
  ): Promise<void> {
    const employee = new Employee(id, name, email, role, salary, updatedAt);

    await this.employeeRepository.save(employee);
  }
}
