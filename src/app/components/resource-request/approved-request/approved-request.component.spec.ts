import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApprovedRequestComponent} from './approved-request.component';
import {HttpModule} from "@pichincha/angular-sdk/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomCommonModule} from "../../../common/components/common.module";
import {ProfileService} from "@services/profile.service";
import {ResourceRequestService} from "@services/resource-request.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ApprovedRequestComponent', () => {
  let component: ApprovedRequestComponent;
  let fixture: ComponentFixture<ApprovedRequestComponent>;

  //#region MockService
  let mockedProfileService = {
    getProfiles: jest.fn()
  }
  let mockedResourceRequestService = {
    getTypeRequestList: jest.fn()
  }
  //#endregion

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({api_url: ''}),
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        CustomCommonModule,
      ],
      declarations: [ApprovedRequestComponent],
      providers: [
        {provide: ProfileService, useValue: mockedProfileService},
        {provide: ResourceRequestService, useValue: mockedResourceRequestService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
