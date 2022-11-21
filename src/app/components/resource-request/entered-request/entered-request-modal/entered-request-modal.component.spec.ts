import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnteredRequestModalComponent} from './entered-request-modal.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpModule} from "@pichincha/angular-sdk/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomCommonModule} from "../../../../common/components/common.module";
import {ResourceRequestService} from "@services/resource-request.service";
import {DialogService} from "@modal/dialog.service";
import {getTodayPlusNDays} from "../../../../common/utils/fn";

describe('EnteredRequestModalComponent', () => {
  let component: EnteredRequestModalComponent;
  let fixture: ComponentFixture<EnteredRequestModalComponent>;

  //#region MockService
  let mockedResourceRequestService = {
    getRequestTypeList: jest.fn(),
    getStatusList: jest.fn().mockResolvedValue([
      {"id": 5, "status": "INGRESADA"},
      {"id": 6, "status": "ASIGNADA"},
      {"id": 7, "status": "RECHAZADA"},
      {"id": 8, "status": "POR_ASIGNAR"},
      {"id": 9, "status": "CANCELADA"},
      {"id": 10, "status": "APROBADA"}
    ]),
    getPriorityList: jest.fn()
  }

  let mockedDialogService = {
    addDialog: jest.fn()
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
      providers: [
        {provide: ResourceRequestService, useValue: mockedResourceRequestService},
        {provide: DialogService, useValue: mockedDialogService}
      ],
      declarations: [EnteredRequestModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteredRequestModalComponent);
    component = fixture.componentInstance;
    component.selectedRequest = {
      "id": 19,
      "requestStatus": {
        "id": 6,
        "status": "ASIGNADA"
      },
      "requestType": {
        "id": 4,
        "type": "REEMPLAZO"
      },
      "hasBudget": true,
      "authorizationFile": null,
      "maximumEntryDate": "2022-07-17",
      "comments": "Test",
      "priority": "MEDIO",
      "petitioner": {
        "id": 38,
        "name": "ANTONIO",
        "lastName": "PEREZ",
        "email": "aperez@pichincha.com"
      },
      "celula": {
        "id": 3,
        "celulaNameProduct": "CDV",
        "idTribu": 2,
        "tribuName": "BUSINESS CAPABILITIES"
      },
      "skills": [
        {
          "id": 68,
          "nameSkill": "Bus Omnicanalidad",
          "idProfile": 1,
          "typeSkill": "Dev Front"
        },
        {
          "id": 71,
          "nameSkill": "WARCRAFT",
          "idProfile": 1,
          "typeSkill": "Dev Front"
        },
        {
          "id": 1,
          "nameSkill": "ANGULAR",
          "idProfile": 1,
          "typeSkill": "Dev Front"
        }
      ]
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
