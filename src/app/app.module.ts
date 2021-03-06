import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatTableModule} from '@angular/material/table';
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FooterComponent} from './footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MatDividerModule} from '@angular/material/divider';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {HighchartsChartModule} from 'highcharts-angular';

// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// const config: SocketIoConfig = {
//   url: 'http://remorebot.com:80/un1',
//   options: {
//     transportOptions: {
//       polling: {
//         extraHeaders: {
//           'Access-Control-Allow-Origin': '*'
//         }
//       }
//     }
//   }
// };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    // PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSidenavModule,
    NgxChartsModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    HighchartsChartModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private readonly overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('remore-dark-theme');
  }
}
