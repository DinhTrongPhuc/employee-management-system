export class Email {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim() === "") {
      throw new Error("Email cannot be empty or whitespace");
    }

    const nomalizedValue = value.trim().toLowerCase();

    if (nomalizedValue.length > 255) {
      throw new Error("Email length cannot exceed 255 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(nomalizedValue)) {
      throw new Error("Invalid email format");
    }

    this._value = nomalizedValue;
  }

  get value(): string {
    return this._value;
  }

  equals(other: Email): boolean {
    if (!other) return false;
    return this._value === other.value;
  }
}
