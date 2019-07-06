import { Component, OnInit } from '@angular/core';
import {Bloodstock} from '../../stock/bloodstock/bloodstock';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';
import {GetbloodService} from './getblood.service';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {Router} from '@angular/router';
import {AddbloodService} from '../addblood/addblood.service';
import {ReportService} from '../../report/report.service';
import {Report} from '../../report/report';

@Component({
  selector: 'app-getblood',
  templateUrl: './getblood.component.html',
  styleUrls: ['./getblood.component.css'],
  providers: [BloodstockService, GetbloodService, AddbloodService, AuthenticateService, ReportService]
})


export class GetbloodComponent implements OnInit {

  report: Report = new  Report();
  newval ;
  getid;
  public recent;
  public alert1 = false;
  public alert2 = false;
  public notify1 ;
  public notify2 ;
  public currentrole;
  stocks: Bloodstock[] = [];
  bloodstock: Bloodstock = new Bloodstock();
  constructor(private bloodstockservice: BloodstockService, private  addbloodservice: AddbloodService, private reportservice: ReportService
              , private getbloodservice: GetbloodService , private authservice: AuthenticateService, private router: Router) { }

  ngOnInit() {

    this.currentrole = this.authservice.getCurrentUser().role;
    if (this.currentrole === 'Branch Administrator') {
    } else if (this.currentrole === 'Hospital Administrator') {
    } else {
      this.router.navigate(['']);
    }

 this.bloodstockservice.getBloodstock(this.authservice.getCurrentUser().branchid).subscribe(res => {
   this.stocks = res as Bloodstock[];
 });


  }

  getBlood() {
    // console.log(this.getid);
    this.addbloodservice.getAviliableBlood(this.getid).subscribe(res => {
        // this.bloodstock.id = this.recent.id;
      this.recent = res;
      this.bloodstock.id = this.recent.id;
      this.bloodstock.available = this.recent.available - this.newval;
      this.bloodstock.used = this.recent.used + this.newval;
      this.bloodstock.type = this.recent.type;
        this.bloodstock = {id: this.getid, available: this.bloodstock.available, used: this.bloodstock.used, type: this.bloodstock.type};

        console.log(this.bloodstock);
        if (this.bloodstock.available > this.newval) {
          this.recent = null;
          this.getbloodservice.getBlood(this.bloodstock).subscribe(res2 => {
            // console.log(this.bloodstock);


            this.report.action = 'Get Blood';
            this.report.amount = this.newval;
            this.report.actiondate = Date.now();
            this.report.center = this.authservice.getCurrentUser().branchid;
            this.report.doneby = this.authservice.getCurrentUser().id;

            this.reportservice.createReport(this.report).subscribe( repres => {

            });


            this.alert2 = false;
            this.alert1 = true;
            this.notify1 = 'Successful !!!';
          }, error1 => {
            this.alert1 = false;
            this.alert2 = true;
            this.notify2 = 'Unsuccessful Trial !!!';
            console.log(error1);
          });
        } else {
          this.alert1 = false;
          this.alert2 = true;
          this.notify2 = ' Error!!! Low Amount of Blood.';
        }

      }, error1 => {
        this.alert1 = false;
        this.alert2 = true;
        this.notify2 = 'Unsuccessful Trial !!!';
        console.log(error1);
      }
    );


  }
}
