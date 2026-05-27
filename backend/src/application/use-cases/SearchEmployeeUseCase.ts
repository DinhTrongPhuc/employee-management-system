import { Employee } from "../../domain/entities/Employee";
import { EmployeeRepository } from "../ports/EmployeeRepository";

export class SearchEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(id: string): Promise<Employee | null> {
    return (await this.employeeRepository.findById(id)) || null;
  }
}
