import {
  ChangeDetectorRef,
  Component,
  ElementRef, OnChanges,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Router} from "@angular/router";
import {DialogService} from "../../common/modal/dialog.service";
import {UtilitaryService} from "../../services/utilitary.service";
import {MessageBar} from "../../types/messageBar";
import {Observable} from "rxjs";
import {MessageBarService} from "../../services/message-bar.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BaseComponent implements OnInit, OnChanges {

  isIframe = false

  notify$!: Observable<MessageBar>

  constructor(private router: Router,
              private elementRef: ElementRef,
              private cdf: ChangeDetectorRef,
              private messageBarService: MessageBarService,
              private dialogService: DialogService,
              private utilitaryService: UtilitaryService) {
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.dialogService.setContainer(this.elementRef.nativeElement.shadowRoot)
    this.utilitaryService.setContainer(this.elementRef.nativeElement.shadowRoot)

    this.notify$ = this.messageBarService.notify
  }

  ngOnChanges() {
    this.cdf.detectChanges()
  }

  verifyIfWelcome() {
    return this.router.url.includes('welcome');
  }

}
