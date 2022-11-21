import {CelulaService} from './celula.service';
import Mocked = jest.Mocked;

describe('CelulaService', () => {
  let celulaService: CelulaService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
    }
    celulaService = new CelulaService(httpServiceMock);
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(celulaService).toBeTruthy();
  });

  it('should return array with celula by idTribu', () => {
    const spyCelula = jest.spyOn(httpServiceMock, 'get')
      .mockResolvedValue('')

    celulaService.getCelulaByTribu(1)

    expect(spyCelula).toBeCalled()
  })

});
