import {TestBed} from '@angular/core/testing';

import {ResourceRequestResolver} from './resource-request.resolver';
import {ActivatedRoute} from "@angular/router";
import {ResourceRequestService} from "../services/resource-request.service";


describe('ResourceRequestResolver', () => {
  let resolver: ResourceRequestResolver;
  let route: ActivatedRoute;
  let mockedResourceRequestService = {
    getResourceRequestById: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceRequestResolver,
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id:5}}}},
        {provide: ResourceRequestService, useValue: mockedResourceRequestService}
      ]
    });
    resolver = TestBed.inject(ResourceRequestResolver);
    route = TestBed.get(ActivatedRoute);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should call the method "getResourceRequestById"', () => {
    const spy = jest.spyOn(mockedResourceRequestService, 'getResourceRequestById')
      .mockImplementation(() => Promise.resolve())
    resolver.resolve(route.snapshot, null)
    expect(spy).toBeCalled()
  });
});
