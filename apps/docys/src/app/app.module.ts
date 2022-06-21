import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { Route, RouterModule } from '@angular/router';

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
    ],
  },
];

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
