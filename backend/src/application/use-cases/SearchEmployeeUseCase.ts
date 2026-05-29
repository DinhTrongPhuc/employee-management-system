import { Employee } from "../../domain/entities/Employee";
import { EmployeeRepository } from "../ports/EmployeeRepository";

export class SearchEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }
}
