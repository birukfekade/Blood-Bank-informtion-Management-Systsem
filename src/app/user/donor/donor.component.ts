import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import {Donor} from './donor';
import {Staff} from '../staff/staff';
import {DonorService} from './donor.service';
import {Router} from '@angular/router';
import {DateFormatter} from '@angular/common/src/pipes/intl';
import {StaffService} from '../staff/staff.service';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';
import {AuthenticateService} from '../../authenticate/authenticate.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css', '../../../assets/css/jquery.dataTables.css'],
  providers: [DonorService, StaffService, BloodstockService, AuthenticateService]
})
export class DonorComponent implements OnInit {
public trialdate;
  public tableWidget: any;
  donors: Donor[] = [];
  dnrs: Donor[] = [];
  updatedData: Donor = new Donor();
  donor: Donor = new Donor();
  recent;
  currentrole;
  dnrid;

public selectedid = '';
public selecteddonorid = '';
public  selectedfirstname = '';
public  selectedlastname = '';
public  selectedgfather = '';
public  selectedgtitle = '';
public  selectedregdate = '';
public selectedage = '';
public selectedsex = '';
public selectedoccupation = '';
public selectedcity = '';
public  selectedregion = '';
public selectedzone = '';
public  selectedworeda = '';
public  selectedkebele = '';
public  selectedhouse = '';
public selectedresidence = '';
public selectedoffice = '';
public selectedphone = '';
public selectedemail = '';
public selectedpobox = '';
public selectedblood = '';

  // today = Date();
  internalDate = new Date;

  constructor(private donorservice: DonorService, private authservice: AuthenticateService, private staffservice: StaffService, private  router: Router) { }

  ngOnInit() {

    this.currentrole = this.authservice.getCurrentUser().role;
    if (this.currentrole === 'Blood Collector') {
    } else if (this.currentrole === 'Laboratory Technician') {
    }   else {
      this.router.navigate(['']);
    }
    this.pop();
    $(document).ready(function () {
      const dataTable = $('#example').DataTable({
        'scrollX': true,
      });
    });

  }
  pop() {

    this.donorservice.getDonors().subscribe(res => {
      console.log(res);
      this.recent = res;
      this.donor.sex = 'Male';
      // this.recent.sex = 'male';
      this.dnrs = this.recent as Donor[];
      for (const dean of this.dnrs){
             const reg = new Date(dean.regdate);
             dean.regdate = reg.toDateString();

         const day = new Date();

        const myage = new Date(dean.age);

        let age = day.getFullYear() - myage.getFullYear();
        const m = day.getMonth() - myage.getMonth();
        // if (m < 0 || (m === 0 && day.getDate() < myage.getDate())) {
        //   age--;
        // //   console.log(age,"Age")
        // }
        dean.age = age;

          // else {
        //   dean.age = 0;
        // }
      }
      this.donors = this.dnrs;
    }, err => {
      console.log(err);
    });
    // this.staffservice.getStaffs().subscribe(res => {
    //   console.log(res);
    // }, error1 => {
    //   console.log(error1);
    // });

  }

  onUpdate() {
     this.updatedData = { id: this.selectedid, donorid: this.selecteddonorid, firstname: this.selectedfirstname, lastname: this.selectedlastname,
      gfathername: this.selectedgfather, title: this.selectedgtitle,age: this.selectedage, sex: this.selectedsex, occupation: this.selectedoccupation,
      city: this.selectedcity, region: this.selectedregion, zone: this.selectedzone, woreda: this.selectedworeda, kebele:this.selectedkebele,
      housenumber: this.selectedhouse, telephoneresidence: this.selectedresidence, telephoneoffice:this.selectedoffice, phone: this.selectedphone,
      email: this.selectedemail, pobox: this.selectedpobox, bloodtype: this.selectedblood};
  }

  onDelete() {
    this.donorservice.deleteDonor(this.selectedid).subscribe( res => {
      this.pop();
    } );
  };


  onSubmit() {
    console.log(this.donor);
    this.donorservice.createDonor( this.donor ).subscribe( res => {
      console.log( res.id );
      this.router.navigate( ['/donor'] );

    }, err => {
      console.log( err );
    } );
  }

  ontry() {
    const  today = new  Date();
    // const b = a.getDate();
    // const c = a.toISOString();
    // console.log(a.toISOString());
    // console.log(today.toDateString(),'Heyy');
    console.log(today.getDate(), 'Heyy');

    // this.trialdate = this.today.toISOString().substr(0, 10);
// this.trialdate.subscribe(value => this.internalDate = new Date(value))
    this.internalDate = new Date(this.trialdate);
    // const birthday = this.internalDate;

    // this.internalDate = new Date(this.trialdate).;
    // this.trialdate = new Date().toISOString();
    // console.log(this.trialdate , 'trial');
    // console.log(this.internalDate , 'internal');
    // console.log(today.toDateString(), 'toda');
    //
    // console.log(birthday , 'vstria');

    // var dob = //Here Im getting dob

     this.donor.donorid = 'donor668';
    // this.donor.donorid = 'string';
    //  this.donor.firstname = 'string';
    //   this.donor.lastname = 'string';
    //   this.donor.gfathername = 'string';
    //   this.donor.title = 'string';
      this.donor.regdate = today;
    this.donor.age = new Date(this.donor.age); ;

    // this.donor.sex = 'string';
    //   this.donor.occupation = 'string';
    //   this.donor.city = 'string';
    //   this.donor.region = 'string';
    //   this.donor.zone = 'string';
    //   this.donor.woreda = 'string';
    //   this.donor.kebele = 'string';
    //   this.donor.housenumber = 'string';
    //   this.donor.telephoneresidence = 'string';
    //   this.donor.telephoneoffice = 'string';
    //   this.donor.phone = 'string';
    //   this.donor.email = 'string@gmail.com';
    //   this.donor.pobox = 'string';
    //   this.donor.bloodtype = 'string';
this.donorservice.createDonor(this.donor).subscribe( res => {
  console.log(res);
}, error1 => {
  console.log(error1);
});

  }




  public selectRow(index: number, post: any, value: string) {

    this.selectedid = post.id;
    this.selecteddonorid = post.donorid;
     this.selectedfirstname = post.firstname;
      this.selectedlastname = post.lastname;
      this.selectedgfather = post.gfathername;
      this.selectedgtitle = post.title;
    this.selectedregdate = post.gfathername;
    this.selectedage = post.age;
    this.selectedsex = post.sex;
    this.selectedoccupation = post.occupation;
    this.selectedcity = post.city;
    this.selectedregion = post.region;
    this.selectedzone = post.zone;
    this.selectedworeda = post.woreda;
    this.selectedkebele = post.kebele;
    this.selectedhouse = post.housenumber;
   this.selectedresidence = post.telephoneresidence;
   this.selectedoffice = post.telephoneoffice;
   this.selectedphone = post.phone;
this.selectedemail = post.email;
this.selectedpobox = post.pobox;
this.selectedblood = post.bloodtype;

    if (value === 'none') {

    } else if (value === 'delete') {
      // this.onDelete();
    }
  }

  try(){
    this.donorservice.getDonors().subscribe( res => {
      this.donors = res as Donor[];
      for (const drs of this.donors){
        drs.donorid;
      }
    });
  }

}
