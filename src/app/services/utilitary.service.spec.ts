import {UtilitaryService} from './utilitary.service';

describe('UtilitaryService', () => {
  let utilitaryService: UtilitaryService;

  beforeEach(() => {
    utilitaryService = new UtilitaryService();
  })

  it('should be created', () => {
    expect(utilitaryService).toBeTruthy();
  });

  it('should set and get shadowBaseRoot', () => {

    const testShadowBaseRoot: any = "test"

    utilitaryService.setContainer(testShadowBaseRoot)

    expect(utilitaryService.shadowBase).toEqual(testShadowBaseRoot);
  });

});
