import { Injectable } from '@angular/core';
import {Bloodstock} from '../../stock/bloodstock/bloodstock';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {BloodstockService} from '../../stock/bloodstock/bloodstock.service';

@Injectable()
export class GetbloodService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
  serverUrl = 'http://localhost:3000/api';

  constructor(private http: Http, private authservice: AuthenticateService, private bloodstockservice: BloodstockService) {
  }

  getBlood(bloodstock: Bloodstock): Observable< Bloodstock[]> {
    const branch = this.authservice.getCurrentUser().branchid;
    const url = this.serverUrl + '/branches/' + branch + '/stocks/' + bloodstock.id;
    return this.http.put(url, bloodstock, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });

  }

}
