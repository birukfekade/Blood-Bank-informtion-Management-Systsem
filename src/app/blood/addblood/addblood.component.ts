import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Bloodstock} from '../../stock/bloodstock/bloodstock';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';
import {AddbloodService} from './addblood.service';
import {Branch} from '../../centers/branch/branch';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {Report} from '../../report/report';
import {ReportService} from '../../report/report.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-addblood',
  templateUrl: './addblood.component.html',
  styleUrls: ['./addblood.component.css'],
  providers: [BloodstockService, AddbloodService, AuthenticateService, ReportService]
})
export class AddbloodComponent implements OnInit {
  public bloodadded;
  public bloodused;
  stocks: Bloodstock[] = [];

  bloodstock: Bloodstock = new Bloodstock();
  report: Report = new Report();
  newval;
  recent;

  public notify1 = '';
  public alert1= false;
  public notify2 = '';
  public alert2 = false;
  currentrole = this.authservice.getCurrentUser().role;

  constructor(private bloodstockservice: BloodstockService, private authservice: AuthenticateService,
              private addbloodservice: AddbloodService, private router: Router, private reportservice: ReportService) {
  }

  ngOnInit() {

    if (this.currentrole === 'Blood Collector') {
    } else if (this.currentrole === 'Laboratory Techninician') {

    }else {
      this.router.navigate(['']);
    }

    this.bloodstockservice.getBloodstock(this.authservice.getCurrentUser().branchid).subscribe(res => {
      console.log(res);
      this.stocks = res as Bloodstock[];
    }, err => {
      console.log(err);
    });


    // this.bloodstock.id = '5ccbe92dc87735419c995872';
    // this.bloodstock.branchid = 'bra 41';
    // this.bloodstock.stockid = "stock 1245";

  }

  onSubmit() {
    console.log(this.bloodstock);
    // this.bloodstock.available = String(256 + this.newval);
    this.bloodstockservice.updateBloodstock(this.bloodstock).subscribe(res => {
      console.log(res.id);
      this.router.navigate(['/addblood']);

    }, err => {
      console.log(err);

      // this.errorMessage = 'An Error Saving the Post';
    });
  }

  addBlood() {
    this.addbloodservice.getAviliableBlood(this.bloodstock.id).subscribe(res => {
        this.recent = res;
        this.bloodstock.id = this.recent.id;
        this.bloodstock.available = this.recent.available;
        this.bloodstock.available = this.bloodstock.available + this.newval;
        this.bloodstock.type = this.recent.type;
      this.bloodstock = {id: this.bloodstock.id, available: this.bloodstock.available, type: this.bloodstock.type};

      console.log(this.bloodstock);
        this.addbloodservice.addBlood(this.bloodstock).subscribe(res2 => {
this.report.action = 'Add Blood';
this.report.amount = this.newval;
this.report.actiondate = Date.now();
this.report.center = this.authservice.getCurrentUser().branchid;
this.report.doneby = this.authservice.getCurrentUser().id;

   this.reportservice.createReport(this.report).subscribe( repres => {

   });

          // console.log(this.bloodstock);
          this.alert2 = false;
          this.alert1 = true;
          this.notify1 = 'Successfully Added !!!';
        }, error1 => {
          this.alert1 = false;
          this.alert2 = true;
          this.notify2 = 'Unsuccessful Trial !!!';
          console.log(error1);
        });
      }, error1 => {
      this.alert1 = false;
      this.alert2 = true;
      this.notify2 = 'Unsuccessful Trial !!!';
        console.log(error1);
      }
    );

  }



}
