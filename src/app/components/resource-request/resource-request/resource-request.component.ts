import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, merge, Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ResourceRequestService} from "@services/resource-request.service";
import {catchError, switchMap, tap} from "rxjs/operators";
import {TableResourceRequest} from "@interfaces/resourceRequest";
import {TribuService} from "@services/tribu.service";
import {CelulaService} from "@services/celula.service";
import {getDateTransform} from "../../../common/utils/fn";

@Component({
  selector: 'app-resource-request',
  templateUrl: './resource-request.component.html',
  styleUrls: ['./resource-request.component.scss']
})
export class ResourceRequestComponent implements OnInit {

  showSpinner: boolean = true

  tribus$: Promise<any[]>
  celulas$: Promise<any[]>;
  status$: Promise<any[]>

  // Filters
  filters: FormGroup

  dataResourceRequest$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  resourceRequest$: Observable<TableResourceRequest[]>

  columns: any[]

  constructor(
    private formBuilder: FormBuilder,
    private resourceRequestService: ResourceRequestService,
    private tribuService: TribuService,
    private celulaService: CelulaService,
  ) {
    this.tribus$ = this.tribuService.getTribu()
    this.status$ = this.resourceRequestService.getStatusList()

    this.setConfigTable()
    this.setupFilters()

    this.resourceRequest$ = this.dataResourceRequest$
      .pipe(
        switchMap(() => this.resourceRequestService.getResourceRequestList()),
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
      tribu: ['', []],
      celula: ['', []],
      status: ['', []],
      requestDate: [null,]
    })
    this.registerEvents();
  }

  //#region Getters
  get tribu() {
    return this.filters.get('tribu') as FormControl
  }

  get celula() {
    return this.filters.get('celula') as FormControl
  }

  get status() {
    return this.filters.get('status') as FormControl
  }

  get requestDate() {
    return this.filters.get('requestDate') as FormControl
  }

  //#endregion

  registerEvents() {

    const tribus$ = this.tribu.valueChanges
      .pipe(
        tap((idTribus) => {
          this.celula.setValue([], {emitEvent: false})
          this.celulas$ = this.celulaService.getCelulaByArrayTribu(idTribus)
        })
      )

    const celulas$ = this.celula.valueChanges
    const statuses$ = this.status.valueChanges
    const requestDate$ = this.requestDate.valueChanges

    merge(tribus$, celulas$, statuses$, requestDate$)
      .subscribe(() => {
        this.search()
      })

  }

  search() {
    this.dataResourceRequest$.next(true)
  }

  getFiltersValue() {
    const {
      tribu,
      celula,
      status,
      requestDate
    } =  this.filters.getRawValue()

    let filters: any = {
      idTribus: tribu?.length > 0 ? tribu : null,
      idCelulas: celula?.length > 0 ? celula : null,
      idStates: status?.length > 0 ? status : null,
      requestDate: requestDate?.length > 0 ? requestDate : null,
    }

    return {...filters}
  }

  calendarSelectRequestDate(event: any) {
    this.requestDate.patchValue(
      getDateTransform(event.detail[0].dateFrom)
    )
  }
}
