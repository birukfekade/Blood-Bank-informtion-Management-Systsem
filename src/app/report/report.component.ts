import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import {Bloodstock} from '../stock/bloodstock/bloodstock';
import {Branch} from '../centers/branch/branch';
import {BloodstockService} from '../stock/bloodstock/bloodstock.service';
import {AuthenticateService} from '../authenticate/authenticate.service';
import {Router} from '@angular/router';
import {BranchService} from '../centers/branch/branch.service';
import {Report} from './report';
import {ReportService} from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
 providers: [BloodstockService, BranchService, AuthenticateService, ReportService]
})
export class ReportComponent implements OnInit {
  bloodstocks: Bloodstock[] = [];
  branches: Branch[] = [];
  reports: Report[] = [];
  currentrole;

  constructor( private authservice: AuthenticateService, private reportservice: ReportService,
              private router: Router, private branchservice: BranchService) {}

  ngOnInit() {

    this.currentrole = this.authservice.getCurrentUser().role;
    if (this.currentrole === 'Super Administrator') {
    } else if (this.currentrole === 'Branch Administrator') {
    }   else {
      this.router.navigate(['']);
    }

    $(document).ready(function () {
      $('#dtBasicExample').DataTable({
        'scrollX': true,
      });
      $('.dataTables_length').addClass('bs-select');
      $('tr:odd').css('background-color', '#E5E5E5');
      $('tr:even:gt(0)').css('background-color', '#c7d4e5');
    });
    this.pop();
  }

  pop() {

    this.reportservice.getReports().subscribe( res => {
      this.reports = res as Report[];
      // console.log(this.reports, "Reports")
    });
  }

}
