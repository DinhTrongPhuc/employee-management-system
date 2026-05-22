import { Employee, Role } from "../../domain/entities/Employee";
import { Email } from "../../domain/value-object/Email";
import { InMemoryEmployeeRepository } from "../../infrastructure/repositories/InMemoryEmployeeRepository";

export class CreateEmployeeUseCase {
  constructor(private employeeRepository: InMemoryEmployeeRepository) {}

  async execute(
    id: string,
    name: string,
    email: Email,
    role: Role,
    salary: number,
    updatedAt: Date = new Date(),
  ): Promise<void> {
    const employee = new Employee(id, name, email, role, salary, updatedAt);
    await this.employeeRepository.save(employee);
  }
}
