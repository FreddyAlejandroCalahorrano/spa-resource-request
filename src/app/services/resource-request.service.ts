import {Injectable} from '@angular/core';
import {HttpService} from "@pichincha/angular-sdk/http";
import {of} from "rxjs";
import {
  AddResourceRequest,
  ResourceRequest,
  TableResourceRequest,
  UpdateResourceRequest
} from "../types/resourceRequest";
import {getTodayPlusNDays} from "../common/utils/fn";
import {Path} from "./path.enum";

@Injectable()
export class ResourceRequestService {

  private url = Path.request

  constructor(private http: HttpService) {
  }


  /**
   * Get the resource request list
   * @returns Promise<TableResourceRequest[]>
   * @method Get
   */
  getResourceRequestList(): Promise<TableResourceRequest[]> {
    return this.http.get(this.url + 'request')
  }

  /**
   * Get the resource request list by status
   * @param status request status
   * @returns Promise<TableResourceRequest[]>
   * @method Get
   */
  getResourceRequestListByStatus(status: string): Promise<TableResourceRequest[]> {
    return this.http.get(this.url + 'request/status/' + status)
  }

  /**
   * Get resource request by id
   * @returns Promise<ResourceRequest>
   * @method Get
   */
  getResourceRequestById(id: number): Promise<ResourceRequest> {
    return this.http.get(this.url + 'request/' + id)
  }

  /**
   * Get request type list
   * @returns Promise<{ id: number, type: string }[]>
   * @method Get
   */
  getTypeRequestList(): Promise<{ id: number, type: string }[]> {
    return this.http.get(this.url + 'typeRequest')
  }

  /**
   * Get status list
   * @returns Promise<{ id: number, status: string }[]>
   * @method Get
   */
  getStatusList(): Promise<{ id: number, status: string }[]> {
    return this.http.get(this.url + 'statusRequest')

  }

  /**
   * Get priority list
   * @returns Promise<{value:string}[]>
   * @method Get
   */
  getPriorityList(): Promise<{ value: string }[]> {
    return of([
      {value: 'ALTO'},
      {value: 'MEDIO'},
      {value: 'BAJO'}
    ]).toPromise()
  }

  /**
   * Add new resource request
   * @param resourceRequest the resource request
   * @returns Promise<any>
   * @method Post
   */

  public addResourceRequest(resourceRequest: AddResourceRequest): Promise<any> {
    return this.http.post(`${this.url}request`, resourceRequest)
  }

  /**
   * Add new resource request
   * @param resourceRequest the resource request to update
   * @returns Promise<any>
   * @method Post
   */

  public updateResourceRequest(resourceRequest: UpdateResourceRequest): Promise<any> {
    return this.http.patch(`${this.url}request/${resourceRequest.id}`, resourceRequest)
  }

}
