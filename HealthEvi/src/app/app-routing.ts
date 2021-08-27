import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './Personal/index/index.component';
import { LoginComponent } from './Personal/login/login.component';
import { LogoutComponent } from './Personal/logout/logout.component';
import { HomeComponent } from './Personal/home/home.component';

const routes: Routes = [

  { path: '', redirectTo:'login',pathMatch:'full' },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'index', component: IndexComponent
    , children:
      [  { path: 'Personal', outlet: "inner", 
      loadChildren : () => import('./Personal/personal.module').then(m => m.PersonalModule)},
      // { path: 'Bank', loadChildren:'./Bank/bank/bank.module#BankModule', outlet: "inner"},
      { path: 'Insurance',  outlet: "inner",
      loadChildren : () => import('./Insurance/insurance/insurance.module').then(m => m.InsuranceModule)
    },
      // { path: 'Investment', loadChildren:'./Investment/investment/investment.module#InvestmentModule', outlet: "inner"},
      // { path: 'Loans', loadChildren:'./Loans/loans/loans.module#LoansModule', outlet: "inner"},
      
      {path: "", component: HomeComponent, outlet: "inner"}
    
    ]
  },
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const PersonalComp = [
  IndexComponent,LoginComponent,LogoutComponent,HomeComponent
]