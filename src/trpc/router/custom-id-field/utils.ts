import { CustomIdType } from "./enums";

export const CUSTOM_ID_UNIQUE_TYPES = [
  CustomIdType.GUID,
  CustomIdType.BIT20,
  CustomIdType.BIT32,
  CustomIdType.DIGIT6,
  CustomIdType.DIGIT9,
  CustomIdType.SEQUENCE,
];

export class FormatParser {
  static REGEX = /\[(.*?)\]/;
  static extractFormat(format: string) {
    const exec = FormatParser.REGEX.exec(format);
    return exec ? exec[1] : null;
  }
  static format(format: string, value: any) {
    return format.replace(FormatParser.REGEX, value);
  }
}
