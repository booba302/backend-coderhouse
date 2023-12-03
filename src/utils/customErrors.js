export default class CustomErrors {
  static create({ message, status, from }) {
    const error = new Error(message);
    error.message = message;
    error.status = status;
    error.from = from;
    throw error;
  }
}
