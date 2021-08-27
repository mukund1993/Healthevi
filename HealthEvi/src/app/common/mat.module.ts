import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateT, Broadcaster } from './plugin/dateT';
import { FormsModule } from '@angular/forms';
import { MSelectComponent } from './plugin/mselect/mselect.component';
import { messagepop } from './plugin/messagepop';
import { ERR } from './plugin/ERR';
import { ClickOutsideDirective } from './plugin/onOutClick';
import { LogoDarkGreenComponent } from './svg/logo-dark-green/logo-dark-green.component';
import { IconsComponent } from './svg/icons/icons.component';
@NgModule({
  imports: [FormsModule,
    CommonModule
  ],
  providers:[Broadcaster],
  declarations: [DateT, MSelectComponent,messagepop,ERR, ClickOutsideDirective,
  LogoDarkGreenComponent,
  IconsComponent  
  ],
  exports:[DateT,FormsModule,MSelectComponent,messagepop,ERR,LogoDarkGreenComponent]
})
export class MatModule { }
