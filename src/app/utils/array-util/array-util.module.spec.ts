import { ArrayUtilModule } from './array-util.module';

describe('ArrayUtilModule', () => {
  let arrayUtilModule: ArrayUtilModule;

  beforeEach(() => {
    arrayUtilModule = new ArrayUtilModule();
  });

  it('should create an instance', () => {
    expect(arrayUtilModule).toBeTruthy();
  });
});
