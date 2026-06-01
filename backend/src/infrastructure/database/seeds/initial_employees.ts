import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("employees").del();

  // Inserts seed entries
  await knex("employees").insert([
    {
      id: "EMP001",
      name: "Admin User",
      email: "admin@example.com",
      role: "Manager",
      salary: 5000,
      update_at: new Date(),
    },
    {
      id: "EMP002",
      name: "John Doe",
      email: "john@example.com",
      role: "Staff",
      salary: 2000,
      update_at: new Date(),
    },
    {
      id: "EMP003",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "HR",
      salary: 3000,
      update_at: new Date(),
    },
    {
      id: "EMP004",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Staff",
      salary: 2500,
      update_at: new Date(),
    },
    {
      id: "EMP005",
      name: "Bob Brown",
      email: "bob@example.com",
      role: "Staff",
      salary: 2200,
      update_at: new Date(),
    },
  ]);
}
