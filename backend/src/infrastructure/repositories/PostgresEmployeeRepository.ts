import { Pool } from "pg";
import { EmployeeRepository } from "../../application/ports/EmployeeRepository";
import { Employee, Role } from "../../domain/entities/Employee";
import { Name } from "../../domain/value-object/Name";
import { Email } from "../../domain/value-object/Email";

export class PostgresEmployeeRepository implements EmployeeRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "admin",
      host: "db",
      database: "employee_db",
      password: "password",
      port: 5432,
    });
  }

  async save(employee: Employee): Promise<void> {
    const query = `
    INSERT INTO employees (id, name, email, role, salary, update_at) 
    VALUES ($1,$2,$3,$4,$5,$6)
    `;

    const values = [
      employee.Id,
      employee.Name.value,
      employee.Email.value,
      employee.Role,
      employee.Salary,
      employee.UpdatedAt,
    ];

    await this.pool.query(query, values);
  }

  async findById(id: string): Promise<Employee | null> {
    const query = `SELECT * FROM employees WHERE id = $1`;

    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];

    return new Employee(
      row.id,
      new Name(row.name),
      new Email(row.email),
      row.role as Role,
      Number(row.salary),
      new Date(row.update_at),
    );
  }

  async findAll(): Promise<Employee[]> {
    const query = `SELECT * FROM employees`;

    const result = await this.pool.query(query);

    return result.rows.map((row) => {
      return new Employee(
        row.id,
        new Name(row.name),
        new Email(row.email),
        row.role as Role,
        Number(row.salary),
        new Date(row.update_at),
      );
    });
  }

  async updateById(id: string, employee: Employee): Promise<void> {}

  async deleteById(id: string): Promise<void> {}
}
