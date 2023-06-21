import { newFormulaCalculator } from '../calculator/new_formula_calculator';

describe('CalculateY', () => {
  it('correct value', () => {
    const previous = 1687283649029;
    const current = 1687283649032;
    const result = newFormulaCalculator(previous, current);

    expect(result).toEqual('{"x":3,"y":0.18642686255536417}');
  });
});
