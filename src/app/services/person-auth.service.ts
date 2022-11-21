import {Injectable} from '@angular/core';
import {StorageService} from "@pichincha/angular-sdk/storage";
import {environment} from "@environments/environment";
import {HttpService} from '@pichincha/angular-sdk/http';
import {Path} from "@services/path.enum";
import {from} from "rxjs";
import {map, pluck} from "rxjs/operators";

@Injectable()

export class PersonAuthService {
  private mailKey = environment.mailKey
  private url = Path.admin

  constructor(
    private http: HttpService,
    private storageService: StorageService,
  ) {
  }

  getEmailFromSessionStorage() {
    return this.storageService.get(this.mailKey)
  }

  getPersonByEmail() {
    return this.http.get(`${this.url}person/personaEmail?email=${this.getEmailFromSessionStorage()}`)
  }

  getPersonRole() {
    return from(this.getPersonByEmail()).pipe(
      map(value => {
        return {idRoleAdmin: value.idRoleAdmin, roleUser: value.roleUser}
      })
    ).toPromise()
  }

  getRoles(){
    return this.http.get(`${this.url}roleUser`)

  }

  getPeopleRolUser(){
    return this.http.get(`${this.url}person/roleUser`)

  }

}
