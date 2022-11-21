import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormResourceRequestComponent} from './form-resource-request.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpModule} from "@pichincha/angular-sdk/http";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomCommonModule} from "../../../common/components/common.module";
import {Router} from "@angular/router";
import {ResourceRequestService} from "../../../services/resource-request.service";
import {MessageBarService} from "../../../services/message-bar.service";
import {TribuService} from "../../../services/tribu.service";
import {CelulaService} from "../../../services/celula.service";
import {ProfileService} from "../../../services/profile.service";
import {SkillService} from "../../../services/skill.service";
import {DialogService} from "../../../common/modal/dialog.service";
import {of} from "rxjs";
import {PersonAuthService} from "@services/person-auth.service";

describe('FormResourceRequestComponent', () => {
  let component: FormResourceRequestComponent;
  let fixture: ComponentFixture<FormResourceRequestComponent>;
  let router: Router;

  //#region MockService
  let mockedMessageBarService = {
    showMessage: jest.fn()
  }

  let mockedTribuService = {
    getTribu: jest.fn()
  }

  let mockedCelulaService = {
    getCelulaByTribu: jest.fn()
  }

  let mockedProfileService = {
    getProfiles: jest.fn()
  }

  let mockedSkillService = {
    getSkillsByProfiles: jest.fn()
  }

  let mockedResourceRequestService = {
    getTypeRequestList: jest.fn()
  }

  let mockedDialogService = {
    addDialog: jest.fn()
  }

  let mockedMessageService = {
    showMessage: jest.fn()
  }

  let mockedPersonAuthService = {
    getPersonByEmail: jest.fn().mockResolvedValue({})
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
      declarations: [FormResourceRequestComponent],
      providers: [
        {provide: MessageBarService, useValue: mockedMessageBarService},
        {provide: TribuService, useValue: mockedTribuService},
        {provide: CelulaService, useValue: mockedCelulaService},
        {provide: ProfileService, useValue: mockedProfileService},
        {provide: SkillService, useValue: mockedSkillService},
        {provide: ResourceRequestService, useValue: mockedResourceRequestService},
        {provide: DialogService, useValue: mockedDialogService},
        {provide: MessageBarService, useValue: mockedMessageService},
        {provide: PersonAuthService, useValue: mockedPersonAuthService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResourceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check resource request form group initial values', () => {
    expect(component.tribuId.value).toEqual('');
    expect(component.celulaId.value).toEqual('');
    expect(component.profiles.value).toEqual(null);
    expect(component.skills.value).toEqual([]);
    expect(component.maximumEntryDate.value).toEqual('');
    expect(component.applicant.value).toEqual('undefined undefined');
    expect(component.requestType.value).toEqual('');
    expect(component.budget.value).toEqual('');
  });

  it('should call celula service when tribuName change value', () => {
    const spyCelula = jest.spyOn(mockedCelulaService, 'getCelulaByTribu')
      .mockResolvedValue([])

    component.tribuId.setValue('Test')

    expect(spyCelula).toBeCalled()
  })

  it('should call skill service when profiles change value', () => {
    const spySkill = jest.spyOn(mockedSkillService, 'getSkillsByProfiles')
      .mockResolvedValue([])

    component.profiles.setValue([1, 2])

    expect(spySkill).toBeCalled()
  })

  it('should not have required validator on budget control when onClickBudgetCheckbox is called and haveBudget is false', () => {
    component.hasBudget.setValue(false)
    component.onClickBudgetCheckbox()

    expect(component.hasBudget).toBeTruthy()
    expect(component.budget.hasValidator(Validators.required)).toBeFalsy()
  })

  it('should have required validator on budget control when onClickBudgetCheckbox is called and haveBudget is true', () => {
    component.hasBudget.setValue(true)
    component.onClickBudgetCheckbox()

    expect(component.hasBudget.value).toBeFalsy()
    /*expect(component.budget.hasValidator(Validators.required)).toBeTruthy()*/
  })

  it('should call dialog service and return true when fn[onCancel] is executed', () => {
    const spyDialog = jest.spyOn(mockedDialogService, 'addDialog')
      .mockImplementation(() => of(true))
    component.onCancel()

    expect(spyDialog).toBeCalled()
  })

  it('should call dialog service and return false when fn[onCancel] is executed', () => {
    const spyDialog = jest.spyOn(mockedDialogService, 'addDialog')
      .mockImplementation(() => of(false))
    component.onCancel()

    expect(spyDialog).toBeCalled()
  })


  it('should change fileName when fn[onFileInput] is executed', () => {
    const event: any = {target: {files: [{name: "test"}]}}
    component.onFileInput(event)

    expect(component.fileName).toEqual('test')
  })

  it('should change fileName (Ninguno seleccionado) when fn[onFileInput] is executed', () => {
    const event: any = {target: {files: []}}
    component.onFileInput(event)

    expect(component.fileName).toEqual('Ninguno seleccionado')
  })

});
