export interface HandleDataInterface {
  calculate(): string;
}

export interface FunctionCalculatorInterface {
  (previousTime: number, currentTime: number): string;
}

export enum Operation {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}
