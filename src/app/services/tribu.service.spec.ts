import {TribuService} from './tribu.service';
import {TestBed} from "@angular/core/testing";
import {HttpService} from "@pichincha/angular-sdk/http";
import Mocked = jest.Mocked;

describe('TribuService', () => {
  let tribuService: TribuService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
    }
    TestBed.configureTestingModule({
      providers: [
        TribuService,
        {provide: HttpService, useValue: httpServiceMock}
      ]
    })
    tribuService = TestBed.inject(TribuService);
  })

  it('should be created', () => {
    expect(tribuService).toBeTruthy();
  });

  it('should call GET method when fn[getTribu] is executed', () => {
    const spyTribu= jest.spyOn(httpServiceMock, 'get')
      .mockResolvedValue('')

    tribuService.getTribu()

    expect(spyTribu).toBeCalled()
  })


});
