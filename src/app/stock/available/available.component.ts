import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BloodstockService} from '../bloodstock/bloodstock.service';
import {Bloodstock} from '../bloodstock/bloodstock';
import {Donor} from '../../user/donor/donor';
import {Branch} from '../../centers/branch/branch';
import {BranchService} from '../../centers/branch/branch.service';
import {AuthenticateService} from '../../authenticate/authenticate.service';

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css'],
  providers : [BloodstockService, BranchService, AuthenticateService]

})
export class AvailableComponent implements OnInit {
  bloodstocks: Bloodstock[] = [];
  branches: Branch[] = [];

  constructor(private bloodstockservice: BloodstockService, private authservice: AuthenticateService,
              private router: Router, private branchservice: BranchService) {}

  ngOnInit() {
    this.pop();
  }
  pop() {

    this.branchservice.getBranches().subscribe( res => {
      this.branches = res as Branch[];
    })
    this.bloodstockservice.getBloodstock(this.authservice.getCurrentUser().branchid).subscribe( res =>{

      this.bloodstocks = res as Bloodstock[];
      for (const stock of this.bloodstocks){
        for (const br of this.branches){
          if (stock.branchId === br.id ){
            stock.branchId = br.branchname;
          }
        }
      }
      console.log(this.bloodstocks);
    });
  }

}
