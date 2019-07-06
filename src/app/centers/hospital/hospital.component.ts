import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import {Hospital} from './hospital';
import {HospitalService} from './hospital.service';
import {Router} from '@angular/router';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';
import {AuthenticateService} from '../../authenticate/authenticate.service';


@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css', '../../../assets/css/jquery.dataTables.css'],
  providers: [HospitalService, BloodstockService, AuthenticateService]
})
export class HospitalComponent implements OnInit {
  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital();
  updatedData: Hospital = new Hospital();
  errorMessage = '';
  public tableWidget: any;

  public selectedName = '';
  public selectedId = '';
  public selectedHid = '';
  public selectedHname = '';
  public selectedbranchid = '';
  public selectedcity = '';
  public selectedregion = '';
  public selectedzone = '';
  public selectedworeda = '';
  public selectedkebele = '';
  public selectedtelephone = '';
  public selectedpobox = '';
  public selectedadministrator = '';
  public currentrole;

  constructor(private hospitalservice: HospitalService, private authservice: AuthenticateService, private  router: Router) {
  }

  ngOnInit(): void {
    this.pop();

    this.currentrole = this.authservice.getCurrentUser().role;
    if (this.currentrole === 'Super Administrator') {
    } else if (this.currentrole === 'Branch Administrator') {
    }   else {
      this.router.navigate(['']);
    }

    $(document).ready(function () {
      $('#example').DataTable({
        'scrollX': true,
      });
      $('.dataTables_length').addClass('bs-select');
      $('tr:odd').css('background-color', '#E5E5E5');
      $('tr:even:gt(0)').css('background-color', '#c7d4e5');
    });

    // $( document ).ready( function () {
    //   const dataTable = $( '#example' ).DataTable( {
    //     'scrollX': true,
    //
    //   } );
    //
    // });

  //
  //   $('#example')
  //     .removeClass('display')
  //     .addClass('table table-striped table-bordered');
  }


  pop() {
    this.hospitalservice.getHospitals().subscribe( res => {
      console.log( res );
      this.hospitals = res as Hospital[];
    }, err => {
      console.log( err );
    } );
  }

  onSubmit() {
    // console.log(this.hospital);
    this.hospitalservice.createHospital(this.hospital ).subscribe( res => {
      console.log( res.id );
      this.router.navigate( ['/hospital'] );

    }, err => {
      console.log( err );

      this.errorMessage = 'An Error Saving the Post';
    } );
  }

  public selectRow(index: number, post: any, value: string) {
    this.selectedId = post.id;
    this.selectedHid = post.hospitalid;
    this.selectedHname = post.hospitalname;
    this.selectedbranchid = post.branchid;
    this.selectedcity = post.city;
    this.selectedregion = post.region;
    this.selectedzone = post.zone;
    this.selectedworeda = post.woreda;
    this.selectedkebele = post.kebele;
    this.selectedtelephone = post.telephone;
    this.selectedpobox = post.pobox;
    this.selectedadministrator = post.administartor;

    // this.selectedName = 'post#' + index + ' ' + post.dcid;

    if (value === 'none') {

    } else if (value === 'delete') {
      this.onDelete();
    }
  }

  onUpdate() {

    this.updatedData = { id: this.selectedId, hospitalid: this.selectedHid, hospitalname: this.selectedHname, branchid: this.selectedbranchid,
      city: this.selectedcity, region: this.selectedregion, zone: this.selectedzone, woreda: this.selectedworeda, kebele: this.selectedkebele,
    telephone: this.selectedtelephone , pobox: this.selectedpobox, administrator: this.selectedadministrator};

    this.hospitalservice.updateHospital(this.updatedData).subscribe( res => {
      this.pop();
    } );
  };


  onDelete() {
    this.hospitalservice.deleteHospital(this.selectedId).subscribe( res => {
      this.pop();
    } );
  };
}
