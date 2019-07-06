import { Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {Transferblood} from '../../blood/transferblood/transferblood';
import {TransferbloodService} from '../../blood/transferblood/transferblood.service';
import '../../../assets/js/jquery.dcjqaccordion.2.7.js';
import '../../../assets/js/jquery.scrollTo.min.js';
import '../../../assets/js/jquery.nicescroll.js';
import {Router} from '@angular/router';
import {BranchService} from '../../centers/branch/branch.service';
import {Branch} from '../../centers/branch/branch';
import {Bloodstock} from '../../stock/bloodstock/bloodstock';
// import  .niceScroll from '../../../assets/js/jquery.nicescroll.js';


// import '../../../assets/js/common-scripts.js';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthenticateService, TransferbloodService, BranchService]
})
export class NavbarComponent implements OnInit {

  public currentrole;
  transferbloods: Transferblood[] = [];
  branches: Branch[] = [];

  constructor(private  authservice: AuthenticateService, private branchservice: BranchService, private router: Router, private transferbloodservice: TransferbloodService) {
  }

  ngOnInit() {
    this.pop();

    this.currentrole = this.authservice.getCurrentUser().role;

    let script = function () {


      $(function () {
        function responsiveView() {
          const wSize = $(window).width();
          if (wSize <= 768) {
            $('#container').addClass('sidebar-close');
            $('#sidebar > ul').hide();
          }

          if (wSize > 768) {
            $('#container').removeClass('sidebar-close');
            $('#sidebar > ul').show();
          }
        }

        $(window).on('load', responsiveView);
        $(window).on('resize', responsiveView);
      });
      $('.fa-bars').click(function () {
        if ($('#sidebar > ul').is(':visible') === true) {
          $('#main-content').css({
            'margin-left': '0px'
          });
          $('#sidebar').css({
            'margin-left': '-210px'
          });
          $('#sidebar > ul').hide();
          $('#container').addClass('sidebar-closed');
        } else {
          $('#main-content').css({
            'margin-left': '210px'
          });
          $('#sidebar > ul').show();
          $('#sidebar').css({
            'margin-left': '0'
          });
          $('#container').removeClass('sidebar-closed');
        }
      });

      // $('#sidebar').niceScroll({
      //   styler: "fb",
      //   cursorcolor: "#4ECDC4",
      //   cursorwidth: '3',
      //   cursorborderradius: '10px',
      //   background: '#404040',
      //   spacebarenabled: false,
      //   cursorborder: ''
      // });


    }();


  }

  pop() {

    this.branchservice.getBranches().subscribe( branchres =>{
      this.branches = branchres as Branch[];
    })

    this.transferbloodservice.getTransfer().subscribe( res => {

      this.transferbloods = res as Transferblood[];
      for (const tb of this.transferbloods){
        for (const br of this.branches){
          if (tb.requestbranchid === br.id ){
            tb.requestbranchid = br.branchname;
          }
        }
      }
;
    });
   }


  logout() {
    // console.log('Done');
    this.authservice.logout().subscribe(res => {
      console.log('Yeah');
      this.router.navigate(['/']);
    },
    error1 => {
      console.log(error1);
    });
  }



}
