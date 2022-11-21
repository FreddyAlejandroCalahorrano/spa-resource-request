import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseComponent} from './base.component';
import {HttpModule} from "@pichincha/angular-sdk/http";
import {RouterTestingModule} from "@angular/router/testing";
import {BootstrapModalModule} from "../../common/modal/bootstrap-modal.module";
import {MessageBarService} from "../../services/message-bar.service";
import {UtilitaryService} from "../../services/utilitary.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        RouterTestingModule,
        BootstrapModalModule,
      ],
      declarations: [BaseComponent],
      providers: [MessageBarService, UtilitaryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
