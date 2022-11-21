import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {Skill} from 'src/app/types/skill';
import {Path} from "./path.enum";


@Injectable()

export class SkillService {

  private url = Path.admin

  constructor(private http: HttpService) {
  }


  /**
   * Get a list with the skills by profile id
   * @param profileId The profile id
   * @returns Promise<Skill[]>
   * @method Get
   */

  public getSkillsByProfileId(profileId: number): Promise<Skill[]> {
    return this.http.get(`${this.url}skill/searchByProfile?idProfile=${profileId}`)
  }

  /**
   * Get a list with the skills by profile id list
   * @param profiles profile id list
   * @returns Promise<Skill[]>
   * @method Post
   */

  public getSkillsByProfiles(profiles: number[]): Promise<Skill[]> {
    return this.http.post(`${this.url}skill/getSkillsByIdProfiles`, profiles)
  }

}
