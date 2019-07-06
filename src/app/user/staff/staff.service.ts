import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Staff} from './staff';
import {AuthenticateService} from '../../authenticate/authenticate.service';
import {User} from '../../authenticate/user';

@Injectable()
export class StaffService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
  serverUrl = 'http://localhost:3000/api';
  constructor(private  http: Http, private authservice: AuthenticateService) { }

  getFilteredStaff(parameter1: String, parameter2: String) {
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/staffs?filter={"where":{"' + parameter1 + '":"' + parameter2 + '"}}';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
}
  getStaffs(): Observable<Staff[]> {
    // const url = this.serverUrl + '/staffs';
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/staffs';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  getAccounts(): Observable<User[]> {
    const  url = this.serverUrl + '/accounts';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }
  // createStaff(staff: Staff): Observable<any> {
  //   const  url = this.serverUrl + '/staffs';
  //   return this.http.post(url, staff, { headers: this.headers }).map(res => res.json()).catch(err => {
  //
  //     return Observable.throw(err);
  //
  //   });
  // }
  createStaff(staff: Staff): Observable<any> {
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/staffs';
    return this.http.post(url, staff, { headers: this.headers }).map(res => res.json()).catch(err => {

      return Observable.throw(err);

    });
  }
  updateStaff(staff: Staff): Observable<any> {
    const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/' + branch + '/staffs/' + staff.id;
    // const  url = this.serverUrl + '/staffs/' + staff.id;
    return this.http.put(url, staff, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }

  deleteStaff(id: String): Observable<Staff[]> {
    const  url = this.serverUrl + '/staffs/' + id;
    return this.http.delete(url, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }


}
