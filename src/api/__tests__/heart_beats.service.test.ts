import { HeartBeatsService } from '../heart_beats.service';

describe('HeartBeastService', () => {
  it('correct value', () => {
    const reducerMock = jest.fn(() => '{"x":3,"y":0.18642686255536417}');
    const result = new HeartBeatsService(reducerMock).reduce();

    expect(result).toEqual('{"x":3,"y":0.18642686255536417}');
    expect(typeof result).toBe('string');
  });
});
