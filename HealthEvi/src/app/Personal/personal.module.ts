import { BrowserModule }    from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalRoutingModule, PersonalComp } from './personal-routing.module';
import { MatModule } from '../common/mat.module';
import { PersonalService } from './personal.service';

@NgModule({
  imports: [
    CommonModule,
    PersonalRoutingModule,
    MatModule
  ],
  providers:[PersonalService]
  ,
  declarations: [PersonalComp]
})
export class PersonalModule { }
