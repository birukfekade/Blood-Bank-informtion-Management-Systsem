import { Component, OnInit } from '@angular/core';
import {Transferblood} from './transferblood';
import {TransferbloodService} from './transferblood.service';
import {Branch} from '../../centers/branch/branch';
import { Router} from '@angular/router';
import {BranchService} from '../../centers/branch/branch.service';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {Bloodstock} from '../../stock/bloodstock/bloodstock';
import {AddbloodService} from '../addblood/addblood.service';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';
import {ReportService} from '../../report/report.service';
import {Report} from '../../report/report';

@Component({
  selector: 'app-transferblood',
  templateUrl: './transferblood.component.html',
  styleUrls: ['./transferblood.component.css'],
  providers: [TransferbloodService, BranchService, AuthenticateService, AddbloodService, BloodstockService, ReportService]
})
export class TransferbloodComponent implements OnInit {
  branches: Branch[] = [];
  transferblood: Transferblood= new Transferblood();
  transferbloods: Transferblood[] = [];
  recent;
  bloodstocks: Bloodstock[] = [];
  bloodstock: Bloodstock = new Bloodstock();
  providestockid;
  requestbra;
  notify;
  alert1 = false;
  alert2 = false;
  report: Report = new Report();

  constructor( private authservice: AuthenticateService, private transferbloodservice: TransferbloodService,
               private branchservice: BranchService, private router: Router, private addbloodService: AddbloodService,
               private bloodstockservice: BloodstockService, private reportservice: ReportService) { }
  ngOnInit() {


    this.branchservice.getBranches().subscribe(res => {
      this.branches = res as Branch[];
    });

  }
  onAskBlood() {
    console.log(this.transferblood);
    this.transferblood.requestbranchid = this.authservice.getCurrentUser().branchid;
    this.transferblood.status = false;
    this.transferblood.privodedamount = 0;
    this.transferbloodservice.askBlood(this.transferblood).subscribe( res => {
      // console.log( res.id );
      this.router.navigate( ['/transferblood'] );
      this.transferblood = null;
      this.alert1 = true;
      this.alert2 = false;
      this.notify = 'Successfull';
    }, err => {
    this.alert1 = false;
    this.alert2 = true;
this.notify = 'Not Successful !!!';
    } );
  }




  onProvide() {
    this.transferblood.providerbranchid = this.authservice.getCurrentUser().branchid;
    this.transferblood.status = false;
    this.transferblood.type = 'A+';
    console.log(this.transferblood.providerbranchid, 'provider');
    console.log(this.transferblood.type, 'Type');
    console.log(this.transferblood.privodedamount , 'Provided');
    this.transferblood.requestedamount = this.transferblood.privodedamount;
    this.transferbloodservice.getSpecificTransfer(this.transferblood.privodedamount, this.transferblood.status).subscribe(res => {
this.transferbloods = res as Transferblood[];

for (const tb of this.transferbloods){
  if (tb.requestbranchid === this.transferblood.requestbranchid && tb.providerbranchid === this.transferblood.providerbranchid
    && tb.type === this.transferblood.type) {


    // First Let's get stock id of branch provider

    this.bloodstockservice.getFilteredBloodstock(this.transferblood.providerbranchid).subscribe( resu => {
        this.bloodstocks = resu as Bloodstock[];
        for (let bs of this.bloodstocks){
          if (bs.type === this.transferblood.type) {
        this.providestockid = bs.id;
            //Remove Blood from provider
            this.bloodstock.id = bs.id;
            this.bloodstock.available = bs.available - this.transferblood.privodedamount + 5;
            this.bloodstock.type = bs.type;
            if (this.bloodstock.available > tb.privodedamount) {
              this.recent = null;
              this.transferbloodservice.getBlood(this.bloodstock).subscribe(res2 => {
            ;
              }, error1 => {

                console.log(error1);
              });
            }

          }
        }
      });

      //Second lets get stock id of reciver

      this.bloodstockservice.getFilteredBloodstock(this.transferblood.requestbranchid).subscribe( resu => {
        this.bloodstocks = resu as Bloodstock[];
        for (let bs of this.bloodstocks){
          if (bs.type === this.transferblood.type) {
            this.requestbra = bs.id;
            this.bloodstock.id = bs.id;
        this.bloodstock.available = bs.available;
        this.bloodstock.available = this.bloodstock.available + this.transferblood.privodedamount + 2;
        this.bloodstock.type = bs.type;
        this.bloodstock = {id: this.bloodstock.id, available: this.bloodstock.available, type: this.bloodstock.type};

        this.addbloodService.addBlood(this.bloodstock).subscribe(res2 => {

        }, error1 => {
          console.log(error1);
        });
          }
        }
      });


//Transfer blood to system
    this.transferblood.status = true;

  this.transferbloodservice.bloodTransaction(this.transferblood, tb.id).subscribe( res1 => {
    // console.log(tb.id, "Transfer id");


    this.report.action = 'Transfer Blood to ';
    this.report.amount = tb.privodedamount;
    this.report.actiondate = Date.now();
    this.report.center = tb.requestbranchid;
    this.report.doneby = this.authservice.getCurrentUser().id;

    this.reportservice.createReport(this.report).subscribe( repres => {
console.log('Yeah it is successful !!!');

    });
    this.alert1 = true;
    this.alert2 = false;
    this.notify = 'Successfull !!!';
    } , error1 => {
    this.alert1 = false;
    this.alert2 = true;
    this.notify = 'Not successful!!!';
  });


    }
}


    }, error1 => {
      this.alert1 = false;
      this.alert2 = true;
      this.notify = 'Not successful!!!';
    });
  }
}
