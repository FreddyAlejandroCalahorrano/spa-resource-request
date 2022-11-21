import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, merge, Observable} from "rxjs";
import {TableResourceRequest} from "@interfaces/resourceRequest";
import {ResourceRequestService} from "@services/resource-request.service";
import {catchError, switchMap} from "rxjs/operators";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProfileService} from "@services/profile.service";
import {DialogService} from "@modal/dialog.service";
import {ApprovedRequestModalComponent} from "./approved-request-modal/approved-request-modal.component";
import {MessageBar} from "@interfaces/messageBar";
import {MessageBarService} from "@services/message-bar.service";
import {getDateTransform, getMessageError} from "../../../common/utils/fn";

@Component({
  selector: 'app-approved-request',
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.scss']
})
export class ApprovedRequestComponent implements OnInit {

  showSpinner: boolean = true

  profiles$: Promise<any[]>

  // Filters
  filters: FormGroup

  dataResourceRequest$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  resourceRequest$: Observable<TableResourceRequest[]>

  columns: any[]

  constructor(
    private formBuilder: FormBuilder,
    private resourceRequestService: ResourceRequestService,
    private profileService: ProfileService,
    private dialogService: DialogService,
    private messageBarService: MessageBarService,
  ) {
    this.profiles$ = this.profileService.getProfiles()

    this.setConfigTable()
    this.setupFilters()

    this.resourceRequest$ = this.dataResourceRequest$
      .pipe(
        switchMap(() => this.resourceRequestService.getResourceRequestListByStatus('APROBADA')),
        catchError(() => {
          this.showSpinner = true
          return []
        }),
      )
  }

  ngOnInit(): void {
  }

  setConfigTable() {
    this.columns = [
      {
        caption: 'Tribu',
      },
      {
        caption: 'Célula',
      },
      {
        caption: 'Solicitante',
      },
      {
        caption: 'Estado',
      },
      {
        caption: 'Tipo solicitud',
      },
      {
        caption: '¿Tiene presupuesto?',
      },
      {
        caption: 'Prioridad',
      },
      {
        caption: 'Fecha máxima de ingreso',
      },
      {
        caption: 'Acciones',
      },
    ]
  }

  setupFilters() {
    this.filters = this.formBuilder.group({
      profiles: ['', []],
      requestDate: [null,]
    })
    this.registerEvents()
  }

  onActionClick(resourceRequestId: number) {

    this.resourceRequestService.getResourceRequestById(resourceRequestId)
      .then(resourceRequest => {
        this.dialogService.addDialog(
          ApprovedRequestModalComponent,
          {
            title: 'Revisión de solicitud aprobada',
            selectedRequest: resourceRequest
          },
          {
            size: 'lg',
            modalDialogClass: "modal-dialog-scrollable",
          }
        ).subscribe((result: MessageBar) => {
          if (!result) return
          this.messageBarService.showMessage(result.text, result.status)
          this.dataResourceRequest$.next(true)
        })
      })
      .catch((err) => {
        this.messageBarService.showMessage(getMessageError(err), 'error')
      })

  }

  //#region Getters
  get profiles() {
    return this.filters.get('profiles') as FormControl
  }

  get requestDate() {
    return this.filters.get('requestDate') as FormControl
  }

  //#endregion

  registerEvents() {
    const profiles$ = this.profiles.valueChanges
    const requestDate$ = this.requestDate.valueChanges

    merge(profiles$, requestDate$)
      .subscribe(() => {
        this.search()
      })
  }

  search() {
    this.dataResourceRequest$.next(true)
  }

  getFiltersValue() {
    const {
      profiles,
      requestDate
    } = this.filters.getRawValue()

    let filters : any = {
      idProfiles: profiles?.length > 0 ? profiles : null,
      requestDate: requestDate?.length > 0 ? requestDate : null,
    }
    return {...filters}
  }

  calendarSelectRequestAproved(event: any) {
    this.requestDate.patchValue(
      getDateTransform(event.detail[0].dateFrom)
    )
  }
}
