export default class CustomErrors {
  static createError({ message, cause, name = "", code = 0 }) {
    const error = new Error(message, { cause });
    error.name = name;
    error.code = code;
    throw error;
  }
}
