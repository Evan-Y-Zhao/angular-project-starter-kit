import { BrowserModule } from '@angular/platform-browser';
import * as animations from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HeaderComponent,
  SharedModule,
} from './shared';
import { HighlightDirective } from './highlight.directive';
import { MyCustomIfDirective } from './app.mycustomifdirective';
import { CoreModule } from './core/core.module';
import { OmnitureModule } from './omniture/omniture.module';
import { CookieService } from 'ngx-cookie-service';
import { ChartsModule } from './charts';
import { UnauthComponent } from './unauth/unauth.component';
import { SimpleLayoutComponent } from './shared/simple-layout/simple-layout.component';
import { AppLayoutComponent } from './shared/layout/app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HighlightDirective,
    MyCustomIfDirective,
    UnauthComponent,
    SimpleLayoutComponent,
    AppLayoutComponent,
    DashboardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    animations.BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    OmnitureModule.forRoot({
      pageTracking: {
        routesMapping: [{
          key: 'report',
          pair: 'Customer Portal > Reporting'
        }, {
          key: 'dashboard',
          pair: 'Customer Portal > Overall Dashboard'
        }, {
          key: 'system',
          pair: 'Customer Portal > System Dashboard'
        }]
      }
    }),
    ChartsModule.forRoot()
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
