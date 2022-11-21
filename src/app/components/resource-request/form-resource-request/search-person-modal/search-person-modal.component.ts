import {Component, OnInit} from '@angular/core';
import {DialogComponent} from '@modal/dialog.component';
import {DialogService} from '@modal/dialog.service';
import {catchError, debounceTime} from "rxjs/operators";
import {PaginationEvt} from "@dt-table/interfaces/table.interface";
import {PersonAuthService} from "@services/person-auth.service";
import {from} from "rxjs";


export interface ModelDialog {
  titleModal: string,
}

@Component({
  selector: 'app-form-asignaciones-modal',
  templateUrl: './search-person-modal.component.html',
  styleUrls: ['./search-person-modal.component.scss']
})
export class SearchPersonModalComponent extends DialogComponent<ModelDialog, any> implements OnInit {
  titleModal: string

  peopleRolUser$: Promise<any>

  showSpinner: boolean = true
  columns: any[]

  constructor(
    dialogService: DialogService,
    private personAuthService: PersonAuthService
  ) {
    super(dialogService)
    this.setConfigTable()

    this.peopleRolUser$ = from(this.personAuthService.getPeopleRolUser()).pipe(
      catchError(() => {
        this.showSpinner = !this.showSpinner
        return []
      })
    ).toPromise()
  }

  ngOnInit(): void {
  }

  setConfigTable() {
    this.columns = [
      {
        caption: 'Nombre',
      },
      {
        caption: 'Correo Electrónico',
      }
    ]
  }


  onPersonClick(person: any) {
    this.result = {
      person
    }
    this.close()
  }


}
