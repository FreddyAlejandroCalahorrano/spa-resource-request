import {Component, OnInit} from '@angular/core';
import {DialogComponent} from "@modal/dialog.component";
import {DialogService} from "@modal/dialog.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResourceRequestService} from "@services/resource-request.service";
import {map} from "rxjs/operators";
import {from} from "rxjs";
import {Skill} from "@interfaces/skill";
import {ResourceRequest} from "@interfaces/resourceRequest";
import {getMessageError} from "../../../../common/utils/fn";
import {MessageBar} from "@interfaces/messageBar";

export interface ModelDialog {
  title: string,
  selectedRequest: ResourceRequest,
}

@Component({
  selector: 'app-entered-request-modal',
  templateUrl: './entered-request-modal.component.html',
  styleUrls: ['./entered-request-modal.component.scss']
})
export class EnteredRequestModalComponent extends DialogComponent<ModelDialog, MessageBar> implements OnInit {

  title: string
  selectedRequest: ResourceRequest

  skillList: { label: string } [] = []
  profileList: { label: string } [] = []

  resourceRequestFormGroup: FormGroup

  requestStatusList: { id: number, status: string }[] = []

  requestPriorityList$: Promise<any[]>

  constructor(
    dialogService: DialogService,
    private formBuilder: FormBuilder,
    private resourceRequestService: ResourceRequestService,
  ) {
    super(dialogService)

    from(this.resourceRequestService.getStatusList())
      .pipe(
        map(list => list.filter(status => {
          return status.status == 'APROBADA' || status.status == 'CANCELADA' || status.status == 'RECHAZADA'
        }))
      )
      .subscribe(list => {
        this.requestStatusList = list
      })

    this.requestPriorityList$ = this.resourceRequestService.getPriorityList()
  }

  ngOnInit(): void {
    this.buildForm()
    this.registerEvents()

    this.skillList = this.getSkillList()
    this.profileList = this.getProfileList()
  }

  getSkillList(): { label: string }[] {
    return this.selectedRequest.skills.map((skill: Skill) => {
      return {label: skill.nameSkill}
    })
  }

  getProfileList(): { label: string }[] {
    const seen = new Set();
    return this.selectedRequest.skills.map((skill: Skill) => {
      return {label: skill.typeSkill}
    }).filter((el: { label: string; }) => {
      const duplicate = seen.has(el.label);
      seen.add(el.label);
      return !duplicate;
    });
    // .filter((v: { label: any; }, i: any, a: any[]) => a.findIndex((v2: any) => (v2.label === v.label)) === i)
  }

  buildForm() {
    this.resourceRequestFormGroup = this.formBuilder.group({
      requestStatus: ['', Validators.required],
      comments: [''],
      priority: ['']
    })
  }

  registerEvents() {
    this.requestStatus.valueChanges
      .subscribe(value => {
        if (value == this.getIdByStatus('APROBADA')) {
          this.comments.reset()
          this.priority.addValidators(Validators.required)
          this.comments.removeValidators(Validators.required)
        } else {
          this.priority.reset()
          this.priority.removeValidators(Validators.required)
          this.comments.addValidators(Validators.required)
        }
      })
  }

  onSubmit() {
    this.resourceRequestFormGroup.markAllAsTouched()
    if (this.resourceRequestFormGroup.invalid) return

    let submitResourceRequest = {
      ...this.resourceRequestFormGroup.getRawValue(),
      id: this.selectedRequest.id
    }

    this.resourceRequestService.updateResourceRequest(submitResourceRequest)
      .then(() => {
        this.result = {
          status: "success",
          text: "Solicitud actualizada con éxito!"
        }
        this.close()
      })
      .catch((err) => {
        this.result = {
          status: "error",
          text: getMessageError(err.response?.data)
        }
        this.close()
      })

  }

  getIdByStatus(status: string) {
    return this.requestStatusList[this.requestStatusList.findIndex(x => x.status == status)]?.id
  }

  //#region Getters Controls
  get requestStatus() {
    return this.resourceRequestFormGroup.get('requestStatus') as FormControl;
  }

  get comments() {
    return this.resourceRequestFormGroup.get('comments') as FormControl;
  }

  get priority() {
    return this.resourceRequestFormGroup.get('priority') as FormControl;
  }

  //#endregion

}
