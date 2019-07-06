import { Injectable } from '@angular/core';
import {Http ,Headers} from '@angular/http';
import {Bloodstock} from './bloodstock';
import {Observable} from 'rxjs';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {Staff} from '../../user/staff/staff';


@Injectable()
export class BloodstockService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
  serverUrl = 'http://localhost:3000/api';

  constructor(private http: Http, private authservice: AuthenticateService) {
  }


  getAllstock(): Observable<Bloodstock[]> {
    const url = this.serverUrl + '/stocks';
    return this.http.get( url, {headers: this.headers} ).map( res => res.json() ).catch( err => {
      return Observable.throw( err );
    } );
  }
  getFilteredBloodstock(id: String): Observable<Bloodstock[]> {
    // const url = this.serverUrl + '/staffs';
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + id + '/stocks';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  getBloodstock(id: String): Observable<Bloodstock[]> {
    // const url = this.serverUrl + '/staffs';
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + id + '/stocks';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

  createBloodstock(bloodstock: Bloodstock): Observable<any> {
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/stocks';
    // const url = this.serverUrl + '/stocks';
    return this.http.post( url, bloodstock, {headers: this.headers} ).map( res => res.json() ).catch( err => {
      return Observable.throw( err );
    } );
  }
  updateBloodstock(bloodstock: Bloodstock): Observable<any> {
    const  url = this.serverUrl + '/stocks/' + bloodstock.id;
    return  this.http.put(url, bloodstock, {headers: this.headers}).map( res => res.json()).catch( err => {
      return  Observable.throw(err);
    });
  }
  deleteBloodstock(id: String): Observable<Bloodstock[]> {
    const url = this.serverUrl + '/stocks/' + id;
    return  this.http.delete(url, {headers: this.headers}).map( res => res.json()).catch( err => {
      return Observable.throw(err);
    });
  }
}
