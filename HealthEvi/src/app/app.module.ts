import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, PersonalComp } from './app-routing';
import { AppComponent } from './app.component';
import { NavnormalComponent } from './common/navnormal/navnormal.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './common/mat.module';
import { JwtInterceptor, GlobalService } from './global.service';
import { ViewportScroller } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    PersonalComp,
    NavnormalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    
    JwtInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
