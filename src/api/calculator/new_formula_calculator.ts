import { FunctionCalculatorInterface } from '../defenitons';

export const newFormulaCalculator: FunctionCalculatorInterface = (
  previousTime: number,
  currentTime: number,
): string => {
  const x = currentTime - previousTime;

  const PI500 = Math.PI * (x / 500);
  const PI250 = Math.PI * (x / 250);

  const cosPI500 = Math.cos(PI500);
  const cosPI250 = Math.cos(PI250);

  const sinPI500 = Math.sin(PI500);
  const sinPI250 = Math.sin(PI250);

  const y = -0.06366 + 0.12613 * cosPI500 + 0.12258 * cosPI250 + 0.01593 * sinPI500 + 0.03147 * sinPI250;

  return JSON.stringify({ x, y });
};
