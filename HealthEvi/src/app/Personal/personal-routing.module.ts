import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyprofileComponent } from './myprofile/myprofile.component';
import { FamilydetailsComponent } from './familydetails/familydetails.component';
import { ChangepinComponent } from './changepin/changepin.component';
import { ImportexportComponent } from './importexport/importexport.component';
import { AboutexideComponent } from './aboutexide/aboutexide.component';
import { QuickcontactsComponent } from './quickcontacts/quickcontacts.component';
import { ForgetComponent } from './forget/forget.component';
import { ChildmembersComponent } from './childmembers/childmembers.component';

const routes: Routes = [
  { path: '', redirectTo:'myprofile',pathMatch:'full' },
  { path: 'aboutexide', component: AboutexideComponent},
  { path: 'changepin', component: ChangepinComponent},
  { path: 'familydetails', component: FamilydetailsComponent},
  { path: 'importexport', component: ImportexportComponent},
  { path: 'myprofile', component: MyprofileComponent},
  { path: 'quickcontacts', component: QuickcontactsComponent},
  { path: 'forget', component: ForgetComponent},
  { path: 'members', component: ChildmembersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
export const PersonalComp = [MyprofileComponent,
  FamilydetailsComponent,
  ChangepinComponent,
  ImportexportComponent,
  AboutexideComponent,
  QuickcontactsComponent,
  ForgetComponent,
  ChildmembersComponent
  ]