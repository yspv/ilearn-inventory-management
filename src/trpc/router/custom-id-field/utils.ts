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
