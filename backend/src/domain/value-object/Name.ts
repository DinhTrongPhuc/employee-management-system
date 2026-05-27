export class Name {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim() === "") {
      throw new Error(" Name can not be empty");
    }

    const normalizedvalue = value.trim();

    if (normalizedvalue.length > 100) {
      throw new Error("Name must be under 100 character");
    }

    this._value = normalizedvalue;
  }

  get value(): string {
    return this._value;
  }
}
