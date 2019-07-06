import { Component, OnInit , OnDestroy} from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
// import {DatatablesModule} from '@a'
import {Bloodstock} from './bloodstock';
import {BloodstockService} from './bloodstock.service';
import {AuthenticateService} from '../../authenticate/authenticate.service';

@Component({
  selector: 'app-bloodstock',
  templateUrl: './bloodstock.component.html',
  styleUrls: ['./bloodstock.component.css'],
  providers: [BloodstockService]
})
export class BloodstockComponent implements OnInit {

  stock: Bloodstock= new Bloodstock();
  public getstock;
  // public data =
  //   [{
  //     'name': 'Anna',
  //     'age': '20',
  //     'lastName': 'Konda'
  //
  //   },
  //     {
  //       'name': 'Selomon',
  //       'age': '36',
  //       'lastName': 'Kelemu'
  //     },
  //     {
  //       'name': 'Zekariyas',
  //       'age': '58',
  //       'lastName': 'Feysel'
  //     },
  //
  //     {
  //       'name': 'Anna',
  //       'age': '20',
  //       'lastName': 'Konda'
  //     },
  //     {
  //       'name': 'Selomon',
  //       'age': '36',
  //       'lastName': 'Kelemu'
  //     },
  //     {
  //       'name': 'Zekariyas',
  //       'age': '58',
  //       'lastName': 'Shemsu'
  //     },
  //
  //     {
  //       'name': 'Fissha',
  //       'age': '47',
  //       'lastName': 'Interessierts'
  //     }];

  // public tableWidget: any;

  // public selectedName= '';

  bloodstocks: Bloodstock[] = [];
  constructor(private bloodstockservice: BloodstockService, private authservice: AuthenticateService) { }

  ngOnInit() {
    this.getstock = this.bloodstockservice.getBloodstock(this.authservice.getCurrentUser().branchid);

    this.pop();

    $(document).ready(function () {
      $('#dtBasicExample').DataTable({
        'scrollX': true,
      });
      $('.dataTables_length').addClass('bs-select');
      $('tr:odd').css('background-color', '#E5E5E5');
      $('tr:even:gt(0)').css('background-color', '#c7d4e5');
    });

  }

    // $(document).ready(function () {
    //   const dataTable = $('#example').DataTable({
    //     'scrollX': true,
        // 'processing' : true,
        // 'serverSide': true,
        // 'scrollY' : '350px',
        // 'scrollCollapse' : true,
    //     'ajax': {
    //       url : this.dataTable.data ,
    // }



    // });
    // });

  // }

  // ngAfterViewInit() {
  //   this.initDatatable();
  // }
  //
  // private initDatatable(): void {
  //   // debugger;
  //   const exampleId: any = $('#example');
    // this.tableWidget.destroy();
    // this.tableWidget = null;
    // this.tableWidget = exampleId.DataTable({
    //   select: true,
    //
    // });
      // $('#example')
      //   .removeClass('display')
      //   .addClass('table table-striped table-bordered')
  // }

  // private reInitDatatable(): void {
  //   if (this.tableWidget) {
  //     this.tableWidget.destroy();
  //     this.tableWidget = null;
  //   }
  //   setTimeout(() => this.initDatatable(), 0);
  // }

pop() {
    this.bloodstockservice.getBloodstock(this.authservice.getCurrentUser().branchid).subscribe(res => {
      console.log(res);
      this.bloodstocks = res as Bloodstock[];
    }, err => {
      console.log(err);
    });
}

  createStock() {

    const types = [{'type': 'A+'}, {'type': 'A-'}, {'type': 'B+'}, {'type': 'B-'}, {'type': 'AB+'}, {'type': 'AB-'}, {'type': 'O+'}, {'type': 'O-'}];

    this.stock.available = 0;
    this.stock.used = 0;

    for (   let i = 0; i < types.length; i++ ) {
      this.stock.type = types[i].type;
// console.log(types[i].type);
      this.bloodstockservice.createBloodstock(this.stock).subscribe( res => {

        },
        error1 => {
          console.log(error1);
        });
    }


  }

}
