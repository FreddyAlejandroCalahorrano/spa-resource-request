import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResourceRequestComponent} from './resource-request.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Router} from "@angular/router";
import {HttpModule} from "@pichincha/angular-sdk/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomCommonModule} from "../../../common/components/common.module";
import {ResourceRequestService} from "@services/resource-request.service";
import {InputValueAcessorDirective} from "../../../common/directives/input-value-accessor.directive";
import {TribuService} from "@services/tribu.service";
import {CelulaService} from "@services/celula.service";

describe('ResourceRequestComponent', () => {
  let component: ResourceRequestComponent;
  let fixture: ComponentFixture<ResourceRequestComponent>;
  let router: Router;

  //#region MockService
  let mockedResourceRequestService = {
    getResourceRequestList: jest.fn(),
    getStatusList: jest.fn()
  }

  let mockedTribuService = {
    getTribu: jest.fn()
  }

  let mockedCelulaService = {
    getCelulaByArrayTribu: jest.fn()
  }
  //#endregion

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        CustomCommonModule,
      ],
      declarations: [ResourceRequestComponent, InputValueAcessorDirective],
      providers: [
        {provide: ResourceRequestService, useValue: mockedResourceRequestService},
        {provide: TribuService, useValue: mockedTribuService},
        {provide: CelulaService, useValue: mockedCelulaService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check filters form group initial values', () => {
    expect(component.tribu.value).toEqual('');
    expect(component.celula.value).toEqual('');
    expect(component.status.value).toEqual('');
    expect(component.requestDate.value).toEqual(null);
  });

  it('should call celula service when tribuName change value', () => {
    const spyCelula = jest.spyOn(mockedCelulaService, 'getCelulaByArrayTribu')
      .mockResolvedValue([])

    component.tribu.setValue('Test')

    expect(spyCelula).toBeCalled()
  })
});
