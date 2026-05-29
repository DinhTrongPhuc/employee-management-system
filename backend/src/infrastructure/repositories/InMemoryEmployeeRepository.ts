import { EmployeeRepository } from "../../application/ports/EmployeeRepository";
import { Employee } from "../../domain/entities/Employee";

export class InMemoryEmployeeRepository implements EmployeeRepository {
  private employees: Employee[] = [];

  async save(employee: Employee): Promise<void> {
    this.employees.push(employee);
  }

  async findAll(): Promise<Employee[]> {
    return [...this.employees]; // trả về mảng mới sao chép từ mảng gốc để tránh bị thay đổi bên ngoài
  }

  async findById(id: string): Promise<Employee | null> {
    const existingEmployee = this.employees.find((emp) => emp.Id === id);
    if (!existingEmployee) {
      throw new Error("Employee not found");
    }
    return existingEmployee;
  }

  async updateById(id: string, employee: Employee): Promise<void> {
    const index = this.employees.findIndex((emp) => emp.Id === id);
    if (index === -1) {
      throw new Error("Employee not found");
    }
    this.employees[index] = employee;
  }

  async deleteById(id: string): Promise<void> {
    const index = this.employees.findIndex((emp) => emp.Id === id);
    if (index === -1) {
      throw new Error("Employee not found");
    }
    this.employees.splice(index, 1);
  }
}
