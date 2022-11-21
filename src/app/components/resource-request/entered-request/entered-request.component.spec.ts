import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnteredRequestComponent} from './entered-request.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ResourceRequestService} from "@services/resource-request.service";
import {DialogService} from "@modal/dialog.service";
import {MessageBarService} from "@services/message-bar.service";
import {Router} from "@angular/router";
import {HttpModule} from "@pichincha/angular-sdk/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomCommonModule} from "../../../common/components/common.module";

describe('EnteredRequestComponent', () => {
  let component: EnteredRequestComponent;
  let fixture: ComponentFixture<EnteredRequestComponent>;
  let router: Router;

  //#region MockService
  let mockedResourceRequestService = {
    getRequestTypeList: jest.fn()
  }

  let mockedDialogService = {
    addDialog: jest.fn()
  }

  let mockedMessageService = {
    showMessage: jest.fn()
  }
  //#endregion

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({api_url: ''}),
        RouterTestingModule.withRoutes([]),
        CustomCommonModule,
      ],
      declarations: [EnteredRequestComponent],
      providers: [
        {provide: ResourceRequestService, useValue: mockedResourceRequestService},
        {provide: DialogService, useValue: mockedDialogService},
        {provide: MessageBarService, useValue: mockedMessageService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteredRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
