export class LimitExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LimitExceededError";
  }
}

export class EvaluatorLimitExceededError extends LimitExceededError {
  constructor(message: string) {
    super(message);
    this.name = "EvaluatorLimitExceededError";
  }
}

export class EvaluationLimitExceededError extends LimitExceededError {
  constructor(message: string) {
    super(message);
    this.name = "EvaluationLimitExceededError";
  }
}
