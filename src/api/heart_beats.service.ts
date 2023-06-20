import { FunctionReduceInterface, HandleDataInterface } from './defenitons';

export class HeartBeatsService implements HandleDataInterface {
  previousTime = Date.now();
  reducer: FunctionReduceInterface;

  constructor(reducer: FunctionReduceInterface) {
    this.reducer = reducer;
  }

  public reduce(): string {
    const currentTime = Date.now();

    const resultReducer = this.reducer(this.previousTime, currentTime);

    this.previousTime = currentTime;

    return resultReducer;
  }
}
