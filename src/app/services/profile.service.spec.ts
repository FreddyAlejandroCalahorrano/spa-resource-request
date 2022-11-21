import {ProfileService} from './profile.service';
import Mocked = jest.Mocked;

describe('ProfileService', () => {
  let profilesService: ProfileService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    profilesService = new ProfileService(httpServiceMock);
  })

  it('should be created', () => {
    expect(profilesService).toBeTruthy();
  });

  it('should call GET method when fn[getProfiles] is executed', () => {

    const spyProfile = jest.spyOn(httpServiceMock, 'get')
      .mockResolvedValue('')

    profilesService.getProfiles()

    expect(spyProfile).toHaveBeenCalled();

  })


});
