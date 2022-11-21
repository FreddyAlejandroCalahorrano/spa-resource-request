import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ResourceRequest} from "../types/resourceRequest";
import {ResourceRequestService} from "../services/resource-request.service";

@Injectable()
export class ResourceRequestResolver implements Resolve<ResourceRequest> {

  constructor(
    private resourceRequestService: ResourceRequestService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResourceRequest> {
    const {id} = route.params
    return this.resourceRequestService.getResourceRequestById(id)
  }
}
