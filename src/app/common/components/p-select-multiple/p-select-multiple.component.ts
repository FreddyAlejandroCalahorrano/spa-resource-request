import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {fromEvent, Observable, of, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, first, map, pluck} from "rxjs/operators";

@Component({
  selector: 'app-p-select-multiple',
  templateUrl: './p-select-multiple.component.html',
  styleUrls: ['./p-select-multiple.component.scss'],
})
export class PSelectMultipleComponent implements OnInit, OnChanges {

  selection = new SelectionModel(true);
  /**
   * Link container DOM element
   */
  @ViewChild('container', {static: true}) public container: ElementRef;

  @Input() open: boolean = false
  @Input() size: string = STATESIZE.SMALL
  @Input() state: string = STATEPROP.NORMAL
  @Input() label: string
  @Input() tooltip: string
  @Input() errorHelper: string
  @Input() items: any[]
  @Input() itemSelected: number[]
  @Input() placeholder: string = 'Seleccione una opción ...'

  @Input() valueExpr: string = 'value'
  @Input() displayExpr: string = 'label'

  @Output() changeSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() openSelectContainer: EventEmitter<any> = new EventEmitter<any>()

  @Input() search: boolean = false
  @ViewChild('searchElement', {static: true}) searchElement: ElementRef
  items$: Observable<any[]>
  subs: Subscription

  selectItems: any[] = []
  subsClickOutside: Subscription

  _visibleOptions: number = 5

  messageMapping:
    { [k: string]: string } =
    {'=0': 'Ninguno seleccionado', '=1': 'Un seleccionado', 'other': '# seleccionados'};

  constructor(private host: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    this.items$ = of(this.items)
  }

  ngOnChanges(changes: SimpleChanges) {
    const {
      items
    } = changes
    if (items && !items.firstChange) {
      this.items$ = of(this.items)
      this.selection.clear()
      this.selectItems = []
    }

    if (this.itemSelected)
      this.selectItems = [...this.itemSelected]
  }

  get visibleOptions() {
    return this.items?.length > this._visibleOptions ?
      this._visibleOptions
      : (this.items?.length || this._visibleOptions)
  }

  get isOpen() {
    return this.open
  }

  get isSearcheable() {
    return this.search
  }

  handleClick(item: any, evt: any) {
    const {checked} = evt.target

    if (checked)
      this.selection.select(item);
    else
      this.selection.deselect(item);

    this.setSelects()
  }

  openContainer(evt: any) {
    // const inputContain = this.host.nativeElement
    //   .querySelector('.bp-select__input-child')
    //   .contains(evt.target)
    //
    this.open = !this.open

    this.openSelectContainer.emit(true)

    setTimeout(() => this.handleClickOutside())

    if (this.isSearcheable) {
      setTimeout(() => this.searchElement.nativeElement.focus())

      this.subs = fromEvent(this.searchElement.nativeElement, 'keyup')
        .pipe(
          pluck('target', 'value'),
          debounceTime<string>(500),
          distinctUntilChanged(),
          map<string, string>((search: string) => search.toUpperCase()),
        )
        .subscribe((search: string) =>
          this.items$ = of(this.filterItems([...this.items], search))
        )
    }

    this.selection.select(...this.selectItems)
  }

  filterItems = (items: any[], searchTerm: string) =>
    items.filter(item => item[this.displayExpr].toUpperCase().includes(searchTerm))

  setSelects() {
    this.selectItems = [...this.selection.selected]
    // this.selection.clear()
    // this.open = false
    this.changeSelect.emit(
      [
        ...this.selectItems
      ]
    )
  }

  private handleClickOutside() {

    this.subsClickOutside && this.subsClickOutside.unsubscribe()

    if (this.isOpen)
      this.subsClickOutside = fromEvent(document, 'click' )
        .pipe(
          map(({path}: any) => path[0]),
          filter((target) => {
            const origin = this.host.nativeElement as HTMLElement;
            return this.isOpen && origin.contains(target as HTMLElement) === false;
          }),
          first(),
        )
        .subscribe(() =>
          this.closeContainer()
        );
  }

  closeContainer() {
    this.subsClickOutside && this.subsClickOutside.unsubscribe()
    // this.isSearcheable && this.renderer.setProperty(this.searchElement.nativeElement, 'value', '')
    // this.items$ = of(this.items)
    setTimeout(() => this.open = false)
  }

}


export enum STATESIZE {
  EXTRA_SMALL = 'extra-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum STATEPROP {
  NORMAL = 'normal',
  DISABLED = 'disabled',
  FOCUS = 'focus',
  ERROR = 'error'
}
