import { Component, OnInit } from '@angular/core';
import {Donationhistory} from './donate';
import {DonateService} from './donate.service';

import {Router} from '@angular/router';
import * as $ from 'jquery';
import {Donationcenter} from '../../centers/donationcenter/donationcenter';
import {DonorService} from '../../user/donor/donor.service';
import {Donor} from '../../user/donor/donor';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';
import {AuthenticateService} from '../../authenticate/authenticate.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css'],
  providers: [DonateService, DonorService, BloodstockService, AuthenticateService]
})
export class DonateComponent implements OnInit {

  donations: Donationhistory[] = [];
  donate: Donationhistory = new Donationhistory();
  donationcenters: Donationcenter[] = [];
  donors: Donor[] = [];
  errorMessage = '';
  public searchid;
  sfname;
  slname;
  sgfname;
  sphone;
  currentrole;
  public  currentdonor;
  public tableWidget: any;



  constructor(private donateservice: DonateService, private  router: Router, private authservice: AuthenticateService, private donorService: DonorService) {
  }

  ngOnInit(): void {
    this.currentrole = this.authservice.getCurrentUser().role;
    if (this.currentrole === 'Blood Collector') {
    } else {
      this.router.navigate(['']);
    }
    this.pop();


    $( document ).ready( function () {


      const dataTable = $( '#example' ).DataTable( {
        'scrollX': true,
        // 'ajax': {
        //   url : this.dona ,
        // }
      } );

    } );

    // const exampleId: any = $('#example');
    // this.tableWidget = exampleId.DataTable({
    //   select: true,
    //   'scrollX': true,
    // });
    $( '#example' )
      .removeClass( 'display' )
      .addClass( 'table table-striped table-bordered' );
  }

  //
  pop() {
    this.donateservice.getActiveDonationCenter().subscribe( res => {
      console.log( res );
      this.donationcenters = res as Donationcenter[];
    }, err => {
      console.log( err );
    } );
  }

  onsearch(){
    this.donorService.getDonors().subscribe( res =>{
      console.log(res);
      this.donors = res;
 for (let ds of this.donors) {
   if (ds.donorid === this.searchid)
   {
    this.currentdonor = ds.id;
     this.sfname = ds.firstname;
     this.slname = ds.lastname;
     this.sgfname = ds.gfathername;
     this.sphone = ds.phone;
   }
 }
    });
  }

  onSubmit() {
    // this.donate.branchid = '265';
    // this.donate.donorid = 'Donor 265';
    // this.donate.amount = 1545;
    // this.donate.d
    console.log( this.donate );
      this.donateservice.createDonate(this.donate , this.currentdonor).subscribe( res => {
        console.log( res.id );
        this.router.navigate( ['/donate'] );

      }, err => {
        console.log( err );

        this.errorMessage = 'An Error Saving the Post';
      } );

  }
  ontry() {
    this.donateservice.getActiveDonationCenter().subscribe( res => {
      console.log(res);
    }, error1 => {
      console.log(error1);
    });
  }
}
