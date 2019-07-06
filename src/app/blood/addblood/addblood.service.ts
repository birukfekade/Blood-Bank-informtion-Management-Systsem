import { Injectable } from '@angular/core';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {Bloodstock} from '../../stock/bloodstock/bloodstock';
import {Router} from '@angular/router';
import {Http,Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
// import {Observable} from 'rxjs';
import {Donor} from '../../user/donor/donor';

@Injectable()
export class AddbloodService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
  bloodstock: Bloodstock= new Bloodstock();

serverUrl = 'http://localhost:3000/api';
  constructor(private authservice: AuthenticateService , private route: Router, private http: Http) { }



  addBlood(bloodstock: Bloodstock): Observable<any> {
      const branch = this.authservice.getCurrentUser().branchid;
      const url = this.serverUrl + '/branches/' + branch + '/stocks/' + bloodstock.id;
      return this.http.put(url, bloodstock, {headers: this.headers}).map(res => res.json()).catch(err => {
        return Observable.throw(err);

      });
    }

      getAviliableBlood(id: String): Observable<Bloodstock[]> {
        const url = this.serverUrl + '/stocks/' + id;
      return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
        return Observable.throw(err);
      });
    }


}
