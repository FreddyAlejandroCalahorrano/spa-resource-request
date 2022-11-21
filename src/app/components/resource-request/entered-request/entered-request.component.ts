import {Component, OnInit} from '@angular/core';
import {catchError, switchMap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {TableResourceRequest} from "@interfaces/resourceRequest";
import {ResourceRequestService} from "@services/resource-request.service";
import {DialogService} from "@modal/dialog.service";
import {EnteredRequestModalComponent} from "./entered-request-modal/entered-request-modal.component";
import {MessageBarService} from "@services/message-bar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBar} from "@interfaces/messageBar";

@Component({
  selector: 'app-entered-request',
  templateUrl: './entered-request.component.html',
  styleUrls: ['./entered-request.component.scss']
})
export class EnteredRequestComponent implements OnInit {

  showSpinner: boolean = true

  dataResourceRequest$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  resourceRequest$: Observable<TableResourceRequest[]>

  columns: any[]

  isEnteredRequestView: boolean

  viewOptions: any[] = [
    {icon: 'autorenew'},
    {icon: 'navigate_next'}
  ]

  constructor(
    private resourceRequestService: ResourceRequestService,
    private dialogService: DialogService,
    private messageBarService: MessageBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isEnteredRequestView = this.router.url.includes('ingresadas')

    this.resourceRequest$ = this.dataResourceRequest$
      .pipe(
        switchMap(() => this.resourceRequestService.getResourceRequestListByStatus(this.isEnteredRequestView?'INGRESADA': 'POR_ASIGNAR')),
        catchError(() => {
          this.showSpinner = true
          return []
        }),
      )
  }

  ngOnInit(): void {
    this.setConfigTable()
  }

  setConfigTable() {
    this.columns = [
      {caption: 'Tribu'},
      {caption: 'Célula'},
      {caption: 'Solicitante'},
      {caption: 'Estado'},
      {caption: 'Tipo solicitud'},
      {caption: '¿Tiene presupuesto?'},
      {caption: 'Prioridad'},
      {caption: 'Fecha máxima de ingreso'},
      {caption: 'Acciones'}
    ]
  }

  onActionClick(resourceRequestId: number) {
    if (this.isEnteredRequestView) {
      this.resourceRequestService.getResourceRequestById(resourceRequestId)
        .then(resourceRequest => {
          this.dialogService.addDialog(
            EnteredRequestModalComponent,
            {
              title: 'Revisión de  solicitud ingresada',
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
        .catch(() => {
          this.messageBarService.showMessage('Error al cargar la solicitud', 'error')
        })
    } else {
      this.router.navigate(['../..', 'admin', 'asignaciones', 'celulas'], {relativeTo: this.activatedRoute})
    }


  }

}
