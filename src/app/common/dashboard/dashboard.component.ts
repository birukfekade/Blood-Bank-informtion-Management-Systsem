import { Component, OnInit } from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Staff} from '../../user/staff/staff';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService, BloodstockService]
})
export class DashboardComponent implements OnInit {
public noofstaff;
public no;
public noofdonor;
public noofbranch;
public noofhospital;
public noofstocks;
public noofdoncen;
public noofdonation;
public nooftransfers;
  staffs: Staff[] = [];
  constructor(private dashboardservice: DashboardService) { }

  ngOnInit() {
    this.yeah();


  }

  yeah() {
 this.dashboardservice.getStaffs().subscribe(res => {
   this.noofstaff = res;
   this.no = this.staffs.length;

    });

    this.dashboardservice.getStaffs().subscribe( res => {
      this.no = res;
      this.noofstaff = this.no.count;
    });
    this.dashboardservice.getBranches().subscribe( res => {
      this.no = res;
      this.noofbranch = this.no.count;
    });
    this.dashboardservice.getDonor().subscribe( res => {
      this.no = res;
      this.noofdonor = this.no.count;
    });
    this.dashboardservice.getHospitals().subscribe( res => {
      this.no = res;
      this.noofhospital = this.no.count;
    });
    this.dashboardservice.getStaffs().subscribe( res => {
      this.no = res;
      this.noofstaff = this.no.count;
    });
    this.dashboardservice.getBranches().subscribe( res => {
      this.no = res;
      this.noofbranch = this.no.count;
    });
    this.dashboardservice.getStocks().subscribe( res => {
      this.no = res;
      this.noofstocks = this.no.count;
    });
    this.dashboardservice.getDonationCenters().subscribe( res => {
      this.no = res;
      this.noofdoncen = this.no.count;
    });
    this.dashboardservice.getDonationHistories().subscribe( res => {
      this.no = res;
      this.noofdonation = this.no.count;
    });
    this.dashboardservice.getHospitals().subscribe( res => {
      this.no = res;
      this.noofhospital = this.no.count;
    });
    this.dashboardservice.getTransfers().subscribe(res => {
      this.nooftransfers = this.no.count;
    } );
  }

}
