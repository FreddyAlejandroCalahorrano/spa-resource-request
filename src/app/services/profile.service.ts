import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {Profile} from 'src/app/types/profile';
import {Path} from "./path.enum";

@Injectable()

export class ProfileService {

  private url = Path.admin

  constructor(private http: HttpService) {
  }

  /**
   * Get the profiles assignable to a person
   * @returns Promise<Profile[]>
   * @method Get
   */
  public getProfiles(): Promise<Profile[]> {
    return this.http.get(this.url + 'profile')
  }

}
