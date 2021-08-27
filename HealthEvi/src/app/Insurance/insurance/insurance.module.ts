import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule ,InsuranceComp} from './insurance-routing.module';
import { MatModule } from '../../common/mat.module';
import { InsuranceService } from './insurance.service';

@NgModule({
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    MatModule
  ],
  declarations: [InsuranceComp],
  providers:[InsuranceService]
})
export class InsuranceModule { }
