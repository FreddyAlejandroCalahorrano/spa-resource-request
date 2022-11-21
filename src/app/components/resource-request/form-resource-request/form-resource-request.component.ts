import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Tribu} from "@interfaces/tribu";
import {TribuService} from "@services/tribu.service";
import {Celula} from "@interfaces/celula";
import {switchMap} from "rxjs/operators";
import {CelulaService} from "@services/celula.service";
import {Profile} from "@interfaces/profile";
import {ProfileService} from "@services/profile.service";
import {ResourceRequestService} from "@services/resource-request.service";
import {Skill} from "@interfaces/skill";
import {SkillService} from "@services/skill.service";
import {MessageBarService} from "@services/message-bar.service";
import {DialogService} from "@modal/dialog.service";
import {ConfirmModalComponent} from "../../../common/components/confirm-modal/confirm-modal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {DateValidators} from "../../../validators/date-validators";
import {Location} from "@angular/common";
import {PersonAuthService} from "@services/person-auth.service";
import {SearchPersonModalComponent} from "./search-person-modal/search-person-modal.component";
import {MessageBar} from "@interfaces/messageBar";
import {getMessageError} from "../../../common/utils/fn";

@Component({
  selector: 'app-form-resource-request',
  templateUrl: './form-resource-request.component.html',
  styleUrls: ['./form-resource-request.component.scss']
})
export class FormResourceRequestComponent implements OnInit {

  resourceRequestFormGroup: FormGroup

  resourceRequest: any

  tribuList$: Promise<Tribu[]>
  celulaList: Celula[]

  profileList$: Promise<Profile[]>
  skillList: Skill[]

  typeRequestList$: Promise<any[]>

  isEdit: boolean = false

  personLogged: any

  fileName: string = "Ninguno seleccionado"

  constructor(
    private formBuilder: FormBuilder,
    private tribuService: TribuService,
    private celulaService: CelulaService,
    private profileService: ProfileService,
    private skillService: SkillService,
    private resourceRequestService: ResourceRequestService,
    private messageBarService: MessageBarService,
    private modalBsService: DialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private personAuthService: PersonAuthService
  ) {
    this.tribuList$ = this.tribuService.getTribu()
    this.profileList$ = this.profileService.getProfiles()
    this.typeRequestList$ = this.resourceRequestService.getTypeRequestList()
  }

  ngOnInit(): void {
    this.buildForm()

    this.personAuthService.getPersonByEmail().then(personLogged => {
      this.personLogged = personLogged
      if (!this.isEdit) {
        this.applicant.setValue(`${this.personLogged?.name} ${this.personLogged?.lastName}`)
        this.petitionerId.setValue(this.personLogged.id)
      }
    })

    this.registerEvents()

    const {data} = this.activatedRoute.snapshot
    this.editaData(data)
  }

  buildForm() {
    this.resourceRequestFormGroup = this.formBuilder.group({
      tribuId: ['', [Validators.required]],
      celulaId: ['', [Validators.required]],
      profiles: [null, [Validators.required]],
      skills: [[], [Validators.required]],
      maximumEntryDate: ['', [
        Validators.required,
        DateValidators.dateValid,
        DateValidators.maximumIncomeDateValid()
      ]],
      applicant: [null, Validators.required],
      petitionerId: [],
      requestType: ['', [Validators.required]],
      hasBudget: [false, Validators.required],
      budget: ['']
    })
  }

  registerEvents() {
    this.tribuId.valueChanges
      .pipe(
        switchMap((idTribu) => this.celulaService.getCelulaByTribu(idTribu))
      ).subscribe(ls => {
      this.celulaId.setValue(null)
      this.celulaList = [...ls]
      if (this.isEdit && this.resourceRequest.celulaId)
        this.celulaId.setValue(this.resourceRequest.celulaId)
    })

    this.profiles.valueChanges
      .pipe(
        switchMap((profiles) => this.skillService.getSkillsByProfiles(profiles))
      ).subscribe(ls => {
      this.skills.setValue([])
      this.skillList = [...ls]
      if (this.isEdit && this.resourceRequest.skills)
        this.skills.setValue(this.resourceRequest.skills)
    })
  }

  editaData(data: any) {

    console.log(data)

    if (data.resourceRequest) {
      this.resourceRequest = data.resourceRequest
      this.isEdit = true
      this.resourceRequestFormGroup.patchValue({
        tribuId: this.resourceRequest.tribuId,
        celulaId: this.resourceRequest.celulaId,
        applicant: this.resourceRequest.applicant,
        petitionerId: this.resourceRequest.petitionerId,
        /*profiles: this.resourceRequest.idProfile,*/
        maximumEntryDate: this.resourceRequest.maximumIncomeDate,
        requestType: this.resourceRequest.requestTypeId,
        hasBudget: this.resourceRequest.hasBudget
      })
    }

  }

  onSearchPerson() {
    this.modalBsService.addDialog(
      SearchPersonModalComponent,
      {titleModal: 'Seleccionar solicitante'},
      {size: 'lg'}
    ).subscribe((result) => {
      if (!result) return
      this.applicant.setValue(`${result.person.name} ${result.person.lastName}`.toUpperCase())
      this.petitionerId.setValue(result.person.id)
    })
  }

  onSubmit() {
    /*console.log("form", this.resourceRequestFormGroup.getRawValue())*/
    this.resourceRequestFormGroup.markAllAsTouched()
    if (this.resourceRequestFormGroup.invalid) return

    let submitResourceRequest = {
      ...this.resourceRequestFormGroup.getRawValue(),
      requestStatus: 5,
      priority: "MEDIO",
      user: "nicolasito",
    }

    this.resourceRequestService.addResourceRequest(submitResourceRequest)
      .then(() => this.redirectTo(this.isEdit))
      .catch((err) =>
        this.setupMessageBar({
          status: "error",
          text: getMessageError(err.response.data)
        })
      )

    console.log(submitResourceRequest)

  }

  redirectTo(edit?: boolean) {
    this.setupMessageBar({
      status: "success",
      text: edit ? "Solicitud editada con éxito" : "Solicitud creada con éxito"
    })
    let route = edit ? ['../..'] : ['..']
    this.router.navigate(route, {relativeTo: this.activatedRoute,})
  }

  onCancel() {
    this.modalBsService.addDialog(
      ConfirmModalComponent,
      {
        title: `¿Está seguro que desea salir?`,
      },
    ).subscribe((result: any) => {
      if (!result) return
      this.location.back()
    })

  }

  onFileInput(event: any) {
    this.fileName = event.target.files[0]?.name || "Ninguno seleccionado"
  }

  onClickBudgetCheckbox() {
    this.hasBudget.setValue(!this.hasBudget.value)
    if (this.hasBudget.value) {
      /*this.budget.removeValidators(Validators.required)*/
    } else {
      this.fileName = "Ninguno seleccionado"
      /*this.budget.addValidators(Validators.required)*/
    }
    this.budget.reset()

  }

  setupMessageBar({text, status}: MessageBar) {
    this.messageBarService.showMessage(text, status)
  }

  //#region Getters Controls
  get tribuId() {
    return this.resourceRequestFormGroup.get('tribuId') as FormControl;
  }

  get celulaId() {
    return this.resourceRequestFormGroup.get('celulaId') as FormControl;
  }

  get profiles() {
    return this.resourceRequestFormGroup.get('profiles') as FormControl;
  }

  get skills() {
    return this.resourceRequestFormGroup.get('skills') as FormControl;
  }

  get maximumEntryDate() {
    return this.resourceRequestFormGroup.get('maximumEntryDate') as FormControl;
  }

  get applicant() {
    return this.resourceRequestFormGroup.get('applicant') as FormControl;
  }

  get petitionerId() {
    return this.resourceRequestFormGroup.get('petitionerId') as FormControl;
  }

  get requestType() {
    return this.resourceRequestFormGroup.get('requestType') as FormControl;
  }

  get hasBudget() {
    return this.resourceRequestFormGroup.get('hasBudget') as FormControl;
  }

  get budget() {
    return this.resourceRequestFormGroup.get('budget') as FormControl;
  }

  //#endregion

}
