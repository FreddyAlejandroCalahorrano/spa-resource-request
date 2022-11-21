import {Injectable} from '@angular/core';
import {HttpService} from "@pichincha/angular-sdk/http";
import {Path} from "./path.enum";

@Injectable()

export class CelulaService {
  private url = Path.admin

  constructor(private http: HttpService) {
  }

  /**
   * Get List Celula by IdTribu
   * @param idTribu IdTribu
   */
  public getCelulaByTribu(idTribu: number) {
    return this.http.get(this.url + 'celula/celulasByTribu', {
      idTribu
    })
  }

  /**
   * Get List Celula by Array IdTribu
   * @param idsTribu IdsTribu
   */
  public getCelulaByArrayTribu(idsTribu: number[]) {
    return this.http.post(this.url + 'celula/celulasByidTribus', idsTribu)
  }

}
