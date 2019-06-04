import { ChartBarModule } from './chart-bar.module';

describe('ChartBarModule', () => {
  let chartBarModule: ChartBarModule;

  beforeEach(() => {
    chartBarModule = new ChartBarModule();
  });

  it('should create an instance', () => {
    expect(chartBarModule).toBeTruthy();
  });
});
