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

  // async findById(id: string): Promise<Employee | null> {
  //   const employee = this.employees.find((emp) => emp.Id === id);
  //   return employee || null;
  // }

  async findById(id: string): Promise<Employee | null> {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].Id === id) {
        return this.employees[i];
      }
    }
    return null;
  }
}
