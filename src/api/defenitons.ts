export interface HandleDataInterface {
  reduce(): string;
}

export interface FunctionReduceInterface {
  (previous: number, current: number): string;
}

export enum Operation {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}
