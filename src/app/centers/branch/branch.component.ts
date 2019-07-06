// import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// import 'datatables.net';
// import {Branch} from './branch';
// import {BranchService} from './branch.service';
// import {Router} from '@angular/router';
// import {Donationcenter} from '../../bbims/post';
//
// @Component({
//   selector: 'app-branch',
//   templateUrl: './branch.component.html',
//   styleUrls: ['./branch.component.css', '../../../assets/css/jquery.dataTables.css' ],
//   providers: [BranchService]
// })
//
// export class BranchComponent implements OnInit {
//   branches: Branch[] = [];
//   branch: Branch = new Branch();
//   bra: Branch = new Branch();
//   updatedData: Branch = new Branch();
//   errorMessage = '';
//   public tableWidget: any;
//
//   public selectedId = '5ccde6d5d74a722654a83d86';
//   public selectedbranchid = 'shgdh';
//   public selectedbranchname = 'sdakjh';
//   public selectedcity = 'hjags';
//   public selectedregion = 'sad,mnd';
//   public selectedzone = 'dsh';
//   public selectedworeda = 'sdah';
//   public selectedkebele = 'san';
//   public selectedtelephone = 'dsajhgd';
//   public selectedpobox = 'sahd';
//   public selectedadministrator = 'dshgf';
//
//   constructor(private branchservice: BranchService, private  router: Router) {
//   }
//
//   ngOnInit(): void {
//     this.pop();
//
//
//     $( document ).ready( function () {
//       const dataTable = $( '#example' ).DataTable( {
//         'scrollX': true,
//         // 'ajax': {
//         //   url : this.dona ,
//         // }
//       } );
//
//     });
//
//     // const exampleId: any = $('#example');
//     // this.tableWidget = exampleId.DataTable({
//     //   select: true,
//     //   'scrollX': true,
//     // });
//     $('#example')
//       .removeClass('display')
//       .addClass('table table-striped table-bordered');
//   }
//
//
//   pop() {
//     this.branchservice.getBranch().subscribe( res => {
//       console.log( res );
//       this.branches = res as Branch[];
//     }, err => {
//       console.log( err );
//     } );
//   }
//
//   onSubmit() {
//
//     this.branch.branchname = 'Okay'
//     this.branch.pobox = '205'
//     this.branch.telephone = 'asd'
//     this.branch.administrator = 'yesuf'
//     this.branch.city = 'sfd'
//     this.branch.zone = 'sd'
//     this.branch.region = 'reg'
//     this.branch.kebele = 'asdsd'
//     this.branch.woreda = 'jksd'
//     console.log(this.branch);
//     this.branchservice.createBranch(this.branch).subscribe( res => {
//       console.log( this.branch);
//       this.router.navigate( ['/branch'] );
//
//     }, err => {
//       console.log( err );
//
//       this.errorMessage = 'An Error Saving the Post';
//     } );
//   }

//
// }
//

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import {BranchService} from './branch.service';
import {Branch} from './branch';
import {Staff} from '../../user/staff/staff';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';
import {Bloodstock} from '../../stock/bloodstock/bloodstock';
import {Router} from '@angular/router';
import {AuthenticateService} from '../../authenticate/authenticate.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  // styleUrls: ['./branch.component.css'],
  styleUrls: ['./branch.component.css'],
  providers: [BranchService, BloodstockService, AuthenticateService]
})
export class BranchComponent implements OnInit {
branches: Branch[] = [];
  staffs: Staff[] = [];
  stock: Bloodstock= new Bloodstock();
  branch: Branch = new Branch();
  updatedData: Branch = new Branch();
  dg = this.branchService.getBranchAdmins();
  errorMessage = '';

  public selectedId = '';
  public selectedbranchname = '';
  public selectedcity = '';
  public selectedregion = '';
  public selectedzone = '';
  public selectedworeda = '';
  public selectedkebele = '';
  public selectedtelephone = '';
  public selectedpobox = '';
  public selectedadministrator = '';
  public currentrole;


  constructor(private branchService: BranchService, private  router: Router ,
             private authservice: AuthenticateService, private stockservice: BloodstockService) {
  }

  ngOnInit(): void {
    this.pop();

    this.currentrole = this.authservice.getCurrentUser().role;
    if (this.currentrole === 'Super Administrator') {
    }   else {this.router.navigate(['']);}

    $(document).ready(function () {
      $('#example').DataTable({
        'scrollX': true,
      });
      $('.dataTables_length').addClass('bs-select');
      $('tr:odd').css('background-color', '#E5E5E5');
      $('tr:even:gt(0)').css('background-color', '#c7d4e5');
    });

    // const exampleId: any = $('#example');
    // this.tableWidget = exampleId.DataTable({
    //   select: true,
    //   'scrollX': true,
    // });
    $('#example')
      .removeClass('display')
      .addClass('table table-striped table-bordered');
  }

  pop() {
    this.branchService.getBranches().subscribe( res => {
      console.log( res );
      this.branches = res as Branch[];
      // this.branches = this.branches.filter();
    }, err => {
      console.log( err );
    } );

    this.branchService.getBranchAdmins().subscribe( res => {
      console.log( res );
      // res.filter( 'where:'m {firstname: 'fullsize'});
      this.staffs = res as Staff[];
    }, err => {
      console.log( err );
    } );
  }


  onSubmit() {

    console.log(this.branch);
    this.branchService.createBranch( this.branch ).subscribe( res => {
      console.log( res.id );
      this.router.navigate( ['/branch'] );

    }, err => {
      console.log( err );

      this.errorMessage = 'An Error Saving the Post';
    } );
  }


  public selectRow(index: number, post: any, value: string) {
    this.selectedId = post.id;
    this.selectedbranchname = post.branchname;
    this.selectedcity = post.city;
    this.selectedregion = post.region;
    this.selectedzone = post.zone;
    this.selectedworeda = post.woreda;
    this.selectedkebele = post.kebele;
    this.selectedtelephone = post.telephone;
    this.selectedpobox = post.pobox;
    this.selectedadministrator = post.administrator;
    // this.selectedName = 'post#' + index + ' ' + post.dcid;
    if (value === 'none') {

    } else if (value === 'delete') {
      this.onDelete();
    }
  }

  onUpdate() {

    this.updatedData = { id: this.selectedId, branchname: this.selectedbranchname, city: this.selectedcity, region: this.selectedregion, zone: this.selectedzone, woreda: this.selectedworeda, kebele: this.selectedkebele,
      telephone: this.selectedtelephone, pobox: this.selectedpobox, administrator: this.selectedadministrator};

    this.branchService.updateBranch( this.updatedData ).subscribe( res => {
      this.pop();


    } );
  };


  onDelete() {
    this.branchService.deleteBranch(this.selectedId).subscribe( res => {
      this.pop();
    } );
  };


}
