import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { InsuranceAddComponent } from './insurance-add/insurance-add.component';
import { InsuranceMotorComponent } from './insurance-motor/insurance-motor.component';

import { InsuranceHealthComponent } from './insurance-health/insurance-health.component';
import { InsurancePropertyComponent } from './insurance-other/insurance-property.component';

const routes: Routes = [
  { path: '', 
  children:[ 
  { path: '' ,redirectTo:'Insurances',pathMatch:'full'}, 
  { path: 'Insurances', component: InsuranceListComponent},
  { path: 'Add', component: InsuranceAddComponent},
  { path: 'Motor', component: InsuranceMotorComponent},
  { path: 'other', component: InsurancePropertyComponent},
  { path: 'Health', component: InsuranceHealthComponent}]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
export const InsuranceComp = [InsuranceListComponent,
  InsuranceAddComponent,
  InsuranceMotorComponent,
  InsurancePropertyComponent,
  InsuranceHealthComponent]