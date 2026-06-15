import bcrypt from "bcrypt";

export class Password {
  private readonly _value: string;

  constructor(value: string, isHashed: boolean = false) {
    if (!value || value.trim() === "") {
      throw new Error("Password cannot be empty");
    }

    const normalizedValue = value.trim();

    if (normalizedValue.length > 100) {
      throw new Error("Password cannot exceed 100 characters");
    }

    if (isHashed) {
      this._value = normalizedValue;
    } else {
      this._value = bcrypt.hashSync(normalizedValue, 10);
    }
  }

  get value(): string {
    return this._value;
  }

  compare(plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this._value);
  }
}
