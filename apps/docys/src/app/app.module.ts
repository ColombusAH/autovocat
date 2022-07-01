import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { Route, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'flows',
        loadChildren: () =>
          import('./pages/flows/flows.module').then((m) => m.FlowsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
