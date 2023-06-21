import { FunctionCalculatorInterface, HandleDataInterface } from './defenitons';

export class HeartBeatsService implements HandleDataInterface {
  previousTime = Date.now();
  Calculator: FunctionCalculatorInterface;

  constructor(Calculator: FunctionCalculatorInterface) {
    this.Calculator = Calculator;
  }

  public calculate(): string {
    const currentTime = Date.now();

    const resultCalculator = this.Calculator(this.previousTime, currentTime);

    this.previousTime = currentTime;

    return resultCalculator;
  }
}
