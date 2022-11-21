import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {Tribu} from '../types/tribu';
import {Path} from "./path.enum";

@Injectable()

export class TribuService {

  private url = Path.admin

  constructor(private http: HttpService) {
  }

  /**
   * Get all tribus created
   * @returns Promise<Tribu[]>
   * @method Get
   */

  public getTribu(): Promise<Tribu[]> {
    return this.http.get(this.url + 'tribu/')
  }


}
