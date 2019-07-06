import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import {DonationcenterService} from './donationcenter.service';
import {Donationcenter} from './donationcenter';
import {Router} from '@angular/router';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';
import {Branch} from '../branch/branch';
import {BranchService} from '../branch/branch.service';
import {AuthenticateService} from '../../authenticate/authenticate.service';

@Component({
  selector: 'app-donationcenter',
  templateUrl: './donationcenter.component.html',
  // styleUrls: ['./donationcenter.component.css'],
  styleUrls: ['./donationcenter.component.css'],
  providers: [DonationcenterService, BloodstockService, BranchService, AuthenticateService]
})
export class DonationcenterComponent implements OnInit {
  donationcenters: Donationcenter[] = [];
  donationcenter: Donationcenter = new Donationcenter();
  branches: Branch[] = [];
 updatedData: Donationcenter = new Donationcenter();
  errorMessage = '';
  alert1 = false;
  alert2 = false;
  notify1 = '';
  notify2 = '';
  modal = true;
  public selectedName = '';
  public selectedId = '';
  public selectedStatus= '';
  public selectedDcname = '';
  public selectedDcbranch = '';
  public selectedDccity = '';
  public selectedDcregion = '';
  public selectedDczone = '';
  public selectedDcworeda = '';
  public selectedDckebele = '';
  public currentrole;

  constructor(private donationcenterService: DonationcenterService, private authservice: AuthenticateService, private  router: Router, private branchservice: BranchService) {
  }

  ngOnInit(): void {

    this.currentrole = this.authservice.getCurrentUser().role;
    if (this.currentrole === 'Super Administrator') {
    } else if (this.currentrole === 'Branch Administrator') {
    }   else {
      this.router.navigate(['']);
    }
    this.pop();
    $(document).ready(function () {
      $('#example').DataTable({
        'scrollX': true,
      });
      $('.dataTables_length').addClass('bs-select');
      $('tr:odd').css('background-color', '#E5E5E5');
      $('tr:even:gt(0)').css('background-color', '#c7d4e5');
    });
  }


  pop() {
    this.branchservice.getBranches().subscribe(myres =>{
      const currentbranch = this.authservice.getCurrentUser().branchid;
      this.branches = myres as Branch[];
      this.selectedDcbranch = currentbranch;
      this.donationcenter.branch = currentbranch;
    });
    this.donationcenterService.getDonationcenters().subscribe( res => {
      console.log( res );
      this.donationcenters = res as Donationcenter[];

      for (const dcs of this.donationcenters){
        for (const br of this.branches){
          if (dcs.branch === br.id ) {
            dcs.branch = br.branchname;
          }
        }
      }
    }, err => {
      console.log( err );
    } );
  }

  onSubmit() {
    console.log(this.donationcenter);
    this.donationcenterService.createDonationcenter( this.donationcenter ).subscribe( res => {
      console.log( res.id );
      this.pop();
      this.router.navigate( ['/donationcenter'] );
      this.alert2 = false;
      this.alert1 = true;
      this.notify1 = 'Successfully Registered !!!';
      return this.router;
      // (<any>$('#addnew')).modal('hide');

    }, err => {
      this.alert1 = false;
      this.alert2 = true;
      this.pop();
      this.notify2 = 'Not Successful !!!';

      console.log( err );

    } );
  }

  public selectRow(index: number, post: any, value: string) {
    this.selectedId = post.id;
    this.selectedStatus = post.status;
    this.selectedDcname = post.dcname;
    this.selectedDcbranch = post.branch;
    this.selectedDccity = post.city;
    this.selectedDcregion = post.region;
    this.selectedDczone = post.zone;
    this.selectedDcworeda = post.woreda;
    this.selectedDckebele = post.kebele;
    // this.selectedName = 'post#' + index + ' ' + post.dcid;
       if (value === 'none') {

    } else if (value === 'delete') {
      this.onDelete();
    }
  }

  onUpdate() {

    this.updatedData = { id: this.selectedId, status: this.selectedStatus, dcname: this.selectedDcname, branch: this.selectedDcbranch,
      city: this.selectedDccity, region: this.selectedDcregion, zone: this.selectedDczone, woreda: this.selectedDcworeda, kebele: this.selectedDckebele};
    this.donationcenterService.updateDonationcenter( this.updatedData ).subscribe( res => {
      this.pop();
      this.alert2 = false;
      this.alert1 = true;
      this.clearFields();
      this.notify1 = 'Successfully Updated !!!';

    } , error1 => {
      this.alert1 = false;
      this.alert2 = true;
      this.pop();
      this.notify2 = 'Not Successful !!!';


    });
  };


  onDelete() {
    this.donationcenterService.deleteDonationcenter( this.selectedId ).subscribe( res => {
    this.pop();
      this.alert2 = false;
      this.alert1 = true;
      this.clearFields();
      this.notify1 = 'Successfully Deleted !!!';
    }, error => {
      this.alert1 = false;
      this.alert2 = true;
      this.pop();
      this.notify2 = 'Not Successful !!!';
    });
  };

  clearFields() {
  this.selectedId = '';
  this.selectedStatus = '';
  this.selectedDcname = '';
  this.selectedDcbranch = '';
  this.selectedDccity = '';
  this.selectedDcregion = '';
  this.selectedDczone = '';
  this.selectedDcworeda = '';
  this.selectedDckebele = '';
  }
}
