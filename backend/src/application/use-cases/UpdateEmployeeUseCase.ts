import { Employee, Role } from "../../domain/entities/Employee";
import { Email } from "../../domain/value-object/Email";
import { Name } from "../../domain/value-object/Name";
import { EmployeeRepository } from "../ports/EmployeeRepository";

export class UpdateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(
    id: string,
    updateData: {
      name?: string;
      email?: string;
      role?: string;
      salary?: number;
    },
  ): Promise<Employee> {
    const existingEmployee = await this.employeeRepository.findById(id);

    if (!existingEmployee) {
      throw new Error("Employee not found");
    }

    // Update the employee with the new data
    const updatedEmployee = new Employee(
      id,
      updateData.name ? new Name(updateData.name) : existingEmployee.Name,
      updateData.email ? new Email(updateData.email) : existingEmployee.Email,
      updateData.role ? (updateData.role as Role) : existingEmployee.Role,
      updateData.salary !== undefined
        ? updateData.salary
        : existingEmployee.Salary,
      new Date(),
    );

    await this.employeeRepository.updateById(id, updatedEmployee);

    return updatedEmployee;
  }
}
