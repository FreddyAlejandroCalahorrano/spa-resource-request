import {SkillService} from './skill.service';
import Mocked = jest.Mocked;

describe('SkillsService', () => {
  let skillService: SkillService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
    }
    skillService = new SkillService(httpServiceMock);
  })

  it('should be created', () => {
    expect(skillService).toBeTruthy();
  });

  it('should call GET method when fn[getSkillsByProfileId] is executed', () => {
    const spySkill = jest.spyOn(httpServiceMock, 'get')
      .mockResolvedValue('')

    skillService.getSkillsByProfileId(1)

    expect(spySkill).toBeCalled()
  })

});
