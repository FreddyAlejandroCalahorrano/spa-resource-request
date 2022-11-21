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
  templateUrl: './approved-request-modal.component.html',
  styleUrls: ['./approved-request-modal.component.scss']
})
export class ApprovedRequestModalComponent extends DialogComponent<ModelDialog, MessageBar> implements OnInit {

  title: string
  selectedRequest: ResourceRequest

  skillList: { label: string } [] = []
  profileList: { label: string } [] = []

  resourceRequestFG: FormGroup

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
          return status.status == 'POR_ASIGNAR'
        }))
      )
      .subscribe(list => {
        this.requestStatusList = list
      })

    this.requestPriorityList$ = this.resourceRequestService.getPriorityList()
  }

  ngOnInit(): void {
    this.buildForm()

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
  }

  buildForm() {
    this.resourceRequestFG = this.formBuilder.group({
      requestStatus: ['', Validators.required],
      approximateEntryDate: ['', Validators.required],
    })
  }


  onSubmit() {
    this.resourceRequestFG.markAllAsTouched()
    if (this.resourceRequestFG.invalid) return

    let submitResourceRequest = {
      ...this.resourceRequestFG.getRawValue(),
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

  //#region Getters Controls
  get requestStatus() {
    return this.resourceRequestFG.get('requestStatus') as FormControl;
  }

  get approximateEntryDate() {
    return this.resourceRequestFG.get('approximateEntryDate') as FormControl;
  }

  //#endregion

}
