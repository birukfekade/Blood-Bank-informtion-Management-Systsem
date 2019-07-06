import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Staff} from './staff';
import {StaffService} from './staff.service';
import {Router} from '@angular/router';
import {User} from '../../authenticate/user';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {BranchService} from '../../centers/branch/branch.service';
import {Branch} from '../../centers/branch/branch';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';
import {Bloodstock} from '../../stock/bloodstock/bloodstock';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css', '../../../assets/css/jquery.dataTables.css'],
  providers: [StaffService, BranchService, BloodstockService]
})
export class StaffComponent implements OnInit {
  staffs: Staff[] = [];
  staff: Staff = new Staff();
  user: User = new User();
  users: User[] = [];
  updatedData: Staff = new Staff();
  branches: Branch[] = [];
  errorMessage = '';
  public tableWidget: any;
  public  casted;
public currentrole;

  public selectedId = '';
  public selectedStaffId = '';
  public selectedfname = '';
  public selectedlname = '';
  public selectedgname = '';
  public selectedsex = '';
  public selectedtitle = '';
  public selectedbranchId = '';
  public selectedtelephone = '';
  public selectedphonenumber = '';
  public selectedemail = '';
  public selectedpobox = '';

constructor(private staffservice: StaffService , private authservice: AuthenticateService,
            private branchservice: BranchService, private  router: Router) {
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

  }


  pop() {


    this.branchservice.getBranches().subscribe( res => {
      console.log(res);
      this.branches = res as Branch[];
    }, error => {
      console.log(error);
    } );
    this.staffservice.getStaffs().subscribe( res =>{

      this.staffs = res as Staff[];
      for (const staf of this.staffs){
        for (const br of this.branches){
          if (staf.branchId === br.id ){
            staf.branchId= br.branchname;
          }
        }
      }
      // console.log(this.bloodstocks);
    });


    // this.staffservice.getStaffs().subscribe( res => {
    //   console.log( res );
    //   this.staffs = res as Staff[];
    // }, err => {
    //   console.log( err );
    // } );



    // this.staffservice.getAccounts().subscribe(res => {
    //   console.log(res);
    // });
  }

  register(user: User) {
    this.authservice.register(this.user).subscribe( resu => {
      this.router.navigate( ['/staff'] );
      console.log('Registerd');
    }, error1 => {
      console.log(error1);
    });
  }

  onSubmit() {
    console.log(this.staff);
    this.staff.branchId = this.authservice.getCurrentUser().branchid;
    this.staffservice.createStaff( this.staff ).subscribe( res => {

      this.user.email = res.email;
      this.user.password = '12345';
      this.user.branchid = res.branchId;
      this.user.role = res.title;
      this.user.staffid = res.id;
      this.register(this.user);

      // this.router.navigate( ['/staff'] );

    }, err => {
      console.log( err );

      this.errorMessage = 'An Error Saving the Post';
    } );
  }

  public selectRow(index: number, post: any, value: string) {
    this.selectedId = post.id;
    this.selectedStaffId = post.staffid;
    this.selectedfname = post.firstname;
    this.selectedlname = post.lastname;
    this.selectedgname = post.gfathername;
    this.selectedsex = post.sex;
    this.selectedtitle = post.title;
    this.selectedbranchId = post.branchId;
    this.selectedtelephone = post.telephone;
    this.selectedphonenumber = post.phonenumber;
    this.selectedemail = post.email;
    this.selectedpobox = post.pobox;

    if (value === 'none') {

    } else if (value === 'delete') {
      this.onDelete();
    }
  }

  onUpdate() {

   // this.updatedData = { id: this.selectedId, staffid: this.selectedStaffId, firstname: this.selectedfname, lastname: this.selectedlname, gfathername: this.selectedgname,
   //    sex: this.selectedsex, title: this.selectedtitle, branchId: this.selectedbranchId, telephone: this.selectedtelephone, phonenumber: this.selectedphonenumber,
   //    email: this.selectedemail, pobox: this.selectedpobox };
   this.authservice.getSpecificUserId().subscribe( ress => {
       this.users = ress as User[];
       for (let urs of this.users){
         if (urs.staffid === this.selectedId){
           // console.log(urs.id, "myress");
           this.user.id = urs.id;
           this.user.role = this.selectedtitle;
           this.user.branchid = this.selectedbranchId;
           this.user.staffid = this.selectedId;
           this.user.email = this.selectedemail;
           this.authservice.updateUser(this.user).subscribe(resupdate => {
console.log("UPDATED");
           }, Error => {
             console.log(Error, "Update Error");
           });
         }
       }

   });

    // this.staffservice.updateStaff( this.updatedData ).subscribe( res => {
    //   this.pop();
    // } );
  };
ontry(){
  this.authservice.getSpecificUserId().subscribe( res => {
    console.log(res);
    this.users = res as User[];

    for (let ur of this.users){
      console.log(ur.id);
    }
    console.log(this.user.id);
    // if(res.staffid === '5cfc9ba4ab8518333c1e8e1c'){
    //    console.log(res.id);
    // }

  });
}

  onDelete() {
    this.staffservice.deleteStaff( this.selectedId ).subscribe( res => {
      this.pop();
    } );
  };

  updateUser() {
    this.user = {};
    this.authservice.updateUser(this.user);
  }

  castname(name: String) {
// this.casted;
// const len = this.branches.length;
// const init = 0;
for (const dc of this.branches) {
  if (dc.branchname === name) {
    this.casted = dc.branchname;
  }
}
  }
// while (init <= len) {
//   if(name === this.branches.)
//   init++;
// }
//   }


}
