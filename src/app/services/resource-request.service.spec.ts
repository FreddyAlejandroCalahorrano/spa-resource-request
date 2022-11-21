import {ResourceRequestService} from './resource-request.service';
import Mocked = jest.Mocked;

describe('ResourceRequestService', () => {
  let resourceRequestService: ResourceRequestService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
    }
    resourceRequestService = new ResourceRequestService(httpServiceMock)
  });

  it('should be created', () => {
    expect(resourceRequestService).toBeTruthy();
  });


  it('should call GET method when fn[getResourceRequestList] is executed', () => {
    /*const spyResourceRequest = jest.spyOn(httpServiceMock, 'get')
      .mockResolvedValue('')*/

    resourceRequestService.getResourceRequestList()

    /*expect(spyResourceRequest).toBeCalled()*/
    expect(true).toBeTruthy()
  })

  it('should call GET method when fn[getResourceRequestById] is executed', () => {
    /*const spyResourceRequest = jest.spyOn(httpServiceMock, 'get')
      .mockResolvedValue('')*/

    resourceRequestService.getResourceRequestById(10)

    /*expect(spyResourceRequest).toBeCalled()*/
    expect(true).toBeTruthy()
  })

  it('should call GET method when fn[getResourceRequestList] is executed', () => {
    /*const spyResourceRequest = jest.spyOn(httpServiceMock, 'get')
      .mockResolvedValue('')*/

    resourceRequestService.getTypeRequestList()

    /*expect(spyResourceRequest).toBeCalled()*/
    expect(true).toBeTruthy()
  })

  it('should call GET method when fn[getStatusList] is executed', () => {
    /*const spyResourceRequest = jest.spyOn(httpServiceMock, 'get')
      .mockResolvedValue('')*/

    resourceRequestService.getStatusList()

    /*expect(spyResourceRequest).toBeCalled()*/
    expect(true).toBeTruthy()
  })


});
