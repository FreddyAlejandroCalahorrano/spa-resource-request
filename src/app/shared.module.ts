/**
 * Modules
 */
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ExternalAssetsModule} from '@pichincha/angular-sdk/external-assets';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomCommonModule} from "./common/components/common.module";
import {BootstrapModalModule} from "./common/modal/bootstrap-modal.module";

/**
 * Components
 */
import {AppComponent} from './app.component';
import {BaseComponent} from './components/base/base.component';
import {InputValueAcessorDirective} from "./common/directives/input-value-accessor.directive";
import {PageErrorComponent} from "./components/page-error/page-error.component";
import {ResourceRequestComponent} from "./components/resource-request/resource-request/resource-request.component";
import {
  FormResourceRequestComponent
} from "./components/resource-request/form-resource-request/form-resource-request.component";

/**
 * Services
 */
import {MessageBarService} from "./services/message-bar.service";
import {UtilitaryService} from "./services/utilitary.service";
import {TribuService} from "./services/tribu.service";
import {CelulaService} from "./services/celula.service";
import {ProfileService} from "./services/profile.service";

import {HttpInterceptorRequest} from "@pichincha/angular-sdk/http";
import {INTERCEPTOR_CONFIG_STORAGE, setAuthorization} from "@pichincha/bb-commons/interceptor";
import {EStorageType} from "@pichincha/typescript-sdk";
import {environment} from "../environments/environment";
import {ResourceRequestService} from "./services/resource-request.service";
import {SkillService} from "./services/skill.service";
import {ConfirmModalComponent} from "./common/components/confirm-modal/confirm-modal.component";
import {EnteredRequestComponent} from "./components/resource-request/entered-request/entered-request.component";
import {ApprovedRequestComponent} from "./components/resource-request/approved-request/approved-request.component";
import {ResourceRequestResolver} from "./resolvers/resource-request.resolver";
import {
  EnteredRequestModalComponent
} from "./components/resource-request/entered-request/entered-request-modal/entered-request-modal.component";
import {PersonAuthService} from "./services/person-auth.service";
import {
  SearchPersonModalComponent
} from "./components/resource-request/form-resource-request/search-person-modal/search-person-modal.component";
import {DirectivesModule} from "@pichincha/bb-commons/directives";
import {
  ApprovedRequestModalComponent
} from "./components/resource-request/approved-request/approved-request-modal/approved-request-modal.component";

export const ConfigStorage = {storageType: EStorageType.SESSION, secretKey: environment.storage.key};

const modals = [
  ConfirmModalComponent,
  EnteredRequestModalComponent,
  SearchPersonModalComponent,
  ApprovedRequestModalComponent
]

const resolvers = [
  ResourceRequestResolver
]

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    InputValueAcessorDirective,
    PageErrorComponent,
    ResourceRequestComponent,
    FormResourceRequestComponent,
    EnteredRequestComponent,
    ApprovedRequestComponent,
    ...modals
  ],
  imports: [
    RouterModule,
    CommonModule,
    ExternalAssetsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomCommonModule,
    BootstrapModalModule,
    DirectivesModule,
  ],
  providers: [
    {
      provide: HttpInterceptorRequest,
      useValue: setAuthorization
    },
    {
      provide: INTERCEPTOR_CONFIG_STORAGE,
      useValue: ConfigStorage
    },
    MessageBarService,
    UtilitaryService,
    TribuService,
    CelulaService,
    ProfileService,
    SkillService,
    ResourceRequestService,
    PersonAuthService,
    ...resolvers
  ],
  exports: [AppComponent, BaseComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
