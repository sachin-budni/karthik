import { ChartDoughnutModule } from './chart-doughnut.module';

describe('ChartDoughnutModule', () => {
  let chartDoughnutModule: ChartDoughnutModule;

  beforeEach(() => {
    chartDoughnutModule = new ChartDoughnutModule();
  });

  it('should create an instance', () => {
    expect(chartDoughnutModule).toBeTruthy();
  });
});
