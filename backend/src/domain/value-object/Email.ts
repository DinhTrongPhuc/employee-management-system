export class Email {
  constructor(private readonly _value: string) {
    if (!_value || _value.trim() === "") {
      throw new Error("Email cannot be empty or whitespace");
    }

    if (_value.length > 255 || !_value.includes("@")) {
      throw new Error("Invalid email format");
    }

    this._value = _value.trim().toLowerCase();
  }

  get value(): string {
    return this._value;
  }

  equals(other: Email): boolean {
    return this._value === other.value;
  }
}
