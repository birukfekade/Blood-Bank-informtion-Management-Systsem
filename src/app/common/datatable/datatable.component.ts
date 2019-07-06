import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  public data =
    [{
      'name': 'Anna',
      'age': '20',
      'lastName': 'Konda'
    },
      {
        'name': 'Selomon',
        'age': '36',
        'lastName': 'Kelemu'
      },
      {
        'name': 'Zekariyas',
        'age': '58',
        'lastName': 'Feysel'
      },

      {
        'name': 'Anna',
        'age': '20',
        'lastName': 'Konda'
      },
      {
        'name': 'Selomon',
        'age': '36',
        'lastName': 'Kelemu'
      },
      {
        'name': 'Zekariyas',
        'age': '58',
        'lastName': 'Shemsu'
      },

      {
        'name': 'Fissha',
        'age': '47',
        'lastName': 'Interessierts'
      }];

  public tableWidget: any;

  public selectedName= '';


  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      const dataTable = $('#example').DataTable({
        'scrollX': true,
      });
    });

  }

  ngAfterViewInit() {
    this.initDatatable();
  }

  private initDatatable(): void {
    debugger;
    const exampleId: any = $('#example');
    this.tableWidget = exampleId.DataTable({
      select: true
    });
    //   $('#example')
    //     .removeClass('display')
    //     .addClass('table table-striped table-bordered')
  }

  private reInitDatatable(): void {
    if (this.tableWidget) {
      this.tableWidget.destroy();
      this.tableWidget = null;
    }
    setTimeout(() => this.initDatatable(), 0);
  }

  public deleteRow(): void {
    this.data.pop();
    this.reInitDatatable();
  }

  public addRow(): void {
    if (this.data.length % 5 === 0) {
      this.data.push({'name': 'Anna', 'age': '20',  'lastName': 'Konda'});
    } else if (this.data.length % 5 === 1) {
      this.data.push({'name': 'Wayne', 'age': '26',  'lastName': 'Interessierts'});
    } else if (this.data.length % 5 === 2) {
      this.data.push({'name': 'Andy', 'age': '20', 'lastName': 'Biotika'});
    } else if (this.data.length % 5 === 3) {
      this.data.push({'name': 'Niko', 'age': '20',  'lastName': 'Tin'});
    } else {
      this.data.push({'name': 'Mo', 'age': '20',  'lastName': 'Zarella'});
    }
    this.reInitDatatable();
  }

  public selectRow(index: number, row: any) {
    this.selectedName = 'row#' + index + ' ' + row.name;
  }
}
