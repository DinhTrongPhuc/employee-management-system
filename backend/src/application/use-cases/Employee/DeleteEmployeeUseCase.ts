import { EmployeeRepository } from "../../ports/EmployeeRepository";

export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(id: string): Promise<void> {
    await this.employeeRepository.deleteById(id);
  }
}
