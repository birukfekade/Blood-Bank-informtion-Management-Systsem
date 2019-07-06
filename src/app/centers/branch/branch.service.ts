// import { Injectable } from '@angular/core';
// import {Http,Headers} from '@angular/http';
// // import {Observable} from 'rxjs/Observable';
// import {Branch} from './branch';
// import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
//
//
//
//
//
// import * as $ from 'jquery';
// import {Hospital} from '../hospital/hospital';
//
// @Injectable()
// export class BranchService {
//
//   serverUrl = 'http://localhost:3000/api';
//   constructor(private http: Http) { }
//   headers = new Headers({
//     'Content-Type' : 'application.json',
//   });
//   getBranch(): Observable<Branch[]> {
//     // const url = this.serverUrl + '/branches';
//     const url = 'http://localhost:3000/api/branches';
//     return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
//       return Observable.throw(err);
//     });
//   }
//
//   createBranch(branch: Branch): Observable<any> {
//     const  url = this.serverUrl + '/branches';
//     return this.http.post(url, branch, { headers: this.headers }).map(res => res.json()).catch(err => {
//       return Observable.throw(err);
//
//     });
//   }////////////////
//   updateBranch(br: Branch): Observable<any> {
//     const  url = this.serverUrl + '/branches/' + br.id;
//     return this.http.put(url, br,  { headers: this.headers }).map(res => res.json()).catch(err => {
//       return Observable.throw(err);
//
//     });
//   }
//
//   deleteBranch(id: String): Observable<Branch[]> {
//     const  url = this.serverUrl + '/branches/' + id;
//     return this.http.delete(url, { headers: this.headers }).map(res => res.json()).catch(err => {
//       return Observable.throw(err);
//
//     });
//   }
//
// }

import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthenticateService} from '../../authenticate/authenticate.service';
// import {Observable} from 'rxjs/Observable';
import { Observable } from 'rxjs';
import {Branch} from './branch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Donationcenter} from '../donationcenter/donationcenter';


@Injectable()
export class BranchService {
  headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization': this.authservice.getToken()
  });
  serverUrl = 'http://localhost:3000/api';
  constructor(private  http: Http, private authservice: AuthenticateService) { }

  createBranch(branch: Branch): Observable<any> {
    // const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches';
    // const  url = this.serverUrl + '/donationcenters';
    return this.http.post(url, branch, { headers: this.headers }).map(res => res.json()).catch(err => {

      return Observable.throw(err);

    });
  }
  getBranches(): Observable<Branch[]> {

    const  url = this.serverUrl + '/branches';
    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }


  updateBranch(branch: Branch): Observable<any> {

    // const branch = this.authservice.getCurrentUser().branchid;
    const  url = this.serverUrl + '/branches/';
    return this.http.put(url, branch, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }

  deleteBranch(id: String): Observable<Branch[]> {
    const  url = this.serverUrl + '/branches/' + id;
    return this.http.delete(url, { headers: this.headers }).map(res => res.json()).catch(err => {
      return Observable.throw(err);

    });
  }

  getBranchAdmins(): Observable<Branch[]> {
    // {"title" : "string"}
    // const  url = this.serverUrl + '/staffs?filter ={"where":{"sex": "Male"}}';
    const  url = this.serverUrl + '/staffs';

    return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
      return Observable.throw(err);
    });
  }

}
