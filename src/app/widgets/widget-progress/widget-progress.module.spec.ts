import { WidgetProgressModule } from './widget-progress.module';

describe('WidgetProgressModule', () => {
  let widgetProgressModule: WidgetProgressModule;

  beforeEach(() => {
    widgetProgressModule = new WidgetProgressModule();
  });

  it('should create an instance', () => {
    expect(widgetProgressModule).toBeTruthy();
  });
});
