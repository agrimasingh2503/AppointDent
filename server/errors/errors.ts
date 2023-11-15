export class ServiceError extends Error {
  constructor (message: string) {
    super(message);
    this.name = 'ServiceError';
  }
}

export class BuildError extends Error {
  constructor (message: string) {
    super(message);
    this.name = 'BuildError';
  }
}
