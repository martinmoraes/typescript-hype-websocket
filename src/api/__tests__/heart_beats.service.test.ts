import { HeartBeatsService } from '../heart_beats.service';

describe('HeartBeastService', () => {
  it('correct value', () => {
    const calculatorMock = jest.fn(() => '{"x":3,"y":0.18642686255536417}');
    const result = new HeartBeatsService(calculatorMock).calculate();

    expect(result).toEqual('{"x":3,"y":0.18642686255536417}');
    expect(typeof result).toBe('string');
  });
});
