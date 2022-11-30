//import { AdminComponent } from '@admin/admin.component';
import { inject } from '@angular/core';
import { Route, Router, Routes, UrlSegment } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  // {
  //   path: '',
  //   loadChildren: () => import('./auth/auth-routing.module').then((m) => m.authroutes),
  // },

  {
    path: 'new',
    component: ChatComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
