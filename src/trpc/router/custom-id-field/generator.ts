import { CustomIdField } from "@prisma/client";
import { randomInt, randomUUID } from "crypto";
import dayjs from "dayjs";
import { FormatParser } from "./utils";
import { CustomIdType } from "./enums";

export interface IGenerator {
  generate(format?: string | null): string;
}

abstract class BaseNumberGenerator implements IGenerator {
  private static BASES: Record<string, number> = {
    X: 16,
    D: 10,
  };

  abstract generate(format?: string): string;

  format(format: string, num: number) {
    const [base, zeros] = format.split(":");
    const padLength = parseInt(zeros) || 10;
    const radix = NumberGenerator.BASES[base] || 10;
    return num.toString(radix).padStart(padLength, "0");
  }
}

export class FixedGenerator implements IGenerator {
  generate(format: string): string {
    return format;
  }
}

export class NumberGenerator extends BaseNumberGenerator {
  private readonly max: number;
  constructor(max: number) {
    super();
    this.max = max;
  }
  generate(format?: string): string {
    const num = randomInt(this.max);
    return format ? this.format(format, num) : num.toString();
  }
}

export class DateTimeGenerator implements IGenerator {
  generate(format?: string): string {
    const date = new Date();
    return dayjs(date).format(format);
  }
}

export class GUIDGenerator implements IGenerator {
  generate(): string {
    return randomUUID();
  }
}

export class Bit32Generator extends NumberGenerator {
  constructor() {
    super(2 ** 32 - 1);
  }
}

export class Bit20Generator extends NumberGenerator {
  constructor() {
    super(2 ** 16 - 1);
  }
}

export class Digit6Generator extends NumberGenerator {
  constructor() {
    super(10 ** 6 - 1);
  }
}

export class Digit9Generator extends NumberGenerator {
  constructor() {
    super(10 ** 9 - 1);
  }
}

export class SequnceGenerator extends BaseNumberGenerator {
  private sequence: number;
  constructor(sequence: number) {
    super();
    this.sequence = sequence;
  }
  generate(format?: string): string {
    const num = ++this.sequence;
    return format ? this.format(format, num) : num.toString();
  }
}

export class Generator {
  private generators: Record<string, IGenerator>;

  constructor(sequence: number) {
    this.generators = {
      [CustomIdType.FIXED]: new FixedGenerator(),
      [CustomIdType.DATETIME]: new DateTimeGenerator(),
      [CustomIdType.SEQUENCE]: new SequnceGenerator(sequence),
      [CustomIdType.BIT32]: new Bit32Generator(),
      [CustomIdType.BIT20]: new Bit20Generator(),
      [CustomIdType.DIGIT9]: new Digit9Generator(),
      [CustomIdType.DIGIT6]: new Digit6Generator(),
      [CustomIdType.GUID]: new GUIDGenerator(),
    };
  }

  generate(fields: CustomIdField[]) {
    return fields.reduce((id, field) => {
      const generator = this.generators[field.type];
      if (!generator) return id;
      const format = FormatParser.extractFormat(field.format);
      return id + FormatParser.format(field.format, generator.generate(format));
    }, "");
  }
}
