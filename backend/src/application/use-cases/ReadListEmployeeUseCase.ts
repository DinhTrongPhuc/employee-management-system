import { Employee } from "../../domain/entities/Employee";
import { EmployeeRepository } from "../ports/EmployeeRepository";

export class ReadListEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(): Promise<Employee[]> {
    return await this.employeeRepository.findAll();
  }
}
