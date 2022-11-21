import {Routes} from '@angular/router';

import {BaseComponent} from './components/base/base.component';
import {PageErrorComponent} from "./components/page-error/page-error.component";
import {ResourceRequestComponent} from "./components/resource-request/resource-request/resource-request.component";
import {
  FormResourceRequestComponent
} from "./components/resource-request/form-resource-request/form-resource-request.component";
import {ResourceRequestResolver} from "./resolvers/resource-request.resolver";
import {EnteredRequestComponent} from "./components/resource-request/entered-request/entered-request.component";
import {ApprovedRequestComponent} from "./components/resource-request/approved-request/approved-request.component";

export let routes: Routes;
routes = [
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'listado',
        children: [
          {
            path: '',
            component: ResourceRequestComponent,
          },
          {
            path: 'crear',
            component: FormResourceRequestComponent,

          },
          {
            path: 'editar/:id',
            component: FormResourceRequestComponent,
            resolve: {
              resourceRequest: ResourceRequestResolver
            }
          },
        ]
      },
      {
        path: 'ingresadas',
        component: EnteredRequestComponent,
      },
      {
        path: 'aprobadas',
        component: ApprovedRequestComponent,

      },
      {
        path: 'por-asignar',
        component: EnteredRequestComponent,
      },
      {
        path: '',
        component: BaseComponent,
      },
    ]
  },
  {
    path: 'pg-error',
    component: PageErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'pg-error',
    pathMatch: 'full',
  },
];

