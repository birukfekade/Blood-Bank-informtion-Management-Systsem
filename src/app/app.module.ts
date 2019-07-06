import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BranchComponent } from './centers/branch/branch.component';
import {AuthenticateComponent} from './authenticate/authenticate.component';
import {FooterComponent} from './common/footer/footer.component';
import {NavbarComponent} from './common/navbar/navbar.component';
import {NewnavComponent} from './common/newnav/newnav.component';
import {HospitalComponent} from './centers/hospital/hospital.component';
import {DonationcenterComponent} from './centers/donationcenter/donationcenter.component';
import {DonorComponent} from './user/donor/donor.component';
import {StaffComponent} from './user/staff/staff.component';
import {ProfileComponent} from './user/profile/profile.component';
import {AddbloodComponent} from './blood/addblood/addblood.component';
import {DonateComponent} from './blood/donate/donate.component';
import {GetbloodComponent} from './blood/getblood/getblood.component';
import {TransferbloodComponent} from './blood/transferblood/transferblood.component';
import {AvailableComponent} from './stock/available/available.component';
import {BloodstockComponent} from './stock/bloodstock/bloodstock.component';
import {UsedComponent} from './stock/used/used.component';
import {Routes,RouterModule} from '@angular/router';
import { DatatableComponent } from './common/datatable/datatable.component';
import {TrialpostComponent} from './common/trialpost/trialpost.component';
import {DelComponent} from './common/del/del.component';
import {DashboardComponent} from './common/dashboard/dashboard.component';
import {ReportComponent} from './report/report.component';
import {hostname} from 'os';
import {CommonModule} from '@angular/common';


const appRoutes: Routes = [

  { path: 'branch', component: BranchComponent},
  { path: '', component: AuthenticateComponent},
  { path: 'dt', component: DatatableComponent},
  {path: 'nav', component: NavbarComponent},
  {path: 'dnav', component: NewnavComponent},
  {path: 'hospital', component: HospitalComponent},
  {path: 'donationcenter', component: DonationcenterComponent},
  {path: 'donor', component: DonorComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'staff', component: StaffComponent},
  {path:  'tp', component: TrialpostComponent},
  {path: 'addblood', component: AddbloodComponent},
  {path: 'donate', component: DonateComponent},
  {path: 'getblood', component: GetbloodComponent},
  {path: 'transferblood', component: TransferbloodComponent},
  {path: 'available', component: AvailableComponent},
  {path: 'stock', component: BloodstockComponent},
  {path: 'used', component: UsedComponent},
  {path: 'del' , component: DelComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'report', component: ReportComponent}



];

@NgModule({
  declarations: [
    AppComponent,
    BranchComponent,
    AuthenticateComponent,
    FooterComponent,
    DatatableComponent,
    NavbarComponent,
    NewnavComponent,
    HospitalComponent,
    DonationcenterComponent,
    DonorComponent,
    ProfileComponent,
    StaffComponent,
    AddbloodComponent,
    DonateComponent,
    GetbloodComponent,
    TransferbloodComponent,
  AvailableComponent,
    BloodstockComponent,
    UsedComponent,
    TrialpostComponent,
    DelComponent,
    DashboardComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
